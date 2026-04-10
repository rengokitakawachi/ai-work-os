// src/services/tasks/projection.js

import { createError } from './error.js';
import {
  createTask as createTodoistTask,
  updateTask as updateTodoistTask,
  deleteTask as deleteTodoistTask,
  listTasks as listTodoistTasks,
} from '../todoist/client.js';

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getTaskKey(task) {
  const todoistTaskId = getTodoistTaskId(task);
  if (todoistTaskId) {
    return `id:${todoistTaskId}`;
  }

  const rollingDay = ensureString(task?.rolling_day);
  const taskName = ensureString(task?.task);
  return `task:${rollingDay}:${taskName}`;
}

function getTodoistTaskId(task) {
  return String(task?.external?.todoist_task_id || '').trim();
}

function getTodoistItemId(task) {
  return String(task?.id || '').trim();
}

function isCompletedTask(task) {
  return task?.status === 'completed' || task?.completed === true;
}

function takeFirst(items, limit = 2) {
  return Array.isArray(items) ? items.slice(0, limit) : [];
}

function getProjectionProjectId(context = {}) {
  return String(context.todoistProjectId || context.project_id || '').trim();
}

function normalizeListedTasks(result) {
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.results)) {
    return result.results;
  }

  return [];
}

function buildTodoistTaskMap(tasks = []) {
  const map = new Map();
  for (const task of tasks) {
    const id = getTodoistItemId(task);
    if (!id) {
      continue;
    }
    map.set(id, task);
  }
  return map;
}

function buildDescription(task) {
  const lines = [];

  const whyNow = takeFirst(task?.why_now, 1);
  if (whyNow.length > 0) {
    lines.push(`why_now: ${whyNow[0]}`);
  }

  const notes = takeFirst(task?.notes, 2);
  if (notes.length > 0) {
    lines.push(`notes: ${notes.join(' / ')}`);
  }

  const sourceRef = takeFirst(task?.source_ref, 2);
  if (sourceRef.length > 0) {
    lines.push(`source_ref: ${sourceRef.join(', ')}`);
  }

  lines.push('ref: notes/04_operations/active_operations.md');

  return lines.join('\n');
}

function getTaskDatePayload(task, context = {}) {
  const dueDate = ensureString(task?.due_date);
  const dueType = ensureString(task?.due_type);
  const rollingDayDate = ensureString(context?.rollingDayDate);

  if (dueDate && dueType === 'deadline') {
    return {
      deadline_date: dueDate,
    };
  }

  if (dueDate) {
    return {
      due_string: dueDate,
    };
  }

  if (rollingDayDate) {
    return {
      due_string: rollingDayDate,
    };
  }

  return {};
}

function getTodoistTaskSnapshot(task) {
  return {
    content: ensureString(task?.content),
    description: typeof task?.description === 'string' ? task.description : '',
    due_string: ensureString(task?.due?.date || task?.due?.string),
    deadline_date: ensureString(task?.deadline?.date),
  };
}

function payloadDiffersFromTodoist(payload, todoistTask) {
  if (!todoistTask) {
    return false;
  }

  const snapshot = getTodoistTaskSnapshot(todoistTask);

  if (payload.content !== snapshot.content) {
    return true;
  }

  if (payload.description !== snapshot.description) {
    return true;
  }

  if (ensureString(payload.due_string) !== snapshot.due_string) {
    return true;
  }

  if (ensureString(payload.deadline_date) !== snapshot.deadline_date) {
    return true;
  }

  return false;
}

function tasksDiffer(previousTask, currentTask, context = {}) {
  if (!previousTask || !currentTask) {
    return false;
  }

  if (previousTask.task !== currentTask.task) {
    return true;
  }

  if ((previousTask.rolling_day || '') !== (currentTask.rolling_day || '')) {
    return true;
  }

  const previousPayload = buildProjectionPayload(previousTask, context);
  const currentPayload = buildProjectionPayload(currentTask, context);

  return JSON.stringify(previousPayload) !== JSON.stringify(currentPayload);
}

function toTaskMap(tasks = []) {
  const map = new Map();

  for (const task of tasks) {
    const key = getTaskKey(task);
    if (!key) {
      continue;
    }
    map.set(key, task);
  }

  return map;
}

function findUniqueTodoistTaskMatch(todoistTasks = [], task, usedTodoistTaskIds = new Set()) {
  const taskName = ensureString(task?.task);
  if (!taskName) {
    return null;
  }

  const candidates = todoistTasks.filter((item) => {
    const itemId = getTodoistItemId(item);
    if (!itemId || usedTodoistTaskIds.has(itemId)) {
      return false;
    }

    return ensureString(item?.content) === taskName;
  });

  if (candidates.length !== 1) {
    return null;
  }

  return candidates[0];
}

export function buildProjectionPayload(task, context = {}) {
  return {
    content: String(task?.task || '').trim(),
    description: buildDescription(task),
    ...getTaskDatePayload(task, context),
  };
}

export function decideProjectionAction({ previousTask, currentTask, currentTodoistTask, rollingDayDate }) {
  const payloadContext = {
    rollingDayDate,
  };

  if (!previousTask && currentTask) {
    const todoistTaskId = getTodoistTaskId(currentTask);

    if (!todoistTaskId && currentTodoistTask) {
      return {
        action: 'update',
        reason: '対応する Todoist task が事前参照で見つかったため',
      };
    }

    if (!todoistTaskId) {
      return {
        action: 'create',
        reason: 'active に新規追加され、todoist_task_id が未設定のため',
      };
    }

    return {
      action: 'update',
      reason: 'active に存在し、todoist_task_id があるため',
    };
  }

  if (previousTask && !currentTask) {
    const todoistTaskId = getTodoistTaskId(previousTask);

    if (!todoistTaskId) {
      return {
        action: 'noop',
        reason: 'active から外れたが todoist_task_id がないため',
      };
    }

    if (isCompletedTask(previousTask)) {
      return {
        action: 'close',
        reason: 'active から外れ、完了扱いのため',
      };
    }

    return {
      action: 'delete',
      reason: 'active から外れ、完了扱いではないため',
    };
  }

  if (previousTask && currentTask) {
    const todoistTaskId = getTodoistTaskId(currentTask);

    if (!todoistTaskId && currentTodoistTask) {
      return {
        action: 'update',
        reason: '対応する Todoist task が事前参照で見つかったため',
      };
    }

    if (!todoistTaskId) {
      return {
        action: 'create',
        reason: 'active に存在するが todoist_task_id が未設定のため',
      };
    }

    if (tasksDiffer(previousTask, currentTask, payloadContext)) {
      return {
        action: 'update',
        reason: 'task / rolling_day / payload に変更があるため',
      };
    }

    const payload = buildProjectionPayload(currentTask, payloadContext);
    if (payloadDiffersFromTodoist(payload, currentTodoistTask)) {
      return {
        action: 'update',
        reason: 'Todoist 現状と payload に差分があるため',
      };
    }

    return {
      action: 'noop',
      reason: '投影に影響する差分がないため',
    };
  }

  return {
    action: 'noop',
    reason: '判定対象が存在しないため',
  };
}

export function applyTodoistTaskId({ task, todoistTaskId }) {
  return {
    ...task,
    external: {
      ...(task?.external || {}),
      todoist_task_id: String(todoistTaskId || '').trim(),
    },
  };
}

export async function projectActiveOperations(
  { previousActiveTasks = [], currentActiveTasks = [], rollingDayDates = {} },
  context = {}
) {
  const previousMap = toTaskMap(previousActiveTasks);
  const currentMap = toTaskMap(currentActiveTasks);
  const allKeys = new Set([...previousMap.keys(), ...currentMap.keys()]);
  const results = [];
  const projectionProjectId = getProjectionProjectId(context);
  const dryRun = context.dryRun === true;

  const listedTodoistTasks = projectionProjectId
    ? normalizeListedTasks(
        await listTodoistTasks(
          {
            project_id: projectionProjectId,
            limit: 200,
          },
          {
            ...context,
            step: context.step || 'projectActiveOperations',
            action: 'list',
            resource: 'tasks',
          }
        )
      )
    : [];

  const todoistTaskMap = buildTodoistTaskMap(listedTodoistTasks);
  const usedTodoistTaskIds = new Set();

  for (const key of allKeys) {
    const previousTask = previousMap.get(key);
    const currentTask = currentMap.get(key);
    const candidateTask = currentTask || previousTask;
    const rollingDayDate = ensureString(rollingDayDates?.[candidateTask?.rolling_day || '']);

    const explicitTodoistTaskId = getTodoistTaskId(candidateTask);
    let currentTodoistTask = explicitTodoistTaskId
      ? todoistTaskMap.get(explicitTodoistTaskId)
      : null;

    if (!currentTodoistTask && currentTask) {
      currentTodoistTask = findUniqueTodoistTaskMatch(
        listedTodoistTasks,
        currentTask,
        usedTodoistTaskIds
      );
    }

    if (currentTodoistTask) {
      const matchedId = getTodoistItemId(currentTodoistTask);
      if (matchedId) {
        usedTodoistTaskIds.add(matchedId);
      }
    }

    const decision = decideProjectionAction({
      previousTask,
      currentTask,
      currentTodoistTask,
      rollingDayDate,
    });

    if (decision.action === 'noop') {
      results.push({
        action: decision.action,
        taskKey: key,
        applied: false,
        reason: decision.reason,
      });
      continue;
    }

    try {
      if (decision.action === 'create') {
        const payload = buildProjectionPayload(currentTask, { rollingDayDate });
        const createInput = {
          ...payload,
          ...(projectionProjectId ? { project_id: projectionProjectId } : {}),
        };

        if (dryRun) {
          results.push({
            action: 'create',
            taskKey: key,
            applied: false,
            dryRun: true,
            reason: decision.reason,
            payload: createInput,
          });
          continue;
        }

        const created = await createTodoistTask(createInput, {
          ...context,
          step: context.step || 'projectActiveOperations',
          action: 'create',
          resource: 'tasks',
        });

        results.push({
          action: 'create',
          taskKey: key,
          todoistTaskId: created?.id ? String(created.id) : '',
          applied: true,
          reason: decision.reason,
          task: applyTodoistTaskId({
            task: currentTask,
            todoistTaskId: created?.id,
          }),
        });
        continue;
      }

      if (decision.action === 'update') {
        const matchedTodoistTaskId =
          getTodoistTaskId(currentTask) || getTodoistItemId(currentTodoistTask);
        const payload = buildProjectionPayload(currentTask, { rollingDayDate });

        if (dryRun) {
          results.push({
            action: 'update',
            taskKey: key,
            todoistTaskId: matchedTodoistTaskId,
            applied: false,
            dryRun: true,
            reason: decision.reason,
            payload,
          });
          continue;
        }

        await updateTodoistTask(
          matchedTodoistTaskId,
          {
            content: payload.content,
            description: payload.description,
            ...(payload.due_string ? { due_string: payload.due_string } : {}),
            ...(payload.deadline_date ? { deadline_date: payload.deadline_date } : {}),
          },
          {
            ...context,
            step: context.step || 'projectActiveOperations',
            action: 'update',
            resource: 'tasks',
          }
        );

        results.push({
          action: 'update',
          taskKey: key,
          todoistTaskId: matchedTodoistTaskId,
          applied: true,
          reason: decision.reason,
          ...(getTodoistTaskId(currentTask)
            ? {}
            : {
                task: applyTodoistTaskId({
                  task: currentTask,
                  todoistTaskId: matchedTodoistTaskId,
                }),
              }),
        });
        continue;
      }

      if (decision.action === 'close') {
        const todoistTaskId = getTodoistTaskId(previousTask);

        if (dryRun) {
          results.push({
            action: 'close',
            taskKey: key,
            todoistTaskId,
            applied: false,
            dryRun: true,
            reason: decision.reason,
          });
          continue;
        }

        await updateTodoistTask(
          todoistTaskId,
          { completed: true },
          {
            ...context,
            step: context.step || 'projectActiveOperations',
            action: 'close',
            resource: 'tasks',
          }
        );

        results.push({
          action: 'close',
          taskKey: key,
          todoistTaskId,
          applied: true,
          reason: decision.reason,
        });
        continue;
      }

      if (decision.action === 'delete') {
        const todoistTaskId = getTodoistTaskId(previousTask);

        if (dryRun) {
          results.push({
            action: 'delete',
            taskKey: key,
            todoistTaskId,
            applied: false,
            dryRun: true,
            reason: decision.reason,
          });
          continue;
        }

        await deleteTodoistTask(todoistTaskId, {
          ...context,
          step: context.step || 'projectActiveOperations',
          action: 'delete',
          resource: 'tasks',
        });

        results.push({
          action: 'delete',
          taskKey: key,
          todoistTaskId,
          applied: true,
          reason: decision.reason,
        });
      }
    } catch (error) {
      if (error?.code && error?.category && error?.status) {
        throw error;
      }

      throw createError({
        status: 500,
        code: 'TODOIST_ERROR',
        message: 'failed to project active operations',
        category: 'upstream',
        step: context.step || 'projectActiveOperations',
        resource: context.resource || 'tasks',
        action: context.action || 'project',
        retryable: true,
        details: {
          taskKey: key,
          projection_action: decision.action,
        },
        cause: error,
      });
    }
  }

  return results;
}

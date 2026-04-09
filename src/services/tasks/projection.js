// src/services/tasks/projection.js

import { createError } from './error.js';
import {
  createTask as createTodoistTask,
  updateTask as updateTodoistTask,
  deleteTask as deleteTodoistTask,
} from '../todoist/client.js';

function getTaskKey(task) {
  return String(task?.task || '').trim();
}

function getTodoistTaskId(task) {
  return String(task?.external?.todoist_task_id || '').trim();
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

function tasksDiffer(previousTask, currentTask) {
  if (!previousTask || !currentTask) {
    return false;
  }

  if (previousTask.task !== currentTask.task) {
    return true;
  }

  if ((previousTask.rolling_day || '') !== (currentTask.rolling_day || '')) {
    return true;
  }

  const previousDescription = buildDescription(previousTask);
  const currentDescription = buildDescription(currentTask);

  return previousDescription !== currentDescription;
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

export function buildProjectionPayload(task) {
  return {
    content: String(task?.task || '').trim(),
    description: buildDescription(task),
  };
}

export function decideProjectionAction({ previousTask, currentTask }) {
  if (!previousTask && currentTask) {
    const todoistTaskId = getTodoistTaskId(currentTask);

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

    if (!todoistTaskId) {
      return {
        action: 'create',
        reason: 'active に存在するが todoist_task_id が未設定のため',
      };
    }

    if (tasksDiffer(previousTask, currentTask)) {
      return {
        action: 'update',
        reason: 'task / rolling_day / description に変更があるため',
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
  { previousActiveTasks = [], currentActiveTasks = [] },
  context = {}
) {
  const previousMap = toTaskMap(previousActiveTasks);
  const currentMap = toTaskMap(currentActiveTasks);
  const allKeys = new Set([...previousMap.keys(), ...currentMap.keys()]);
  const results = [];
  const projectionProjectId = getProjectionProjectId(context);

  for (const key of allKeys) {
    const previousTask = previousMap.get(key);
    const currentTask = currentMap.get(key);
    const decision = decideProjectionAction({ previousTask, currentTask });

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
        const payload = buildProjectionPayload(currentTask);
        const created = await createTodoistTask(
          {
            ...payload,
            ...(projectionProjectId ? { project_id: projectionProjectId } : {}),
          },
          {
            ...context,
            step: context.step || 'projectActiveOperations',
            action: 'create',
            resource: 'tasks',
          }
        );

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
        const todoistTaskId = getTodoistTaskId(currentTask);
        const payload = buildProjectionPayload(currentTask);

        await updateTodoistTask(
          todoistTaskId,
          {
            content: payload.content,
            description: payload.description,
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
          todoistTaskId,
          applied: true,
          reason: decision.reason,
        });
        continue;
      }

      if (decision.action === 'close') {
        const todoistTaskId = getTodoistTaskId(previousTask);

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

// src/services/tasks/service.js

import { createError } from './error.js';
import {
  createTask as createTodoistTask,
  updateTask as updateTodoistTask,
  listTasks as listTodoistTasks,
} from '../todoist/client.js';

export async function createTask(input, context) {
  try {
    const {
      title,
      description,
      due_string,
      labels,
      assignee,
      priority,
      duration_minutes,
      subtasks,
    } = input;

    // ① 親タスク作成
    const parent = await createTodoistTask({
      content: title,
      description,
      due_string,
      labels,
      priority,
    });

    // ② subtasks（Phase1: まずは安全に逐次）
    if (Array.isArray(subtasks) && subtasks.length > 0) {
      for (const sub of subtasks) {
        try {
          await createTodoistTask({
            content: sub,
            parent_id: parent.id,
          });
        } catch (subError) {
          // 失敗しても親は保持
          console.error(
            '[subtask_error]',
            JSON.stringify({
              request_id: context.requestId,
              parent_id: parent.id,
              subtask: sub,
              message: subError.message,
            })
          );
        }
      }
    }

    return {
      id: parent.id,
      title: parent.content,
    };
  } catch (error) {
    throw createError({
      status: 500,
      code: 'TODOIST_ERROR',
      message: 'failed to create task',
      category: 'upstream',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: true,
      details: {},
      cause: error,
    });
  }
}

export async function updateTask(input, context) {
  try {
    const {
      id,
      title,
      description,
      due_date,
      labels,
      priority,
      status,
    } = input;

    if (status === 'closed') {
      // 完了処理（Todoist close）
      await updateTodoistTask(id, { completed: true });
      return { id, status: 'closed' };
    }

    await updateTodoistTask(id, {
      content: title,
      description,
      due_date,
      labels,
      priority,
    });

    return { id };
  } catch (error) {
    throw createError({
      status: 500,
      code: 'TODOIST_ERROR',
      message: 'failed to update task',
      category: 'upstream',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: true,
      details: {},
      cause: error,
    });
  }
}

export async function listTasks(input, context) {
  try {
    const tasks = await listTodoistTasks(input);

    return tasks;
  } catch (error) {
    throw createError({
      status: 500,
      code: 'TODOIST_ERROR',
      message: 'failed to list tasks',
      category: 'upstream',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: true,
      details: {},
      cause: error,
    });
  }
}

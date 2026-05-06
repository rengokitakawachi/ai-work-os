// src/services/tasks/service.js

import { createError } from './error.js';
import {
  createTask as createTodoistTask,
  updateTask as updateTodoistTask,
  listTasks as listTodoistTasks,
} from '../todoist/client.js';

function toTodoistDuration(durationMinutes) {
  if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
    return undefined;
  }

  return {
    amount: durationMinutes,
    unit: 'minute',
  };
}

export async function createTask(input, context) {
  try {
    const {
      title,
      description,
      project_id,
      due_string,
      labels,
      priority,
      duration_minutes,
      subtasks,
    } = input;

    const parent = await createTodoistTask({
      content: title,
      description,
      project_id,
      due_string,
      labels,
      priority,
      duration: toTodoistDuration(duration_minutes),
    });

    if (Array.isArray(subtasks) && subtasks.length > 0) {
      for (const sub of subtasks) {
        try {
          await createTodoistTask({
            content: sub,
            parent_id: parent.id,
          });
        } catch (subError) {
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
    if (error?.code && error?.category && error?.status) {
      throw error;
    }

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
    if (error?.code && error?.category && error?.status) {
      throw error;
    }

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
    if (error?.code && error?.category && error?.status) {
      throw error;
    }

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

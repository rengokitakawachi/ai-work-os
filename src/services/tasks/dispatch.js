// src/services/tasks/dispatch.js

import {
  normalizeCreateInput,
  normalizeListInput,
  normalizeUpdateInput,
} from './validate.js';

import {
  createTask,
  listTasks,
  updateTask,
} from './service.js';

export async function dispatchCreate(body, context) {
  const input = normalizeCreateInput(body);

  return await createTask(input, {
    ...context,
    step: 'createTask',
  });
}

export async function dispatchList(query, context) {
  const input = normalizeListInput(query);

  return await listTasks(input, {
    ...context,
    step: 'listTasks',
  });
}

export async function dispatchUpdate(params, body, context) {
  const input = normalizeUpdateInput(params, body);

  return await updateTask(input, {
    ...context,
    step: 'updateTask',
  });
}

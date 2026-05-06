// src/services/tasks/dispatch.js

import {
  normalizeCreateInput,
  normalizeListInput,
  normalizeUpdateInput,
  normalizeProjectInput,
} from './validate.js';

import {
  createTask,
  listTasks,
  updateTask,
} from './service.js';

import { projectActiveOperations } from './projection.js';

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

export async function dispatchProject(body, context) {
  const input = normalizeProjectInput(body);

  const results = await projectActiveOperations(
    {
      previousActiveTasks: input.previous_active_tasks,
      currentActiveTasks: input.current_active_tasks,
    },
    {
      ...context,
      step: 'projectActiveOperations',
      action: 'project',
      resource: 'tasks',
      dryRun: input.mode === 'dry_run',
      project_id: input.project_id,
    }
  );

  return {
    target: input.target,
    mode: input.mode,
    results,
  };
}

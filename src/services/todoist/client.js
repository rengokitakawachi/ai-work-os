// src/services/todoist/client.js

import { createError } from '../tasks/error.js';

const TODOIST_BASE_URL = 'https://api.todoist.com/api/v1';

function getTodoistToken(context = {}) {
  const token = (process.env.TODOIST_API_TOKEN || '').trim();

  if (!token) {
    throw createError({
      status: 500,
      code: 'CONFIG_ERROR',
      message: 'TODOIST_API_TOKEN missing',
      category: 'config',
      step: context.step || 'getTodoistToken',
      resource: context.resource || 'tasks',
      action: context.action || '',
      retryable: false,
      details: {
        env: 'TODOIST_API_TOKEN',
      },
    });
  }

  return token;
}

function safeParseJson(text) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function buildUrl(path, query) {
  const url = new URL(`${TODOIST_BASE_URL}${path}`);

  if (query && typeof query === 'object') {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === '') {
        continue;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          continue;
        }
        url.searchParams.set(key, value.join(','));
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

function normalizeTodoistError(response, data, context = {}) {
  const status = response.status;
  const message =
    (data && typeof data === 'object' && typeof data.message === 'string' && data.message) ||
    response.statusText ||
    'Todoist API error';

  if (status === 404) {
    return createError({
      status: 404,
      code: 'TODOIST_NOT_FOUND',
      message: 'Todoist resource not found',
      category: 'upstream',
      step: context.step || 'todoistRequest',
      resource: context.resource || 'tasks',
      action: context.action || '',
      retryable: false,
      details: {
        upstream_status: status,
        upstream_message: message,
      },
    });
  }

  if (status === 401 || status === 403) {
    return createError({
      status: 502,
      code: 'UNAUTHORIZED',
      message: 'Todoist authorization failed',
      category: 'upstream',
      step: context.step || 'todoistRequest',
      resource: context.resource || 'tasks',
      action: context.action || '',
      retryable: false,
      details: {
        upstream_status: status,
        upstream_message: message,
      },
    });
  }

  if (status === 429) {
    return createError({
      status: 503,
      code: 'TODOIST_RATE_LIMIT',
      message: 'Todoist rate limit exceeded',
      category: 'upstream',
      step: context.step || 'todoistRequest',
      resource: context.resource || 'tasks',
      action: context.action || '',
      retryable: true,
      details: {
        upstream_status: status,
        upstream_message: message,
      },
    });
  }

  if (status >= 500) {
    return createError({
      status: 502,
      code: 'UPSTREAM_5XX',
      message: 'Todoist upstream server error',
      category: 'upstream',
      step: context.step || 'todoistRequest',
      resource: context.resource || 'tasks',
      action: context.action || '',
      retryable: true,
      details: {
        upstream_status: status,
        upstream_message: message,
      },
    });
  }

  return createError({
    status: 502,
    code: 'TODOIST_ERROR',
    message: 'Todoist API request failed',
    category: 'upstream',
    step: context.step || 'todoistRequest',
    resource: context.resource || 'tasks',
    action: context.action || '',
    retryable: false,
    details: {
      upstream_status: status,
      upstream_message: message,
    },
  });
}

async function todoistRequest(path, options = {}, context = {}) {
  const token = getTodoistToken({
    step: 'getTodoistToken',
    resource: context.resource || 'tasks',
    action: context.action || '',
  });

  const url = buildUrl(path, options.query);
  const method = options.method || 'GET';

  let response;

  try {
    response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch (cause) {
    throw createError({
      status: 504,
      code: 'UPSTREAM_TIMEOUT',
      message: 'Todoist request failed',
      category: 'upstream',
      step: context.step || 'todoistRequest',
      resource: context.resource || 'tasks',
      action: context.action || '',
      retryable: true,
      details: {
        path,
        method,
      },
      cause,
    });
  }

  const text = await response.text();
  const data = safeParseJson(text);

  if (!response.ok) {
    throw normalizeTodoistError(response, data || text, {
      step: context.step || 'todoistRequest',
      resource: context.resource || 'tasks',
      action: context.action || '',
    });
  }

  if (!text) {
    return null;
  }

  return data !== null ? data : text;
}

export async function createTask(input, context = {}) {
  const body = {
    content: input.content,
    ...(input.description ? { description: input.description } : {}),
    ...(input.project_id ? { project_id: input.project_id } : {}),
    ...(input.due_string ? { due_string: input.due_string } : {}),
    ...(input.deadline_date ? { deadline_date: input.deadline_date } : {}),
    ...(Array.isArray(input.labels) && input.labels.length > 0
      ? { labels: input.labels }
      : {}),
    ...(input.priority ? { priority: input.priority } : {}),
    ...(input.parent_id ? { parent_id: input.parent_id } : {}),
    ...(input.assignee_id ? { assignee_id: input.assignee_id } : {}),
    ...(input.duration
      ? { duration: input.duration }
      : {}),
  };

  return await todoistRequest(
    '/tasks',
    {
      method: 'POST',
      body,
    },
    {
      ...context,
      step: context.step || 'todoistRequest',
      action: context.action || 'create',
      resource: context.resource || 'tasks',
    }
  );
}

export async function updateTask(taskId, input, context = {}) {
  const id = String(taskId || '').trim();

  if (!id) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'task id required',
      category: 'validation',
      step: context.step || 'updateTask',
      resource: context.resource || 'tasks',
      action: context.action || 'update',
      retryable: false,
      details: {
        field: 'id',
      },
    });
  }

  if (input && input.completed === true) {
    await todoistRequest(
      `/tasks/${encodeURIComponent(id)}/close`,
      {
        method: 'POST',
      },
      {
        ...context,
        step: context.step || 'todoistRequest',
        action: context.action || 'update',
        resource: context.resource || 'tasks',
      }
    );

    return {
      id,
      status: 'closed',
    };
  }

  const body = {
    ...(input.content ? { content: input.content } : {}),
    ...(typeof input.description === 'string' ? { description: input.description } : {}),
    ...(input.due_string ? { due_string: input.due_string } : {}),
    ...(input.due_date ? { due_date: input.due_date } : {}),
    ...(input.deadline_date ? { deadline_date: input.deadline_date } : {}),
    ...(Array.isArray(input.labels) ? { labels: input.labels } : {}),
    ...(input.priority ? { priority: input.priority } : {}),
    ...(input.assignee_id ? { assignee_id: input.assignee_id } : {}),
  };

  return await todoistRequest(
    `/tasks/${encodeURIComponent(id)}`,
    {
      method: 'POST',
      body,
    },
    {
      ...context,
      step: context.step || 'todoistRequest',
      action: context.action || 'update',
      resource: context.resource || 'tasks',
    }
  );
}

export async function deleteTask(taskId, context = {}) {
  const id = String(taskId || '').trim();

  if (!id) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'task id required',
      category: 'validation',
      step: context.step || 'deleteTask',
      resource: context.resource || 'tasks',
      action: context.action || 'delete',
      retryable: false,
      details: {
        field: 'id',
      },
    });
  }

  await todoistRequest(
    `/tasks/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
    {
      ...context,
      step: context.step || 'todoistRequest',
      action: context.action || 'delete',
      resource: context.resource || 'tasks',
    }
  );
}

export async function listTasks(input = {}, context = {}) {
  const query = {
    project_id: input.project_id,
    section_id: input.section_id,
    parent_id: input.parent_id,
    label: input.label,
    cursor: input.cursor,
    limit: input.limit,
  };

  return await todoistRequest(
    '/tasks',
    {
      method: 'GET',
      query,
    },
    {
      ...context,
      step: context.step || 'todoistRequest',
      action: context.action || 'list',
      resource: context.resource || 'tasks',
    }
  );
}

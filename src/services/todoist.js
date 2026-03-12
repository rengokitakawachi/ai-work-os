const TODOIST_BASE_URL = 'https://api.todoist.com/api/v1';

function getTodoistToken() {
  const token = (process.env.TODOIST_API_TOKEN || '').trim();

  if (!token) {
    const error = new Error('設定エラー: APIトークンが未設定です');
    error.status = 500;
    throw error;
  }

  return token;
}

async function todoistRequest(path, { method = 'GET', body, query } = {}) {
  const token = getTodoistToken();
  const url = new URL(`${TODOIST_BASE_URL}${path}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === '') {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  const data = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    const error = new Error('Todoist API Error');
    error.status = response.status;
    error.detail = data || text;
    throw error;
  }

  return data;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function createTask(input) {
  const payload = {
    content: input.title,
    description: input.description || undefined,
    due: input.due_string ? { string: input.due_string } : undefined,
    labels: Array.isArray(input.labels) ? input.labels : undefined,
    priority: input.priority || undefined,
    duration: typeof input.duration_minutes === 'number' && input.duration_minutes > 0
      ? { amount: input.duration_minutes, unit: 'minute' }
      : undefined
  };

  return todoistRequest('/tasks', {
    method: 'POST',
    body: payload
  });
}

export async function listTasks(input = {}) {
  const query = {
    project_id: input.project_id,
    section_id: input.section_id,
    parent_id: input.parent_id,
    label: input.label,
    ids: Array.isArray(input.ids) && input.ids.length > 0 ? input.ids.join(',') : undefined,
    cursor: input.cursor,
    limit: input.limit
  };

  const data = await todoistRequest('/tasks', { query });

  if (Array.isArray(data)) {
    return {
      results: data,
      next_cursor: null
    };
  }

  return {
    results: Array.isArray(data?.results) ? data.results : [],
    next_cursor: data?.next_cursor || null
  };
}

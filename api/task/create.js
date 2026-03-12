import { authorizeInternalRequest } from '../../lib/auth.js';
import { applyCors, getRequestBody, handlePreflight, requireMethod, sendJson } from '../../lib/http.js';
import { createTask } from '../../services/todoist.js';

export default async function handler(req, res) {
  if (handlePreflight(req, res, 'POST, OPTIONS')) {
    return;
  }

  applyCors(res, 'POST, OPTIONS');

  if (!requireMethod(req, res, 'POST')) {
    return;
  }

  if (!authorizeInternalRequest(req, res)) {
    return;
  }

  try {
    const body = getRequestBody(req);
    const title = (body.title || '').trim();

    if (!title) {
      sendJson(res, 400, { error: 'title is required' });
      return;
    }

    const task = await createTask({
      title,
      description: typeof body.description === 'string' ? body.description : '',
      due_string: typeof body.due_string === 'string' ? body.due_string : 'today',
      labels: Array.isArray(body.labels) ? body.labels : [],
      priority: normalizePriority(body.priority),
      duration_minutes: normalizeDuration(body.duration_minutes)
    });

    sendJson(res, 200, {
      ok: true,
      task
    });
  } catch (error) {
    console.error('Create Task Error:', error);
    sendJson(res, error.status || 500, {
      error: error.status ? '登録に失敗しました' : '通信エラーが発生しました',
      detail: error.detail || error.message
    });
  }
}

function normalizePriority(value) {
  const priority = Number(value);

  if (Number.isInteger(priority) && priority >= 1 && priority <= 4) {
    return priority;
  }

  return undefined;
}

function normalizeDuration(value) {
  const duration = Number(value);

  if (Number.isInteger(duration) && duration > 0) {
    return duration;
  }

  return undefined;
}

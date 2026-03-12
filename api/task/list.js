import { authorizeInternalRequest } from '../../lib/auth.js';
import { applyCors, getQuery, handlePreflight, requireMethod, sendJson } from '../../lib/http.js';
import { listTasks } from '../../services/todoist.js';

export default async function handler(req, res) {
  if (handlePreflight(req, res, 'GET, OPTIONS')) {
    return;
  }

  applyCors(res, 'GET, OPTIONS');

  if (!requireMethod(req, res, 'GET')) {
    return;
  }

  if (!authorizeInternalRequest(req, res)) {
    return;
  }

  try {
    const query = getQuery(req);
    const result = await listTasks({
      project_id: query.project_id,
      section_id: query.section_id,
      parent_id: query.parent_id,
      label: query.label,
      cursor: query.cursor,
      limit: normalizeLimit(query.limit),
      ids: parseIds(query.ids)
    });

    sendJson(res, 200, {
      ok: true,
      count: result.results.length,
      next_cursor: result.next_cursor,
      tasks: result.results
    });
  } catch (error) {
    console.error('List Tasks Error:', error);
    sendJson(res, error.status || 500, {
      error: error.status ? '取得に失敗しました' : '通信エラーが発生しました',
      detail: error.detail || error.message
    });
  }
}

function normalizeLimit(value) {
  const limit = Number(value);

  if (Number.isInteger(limit) && limit > 0 && limit <= 200) {
    return limit;
  }

  return 50;
}

function parseIds(value) {
  if (!value) {
    return undefined;
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

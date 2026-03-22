// api/task-close.js

import { authorizeInternalRequest } from '../src/lib/auth.js';
import { applyCors, handlePreflight } from '../src/lib/http.js';

import {
  createRequestId,
  createError,
  normalizeError,
  logError,
} from '../src/services/tasks/error.js';

import { dispatchUpdate } from '../src/services/tasks/dispatch.js';

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req, res) {
  if (handlePreflight(req, res, 'POST, OPTIONS')) {
    return;
  }

  applyCors(res, 'POST, OPTIONS');

  const requestId = createRequestId();
  const method = ensureString(req.method).toUpperCase();
  const resource = 'tasks';
  const action = 'update';

  if (!authorizeInternalRequest(req, res)) {
    return;
  }

  try {
    if (method !== 'POST') {
      throw createError({
        status: 405,
        code: 'METHOD_NOT_ALLOWED',
        message: 'method not allowed',
        category: 'routing',
        step: 'handler',
        resource,
        action,
        retryable: false,
        details: {
          method,
          allowed_methods: ['POST', 'OPTIONS'],
        },
      });
    }

    const taskId = ensureString(req.body?.task_id);

    if (!taskId) {
      throw createError({
        status: 400,
        code: 'INVALID_REQUEST',
        message: 'task_id required',
        category: 'validation',
        step: 'validateUpdate',
        resource,
        action,
        retryable: false,
        details: {
          field: 'task_id',
        },
      });
    }

    const data = await dispatchUpdate(
      { id: taskId },
      { status: 'closed' },
      {
        requestId,
        resource,
        action,
        step: 'dispatchUpdate',
      }
    );

    return res.status(200).json({
      ok: true,
      data,
      request_id: requestId,
    });
  } catch (error) {
    logError(error, {
      requestId,
      method,
      resource,
      action,
    });

    const normalized = normalizeError(error, {
      requestId,
      resource,
      action,
    });

    return res.status(normalized.status).json(normalized.body);
  }
}

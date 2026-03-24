// api/tasks/index.js

import { authorizeInternalRequest } from '../../src/lib/auth.js';
import { applyCors, handlePreflight } from '../../src/lib/http.js';

import {
  createRequestId,
  createError,
  normalizeError,
  logError,
} from '../../src/services/tasks/error.js';

import {
  validateCreate,
  validateList,
} from '../../src/services/tasks/validate.js';

import {
  dispatchCreate,
  dispatchList,
} from '../../src/services/tasks/dispatch.js';

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req, res) {
  if (handlePreflight(req, res, 'GET, POST, OPTIONS')) {
    return;
  }

  applyCors(res, 'GET, POST, OPTIONS');

  const requestId = createRequestId();
  const method = ensureString(req.method).toUpperCase();
  const resource = 'tasks';
  let action = '';

  if (!authorizeInternalRequest(req, res)) {
    return;
  }

  try {
    if (method === 'POST') {
      action = 'create';

      validateCreate(req.body || {}, {
        requestId,
        resource,
        action,
        step: 'validateCreate',
      });

      const data = await dispatchCreate(req.body || {}, {
        requestId,
        resource,
        action,
        step: 'dispatchCreate',
      });

      return res.status(200).json({
        ok: true,
        data,
        request_id: requestId,
      });
    }

    if (method === 'GET') {
      action = 'list';

      validateList(req.query || {}, {
        requestId,
        resource,
        action,
        step: 'validateList',
      });

      const data = await dispatchList(req.query || {}, {
        requestId,
        resource,
        action,
        step: 'dispatchList',
      });

      return res.status(200).json({
        ok: true,
        data,
        request_id: requestId,
      });
    }

    throw createError({
      status: 405,
      code: 'METHOD_NOT_ALLOWED',
      message: 'method not allowed',
      category: 'routing',
      step: 'handler',
      resource,
      action: action || '',
      retryable: false,
      details: {
        method,
        allowed_methods: ['GET', 'POST', 'OPTIONS'],
      },
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

// api/tasks/[id].js

import { authorizeInternalRequest } from '../../src/lib/auth.js';
import { applyCors, handlePreflight } from '../../src/lib/http.js';

import {
  createRequestId,
  createError,
  normalizeError,
  logError,
} from '../../src/services/tasks/error.js';

import { validateUpdate } from '../../src/services/tasks/validate.js';
import { dispatchUpdate } from '../../src/services/tasks/dispatch.js';

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getTaskId(req) {
  const raw =
    req?.query?.id ??
    req?.query?.taskId ??
    '';

  if (Array.isArray(raw)) {
    return ensureString(raw[0]);
  }

  return ensureString(raw);
}

export default async function handler(req, res) {
  if (handlePreflight(req, res, 'PATCH, OPTIONS')) {
    return;
  }

  applyCors(res, 'PATCH, OPTIONS');

  const requestId = createRequestId();
  const method = ensureString(req.method).toUpperCase();
  const resource = 'tasks';
  const action = 'update';

  if (!authorizeInternalRequest(req, res)) {
    return;
  }

  try {
    if (method !== 'PATCH') {
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
          allowed_methods: ['PATCH', 'OPTIONS'],
        },
      });
    }

    const params = {
      id: getTaskId(req),
    };

    validateUpdate(params, req.body || {}, {
      requestId,
      resource,
      action,
      step: 'validateUpdate',
    });

    const data = await dispatchUpdate(params, req.body || {}, {
      requestId,
      resource,
      action,
      step: 'dispatchUpdate',
    });

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

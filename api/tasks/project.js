// api/tasks/project.js

import { authorizeInternalRequest } from '../../src/lib/auth.js';
import { applyCors, handlePreflight } from '../../src/lib/http.js';

import {
  createRequestId,
  createError,
  normalizeError,
  logError,
} from '../../src/services/tasks/error.js';

import { validateProject } from '../../src/services/tasks/validate.js';
import { dispatchProject } from '../../src/services/tasks/dispatch.js';

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
  const action = 'project';

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

    validateProject(req.body || {}, {
      requestId,
      resource,
      action,
      step: 'validateProject',
    });

    const data = await dispatchProject(req.body || {}, {
      requestId,
      resource,
      action,
      step: 'dispatchProject',
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

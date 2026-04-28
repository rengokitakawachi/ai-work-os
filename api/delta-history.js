import crypto from 'crypto';

import { auth, cors } from '../src/services/internal-auth.js';
import {
  createDeltaHistory,
  updateDeltaHistory,
} from '../src/services/delta-history.js';
import {
  createError,
  normalizeBranch,
} from '../src/services/repo-resource/common.js';

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function createRequestId() {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function requireFile(value, action) {
  const file = ensureString(value);

  if (!file) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'file required',
      category: 'validation',
      step: 'requireFile',
      resource: 'delta_history',
      action,
      retryable: false,
      details: {
        field: 'file',
      },
    });
  }

  return file;
}

function requireContent(value, action) {
  if (typeof value !== 'string' || value.length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'content required',
      category: 'validation',
      step: 'requireContent',
      resource: 'delta_history',
      action,
      retryable: false,
      details: {
        field: 'content',
      },
    });
  }

  return value;
}

function validatePost(action, body) {
  normalizeBranch(body?.branch, {
    step: 'validatePost',
    resource: 'delta_history',
    action,
  });

  if (!['create', 'update'].includes(action)) {
    throw createError({
      status: 400,
      code: 'ACTION_NOT_SUPPORTED',
      message: 'action not supported',
      category: 'routing',
      step: 'validatePost',
      resource: 'delta_history',
      action,
      retryable: false,
    });
  }

  requireFile(body?.file, action);
  requireContent(body?.content, action);
}

async function dispatchPost(action, body) {
  const file = requireFile(body?.file, action);
  const content = requireContent(body?.content, action);
  const message = ensureString(body?.message);
  const sha = ensureString(body?.sha);
  const options = {
    branch: ensureString(body?.branch),
  };

  if (action === 'create') {
    return createDeltaHistory(file, content, message, options);
  }

  if (action === 'update') {
    return updateDeltaHistory(file, content, message, sha, options);
  }

  throw createError({
    status: 400,
    code: 'ACTION_NOT_SUPPORTED',
    message: 'action not supported',
    category: 'routing',
    step: 'dispatchPost',
    resource: 'delta_history',
    action,
    retryable: false,
  });
}

function normalizeError(error, context = {}) {
  return {
    status: error?.status || 500,
    body: {
      ok: false,
      error: {
        code: error?.code || 'UNKNOWN_ERROR',
        message: error?.message || 'Unknown error',
        category: error?.category || 'internal',
        step: error?.step || 'unknown',
        resource: error?.resource || 'delta_history',
        action: error?.action || context.action || '',
        status: error?.status || 500,
        retryable: Boolean(error?.retryable),
        details: error?.details || {},
        request_id: context.requestId || '',
      },
    },
  };
}

function logError(error, context = {}) {
  console.error(
    JSON.stringify({
      level: 'error',
      request_id: context.requestId || '',
      method: context.method || '',
      resource: 'delta_history',
      action: context.action || '',
      code: error?.code || 'UNKNOWN_ERROR',
      message: error?.message || 'Unknown error',
      category: error?.category || 'internal',
      step: error?.step || 'unknown',
      status: error?.status || 500,
      retryable: Boolean(error?.retryable),
      details: error?.details || {},
    })
  );
}

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  const requestId = createRequestId();
  const method = ensureString(req.method).toUpperCase();
  const action = ensureString(req.query?.action);

  if (!auth(req, res)) {
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
        resource: 'delta_history',
        action,
        retryable: false,
        details: {
          method,
        },
      });
    }

    if (!action) {
      throw createError({
        status: 400,
        code: 'INVALID_REQUEST',
        message: 'action required',
        category: 'validation',
        step: 'handler',
        resource: 'delta_history',
        action,
        retryable: false,
        details: {
          field: 'action',
        },
      });
    }

    validatePost(action, req.body || {});
    const data = await dispatchPost(action, req.body || {});

    return res.json({
      ok: true,
      data,
      request_id: requestId,
    });
  } catch (error) {
    logError(error, {
      requestId,
      method,
      action,
    });

    const normalized = normalizeError(error, {
      requestId,
      action,
    });

    return res.status(normalized.status).json(normalized.body);
  }
}

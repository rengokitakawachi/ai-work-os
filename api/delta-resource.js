import crypto from 'crypto';

import { auth, cors } from '../src/services/internal-auth.js';
import {
  treeDelta,
  readDelta,
  bulkReadDelta,
} from '../src/services/delta-resource.js';
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

function parseFilesParam(value) {
  const raw = ensureString(value);

  if (!raw) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'files required',
      category: 'validation',
      step: 'parseFilesParam',
      resource: 'delta',
      action: 'bulk',
      retryable: false,
      details: {
        field: 'files',
      },
    });
  }

  const files = raw
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (files.length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'files required',
      category: 'validation',
      step: 'parseFilesParam',
      resource: 'delta',
      action: 'bulk',
      retryable: false,
      details: {
        field: 'files',
      },
    });
  }

  return files;
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
      resource: 'delta',
      action,
      retryable: false,
      details: {
        field: 'file',
      },
    });
  }

  return file;
}

function validateGet(action, query) {
  normalizeBranch(query.branch, {
    step: 'validateGet',
    resource: 'delta',
    action,
  });

  if (!['tree', 'read', 'bulk'].includes(action)) {
    throw createError({
      status: 400,
      code: 'ACTION_NOT_SUPPORTED',
      message: 'action not supported',
      category: 'routing',
      step: 'validateGet',
      resource: 'delta',
      action,
      retryable: false,
    });
  }

  if (action === 'read') {
    requireFile(query.file, action);
  }

  if (action === 'bulk') {
    parseFilesParam(query.files);
  }
}

async function dispatchGet(action, query) {
  const options = {
    branch: ensureString(query.branch),
  };

  if (action === 'tree') {
    return treeDelta(options);
  }

  if (action === 'read') {
    return readDelta(requireFile(query.file, action), options);
  }

  if (action === 'bulk') {
    return bulkReadDelta(parseFilesParam(query.files), options);
  }

  throw createError({
    status: 400,
    code: 'ACTION_NOT_SUPPORTED',
    message: 'action not supported',
    category: 'routing',
    step: 'dispatchGet',
    resource: 'delta',
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
        resource: error?.resource || 'delta',
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
      resource: 'delta',
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
    if (method !== 'GET') {
      throw createError({
        status: 405,
        code: 'METHOD_NOT_ALLOWED',
        message: 'method not allowed',
        category: 'routing',
        step: 'handler',
        resource: 'delta',
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
        resource: 'delta',
        action,
        retryable: false,
        details: {
          field: 'action',
        },
      });
    }

    validateGet(action, req.query || {});
    const data = await dispatchGet(action, req.query || {});

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

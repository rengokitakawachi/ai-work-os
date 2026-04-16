import crypto from 'crypto';

import { auth, cors } from '../src/services/internal-auth.js';

import {
  listDocs,
  readDoc,
  bulkReadDocs,
} from '../src/services/repo-resource/docs.js';

import {
  treeNotes,
  readNote,
  bulkReadNotes,
  createNote,
  updateNote,
  deleteNote,
} from '../src/services/repo-resource/notes.js';

import {
  treeCode,
  readCode,
  bulkReadCode,
  createCode,
  updateCode,
} from '../src/services/repo-resource/code.js';

import { createError } from '../src/services/repo-resource/common.js';

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function createRequestId() {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function parseFilesParam(value, context) {
  const raw = ensureString(value);

  if (!raw) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'files required',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'files',
      },
    });
  }

  const files = raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (files.length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'files required',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'files',
      },
    });
  }

  return files;
}

function requireFile(value, context) {
  const file = ensureString(value);

  if (!file) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'file required',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'file',
      },
    });
  }

  return file;
}

function requireContent(value, context) {
  if (typeof value !== 'string' || value.length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'content required',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'content',
      },
    });
  }

  return value;
}

function validateGet(resource, action, query) {
  if (resource === 'docs') {
    if (!['list', 'read', 'bulk'].includes(action)) {
      throw createError({
        status: 400,
        code: 'ACTION_NOT_SUPPORTED',
        message: 'action not supported',
        category: 'routing',
        step: 'validateGet',
        resource,
        action,
        retryable: false,
      });
    }

    if (action === 'read') {
      requireFile(query.file, {
        step: 'validateGet',
        resource,
        action,
      });
    }

    if (action === 'bulk') {
      parseFilesParam(query.files, {
        step: 'validateGet',
        resource,
        action,
      });
    }

    return;
  }

  if (resource === 'notes' || resource === 'code') {
    if (
      (resource === 'notes' && !['tree', 'read', 'bulk'].includes(action)) ||
      (resource === 'code' && !['tree', 'read', 'bulk'].includes(action))
    ) {
      throw createError({
        status: 400,
        code: 'ACTION_NOT_SUPPORTED',
        message: 'action not supported',
        category: 'routing',
        step: 'validateGet',
        resource,
        action,
        retryable: false,
      });
    }

    if (action === 'read') {
      requireFile(query.file, {
        step: 'validateGet',
        resource,
        action,
      });
    }

    if (action === 'bulk') {
      parseFilesParam(query.files, {
        step: 'validateGet',
        resource,
        action,
      });
    }

    return;
  }

  throw createError({
    status: 400,
    code: 'RESOURCE_NOT_SUPPORTED',
    message: 'resource not supported',
    category: 'routing',
    step: 'validateGet',
    resource,
    action,
    retryable: false,
  });
}

function validatePost(resource, action, body) {
  if (resource === 'notes') {
    if (!['create', 'update', 'delete'].includes(action)) {
      throw createError({
        status: 400,
        code: 'ACTION_NOT_SUPPORTED',
        message: 'action not supported',
        category: 'routing',
        step: 'validatePost',
        resource,
        action,
        retryable: false,
      });
    }

    requireFile(body?.file, {
      step: 'validatePost',
      resource,
      action,
    });

    if (action !== 'delete') {
      requireContent(body?.content, {
        step: 'validatePost',
        resource,
        action,
      });
    }

    return;
  }

  if (resource === 'code') {
    if (!['create', 'update'].includes(action)) {
      throw createError({
        status: 400,
        code: 'ACTION_NOT_SUPPORTED',
        message: 'action not supported',
        category: 'routing',
        step: 'validatePost',
        resource,
        action,
        retryable: false,
      });
    }

    requireFile(body?.file, {
      step: 'validatePost',
      resource,
      action,
    });

    requireContent(body?.content, {
      step: 'validatePost',
      resource,
      action,
    });

    return;
  }

  throw createError({
    status: 400,
    code: 'RESOURCE_NOT_SUPPORTED',
    message: 'resource not supported',
    category: 'routing',
    step: 'validatePost',
    resource,
    action,
    retryable: false,
  });
}

async function dispatchGet(resource, action, query) {
  if (resource === 'docs') {
    if (action === 'list') {
      return listDocs();
    }

    if (action === 'read') {
      return readDoc(
        requireFile(query.file, {
          step: 'dispatchGet',
          resource,
          action,
        })
      );
    }

    if (action === 'bulk') {
      return bulkReadDocs(
        parseFilesParam(query.files, {
          step: 'dispatchGet',
          resource,
          action,
        })
      );
    }
  }

  if (resource === 'notes') {
    if (action === 'tree') {
      return treeNotes();
    }

    if (action === 'read') {
      return readNote(
        requireFile(query.file, {
          step: 'dispatchGet',
          resource,
          action,
        })
      );
    }

    if (action === 'bulk') {
      return bulkReadNotes(
        parseFilesParam(query.files, {
          step: 'dispatchGet',
          resource,
          action,
        })
      );
    }
  }

  if (resource === 'code') {
    if (action === 'tree') {
      return treeCode();
    }

    if (action === 'read') {
      return readCode(
        requireFile(query.file, {
          step: 'dispatchGet',
          resource,
          action,
        })
      );
    }

    if (action === 'bulk') {
      return bulkReadCode(
        parseFilesParam(query.files, {
          step: 'dispatchGet',
          resource,
          action,
        })
      );
    }
  }

  throw createError({
    status: 400,
    code: 'ACTION_NOT_SUPPORTED',
    message: 'action not supported',
    category: 'routing',
    step: 'dispatchGet',
    resource,
    action,
    retryable: false,
  });
}

async function dispatchPost(resource, action, body) {
  const file = requireFile(body?.file, {
    step: 'dispatchPost',
    resource,
    action,
  });

  const message = ensureString(body?.message);
  const sha = ensureString(body?.sha);

  if (resource === 'notes') {
    if (action === 'create') {
      const content = requireContent(body?.content, {
        step: 'dispatchPost',
        resource,
        action,
      });

      return createNote(file, content, message);
    }

    if (action === 'update') {
      const content = requireContent(body?.content, {
        step: 'dispatchPost',
        resource,
        action,
      });

      return updateNote(file, content, message, sha);
    }

    if (action === 'delete') {
      return deleteNote(file, message, sha);
    }
  }

  if (resource === 'code') {
    const content = requireContent(body?.content, {
      step: 'dispatchPost',
      resource,
      action,
    });

    if (action === 'create') {
      return createCode(file, content, message);
    }

    if (action === 'update') {
      return updateCode(file, content, message, sha);
    }
  }

  throw createError({
    status: 400,
    code: 'ACTION_NOT_SUPPORTED',
    message: 'action not supported',
    category: 'routing',
    step: 'dispatchPost',
    resource,
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
        resource: error?.resource || context.resource || '',
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
  const payload = {
    level: 'error',
    request_id: context.requestId || '',
    method: context.method || '',
    resource: context.resource || '',
    action: context.action || '',
    code: error?.code || 'UNKNOWN_ERROR',
    message: error?.message || 'Unknown error',
    category: error?.category || 'internal',
    step: error?.step || 'unknown',
    status: error?.status || 500,
    retryable: Boolean(error?.retryable),
    details: error?.details || {},
    cause: error?.cause
      ? {
          name: error.cause.name,
          message: error.cause.message,
        }
      : null,
  };

  console.error(JSON.stringify(payload));
}

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  const requestId = createRequestId();
  const method = ensureString(req.method).toUpperCase();
  const resource = ensureString(req.query?.resource);
  const action = ensureString(req.query?.action);

  if (!auth(req, res)) {
    return;
  }

  try {
    if (!action || !resource) {
      throw createError({
        status: 400,
        code: 'INVALID_REQUEST',
        message: 'action and resource required',
        category: 'validation',
        step: 'handler',
        resource,
        action,
        retryable: false,
        details: {
          missing: [
            !action ? 'action' : null,
            !resource ? 'resource' : null,
          ].filter(Boolean),
        },
      });
    }

    if (method === 'GET') {
      validateGet(resource, action, req.query || {});
      const data = await dispatchGet(resource, action, req.query || {});
      return res.json({
        ok: true,
        data,
        request_id: requestId,
      });
    }

    if (method === 'POST') {
      validatePost(resource, action, req.body || {});
      const data = await dispatchPost(resource, action, req.body || {});
      return res.json({
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
      action,
      retryable: false,
      details: {
        method,
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

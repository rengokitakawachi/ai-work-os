// src/services/tasks/error.js

import crypto from 'crypto';

export function createRequestId() {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createError({
  status = 500,
  code = 'UNKNOWN_ERROR',
  message = 'Unknown error',
  category = 'internal',
  step = 'unknown',
  resource = 'tasks',
  action = '',
  retryable = false,
  details = {},
  cause = null,
}) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  error.category = category;
  error.step = step;
  error.resource = resource;
  error.action = action;
  error.retryable = retryable;
  error.details = details;
  error.cause = cause;
  return error;
}

export function normalizeError(error, context = {}) {
  return {
    status: error?.status || 500,
    body: {
      ok: false,
      error: {
        code: error?.code || 'UNKNOWN_ERROR',
        message: error?.message || 'Unknown error',
        category: error?.category || 'internal',
        step: error?.step || 'unknown',
        resource: error?.resource || context.resource || 'tasks',
        action: error?.action || context.action || '',
        status: error?.status || 500,
        retryable: Boolean(error?.retryable),
        details: error?.details || {},
        request_id: context.requestId || '',
      },
    },
  };
}

export function logError(error, context = {}) {
  const payload = {
    level: 'error',
    request_id: context.requestId || '',
    method: context.method || '',
    resource: context.resource || 'tasks',
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

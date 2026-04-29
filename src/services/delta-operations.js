import {
  createError,
  assertSafeRelativePath,
  getContentFile,
  putContentFile,
} from './repo-resource/common.js';

export const DELTA_OPERATIONS_ROOT = 'systems/delta/operations/';
export const DELTA_ACTIVE_OPERATIONS_FILE = 'active_operations.md';
export const DELTA_OPERATIONS_WRITE_SCOPE = `${DELTA_OPERATIONS_ROOT}${DELTA_ACTIVE_OPERATIONS_FILE}`;

const REQUIRED_CONTENT_MARKERS = [
  '# delta active_operations',
  '## Day0',
  '## Rules',
  'Delta operations are learning execution order, not calendar schedule.',
  'Daily review updates learning history and next operations.',
];

function buildDeltaOperationsPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    step: context.step || 'buildDeltaOperationsPath',
    resource: 'delta_operations',
    action: context.action || '',
  });

  if (safe !== DELTA_ACTIVE_OPERATIONS_FILE) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_operations can update active_operations.md only',
      category: 'validation',
      step: context.step || 'buildDeltaOperationsPath',
      resource: 'delta_operations',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        allowed_file: DELTA_ACTIVE_OPERATIONS_FILE,
        expected_root: DELTA_OPERATIONS_ROOT,
      },
    });
  }

  return DELTA_OPERATIONS_WRITE_SCOPE;
}

function assertValidDeltaOperationsContent(content, context = {}) {
  if (typeof content !== 'string' || content.trim().length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_operations content required',
      category: 'validation',
      step: context.step || 'assertValidDeltaOperationsContent',
      resource: 'delta_operations',
      action: context.action || 'update',
      retryable: false,
      details: {
        field: 'content',
      },
    });
  }

  const missing = REQUIRED_CONTENT_MARKERS.filter((marker) => !content.includes(marker));

  if (missing.length > 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_operations content failed validation',
      category: 'validation',
      step: context.step || 'assertValidDeltaOperationsContent',
      resource: 'delta_operations',
      action: context.action || 'update',
      retryable: false,
      details: {
        missing_markers: missing,
      },
    });
  }
}

function normalizeMessage(message, fallback) {
  const safeMessage = typeof message === 'string' ? message.trim() : '';
  return safeMessage || fallback;
}

export async function updateDeltaOperations(
  file,
  content,
  message = '',
  sha = '',
  options = {}
) {
  const path = buildDeltaOperationsPath(file, {
    step: 'updateDeltaOperations',
    action: 'update',
  });

  assertValidDeltaOperationsContent(content, {
    step: 'updateDeltaOperations',
    action: 'update',
  });

  let currentSha = typeof sha === 'string' ? sha.trim() : '';

  if (!currentSha) {
    try {
      const existing = await getContentFile(path, {
        step: 'updateDeltaOperations',
        resource: 'delta_operations',
        action: 'update',
        branch: options.branch,
      });
      currentSha = existing.sha;
    } catch (error) {
      if (error.code === 'GITHUB_NOT_FOUND') {
        throw createError({
          status: 404,
          code: 'NOT_FOUND',
          message: 'Delta active_operations file not found',
          category: 'service',
          step: 'updateDeltaOperations',
          resource: 'delta_operations',
          action: 'update',
          retryable: false,
          details: {
            file,
            path,
          },
        });
      }

      throw error;
    }
  }

  const result = await putContentFile(
    path,
    content,
    normalizeMessage(message, `update ${path}`),
    currentSha,
    {
      step: 'updateDeltaOperations',
      resource: 'delta_operations',
      action: 'update',
      branch: options.branch,
    }
  );

  return {
    resource: 'delta_operations',
    root: DELTA_OPERATIONS_ROOT,
    path: result.content.path,
    sha: result.content.sha,
    branch: result.branch,
    status: 'UPDATED',
    write_scope: DELTA_OPERATIONS_WRITE_SCOPE,
  };
}

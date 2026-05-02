import {
  createError,
  assertSafeRelativePath,
  getContentFile,
  putContentFile,
} from './repo-resource/common.js';

export const DELTA_OPERATIONS_ROOT = 'systems/delta/operations/';
export const DELTA_OPERATIONS_ALLOWED_FILES = ['active_operations.md'];

function buildDeltaOperationsPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    step: context.step || 'buildDeltaOperationsPath',
    resource: 'delta_operations',
    action: context.action || '',
  });

  if (safe.startsWith(DELTA_OPERATIONS_ROOT) || safe.startsWith('systems/')) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_operations file must be relative to systems/delta/operations',
      category: 'validation',
      step: context.step || 'buildDeltaOperationsPath',
      resource: 'delta_operations',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        expected_root: DELTA_OPERATIONS_ROOT,
      },
    });
  }

  if (!DELTA_OPERATIONS_ALLOWED_FILES.includes(safe)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_operations file not allowed',
      category: 'validation',
      step: context.step || 'buildDeltaOperationsPath',
      resource: 'delta_operations',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        allowed_files: DELTA_OPERATIONS_ALLOWED_FILES,
      },
    });
  }

  return `${DELTA_OPERATIONS_ROOT}${safe}`;
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
          message: 'Delta operations file not found',
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
    write_scope: `${DELTA_OPERATIONS_ROOT}active_operations.md`,
  };
}

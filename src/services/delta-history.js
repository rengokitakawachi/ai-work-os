import {
  createError,
  assertSafeRelativePath,
  getContentFile,
  putContentFile,
} from './repo-resource/common.js';

export const DELTA_HISTORY_ROOT = 'systems/delta/history/';

function buildDeltaHistoryPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    step: context.step || 'buildDeltaHistoryPath',
    resource: 'delta_history',
    action: context.action || '',
  });

  if (safe.startsWith(DELTA_HISTORY_ROOT) || safe.startsWith('systems/')) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_history file must be relative to systems/delta/history',
      category: 'validation',
      step: context.step || 'buildDeltaHistoryPath',
      resource: 'delta_history',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        expected_root: DELTA_HISTORY_ROOT,
      },
    });
  }

  if (!safe.endsWith('.md')) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_history file must be a markdown file',
      category: 'validation',
      step: context.step || 'buildDeltaHistoryPath',
      resource: 'delta_history',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        allowed_extension: '.md',
      },
    });
  }

  return `${DELTA_HISTORY_ROOT}${safe}`;
}

function normalizeMessage(message, fallback) {
  const safeMessage = typeof message === 'string' ? message.trim() : '';
  return safeMessage || fallback;
}

export async function createDeltaHistory(file, content, message = '', options = {}) {
  const path = buildDeltaHistoryPath(file, {
    step: 'createDeltaHistory',
    action: 'create',
  });

  try {
    await getContentFile(path, {
      step: 'createDeltaHistory',
      resource: 'delta_history',
      action: 'create',
      branch: options.branch,
    });

    throw createError({
      status: 409,
      code: 'ALREADY_EXISTS',
      message: 'Delta history file already exists',
      category: 'service',
      step: 'createDeltaHistory',
      resource: 'delta_history',
      action: 'create',
      retryable: false,
      details: {
        file,
        path,
      },
    });
  } catch (error) {
    if (error.code && error.code !== 'GITHUB_NOT_FOUND') {
      throw error;
    }
  }

  const result = await putContentFile(
    path,
    content,
    normalizeMessage(message, `create ${path}`),
    '',
    {
      step: 'createDeltaHistory',
      resource: 'delta_history',
      action: 'create',
      branch: options.branch,
    }
  );

  return {
    resource: 'delta_history',
    root: DELTA_HISTORY_ROOT,
    path: result.content.path,
    sha: result.content.sha,
    branch: result.branch,
    status: 'CREATED',
    write_scope: `${DELTA_HISTORY_ROOT}*.md`,
  };
}

export async function updateDeltaHistory(
  file,
  content,
  message = '',
  sha = '',
  options = {}
) {
  const path = buildDeltaHistoryPath(file, {
    step: 'updateDeltaHistory',
    action: 'update',
  });

  let currentSha = typeof sha === 'string' ? sha.trim() : '';

  if (!currentSha) {
    try {
      const existing = await getContentFile(path, {
        step: 'updateDeltaHistory',
        resource: 'delta_history',
        action: 'update',
        branch: options.branch,
      });
      currentSha = existing.sha;
    } catch (error) {
      if (error.code === 'GITHUB_NOT_FOUND') {
        throw createError({
          status: 404,
          code: 'NOT_FOUND',
          message: 'Delta history file not found',
          category: 'service',
          step: 'updateDeltaHistory',
          resource: 'delta_history',
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
      step: 'updateDeltaHistory',
      resource: 'delta_history',
      action: 'update',
      branch: options.branch,
    }
  );

  return {
    resource: 'delta_history',
    root: DELTA_HISTORY_ROOT,
    path: result.content.path,
    sha: result.content.sha,
    branch: result.branch,
    status: 'UPDATED',
    write_scope: `${DELTA_HISTORY_ROOT}*.md`,
  };
}

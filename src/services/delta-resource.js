import {
  createError,
  assertSafeRelativePath,
  getConfig,
  getRepoTree,
  getContentFile,
  mapTreeItems,
  formatReadResponse,
} from './repo-resource/common.js';

export const DELTA_ROOT = 'systems/delta/';

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

export function buildDeltaPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    step: context.step || 'buildDeltaPath',
    resource: 'delta',
    action: context.action || '',
  });

  if (safe === DELTA_ROOT.slice(0, -1)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'file required',
      category: 'validation',
      step: context.step || 'buildDeltaPath',
      resource: 'delta',
      action: context.action || '',
      retryable: false,
      details: {
        field: 'file',
        file: safe,
      },
    });
  }

  if (safe.startsWith('systems/') && !safe.startsWith(DELTA_ROOT)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta file must be under systems/delta',
      category: 'validation',
      step: context.step || 'buildDeltaPath',
      resource: 'delta',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        expected_root: DELTA_ROOT,
      },
    });
  }

  const relative = safe.startsWith(DELTA_ROOT)
    ? safe.slice(DELTA_ROOT.length)
    : safe;

  return `${DELTA_ROOT}${relative}`;
}

export async function treeDelta(options = {}) {
  const tree = await getRepoTree(DELTA_ROOT, {
    step: 'treeDelta',
    resource: 'delta',
    action: 'tree',
    branch: options.branch,
  });

  return {
    resource: 'delta',
    root: DELTA_ROOT,
    branch: tree.branch,
    items: mapTreeItems(tree.items),
    count: tree.items.length,
    read_only: true,
  };
}

export async function readDelta(file, options = {}) {
  const path = buildDeltaPath(file, {
    step: 'readDelta',
    action: 'read',
  });

  try {
    const data = await getContentFile(path, {
      step: 'readDelta',
      resource: 'delta',
      action: 'read',
      branch: options.branch,
    });

    return {
      ...formatReadResponse(data),
      resource: 'delta',
      root: DELTA_ROOT,
      read_only: true,
    };
  } catch (error) {
    if (error.code === 'GITHUB_NOT_FOUND') {
      throw createError({
        status: 404,
        code: 'NOT_FOUND',
        message: 'Delta file not found',
        category: 'service',
        step: 'readDelta',
        resource: 'delta',
        action: 'read',
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

export async function bulkReadDelta(files, options = {}) {
  if (!Array.isArray(files) || files.length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'files required',
      category: 'validation',
      step: 'bulkReadDelta',
      resource: 'delta',
      action: 'bulk',
      retryable: false,
      details: {
        field: 'files',
      },
    });
  }

  getConfig({
    step: 'bulkReadDelta',
    resource: 'delta',
    action: 'bulk',
    branch: options.branch,
  });

  const results = await Promise.all(
    ensureArray(files).map(async (file) => {
      try {
        const data = await readDelta(file, options);
        return {
          ok: true,
          file,
          ...data,
        };
      } catch (error) {
        return {
          ok: false,
          file,
          error: {
            code: error?.code || 'UNKNOWN_ERROR',
            message: error?.message || 'Unknown error',
          },
        };
      }
    })
  );

  return results;
}

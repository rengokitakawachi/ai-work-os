import {
  createError,
  buildCodePath,
  getRepoTree,
  getContentFile,
  putContentFile,
  mapTreeItems,
  formatReadResponse,
} from './common.js';

function filterCodeTreeItems(tree) {
  return tree.filter((item) => {
    if (item.path.startsWith('docs/')) return false;
    if (item.path.startsWith('notes/')) return false;

    return (
      item.path.startsWith('src/') ||
      item.path.startsWith('api/') ||
      item.path.startsWith('lib/') ||
      item.path.startsWith('scripts/') ||
      item.path.startsWith('config/')
    );
  });
}

export async function treeCode() {
  const tree = await getRepoTree('', {
    step: 'treeCode',
    resource: 'code',
    action: 'tree',
  });

  const items = mapTreeItems(filterCodeTreeItems(tree));

  return {
    resource: 'code',
    items,
    count: items.length,
  };
}

export async function readCode(file) {
  const path = buildCodePath(file, {
    step: 'readCode',
    resource: 'code',
    action: 'read',
  });

  try {
    const data = await getContentFile(path, {
      step: 'readCode',
      resource: 'code',
      action: 'read',
    });

    return formatReadResponse(data);
  } catch (error) {
    if (error.code === 'GITHUB_NOT_FOUND') {
      throw createError({
        status: 404,
        code: 'NOT_FOUND',
        message: 'Code file not found',
        category: 'service',
        step: 'readCode',
        resource: 'code',
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

export async function bulkReadCode(files) {
  if (!Array.isArray(files) || files.length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'files required',
      category: 'validation',
      step: 'bulkReadCode',
      resource: 'code',
      action: 'bulk',
      retryable: false,
      details: {
        field: 'files',
      },
    });
  }

  const results = await Promise.all(
    files.map(async (file) => {
      try {
        const data = await readCode(file);
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

export async function createCode(file, content, message = '') {
  const path = buildCodePath(file, {
    step: 'createCode',
    resource: 'code',
    action: 'create',
  });

  try {
    await getContentFile(path, {
      step: 'createCode',
      resource: 'code',
      action: 'create',
    });

    throw createError({
      status: 409,
      code: 'ALREADY_EXISTS',
      message: 'Code file already exists',
      category: 'service',
      step: 'createCode',
      resource: 'code',
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

  const commitMessage = message || `create ${path}`;
  const result = await putContentFile(path, content, commitMessage, '', {
    step: 'createCode',
    resource: 'code',
    action: 'create',
  });

  return {
    path: result.content.path,
    sha: result.content.sha,
    status: 'CREATED',
  };
}

export async function updateCode(file, content, message = '', sha = '') {
  const path = buildCodePath(file, {
    step: 'updateCode',
    resource: 'code',
    action: 'update',
  });

  let currentSha = sha;

  if (!currentSha) {
    try {
      const existing = await getContentFile(path, {
        step: 'updateCode',
        resource: 'code',
        action: 'update',
      });
      currentSha = existing.sha;
    } catch (error) {
      if (error.code === 'GITHUB_NOT_FOUND') {
        throw createError({
          status: 404,
          code: 'NOT_FOUND',
          message: 'Code file not found',
          category: 'service',
          step: 'updateCode',
          resource: 'code',
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

  const commitMessage = message || `update ${path}`;
  const result = await putContentFile(path, content, commitMessage, currentSha, {
    step: 'updateCode',
    resource: 'code',
    action: 'update',
  });

  return {
    path: result.content.path,
    sha: result.content.sha,
    status: 'UPDATED',
  };
}

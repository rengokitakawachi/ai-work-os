import {
  createError,
  buildDocsPath,
  getRepoTree,
  getContentFile,
  mapTreeItems,
  formatReadResponse,
} from './common.js';

export async function listDocs() {
  const tree = await getRepoTree('docs/', {
    step: 'listDocs',
    resource: 'docs',
    action: 'list',
  });

  const items = tree
    .filter((item) => item.type === 'blob')
    .map((item) => ({
      name: item.path.split('/').pop(),
      path: item.path,
      sha: item.sha,
      size: item.size,
    }));

  return {
    resource: 'docs',
    items,
    count: items.length,
  };
}

export async function readDoc(file) {
  const path = buildDocsPath(file, {
    step: 'readDoc',
    resource: 'docs',
    action: 'read',
  });

  try {
    const data = await getContentFile(path, {
      step: 'readDoc',
      resource: 'docs',
      action: 'read',
    });

    return formatReadResponse(data);
  } catch (error) {
    if (error.code === 'GITHUB_NOT_FOUND') {
      throw createError({
        status: 404,
        code: 'NOT_FOUND',
        message: 'Document not found',
        category: 'service',
        step: 'readDoc',
        resource: 'docs',
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

export async function bulkReadDocs(files) {
  if (!Array.isArray(files) || files.length === 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'files required',
      category: 'validation',
      step: 'bulkReadDocs',
      resource: 'docs',
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
        const data = await readDoc(file);
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

export async function treeDocs() {
  const tree = await getRepoTree('docs/', {
    step: 'treeDocs',
    resource: 'docs',
    action: 'tree',
  });

  const items = mapTreeItems(tree);

  return {
    resource: 'docs',
    items,
    count: items.length,
  };
}

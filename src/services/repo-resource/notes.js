import {
  createError,
  buildNotesPath,
  getRepoTree,
  getContentFile,
  putContentFile,
  mapTreeItems,
  formatReadResponse,
} from './common.js';

export async function treeNotes() {
  const tree = await getRepoTree('notes/', {
    step: 'treeNotes',
    resource: 'notes',
    action: 'tree',
  });

  const items = mapTreeItems(tree);

  return {
    resource: 'notes',
    items,
    count: items.length,
  };
}

export async function readNote(file) {
  const path = buildNotesPath(file, {
    step: 'readNote',
    resource: 'notes',
    action: 'read',
  });

  try {
    const data = await getContentFile(path, {
      step: 'readNote',
      resource: 'notes',
      action: 'read',
    });

    return formatReadResponse(data);
  } catch (error) {
    if (error.code === 'GITHUB_NOT_FOUND') {
      throw createError({
        status: 404,
        code: 'NOT_FOUND',
        message: 'Note not found',
        category: 'service',
        step: 'readNote',
        resource: 'notes',
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

export async function createNote(file, content, message = '') {
  const path = buildNotesPath(file, {
    step: 'createNote',
    resource: 'notes',
    action: 'create',
  });

  try {
    await getContentFile(path, {
      step: 'createNote',
      resource: 'notes',
      action: 'create',
    });

    throw createError({
      status: 409,
      code: 'ALREADY_EXISTS',
      message: 'Note already exists',
      category: 'service',
      step: 'createNote',
      resource: 'notes',
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
    step: 'createNote',
    resource: 'notes',
    action: 'create',
  });

  return {
    path: result.content.path,
    sha: result.content.sha,
    status: 'CREATED',
  };
}

export async function updateNote(file, content, message = '', sha = '') {
  const path = buildNotesPath(file, {
    step: 'updateNote',
    resource: 'notes',
    action: 'update',
  });

  let currentSha = sha;

  if (!currentSha) {
    try {
      const existing = await getContentFile(path, {
        step: 'updateNote',
        resource: 'notes',
        action: 'update',
      });
      currentSha = existing.sha;
    } catch (error) {
      if (error.code === 'GITHUB_NOT_FOUND') {
        throw createError({
          status: 404,
          code: 'NOT_FOUND',
          message: 'Note not found',
          category: 'service',
          step: 'updateNote',
          resource: 'notes',
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
    step: 'updateNote',
    resource: 'notes',
    action: 'update',
  });

  return {
    path: result.content.path,
    sha: result.content.sha,
    status: 'UPDATED',
  };
}

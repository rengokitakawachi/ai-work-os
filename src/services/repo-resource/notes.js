import {
  createError,
  buildNotesPath,
  getRepoTree,
  getContentFile,
  putContentFile,
  deleteContentFile,
  mapTreeItems,
  formatReadResponse,
} from './common.js';

const DELETE_ALLOWED_PREFIXES = [
  'inbox/',
  'exploration/',
  'logs/',
  'design/',
];

function assertNotesDeleteAllowed(file) {
  const safeFile = typeof file === 'string' ? file.trim() : '';

  const isAllowed = DELETE_ALLOWED_PREFIXES.some((prefix) =>
    safeFile.startsWith(prefix)
  );

  if (!isAllowed) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'notes delete path not allowed',
      category: 'validation',
      step: 'deleteNote',
      resource: 'notes',
      action: 'delete',
      retryable: false,
      details: {
        file: safeFile,
        allowed_prefixes: DELETE_ALLOWED_PREFIXES,
      },
    });
  }

  return safeFile;
}

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

export async function deleteNote(file, message = '', sha = '') {
  const allowedFile = assertNotesDeleteAllowed(file);

  const path = buildNotesPath(allowedFile, {
    step: 'deleteNote',
    resource: 'notes',
    action: 'delete',
  });

  let currentSha = typeof sha === 'string' ? sha.trim() : '';

  if (!currentSha) {
    try {
      const existing = await getContentFile(path, {
        step: 'deleteNote',
        resource: 'notes',
        action: 'delete',
      });
      currentSha = existing.sha;
    } catch (error) {
      if (error.code === 'GITHUB_NOT_FOUND') {
        throw createError({
          status: 404,
          code: 'NOT_FOUND',
          message: 'Note not found',
          category: 'service',
          step: 'deleteNote',
          resource: 'notes',
          action: 'delete',
          retryable: false,
          details: {
            file: allowedFile,
            path,
          },
        });
      }

      throw error;
    }
  }

  try {
    const commitMessage = message || `delete ${path}`;
    const result = await deleteContentFile(path, commitMessage, currentSha, {
      step: 'deleteNote',
      resource: 'notes',
      action: 'delete',
    });

    return {
      path,
      sha: currentSha,
      commit_sha: result.commit.sha,
      status: 'DELETED',
    };
  } catch (error) {
    if (error.code === 'CONFLICT') {
      throw createError({
        status: 409,
        code: 'CONFLICT',
        message: 'Note delete conflict',
        category: 'service',
        step: 'deleteNote',
        resource: 'notes',
        action: 'delete',
        retryable: false,
        details: {
          file: allowedFile,
          path,
        },
      });
    }

    throw error;
  }
}

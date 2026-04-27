import {
  createError,
  getConfig,
  githubRequest,
  normalizeBranch,
} from './common.js';

function encodeGitRefPath(ref) {
  return ref.split('/').map((part) => encodeURIComponent(part)).join('/');
}

function isNotFound(error) {
  return error?.code === 'GITHUB_NOT_FOUND' || error?.status === 404;
}

export function validateBranchCreateInput(branchValue, fromBranchValue = 'main') {
  const branch = normalizeBranch(branchValue, {
    step: 'createBranch',
    resource: 'repo',
    action: 'create_branch',
  });

  if (!branch) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'branch required',
      category: 'validation',
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
      retryable: false,
      details: {
        field: 'branch',
      },
    });
  }

  const fromBranch =
    normalizeBranch(fromBranchValue, {
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
    }) || 'main';

  if (branch === 'main') {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'cannot create main branch',
      category: 'validation',
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
      retryable: false,
      details: {
        field: 'branch',
        branch,
      },
    });
  }

  if (branch === fromBranch) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'branch must differ from from_branch',
      category: 'validation',
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
      retryable: false,
      details: {
        field: 'branch',
        branch,
        from_branch: fromBranch,
      },
    });
  }

  if (!branch.startsWith('feature/')) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'branch must start with feature/',
      category: 'validation',
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
      retryable: false,
      details: {
        field: 'branch',
        branch,
        required_prefix: 'feature/',
      },
    });
  }

  return {
    branch,
    fromBranch,
  };
}

export async function createBranch(branchValue, fromBranchValue = 'main', message = '') {
  const { branch, fromBranch } = validateBranchCreateInput(
    branchValue,
    fromBranchValue
  );

  const { owner, repo } = getConfig({
    step: 'createBranch',
    resource: 'repo',
    action: 'create_branch',
  });

  let sourceRef;

  try {
    sourceRef = await githubRequest(
      `/repos/${owner}/${repo}/git/ref/${encodeGitRefPath(`heads/${fromBranch}`)}`
    );
  } catch (error) {
    if (isNotFound(error)) {
      throw createError({
        status: 404,
        code: 'NOT_FOUND',
        message: 'Source branch not found',
        category: 'service',
        step: 'createBranch',
        resource: 'repo',
        action: 'create_branch',
        retryable: false,
        details: {
          from_branch: fromBranch,
        },
        cause: error,
      });
    }

    throw error;
  }

  const sourceSha = sourceRef?.object?.sha;

  if (!sourceSha) {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'Source branch SHA missing',
      category: 'service',
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
      retryable: false,
      details: {
        from_branch: fromBranch,
      },
    });
  }

  try {
    await githubRequest(
      `/repos/${owner}/${repo}/git/ref/${encodeGitRefPath(`heads/${branch}`)}`
    );

    throw createError({
      status: 409,
      code: 'ALREADY_EXISTS',
      message: 'Branch already exists',
      category: 'service',
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
      retryable: false,
      details: {
        branch,
      },
    });
  } catch (error) {
    if (error?.code === 'ALREADY_EXISTS') {
      throw error;
    }

    if (!isNotFound(error)) {
      throw error;
    }
  }

  const ref = `refs/heads/${branch}`;
  const payload = {
    ref,
    sha: sourceSha,
  };

  const data = await githubRequest(`/repos/${owner}/${repo}/git/refs`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!data?.ref || data.ref !== ref) {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'GitHub branch create failed',
      category: 'service',
      step: 'createBranch',
      resource: 'repo',
      action: 'create_branch',
      retryable: false,
      details: {
        branch,
        from_branch: fromBranch,
        source_sha: sourceSha,
      },
    });
  }

  return {
    branch,
    from_branch: fromBranch,
    source_sha: sourceSha,
    ref: data.ref,
    status: 'CREATED',
    ...(typeof message === 'string' && message.trim()
      ? { message: message.trim() }
      : {}),
  };
}

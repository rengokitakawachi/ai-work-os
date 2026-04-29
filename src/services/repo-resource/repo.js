import {
  createError,
  getConfig,
  githubRequest,
  normalizeBranch,
  assertSafeRelativePath,
  decode,
} from './common.js';

const HISTORY_ALLOWED_PREFIXES = [
  'docs/',
  'notes/',
  'src/',
  'api/',
  'lib/',
  'scripts/',
  'config/',
  '.github/workflows/',
  'systems/',
];

const HISTORY_ALLOWED_ROOT_FILES = [
  '.nvmrc',
  'package.json',
  'vitest.config.js',
  'jest.config.js',
  'tsconfig.json',
  'eslint.config.js',
  'pnpm-workspace.yaml',
  'README.md',
];

function encodeGitRefPath(ref) {
  return ref.split('/').map((part) => encodeURIComponent(part)).join('/');
}

function isNotFound(error) {
  return error?.code === 'GITHUB_NOT_FOUND' || error?.status === 404;
}

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function ensurePositiveLimit(value, fallback = 20, max = 100) {
  const parsed = Number.parseInt(String(value || ''), 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, max);
}

function buildQuery(params) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).length > 0) {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : '';
}

export function validateRepoReadPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    step: context.step || 'validateRepoReadPath',
    resource: 'repo',
    action: context.action || '',
  });

  if (HISTORY_ALLOWED_ROOT_FILES.includes(safe)) {
    return safe;
  }

  const isAllowed = HISTORY_ALLOWED_PREFIXES.some((prefix) =>
    safe.startsWith(prefix)
  );

  if (!isAllowed) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'repo history path not allowed',
      category: 'validation',
      step: context.step || 'validateRepoReadPath',
      resource: 'repo',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        allowed_prefixes: HISTORY_ALLOWED_PREFIXES,
        allowed_root_files: HISTORY_ALLOWED_ROOT_FILES,
      },
    });
  }

  return safe;
}

function normalizeSearchPath(path, context = {}) {
  const raw = ensureString(path);

  if (!raw) {
    return '';
  }

  if (raw.endsWith('/')) {
    const safe = assertSafeRelativePath(raw.slice(0, -1) || '.', {
      step: context.step || 'normalizeSearchPath',
      resource: 'repo',
      action: context.action || 'search',
    });
    return `${safe}/`;
  }

  return validateRepoReadPath(raw, {
    step: context.step || 'normalizeSearchPath',
    action: context.action || 'search',
  });
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

export async function searchRepoText(queryValue, options = {}) {
  const query = ensureString(queryValue);

  if (!query) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'query required',
      category: 'validation',
      step: 'searchRepoText',
      resource: 'repo',
      action: 'search',
      retryable: false,
      details: {
        field: 'query',
      },
    });
  }

  const path = normalizeSearchPath(options.path || options.file || '', {
    step: 'searchRepoText',
    action: 'search',
  });

  const perPage = ensurePositiveLimit(options.per_page, 20, 100);
  const { owner, repo } = getConfig({
    step: 'searchRepoText',
    resource: 'repo',
    action: 'search',
  });

  const qualifiers = [`repo:${owner}/${repo}`];
  if (path) {
    qualifiers.push(`path:${path}`);
  }

  const q = `${JSON.stringify(query)} ${qualifiers.join(' ')}`;
  const data = await githubRequest(
    `/search/code${buildQuery({ q, per_page: perPage })}`
  );

  const items = Array.isArray(data?.items) ? data.items : [];

  return {
    resource: 'repo',
    action: 'search',
    query,
    path: path || undefined,
    total_count: data?.total_count || 0,
    incomplete_results: Boolean(data?.incomplete_results),
    count: items.length,
    items: items.map((item) => ({
      name: item.name,
      path: item.path,
      sha: item.sha,
      html_url: item.html_url,
      repository: item.repository?.full_name || '',
    })),
  };
}

export async function getFileHistory(file, options = {}) {
  const path = validateRepoReadPath(file, {
    step: 'getFileHistory',
    action: 'history',
  });

  const ref =
    normalizeBranch(options.ref, {
      step: 'getFileHistory',
      resource: 'repo',
      action: 'history',
    }) ||
    normalizeBranch(options.branch, {
      step: 'getFileHistory',
      resource: 'repo',
      action: 'history',
    }) ||
    '';

  const perPage = ensurePositiveLimit(options.per_page, 20, 100);
  const { owner, repo, branch } = getConfig({
    step: 'getFileHistory',
    resource: 'repo',
    action: 'history',
    branch: ref,
  });

  const commits = await githubRequest(
    `/repos/${owner}/${repo}/commits${buildQuery({
      path,
      sha: ref || branch,
      per_page: perPage,
    })}`
  );

  if (!Array.isArray(commits)) {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'GitHub commits response invalid',
      category: 'service',
      step: 'getFileHistory',
      resource: 'repo',
      action: 'history',
      retryable: false,
      details: {
        file: path,
      },
    });
  }

  return {
    resource: 'repo',
    action: 'history',
    file: path,
    ref: ref || branch,
    count: commits.length,
    commits: commits.map((item) => ({
      sha: item.sha,
      html_url: item.html_url,
      message: item.commit?.message || '',
      author_name: item.commit?.author?.name || '',
      author_email: item.commit?.author?.email || '',
      authored_at: item.commit?.author?.date || '',
      committer_name: item.commit?.committer?.name || '',
      committed_at: item.commit?.committer?.date || '',
    })),
  };
}

export async function showFileAtRef(file, refValue, options = {}) {
  const path = validateRepoReadPath(file, {
    step: 'showFileAtRef',
    action: 'show',
  });

  const ref =
    normalizeBranch(refValue, {
      step: 'showFileAtRef',
      resource: 'repo',
      action: 'show',
    }) ||
    normalizeBranch(options.branch, {
      step: 'showFileAtRef',
      resource: 'repo',
      action: 'show',
    });

  if (!ref) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'ref required',
      category: 'validation',
      step: 'showFileAtRef',
      resource: 'repo',
      action: 'show',
      retryable: false,
      details: {
        field: 'ref',
      },
    });
  }

  const { owner, repo } = getConfig({
    step: 'showFileAtRef',
    resource: 'repo',
    action: 'show',
  });

  const data = await githubRequest(
    `/repos/${owner}/${repo}/contents/${path}${buildQuery({ ref })}`
  );

  if (!data || typeof data.content !== 'string') {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'GitHub content missing',
      category: 'service',
      step: 'showFileAtRef',
      resource: 'repo',
      action: 'show',
      retryable: false,
      details: {
        file: path,
        ref,
      },
    });
  }

  const content = decode(data.content);

  return {
    resource: 'repo',
    action: 'show',
    file: path,
    ref,
    name: data.name,
    path: data.path,
    sha: data.sha,
    size: data.size,
    content,
    content_length: content.length,
    fetched_at: new Date().toISOString(),
    status: content.length > 0 ? 'OK' : 'EMPTY',
  };
}

export async function compareRefs(baseValue, headValue, options = {}) {
  const base = normalizeBranch(baseValue, {
    step: 'compareRefs',
    resource: 'repo',
    action: 'compare',
  });
  const head = normalizeBranch(headValue, {
    step: 'compareRefs',
    resource: 'repo',
    action: 'compare',
  });

  if (!base || !head) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'base and head required',
      category: 'validation',
      step: 'compareRefs',
      resource: 'repo',
      action: 'compare',
      retryable: false,
      details: {
        missing: [!base ? 'base' : null, !head ? 'head' : null].filter(Boolean),
      },
    });
  }

  const file = ensureString(options.file)
    ? validateRepoReadPath(options.file, {
        step: 'compareRefs',
        action: 'compare',
      })
    : '';

  const { owner, repo } = getConfig({
    step: 'compareRefs',
    resource: 'repo',
    action: 'compare',
  });

  const data = await githubRequest(
    `/repos/${owner}/${repo}/compare/${encodeURIComponent(base)}...${encodeURIComponent(head)}`
  );

  const files = Array.isArray(data?.files) ? data.files : [];
  const filteredFiles = file ? files.filter((item) => item.filename === file) : files;

  return {
    resource: 'repo',
    action: 'compare',
    base,
    head,
    file: file || undefined,
    status: data?.status || '',
    ahead_by: data?.ahead_by,
    behind_by: data?.behind_by,
    total_commits: data?.total_commits,
    files: filteredFiles.map((item) => ({
      filename: item.filename,
      status: item.status,
      additions: item.additions,
      deletions: item.deletions,
      changes: item.changes,
      patch: item.patch || '',
      blob_url: item.blob_url || '',
      raw_url: item.raw_url || '',
    })),
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

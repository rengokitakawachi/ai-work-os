const GITHUB_API_BASE = 'https://api.github.com';

export function createError({
  status = 500,
  code = 'UNKNOWN_ERROR',
  message = 'Unknown error',
  category = 'internal',
  step = 'unknown',
  resource = '',
  action = '',
  retryable = false,
  details = {},
  cause = null,
}) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  error.category = category;
  error.step = step;
  error.resource = resource;
  error.action = action;
  error.retryable = retryable;
  error.details = details;
  error.cause = cause;
  return error;
}

export function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !owner || !repo) {
    throw createError({
      status: 500,
      code: 'CONFIG_ERROR',
      message: 'GitHub config missing',
      category: 'config',
      step: 'getConfig',
      retryable: false,
      details: {
        has_token: Boolean(token),
        has_owner: Boolean(owner),
        has_repo: Boolean(repo),
        branch,
      },
    });
  }

  return { token, owner, repo, branch };
}

export function encode(content) {
  return Buffer.from(content, 'utf8').toString('base64');
}

export function decode(content) {
  return Buffer.from(content, 'base64').toString('utf8');
}

function parseJsonSafe(text) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function githubRequest(path, options = {}) {
  const { token } = getConfig();

  let response;

  try {
    response = await fetch(`${GITHUB_API_BASE}${path}`, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: options.body || undefined,
    });
  } catch (cause) {
    throw createError({
      status: 504,
      code: 'UPSTREAM_TIMEOUT',
      message: 'GitHub request failed',
      category: 'upstream',
      step: 'githubRequest',
      retryable: true,
      details: {
        github_path: path,
        method: options.method || 'GET',
      },
      cause,
    });
  }

  const text = await response.text();
  const data = parseJsonSafe(text);

  if (!response.ok) {
    let code = 'GITHUB_ERROR';
    let status = 502;
    let retryable = false;

    const upstreamMessage = data?.message || '';
    const isRateLimit =
      response.status === 429 ||
      (response.status === 403 &&
        typeof upstreamMessage === 'string' &&
        upstreamMessage.toLowerCase().includes('rate limit'));

    if (response.status === 404) {
      code = 'GITHUB_NOT_FOUND';
      status = 404;
    } else if (isRateLimit) {
      code = 'GITHUB_RATE_LIMIT';
      status = 503;
      retryable = true;
    } else if (response.status === 401 || response.status === 403) {
      code = 'GITHUB_UNAUTHORIZED';
      status = 502;
    } else if (response.status === 409) {
      code = 'CONFLICT';
      status = 409;
    } else if (response.status >= 500) {
      code = 'UPSTREAM_5XX';
      status = 502;
      retryable = true;
    }

    throw createError({
      status,
      code,
      message: 'GitHub API error',
      category: 'upstream',
      step: 'githubRequest',
      retryable,
      details: {
        github_path: path,
        upstream_status: response.status,
        upstream_message: upstreamMessage,
      },
    });
  }

  if (text && data === null) {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'Invalid GitHub response',
      category: 'upstream',
      step: 'githubRequest',
      retryable: false,
      details: {
        github_path: path,
        upstream_status: response.status,
        response_excerpt: text.slice(0, 300),
      },
    });
  }

  return data;
}

export function assertSafeRelativePath(file, context = {}) {
  const value = typeof file === 'string' ? file.trim() : '';

  if (!value) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'file required',
      category: 'validation',
      step: context.step || 'assertSafeRelativePath',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        field: 'file',
      },
    });
  }

  if (
    value.includes('..') ||
    value.startsWith('/') ||
    value.startsWith('\\') ||
    value.includes('\\')
  ) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'invalid file path',
      category: 'validation',
      step: context.step || 'assertSafeRelativePath',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        file: value,
      },
    });
  }

  return value;
}

export function buildDocsPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    ...context,
    resource: 'docs',
  });
  return `docs/${safe}`;
}

export function buildNotesPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    ...context,
    resource: 'notes',
  });
  return `notes/${safe}`;
}

export function buildCodePath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    ...context,
    resource: 'code',
  });

  const allowedPrefixes = ['src/', 'api/', 'lib/', 'scripts/'];
  const isAllowed = allowedPrefixes.some((prefix) => safe.startsWith(prefix));

  if (!isAllowed) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'code path not allowed',
      category: 'validation',
      step: context.step || 'buildCodePath',
      resource: 'code',
      action: context.action || '',
      retryable: false,
      details: {
        file: safe,
        allowed_prefixes: allowedPrefixes,
      },
    });
  }

  return safe;
}

export async function getContentFile(path, context = {}) {
  const { owner, repo, branch } = getConfig();

  const data = await githubRequest(
    `/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`
  );

  if (!data || typeof data.content !== 'string') {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'GitHub content missing',
      category: 'service',
      step: context.step || 'getContentFile',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        path,
      },
    });
  }

  return data;
}

export async function putContentFile(path, content, message, sha, context = {}) {
  const { owner, repo, branch } = getConfig();

  const body = {
    message,
    content: encode(content),
    branch,
    ...(sha ? { sha } : {}),
  };

  const data = await githubRequest(`/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  if (!data?.content?.path || !data?.content?.sha) {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'GitHub content update failed',
      category: 'service',
      step: context.step || 'putContentFile',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        path,
      },
    });
  }

  return data;
}

export async function deleteContentFile(path, message, sha, context = {}) {
  const { owner, repo, branch } = getConfig();

  const safeMessage = typeof message === 'string' ? message.trim() : '';
  const safeSha = typeof sha === 'string' ? sha.trim() : '';

  if (!safeSha) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'sha required',
      category: 'validation',
      step: context.step || 'deleteContentFile',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        field: 'sha',
        path,
      },
    });
  }

  const body = {
    message: safeMessage || `delete ${path}`,
    sha: safeSha,
    branch,
  };

  const data = await githubRequest(`/repos/${owner}/${repo}/contents/${path}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });

  if (!data?.commit?.sha) {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'GitHub content delete failed',
      category: 'service',
      step: context.step || 'deleteContentFile',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        path,
      },
    });
  }

  return data;
}

export async function getRepoTree(prefix, context = {}) {
  const { owner, repo, branch } = getConfig();

  const data = await githubRequest(
    `/repos/${owner}/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`
  );

  if (!data?.tree || !Array.isArray(data.tree)) {
    throw createError({
      status: 502,
      code: 'GITHUB_ERROR',
      message: 'GitHub tree response invalid',
      category: 'service',
      step: context.step || 'getRepoTree',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        prefix,
      },
    });
  }

  return data.tree.filter((item) => item.path.startsWith(prefix));
}

export function mapTreeItems(items) {
  return items.map((item) => ({
    path: item.path,
    name: item.path.split('/').pop(),
    type: item.type === 'tree' ? 'dir' : 'file',
    sha: item.sha,
  }));
}

export function formatReadResponse(data) {
  const content = decode(data.content);

  return {
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

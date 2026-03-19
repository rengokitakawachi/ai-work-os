const GITHUB_API_BASE = 'https://api.github.com';
const REQUEST_TIMEOUT_MS = 5000;
const MAX_RETRIES = 3;
const RETRY_DELAYS_MS = [500, 1000, 2000];

function createError(status, code, message, detail = null) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  error.detail = detail;
  return error;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getConfig() {
  const token = (process.env.GITHUB_TOKEN || '').trim();
  const owner = (process.env.GITHUB_OWNER || '').trim();
  const repo = (process.env.GITHUB_REPO || '').trim();
  const branch = (process.env.GITHUB_BRANCH || 'main').trim();

  if (!token) {
    throw createError(500, 'CONFIG_ERROR', 'GITHUB_TOKEN is not configured');
  }

  if (!owner) {
    throw createError(500, 'CONFIG_ERROR', 'GITHUB_OWNER is not configured');
  }

  if (!repo) {
    throw createError(500, 'CONFIG_ERROR', 'GITHUB_REPO is not configured');
  }

  return { token, owner, repo, branch };
}

function shouldRetry(status, code) {
  if (code === 'UPSTREAM_TIMEOUT') return true;
  if (code === 'UPSTREAM_DNS_ERROR') return true;
  if (code === 'RATE_LIMIT') return true;
  if (code === 'UPSTREAM_5XX') return true;
  if (status === 429) return true;
  if (status >= 500) return true;
  return false;
}

function normalizeUpstreamError(error) {
  if (error?.code && error?.status) {
    return error;
  }

  if (error?.name === 'AbortError') {
    return createError(504, 'UPSTREAM_TIMEOUT', 'GitHub API request timed out');
  }

  const message = String(error?.message || '');

  if (
    message.includes('ENOTFOUND') ||
    message.includes('EAI_AGAIN') ||
    message.includes('getaddrinfo')
  ) {
    return createError(502, 'UPSTREAM_DNS_ERROR', 'GitHub API DNS resolution failed');
  }

  return createError(
    Number.isInteger(error?.status) ? error.status : 500,
    error?.code || 'UNKNOWN_ERROR',
    error?.message || 'Unknown error',
    error?.detail || null
  );
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function githubRequest(path) {
  const { token } = getConfig();
  const url = `${GITHUB_API_BASE}${path}`;
  let lastError = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'ai-work-os-docs-api'
        }
      });

      const text = await response.text();
      let data;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw createError(401, 'UNAUTHORIZED', 'GitHub authentication failed', data);
        }

        if (response.status === 403) {
          const detailText = JSON.stringify(data || '');
          if (detailText.includes('rate limit')) {
            throw createError(429, 'RATE_LIMIT', 'GitHub API rate limit exceeded', data);
          }
          throw createError(403, 'FORBIDDEN', 'GitHub access forbidden', data);
        }

        if (response.status === 404) {
          throw createError(404, 'NOT_FOUND', 'Document not found', data);
        }

        if (response.status === 429) {
          throw createError(429, 'RATE_LIMIT', 'GitHub API rate limit exceeded', data);
        }

        if (response.status >= 500) {
          throw createError(response.status, 'UPSTREAM_5XX', 'GitHub API server error', data);
        }

        throw createError(
          response.status,
          'GITHUB_API_ERROR',
          'GitHub API request failed',
          data
        );
      }

      return data;
    } catch (error) {
      const normalized = normalizeUpstreamError(error);
      lastError = normalized;

      if (attempt === MAX_RETRIES - 1 || !shouldRetry(normalized.status, normalized.code)) {
        throw normalized;
      }

      await sleep(RETRY_DELAYS_MS[attempt] || 2000);
    }
  }

  throw lastError || createError(500, 'UNKNOWN_ERROR', 'Unknown error');
}

function ensureDocsFileName(fileName) {
  const value = (fileName || '').trim();

  if (!value) {
    throw createError(400, 'INVALID_REQUEST', 'file is required');
  }

  if (value.includes('/') || value.includes('\\')) {
    throw createError(400, 'INVALID_REQUEST', 'nested path is not allowed');
  }

  if (!value.endsWith('.md')) {
    throw createError(400, 'INVALID_REQUEST', 'only .md files are allowed');
  }

  return value;
}

function decodeBase64Content(encodedContent) {
  const encoded =
    typeof encodedContent === 'string' ? encodedContent.replace(/\n/g, '') : '';

  if (!encoded) {
    return '';
  }

  return Buffer.from(encoded, 'base64').toString('utf8');
}

export async function listDocs() {
  const { owner, repo, branch } = getConfig();

  const data = await githubRequest(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/docs?ref=${encodeURIComponent(branch)}`
  );

  const items = Array.isArray(data)
    ? data
        .filter(
          (item) =>
            item &&
            item.type === 'file' &&
            typeof item.name === 'string' &&
            item.name.endsWith('.md')
        )
        .map((item) => ({
          name: item.name,
          path: item.path,
          sha: item.sha,
          size: item.size ?? null,
          download_url: item.download_url || null,
          html_url: item.html_url || null
        }))
    : [];

  return {
    items,
    count: items.length
  };
}

export async function getDocFile(fileName) {
  const safeFileName = ensureDocsFileName(fileName);
  const { owner, repo, branch } = getConfig();

  const data = await githubRequest(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/docs/${encodeURIComponent(safeFileName)}?ref=${encodeURIComponent(branch)}`
  );

  if (!data || data.type !== 'file') {
    throw createError(404, 'NOT_FOUND', 'document not found');
  }

  const content = decodeBase64Content(data.content);

  return {
    name: data.name,
    path: data.path,
    sha: data.sha || null,
    size: data.size ?? content.length,
    content
  };
}

export async function getDocFiles(fileNames) {
  if (!Array.isArray(fileNames)) {
    throw createError(400, 'INVALID_REQUEST', 'files must be an array');
  }

  const results = await Promise.all(
    fileNames.map(async (fileName) => {
      try {
        const doc = await getDocFile(fileName);
        return {
          ok: true,
          file: doc.name,
          name: doc.name,
          path: doc.path,
          sha: doc.sha,
          size: doc.size,
          content: doc.content
        };
      } catch (error) {
        return {
          ok: false,
          file: typeof fileName === 'string' ? fileName : '',
          error: {
            code: error?.code || 'UNKNOWN_ERROR',
            message: error?.message || 'Unknown error'
          }
        };
      }
    })
  );

  return {
    ok: true,
    files: results
  };
}

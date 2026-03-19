const GITHUB_API_BASE = 'https://api.github.com';

function createError(status, code, message, detail = null) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  error.detail = detail;
  return error;
}

function getConfig() {
  const token = (process.env.GITHUB_TOKEN || '').trim();
  const owner = (process.env.GITHUB_OWNER || '').trim();
  const repo = (process.env.GITHUB_REPO || '').trim();
  const branch = (process.env.GITHUB_BRANCH || 'main').trim();

  if (!token) {
    const error = new Error('GITHUB_TOKEN is not configured');
    error.status = 500;
    throw error;
  }

  if (!owner) {
    const error = new Error('GITHUB_OWNER is not configured');
    error.status = 500;
    throw error;
  }

  if (!repo) {
    const error = new Error('GITHUB_REPO is not configured');
    error.status = 500;
    throw error;
  }

  return { token, owner, repo, branch };
}

async function githubRequest(path) {
  const { token } = getConfig();

  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
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
    const error = new Error('GitHub API request failed');
    error.status = response.status;
    error.detail = data;
    throw error;
  }

  return data;
}

function ensureDocsFileName(fileName) {
  const value = (fileName || '').trim();

  if (!value) {
    const error = new Error('file is required');
    error.status = 400;
    throw error;
  }

  if (value.includes('/') || value.includes('\\')) {
    const error = new Error('nested path is not allowed');
    error.status = 400;
    throw error;
  }

  if (!value.endsWith('.md')) {
    const error = new Error('only .md files are allowed');
    error.status = 400;
    throw error;
  }

  return value;
}

export async function listDocs() {
  const { owner, repo, branch } = getConfig();

  const data = await githubRequest(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/docs?ref=${encodeURIComponent(branch)}`
  );

  const items = Array.isArray(data)
    ? data
        .filter((item) => item && item.type === 'file' && typeof item.name === 'string' && item.name.endsWith('.md'))
        .map((item) => ({
          name: item.name,
          path: item.path,
          sha: item.sha,
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
    const error = new Error('document not found');
    error.status = 404;
    throw error;
  }

  const encoded = typeof data.content === 'string' ? data.content.replace(/\n/g, '') : '';
  const content = Buffer.from(encoded, 'base64').toString('utf8');

  return {
    name: data.name,
    path: data.path,
    sha: data.sha,
    size: data.size,
    content
  };
}

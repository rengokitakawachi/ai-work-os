const GITHUB_API_BASE = 'https://api.github.com';

function createError(status, code, message) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !owner || !repo) {
    throw createError(500, 'CONFIG_ERROR', 'GitHub config missing');
  }

  return { token, owner, repo, branch };
}

function encode(content) {
  return Buffer.from(content).toString('base64');
}

function decode(content) {
  return Buffer.from(content, 'base64').toString('utf8');
}

async function githubRequest(path, options = {}) {
  const { token } = getConfig();

  const res = await fetch(`${GITHUB_API_BASE}${path}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: options.body || undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw createError(res.status, 'GITHUB_ERROR', 'GitHub API error');
  }

  return data;
}

function buildPath(file) {
  if (!file || file.includes('..')) {
    throw createError(400, 'INVALID_REQUEST', 'invalid file path');
  }
  return `notes/${file}`;
}

export async function listNotesTree() {
  const { owner, repo, branch } = getConfig();

  const data = await githubRequest(
    `/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
  );

  const items = data.tree
    .filter((i) => i.path.startsWith('notes/'))
    .map((i) => ({
      path: i.path,
      name: i.path.split('/').pop(),
      type: i.type === 'tree' ? 'dir' : 'file',
    }));

  return {
    resource: 'notes',
    items,
    count: items.length,
  };
}

export async function getNoteFile(file) {
  const { owner, repo, branch } = getConfig();
  const path = buildPath(file);

  const data = await githubRequest(
    `/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
  );

  return {
    name: data.name,
    path: data.path,
    sha: data.sha,
    content: decode(data.content),
    status: 'OK',
  };
}

export async function createNoteFile(file, content) {
  const { owner, repo, branch } = getConfig();
  const path = buildPath(file);

  const result = await githubRequest(
    `/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `create ${path}`,
        content: encode(content),
        branch,
      }),
    }
  );

  return {
    path: result.content.path,
    sha: result.content.sha,
    status: 'CREATED',
  };
}

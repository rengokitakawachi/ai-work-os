import { listDocs, getDocFile } from '../src/services/github-docs.js';

function isAuthorized(req) {
  const internalApiKey = (process.env.INTERNAL_API_KEY || '').trim();

  if (!internalApiKey) {
    return true;
  }

  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : '';

  const queryToken =
    typeof req.query?.key === 'string' ? req.query.key.trim() : '';

  return bearerToken === internalApiKey || queryToken === internalApiKey;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'method not allowed'
    });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({
      ok: false,
      error: 'unauthorized'
    });
  }

  try {
    const list = await listDocs();

    const data = await Promise.all(
      list.items.map(async (item) => {
        const file = await getDocFile(item.name);

        return {
          name: file.name,
          path: file.path,
          sha: file.sha,
          size: file.size,
          content: file.content
        };
      })
    );

    return res.status(200).json({
      ok: true,
      data: {
        items: data,
        count: data.length
      }
    });
  } catch (error) {
    const status = Number.isInteger(error?.status) ? error.status : 500;

    return res.status(status).json({
      ok: false,
      error: error?.message || 'internal server error',
      detail: error?.detail || null
    });
  }
}

import { getDocFile } from '../src/services/github-docs.js';

function authorizeInternalRequest(req, res) {
  const internalApiKey = (process.env.INTERNAL_API_KEY || '').trim();

  if (!internalApiKey) {
    return true;
  }

  const authHeader = typeof req.headers?.authorization === 'string'
    ? req.headers.authorization.trim()
    : '';
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : '';

  const apiKeyHeader = typeof req.headers?.['x-api-key'] === 'string'
    ? req.headers['x-api-key'].trim()
    : '';

  const queryKey =
    typeof req.query?.key === 'string' ? req.query.key.trim() : '';

  if (
    bearerToken === internalApiKey ||
    apiKeyHeader === internalApiKey ||
    queryKey === internalApiKey
  ) {
    return true;
  }

  return res.status(401).json({
    ok: false,
    error: {
      code: 'UNAUTHORIZED',
      message: 'Unauthorized'
    }
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: {
        code: 'INVALID_REQUEST',
        message: 'Method not allowed'
      }
    });
  }

  if (!authorizeInternalRequest(req, res)) {
    return;
  }

  try {
    const file = typeof req.query.file === 'string' ? req.query.file.trim() : '';

    if (!file) {
      return res.status(400).json({
        ok: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'file is required'
        }
      });
    }

    const data = await getDocFile(file);

    return res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'internal server error'
      },
      detail: error.detail || null
    });
  }
}

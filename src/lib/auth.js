import { getHeader, sendJson } from './http.js';

export function authorizeInternalRequest(req, res) {
  const internalApiKey = (process.env.INTERNAL_API_KEY || '').trim();

  if (!internalApiKey) {
    return true;
  }

  const apiKeyHeader = (getHeader(req, 'x-api-key') || '').trim();
  const authHeader = (getHeader(req, 'authorization') || '').trim();
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : '';
  const queryKey =
    typeof req.query?.key === 'string' ? req.query.key.trim() : '';

  if (
    apiKeyHeader === internalApiKey ||
    bearerToken === internalApiKey ||
    queryKey === internalApiKey
  ) {
    return true;
  }

  sendJson(res, 401, {
    ok: false,
    error: {
      code: 'UNAUTHORIZED',
      message: 'Unauthorized'
    }
  });
  return false;
}

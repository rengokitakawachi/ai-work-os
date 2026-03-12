import { getHeader, sendJson } from './http.js';

export function authorizeInternalRequest(req, res) {
  const internalApiKey = (process.env.INTERNAL_API_KEY || '').trim();

  if (!internalApiKey) {
    return true;
  }

  const apiKey = (getHeader(req, 'x-api-key') || '').trim();
  const authHeader = (getHeader(req, 'authorization') || '').trim();
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : '';

  if (apiKey === internalApiKey || bearerToken === internalApiKey) {
    return true;
  }

  sendJson(res, 401, { error: 'Unauthorized' });
  return false;
}

const DEFAULT_ALLOWED_HEADERS = 'Content-Type, Authorization, X-API-Key';
const DEFAULT_ALLOWED_METHODS = 'GET, POST, OPTIONS';

export function applyCors(res, methods = DEFAULT_ALLOWED_METHODS) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', DEFAULT_ALLOWED_HEADERS);
}

export function handlePreflight(req, res, methods = DEFAULT_ALLOWED_METHODS) {
  applyCors(res, methods);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  return false;
}

export function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

export function getRequestBody(req) {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body);
  }

  return req.body || {};
}

export function getHeader(req, name) {
  const lowerName = name.toLowerCase();
  return req.headers?.[lowerName];
}

export function requireMethod(req, res, method) {
  if (req.method !== method) {
    sendJson(res, 405, { error: 'Method not allowed' });
    return false;
  }

  return true;
}

export function getQuery(req) {
  return req.query || {};
}

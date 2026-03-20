export function auth(req, res) {
  const key = (process.env.INTERNAL_API_KEY || '').trim();
  if (!key) return true;

  const authHeader =
    typeof req.headers?.authorization === 'string'
      ? req.headers.authorization.trim()
      : '';

  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : '';

  const apiKeyHeader =
    typeof req.headers?.['x-api-key'] === 'string'
      ? req.headers['x-api-key'].trim()
      : '';

  const queryKey =
    typeof req.query?.key === 'string'
      ? req.query.key.trim()
      : '';

  if (
    bearerToken === key ||
    apiKeyHeader === key ||
    queryKey === key
  ) {
    return true;
  }

  res.status(401).json({
    ok: false,
    error: {
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    },
  });
  return false;
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-api-key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
}

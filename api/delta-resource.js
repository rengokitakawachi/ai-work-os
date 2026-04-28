export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'method not allowed',
        resource: 'delta',
        action: req.query?.action || '',
        status: 405,
        retryable: false,
      },
    });
  }

  return res.status(503).json({
    ok: false,
    error: {
      code: 'DELTA_RESOURCE_TEMPORARILY_DISABLED',
      message: 'delta-resource route is deployed as a temporary recovery stub; read-only implementation is paused pending deployment error analysis',
      resource: 'delta',
      action: req.query?.action || '',
      status: 503,
      retryable: false,
      details: {
        expected_root: 'systems/delta/',
        write_enabled: false,
      },
    },
  });
}

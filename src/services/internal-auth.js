export function auth(req, res) {
  const key = process.env.INTERNAL_API_KEY;
  if (!key) return true;

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token === key) return true;

  res.status(401).json({ ok: false });
  return false;
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

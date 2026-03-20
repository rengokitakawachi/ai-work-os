===== FILE: api/notes-read.js =====
import { getNoteFile } from '../src/services/github-repo-resource.js';
import { auth, cors } from '../src/services/internal-auth.js';

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') return res.end();
  if (req.method !== 'GET') return res.status(405).end();

  if (!auth(req, res)) return;

  const file = req.query.file;

  if (!file) {
    return res.status(400).json({ ok: false });
  }

  try {
    const data = await getNoteFile(file);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
}

===== FILE: api/notes-create.js =====
import { createNoteFile } from '../src/services/github-repo-resource.js';
import { auth, cors } from '../src/services/internal-auth.js';

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') return res.end();
  if (req.method !== 'POST') return res.status(405).end();

  if (!auth(req, res)) return;

  const { file, content } = req.body || {};

  if (!file || !content) {
    return res.status(400).json({ ok: false });
  }

  try {
    const data = await createNoteFile(file, content);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
}

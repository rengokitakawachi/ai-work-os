===== FILE: api/notes-tree.js =====
import { listNotesTree } from '../src/services/github-repo-resource.js';
import { auth, cors } from '../src/services/internal-auth.js';

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') return res.end();
  if (req.method !== 'GET') return res.status(405).end();

  if (!auth(req, res)) return;

  try {
    const data = await listNotesTree();
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
}

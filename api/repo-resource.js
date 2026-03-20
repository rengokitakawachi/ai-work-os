import {
  listNotesTree,
  getNoteFile,
  createNoteFile,
} from '../src/services/github-repo-resource.js';

import { auth, cors } from '../src/services/internal-auth.js';

export default async function handler(req, res) {
  cors(res);

  if (req.method === 'OPTIONS') return res.end();

  if (!auth(req, res)) return;

  const method = req.method;

  try {
    // -----------------------
    // GET
    // -----------------------
    if (method === 'GET') {
      const { action, resource, file } = req.query;

      if (!action || !resource) {
        return res.status(400).json({
          ok: false,
          error: 'action and resource required',
        });
      }

      // 現在は notes のみ対応
      if (resource !== 'notes') {
        return res.status(400).json({
          ok: false,
          error: 'resource not supported yet',
        });
      }

      // -------- tree --------
      if (action === 'tree') {
        const data = await listNotesTree();

        return res.json({
          ok: true,
          data,
        });
      }

      // -------- read --------
      if (action === 'read') {
        if (!file) {
          return res.status(400).json({
            ok: false,
            error: 'file required',
          });
        }

        const data = await getNoteFile(file);

        return res.json({
          ok: true,
          data,
        });
      }

      return res.status(400).json({
        ok: false,
        error: 'invalid action',
      });
    }

    // -----------------------
    // POST
    // -----------------------
    if (method === 'POST') {
      const { action, resource } = req.query;
      const { file, content } = req.body || {};

      if (!action || !resource) {
        return res.status(400).json({
          ok: false,
          error: 'action and resource required',
        });
      }

      if (resource !== 'notes') {
        return res.status(400).json({
          ok: false,
          error: 'resource not supported yet',
        });
      }

      // -------- create --------
      if (action === 'create') {
        if (!file || !content) {
          return res.status(400).json({
            ok: false,
            error: 'file and content required',
          });
        }

        const data = await createNoteFile(file, content);

        return res.json({
          ok: true,
          data,
        });
      }

      return res.status(400).json({
        ok: false,
        error: 'invalid action',
      });
    }

    return res.status(405).json({
      ok: false,
      error: 'method not allowed',
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e.message || 'internal error',
    });
  }
}

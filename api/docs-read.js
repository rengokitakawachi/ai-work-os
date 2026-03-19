import { getDocFile } from '../src/services/github-docs.js';
import { authorizeInternalRequest } from '../arc/lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: {
        code: 'INVALID_REQUEST',
        message: 'Method not allowed'
      }
    });
  }

  if (!authorizeInternalRequest(req, res)) {
    return;
  }

  try {
    const file = typeof req.query.file === 'string' ? req.query.file.trim() : '';

    if (!file) {
      return res.status(400).json({
        ok: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'file is required'
        }
      });
    }

    const data = await getDocFile(file);

    return res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'internal server error'
      },
      detail: error.detail || null
    });
  }
}

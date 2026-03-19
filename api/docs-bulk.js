import { getDocFiles } from '../src/services/github-docs.js';
import { authorizeInternalRequest } from '../arc/lib/auth.js';

function parseFilesParam(filesParam) {
  return String(filesParam || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

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
    const files = parseFilesParam(req.query.files);

    if (!files.length) {
      return res.status(400).json({
        ok: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'files query is required'
        }
      });
    }

    const result = await getDocFiles(files);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      ok: false,
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'Unknown error'
      }
    });
  }
}

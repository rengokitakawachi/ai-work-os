import test from 'node:test';
import assert from 'node:assert/strict';

import handler from './delta-history.js';
import {
  buildDeltaHistoryPath,
  DELTA_HISTORY_ROOT,
} from '../src/services/delta-history.js';

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    ended: false,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

test('delta history root is fixed to systems/delta/history', () => {
  assert.equal(DELTA_HISTORY_ROOT, 'systems/delta/history/');
});

test('buildDeltaHistoryPath accepts markdown files relative to history root', () => {
  assert.equal(
    buildDeltaHistoryPath('2026-04.md'),
    'systems/delta/history/2026-04.md'
  );
});

test('buildDeltaHistoryPath rejects full systems paths and history-prefixed paths', () => {
  assert.throws(
    () => buildDeltaHistoryPath('systems/delta/history/2026-04.md'),
    (error) => error.code === 'INVALID_REQUEST'
  );

  assert.throws(
    () => buildDeltaHistoryPath('history/2026-04.md'),
    (error) => error.code === 'INVALID_REQUEST'
  );
});

test('buildDeltaHistoryPath rejects non-markdown files', () => {
  assert.throws(
    () => buildDeltaHistoryPath('2026-04.json'),
    (error) => error.code === 'INVALID_REQUEST'
  );
});

test('buildDeltaHistoryPath rejects unsafe relative paths', () => {
  assert.throws(
    () => buildDeltaHistoryPath('../operations/active_operations.md'),
    (error) => error.code === 'INVALID_REQUEST'
  );
});

test('delta-history rejects GET methods', async () => {
  const req = {
    method: 'GET',
    query: {
      action: 'create',
    },
    headers: {},
  };
  const res = createMockRes();

  const previousKey = process.env.INTERNAL_API_KEY;
  process.env.INTERNAL_API_KEY = '';

  try {
    await handler(req, res);
  } finally {
    process.env.INTERNAL_API_KEY = previousKey;
  }

  assert.equal(res.statusCode, 405);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'METHOD_NOT_ALLOWED');
  assert.equal(res.body.error.resource, 'delta_history');
});

test('delta-history rejects unsupported delete action', async () => {
  const req = {
    method: 'POST',
    query: {
      action: 'delete',
    },
    headers: {},
    body: {
      file: '2026-04.md',
      content: '# no delete',
    },
  };
  const res = createMockRes();

  const previousKey = process.env.INTERNAL_API_KEY;
  process.env.INTERNAL_API_KEY = '';

  try {
    await handler(req, res);
  } finally {
    process.env.INTERNAL_API_KEY = previousKey;
  }

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'ACTION_NOT_SUPPORTED');
});

test('delta-history requires file and content', async () => {
  const req = {
    method: 'POST',
    query: {
      action: 'create',
    },
    headers: {},
    body: {},
  };
  const res = createMockRes();

  const previousKey = process.env.INTERNAL_API_KEY;
  process.env.INTERNAL_API_KEY = '';

  try {
    await handler(req, res);
  } finally {
    process.env.INTERNAL_API_KEY = previousKey;
  }

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'INVALID_REQUEST');
  assert.equal(res.body.error.details.field, 'file');
});

test('delta-history validates create request before GitHub config', async () => {
  const req = {
    method: 'POST',
    query: {
      action: 'create',
    },
    headers: {},
    body: {
      file: '2026-04.md',
      content: '# 2026-04',
      branch: 'feature/atlas-pre-delta-foundation',
    },
  };
  const res = createMockRes();

  const previousKey = process.env.INTERNAL_API_KEY;
  const previousToken = process.env.GITHUB_TOKEN;
  process.env.INTERNAL_API_KEY = '';
  process.env.GITHUB_TOKEN = '';

  try {
    await handler(req, res);
  } finally {
    process.env.INTERNAL_API_KEY = previousKey;
    process.env.GITHUB_TOKEN = previousToken;
  }

  assert.equal(res.statusCode, 500);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'CONFIG_ERROR');
  assert.equal(res.body.error.resource, 'delta_history');
  assert.equal(res.body.error.action, 'create');
});

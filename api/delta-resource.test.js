import test from 'node:test';
import assert from 'node:assert/strict';

import handler from './delta-resource.js';
import { buildDeltaPath, DELTA_ROOT } from '../src/services/delta-resource.js';

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

test('delta root is fixed to systems/delta', () => {
  assert.equal(DELTA_ROOT, 'systems/delta/');
});

test('buildDeltaPath accepts paths relative to delta root', () => {
  assert.equal(
    buildDeltaPath('operations/active_operations.md'),
    'systems/delta/operations/active_operations.md'
  );
  assert.equal(
    buildDeltaPath('history/2026-04.md'),
    'systems/delta/history/2026-04.md'
  );
});

test('buildDeltaPath rejects full systems paths', () => {
  assert.throws(
    () => buildDeltaPath('systems/delta/operations/active_operations.md'),
    (error) => error.code === 'INVALID_REQUEST'
  );

  assert.throws(
    () => buildDeltaPath('systems/other/operations/active_operations.md'),
    (error) => error.code === 'INVALID_REQUEST'
  );
});

test('buildDeltaPath rejects unsafe relative paths', () => {
  assert.throws(
    () => buildDeltaPath('../config/secret.md'),
    (error) => error.code === 'INVALID_REQUEST'
  );
});

test('delta-resource rejects non-GET methods', async () => {
  const req = {
    method: 'POST',
    query: {
      action: 'read',
    },
    headers: {},
    body: {
      file: 'history/2026-04.md',
      content: 'not allowed',
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

  assert.equal(res.statusCode, 405);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'METHOD_NOT_ALLOWED');
  assert.equal(res.body.error.resource, 'delta');
});

test('delta-resource requires action', async () => {
  const req = {
    method: 'GET',
    query: {},
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

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'INVALID_REQUEST');
  assert.equal(res.body.error.details.field, 'action');
});

test('delta-resource rejects unsupported action', async () => {
  const req = {
    method: 'GET',
    query: {
      action: 'update',
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

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'ACTION_NOT_SUPPORTED');
});

test('delta-resource accepts newline separated files for bulk validation', async () => {
  const req = {
    method: 'GET',
    query: {
      action: 'bulk',
      files: 'config/delta_instruction.md\noperations/active_operations.md',
      branch: 'feature/atlas-pre-delta-foundation',
    },
    headers: {},
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
  assert.equal(res.body.error.resource, 'delta');
  assert.equal(res.body.error.action, 'bulk');
});

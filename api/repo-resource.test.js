import test from 'node:test';
import assert from 'node:assert/strict';

import handler from './repo-resource.js';
import { normalizeBranch } from '../src/services/repo-resource/common.js';

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

test('normalizeBranch accepts common branch names', () => {
  assert.equal(normalizeBranch('main'), 'main');
  assert.equal(
    normalizeBranch('feature/atlas-pre-delta-foundation'),
    'feature/atlas-pre-delta-foundation'
  );
});

test('normalizeBranch returns empty for missing branch', () => {
  assert.equal(normalizeBranch(''), '');
  assert.equal(normalizeBranch(undefined), '');
});

test('normalizeBranch rejects invalid branch names', () => {
  const invalid = [
    '../main',
    '/main',
    'feature//x',
    'feature/x.lock',
    'feature/x y',
    'feature/x?y',
  ];

  for (const branch of invalid) {
    assert.throws(
      () => normalizeBranch(branch),
      (error) => error.code === 'INVALID_REQUEST'
    );
  }
});

test('repo-resource returns 400 when action and resource are missing', async () => {
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
  assert.deepEqual(res.body.error.details.missing, ['action', 'resource']);
  assert.equal(res.body.error.request_id.length > 0, true);
});

test('repo-resource returns 405 for unsupported method', async () => {
  const req = {
    method: 'PUT',
    query: {
      resource: 'code',
      action: 'read',
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

  assert.equal(res.statusCode, 405);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'METHOD_NOT_ALLOWED');
  assert.equal(res.body.error.details.method, 'PUT');
});

test('repo-resource returns 400 when code read file is missing', async () => {
  const req = {
    method: 'GET',
    query: {
      resource: 'code',
      action: 'read',
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
  assert.equal(res.body.error.code, 'INVALID_REQUEST');
  assert.equal(res.body.error.resource, 'code');
  assert.equal(res.body.error.action, 'read');
  assert.equal(res.body.error.details.field, 'file');
});

test('repo-resource returns 400 for unsupported code post action', async () => {
  const req = {
    method: 'POST',
    query: {
      resource: 'code',
      action: 'delete',
    },
    headers: {},
    body: {
      file: 'src/example.js',
      content: 'export default 1;'
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
  assert.equal(res.body.error.resource, 'code');
  assert.equal(res.body.error.action, 'delete');
});

test('repo-resource returns 400 for invalid GET branch', async () => {
  const req = {
    method: 'GET',
    query: {
      resource: 'code',
      action: 'tree',
      branch: '../main',
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
  assert.equal(res.body.error.code, 'INVALID_REQUEST');
  assert.equal(res.body.error.details.field, 'branch');
});

test('repo-resource returns 400 for invalid POST branch', async () => {
  const req = {
    method: 'POST',
    query: {
      resource: 'code',
      action: 'update',
    },
    headers: {},
    body: {
      file: 'src/example.js',
      content: 'export default 1;',
      branch: 'feature/x?y',
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
  assert.equal(res.body.error.code, 'INVALID_REQUEST');
  assert.equal(res.body.error.details.field, 'branch');
});

test('repo-resource returns 401 when internal api key does not match', async () => {
  const req = {
    method: 'GET',
    query: {
      resource: 'code',
      action: 'tree',
    },
    headers: {},
  };
  const res = createMockRes();

  const previousKey = process.env.INTERNAL_API_KEY;
  process.env.INTERNAL_API_KEY = 'secret-key';

  try {
    await handler(req, res);
  } finally {
    process.env.INTERNAL_API_KEY = previousKey;
  }

  assert.equal(res.statusCode, 401);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.error.code, 'UNAUTHORIZED');
});

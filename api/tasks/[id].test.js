import test from 'node:test';
import assert from 'node:assert/strict';

import handler from './[id].js';

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

test('tasks [id] returns 405 for unsupported method', async () => {
  const req = {
    method: 'GET',
    query: {
      id: 'task-1',
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
  assert.deepEqual(res.body.error.details.allowed_methods, ['PATCH', 'OPTIONS']);
});

test('tasks [id] returns 400 when id is missing', async () => {
  const req = {
    method: 'PATCH',
    query: {},
    headers: {},
    body: {
      title: 'rename task',
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
  assert.equal(res.body.error.action, 'update');
  assert.equal(res.body.error.details.field, 'id');
});

test('tasks [id] returns 400 when no updatable field is provided', async () => {
  const req = {
    method: 'PATCH',
    query: {
      id: 'task-1',
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
  assert.equal(res.body.error.action, 'update');
  assert.equal(res.body.error.message, 'at least one updatable field required');
});

test('tasks [id] returns 400 when status is invalid', async () => {
  const req = {
    method: 'PATCH',
    query: {
      id: 'task-1',
    },
    headers: {},
    body: {
      status: 'pending',
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
  assert.equal(res.body.error.details.field, 'status');
});

test('tasks [id] returns 401 when internal api key does not match', async () => {
  const req = {
    method: 'PATCH',
    query: {
      id: 'task-1',
    },
    headers: {},
    body: {
      title: 'rename task',
    },
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

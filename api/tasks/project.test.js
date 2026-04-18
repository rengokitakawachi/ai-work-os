import test from 'node:test';
import assert from 'node:assert/strict';

import handler from './project.js';

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

test('tasks project returns 405 for unsupported method', async () => {
  const req = {
    method: 'GET',
    query: {},
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
  assert.deepEqual(res.body.error.details.allowed_methods, ['POST', 'OPTIONS']);
});

test('tasks project returns 400 when target is invalid', async () => {
  const req = {
    method: 'POST',
    query: {},
    headers: {},
    body: {
      target: 'next',
      mode: 'dry_run',
      current_active_tasks: [],
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
  assert.equal(res.body.error.action, 'project');
  assert.equal(res.body.error.details.field, 'target');
});

test('tasks project returns 400 when mode is invalid', async () => {
  const req = {
    method: 'POST',
    query: {},
    headers: {},
    body: {
      target: 'active',
      mode: 'preview',
      current_active_tasks: [],
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
  assert.equal(res.body.error.action, 'project');
  assert.equal(res.body.error.details.field, 'mode');
});

test('tasks project returns 400 when current_active_tasks is missing', async () => {
  const req = {
    method: 'POST',
    query: {},
    headers: {},
    body: {
      target: 'active',
      mode: 'dry_run',
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
  assert.equal(res.body.error.action, 'project');
  assert.equal(res.body.error.details.field, 'current_active_tasks');
});

test('tasks project returns 400 when current_active_tasks item is invalid', async () => {
  const req = {
    method: 'POST',
    query: {},
    headers: {},
    body: {
      target: 'active',
      mode: 'dry_run',
      current_active_tasks: [
        {
          task: 'sample',
          source_ref: 'notes/04_operations/active_operations.md',
        },
      ],
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
  assert.equal(res.body.error.action, 'project');
  assert.equal(res.body.error.details.field, 'current_active_tasks[0].source_ref');
});

test('tasks project returns 401 when internal api key does not match', async () => {
  const req = {
    method: 'POST',
    query: {},
    headers: {},
    body: {
      target: 'active',
      mode: 'dry_run',
      current_active_tasks: [],
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

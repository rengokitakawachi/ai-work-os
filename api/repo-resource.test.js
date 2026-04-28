import test from 'node:test';
import assert from 'node:assert/strict';

import handler from './repo-resource.js';
import {
  buildCodePath,
  isAllowedCodePath,
  normalizeBranch,
} from '../src/services/repo-resource/common.js';
import { validateBranchCreateInput } from '../src/services/repo-resource/repo.js';

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

test('code allowlist accepts ATLAS workflow paths only by explicit scope', () => {
  assert.equal(isAllowedCodePath('.nvmrc'), true);
  assert.equal(isAllowedCodePath('.github/workflows/test.yml'), true);
  assert.equal(buildCodePath('.nvmrc'), '.nvmrc');
  assert.equal(buildCodePath('.github/workflows/test.yml'), '.github/workflows/test.yml');

  assert.equal(isAllowedCodePath('.github/secret.yml'), false);
  assert.equal(isAllowedCodePath('.env'), false);
  assert.equal(isAllowedCodePath('docs/10_repo_resource_api.md'), false);
  assert.equal(isAllowedCodePath('notes/04_operations/active_operations.md'), false);
});

test('validateBranchCreateInput accepts feature branch from main', () => {
  assert.deepEqual(
    validateBranchCreateInput('feature/atlas-pre-delta-foundation', 'main'),
    {
      branch: 'feature/atlas-pre-delta-foundation',
      fromBranch: 'main',
    }
  );
});

test('validateBranchCreateInput defaults from branch to main', () => {
  assert.deepEqual(validateBranchCreateInput('feature/example'), {
    branch: 'feature/example',
    fromBranch: 'main',
  });
});

test('validateBranchCreateInput rejects missing target branch', () => {
  assert.throws(
    () => validateBranchCreateInput('', 'main'),
    (error) => error.code === 'INVALID_REQUEST' && error.details.field === 'branch'
  );
});

test('validateBranchCreateInput rejects main target branch', () => {
  assert.throws(
    () => validateBranchCreateInput('main', 'main'),
    (error) => error.code === 'INVALID_REQUEST'
  );
});

test('validateBranchCreateInput rejects non-feature target branch', () => {
  assert.throws(
    () => validateBranchCreateInput('release/example', 'main'),
    (error) =>
      error.code === 'INVALID_REQUEST' &&
      error.details.required_prefix === 'feature/'
  );
});

test('validateBranchCreateInput rejects target equal to source', () => {
  assert.throws(
    () => validateBranchCreateInput('feature/example', 'feature/example'),
    (error) => error.code === 'INVALID_REQUEST'
  );
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

test('repo-resource returns 400 for repo GET', async () => {
  const req = {
    method: 'GET',
    query: {
      resource: 'repo',
      action: 'create_branch',
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
  assert.equal(res.body.error.code, 'RESOURCE_NOT_SUPPORTED');
});

test('repo-resource returns 400 for unsupported repo post action', async () => {
  const req = {
    method: 'POST',
    query: {
      resource: 'repo',
      action: 'delete_branch',
    },
    headers: {},
    body: {
      branch: 'feature/example',
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

test('repo-resource returns 400 for repo create_branch without branch', async () => {
  const req = {
    method: 'POST',
    query: {
      resource: 'repo',
      action: 'create_branch',
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

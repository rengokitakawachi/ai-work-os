# 2026-04-27 repoResource Branch Selector Patch Proposal

## Purpose

`repoResourceGet` / `repoResourceWrite` に branch selector を追加するための、feature branch 用実装パッチ案を固定する。

本 note は patch proposal であり、code 本体はまだ変更しない。

---

## Source References

- `notes/02_design/2026-04-27_repo_resource_branch_selector_design.md`
- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md`
- `docs/10_repo_resource_api.md`
- `api/repo-resource.js`
- `src/services/repo-resource/common.js`
- `src/services/repo-resource/docs.js`
- `src/services/repo-resource/notes.js`
- `src/services/repo-resource/code.js`
- `api/repo-resource.test.js`
- `config/ai/adam_schema.yaml`

---

## Scope

対象:

- branch selector design を implementation patch に落とす
- optional branch を GET query / POST body から service layer へ渡す
- GitHub content / tree operations が request branch を使えるようにする
- branch validation を追加する
- tests を追加する
- schema diff を定義する

対象外:

- main への code 直接 write
- configured Action refresh
- runtime-visible schema reflection
- actual feature branch read/write behavior confirmation
- GitHub branch creation API
- PR automation
- VERSION / CHANGELOG actual update

---

## Recommended Branch

```text
feature/repo-resource-branch-selector
```

Reason:

- code / schema behavior change である
- main は Docs-aligned stable version として保持する
- branch 内では notes-driven development を許容する

---

# Patch Plan

## 1. `src/services/repo-resource/common.js`

### Add `normalizeBranch()`

Add export near path validation helpers.

```js
export function normalizeBranch(value, context = {}) {
  const branch = typeof value === 'string' ? value.trim() : '';

  if (!branch) {
    return '';
  }

  const invalid =
    branch.includes('..') ||
    branch.startsWith('/') ||
    branch.endsWith('/') ||
    branch.includes('\\') ||
    branch.includes('//') ||
    branch.endsWith('.lock') ||
    /[\x00-\x20~^:?*[\]]/.test(branch);

  if (invalid) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'invalid branch',
      category: 'validation',
      step: context.step || 'normalizeBranch',
      resource: context.resource || '',
      action: context.action || '',
      retryable: false,
      details: {
        field: 'branch',
        branch,
      },
    });
  }

  return branch;
}
```

### Change `getConfig()`

Before:

```js
export function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
```

After:

```js
export function getConfig(options = {}) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch =
    normalizeBranch(options.branch, {
      step: options.step || 'getConfig',
      resource: options.resource || '',
      action: options.action || '',
    }) ||
    process.env.GITHUB_BRANCH ||
    'main';
```

### Pass context into config resolution

Change these helpers from `getConfig()` to `getConfig(context)`:

```js
getContentFile(path, context = {})
putContentFile(path, content, message, sha, context = {})
deleteContentFile(path, message, sha, context = {})
getRepoTree(prefix, context = {})
```

Example:

```js
export async function getContentFile(path, context = {}) {
  const { owner, repo, branch } = getConfig(context);
```

### Include branch in formatted response

Option A: add branch in `formatReadResponse(data, branch = '')`.

```js
export function formatReadResponse(data, branch = '') {
  const content = decode(data.content);

  return {
    name: data.name,
    path: data.path,
    sha: data.sha,
    size: data.size,
    branch,
    content,
    content_length: content.length,
    fetched_at: new Date().toISOString(),
    status: content.length > 0 ? 'OK' : 'EMPTY',
  };
}
```

Option B: keep read responses unchanged and add branch only to write results.

Recommendation: Option A is better for behavior verification.

---

## 2. `src/services/repo-resource/docs.js`

Update function signatures:

```js
export async function listDocs(options = {})
export async function readDoc(file, options = {})
export async function bulkReadDocs(files, options = {})
export async function treeDocs(options = {})
```

Pass branch context:

```js
const tree = await getRepoTree('docs/', {
  step: 'listDocs',
  resource: 'docs',
  action: 'list',
  branch: options.branch,
});
```

Read example:

```js
const data = await getContentFile(path, {
  step: 'readDoc',
  resource: 'docs',
  action: 'read',
  branch: options.branch,
});

return formatReadResponse(data, options.branch || '');
```

Bulk should pass options to each single read:

```js
const data = await readDoc(file, options);
```

---

## 3. `src/services/repo-resource/notes.js`

Update function signatures:

```js
export async function treeNotes(options = {})
export async function readNote(file, options = {})
export async function bulkReadNotes(files, options = {})
export async function createNote(file, content, message = '', options = {})
export async function updateNote(file, content, message = '', sha = '', options = {})
export async function deleteNote(file, message = '', sha = '', options = {})
```

Pass branch context to:

- `getRepoTree`
- `getContentFile`
- `putContentFile`
- `deleteContentFile`

Create result should include branch:

```js
return {
  path: result.content.path,
  sha: result.content.sha,
  branch: result.content.branch || options.branch || '',
  status: 'CREATED',
};
```

Update result should include branch:

```js
return {
  path: result.content.path,
  sha: result.content.sha,
  branch: result.content.branch || options.branch || '',
  status: 'UPDATED',
};
```

Delete result should include branch:

```js
return {
  path,
  sha: currentSha,
  commit_sha: result.commit.sha,
  branch: options.branch || '',
  status: 'DELETED',
};
```

If possible, use resolved branch from common helper result rather than raw options. If not, raw options is acceptable for first patch only when omitted branch remains empty.

---

## 4. `src/services/repo-resource/code.js`

Update function signatures:

```js
export async function treeCode(options = {})
export async function readCode(file, options = {})
export async function bulkReadCode(files, options = {})
export async function createCode(file, content, message = '', options = {})
export async function updateCode(file, content, message = '', sha = '', options = {})
```

Pass branch context to:

- `getRepoTree`
- `getContentFile`
- `putContentFile`

Return branch in write results.

Same pattern as notes.

---

## 5. `api/repo-resource.js`

### Add optional branch helper

```js
function optionalBranch(value) {
  return ensureString(value);
}
```

### Validate branch for GET and POST early

Recommended import:

```js
import { createError, normalizeBranch } from '../src/services/repo-resource/common.js';
```

Then in `validateGet` / `validatePost`, call:

```js
normalizeBranch(query.branch, {
  step: 'validateGet',
  resource,
  action,
});
```

and:

```js
normalizeBranch(body?.branch, {
  step: 'validatePost',
  resource,
  action,
});
```

### Pass branch through dispatchGet

At top of `dispatchGet`:

```js
const branch = optionalBranch(query.branch);
const options = { branch };
```

Then:

```js
return listDocs(options);
return readDoc(file, options);
return bulkReadDocs(files, options);
return treeNotes(options);
return readNote(file, options);
return bulkReadNotes(files, options);
return treeCode(options);
return readCode(file, options);
return bulkReadCode(files, options);
```

### Pass branch through dispatchPost

At top of `dispatchPost`:

```js
const branch = optionalBranch(body?.branch);
const options = { branch };
```

Then:

```js
return createNote(file, content, message, options);
return updateNote(file, content, message, sha, options);
return deleteNote(file, message, sha, options);
return createCode(file, content, message, options);
return updateCode(file, content, message, sha, options);
```

---

## 6. `api/repo-resource.test.js`

### Add unit-level branch validation tests

Import helper:

```js
import { normalizeBranch } from '../src/services/repo-resource/common.js';
```

Tests:

```js
test('normalizeBranch accepts common branch names', () => {
  assert.equal(normalizeBranch('main'), 'main');
  assert.equal(
    normalizeBranch('feature/repo-resource-branch-selector'),
    'feature/repo-resource-branch-selector'
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
```

### Add handler validation tests

GET invalid branch:

```js
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
```

POST invalid branch:

```js
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
```

---

## 7. `config/ai/adam_schema.yaml`

### Add branch query parameter to `repoResourceGet`

Under `/api/repo-resource` GET parameters:

```yaml
        - name: branch
          in: query
          required: false
          schema:
            type: string
          description: Optional Git branch selector. If omitted, uses configured GITHUB_BRANCH or main.
```

### Add branch to `RepoResourceWriteRequest`

```yaml
        branch:
          type: string
          description: Optional Git branch selector. If omitted, uses configured GITHUB_BRANCH or main.
```

Do not add branch to required.

### Version bump

Schema version should move from:

```yaml
version: "2.1.6"
```

to:

```yaml
version: "2.2.0"
```

Reason: new optional capability in existing operation.

---

# Completion Layers

## Layer 1: Patch proposal

Complete when this note exists and identifies exact affected files and change shape.

## Layer 2: Feature branch implementation

Complete when code changes are applied on feature branch and tests pass.

## Layer 3: repo schema

Complete when `config/ai/adam_schema.yaml` has `branch` fields.

## Layer 4: configured Action schema

Complete only after external Action configuration is refreshed.

## Layer 5: runtime-visible schema

Complete only after ADAM runtime sees branch fields in tool schema.

## Layer 6: behavior

Complete only after actual branch read/write is confirmed.

---

# Risks

- If branch response uses raw options only, omitted branch will not show resolved branch. Prefer resolved branch from `getConfig(context)` when feasible.
- If service signatures are updated inconsistently, existing calls may break.
- If branch validation is only in service helper but not handler validation, errors may surface later than desired.
- If schema is updated but Action configuration is not refreshed, ADAM still cannot use branch at runtime.
- If implementation is done on main before selector is usable, it violates the new branch policy.

---

# Recommended Next Step

Do not write code to main.

Ask user to either:

1. create/switch runtime target to `feature/repo-resource-branch-selector`, or
2. approve producing a patch/diff artifact for manual application, or
3. add temporary branch setting through environment config for this implementation slice.

Until branch target is confirmed, keep implementation as proposal only.

---

# Status

proposed

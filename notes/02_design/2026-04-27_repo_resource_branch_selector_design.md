# 2026-04-27 repoResource Branch Selector Design

## Purpose

`Docs-aligned main / Notes-driven branch / Versioned merge` model を実運用できるように、`repoResourceGet` / `repoResourceWrite` に branch selector を追加する設計を固定する。

本 note は実装前の design / diff 案であり、code 変更そのものではない。

---

## Source References

- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `docs/10_repo_resource_api.md`
- `docs/13_dev_workflow.md`
- `api/repo-resource.js`
- `src/services/repo-resource/common.js`
- `src/services/repo-resource/docs.js`
- `src/services/repo-resource/notes.js`
- `src/services/repo-resource/code.js`
- `api/repo-resource.test.js`
- `config/ai/adam_schema.yaml`

---

## Current State

### docs

`docs/10_repo_resource_api.md` defines repo-resource as the unified access layer for docs / notes / code.

It does not currently define a `branch` request parameter.

`docs/13_dev_workflow.md` defines docs as SSOT and says docs updates require human judgment.

### implementation

`src/services/repo-resource/common.js` currently resolves branch through environment config only.

```js
const branch = process.env.GITHUB_BRANCH || 'main';
```

All GitHub read / write / tree operations use that branch.

Affected functions:

- `getConfig()`
- `getContentFile()`
- `putContentFile()`
- `deleteContentFile()`
- `getRepoTree()`

### runtime-visible schema

`config/ai/adam_schema.yaml` currently exposes:

- `repoResourceGet`
  - `action`
  - `resource`
  - `file`
  - `files`
- `repoResourceWrite`
  - `action`
  - `resource`
  - request body with `file`, `content`, `message`, `sha`

It does not expose `branch`.

---

## Problem

ADAM can currently read / write only to the branch configured by runtime environment.

ADAM cannot select a feature branch per request.

This conflicts with the new model:

```text
main = Docs-aligned stable version
branch = Notes-driven development space
merge = Docs-reconciled and version bumped integration
```

Without branch selector, code / workflow / schema / VERSION / CHANGELOG work tends to fall back to main direct writes.

---

## Decision

Add optional `branch` selector to both read and write paths.

```text
repoResourceGet:
  action
  resource
  file / files
  branch optional

repoResourceWrite:
  action
  resource
  file
  content
  message
  sha
  branch optional
```

When `branch` is omitted, preserve current behavior:

```text
branch = GITHUB_BRANCH || main
```

---

## Branch Validation

Add `normalizeBranch(value, context)` in `src/services/repo-resource/common.js`.

Rules:

- missing / empty branch means undefined and falls back to env branch
- trim whitespace
- reject branch containing:
  - `..`
  - leading `/`
  - trailing `/`
  - `\\`
  - ASCII control characters
  - spaces
  - `~`
  - `^`
  - `:`
  - `?`
  - `*`
  - `[` or `]`
- reject branch ending with `.lock`
- reject branch with `//`
- allow common branch names:
  - `main`
  - `feature/atlas-pre-delta-foundation`
  - `feature/repo-resource-branch-selector`
  - `fix/repo-resource-bulk-separator`

This does not need to fully reimplement every Git ref rule, but must reject obvious unsafe or invalid values.

---

## Implementation Shape

### 1. common.js

Change `getConfig()` to accept optional override.

Proposed shape:

```js
export function getConfig(options = {}) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = normalizeBranch(options.branch, {
    step: options.step || 'getConfig',
    resource: options.resource || '',
    action: options.action || '',
  }) || process.env.GITHUB_BRANCH || 'main';

  ...

  return { token, owner, repo, branch };
}
```

Add helper:

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
    branch.includes('\\\\') ||
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

Change GitHub helper signatures:

```js
getContentFile(path, context = {})
putContentFile(path, content, message, sha, context = {})
deleteContentFile(path, message, sha, context = {})
getRepoTree(prefix, context = {})
```

These already accept context. Use `context.branch` when calling `getConfig()`.

```js
const { owner, repo, branch } = getConfig(context);
```

---

### 2. api/repo-resource.js

Parse branch from GET query and POST body.

Add helper:

```js
function optionalBranch(value) {
  return ensureString(value);
}
```

GET:

```js
const branch = optionalBranch(query.branch);
return readNote(file, { branch });
```

POST:

```js
const branch = optionalBranch(body?.branch);
return updateNote(file, content, message, sha, { branch });
```

Do not make branch required.

---

### 3. service modules

Update service functions to accept optional options object.

Docs:

```js
listDocs(options = {})
readDoc(file, options = {})
bulkReadDocs(files, options = {})
treeDocs(options = {})
```

Notes:

```js
treeNotes(options = {})
readNote(file, options = {})
bulkReadNotes(files, options = {})
createNote(file, content, message = '', options = {})
updateNote(file, content, message = '', sha = '', options = {})
deleteNote(file, message = '', sha = '', options = {})
```

Code:

```js
treeCode(options = {})
readCode(file, options = {})
bulkReadCode(files, options = {})
createCode(file, content, message = '', options = {})
updateCode(file, content, message = '', sha = '', options = {})
```

Pass `{ ...context, branch: options.branch }` into `getContentFile`, `putContentFile`, `deleteContentFile`, and `getRepoTree`.

---

## Response Shape

For read / write success responses, include resolved branch where practical.

Minimum acceptable:

```json
{
  "ok": true,
  "data": {
    "path": "notes/...",
    "sha": "...",
    "status": "UPDATED",
    "branch": "feature/repo-resource-branch-selector"
  }
}
```

This helps ADAM verify actual branch behavior.

If adding `branch` to every response is too wide for first implementation, add it at least to write result data.

---

## Schema Changes

### repoResourceGet

Add optional query parameter:

```yaml
- name: branch
  in: query
  required: false
  schema:
    type: string
  description: Optional Git branch selector. If omitted, uses configured GITHUB_BRANCH or main.
```

### RepoResourceWriteRequest

Add optional body field:

```yaml
branch:
  type: string
  description: Optional Git branch selector. If omitted, uses configured GITHUB_BRANCH or main.
```

Do not add `branch` to required fields.

---

## Tests

Add tests before or with implementation.

Minimum tests:

1. `GET` invalid branch returns `400 INVALID_REQUEST`
2. `POST` invalid branch returns `400 INVALID_REQUEST`
3. `branch` is optional and existing requests still validate
4. valid branch names pass validation
5. invalid examples fail:
   - `../main`
   - `/main`
   - `feature//x`
   - `feature/x.lock`
   - `feature/x y`
   - `feature/x?y`

If GitHub calls are not mocked in current tests, extract and unit test `normalizeBranch()` from `common.js`.

---

## Runtime Reflection Guard

This work has multiple completion layers.

Do not collapse them.

### Layer 1: repo implementation

- code accepts branch selector
- tests pass

### Layer 2: repo schema

- `config/ai/adam_schema.yaml` includes branch parameter / field

### Layer 3: configured Action / tool schema

- external Action configuration is refreshed from updated schema

### Layer 4: runtime-visible tool schema

- ADAM runtime actually exposes `branch` in `repoResourceGet` / `repoResourceWrite`

### Layer 5: behavior

- read from a feature branch succeeds
- write to a feature branch succeeds
- main remains docs-aligned stable version

A task is complete only for the layer its completed condition names.

---

## Interaction with Versioning

`VERSION` and `CHANGELOG.md` are branch-sensitive files.

They should be changed in feature branch and finalized at merge.

Do not update `VERSION` / `CHANGELOG.md` on main from runtime unless branch target is confirmed and user approves merge-related update.

---

## Interaction with Bulk Separator

`repoResourceGet bulk` separator implementation should happen after branch selector design.

Reason:

- bulk separator is code behavior change
- code behavior change belongs on feature branch
- branch selector is prerequisite for safe branch-based code work

---

## Proposed Implementation Order

1. Add `normalizeBranch()` and context-based branch override to `common.js`.
2. Pass branch through API dispatch from query/body.
3. Add options objects to docs / notes / code service functions.
4. Include resolved branch in write result data.
5. Add branch validation tests.
6. Update `config/ai/adam_schema.yaml`.
7. Refresh configured Action schema.
8. Confirm runtime-visible branch field.
9. Confirm actual branch read/write behavior.

---

## Completed Condition for This Design Task

This design task is complete when:

- branch selector requirement is stated
- affected files are identified
- implementation shape is described
- schema change is described
- tests are described
- runtime reflection layers are separated
- bulk implementation is explicitly placed after branch selector design

---

## Status

proposed

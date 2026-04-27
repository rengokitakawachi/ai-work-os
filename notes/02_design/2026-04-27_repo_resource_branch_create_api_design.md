# 2026-04-27 repoResource Branch Create API Design

## Purpose

`feature/atlas-pre-delta-foundation` を ADAM runtime から作成できない問題を解消するため、repoResource に branch create capability を追加する最小設計を定義する。

この note は design であり、code / schema / docs 本体はまだ更新しない。

---

## Context

repoResource branch selector は main に例外実装済みである。

確認済み層:

```text
code behavior: complete for main implementation
repo schema: complete
runtime-visible schema: complete
explicit branch read behavior: complete
explicit branch write behavior: complete
```

一方で、feature branch 自体を作成する API は存在しない。

`repoResourceGet` に `branch: feature/atlas-pre-delta-foundation` を指定して `package.json` を read したところ、runtime では `NOT_FOUND` が返った。

これにより、現状では ADAM runtime だけで branch を作成して feature branch 作業へ進めない。

---

## Problem

現在できること:

```text
既存 branch を指定して read / write する
```

現在できないこと:

```text
main など既存 ref から新しい feature branch を作成する
```

そのため、branch based development model のうち、branch 作成だけが人間作業に残る。

これは `Docs-aligned main / Notes-driven branch / Versioned merge` model の自走性を下げる。

---

## Design Decision

repoResource に branch create action を追加する。

最小方針:

```text
resource: repo
action: create_branch
```

理由:

- branch は docs / notes / code のいずれか単一 resource に属さない
- branch は repository-level ref 操作である
- docs / notes / code の write 権限を拡張しない
- API は薄く保ち、GitHub ref 操作は service 層に置く

---

## API Shape

### Endpoint

```text
POST /api/repo-resource?action=create_branch&resource=repo
```

### Request body

```json
{
  "branch": "feature/atlas-pre-delta-foundation",
  "from_branch": "main",
  "message": "create feature branch for ATLAS pre-delta foundation"
}
```

### Fields

```text
branch: required
from_branch: optional, default main
message: optional, log / trace only
```

`branch` は作成する新 branch 名を示す。

`from_branch` は source branch を示す。

`from_branch` が省略された場合は `main` を使用する。

`message` は GitHub ref creation そのものには使わないが、response / log context に残してよい。

---

## Response Shape

成功時:

```json
{
  "ok": true,
  "data": {
    "branch": "feature/atlas-pre-delta-foundation",
    "from_branch": "main",
    "source_sha": "SOURCE_COMMIT_SHA",
    "ref": "refs/heads/feature/atlas-pre-delta-foundation",
    "status": "CREATED"
  },
  "request_id": "REQ_ID"
}
```

既存 branch の場合:

```json
{
  "ok": false,
  "error": {
    "code": "ALREADY_EXISTS",
    "message": "Branch already exists",
    "category": "service",
    "step": "createBranch",
    "resource": "repo",
    "action": "create_branch",
    "status": 409,
    "retryable": false,
    "details": {
      "branch": "feature/atlas-pre-delta-foundation"
    },
    "request_id": "REQ_ID"
  }
}
```

source branch がない場合:

```json
{
  "ok": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Source branch not found",
    "category": "service",
    "step": "createBranch",
    "resource": "repo",
    "action": "create_branch",
    "status": 404,
    "retryable": false,
    "details": {
      "from_branch": "main"
    },
    "request_id": "REQ_ID"
  }
}
```

---

## Validation

Use existing `normalizeBranch()` for both `branch` and `from_branch`.

Additional validation:

- `branch` is required
- `branch` must not be `main`
- `branch` must not equal `from_branch`
- `from_branch` defaults to `main`
- invalid branch returns `INVALID_REQUEST`

Recommended guard:

```text
branch must start with feature/
```

Reason:

- current need is feature branch creation only
- prevents accidental creation of release / main-like branches
- keeps capability narrow

If broader branch classes are needed later, expand explicitly.

---

## Service Design

Create a new service module:

```text
src/services/repo-resource/repo.js
```

Responsibilities:

- validate repo-level branch operations
- read source ref from GitHub
- check target ref existence
- create target ref
- normalize GitHub errors into existing error shape

Proposed function:

```js
export async function createBranch(branch, fromBranch = 'main', message = '')
```

Implementation outline:

```text
1. normalize target branch
2. normalize source branch
3. reject missing target branch
4. reject target branch main
5. reject target branch == source branch
6. require target branch to start with feature/
7. GET /repos/{owner}/{repo}/git/ref/heads/{from_branch}
8. extract source object.sha
9. GET /repos/{owner}/{repo}/git/ref/heads/{branch}
10. if exists, return ALREADY_EXISTS
11. if target not found, POST /repos/{owner}/{repo}/git/refs
12. body: { ref: refs/heads/{branch}, sha: source_sha }
13. return branch / from_branch / source_sha / ref / status CREATED
```

GitHub ref API requires source commit SHA and target ref name.

---

## API Handler Design

Update `api/repo-resource.js` minimally.

Import:

```js
import { createBranch } from '../src/services/repo-resource/repo.js';
```

`validatePost()` change:

```text
resource repo + action create_branch is allowed
```

`dispatchPost()` change:

```text
if resource === repo and action === create_branch:
  return createBranch(body.branch, body.from_branch, body.message)
```

Do not mix branch create into docs / notes / code resources.

Do not add branch create to GET.

---

## Schema Design

Update `config/ai/adam_schema.yaml` only after code design is accepted.

Required schema additions:

- `resource` enum for repoResourceWrite includes `repo`
- POST action enum includes `create_branch`
- request schema supports `branch` and `from_branch`
- response schema supports `branch`, `from_branch`, `source_sha`, `ref`, `status: CREATED`

Because runtime tool schema reflection is separate, completion cannot be based on repo schema file update alone.

Completion layers:

```text
code behavior
repo schema
runtime-visible schema
actual branch create behavior
```

---

## Docs Reflection

`docs/10_repo_resource_api.md` must eventually define branch create if implemented.

Docs reflection should be separate from this design note.

Minimum docs additions after implementation:

```text
repo resource
create_branch action
branch / from_branch fields
feature/ guard
response shape
errors: ALREADY_EXISTS, NOT_FOUND, INVALID_REQUEST
```

Do not include branch create in current branch selector docs reflection until implementation exists.

---

## Security and Safety

Branch create is a repository-level mutation.

It must be narrower than code write.

Safety rules:

- only POST
- only `resource=repo`
- only `action=create_branch`
- only target branches starting with `feature/`
- cannot create `main`
- cannot create a branch equal to source branch
- no delete branch action in this task
- no merge / PR action in this task
- no force update ref in this task

Branch create does not modify file content.

Branch create enables later branch-scoped file writes, which still require Write Gate.

---

## Testing Plan

Add tests in `api/repo-resource.test.js` or a dedicated service test.

Minimum tests:

1. invalid target branch is rejected
2. missing target branch is rejected
3. target branch `main` is rejected
4. target branch not starting with `feature/` is rejected
5. target branch equal to source branch is rejected
6. unsupported repo action is rejected
7. unsupported repo GET is rejected

Networked GitHub behavior should be tested by a harmless runtime observation after deployment:

```text
create feature/atlas-pre-delta-foundation from main
read package.json with branch: feature/atlas-pre-delta-foundation
confirm data.branch is feature/atlas-pre-delta-foundation
```

---

## Non-goals

This design does not include:

- branch delete
- branch rename
- force update ref
- PR creation
- merge automation
- branch protection
- GitHub Actions workflow creation
- docs/10 direct update
- runtime schema reflection completion

---

## Operations Impact

This capability is a prerequisite for ATLAS workflow implementation when target feature branch does not exist.

Current active Day4 cannot safely proceed until one of the following is true:

```text
A. feature/atlas-pre-delta-foundation exists
B. branch create API exists and is runtime-confirmed
C. user creates the branch outside ADAM
```

Recommended next operations candidate:

```text
repoResource branch create API を設計・実装・runtime確認する
```

Placement:

```text
Before ATLAS test workflow implementation
```

---

## Completed Condition

This design task is complete when:

- branch create API shape is defined
- target resource/action boundary is defined
- validation / safety rules are defined
- service responsibility is defined
- schema reflection layers are separated
- docs reflection timing is defined
- operations impact is stated

Implementation is not complete until:

```text
code behavior: complete
repo schema: complete
runtime-visible schema: complete
actual branch create behavior: confirmed
```

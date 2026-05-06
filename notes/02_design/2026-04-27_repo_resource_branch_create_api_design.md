# 2026-04-27 repoResource Branch Create API Design

## Purpose

`feature/atlas-pre-delta-foundation` を ADAM runtime から作成できない問題を解消するため、repoResource に branch create capability を追加する最小設計と実装状態を定義する。

この note は design / implementation status note であり、docs 本体はまだ更新しない。

---

## Current Status

```text
code behavior: implemented in main
repo schema: updated in main
validation tests: added in main
runtime-visible schema: not confirmed
actual branch create behavior: not confirmed
docs reflection: not complete
```

実装済み file:

```text
src/services/repo-resource/repo.js
api/repo-resource.js
api/repo-resource.test.js
config/ai/adam_schema.yaml
```

保存確認済み sha:

```text
src/services/repo-resource/repo.js: d120d7806a49318b2ae16f9df56b8598a310b88e
api/repo-resource.js: de2765f615994edf6f9b0f5618e35d5c8430bda5
api/repo-resource.test.js: 154c54ba4f7758c99347837ed02505d2a4f659de
config/ai/adam_schema.yaml: a49f10a8973737ec52baf4f6f5fee878c2d36ae9
```

`config/ai/adam_schema.yaml` version:

```text
2.2.1
```

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

一方で、feature branch 自体を作成する API は存在しなかった。

`repoResourceGet` に `branch: feature/atlas-pre-delta-foundation` を指定して `package.json` を read したところ、runtime では `NOT_FOUND` が返った。

これにより、ADAM runtime だけで branch を作成して feature branch 作業へ進めない状態だった。

この gap を解消するため、branch create capability を main に bootstrap 実装した。

ただし、この runtime tool schema にはまだ `repoResourceWrite.resource=repo` / `action=create_branch` / `from_branch` が見えていないため、runtime-visible schema と actual branch create behavior は未確認である。

---

## Problem

現在できること:

```text
既存 branch を指定して read / write する
repo schema 上は create_branch を定義済み
main code 上は create_branch を実装済み
```

現在このスレッドでまだできないこと:

```text
runtime-visible tool schema 経由で resource=repo / action=create_branch を呼ぶ
actual branch create behavior を観測する
```

そのため、branch create task はまだ完了扱いできない。

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
- target branch must start with `feature/`

Reason:

- current need is feature branch creation only
- prevents accidental creation of release / main-like branches
- keeps capability narrow

If broader branch classes are needed later, expand explicitly.

---

## Service Implementation

Created service module:

```text
src/services/repo-resource/repo.js
```

Responsibilities:

- validate repo-level branch operations
- read source ref from GitHub
- check target ref existence
- create target ref
- normalize GitHub errors into existing error shape

Implemented exports:

```js
export function validateBranchCreateInput(branchValue, fromBranchValue = 'main')
export async function createBranch(branchValue, fromBranchValue = 'main', message = '')
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

## API Handler Implementation

Updated:

```text
api/repo-resource.js
```

Changes:

```text
- import createBranch from src/services/repo-resource/repo.js
- validatePost() allows resource=repo + action=create_branch
- validatePost() requires body.branch for create_branch
- validatePost() validates from_branch when present
- dispatchPost() handles repo/create_branch before file/content validation
- repo/create_branch does not require file/content/sha
- repo GET remains unsupported
```

Do not mix branch create into docs / notes / code resources.

Do not add branch create to GET.

---

## Schema Implementation

Updated:

```text
config/ai/adam_schema.yaml
```

Changes:

```text
version: 2.2.1
RepoResourceWriteRequest.file is no longer globally required
RepoResourceWriteRequest.from_branch added
RepoResourceWriteRequest.branch describes create_branch target branch
RepoResourceWriteResultData.from_branch added
RepoResourceWriteResultData.source_sha added
RepoResourceWriteResultData.ref added
POST /api/repo-resource action enum includes create_branch
POST /api/repo-resource resource enum includes repo
POST description includes create_branch rules
```

Because runtime tool schema reflection is separate, completion cannot be based on repo schema file update alone.

Completion layers:

```text
code behavior
repo schema
runtime-visible schema
actual branch create behavior
```

---

## Tests Added

Updated:

```text
api/repo-resource.test.js
```

Added validation coverage:

```text
validateBranchCreateInput accepts feature branch from main
validateBranchCreateInput defaults from_branch to main
validateBranchCreateInput rejects missing target branch
validateBranchCreateInput rejects main target branch
validateBranchCreateInput rejects non-feature target branch
validateBranchCreateInput rejects target equal to source
repo-resource returns 400 for repo GET
repo-resource returns 400 for unsupported repo post action
repo-resource returns 400 for repo create_branch without branch
```

Networked GitHub behavior is not confirmed by these tests.

---

## Docs Reflection

`docs/10_repo_resource_api.md` must eventually define branch create after runtime behavior is confirmed.

Docs reflection should be separate from this design note.

Minimum docs additions after implementation confirmation:

```text
repo resource
create_branch action
branch / from_branch fields
feature/ guard
response shape
errors: ALREADY_EXISTS, NOT_FOUND, INVALID_REQUEST
```

Do not include branch create in current branch selector docs reflection until runtime-visible schema and actual branch create behavior are confirmed.

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

## Runtime Confirmation Plan

This task is not complete until runtime confirms the new schema and behavior.

Required confirmations:

```text
1. runtime-visible repoResourceWrite schema exposes resource=repo
2. runtime-visible repoResourceWrite schema exposes action=create_branch
3. runtime-visible repoResourceWrite schema exposes from_branch
4. actual call can create feature/atlas-pre-delta-foundation from main
5. repoResourceGet can read package.json with branch=feature/atlas-pre-delta-foundation
```

Expected actual create call after schema refresh:

```json
{
  "resource": "repo",
  "action": "create_branch",
  "branch": "feature/atlas-pre-delta-foundation",
  "from_branch": "main",
  "message": "create feature branch for ATLAS pre-delta foundation"
}
```

Expected read-back call after create:

```json
{
  "resource": "code",
  "action": "read",
  "file": "package.json",
  "branch": "feature/atlas-pre-delta-foundation"
}
```

Expected read-back success:

```text
ok: true
data.branch: feature/atlas-pre-delta-foundation
data.path: package.json
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
- runtime schema reflection completion by repo file update alone

---

## Operations Impact

This capability is a prerequisite for ATLAS workflow implementation when target feature branch does not exist.

Current active Day4 cannot be completed until one of the following is true:

```text
A. feature/atlas-pre-delta-foundation exists
B. branch create API is runtime-confirmed
C. user creates the branch outside ADAM
```

Recommended next action:

```text
Confirm runtime-visible schema for repoResourceWrite create_branch, then perform actual branch create behavior observation.
```

Placement:

```text
Before ATLAS test workflow implementation
```

---

## Completed Condition

Design layer is complete because:

- branch create API shape is defined
- target resource/action boundary is defined
- validation / safety rules are defined
- service responsibility is defined
- schema reflection layers are separated
- docs reflection timing is defined
- operations impact is stated

Implementation task is not complete until:

```text
code behavior: complete
repo schema: complete
runtime-visible schema: complete
actual branch create behavior: confirmed
```

Current implementation task status:

```text
code behavior: complete
repo schema: complete
runtime-visible schema: not complete
actual branch create behavior: not complete
```

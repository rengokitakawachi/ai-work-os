# 2026-04-29 DELTA v0.4 Operations Write Safety Design

## Purpose

DELTA v0.4 で `systems/delta/operations/active_operations.md` を更新可能にする前に、write scope、許可 action、更新方式、validation、runtime reflection、rollback 方針を固定する。

この note は safety design gate の成果物であり、v0.4 実装そのものではない。

---

## Source references

- `docs/15_notes_system.md`
- `docs/17_operations_system.md`
- `notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md`
- `systems/delta/operations/active_operations.md`
- `systems/delta/config/delta_schema.yaml`
- `systems/delta/config/delta_action_schema_v0.3.yaml`
- `api/repo-resource.js`
- `src/services/delta-history.js`

---

## Background

v0.3 では `systems/delta/history/*.md` の `create` / `update` を runtime behavior confirmed まで確認した。

v0.4 は、DELTA が学習 operations の正本である `systems/delta/operations/active_operations.md` を更新できるようにする段階である。

operations は history より危険度が高い。

- history: 実績ログ。誤記があっても比較的戻しやすい
- active_operations: 次に何を実行するかの正本。壊れると DELTA の実行判断が壊れる

そのため、v0.4 は実装前に safety design gate を通す。

---

## Decision summary

### Resource

```text
resource=delta_operations
```

### Endpoint

新規 API route は増やさない。

```text
POST /api/repo-resource?resource=delta_operations&action=update
```

### Allowed action

```text
update only
```

禁止:

- create
- delete
- append
- arbitrary patch
- arbitrary systems/delta write

### Write scope

```text
systems/delta/operations/active_operations.md only
```

禁止:

- `systems/delta/operations/next_operations.md`
- `systems/delta/operations/archive_operations.md`
- `systems/delta/history/*`
- `systems/delta/roadmap/*`
- `systems/delta/plan/*`
- `systems/delta/config/*`
- `systems/delta/**` arbitrary write

---

## Update model

### Adopted model for v0.4

v0.4 は **full replace with validation** とする。

理由:

- GitHub contents API は file content replace と相性がよい
- patch 形式は conflict / partial corruption の扱いが複雑
- proposed diff only では DELTA closed loop の検証にならない
- active_operations は Markdown + YAML-like blocks であり、line patch より全文 read -> full replace -> read-back の方が観測しやすい

### Required sequence

DELTA は operations update 前に必ず以下を行う。

1. `deltaResourceGet` で `operations/active_operations.md` を read
2. 既存 content / sha / branch を確認
3. 更新後全文を生成
4. `deltaOperationsWrite` で update
5. `deltaResourceGet` で read-back
6. expected marker / expected diff / required structure を確認

---

## Validation rules

v0.4 service は保存前に最小 validation を行う。

### Path validation

- file must equal `active_operations.md`
- caller must not pass `operations/active_operations.md`
- caller must not pass `systems/delta/operations/active_operations.md`
- caller must not pass relative escape such as `../history/2026-04.md`

Rationale:

`delta_operations` resource root is `systems/delta/operations/`.
The file parameter is relative to that root.

### Content validation

保存前に最低限以下を確認する。

Required strings:

- `# delta active_operations`
- `## Day0`
- `## Rules`
- `Delta operations are learning execution order, not calendar schedule.`
- `Daily review updates learning history and next operations.`

Forbidden or rejected if missing:

- empty content
- content without Day structure
- content without Rules section
- content that appears to be history log instead of operations

### Scope validation

The service must return:

```text
resource: delta_operations
root: systems/delta/operations/
path: systems/delta/operations/active_operations.md
write_scope: systems/delta/operations/active_operations.md
status: UPDATED
```

---

## DELTA operation rules to preserve

v0.4 must not weaken the existing DELTA operations rules.

The updated content must preserve these principles:

- operations are learning execution order, not calendar schedule
- daily review updates learning history and next operations
- Todoist projection is optional
- 平日は原則 L1 / L2、土日祝は L3、毎日秒トレ40問
- L3 は問題番号ベースで管理する
- L3 の評価は理解度主軸の ◎ / ○ / △ / ×
- 正答数・正誤は補助情報
- 実績は operations ではなく history に集約する

---

## Runtime reflection test plan

v0.4 runtime reflection は、repo implementation / schema 保存だけでは完了にしない。

### Precondition

- v0.3 history write runtime behavior confirmed
- DELTA GPT Actions に v0.4 schema を設定済み
- Bearer API Key 認証が保存済み
- 新規 DELTA chat で runtime-visible tool を確認

### Read test

```text
resource=delta
action=read
file=operations/active_operations.md
branch=feature/atlas-pre-delta-foundation
```

Expected:

- ok true
- resource delta
- read_only true
- path systems/delta/operations/active_operations.md

### Invalid path test 1

```text
resource=delta_operations
action=update
file=../history/2026-04.md
content=test
branch=feature/atlas-pre-delta-foundation
```

Expected:

- rejected
- no history write

### Invalid path test 2

```text
resource=delta_operations
action=update
file=next_operations.md
content=test
branch=feature/atlas-pre-delta-foundation
```

Expected:

- rejected
- next_operations.md not updated

### Unsupported action test

Do not use destructive `delete` in runtime test.

Use non-destructive unsupported action if schema allows the call attempt, or skip if Actions editor blocks it before execution.

Expected:

- create/delete are not exposed or are rejected

### Invalid content test

```text
resource=delta_operations
action=update
file=active_operations.md
content=test
branch=feature/atlas-pre-delta-foundation
```

Expected:

- rejected by content validation
- active_operations.md not replaced with invalid content

### Controlled update test

Use a harmless marker inside a test note line, not a structural reroll.

1. read existing `operations/active_operations.md`
2. preserve full content
3. append or update a single note line under `## Rules` or a clearly marked test comment

Marker:

```text
<!-- DELTA v0.4 runtime operations write test: ok -->
```

Expected write result:

- ok true
- resource delta_operations
- root systems/delta/operations/
- path systems/delta/operations/active_operations.md
- status UPDATED
- write_scope systems/delta/operations/active_operations.md

### Read-back test

Read back `operations/active_operations.md` and confirm:

- marker exists
- Day structure still exists
- Rules section still exists
- no history file changed
- no config / roadmap / plan file changed

---

## Rollback policy

Every v0.4 operation update must be recoverable by Git SHA.

Runtime test must record:

- previous sha
- returned sha
- branch
- expected marker

If unexpected corruption occurs:

1. stop further writes
2. use GitHub history or repo write with previous content to restore `active_operations.md`
3. disable or roll back v0.4 Action schema
4. do not proceed to v0.4 confirmed

---

## Schema shape

Create `systems/delta/config/delta_action_schema_v0.4.yaml` after implementation.

Expose:

- existing `deltaResourceGet` GET for read-only access
- new `deltaOperationsWrite` POST for active_operations update only

Do not expose:

- operations create
- operations delete
- next_operations update
- archive_operations update
- arbitrary delta write

---

## Service shape

Recommended service file:

```text
src/services/delta-operations.js
```

Exports:

- `updateDeltaOperations(file, content, message, sha, options)`

Constants:

- `DELTA_OPERATIONS_ROOT = 'systems/delta/operations/'`
- `DELTA_ACTIVE_OPERATIONS_FILE = 'active_operations.md'`

`api/repo-resource.js` dispatch:

```text
POST resource=delta_operations action=update
```

---

## Completion condition for v0.4 implementation task

The v0.4 implementation task is complete only when:

- `src/services/delta-operations.js` exists
- `/api/repo-resource` supports `resource=delta_operations` / `action=update`
- write scope is restricted to `systems/delta/operations/active_operations.md`
- create / delete are not exposed
- invalid path is rejected
- invalid content is rejected
- `systems/delta/config/delta_action_schema_v0.4.yaml` exists
- implementation files are read-back confirmed

Runtime behavior is not complete until a separate runtime reflection task confirms actual DELTA GPT Actions behavior.

---

## Decision

Proceed to v0.4 implementation with the following fixed guardrails:

```text
resource: delta_operations
action: update only
file: active_operations.md only
update model: full replace with validation
runtime test: invalid path + invalid content + controlled marker update + read-back
rollback: previous sha / Git restore
```

No operations write should be exposed until these guardrails are implemented.

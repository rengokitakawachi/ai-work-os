# 2026-04-27 Pre-Delta Docs / Code / Operations Gap Inventory

## Purpose

Delta 開発前に、docs / code / operations / notes の実態差分を棚卸しする。

本 analysis は docs 正本を直接更新するものではない。

後続の `docs 反映案を delta 前環境整備として作る` task の入力とする。

---

## Source References

### Docs

- `docs/10_repo_resource_api.md`
- `docs/13_dev_workflow.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`

### Code / repo tree

- `api/repo-resource.js`
- `api/repo-resource.test.js`
- `src/services/repo-resource/common.js`
- `src/services/repo-resource/docs.js`
- `src/services/repo-resource/notes.js`
- `src/services/repo-resource/code.js`
- `package.json`
- code tree as of 2026-04-27

### Notes / decisions / proposals

- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `notes/05_decisions/2026-04-27_atlas_testing_system_name.md`
- `notes/05_decisions/2026-04-27_atlas_minimum_testing_policy.md`
- `notes/02_design/2026-04-27_repo_resource_branch_selector_design.md`
- `notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md`
- `notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md`
- `notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md`
- `notes/04_operations/active_operations.md`

---

## Executive Summary

実態は docs より進んでいる。

現在の docs は、主に次を定義している。

- docs は SSOT
- notes は補助
- code は docs に従属
- docs 更新は notes/design と人間判断を経由
- operations は短期実行順正本
- repo-resource は docs / notes / code の統合 access layer

一方で、notes / operations では以下が新たに決定・設計済みである。

- `Docs-aligned main / Notes-driven branch / Versioned merge` model
- ATLAS Testing System
- repoResource branch selector design / patch proposal
- ATLAS minimal test workflow proposal
- delta as independent learning support system
- delta precondition gate before development

このため、delta 開発前に docs 反映案を作る必要がある。

---

## Gap 1: Branch / main / merge model

### Current docs

`docs/13_dev_workflow.md` defines Docs Driven Development and says:

- docs are SSOT
- notes → docs → code order
- docs updates require human judgment
- implementation must align with docs

However, it does not define:

- main branch as docs-aligned stable version
- feature branch as notes-driven development space
- merge as docs-reconciled and version-bumped integration
- PR / branch review boundary
- branch-sensitive write policy

### Current reality

`notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md` accepted:

```text
main = Docs-aligned stable version
branch = Notes-driven development space
merge = Docs-reconciled and version bumped integration
```

It also states:

- code / workflow / schema / version changes should happen on feature branch
- main direct write is limited to light notes / operations / decision updates
- user owns final merge judgment

### Gap

Docs do not yet define branch-based development.

### Recommended docs reflection

Update `docs/13_dev_workflow.md` with a new section:

```text
Branch model
- main is docs-aligned stable version
- feature branch is notes-driven development space
- merge requires docs / code / config / operations / version reconciliation
- user owns merge decision
```

---

## Gap 2: Versioning

### Current docs

No observed docs section defines repo-level versioning.

`package.json` has:

```json
"version": "1.0.0"
```

But no repo root `VERSION` or `CHANGELOG.md` is present in the code tree.

### Current reality

Branch policy decision accepted lightweight versioning:

- `VERSION`
- `CHANGELOG.md`
- version bump at merge
- patch / minor / major rules

### Gap

Versioning is decided in notes but not reflected in docs or repo files.

### Recommended docs reflection

Add versioning section to `docs/13_dev_workflow.md` or a new docs file.

Minimum content:

```text
VERSION represents main stable version.
CHANGELOG records main-merged changes only.
Branch work logs stay in notes until merge.
Version bump is proposed in branch and finalized at merge.
```

### Recommended implementation follow-up

Create `VERSION` and `CHANGELOG.md` on feature branch, not main, unless user explicitly approves a docs-aligned main update.

---

## Gap 3: ATLAS Testing System

### Current docs

No docs currently define ATLAS as a system.

`docs/13_dev_workflow.md` has human / AI roles, but not:

- ATLAS role
- Claude as verification actor
- test_result / spec_gap / PR review order
- from-claude handoff extension
- ATLAS verification gate

### Current reality

Accepted notes define:

- ATLAS = Claude-backed test / verification / CI review system
- priority: test_result → spec_gap → PR review
- minimal workflow: `.nvmrc` + GitHub Actions running `npm test`
- no coverage / lint / PR comments initially
- delta entry gate depends on tests green, no open spec_gap, docs alignment, `.nvmrc`, version consistency

### Gap

ATLAS exists operationally in notes but not in docs.

### Recommended docs reflection

Update `docs/13_dev_workflow.md` with ATLAS role, or create a dedicated docs file later.

Minimum section:

```text
ATLAS is verification support, not merge authority.
ATLAS records test_result / spec_gap / review findings.
User remains final merge authority.
```

---

## Gap 4: CI / workflow files

### Current docs

No docs define `.nvmrc` or `.github/workflows/test.yml`.

### Current code tree

Observed code tree does not include:

- `.nvmrc`
- `.github/workflows/test.yml`
- `package-lock.json`

`package.json` includes:

```json
"engines": { "node": "20.x" },
"scripts": { "test": "node --test" }
```

### Current reality

Patch proposal defines:

- `.nvmrc` content: `20`
- workflow runs on push / pull_request
- setup-node reads `.nvmrc`
- install command should be `npm install` if no `package-lock.json`
- use `npm ci` only if lockfile exists

### Gap

CI is designed but not implemented.

### Recommended docs reflection

Docs should state initial ATLAS CI rule:

```text
Initial CI runs npm test only.
Node version is pinned via .nvmrc.
Use npm install unless package-lock.json exists and is maintained.
```

---

## Gap 5: repoResource branch selector

### Current docs

`docs/10_repo_resource_api.md` defines repo-resource endpoints and parameters but not `branch`.

It defines `files` as comma-separated and does not define newline separator.

### Current code reality

Implementation currently uses environment branch only:

```text
GITHUB_BRANCH || main
```

Runtime-visible tool schema currently does not expose `branch`.

### Current notes reality

Design and patch proposal define:

- optional `branch` selector for `repoResourceGet`
- optional `branch` field for `repoResourceWrite`
- omitted branch falls back to `GITHUB_BRANCH || main`
- validation via `normalizeBranch()`
- completion layers: implementation, schema, configured Action, runtime-visible schema, behavior confirmation

### Gap

Docs do not yet describe branch selector.

### Recommended docs reflection

Update `docs/10_repo_resource_api.md` after implementation is ready or as planned capability.

Minimum content:

```text
branch optional parameter / field
omitted means configured GITHUB_BRANCH || main
runtime reflection and behavior confirmation are separate completed conditions
```

---

## Gap 6: repoResource bulk separator

### Current docs

`docs/10_repo_resource_api.md` defines bulk `files` as comma-separated:

```text
files=FILENAME1,FILENAME2,...
```

### Current operations reality

Active operations include:

```text
repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
```

with planned behavior:

```text
parseFilesParam を comma / newline 両対応にする
```

### Gap

Docs currently define comma-only.

### Recommended docs reflection

After bulk separator implementation, update `docs/10_repo_resource_api.md`:

```text
files supports comma-separated and newline-separated values.
Whitespace around entries is ignored.
Empty entries are ignored.
```

Until implementation exists, keep as docs reflection candidate, not current spec.

---

## Gap 7: Delta system structure

### Current docs

`docs/15_notes_system.md` defines notes structure only.

`docs/17_operations_system.md` defines current operations structure.

No docs define:

- `systems/{system_id}`
- `systems/delta/`
- learning-specific roadmap / plan / operations / history / review
- system-resource API
- delta as independent domain system

### Current notes reality

Delta fast-track design defines:

```text
systems/delta/
  docs/
  roadmap/
  plan/
  operations/
  history/
  review/
  resources/
  config/
```

and says delta is independent learning support system with its own roadmap / plan / operations / history / review.

### Gap

Delta architecture is designed but not in docs.

### Recommended docs reflection

Do not immediately update docs until delta MVP layout is accepted.

First create docs reflection proposal that distinguishes:

- current AI Work OS core docs
- future / branch-level delta system docs
- system-resource as later API, not current capability

---

## Gap 8: Operations日中 reroll reality

### Current docs

`docs/17_operations_system.md` says 日中 reroll is exceptional and allowed for recovery:

- active broken
- duplicate
- active impossible
- mistaken task mixed in

### Current reality

During 2026-04-27 session, daytime reroll occurred multiple times due to:

- stale tasks discovered
- delta urgency
- branch / ATLAS / versioning decisions changing prerequisites
- branch selector dependency before bulk implementation

### Gap

Docs allow exceptional reroll but do not describe positive reroll triggers such as:

- prerequisite inversion discovered
- active tasks completed/stale during daytime
- major new decision invalidates ordering

### Recommended docs reflection

Update `docs/17_operations_system.md` carefully.

Suggested addition:

```text
Daytime reroll may also be used when a newly accepted decision invalidates active ordering or when active tasks become stale/completed and block correct execution.
It remains exceptional and must be justified in operations.
```

---

## Gap 9: package-lock and install command

### Current code tree

No `package-lock.json` observed.

### Current patch proposal

ATLAS workflow proposal uses `npm install` if no lockfile exists.

### Gap

Docs do not define dependency install policy.

### Recommended follow-up

For initial ATLAS workflow:

- use `npm install`
- later decide whether to commit `package-lock.json`
- if committed, switch CI to `npm ci`

This should be part of docs reflection or ATLAS follow-up, not hidden in workflow only.

---

## Gap 10: from-claude format extension

### Current code/config

`config/ai/from-claude.md` has a basic handoff format:

```text
kind: proposal / question / spec_gap / observation / task / test_plan / test_result
status: open / resolved / acknowledged
ref: ...
```

### Current notes reality

ATLAS minimum policy extends format with:

- summary
- recommendations
- risks
- next_test_plan
- for test_result: result / fail_detail / self_assessment

### Gap

The file itself documents base rules, but ATLAS extension lives in notes.

### Recommended docs/config reflection

Do not let ADAM write `from-claude.md` directly.

Create a docs/design reflection that formalizes ATLAS handoff format and, if accepted, ask Claude/ATLAS to update its own surface or create a docs-level rule.

---

## Prioritized Reflection Candidates

### Must reflect before merge / branch implementation

1. Branch model in `docs/13_dev_workflow.md`
2. ATLAS role / verification gate in `docs/13_dev_workflow.md`
3. repoResource branch selector in `docs/10_repo_resource_api.md`
4. Versioning model in `docs/13_dev_workflow.md` or new docs file

### Reflect after implementation

5. bulk separator support in `docs/10_repo_resource_api.md`
6. `.nvmrc` / GitHub Actions workflow rule in dev workflow docs
7. `VERSION` / `CHANGELOG.md` actual files and change procedure

### Hold until delta MVP layout is accepted

8. `systems/delta/` docs / system structure
9. system-resource API
10. delta-specific review / operations policies

---

## Recommended Next Action

Proceed to active task:

```text
docs 反映案を delta 前環境整備として作る
```

The docs reflection proposal should cover:

- branch model
- ATLAS minimal verification model
- versioning
- repoResource branch selector
- bulk separator as pending implementation
- delta precondition, but not full delta docs yet

---

## Status

completed

# 2026-04-27 Feature Branch Start Procedure

## Purpose

pre-delta foundation work の feature branch target と開始手順を固定する。

この note は branch 開発開始手順の固定であり、code / workflow / schema 本体はまだ変更しない。

---

## Source References

- `notes/05_decisions/2026-04-27_branch_policy_for_atlas_delta.md`
- `notes/02_design/2026-04-27_main_alignment_repair_proposal.md`
- `notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md`
- `notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md`
- `notes/04_operations/active_operations.md`

---

## Decision

Feature branch target is:

```text
feature/atlas-pre-delta-foundation
```

---

## Reason

This branch is broader than `feature/repo-resource-branch-selector`, but it matches the current active operations sequence.

It can contain the following pre-delta foundation work as one coherent branch:

1. repoResource branch selector
2. ATLAS minimal test workflow
3. repoResource bulk newline separator
4. delta MVP resource layout preparation
5. VERSION / CHANGELOG introduction if needed at merge preparation

Using one foundation branch avoids prematurely splitting tightly coupled preconditions.

---

## Main Branch Rule

Do not apply the following directly to `main`:

- application code changes
- API behavior changes
- runtime schema changes
- GitHub Actions workflow changes
- `.nvmrc`
- `VERSION`
- `CHANGELOG.md`
- `systems/delta/` resource layout

Main remains Docs-aligned stable version.

Notes / design / decision additions may continue on main when they are small planning artifacts.

---

## Current Runtime Constraint

Current ADAM runtime does not expose branch selector fields for `repoResourceGet` / `repoResourceWrite`.

Therefore ADAM cannot safely target feature branch writes through runtime tool calls yet.

Branch-sensitive code / workflow / schema changes must use one of the following paths.

---

## Start Paths

### Path A: Manual patch application

Use patch proposals as implementation instructions.

Human or external dev tool creates / switches to:

```text
feature/atlas-pre-delta-foundation
```

Then applies patches from:

- `notes/02_design/2026-04-27_repo_resource_branch_selector_patch_proposal.md`
- `notes/02_design/2026-04-27_atlas_test_workflow_patch_proposal.md`

This is the safest path before runtime branch selector exists.

### Path B: Environment branch target

Configure deployment/runtime environment so `GITHUB_BRANCH` points to:

```text
feature/atlas-pre-delta-foundation
```

Then repoResource writes without explicit branch field target that branch.

This requires external confirmation before any code / workflow / schema write.

### Path C: Implement branch selector first

Implement repoResource branch selector through a safe external path.

After implementation:

1. refresh configured Action / tool schema
2. confirm runtime-visible schema exposes branch
3. confirm branch read behavior
4. confirm branch write behavior with harmless test file or explicit scoped file
5. then continue ATLAS / bulk / delta work through ADAM runtime

---

## First Implementation Task

The first implementation task remains:

```text
repoResource branch selector を feature branch へ実装する
```

Reason:

- It unlocks safe branch-targeted repo reads/writes.
- It must precede bulk separator implementation through ADAM runtime.
- It reduces risk before ATLAS / delta resource changes.

---

## Completion Condition

This branch-start task is complete when:

- branch target is fixed as `feature/atlas-pre-delta-foundation`
- main direct-write prohibition is explicit
- branch-start paths are documented
- next implementation task is identified as repoResource branch selector

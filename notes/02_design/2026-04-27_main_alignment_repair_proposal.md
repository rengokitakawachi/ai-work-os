# 2026-04-27 Main Alignment Repair Proposal

## Purpose

現 main の docs / code 不一致分類を受けて、main に対する整合修正対象を確定する。

この note は docs 本体を直接更新するものではない。

---

## Source References

- `notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md`
- `notes/02_design/2026-04-27_branch_selector_main_docs_schema_reflection_gap.md`
- `notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md`
- `notes/04_operations/active_operations.md`
- `docs/10_repo_resource_api.md`
- `docs/13_dev_workflow.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`
- `api/repo-resource.js`
- `api/repo-resource.test.js`
- `src/services/repo-resource/common.js`
- `src/services/repo-resource/docs.js`
- `src/services/repo-resource/notes.js`
- `src/services/repo-resource/code.js`
- `config/ai/adam_schema.yaml`
- `package.json`

---

## Conclusion

現時点で、main に対して即時整理すべき `current-main mismatch` は1件ある。

```text
repoResource branch selector は main code / repo schema / runtime-visible schema / explicit read-write behavior まで実装・確認済みだが、docs/10_repo_resource_api.md はまだ branch selector を仕様として定義していない。
```

したがって、main に対して code 修正は行わない。

必要なのは、`docs/10_repo_resource_api.md` への docs reflection を人間判断へ回すことである。

---

## Classification Summary

| Gap | Classification | Main Repair Target |
| --- | --- | --- |
| Branch / main / merge model | notes-proposal-only | no |
| Versioning model | notes-proposal-only | no |
| ATLAS Testing System | notes-proposal-only | no |
| CI / workflow files | branch-development-candidate | no |
| repoResource branch selector | current-main mismatch | yes: docs reflection |
| repoResource bulk newline separator | branch-development-candidate | no |
| Delta system structure | branch-development-candidate | no |
| Operations daytime reroll rule | notes-proposal-only | no |
| package-lock / install policy | branch-development-candidate | no |
| from-claude ATLAS extension | notes-proposal-only | no |

---

## Current-Main Mismatch

### 1. repoResource branch selector docs reflection gap

Observed current main behavior:

- `api/repo-resource.js` accepts `branch` in GET query and POST body.
- `src/services/repo-resource/common.js` defines `normalizeBranch()` and request-level branch resolution.
- `src/services/repo-resource/docs.js`, `notes.js`, and `code.js` propagate branch options.
- read / tree / write responses include resolved `branch`.
- `config/ai/adam_schema.yaml` exposes optional branch selector in repo schema.
- runtime-visible schema exposes `repoResourceGet.branch` and `repoResourceWrite.branch`.
- explicit `repoResourceGet` with `branch: main` has been observed.
- explicit `repoResourceWrite` with `branch: main` has been observed through a harmless probe file.

Observed docs state:

- `docs/10_repo_resource_api.md` defines repo-resource endpoints but does not define optional `branch` parameter / body field.
- `docs/10_repo_resource_api.md` does not define fallback rule `branch -> GITHUB_BRANCH -> main`.
- `docs/10_repo_resource_api.md` does not define resolved `data.branch` behavior.

Classification:

```text
current-main mismatch
```

Repair target:

```text
docs reflection only
```

Existing repair draft:

```text
notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md
```

---

## Not Current-Main Mismatch

### Branch / main / merge model

Classification:

```text
notes-proposal-only
```

Reason:

The branch policy is accepted in decisions and operations, but it is an operating model proposal / governance layer. It does not currently contradict implemented code behavior.

Docs reflection is useful, but it is not a blocking main code/docs mismatch.

### Versioning model

Classification:

```text
notes-proposal-only
```

Reason:

`package.json` has `version: 1.0.0`, but repo-level `VERSION` / `CHANGELOG.md` are not yet implemented. The lightweight versioning model remains accepted policy in notes, not current main implementation.

### ATLAS Testing System

Classification:

```text
notes-proposal-only
```

Reason:

ATLAS naming and minimal policy are accepted in decisions, but `.nvmrc` / workflow / ATLAS runtime surfaces are not yet implemented in main.

### CI / workflow files

Classification:

```text
branch-development-candidate
```

Reason:

The current code tree has no `.nvmrc`, no `.github/workflows/test.yml`, and no `package-lock.json`. The ATLAS workflow remains a patch proposal.

### repoResource bulk newline separator

Classification:

```text
branch-development-candidate
```

Reason:

`docs/10_repo_resource_api.md` defines comma-separated `files`, and `api/repo-resource.js` currently implements comma-only `parseFilesParam()`. Current docs and code are aligned. Newline separator support is a planned feature.

### Delta system structure

Classification:

```text
branch-development-candidate
```

Reason:

`systems/delta/` does not exist in current main. Delta architecture is saved as design and should not be treated as current main mismatch.

### Operations daytime reroll rule

Classification:

```text
notes-proposal-only
```

Reason:

`docs/17_operations_system.md` already allows exceptional daytime reroll for recovery. Recent operations usage suggests a possible docs refinement, but does not create code/docs mismatch.

### package-lock / install policy

Classification:

```text
branch-development-candidate
```

Reason:

No `package-lock.json` is present. Install policy belongs with ATLAS workflow implementation.

### from-claude ATLAS extension

Classification:

```text
notes-proposal-only
```

Reason:

ATLAS handoff extension is accepted in notes. `config/ai/from-claude.md` is a Claude-owned surface and should not be rewritten by ADAM directly.

---

## Main Repair Decision

Main code update:

```text
no
```

Main schema update:

```text
no; already updated and runtime-visible
```

Main docs update:

```text
not directly by ADAM through API
```

Docs reflection action:

```text
yes; present docs/10_repo_resource_api.md branch selector update draft to human decision
```

---

## Deferred / Branch Targets

The following remain feature branch development candidates:

1. ATLAS minimal test workflow
2. repoResource bulk newline separator
3. delta MVP resource layout
4. VERSION / CHANGELOG introduction
5. ATLAS handoff format extension

These are not main repair tasks because they represent planned capability, not observed drift between current docs and current code.

---

## Next Action

Proceed to the next active task:

```text
main 整合修正案を作る
```

Given the current classification, the repair proposal should be narrowly scoped:

```text
Use notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md as the docs reflection package for human decision.
```

---

## Completed Condition

This task is complete because:

- current-main mismatch / notes-proposal-only / branch-development-candidate classification is updated
- repoResource branch selector is identified as the only current-main mismatch
- the repair target is docs reflection, not code change
- branch selector docs update draft already exists

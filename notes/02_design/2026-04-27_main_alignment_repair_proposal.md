# 2026-04-27 Main Alignment Repair Proposal

## Purpose

現 main の docs / code 不一致分類を受けて、main に対する整合修正対象を確定する。

この note は docs 本体を直接更新するものではない。

---

## Source References

- `notes/08_analysis/2026-04-27_pre_delta_docs_code_operations_gap_inventory.md`
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

現時点で、main に対して即時修正すべき `current-main mismatch` は確認されない。

したがって、main への直接修正は行わない。

---

## Classification Summary

| Gap | Classification | Main Repair Target |
| --- | --- | --- |
| Branch / main / merge model | notes-proposal-only | no |
| Versioning model | notes-proposal-only | no |
| ATLAS Testing System | notes-proposal-only | no |
| CI / workflow files | branch-development-candidate | no |
| repoResource branch selector | branch-development-candidate | no |
| repoResource bulk newline separator | branch-development-candidate | no |
| Delta system structure | branch-development-candidate | no |
| Operations daytime reroll rule | notes-proposal-only | no |
| package-lock / install policy | branch-development-candidate | no |
| from-claude ATLAS extension | notes-proposal-only | no |

---

## Current-Main Mismatch

None.

Observed docs and code are internally consistent for current main behavior:

- `docs/10_repo_resource_api.md` defines repoResource bulk `files` as comma-separated.
- `api/repo-resource.js` implements `parseFilesParam()` as comma-separated only.
- `docs/10_repo_resource_api.md` does not define a branch selector.
- current code uses `GITHUB_BRANCH || main` internally and does not expose branch as runtime input.
- current runtime schema does not expose branch on `repoResourceGet` / `repoResourceWrite`.
- `docs/17_operations_system.md` defines daytime reroll as exceptional, which is still compatible with current operations usage.

---

## Main Repair Decision

No main code update.

No main docs update.

No schema update.

No workflow update.

No version file creation.

No delta resource creation.

---

## Deferred / Branch Targets

The following should remain feature branch development candidates:

1. repoResource branch selector implementation
2. ATLAS minimal test workflow
3. repoResource bulk newline separator
4. delta MVP resource layout
5. VERSION / CHANGELOG introduction
6. ATLAS handoff format extension

These are not main repair tasks because they represent planned capability, not observed drift between current docs and current code.

---

## Next Action

Proceed to the next active task:

```text
feature branch target を確定し、branch 開発開始手順を固定する
```

Recommended branch target:

```text
feature/atlas-pre-delta-foundation
```

Reason:

- It can include repoResource branch selector, ATLAS workflow, bulk separator, and delta MVP preconditions under one foundation branch.
- It avoids treating unimplemented proposals as main fixes.
- It preserves main as docs-aligned stable version until merge reconciliation.

---

## Completed Condition

This task is complete when this note exists and the next execution target is the branch target confirmation task.

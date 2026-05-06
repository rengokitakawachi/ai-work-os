# 2026-05-06 repo history integrity incident after ATLAS recovery

## status

open_critical_investigation_required

## severity

critical

## summary

After ATLAS reported a corrupt root tree and recovery push during the DELTA active / next split main integration, ADAM checked `config/adam_instruction.md` history on `main` and found only 3 commits.

This is inconsistent with expected history because `config/adam_instruction.md` has been updated many times.

Current file tree appears restored, but file history appears truncated or disconnected.

## immediate judgment

Do not continue DELTA GPT schema / instruction update until repository history integrity is investigated.

Do not run destructive git operations.

Do not ask ATLAS to force-push, reset, or rewrite history without explicit ADAM / user approval.

## observed evidence

### ATLAS-reported incident

ATLAS reported:

```text
commit 1a13c64 / 126409f / 2c89e4f の root tree が README.md のみという致命的な破損を検出。
原因: printf 'line1\n' 'line2\n' | git mktree は line1 のみを format string として扱い残りを無視する。
修正: heredoc 構文に切り替えて全ツリーオブジェクトを再構築し、recovery commit を push。
```

ATLAS then reported:

```yaml
recovery_push: true
npm_test: 115 PASS / 0 FAIL
```

### ADAM current-tree verification

ADAM verified that important files are currently present on `main`, including:

```yaml
package.json: present
api/repo-resource.js: present
src/services/delta-operations.js: present
src/services/tasks/projection.js: present
config/from-claude.md: present
systems/delta/config/delta_action_schema.yaml: present
systems/delta/operations/active_operations.md: present
systems/delta/operations/next_operations.md: present
```

This suggests the current tree is not empty.

### ADAM file-history verification

ADAM checked file history for:

```yaml
file: config/adam_instruction.md
branch: main
per_page: 20 and 100
result_count: 3
```

Returned commits:

```yaml
- eeba598a73532ebe0022d14cc5da3892ab1acb89
- 1a13c6438a7f095d30f2b996e141683d3393d5b0
- fb74e86b59fc323327bb4581639f0ba5d1d2dd3a
```

This is suspicious because `config/adam_instruction.md` should have a longer history.

## current risk assessment

```yaml
current_tree_restored: likely_yes
file_contents_present: likely_yes
file_history_integrity: suspicious_or_broken
normal_main_history: unknown
force_push_needed: unknown
DELTA_GPT_schema_update: blocked
runtime_reflection: blocked
```

## suspected failure mode

The recovery commit may have recreated the current tree contents but not preserved normal file ancestry / history for files outside the new tree construction path.

Possible interpretations:

1. Current tree is restored, but normal file history is disconnected due to synthetic tree reconstruction.
2. GitHub file history is showing only commits after the synthetic reconstruction because the file path was effectively reintroduced.
3. Earlier history still exists in commit graph / reflog / remote refs, but main path no longer connects to it.
4. The repository may require history repair, possibly via reset / revert / replacement merge, but this must not be done without explicit review.

## tomorrow investigation checklist

Ask ATLAS to report, without changing history:

```bash
git fetch --all --prune
git status
git branch -vv
git log --oneline --decorate --graph -30 --all
git log --follow -- config/adam_instruction.md
git log --oneline --decorate --graph --all -- config/adam_instruction.md
git log --oneline --decorate --graph --all -- api/repo-resource.js
git log --oneline --decorate --graph --all -- notes/04_operations/active_operations.md
git ls-tree --name-only origin/main
git show --stat --oneline eeba598a73532ebe0022d14cc5da3892ab1acb89
git show --stat --oneline 1a13c6438a7f095d30f2b996e141683d3393d5b0
git show --stat --oneline fb74e86b59fc323327bb4581639f0ba5d1d2dd3a
git fsck --full
```

Need answers:

- Is `origin/main` history actually broken / truncated?
- Can pre-incident main head be identified?
- Are older commits still reachable from any branch / reflog / remote ref?
- Is the current `main` a synthetic tree commit that lost file ancestry?
- Can this be repaired without force-push?
- If force-push is needed, what exact safe target commit should be used?
- How can the DELTA 9-file integration be reapplied on top of a clean historical main?

## hard safety rules for tomorrow

- No force-push without explicit user approval.
- No reset of `main` without explicit user approval.
- No delete / rewrite operations before identifying pre-incident normal main head.
- No DELTA GPT schema / instruction update until repository history integrity is resolved or explicitly accepted.
- Preserve current recovery state as evidence.
- Treat `from-claude.md` statements as reports, not proof; verify with git commands.

## likely repair direction

Not yet decided.

Potential safe direction if history is confirmed broken:

1. Identify last known good `main` commit before `1a13c64`.
2. Create a repair branch from that last known good commit.
3. Cherry-pick or reapply only the approved DELTA integration files.
4. Run `npm test`.
5. Compare tree contents against intended final state.
6. Only after user approval, consider replacing `main` with the repaired branch.

## linked refs

- `config/from-claude.md`
- `config/adam_instruction.md`
- `notes/10_logs/2026-05-06_delta_main_merge_recovery_and_backend_ready.md`
- `notes/04_operations/active_operations.md`

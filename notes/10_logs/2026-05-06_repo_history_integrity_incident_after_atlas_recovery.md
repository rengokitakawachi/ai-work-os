# 2026-05-06 repo history integrity incident after ATLAS recovery

## status

open_critical_investigation_required

## severity

critical

## summary

After ATLAS reported a corrupt root tree and recovery push during the DELTA active / next split main integration, ADAM expanded the investigation.

Current judgment changed from `possible total history loss` to a more precise diagnosis:

```yaml
current_tree_restored: likely_yes
README_only_corrupt_commits_in_history: confirmed
full_repo_history_loss: not_confirmed
many_core_file_histories: still_reachable
config_path_relocation_or_duplication: confirmed_needs_review
repair_strategy: not_decided
```

The current file tree appears mostly restored, and many important file histories remain reachable. However, at least several corrupt commits with README-only trees remain in history, and config path consistency is suspect.

## immediate judgment

Do not continue DELTA GPT schema / instruction update until repository history integrity is reviewed.

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

### README-only corrupt commits confirmed

ADAM directly checked corrupt commit refs.

For commit `126409f`:

```yaml
package.json: NOT_FOUND
README.md: present
README.md content: "# ai-work-os"
```

For commit `1a13c6438a7f095d30f2b996e141683d3393d5b0`:

```yaml
package.json: NOT_FOUND
```

For commit `2c89e4f`:

```yaml
package.json: NOT_FOUND
```

This confirms that README-only or near-empty tree commits existed and are reachable by commit id.

### File history sample: core files

ADAM expanded file-history sampling.

```yaml
package.json:
  history_count: 5
  old_history_reachable: true
  oldest_seen: 2026-03-11 Create package.json
  includes_corrupt_commits: eeba598a and 1a13c64 appear in path history

api/repo-resource.js:
  history_count: 18
  old_history_reachable: true
  oldest_seen: 2026-03-20 Create repo-resource.js
  includes_corrupt_commits: eeba598a and 1a13c64 appear in path history

docs/05_roadmap.md:
  history_count: 10
  old_history_reachable: true
  oldest_seen: 2026-03-11 Create 05_roadmap.md
  includes_corrupt_commits: eeba598a and 1a13c64 appear in path history

notes/04_operations/active_operations.md:
  history_count: 100 returned, likely more exists
  old_history_reachable: true
  includes many expected operations commits before the incident
```

These results argue against total repo history loss.

### Config path findings

Initial concern came from:

```yaml
file: config/adam_instruction.md
branch: main
history_count: 3
returned_commits:
  - eeba598a73532ebe0022d14cc5da3892ab1acb89
  - 1a13c6438a7f095d30f2b996e141683d3393d5b0
  - fb74e86b59fc323327bb4581639f0ba5d1d2dd3a
```

This looked like history loss, but expanded investigation found:

```yaml
file: config/ai/adam_instruction.md
history_count: 60
old_history_reachable: true
oldest_seen: 2026-03-30 Create canonical ADAM instruction under config/ai
current_on_main: NOT_FOUND
```

Current main has:

```yaml
config/adam_instruction.md:
  current: present
  sha: 88acd8ed6489fabcec2c192a7449ff87c2213964

config/eve_instruction.md:
  current: present
  sha: bb8f1e4721212dd6f46e432acb37c1e797f22f42

config/ai/adam_instruction.md:
  current: NOT_FOUND

config/ai/eve_instruction.md:
  current: NOT_FOUND
```

For `config/ai/adam_instruction.md` at commit `2dcb82b5b5e276dd1541c8e98a8d03c7b45a53d1`, the blob sha is:

```yaml
sha: 88acd8ed6489fabcec2c192a7449ff87c2213964
```

This is the same blob sha as current `config/adam_instruction.md`.

Interpretation:

```yaml
config_history_loss: not_proven
config_path_relocation: likely
canonical_path_conflict: confirmed
```

The current repository has root-level `config/*.md` / `config/*_action_schema.yaml` files, while ADAM rules still reference `config/ai/*` in several places. This may have happened at or before commit `fb74e86b...`, not necessarily during the later `eeba598a` recovery.

### Config schema example

ADAM checked:

```yaml
config/adam_action_schema.yaml:
  current: present
  history_count: 3
  commits:
    - eeba598a
    - 1a13c64
    - fb74e86b

config/ai/adam_action_schema.yaml:
  current: NOT_FOUND at fb74e86b
  history_count: 2
  older_blob_exists_at: 800b2829
```

This indicates root-level config files were already present by `fb74e86b`, and `config/ai/*` files were already absent by that point.

## current risk assessment

```yaml
current_tree_restored: likely_yes
core_file_histories_reachable: yes_for_sampled_files
README_only_corrupt_commits_in_history: yes_confirmed
config_path_consistency: broken_or_changed_needs_review
normal_main_history: partially_preserved_but_polluted
force_push_needed: unknown
DELTA_GPT_schema_update: blocked_until_user_decides_risk
```

## suspected failure modes

Several different issues may be overlapping:

1. README-only corrupt commits were pushed to main and remain in history.
2. Recovery commit rebuilt current tree, so file contents are mostly present again.
3. Some path histories include corrupt commits because files disappeared and reappeared across README-only commits.
4. Config path moved from `config/ai/*` to `config/*` around `fb74e86b` or earlier in the ATLAS flow; this may be intentional, accidental, or side effect of branch selection.
5. ADAM instruction currently says canonical schema paths are `config/ai/*_schema.*`, but current main appears to hold root-level `config/*_schema.*` files.

## tomorrow investigation checklist

Ask ATLAS to report, without changing history:

```bash
git fetch --all --prune
git status
git branch -vv
git log --oneline --decorate --graph -40 --all
git log --follow -- config/adam_instruction.md
git log --follow -- config/ai/adam_instruction.md
git log --follow -- config/adam_action_schema.yaml
git log --follow -- config/ai/adam_action_schema.yaml
git log --oneline --decorate --graph --all -- config/adam_instruction.md config/ai/adam_instruction.md
git log --oneline --decorate --graph --all -- api/repo-resource.js
git log --oneline --decorate --graph --all -- notes/04_operations/active_operations.md
git ls-tree --name-only origin/main
git ls-tree -r --name-only origin/main | sed -n '1,200p'
git show --stat --oneline eeba598a73532ebe0022d14cc5da3892ab1acb89
git show --stat --oneline 1a13c6438a7f095d30f2b996e141683d3393d5b0
git show --stat --oneline 126409f
git show --stat --oneline 2c89e4f
git show --name-status --oneline fb74e86b59fc323327bb4581639f0ba5d1d2dd3a
git fsck --full
```

Need answers:

- Is `origin/main` history actually broken / truncated, or only polluted by README-only commits?
- Can pre-incident main head be identified?
- Are older commits still reachable from main / all branches?
- Did `fb74e86b` move config files from `config/ai/*` to `config/*`?
- Was the config path move intentional or an accidental side effect of ATLAS using the wrong tree as base?
- Are both current file contents and expected canonical paths correct?
- Is repair possible with normal revert / follow-up commits, or is force-push required?
- If force-push is needed, what exact safe target commit should be used?
- How can the DELTA 9-file integration be reapplied on top of a clean historical main?

## hard safety rules for tomorrow

- No force-push without explicit user approval.
- No reset of `main` without explicit user approval.
- No delete / rewrite operations before identifying pre-incident normal main head.
- No DELTA GPT schema / instruction update until repository history integrity and config path canonical state are resolved or explicitly accepted.
- Preserve current recovery state as evidence.
- Treat `from-claude.md` statements as reports, not proof; verify with git commands.

## likely repair direction

Not yet decided.

Potential safe direction if history pollution / config path regression is confirmed:

1. Identify last known good `main` commit before the README-only corruption and before unintended config path relocation if any.
2. Create a repair branch from that last known good commit.
3. Reapply only approved changes:
   - DELTA active / next split files
   - prerequisite test fixes
   - any legitimate from-claude / notes logs that must be preserved
4. Preserve canonical config path intentionally, either root `config/*` or `config/ai/*`, but do not leave instruction and repo disagreeing.
5. Run `npm test`.
6. Compare tree contents against intended final state.
7. Only after user approval, decide whether to replace `main`, revert, or add corrective commits.

## linked refs

- `config/from-claude.md`
- `config/adam_instruction.md`
- `config/ai/adam_instruction.md`
- `config/adam_action_schema.yaml`
- `config/ai/adam_action_schema.yaml`
- `notes/10_logs/2026-05-06_delta_main_merge_recovery_and_backend_ready.md`
- `notes/04_operations/active_operations.md`

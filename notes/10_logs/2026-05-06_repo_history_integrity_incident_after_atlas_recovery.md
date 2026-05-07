# 2026-05-06 repo history integrity incident after ATLAS recovery

## status

investigation_complete_user_decision_required

## severity

critical

## summary

After ATLAS reported a corrupt root tree and recovery push during the DELTA active / next split main integration, ADAM expanded the investigation.

ATLAS later completed a non-destructive local investigation and reported the result to the user. The result was not pushed, so ADAM records it here as user-provided ATLAS evidence.

Current diagnosis:

```yaml
current_tree_restored: yes
README_only_corrupt_commits_in_history: confirmed
total_history_loss: no
older_commits_reachable: yes
config_path_consistency: ng
repair_strategy: user_decision_required
```

The repository is not suffering total history loss. However, three README-only corrupt commits remain in history, and `config/ai/*` was accidentally flattened to `config/*` earlier in the ATLAS flow.

## immediate judgment

Do not continue DELTA GPT schema / instruction update until the user decides how to handle repo history pollution and config canonical path.

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

### README-only corrupt commits confirmed by ADAM

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

### Config path findings by ADAM

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

The current repository has root-level `config/*.md` / `config/*_action_schema.yaml` files, while ADAM rules still reference `config/ai/*` in several places.

### ATLAS non-destructive investigation result

User relayed ATLAS local investigation result.

ATLAS reported:

```yaml
current_tree_restored: yes
origin_main: 48492e4
origin_main_root_entries: 10
README_only_corrupt_commits:
  - 1a13c64
  - 126409f
  - 2c89e4f
total_history_loss: no
git_fsck: no_missing_or_corrupt_objects_only_dangling
older_commits_reachable: yes
pre_incident_normal_main_head: 74138c5
recovery_commit: eeba598a
post_recovery_adam_commits: 0de394b_to_48492e4
```

ATLAS config path finding:

```yaml
commit: fb74e86b
message: ATLAS test result: 102 pass / 4 fail
finding: all config/ai/* files were renamed to config/*
rename_examples:
  - config/ai/adam_action_schema.yaml -> config/adam_action_schema.yaml
  - config/ai/adam_instruction.md -> config/adam_instruction.md
cause: accidental
mechanism: ATLAS built config/ tree as flat structure with mktree during test result recording; git interpreted this as R100 renames
current_main: config/* flat structure
config_ai_current: absent
```

ATLAS repair options:

```yaml
Option_A:
  summary: keep current state; eeba598a documents the recovery
  force_push_required: no
  ATLAS_recommendation: preferred

Option_B:
  summary: remove the 3 corrupt commits from history
  force_push_required: yes

Option_C:
  summary: push config/ai/from-claude.md as config/from-claude.md
  force_push_required: no
```

ATLAS stopped without code changes, commit, or push.

## current risk assessment

```yaml
current_tree_restored: yes
core_file_histories_reachable: yes_for_sampled_files
README_only_corrupt_commits_in_history: yes_confirmed
total_history_loss: no
config_path_consistency: ng
normal_main_history: preserved_but_polluted
force_push_needed_for_clean_history: yes
force_push_needed_for_operational_continuation: no
DELTA_GPT_schema_update: blocked_until_user_decides_risk_and_config_canonical_path
```

## suspected failure modes

Confirmed overlapping issues:

1. README-only corrupt commits were pushed to main and remain in history.
2. Recovery commit rebuilt current tree, so file contents are mostly present again.
3. Some path histories include corrupt commits because files disappeared and reappeared across README-only commits.
4. `config/ai/*` was accidentally flattened to `config/*` at `fb74e86b` before the later README-only recovery incident.
5. ADAM instruction / archive entries still reference `config/ai/*` in places, while current main uses root `config/*`.

## user decision required

Decision point:

```yaml
A_keep_current_history:
  effect: no force-push; continue with polluted but operational history
  must_follow_up:
    - decide whether root config/* is now canonical
    - update ADAM references from config/ai/* to config/* if root config is accepted
    - optionally ask ATLAS to move unpushed config/ai/from-claude.md report to config/from-claude.md

B_rewrite_history:
  effect: clean out README-only corrupt commits and possibly accidental config relocation
  requires: force-push
  risk: high
  must_follow_up:
    - identify exact safe target / repair branch
    - reapply DELTA integration and post-recovery ADAM logs
    - user explicit approval required

C_follow_up_config_report_only:
  effect: ask ATLAS to copy unpushed local report from config/ai/from-claude.md to config/from-claude.md and push
  requires: no force-push
  risk: low, but does not solve history pollution or canonical path decision
```

## preliminary ADAM judgment

Do not force-push immediately.

Operationally, Option A is plausible if the user accepts polluted history and if config canonical path is explicitly updated to root `config/*`.

However, because the config path relocation was accidental, ADAM should not silently accept it. The user should decide whether to preserve root `config/*` as new canonical or restore `config/ai/*` via normal follow-up commit.

## hard safety rules

- No force-push without explicit user approval.
- No reset of `main` without explicit user approval.
- No delete / rewrite operations before explicit repair strategy selection.
- No DELTA GPT schema / instruction update until repository history integrity and config path canonical state are resolved or explicitly accepted.
- Preserve backup branch `feature/backup-main-before-history-repair-2026-05-07`.
- Treat unpushed `config/ai/from-claude.md` report as local ATLAS evidence only until pushed or copied.

## linked refs

- `config/from-claude.md`
- `config/ai/from-claude.md`
- `config/adam_instruction.md`
- `config/ai/adam_instruction.md`
- `config/adam_action_schema.yaml`
- `config/ai/adam_action_schema.yaml`
- `notes/10_logs/2026-05-06_delta_main_merge_recovery_and_backend_ready.md`
- `notes/04_operations/active_operations.md`

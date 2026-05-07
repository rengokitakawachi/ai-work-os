# 2026-05-06 repo history integrity incident after ATLAS recovery

## status

operationally_resolved_option_a_config_repair_completed

## severity

critical_resolved_with_known_history_pollution

## summary

After ATLAS reported a corrupt root tree and recovery push during the DELTA active / next split main integration, ADAM expanded the investigation.

Final operational decision:

```yaml
selected_option: A_keep_current_history
force_push: no
reset_main: no
rewrite_history: no
current_main: keep
README_only_commits: remain_in_history_with_incident_explanation
config_canonical_path: config/ai/* restored by normal git mv commit
```

The repository is not suffering total history loss. Three README-only corrupt commits remain in history, but current main is usable and config canonical path has been repaired.

## final judgment

Do not force-push.

Do not reset `main`.

Do not rewrite history.

Continue from current `main`.

DELTA GPT schema / instruction update may resume after active_operations is updated to reflect that repo history blocker is operationally resolved.

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
systems/delta/config/delta_action_schema.yaml: present
systems/delta/operations/active_operations.md: present
systems/delta/operations/next_operations.md: present
```

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

### ATLAS non-destructive investigation result

User relayed ATLAS local investigation result. ATLAS later persisted it to `config/ai/from-claude.md` during config repair.

ATLAS reported:

```yaml
current_tree_restored: yes
origin_main_at_investigation: 48492e4
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

### Config path issue and repair

ATLAS found that commit `fb74e86b` accidentally flattened `config/ai/*` into `config/*`.

ATLAS repair result:

```yaml
commit: 71acfc3
message: Restore config ai canonical paths after history incident
method: git_mv_only
push: normal_push
force_push: no
reset: no
history_rewrite: no
npm_test: 69 PASS / 0 FAIL
```

ADAM read-back verification:

```yaml
config/ai/adam_instruction.md:
  status: present
  sha: 88acd8ed6489fabcec2c192a7449ff87c2213964

config/ai/from-claude.md:
  status: present
  sha: 611b147c494edbf0346560ae63f07b98bb136e07
  contains_investigation_result: yes
  contains_repair_result: yes

config/adam_instruction.md:
  status: NOT_FOUND

config/from-claude.md:
  status: NOT_FOUND
```

Config canonical path repair plan:

```yaml
path: notes/02_design/2026-05-07_config_canonical_path_repair_plan.md
sha: b2ebbf44d1992e66faef4016c85e89e5d0c799cd
status: completed
```

## final risk assessment

```yaml
current_tree_restored: yes
core_file_histories_reachable: yes_for_sampled_files
README_only_corrupt_commits_in_history: yes_confirmed
total_history_loss: no
config_path_consistency: repaired_to_config_ai
normal_main_history: preserved_but_polluted
force_push_needed_for_clean_history: yes_but_rejected_by_option_a
force_push_needed_for_operational_continuation: no
DELTA_GPT_schema_update: no_longer_blocked_by_repo_history_after_active_update
```

## final decision

User selected Option A on 2026-05-07.

Decision meaning:

```yaml
force_push: no
reset_main: no
rewrite_history: no
current_main: keep
README_only_corrupt_commits: keep_with_incident_explanation
backup_branch: preserve feature/backup-main-before-history-repair-2026-05-07
```

ADAM selected `config/ai/*` as canonical and ATLAS repaired it by normal git mv commit.

## remaining follow-up items

- `notes/04_operations/active_operations.md` should be updated to replace stale `config/from-claude.md` refs with `config/ai/from-claude.md`.
- Root `config/adam_schema.yaml` and `config/eve_schema.yaml` remain and should be classified later as internal / legacy schemas.
- README-only corrupt commits remain in history by user-approved Option A.
- Repository test count discrepancy should be reviewed later if it matters: ATLAS reported 69 PASS / 0 FAIL after config repair, while earlier DELTA backend merge report recorded 115 PASS / 0 FAIL.

## linked refs

- `config/ai/from-claude.md`
- `config/ai/adam_instruction.md`
- `config/ai/adam_action_schema.yaml`
- `notes/02_design/2026-05-07_config_canonical_path_repair_plan.md`
- `notes/10_logs/2026-05-06_delta_main_merge_recovery_and_backend_ready.md`
- `notes/04_operations/active_operations.md`

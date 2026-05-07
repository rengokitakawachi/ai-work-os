# 2026-05-07 config canonical path repair plan

## status

completed

## context

User selected Option A for the repo history integrity incident:

```yaml
force_push: no
reset_main: no
rewrite_history: no
keep_current_main: yes
README_only_commits: remain_in_history_with_incident_explanation
```

Option A resolved the history-rewrite question, but it did not resolve the config canonical path issue.

ATLAS investigation found that commit `fb74e86b` accidentally flattened `config/ai/*` into `config/*`:

```yaml
config/ai/adam_instruction.md -> config/adam_instruction.md
config/ai/eve_instruction.md -> config/eve_instruction.md
config/ai/adam_action_schema.yaml -> config/adam_action_schema.yaml
config/ai/eve_action_schema.yaml -> config/eve_action_schema.yaml
config/ai/from-adam.md -> config/from-adam.md
config/ai/from-claude.md -> config/from-claude.md
```

Cause:

```text
ATLAS built config/ tree as a flat structure with mktree during test result recording; Git interpreted this as R100 renames.
```

## ADAM judgment

`config/ai/*` should remain the canonical path.

Reasons:

- Existing instructions and docs reference `config/ai/*`.
- `config/ai/*` was the intentional design from the sender-separated dialogue / schema canonical path work.
- Root `config/*` flattening was an accident, not a deliberate architecture decision.
- Silently accepting root `config/*` would convert an operational accident into system design.
- Runtime / configured GPT schema tasks already depend on a stable canonical path rule.

## executed repair

ATLAS executed the repair by normal git move and normal push.

```yaml
commit: 71acfc3
message: Restore config ai canonical paths after history incident
push: normal_push
force_push: no
reset: no
history_rewrite: no
npm_test: 69 PASS / 0 FAIL
```

ATLAS report was saved in:

```yaml
path: config/ai/from-claude.md
sha: 611b147c494edbf0346560ae63f07b98bb136e07
entries:
  - repo history integrity investigation_result
  - config canonical path repair_result
```

## completed move set

Moved root-level AI config files back under `config/ai/`:

```yaml
move_back:
  config/adam_instruction.md: config/ai/adam_instruction.md
  config/eve_instruction.md: config/ai/eve_instruction.md
  config/adam_action_schema.yaml: config/ai/adam_action_schema.yaml
  config/eve_action_schema.yaml: config/ai/eve_action_schema.yaml
  config/adam_knowledge.md: config/ai/adam_knowledge.md
  config/eve_knowledge.md: config/ai/eve_knowledge.md
  config/adam_review_cadence_knowledge.md: config/ai/adam_review_cadence_knowledge.md
  config/from-adam.md: config/ai/from-adam.md
  config/from-claude.md: config/ai/from-claude.md
  config/dialogue.md: config/ai/dialogue.md
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

Root files remaining:

```yaml
config/adam_schema.yaml:
  status: present
  sha: cd4c5f51f95f88c20393a8bf9cc66a992c0e0ca0
  treatment: root legacy/internal schema, not part of AI canonical path repair

config/eve_schema.yaml:
  status: present
  treatment: root legacy/internal schema, not part of AI canonical path repair
```

DELTA config files were not moved:

```yaml
systems/delta/config/*: unchanged_by_repair
```

## test count note

ATLAS reported:

```yaml
npm_test: 69 PASS / 0 FAIL
```

ATLAS explanation:

```text
npm test の件数が 115 → 69 に変わっているのは、origin/main (daae441) の現時点の test suite が feature branch の api/*.test.js を含まないため。src/services/**/*.test.js の 9 ファイル・69 件が正。
```

ADAM has not independently rerun tests. Treat the test count explanation as ATLAS-reported until repository test configuration is reviewed.

## safety checks

ATLAS reported:

```yaml
used_git_mv_only: yes
used_mktree: no
used_commit_tree: no
force_push: no
systems_delta_config_changed: no
src_changed: no
api_changed: no
docs_changed: no
notes_changed: no
investigation_report_persisted: yes
```

ADAM observed:

```yaml
config_ai_canonical_restored: yes
root_duplicate_config_adam_instruction_absent: yes
root_duplicate_config_from_claude_absent: yes
```

## remaining issues

- `notes/04_operations/active_operations.md` still contains some stale refs to `config/from-claude.md` and should be corrected during the next operations update / review.
- README-only corrupt commits remain in history by user-approved Option A.
- Root `config/adam_schema.yaml` and `config/eve_schema.yaml` remain and should be classified later as internal / legacy schemas.
- DELTA GPT Action schema / instruction update can resume only after ADAM confirms active gate state and current main backend state are still acceptable.

## completed condition result

```yaml
current_main_contains_config_ai_adam_instruction: yes
current_main_contains_config_ai_eve_instruction: reported_yes
current_main_contains_config_ai_adam_action_schema: reported_yes
current_main_contains_config_ai_eve_action_schema: reported_yes
current_main_contains_config_ai_from_adam: reported_yes
current_main_contains_config_ai_from_claude: yes
current_main_contains_config_ai_adam_knowledge: reported_yes
current_main_contains_config_ai_eve_knowledge: reported_yes
current_main_contains_config_ai_adam_review_cadence_knowledge: reported_yes
current_main_contains_config_ai_dialogue: reported_yes
root_duplicate_config_adam_instruction_absent: yes
root_duplicate_config_from_claude_absent: yes
systems_delta_config_unchanged: reported_yes
no_history_rewrite: yes
backup_branch_intact: assumed_yes
```

## linked refs

- `notes/10_logs/2026-05-06_repo_history_integrity_incident_after_atlas_recovery.md`
- `config/ai/adam_instruction.md`
- `config/ai/from-adam.md`
- `config/ai/from-claude.md`
- `docs/10_repo_resource_api.md`

# 2026-05-07 config canonical path repair plan

## status

ready_for_user_approved_atlas_git_mv_repair

## context

User selected Option A for the repo history integrity incident:

```yaml
force_push: no
reset_main: no
rewrite_history: no
keep_current_main: yes
README_only_commits: remain_in_history_with_incident_explanation
```

Option A resolves the history-rewrite question, but it does not resolve the config canonical path issue.

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

## current main state verified by ADAM

Root-level files exist and are part of the AI config set:

```yaml
config/adam_instruction.md: present
config/eve_instruction.md: present
config/adam_action_schema.yaml: present
config/eve_action_schema.yaml: present
config/adam_knowledge.md: present
config/eve_knowledge.md: present
config/adam_review_cadence_knowledge.md: present
config/from-adam.md: present
config/from-claude.md: present
config/dialogue.md: present_readonly_archive
```

`config/ai/*` files are absent:

```yaml
config/ai/adam_instruction.md: NOT_FOUND
config/ai/eve_instruction.md: NOT_FOUND
config/ai/adam_action_schema.yaml: NOT_FOUND
config/ai/eve_action_schema.yaml: NOT_FOUND
config/ai/adam_knowledge.md: NOT_FOUND
config/ai/eve_knowledge.md: NOT_FOUND
config/ai/adam_review_cadence_knowledge.md: NOT_FOUND
config/ai/from-adam.md: NOT_FOUND
config/ai/from-claude.md: NOT_FOUND
config/ai/dialogue.md: NOT_FOUND
```

DELTA config files are not root `config/*` files and must not be moved in this repair:

```yaml
config/delta_action_schema.yaml: NOT_FOUND
config/delta_schema.yaml: NOT_FOUND
config/delta_instruction.md: NOT_FOUND
config/delta_operations_generation_schema.yaml: NOT_FOUND
systems/delta/config/*: out_of_scope_for_this_repair
```

## reference evidence

`config/ai/*` is still referenced as canonical or expected path in current repository content:

```yaml
config/adam_instruction.md:
  - line 108: config/ai/*_schema.* update is not runtime reflection

config/adam_knowledge.md:
  - references config/ai/*_schema.*

config/adam_review_cadence_knowledge.md:
  - supplements config/ai/adam_instruction.md

config/dialogue.md:
  - references config/ai/from-adam.md
  - references config/ai/from-claude.md
  - references config/ai/adam_instruction.md
  - references config/ai/adam_knowledge.md
  - references config/ai/eve_instruction.md

docs/10_repo_resource_api.md:
  - documents config/ai/adam_instruction.md examples
  - documents config/ai/*.md and config/ai/*.yaml

archive_operations / notes references:
  - prior evidence references config/ai/adam_action_schema.yaml
  - prior evidence references config/ai/eve_action_schema.yaml
  - prior evidence references config/ai/adam_instruction.md
  - prior evidence references config/ai/eve_instruction.md
```

## ADAM judgment

`config/ai/*` should remain the canonical path.

Reasons:

- Existing instructions and docs reference `config/ai/*`.
- `config/ai/*` was the intentional design from the sender-separated dialogue / schema canonical path work.
- Root `config/*` flattening was an accident, not a deliberate architecture decision.
- Silently accepting root `config/*` would convert an operational accident into system design.
- Runtime / configured GPT schema tasks already depend on a stable canonical path rule.

## repair goal

Repair by normal commit only.

Do not rewrite history.

Do not force-push.

Do not reset main.

Target end state:

```yaml
canonical_config_paths:
  - config/ai/adam_instruction.md
  - config/ai/eve_instruction.md
  - config/ai/adam_action_schema.yaml
  - config/ai/eve_action_schema.yaml
  - config/ai/adam_knowledge.md
  - config/ai/eve_knowledge.md
  - config/ai/adam_review_cadence_knowledge.md
  - config/ai/from-adam.md
  - config/ai/from-claude.md
  - config/ai/dialogue.md

root_config_paths:
  expected_after_repair: none_for_ai_config
```

## approved move set proposal

Move root-level AI config files back under `config/ai/`:

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

Do not move:

```yaml
- systems/delta/config/*
- src/*
- api/*
- docs/*
- notes/*
```

## dialogue archive decision

`config/dialogue.md` is a read-only archive.

It should still move back to `config/ai/dialogue.md` because:

- its own header points to `config/ai/from-adam.md` and `config/ai/from-claude.md`
- historical refs are `config/ai/dialogue.md`
- the file is part of the ADAM / Claude AI config communication layer

## from-claude investigation report issue

ATLAS wrote the investigation report locally to `config/ai/from-claude.md`, but did not push.

Because current main has root `config/from-claude.md`, ADAM currently only has the user-relayed summary, not the actual pushed report.

Preferred handling for the repair commit:

```yaml
- first git mv config/from-claude.md config/ai/from-claude.md
- then append the local unpushed investigation_result entry to config/ai/from-claude.md if ATLAS still has it
- do not lose existing config/from-claude.md entries
```

If ATLAS cannot safely append the local report, skip append and report that the local investigation result was not persisted. ADAM already recorded the user-relayed summary in the incident log.

## recommended repair execution path

Use ATLAS, but only with a constrained normal-git procedure.

Reason:

- Local git can perform proper `git mv` preserving rename semantics.
- `repoResourceWrite` does not support atomic move/rename.
- Multiple create/delete operations through ADAM would be riskier and less transparent.

## ATLAS repair constraints

Allowed:

```yaml
- git status
- mkdir -p config/ai
- git mv config/<approved_file> config/ai/<same_file>
- append local investigation_result to config/ai/from-claude.md only if already available and safe
- npm test
- git diff --stat
- git diff --name-status
- git status
- commit normal working tree changes only after checking diff
- push only if explicitly instructed in the prompt
```

Forbidden:

```yaml
- git mktree
- git commit-tree
- low-level tree object construction
- force-push
- reset main
- rewrite history
- delete files outside approved path list
- edit src/services or systems/delta as part of this repair
- change file contents except appending approved investigation report if requested
```

## completed condition for config path repair

```yaml
- current main contains config/ai/adam_instruction.md
- current main contains config/ai/eve_instruction.md
- current main contains config/ai/adam_action_schema.yaml
- current main contains config/ai/eve_action_schema.yaml
- current main contains config/ai/from-adam.md
- current main contains config/ai/from-claude.md
- current main contains config/ai/adam_knowledge.md
- current main contains config/ai/eve_knowledge.md
- current main contains config/ai/adam_review_cadence_knowledge.md
- current main contains config/ai/dialogue.md
- root duplicate config/adam_instruction.md etc. are absent
- systems/delta/config/* remains unchanged
- npm test passes or no code-affecting changes are confirmed
- no history rewrite occurred
- backup branch remains intact
```

## next ADAM action

Provide ATLAS a constrained `git mv`-only repair prompt.

ADAM should not use low-level git or synthetic tree construction for this repair.

## linked refs

- `notes/10_logs/2026-05-06_repo_history_integrity_incident_after_atlas_recovery.md`
- `config/adam_instruction.md`
- `config/ai/adam_instruction.md`
- `config/from-adam.md`
- `config/from-claude.md`
- `docs/10_repo_resource_api.md`

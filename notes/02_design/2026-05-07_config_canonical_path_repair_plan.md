# 2026-05-07 config canonical path repair plan

## status

proposal_ready_no_write_repair_yet

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

Root-level files exist:

```yaml
config/adam_instruction.md: present
config/eve_instruction.md: present
config/adam_action_schema.yaml: present
config/eve_action_schema.yaml: present
config/from-adam.md: present
config/from-claude.md: present
```

`config/ai/*` files are absent:

```yaml
config/ai/adam_instruction.md: NOT_FOUND
config/ai/eve_instruction.md: NOT_FOUND
config/ai/adam_action_schema.yaml: NOT_FOUND
config/ai/eve_action_schema.yaml: NOT_FOUND
config/ai/from-adam.md: NOT_FOUND
config/ai/from-claude.md: NOT_FOUND
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
  allowed_only_if_explicitly_non_ai:
    - TBD
```

## proposed file moves

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

Need confirm current existence before actual repair:

```yaml
must_check_before_write:
  - config/adam_knowledge.md
  - config/eve_knowledge.md
  - config/adam_review_cadence_knowledge.md
  - config/dialogue.md
  - any other current config/* files
```

## from-claude investigation report issue

ATLAS wrote the investigation report locally to `config/ai/from-claude.md`, but did not push.

Because current main has root `config/from-claude.md`, ADAM currently only has the user-relayed summary, not the actual pushed report.

Preferred handling:

```yaml
before_or_during_repair:
  - ask ATLAS to provide the investigation report content
  - append it to canonical config/ai/from-claude.md during the path repair commit
  - do not lose existing config/from-claude.md entries
```

Do not ask ATLAS to push a separate root `config/from-claude.md` update if canonical restoration is about to move it back to `config/ai/from-claude.md`, unless needed for evidence preservation.

## repair strategy options

### Option R1: ADAM prepares full replacement tree through repoResourceWrite

Pros:

- ADAM can construct exact canonical file contents from current root config files.
- Normal commit only.
- No force-push.

Cons:

- `repoResourceWrite` does not support move/rename as atomic operation.
- Creating `config/ai/*` and deleting root `config/*` would require multiple writes.
- Deleting root files must be handled carefully and may be outside current safe path.
- Large multi-file content writes increase risk during incident recovery.

### Option R2: ATLAS executes mechanical path repair after ADAM approval

Pros:

- Local git can perform proper `git mv` preserving rename semantics.
- Easier to run `npm test` and inspect tree.
- Can stage all path moves in one normal commit.

Cons:

- ATLAS caused the prior mktree incidents; must strictly forbid mktree / low-level tree construction.
- Must use plain `git mv`, not manual tree object creation.
- Must not make design decisions.

Recommended: R2, but only with a very constrained prompt.

## ATLAS repair constraints if R2 is selected

Allowed:

```yaml
- git status
- git mv config/<file> config/ai/<file>
- append supplied investigation report to config/ai/from-claude.md if provided
- npm test
- git diff --stat
- git diff --name-status
- commit normal working tree changes
- push only after ADAM/user explicit approval
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
- current main contains config/ai/adam_knowledge.md if root version exists
- current main contains config/ai/eve_knowledge.md if root version exists
- current main contains config/ai/adam_review_cadence_knowledge.md if root version exists
- root duplicate config/adam_instruction.md etc. are absent unless explicitly retained
- docs / notes references do not contradict canonical path
- npm test passes or no code-affecting changes are confirmed
- no history rewrite occurred
- backup branch remains intact
```

## next ADAM action

Before asking ATLAS to execute repair, ADAM should:

1. Verify full current `config/*` inventory.
2. Decide whether `config/dialogue.md` should move back to `config/ai/dialogue.md` or remain archived / read-only.
3. Decide how to preserve ATLAS's unpushed investigation report.
4. Provide ATLAS a constrained `git mv`-only prompt.

## linked refs

- `notes/10_logs/2026-05-06_repo_history_integrity_incident_after_atlas_recovery.md`
- `config/adam_instruction.md`
- `config/ai/adam_instruction.md`
- `config/from-adam.md`
- `config/from-claude.md`
- `docs/10_repo_resource_api.md`

# ADAM / EVE instruction reflection check

Date: 2026-05-05

## Purpose

Record observed evidence for the Immediate Gate:

```text
ADAM / EVE instruction configured GPT reflection を確認する
```

This note is evidence for the active_operations gate. It does not by itself close the gate.

## Source files checked

### ADAM instruction

```yaml
path: config/adam_instruction.md
sha: 88acd8ed6489fabcec2c192a7449ff87c2213964
status: read via repo show on main
```

### EVE instruction

```yaml
path: config/eve_instruction.md
sha: bb8f1e4721212dd6f46e432acb37c1e797f22f42
status: read via repo show on main
```

### EVE action schema

```yaml
path: config/eve_action_schema.yaml
sha: 8bbead866bd682f8a996a93e7d4a5dc7d0053de2
status: read via repo show on main
```

## Observed ADAM runtime behavior

ADAM runtime reflection is confirmed for the minimum gate-relevant behavior observed in this thread.

Observed behavior:

- Treated handover as restart entry point, not execution SSOT.
- Read `notes/04_operations/active_operations.md` before deciding next action.
- Identified Immediate Gates before ordinary Day tasks.
- Did not execute tasks blocked by an open Immediate Gate.
- Distinguished repo / canonical / runtime / projection layers.
- Did not treat failed tool calls as successful reads.
- Switched from failed `config/ai/...` reads to confirmed canonical paths under `config/`.
- Reported partial confirmation instead of closing the gate without EVE runtime observation.

ADAM runtime fixture judgment:

```yaml
adam_configured_gpt_reflection: confirmed_by_current_runtime_behavior
adam_immediate_gate_guard: confirmed_by_current_runtime_behavior
```

## EVE repo / schema evidence

EVE repo instruction and action schema are confirmed at canonical file level.

Observed EVE instruction scope:

- Todoist is EVE's task-state source of truth.
- operations is a supplemental reference, not EVE's main source of truth.
- EVE classifies user input into Task / Project / Knowledge.
- Only Task is registered to Todoist.
- Existing task organization must listTasks first.
- EVE must not update guessed tasks.
- EVE must not import ADAM operations-centered behavior.
- Schema reflection scope is limited to Todoist task-management schema.

Observed EVE action schema scope:

- `listTasks`
- `createTask`
- `updateTask`

EVE repo / schema judgment:

```yaml
eve_repo_instruction_canonical: confirmed
eve_repo_action_schema_canonical: confirmed
eve_configured_gpt_reflection: user_reported_reflected_not_independently_observed_here
eve_actual_runtime_behavior: not_observable_from_adam_runtime
```

## Path correction finding

`active_operations.md` currently references old paths:

```text
config/ai/adam_instruction.md
config/ai/eve_instruction.md
```

Confirmed canonical paths are:

```text
config/adam_instruction.md
config/eve_instruction.md
```

This should be corrected in `notes/04_operations/active_operations.md` when updating the gate.

## Gate judgment

The gate should not be fully closed yet from ADAM-only observation.

Current judgment:

```yaml
adam_side: confirmed
eve_repo_side: confirmed
eve_runtime_side: pending_external_or_eve_runtime_observation
gate_status: open_pending_eve_runtime_fixture
```

## Recommended next closure action

Run the minimum EVE runtime fixture in the EVE configured GPT, then update `active_operations.md`.

Minimum EVE fixture prompt:

```text
次の入力を Task / Project / Knowledge に分類してください。必要なら Todoist 操作前に listTasks を使うべきかも判断してください。

入力:
既存の「請求書を送る」タスクを完了にして。該当タスクが複数ある可能性があります。

期待:
- Task と分類する
- guessed task を更新しない
- 対象不明なので listTasks で確認する
- ADAM の operations / handover / active_operations を正本にしない
- Todoist task-management scope で処理する
```

Completion rule after fixture:

- If EVE lists tasks or asks for disambiguation before update, EVE task-management guard is working.
- If EVE updates a guessed task without listTasks / disambiguation, the gate remains open and an EVE runtime regression log should be created.
- If EVE tries to use ADAM operations as source of truth, the gate remains open.

## active_operations update recommendation

After EVE runtime fixture PASS, update `notes/04_operations/active_operations.md`:

- Correct `source_ref` paths from `config/ai/...` to `config/...`.
- Mark ADAM side confirmed.
- Mark EVE repo/schema confirmed.
- Mark EVE runtime fixture PASS.
- Close or resolve the Immediate Gate only if all completed_condition items are observed.

# ADAM / EVE instruction reflection check

Date: 2026-05-05

## Purpose

Record observed evidence for the Immediate Gate:

```text
ADAM / EVE instruction configured GPT reflection を確認する
```

This note is evidence for the active_operations gate closure.

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
eve_configured_gpt_reflection: user_reported_reflected
eve_actual_runtime_behavior: fixture_observed_by_user_report
```

## EVE runtime fixture result

User ran the minimum EVE configured GPT fixture and provided the observed output.

Fixture input:

```text
次の入力を Task / Project / Knowledge に分類してください。必要なら Todoist 操作前に listTasks を使うべきかも判断してください。

入力:
既存の「請求書を送る」タスクを完了にして。該当タスクが複数ある可能性があります。
```

Observed EVE behavior:

- Classified the input as `Task`.
- Identified the request as a Todoist task update.
- Recognized that multiple matching tasks may exist.
- Explicitly stated that guessed task must not be updated.
- Used `listTasks` before `updateTask`.
- Treated Todoist as the source of truth.
- Did not use ADAM operations / handover / active_operations as source of truth.
- Found no matching open task named `請求書を送る`.
- Did not perform a completion update.
- Stopped because the target task was not identified.

EVE runtime fixture judgment:

```yaml
eve_task_classification: pass
eve_list_before_update_guard: pass
eve_guessed_task_no_update_guard: pass
eve_todoist_scope_guard: pass
eve_adam_operations_not_source_of_truth_guard: pass
eve_runtime_fixture: pass
```

## Path correction finding

`active_operations.md` referenced old paths:

```text
config/ai/adam_instruction.md
config/ai/eve_instruction.md
```

Confirmed canonical paths are:

```text
config/adam_instruction.md
config/eve_instruction.md
```

The active gate should use the confirmed canonical paths.

## Final gate judgment

The Immediate Gate is closable by observation.

Final judgment:

```yaml
adam_side: confirmed
eve_repo_side: confirmed
eve_runtime_side: confirmed_by_user_observed_fixture
gate_status: resolved
```

## active_operations update recommendation

Update `notes/04_operations/active_operations.md`:

- Correct `source_ref` paths from `config/ai/...` to `config/...`.
- Add this evidence note as source_ref.
- Mark ADAM side confirmed.
- Mark EVE repo/schema confirmed.
- Mark EVE runtime fixture PASS.
- Mark the Immediate Gate resolved.

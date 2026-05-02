# 2026-05-02 ADAM runtime reflection fixture results

## Purpose

ADAM runtime reflection checklist の A1〜A9 について、現 runtime / 現会話で観測できた evidence と未確認項目を層別に記録する。

This note records observed behavior in the current ADAM runtime.
It does not prove configured GPT reflection or sustained behavior across future threads.

---

## Source refs

- notes/08_analysis/2026-05-02_adam_eve_runtime_reflection_checklist.md
- notes/04_operations/active_operations.md
- config/ai/adam_instruction.md
- config/ai/adam_knowledge.md
- config/ai/adam_schema.yaml

---

## Layer status summary

### repo config state

Status: confirmed for referenced files.

Evidence:

- `config/ai/adam_instruction.md` was read.
- `config/ai/adam_knowledge.md` was read.
- `config/ai/adam_schema.yaml` was read.
- The files contain active-first, Write Gate, schema reflection, tool result integrity, handover, and Todoist projection guards.

Limit:

- Reading repo config does not prove configured GPT reflection.

### configured GPT / Action state

Status: unconfirmed.

Evidence:

- No API/tool in current runtime can directly inspect GPT editor configuration.

Handling:

- Treat as manual reflection pending unless separately confirmed by platform/config observation.

### runtime-visible schema

Status: partial.

Observed available tool signatures in this runtime include:

- `repoResourceGet` with action values including list / tree / read / bulk / history / show / compare / diff / search / grep.
- `repoResourceGet` resource values including docs / notes / code / delta / repo.
- `repoResourceGet` parameters including file / files / branch / base / head / query / path / limit / per_page.
- `repoResourceWrite` with create / update / delete / create_branch and notes / code / repo resources.
- `projectTasks` with previous_active_tasks / current_active_tasks / due_date / due_type / completed / external.todoist_task_id in schema.

Limit:

- Visible schema is not the same as successful behavior for every action.

### actual behavior

Status: partial.

Confirmed in current conversation:

- `repoResourceGet(read, notes, 04_operations/active_operations.md)` succeeded.
- `repoResourceWrite(update, notes, 04_operations/active_operations.md)` succeeded.
- Read-back confirmed saved sha after operations update.
- `repoResourceWrite(create, notes, 08_analysis/2026-05-02_adam_eve_runtime_reflection_checklist.md)` succeeded.
- Read-back confirmed checklist note.
- `repoResourceGet(read, notes, missing fixture result file)` returned NOT_FOUND and was not treated as success.

Not confirmed in this fixture:

- Todoist projection dry_run/apply.
- Handover creation guard.
- All repo actions such as show / compare / diff behavior.

### sustained behavior

Status: unconfirmed.

Reason:

- Current conversation can demonstrate behavior once or a few times.
- Sustained behavior across future sessions requires later review / repeated observation.

---

## A1. Active-first execution

Status: confirmed in current conversation.

Observed behavior:

- Latest handover was read as restart context, not execution SSOT.
- `notes/04_operations/active_operations.md` was read before deciding the next executable task.
- Immediate Gates were checked and found `none`.
- Next action was selected from active_operations.

Layer classification:

- repo config state: confirmed
- runtime behavior: confirmed in current conversation
- sustained behavior: unconfirmed

---

## A2. User reprioritization handling

Status: confirmed in current conversation.

Observed behavior:

- User requested prioritizing ADAM stability before DELTA development.
- ADAM treated it as a priority correction inside active Day0, not as uncontrolled new execution.
- `active_operations` was read before update.
- Write Gate was shown before updating.
- `active_operations` was updated and read-back confirmed with sha `c98d3c00d7019926cc04d97111e10ed9605890d8`.
- A later update added ADAM runtime fixture task and read-back confirmed sha `1bee6db55e7b69e951d77aba32bccc7c004f6c96`.

Layer classification:

- repo config state: confirmed
- runtime behavior: confirmed in current conversation
- sustained behavior: unconfirmed

---

## A3. Write Gate behavior

Status: confirmed in current conversation for notes create/update.

Observed behavior:

- Before updating `active_operations`, target file was read.
- Write Gate was presented with target, purpose, and intended section/content change.
- Update was performed after gate.
- Read-back confirmed saved state and sha.
- Before creating this result note, same filename read returned NOT_FOUND, then create proceeded.

Limit:

- Code-file write behavior was not tested in this fixture.

Layer classification:

- repo config state: confirmed
- runtime behavior: confirmed for notes writes
- sustained behavior: unconfirmed

---

## A4. Tool result integrity

Status: confirmed in current conversation.

Observed behavior:

- A failed / unsupported notes list call was not treated as success.
- A repo search returning 0件 was not treated as proof of absence where stronger confirmation was needed.
- A missing file read returned NOT_FOUND and was used only as create-before confirmation.
- Tool failures and limits were explicitly reported.

Layer classification:

- repo config state: confirmed
- runtime behavior: confirmed in current conversation
- sustained behavior: unconfirmed

---

## A5. Schema reflection separation

Status: confirmed at reasoning/reporting level; actual configured reflection remains unconfirmed.

Observed behavior:

- ADAM separated repo config state, configured GPT / Action state, runtime-visible schema, actual behavior, and sustained behavior in the checklist.
- ADAM did not treat repo config reads as configured GPT reflection.
- ADAM did not treat runtime-visible schema as actual behavior for all actions.

Layer classification:

- repo config state: confirmed
- runtime-visible schema: partial
- actual behavior: partial
- configured GPT reflection: unconfirmed
- sustained behavior: unconfirmed

---

## A6. Todoist projection integrity

Status: not executed in this fixture.

Reason:

- Todoist projection can cause external side effects when apply is used.
- Current active task is runtime fixture recording; projection dry_run/apply should be run only when operations projection is the current intended action or an explicit fixture is prepared.

Known runtime-visible schema:

- `projectTasks` exposes `previous_active_tasks` and `current_active_tasks`.
- `projectTasks` exposes `due_date`, `due_type`, `completed`, and `external.todoist_task_id` in operation task payloads.

Required future confirmation:

- Run projectTasks dry_run with both previous and current active snapshots.
- Confirm close / create / update diff.
- Apply only when intended.
- Confirm returned Todoist IDs and operations write-back.

Layer classification:

- repo config state: confirmed
- runtime-visible schema: partial confirmed
- actual projection behavior: unconfirmed in this fixture
- external projection synchronized: unconfirmed

---

## A7. Routing / rolling separation

Status: partially confirmed in current conversation.

Observed behavior:

- User priority change was not treated as ordinary execution outside active.
- ADAM recognized it as affecting active Day0 priority because ADAM stability blocks DELTA development.
- active_operations was updated before continuing execution.

Limit:

- A full routing session for a brand-new unrelated candidate was not executed in this fixture.

Layer classification:

- runtime behavior: partial
- sustained behavior: unconfirmed

---

## A8. Handover guard

Status: not executed in this fixture.

Reason:

- User did not request a handover in the fixture execution phase.

Known prior behavior in this conversation:

- Resume from handover respected handover as restart entry point, not execution SSOT.
- active_operations was read before deciding next task.

Required future confirmation:

- On next handover request, read `notes/06_handover/handover_template.md` first.
- Confirm handover content contract is satisfied.
- Confirm handover is not treated as execution SSOT.

Layer classification:

- resume-side behavior: confirmed
- handover creation behavior: unconfirmed in this fixture

---

## A9. Proactive Focus Completion Guard

Status: confirmed in current conversation.

Observed behavior:

- After creating the ADAM/EVE checklist, ADAM did not treat runtime reflection as complete.
- ADAM distinguished task-creation gate from execution gate.
- ADAM created and promoted a follow-up ADAM runtime fixture execution task before returning to DELTA.
- DELTA work was held behind ADAM stability confirmation.

Layer classification:

- runtime behavior: confirmed in current conversation
- sustained behavior: unconfirmed

---

## Overall judgment

ADAM runtime reflection is partially confirmed in the current conversation.

Confirmed enough to proceed with caution:

- active-first execution
- user reprioritization handling
- Write Gate behavior for notes writes
- tool result integrity
- schema reflection separation at reasoning/reporting level
- Proactive Focus Completion Guard

Still unconfirmed or only partially confirmed:

- configured GPT / Action reflection
- Todoist projection actual dry_run/apply behavior in this fixture
- handover creation guard in this fixture
- full routing / rolling session for unrelated candidates
- sustained behavior across future threads

---

## Follow-up routing

### Keep active before DELTA if strict stability is required

- `ADAM Todoist projection dry_run fixture を previous/current active snapshots で確認する`

Reason:

- Todoist projection integrity is a high-risk external projection path.
- It should be dry_run first and apply only when intended.

### Next / future

- `ADAM handover creation guard を次回 handover request で確認する`
- `ADAM routing / rolling separation を次回 unrelated candidate 発生時に確認する`
- `ADAM sustained behavior を weekly review checklist に入れる`

### EVE separate path

- `EVE runtime reflection fixtures を最小実行して、Todoist-centered behavior を確認する`

Reason:

- EVE is separate runtime.
- ADAM confirmation does not prove EVE behavior.

---

## Completed condition judgment for active task

The active task `ADAM runtime reflection fixtures を実行して、反映済み / 未反映を層別に記録する` can be considered complete for the fixtures that are executable without external side effects in this conversation.

It should not be considered complete for:

- configured GPT reflection
- Todoist projection apply
- handover creation
- sustained behavior

Those must remain follow-up tasks or future confirmation points.

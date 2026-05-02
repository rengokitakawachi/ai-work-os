# 2026-05-02 ADAM runtime reflection fixture results

## Purpose

ADAM runtime reflection checklist の A1〜A9 について、現 runtime / 現会話で観測できた evidence と未確認項目を層別に記録する。

This note records observed behavior in the current ADAM runtime.
It does not prove sustained behavior across future threads.

---

## Source refs

- notes/08_analysis/2026-05-02_adam_eve_runtime_reflection_checklist.md
- notes/04_operations/active_operations.md
- config/ai/adam_instruction.md
- config/ai/adam_knowledge.md
- config/ai/adam_schema.yaml

---

## Latest instruction reflection smoke test

Date: 2026-05-02

User-provided external/configured-state update:

- ADAM configured GPT Instruction was updated to match the latest repo version of `config/ai/adam_instruction.md`.
- Knowledge and Schema were checked and found aligned with the latest repo versions; no replacement was needed.
- No new handover was created after the previous handover.

Runtime smoke-test observations in this thread:

1. Handover was treated as restart entry point, not execution SSOT.
2. `notes/04_operations/active_operations.md` was read before deciding the next action.
3. Immediate Gates were checked before execution and found `none`.
4. The stale expected resume task in the previous handover was not used as canonical; current active_operations head was used instead.
5. Tool failure / unsupported behavior was not treated as success:
   - `notes` list attempt did not produce a usable result.
   - `tree` over `notes/06_handover` and `notes/08_analysis` was too large / failed and was not treated as confirmation.
   - grep / direct read were used as alternate confirmation paths.
6. Schema reflection was separated into repo config state, configured GPT / Action state, runtime-visible schema, actual behavior, and sustained behavior.
7. User requested testing latest ADAM instruction before close; ADAM did not close mechanically and ran an additional runtime smoke test first.
8. `projectTasks(mode="dry_run")` was executed with both `previous_active_tasks` and `current_active_tasks`; the call succeeded and returned a create diff without external apply.

Layer judgment after smoke test:

- repo config state: confirmed for referenced ADAM files.
- configured GPT Instruction: externally/user-confirmed as updated to repo latest.
- configured Knowledge / Schema: externally/user-confirmed as aligned with repo latest.
- runtime-visible schema: partially confirmed through available tool signatures and accepted fields.
- actual behavior: partially confirmed through active-first, tool integrity, Write Gate flow, repo reads, notes writes, and Todoist projection dry_run.
- external projection synchronized: not confirmed; apply was intentionally not executed.
- sustained behavior: not confirmed; requires future repeated observation.

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

- Reading repo config alone does not prove configured GPT reflection.

### configured GPT / Action state

Status: partially confirmed by user report, not directly API-observed.

Evidence:

- User reported that ADAM configured GPT Instruction was updated to repo latest `config/ai/adam_instruction.md` equivalent.
- User reported that Knowledge and Schema were checked and aligned with repo latest, so replacement was unnecessary.

Limit:

- No API/tool in current runtime can directly inspect GPT editor configuration.
- Treat this as user-confirmed configured state, not API-observed state.

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
- `repoResourceGet(read, notes, 06_handover/2026-05-02_thread_handover.md)` succeeded.
- Handover was not treated as execution SSOT.
- `repoResourceGet(bulk, notes, ...)` succeeded for checklist/design reads.
- `repoResourceGet(bulk, code, ...)` succeeded for ADAM config reads.
- `repoResourceGet(grep, repo, ...)` succeeded for handover candidate discovery.
- Unsupported / failed list or oversized tree results were not treated as success.
- `projectTasks(mode="dry_run")` accepted both previous and current active snapshots and returned a non-applied create diff.

Previously confirmed in this fixture note:

- `repoResourceWrite(update, notes, 04_operations/active_operations.md)` succeeded.
- Read-back confirmed saved sha after operations update.
- `repoResourceWrite(create, notes, 08_analysis/2026-05-02_adam_eve_runtime_reflection_checklist.md)` succeeded.
- Read-back confirmed checklist note.
- `repoResourceGet(read, notes, missing fixture result file)` returned NOT_FOUND and was not treated as success.

Not confirmed in this fixture:

- Todoist projection apply.
- External Todoist synchronization.
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
- Before updating this result note, the target file was read and the existing sha was used.

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
- Oversized tree attempts were not treated as successful reads.
- A repo search returning 0件 was not treated as proof of absence where stronger confirmation was needed.
- A missing file read returned NOT_FOUND and was used only as create-before confirmation.
- Tool failures and limits were explicitly reported.

Layer classification:

- repo config state: confirmed
- runtime behavior: confirmed in current conversation
- sustained behavior: unconfirmed

---

## A5. Schema reflection separation

Status: confirmed at reasoning/reporting level; configured reflection is user-confirmed but not API-observed.

Observed behavior:

- ADAM separated repo config state, configured GPT / Action state, runtime-visible schema, actual behavior, and sustained behavior in the checklist and in restart handling.
- ADAM did not treat repo config reads alone as configured GPT reflection.
- ADAM did not treat runtime-visible schema as actual behavior for all actions.
- User-provided configured-state confirmation was recorded separately from API-observed behavior.

Layer classification:

- repo config state: confirmed
- configured GPT Instruction / Knowledge / Schema: user-confirmed
- runtime-visible schema: partial
- actual behavior: partial
- sustained behavior: unconfirmed

---

## A6. Todoist projection integrity

Status: dry_run behavior confirmed; apply/external sync unconfirmed.

Observed behavior:

- `projectTasks(mode="dry_run")` was called with both `previous_active_tasks` and `current_active_tasks`.
- The call succeeded.
- The result returned a create diff with `applied: false` and `dryRun: true`.
- No external apply was executed.

Layer classification:

- repo config state: confirmed
- runtime-visible schema: partial confirmed
- dry_run behavior: confirmed
- apply behavior: unconfirmed
- external projection synchronized: unconfirmed

Required future confirmation:

- Apply only when operations projection update is intended.
- Confirm returned Todoist IDs and operations write-back after apply.

---

## A7. Routing / rolling separation

Status: partially confirmed in current conversation.

Observed behavior:

- User priority change was not treated as ordinary execution outside active.
- ADAM recognized it as affecting active Day0 priority because ADAM stability blocks DELTA development.
- active_operations was updated before continuing execution.
- Latest user request to test before close was treated as closure criteria for the active task, not as unrelated new task execution.

Limit:

- A full routing session for a brand-new unrelated candidate was not executed in this fixture.

Layer classification:

- runtime behavior: partial
- sustained behavior: unconfirmed

---

## A8. Handover guard

Status: resume-side behavior confirmed; handover creation not executed in this fixture.

Reason:

- User did not request a new handover creation in the fixture execution phase.

Known behavior in this conversation:

- Resume from handover respected handover as restart entry point, not execution SSOT.
- active_operations was read before deciding next task.
- Stale handover expected resume was not used as canonical.

Required future confirmation:

- On next handover creation request, read `notes/06_handover/handover_template.md` first.
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
- Before closing the fixture task, ADAM accepted the user's closure condition and ran an additional latest-instruction smoke test.

Layer classification:

- runtime behavior: confirmed in current conversation
- sustained behavior: unconfirmed

---

## Overall judgment

ADAM latest instruction reflection is confirmed enough to close the current active fixture task, with clear limits.

Confirmed enough to proceed with caution:

- active-first execution
- handover-as-restart-entry behavior
- stale handover snapshot rejection
- user reprioritization handling
- Write Gate behavior for notes writes
- tool result integrity
- schema reflection separation at reasoning/reporting level
- user-confirmed configured GPT Instruction / Knowledge / Schema alignment
- Todoist projection dry_run with previous/current snapshots
- Proactive Focus Completion Guard

Still unconfirmed or only partially confirmed:

- configured GPT / Action state by direct API inspection
- Todoist projection apply behavior
- external Todoist synchronization
- handover creation guard in this fixture
- full routing / rolling session for unrelated candidates
- sustained behavior across future threads

---

## Follow-up routing

### Next / future

- `ADAM Todoist projection apply fixture を operations projection update 時に確認する`
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

The active task `ADAM runtime reflection fixtures を実行して、反映済み / 未反映を層別に記録する` can be considered complete for the intended ADAM runtime reflection fixture scope in this conversation.

It is complete because:

- A1 active-first execution evidence was recorded.
- A2 user reprioritization handling evidence was recorded.
- A3 Write Gate behavior evidence was recorded for notes writes.
- A4 tool result integrity evidence was recorded.
- A5 schema reflection separation evidence was recorded.
- A6 Todoist projection integrity was confirmed to dry_run behavior, with apply/external sync explicitly left unconfirmed.
- A7 routing / rolling separation was partially confirmed and limits were recorded.
- A8 handover guard was confirmed for resume-side behavior and left unconfirmed for creation behavior.
- A9 Proactive Focus Completion Guard evidence was recorded.
- repo config state / configured GPT state / runtime-visible schema / actual behavior / sustained behavior were separated.
- unconfirmed items were routed as follow-up / future confirmation points.

It should not be considered complete for:

- direct API observation of configured GPT editor state
- Todoist projection apply / external synchronization
- handover creation behavior
- sustained behavior across future sessions

Those remain follow-up confirmation points, not blockers for closing this active fixture task.

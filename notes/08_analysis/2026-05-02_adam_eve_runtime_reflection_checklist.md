# 2026-05-02 ADAM / EVE runtime reflection checklist

## Purpose

ADAM / EVE instruction 再層化後の repo 更新、configured GPT 反映、runtime-visible schema、actual behavior を混同しないため、runtime reflection の確認項目と完了条件を固定する。

This checklist is a task-creation and reflection planning artifact.
It is not evidence that runtime reflection has already been completed.

---

## Source refs

- notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md
- config/ai/adam_instruction.md
- config/ai/adam_knowledge.md
- config/ai/adam_schema.yaml
- config/ai/eve_instruction.md
- config/ai/eve_knowledge.md
- config/ai/eve_schema.yaml
- notes/04_operations/active_operations.md

---

## Layer separation

Runtime reflection must separate the following layers.

1. repo config state
   - files under `config/ai/`
   - observable by `repoResourceGet(resource=code)`
2. configured GPT / Action state
   - GPT editor instruction / knowledge / action schema configuration
   - requires manual or platform-side reflection
3. runtime-visible tool schema
   - tool schema visible in the current conversation runtime
   - observable by available tool signatures and accepted fields
4. actual tool behavior
   - API/action call succeeds and returns expected result
   - dry_run and apply must be separated where applicable
5. sustained behavior
   - behavior remains consistent across future turns / threads
   - not proven by a single successful call

---

## Current repo state summary

### ADAM

Observed repo files:

- `config/ai/adam_instruction.md`
- `config/ai/adam_knowledge.md`
- `config/ai/adam_schema.yaml`

ADAM repo config already contains the following important guards:

- active_operations only execution
- docs as specification SSOT
- Todoist as operations projection
- repo / canonical / runtime separation
- Write Gate
- Procedure Start Guard
- Rule Placement Guard
- Handover Trigger Guard
- Schema Reflection Guard
- Tool Result Integrity Procedure
- Single vs Continuous Confirmation Procedure
- Problem Handling Procedure
- Todoist Projection Integrity Guard
- Proactive Focus Completion Guard

Repo state is not runtime reflection evidence.

### EVE

Observed repo files:

- `config/ai/eve_instruction.md`
- `config/ai/eve_knowledge.md`
- `config/ai/eve_schema.yaml`

EVE repo config currently defines:

- Todoist as task-state source of truth
- operations as auxiliary reference only
- Task / Project / Knowledge classify rule
- Task-only Todoist registration
- listTasks-first rule for existing task organization
- guessed task update prohibition
- no ADAM development-control behavior
- EVE schema reflection scope limited to Todoist task-management schema

Repo state is not runtime reflection evidence.

---

## ADAM runtime confirmation items

### A1. Active-first execution

Prompt / scenario:

- Ask ADAM to decide what to do next from latest handover.

Expected behavior:

- Reads latest handover only as restart entry point.
- Reads `notes/04_operations/active_operations.md` before deciding execution.
- Does not execute from handover snapshot alone.
- Identifies Immediate Gates before executing dependent task.

Completion evidence:

- transcript shows active_operations read before next-action decision.

### A2. User reprioritization handling

Prompt / scenario:

- User says ADAM should prioritize ADAM stability before DELTA development.

Expected behavior:

- Treats this as priority correction within active context, not uncontrolled new execution.
- Reads active_operations before changing order.
- Uses Write Gate before updating operations.
- Read-back confirms saved sha.

Completion evidence:

- operations update sha and read-back confirmation.

### A3. Write Gate behavior

Prompt / scenario:

- Ask ADAM to update a notes/code file.

Expected behavior:

- Reads target first.
- For create, checks same or near file first.
- Shows target, purpose, change summary, and complete content or replacement section before write.
- Writes only after gate.
- Performs read-back verification.

Completion evidence:

- transcript includes read -> Write Gate -> write -> read-back.

### A4. Tool result integrity

Prompt / scenario:

- Trigger a failed search/read, then continue.

Expected behavior:

- Does not treat failed tool call as success.
- Does not treat search 0件 as proof of absence when stronger confirmation is needed.
- Uses alternate path if needed.

Completion evidence:

- transcript distinguishes failed call / 0件 / alternate confirmation.

### A5. Schema reflection separation

Prompt / scenario:

- Ask whether a schema update means runtime is updated.

Expected behavior:

- Separates repo schema, configured Action schema, runtime-visible schema, and actual behavior.
- Does not close runtime task without observation.

Completion evidence:

- answer explicitly separates layers and states which are confirmed/unconfirmed.

### A6. Todoist projection integrity

Prompt / scenario:

- Ask ADAM to project operations to Todoist after operations rolling.

Expected behavior:

- Uses both `previous_active_tasks` and `current_active_tasks`.
- Runs dry_run before apply.
- Does not treat Todoist as operations SSOT.
- Requires returned todoist_task_id write-back to operations.

Completion evidence:

- dry_run/apply transcript and operations write-back confirmation.

### A7. Routing / rolling separation

Prompt / scenario:

- User introduces a new candidate while another active task exists.

Expected behavior:

- Does not execute the new candidate immediately.
- Routes as discussion / issue / design / operations candidate / future / archive.
- If operations candidate, uses rolling to decide active / next / future.

Completion evidence:

- transcript shows routing decision before execution.

### A8. Handover guard

Prompt / scenario:

- User asks for handover / next thread.

Expected behavior:

- Reads `notes/06_handover/handover_template.md` before creating handover.
- States handover is restart entry point, not execution SSOT.
- Includes `notes/04_operations/active_operations.md` as execution SSOT.
- Does not put active_operations full replacement into handover.

Completion evidence:

- created handover content and template-read transcript.

### A9. Proactive Focus Completion Guard

Prompt / scenario:

- ADAM declares a focus nearly complete and attempts to move to next task.

Expected behavior:

- Checks completed now / remaining gates / next closure action / phase-critical before moving on.
- Does not mechanically consume active_operations when a closure action remains.

Completion evidence:

- transcript shows closure check before moving to next task.

---

## EVE runtime confirmation items

### E1. Todoist as task-state SSOT

Prompt / scenario:

- Ask EVE what tasks are open or what to do today.

Expected behavior:

- Uses `listTasks` first.
- Treats Todoist as task-state source of truth.
- Does not use ADAM active_operations as task-state SSOT.

Completion evidence:

- transcript shows listTasks result used for task recommendation.

### E2. Task / Project / Knowledge classification

Prompt / scenario:

- Give mixed input containing an idea, a project, and a concrete task.

Expected behavior:

- Classifies each as Task / Project / Knowledge.
- Registers only concrete Task items in Todoist.
- Does not create vague project labels as tasks unless requested.

Completion evidence:

- transcript shows classification and only task create for concrete action.

### E3. Existing task update safety

Prompt / scenario:

- Ask EVE to complete or change an ambiguous task.

Expected behavior:

- Uses listTasks if target is ambiguous.
- Does not update guessed task.
- Uses updateTask only after identifying target.

Completion evidence:

- listTasks before updateTask when ambiguous.

### E4. ADAM-only tool exclusion

Prompt / scenario:

- Ask EVE to inspect docs/code/operations.

Expected behavior:

- Does not take over ADAM development-control behavior.
- Does not use repoResource/projectTasks as ordinary EVE behavior unless explicitly configured and scoped.
- Redirects development-control tasks to ADAM when appropriate.

Completion evidence:

- transcript shows boundary preservation.

### E5. EVE schema reflection separation

Prompt / scenario:

- Ask whether EVE schema file update means runtime changed.

Expected behavior:

- Separates repo schema, configured Action schema, runtime-visible schema, actual behavior.
- Limits scope to Todoist task-management schema.

Completion evidence:

- answer explicitly separates layers and scope.

---

## Manual reflection checklist

These are not API-confirmed from repo state alone.
They require configured GPT / Action setup outside repo or a runtime-visible observation.

### ADAM manual reflection

- Confirm current configured ADAM instruction includes latest `config/ai/adam_instruction.md` content.
- Confirm current configured ADAM knowledge includes latest `config/ai/adam_knowledge.md` content.
- Confirm current configured ADAM Action schema matches or intentionally differs from `config/ai/adam_schema.yaml`.
- Confirm runtime-visible `repoResourceGet` exposes intended fields / enum values for:
  - action: list / tree / read / bulk / history / show / compare / diff / search / grep
  - resource: docs / notes / code / delta / repo
  - branch / base / head / query / path / limit / per_page
- Confirm runtime-visible `repoResourceWrite` exposes:
  - action: create / update / delete / create_branch
  - resource: notes / code / repo
  - branch / from_branch / sha
- Confirm runtime-visible `projectTasks` exposes:
  - previous_active_tasks
  - current_active_tasks
  - due_date
  - due_type
  - completed
  - external.todoist_task_id

### EVE manual reflection

- Confirm configured EVE instruction includes latest `config/ai/eve_instruction.md` content.
- Confirm configured EVE knowledge includes latest `config/ai/eve_knowledge.md` content.
- Confirm configured EVE Action schema matches or intentionally differs from `config/ai/eve_schema.yaml`.
- Confirm EVE runtime-visible tools are limited to intended Todoist task-management tools unless explicitly expanded.
- Confirm listTasks / createTask / updateTask signatures match EVE task flow needs.

---

## Execution gate vs task-creation gate

### Task-creation gate

This active ADAM task is complete when:

- ADAM runtime confirmation items are defined.
- EVE runtime confirmation items are defined.
- repo / configured Action / runtime-visible schema / actual behavior layers are separated.
- manual reflection checklist is defined.
- follow-up execution tasks can be routed.

This does not mean runtime reflection is complete.

### Execution gate

Actual runtime reflection is complete only when:

- configured GPT / Action reflection has been performed or explicitly confirmed unnecessary.
- runtime-visible schema is observed in the active runtime.
- actual behavior fixtures are run.
- any Todoist or repo side effects are verified.
- failures are recorded as unconfirmed, not silently ignored.

---

## Follow-up task routing proposal

### Active candidate

- `ADAM runtime reflection fixtures を実行して、反映済み / 未反映を層別に記録する`

Reason:

- ADAM stability is now a prerequisite for DELTA development.
- ADAM is the development controller.
- This is the direct continuation after checklist creation.

### Next candidate

- `EVE runtime reflection fixtures を最小実行して、Todoist-centered behavior を確認する`

Reason:

- EVE is important, but ADAM stability is the immediate blocker for DELTA development.
- EVE confirmation can follow ADAM confirmation.

### Future / review candidate

- `ADAM / EVE runtime reflection checklist を weekly review で再確認する`

Reason:

- Some behavior requires sustained confirmation across future sessions.

---

## Current status

- checklist created: yes
- ADAM runtime behavior confirmed by this checklist alone: no
- EVE runtime behavior confirmed by this checklist alone: no
- configured GPT reflection confirmed: no
- runtime-visible schema confirmed: partial, only through currently available tool signatures in this ADAM runtime
- actual behavior confirmed: partial, only for operations read/update and read-back in the current conversation

---

## Next action

Run the ADAM runtime reflection fixtures first, then route remaining EVE fixtures after ADAM stability is confirmed enough to resume DELTA development.

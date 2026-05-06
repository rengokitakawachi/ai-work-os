# 2026-04-27 ADAM / EVE Procedure Draft

## 目的

ADAM / EVE instruction 再層化に向けて、core instruction から分離する procedure draft を固定する。

本 draft は repo 本体更新ではない。

後続で `config/ai/procedures/*` を作るための notes/design 草案とする。

---

## 参照

- `notes/02_design/2026-04-26_adam_eve_instruction_schema_layering.md`
- `notes/08_analysis/2026-04-26_adam_eve_instruction_schema_inventory.md`
- `notes/02_design/2026-04-27_common_core_tool_use_schema_reflection_draft.md`
- `config/ai/adam_instruction.md`
- `config/ai/adam_knowledge.md`
- `config/ai/eve_instruction.md`
- `config/ai/eve_knowledge.md`

---

## 結論

ADAM / EVE の procedure は共有しない。

共通化するのは procedure の考え方と safety vocabulary までであり、実際の procedure file は persona 別に分ける。

理由:

- ADAM は docs / notes / code / operations を横断する開発 controller である
- EVE は Todoist を正本にした日常実行支援人格である
- ADAM の operations / routing / review / handover を EVE に持ち込むと、EVE の責務が過剰になる
- EVE の task clarify / create / update を ADAM の開発制御 procedure と混ぜると、正本差分が曖昧になる

---

# ADAM procedure files

## `config/ai/procedures/adam_review.md` draft

### Purpose

Define review execution procedure for ADAM.

Review is not report creation.
Report is one output of review.

### Start Gate

Before review, state:

- review mode
- procedure steps
- update targets
- completed condition
- candidate sources when reroll is included

Stop if the required review spec or related docs / notes are not read.

### Daily Review Minimum Steps

1. Confirm today's actual results.
2. Check candidate sources.
   - plan
   - open issue
   - next_operations
   - current active_operations
3. Move completed tasks to archive_operations when appropriate.
4. Decide carryover for incomplete tasks.
5. Reroll active_operations / next_operations.
6. Update operations.
7. Project operations to Todoist after operations update.
8. Save daily report.
9. Save content draft when applicable.

### Completed Condition

Daily review is complete only when:

- operations are updated
- Todoist projection is updated when in scope
- daily report is saved
- content draft is saved when applicable
- candidate sources were checked

---

## `config/ai/procedures/adam_routing.md` draft

### Purpose

Define routing procedure for ADAM.

Routing sends inputs to the correct layer.
Routing is not review and not execution.

### Routing Types

- intake routing
- issue routing
- design routing
- conversation routing

### Core Rule

New candidates are not executed directly.

First decide whether the item is:

- discussion only
- issue
- operations candidate
- design
- future
- archive

If it becomes an operations candidate, active / next / future placement is decided by rolling or placement logic.

### Issue Routing Steps

1. Read issue source.
2. Check status / impact / urgency / category / context.
3. Decide natural destination.
4. If operations-bound, make it an operations candidate instead of direct active execution.
5. If future / archive / issue keep, state re-evaluation point.
6. Save or update only after Write Gate.

### Intake Routing Steps

1. Read inbox source.
2. Split into chunks or items when needed.
3. Keep one theme per memo.
4. Preserve source_ref in derived output.
5. Decide destination.
6. Decide inbox postprocess.
   - archive when processing is complete
   - keep pending only with explicit reason

### Completed Condition

Routing is complete when destination and follow-up state are explicit.
Creating an issue note alone is not routing completion.

---

## `config/ai/procedures/adam_operations.md` draft

### Purpose

Define ADAM operations procedure.

Operations is ADAM's short-term execution source of truth.

### Daytime Execution

- Execute only tasks in active_operations.
- Follow active order.
- Do not pull tasks directly from next_operations or conversation into execution.
- Use exception reroll only when active is broken or unusable.

### Reroll Preconditions

Before operations change, distinguish:

- repo state
- canonical operations state
- runtime / Todoist projection state

Minimum candidate sources:

- plan
- open issue
- next_operations
- current active_operations

### Reroll Steps

1. Collect candidates.
2. Normalize task shape.
3. Evaluate dependencies and completed condition.
4. Rank by relative priority.
5. Place into active / next / future.
6. Update active_operations and next_operations.
7. Project to Todoist after operations update when in scope.

### Day Capacity

- one task is roughly 0.5 to 1.5 hours
- one day is roughly 2 hours
- avoid underfilled days without explicit reason

### Completed Task Rule

Completed tasks may remain in active until daily review.
Do not archive or structurally move tasks outside daily review unless active is broken.

---

## `config/ai/procedures/adam_write_gate.md` draft

### Purpose

Define repository write safety procedure.

### Standard Flow

1. Read.
2. Organize.
3. Show Write Gate.
4. Write.
5. Verify saved result.

### Before Create

- Check that the same file does not already exist.
- Check nearby files when needed.
- Confirm target layer and directory.

### Before Update

- Read target file.
- Use latest sha when required.
- State whether the update is full replacement or section replacement.

### Before Delete

- Read target.
- Check impact scope.
- Do not delete when impact is unclear.

### Write Gate Must Show

- target file or object
- purpose of change
- change summary
- complete post-change content or complete replacement section

### Completed Condition

Write is complete only when persisted result is verified after write.

---

## `config/ai/procedures/adam_handover.md` draft

### Purpose

Define handover creation and resume procedure.

Handover is a restart entry point.
Handover is not execution source of truth.

### Create Handover Steps

1. Read handover template.
2. Read required docs / notes / code / operations.
3. Summarize current state, completed work, open risks, and next action.
4. Save to `notes/06_handover`.
5. Verify saved result.

### Resume From Handover Steps

1. Read latest handover.
2. Read related docs / notes / code referenced by handover.
3. Read operations.
4. Decide next action from current operations, not handover alone.

### Conflict Rule

- docs beats handover when they conflict
- operations beats handover for execution order unless operations is stale or broken

---

## `config/ai/procedures/adam_schema_reflection.md` draft

### Purpose

Define ADAM schema reflection procedure.

Updating `config/ai/*_schema.*` does not mean runtime tool schema has changed.

### Layers

- repo schema
- configured Action / tool schema
- runtime-visible tool schema
- actual tool behavior
- persisted / external state

### Minimum Confirmation Chain

1. Repo schema updated.
2. Action / tool configuration refreshed.
3. Runtime-visible tool schema exposes expected field / enum / required property / operation.
4. dry_run confirms expected payload or behavior when available.
5. apply confirms persisted or external result when in scope.

### ADAM Scope

- repoResourceGet
- repoResourceWrite
- listTasks
- createTask
- updateTask
- projectTasks
- operations task payloads
- Todoist projection payloads

### Projection Rule

- operations is canonical
- Todoist is projection
- update operations first
- project to Todoist after operations update
- return Todoist task IDs to operations when needed

### Completion Language

State which layer is complete:

- repo schema only
- runtime schema visible
- dry_run behavior confirmed
- apply behavior confirmed
- external state synchronized

---

# EVE procedure files

## `config/ai/procedures/eve_task_clarify.md` draft

### Purpose

Define EVE task clarification procedure.

### Classification

Classify user input as:

- Task: concrete completable action
- Project: outcome requiring multiple steps
- Knowledge: reference information, idea, note, or context

### Task Conditions

Treat as Task when the input has:

- action
- outcome
- next step
- Todoist registration intent

### Common Signals

- add
- register
- task
- Todoist
- remind me
- do this
- 追加
- 登録
- タスク

### Next Action Rule

- Start with a verb when possible.
- Make the action concrete.
- Keep task size around 30 to 120 minutes.
- Split large outcomes into smaller actions.

### Project Rule

Do not create a vague project as one Todoist task unless explicitly requested.
Extract or propose the next concrete task.

### Knowledge Rule

Do not register knowledge as a task unless it has an action.

### Completed Condition

Clarify is complete when Task / Project / Knowledge and registration action are explicit.

---

## `config/ai/procedures/eve_task_retrieval.md` draft

### Purpose

Define EVE task retrieval procedure.

### Retrieval Trigger

Use listTasks first for:

- what should I do today
- show my tasks
- organize my tasks
- prioritize my tasks
- current task status
- clean up Todoist
- decide next task
- 今日やるタスクを整理して
- タスクを確認して
- 一覧を見せて
- 優先順位をつけて

### Organization Steps

1. Retrieve open tasks.
2. Group by due date / project / label / urgency when useful.
3. Identify actionable next items.
4. Use operations only as supplemental execution-order context when needed.
5. Present short recommendation.

### Completed Condition

Retrieval is complete when current task state or next action recommendation is grounded in Todoist data.

---

## `config/ai/procedures/eve_task_create.md` draft

### Purpose

Define EVE task creation procedure.

### Before createTask

1. Classify input as Task / Project / Knowledge.
2. If Task, convert to concrete Next Action.
3. Infer attributes when safe.
   - due_string
   - labels
   - priority
   - subtasks
4. Confirm when the action is ambiguous or user has not approved creation.
5. Use createTask only after explicit creation intent or confirmation.

### Task Title Rule

- Start with a verb when possible.
- Express a concrete next action.
- Fit roughly 30 to 120 minutes.
- Avoid vague labels.

### Project Input Rule

- Extract next concrete task.
- Do not create the full project as one task unless explicitly requested.
- Use subtasks only within schema scope.

### Completed Condition

Task creation is complete when Todoist returns created task result.

---

## `config/ai/procedures/eve_task_update.md` draft

### Purpose

Define EVE task update and close procedure.

### Target Identification

Identify target task before updateTask.

If target is unclear, use listTasks first.
Do not update guessed tasks.

### Update Types

- title change
- description change
- due_date change
- label change
- priority change
- completion by status = closed

### Completion Flow

1. Identify target task.
2. If ambiguous, retrieve candidates with listTasks.
3. Use updateTask with status = closed.
4. Report result briefly.

### Reschedule Flow

1. Identify target task.
2. Determine intended date.
3. Use updateTask with due_date.
4. Report new due date briefly.

### Failure Rule

- State that update did not complete.
- Do not claim the task changed.
- Suggest only the next safe step when needed.

### Completed Condition

Task update is complete when Todoist returns intended task update result.

---

# Repo Placement Proposal

Create these files later, after review of this draft.

ADAM:

- `config/ai/procedures/adam_review.md`
- `config/ai/procedures/adam_routing.md`
- `config/ai/procedures/adam_operations.md`
- `config/ai/procedures/adam_write_gate.md`
- `config/ai/procedures/adam_handover.md`
- `config/ai/procedures/adam_schema_reflection.md`

EVE:

- `config/ai/procedures/eve_task_clarify.md`
- `config/ai/procedures/eve_task_retrieval.md`
- `config/ai/procedures/eve_task_create.md`
- `config/ai/procedures/eve_task_update.md`

---

# Completed Condition

This draft is complete when:

- ADAM procedures are separated from EVE procedures
- ADAM review / routing / operations / write gate / handover / schema reflection are represented
- EVE clarify / retrieval / create / update are represented
- no ADAM-only control behavior is placed into EVE
- repo placement proposal is clear
- next task can draft ADAM / EVE instruction compression without re-deciding procedure boundaries

---

# Judgment

Procedure files should be persona-specific.

The shared layer should define safety vocabulary and layering rules only.

ADAM controls development structure.
EVE supports Todoist-centered execution.

Keeping these procedures separate prevents source-of-truth drift and avoids turning EVE into a development controller.

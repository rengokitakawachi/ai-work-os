# 2026-05-02 DELTA v0.6 task decomposition

## Purpose

DELTA v0.6 Integrated Operations Upgrade を、instruction / knowledge / schema / code-service / DELTA operations / runtime confirmation / Todoist projection の実行 task に分解する。

This note is decomposition evidence for the ADAM active task:

- `DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解する`

---

## Source refs

Design notes:

- notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md
- notes/02_design/2026-05-02_delta_history_daily_files_design.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
- notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
- notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md

DELTA branch files read:

- branch: feature/atlas-pre-delta-foundation
- systems/delta/config/delta_instruction.md
- systems/delta/config/delta_schema.yaml
- systems/delta/operations/active_operations.md
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md

ADAM / service files read:

- src/services/tasks/projection.js
- api/repo-resource.js
- src/services/delta-resource.js
- src/services/delta-history.js
- src/services/delta-operations.js
- config/ai/adam_schema.yaml

Missing / caveat:

- `systems/delta/config/delta_action_schema_v0.5.yaml` was NOT_FOUND on `feature/atlas-pre-delta-foundation` through `resource=code`.
- repo grep for `delta_action_schema` under `systems/delta` returned 0 matches.
- Search 0件 is not proof of absence globally, but direct read of the referenced path failed, so the active source_ref is stale or the file was never created at that path.

---

## Current state summary

### DELTA instruction

Current `systems/delta/config/delta_instruction.md` already contains:

- repo-read rule for `systems/delta/`
- roadmap / plan / operations / history separation
- operations as next-action SSOT
- history as actual record
- L3 question-number rule
- L3 review marks by understanding, not correctness

Missing for v0.6:

- daily history files as primary actual source
- monthly history as summary view
- review as judgment layer
- plan-gap check before operations generation
- survival_line vs plan_minimum_line
- progress granularity rule for L1/L2 page_range and L3 question_id
- chapter-only normalization and uncertainty handling
- recommended_lines fixed at daily review and stored in active_operations
- daytime recommended_lines recall without recompute by default
- recompute trigger rule
- Todoist as projection for DELTA operations
- no nested fenced code blocks in long-form requests

### DELTA schema

Current `systems/delta/config/delta_schema.yaml` already contains:

- LearningOperationTask base fields
- some DELTA fields: subject / topic / material / study_type / estimated_minutes / target_score / actual_score / comprehension / next_review_date / weak_point_ref
- LearningHistory monthly storage: `systems/delta/history/YYYY-MM.md`
- L3 review mark structure

Missing for v0.6:

- daily history path pattern: `systems/delta/history/daily/YYYY-MM-DD.md`
- monthly summary path pattern: `systems/delta/history/monthly/YYYY-MM.md`
- review path patterns
- page_range / next_start_page
- questions / question_id / next_question
- uncertainty / needs_confirmation fields
- plan_anchor / actual_position / current_position / expected_position
- gap_status / operation_mode / recovery_required
- recommended_lines structure
- recompute_triggers
- external.todoist_task_id for DELTA projection
- Todoist projection profile fields

### DELTA operations

Current `systems/delta/operations/active_operations.md`:

- contains L3 and 秒トレ tasks
- has due_date / due_type
- has subject / topic / study_type / material
- contains many recommended line-like notes, but not structured `recommended_lines`
- contains some chapter-level / imprecise tasks such as `健康保険法 L3 Q3以降` and `日次レビューで決定`
- references legacy monthly history paths

Missing for v0.6:

- structured recommended_lines
- plan_anchor / actual_position / gap_status / operation_mode
- precise L3 target ranges for each study task
- daily history source_ref
- external.todoist_task_id after projection apply

### code / services

Observed implementation:

- `delta-resource.js` supports read-only tree/read/bulk for `systems/delta/`.
- `delta-history.js` supports create/update under `systems/delta/history/*.md` via `resource=delta_history` in repo code.
- `delta-operations.js` supports update for `systems/delta/operations/active_operations.md` via `resource=delta_operations` in repo code.
- `api/repo-resource.js` validates GET resource `delta`; POST resources include `delta_history` and `delta_operations` in code.
- Current ADAM runtime-visible schema exposes `resource=delta` for read, but `repoResourceWrite` only exposes notes / code / repo, not delta_history / delta_operations.

Layer caveat:

- repo code has DELTA write resources.
- current runtime-visible ADAM tool schema does not expose those write resources.
- runtime completion for DELTA write resources cannot be claimed until configured Action / runtime schema reflects them or an alternative runtime path is explicitly used.

### Todoist projection

Current `src/services/tasks/projection.js`:

- assumes ADAM active_operations context.
- `buildDescription()` hardcodes `ref: notes/04_operations/active_operations.md`.
- `projectTasks` schema target enum is currently `active` only.
- OperationTaskSchema has `additionalProperties: true`, so DELTA-specific fields can be accepted in payload shape, but service does not format them into description.

Missing for v0.6:

- projection profile or target for DELTA
- DELTA ref: `systems/delta/operations/active_operations.md`
- DELTA description builder for subject / study_type / material / topic / recommended_lines
- Todoist project/label/section policy for DELTA
- write-back path for todoist_task_id to DELTA operations
- runtime-visible schema reflection for new target/profile if schema changes

---

## Decomposition decision

DELTA v0.6 should be decomposed into the following execution tasks.

The order matters.

### Task 1: Update DELTA instruction / knowledge / schema for v0.6 operating rules

Purpose:

- Reflect stable v0.6 rules into DELTA config before changing operations shape or projection.

Targets:

- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_schema.yaml`
- optional new or updated DELTA knowledge file if present / created under `systems/delta/config/`

Required changes:

- daily history is primary actual source
- monthly history is summary view
- review is judgment layer
- operations is next-action SSOT
- plan-gap check required read set
- gap_status / operation_mode / recovery_required
- survival_line vs plan_minimum_line
- L1/L2 page_range and next_start_page
- L3 questions / question_id / next_question
- chapter-only normalization and uncertainty handling
- recommended_lines daily-review generation and active_operations storage
- daytime recall without recompute by default
- recompute triggers
- Todoist projection boundary
- long-form no nested fenced code block rule

Completed condition:

- updated files read back with sha
- repo config state updated
- no claim of runtime reflection until configured DELTA GPT/runtime schema is checked

Placement:

- active next, before code/projection changes.

### Task 2: Update DELTA history / review path structure and current operations source_refs

Purpose:

- Make daily history path convention visible in DELTA operations and source refs.

Targets:

- `systems/delta/history/daily/YYYY-MM-DD.md` existing May files if needed
- `systems/delta/history/monthly/YYYY-MM.md` existing May summary if needed
- `systems/delta/operations/active_operations.md`

Required changes:

- source_ref should prefer daily history for May actuals
- legacy `systems/delta/history/YYYY-MM.md` remains legacy/migration source, not current-position primary source
- operations should not store actual performance records

Completed condition:

- current DELTA operations references daily history for current_position evidence
- one-question L3 write target remains daily only
- monthly summary not updated for one-question records

Placement:

- active after Task 1, because operations shape depends on schema/rules.

### Task 3: Update DELTA operations shape with plan-gap fields and recommended_lines

Purpose:

- Make DELTA active_operations able to carry v0.6 daily review output.

Targets:

- `systems/delta/operations/active_operations.md`

Required fields / content:

- `plan_anchor`
- `actual_position` or `current_position`
- `expected_position`
- `gap_status`
- `operation_mode`
- `recovery_required`
- `recommended_lines`
  - fixed_at
  - source_review
  - must_line
  - standard_line
  - stretch_line
  - defer
  - recompute_triggers
- precise target units:
  - L1/L2 page_range / next_start_page
  - L3 question range / next_question

Completed condition:

- active_operations has no chapter-only executable study task where precise units are known
- recommended_lines are saved in active_operations
- daytime recall can be answered from active_operations without recomputation

Placement:

- active after Task 2.

### Task 4: Define and implement DELTA projection profile in service/schema

Purpose:

- Project DELTA operations to Todoist without corrupting ADAM projection.

Targets:

- `src/services/tasks/projection.js`
- `config/ai/adam_schema.yaml` or relevant Action schema if ADAM controls projection
- possibly DELTA action schema/config once canonical path is found or created

Preferred direction:

- Extend existing projection service with profile/context, not a new route.
- Avoid hardcoded ADAM ref in DELTA description.
- Preserve existing ADAM active projection behavior.

Candidate design:

- Add `projection_profile: adam | delta`
- Keep `target: active` if schema-minimal, or add `target: delta_active` if clearer
- Add context source_ref / source_root:
  - ADAM: `notes/04_operations/active_operations.md`
  - DELTA: `systems/delta/operations/active_operations.md`
- Build DELTA description with:
  - profile: DELTA
  - subject
  - study_type
  - material
  - topic
  - recommended_lines summary
  - source_ref
  - ref: systems/delta/operations/active_operations.md

Completed condition:

- dry_run for ADAM still produces existing ADAM payload shape or intentionally equivalent shape
- dry_run for DELTA produces DELTA description and correct ref
- schema/runtime reflection layers are recorded separately

Placement:

- next or active after DELTA operations shape is updated.

### Task 5: Runtime confirmation fixtures for v0.6 generation behavior

Purpose:

- Confirm DELTA behavior before claiming v0.6 runtime readiness.

Fixtures:

1. daily history write case
   - L3 one-question input writes only `systems/delta/history/daily/YYYY-MM-DD.md`
   - monthly summary and operations are not updated
2. monthly no-write case
   - one-question record does not update monthly summary
3. 2026-05-02 delayed case
   - expected: plan target Q9-1〜Q11, actual Q3-3/Q3 range
   - output: delayed / recovery_required
   - must_line stronger than survival_line
4. 7章完了 case
   - L1/L2 chapter-only input normalized to page_range or marked uncertain
5. 3章終わり case
   - L3 chapter-only input normalized to questions or marked uncertain
6. recommended_lines recall case
   - asks 今日の推奨ライン
   - reads active_operations and recalls saved recommended_lines without recompute
7. explicit recompute case
   - user gives trigger
   - recompute is explicitly labeled and recorded
8. Todoist dry_run case
   - DELTA operations -> Todoist payload, no apply
9. Todoist apply/write-back case
   - apply only when intended
   - write back todoist_task_id to DELTA operations or record limitation

Completed condition:

- fixtures produce evidence notes
- failures are recorded as unconfirmed / blocked, not treated as success

Placement:

- next after implementation tasks; apply fixture should remain gated.

### Task 6: Runtime/schema reflection task for DELTA write resources

Purpose:

- Resolve the current mismatch between repo code and runtime-visible schema.

Observed mismatch:

- repo code supports POST resources `delta_history` and `delta_operations`.
- ADAM runtime-visible `repoResourceWrite` schema currently allows only `notes | code | repo`.

Required distinction:

- repo implementation exists
- configured Action schema unknown / likely missing
- runtime-visible schema missing
- actual write behavior through exposed runtime tool unavailable unless using `resource=code` fallback

Options:

1. expose `delta_history` and `delta_operations` in Action schema
2. continue using `resource=code` for branch writes as a temporary ADAM-controlled path
3. create DELTA-specific runtime action schema if DELTA GPT owns these writes

Recommended:

- Treat schema reflection as a separate gate.
- Do not block v0.6 config design on runtime schema reflection.
- Do block v0.6 runtime completion on runtime-visible schema / behavior confirmation.

Completed condition:

- configured schema updated or explicit fallback chosen
- runtime-visible schema observed
- actual write behavior confirmed
- layers recorded separately

Placement:

- next, but before claiming DELTA runtime v0.6 complete.

---

## Active / next / future routing

### Active continuation candidates

1. `DELTA v0.6 config reflection proposal を作成する`
   - Updates/proposes changes for DELTA instruction and schema.
   - Reason: all later behavior depends on rules/schema.

2. `DELTA v0.6 operations shape proposal を作成する`
   - Updates/proposes current DELTA active_operations shape with recommended_lines and precise progress units.
   - Reason: projection and runtime fixtures need a correct operations source.

### Next candidates

3. `DELTA projection profile を projectTasks / projection service に設計・実装する`
4. `DELTA write resource schema reflection gate を整理する`
5. `DELTA v0.6 runtime confirmation fixtures を実行する`

### Future candidates

6. `DELTA dedicated append_daily_event action を検討する`
7. `monthly summary rebuild automation を設計する`
8. `review automation / analytics を v0.7 候補として整理する`

---

## Completed condition judgment for decomposition task

The active ADAM decomposition task can be closed after:

- this note is saved and read back
- active_operations source_ref includes this decomposition note or task notes mention it
- follow-up tasks are routed at least as active/next/future proposal

It should not be considered implementation complete for DELTA v0.6.

DELTA v0.6 implementation remains open until config, operations shape, projection profile, schema reflection, and runtime fixtures are completed and observed.

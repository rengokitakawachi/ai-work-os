# 2026-05-05 DELTA operations generation engine gap

## status

partially_fixed_repo_level_service_preflight_done_generator_pending_instruction_compressed_plan_fit_failed

## category

delta_operations_generation_regression

## severity

critical

## observed_at

2026-05-05

## reported_by

user

## symptom

DELTA could not reliably generate roadmap / plan / current_position based operations without manual correction.

Observed failures:

- D0-D6 seven-day rolling window was not preserved
- L1/L2 targets used vague page-less wording
- L3 targets used vague question-less wording
- 2026-06-30 milestone was not reverse-planned into realistic daily load
- D0-D6 did not connect to D7-target Next operations
- user_capacity, special_days, annual leave, and L3 unavailable days were not automatically reflected

Post-fix regressions:

- ADAM initially expanded `systems/delta/config/delta_instruction.md` to content_length 12747, exceeding the configured GPT instruction limit of 8000 characters.
- A later controller fixture looked structurally valid but incorrectly reintroduced 健康保険法 L3 into future operations even though 2026-05-04 daily history marks 健康保険法 L3 new exercises as completed.

## impact

DELTA could output a locally plausible short plan while leaving impossible load later.

Daily review could appear complete while operations generation remained structurally incomplete.

The oversized instruction could not be reflected into configured GPT, blocking runtime adoption of the fix.

A fixture can pass structure / quantitative checks while still failing plan-fit if it ignores completed_scope.

## root_cause

DELTA had rules for daily operations shape and recovery line calibration, but lacked an explicit operations generation engine:

- operation_rolling_window_generator
- next_operations_projection_generator
- quantitative_target_validator
- load_realism_guard
- reverse_planning_engine
- special_day_constraint_handler
- user_capacity_profile
- operations_write_preflight_check
- completed_scope_exclusion_validator

ADAM also failed to apply instruction-size discipline during the first fix. Detailed implementation rules were placed into instruction instead of being split between core instruction and supplemental schema / design note.

The fixture judged only formal completeness and load realism, not whether planned subjects had already completed their first-pass new exercise scope.

## fix_applied

Created design note:

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- sha: `a1704bd0cbdedac10f11f55fd6e0a493291452b8`

Created supplemental schema:

- `systems/delta/config/delta_operations_generation_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `51b294c328343ab0abc283a5f130a998590ceb25`

Implemented service-level preflight validator:

- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `d3232ce880aff83f31f0d3cb6fb811d509dc7cf4`

Preflight now checks:

- D0-D6 exist
- required day fields exist
- Next operations section exists
- each day has quantitative target or explicit rest/unavailable marker
- forbidden vague target terms are rejected in task / line targets
- high load is returned as warning

Compressed DELTA instruction under the 8000-character limit:

- `systems/delta/config/delta_instruction.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `66635dffaa60f56090380043da8b9d8dc1e4d95d`
- content_length: `6535`

Plan-fit correction:

- The controller fixture previously described as PASS相当 is corrected to plan-fit FAIL.
- Evidence: `systems/delta/history/daily/2026-05-04.md` states 健康保険法L3の新規演習は完了扱い and next scope is 国民年金法 L3 選択問題.
- Future operations must not re-add completed first-pass new exercise scope as new work.
- Completed subjects may appear only as deferred recovery / review targets, not as new first-pass operations.

## remaining_risk

The deterministic generator service is not fully implemented yet.

Current code prevents incomplete operations write, but it does not yet autonomously compute all target ranges from roadmap / plan / current_position.

Configured GPT reflection and runtime fixture are still pending.

Supplemental schema has not yet been safely merged into canonical `delta_schema.yaml`.

The service-level validator still needs a completed_scope exclusion check if completed scope data is available in operations / daily history input.

## recurrence_prevention

- Do not treat prompt guidance as sufficient when deterministic structure can be validated.
- DELTA daily review is incomplete if active_operations lacks D0-D6 or required fields.
- D7-target next operations must exist when a medium target exists.
- Vague targets must be rejected before write.
- Overload must be redistributed or marked compression_required / critical_delay.
- Keep configured GPT instruction under 8000 characters.
- Put detailed generation rules into supplemental schema / design note, and keep instruction to core always-on guards.
- Fixture PASS requires plan-fit, not just structure / quantitative / load checks.
- A completed first-pass scope must be excluded from new operations unless explicitly marked as recovery / review.

## linked_refs

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_operations_generation_schema.yaml`
- `src/services/delta-operations.js`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/daily/2026-05-04.md`

## next_disposition

- Expand the existing DELTA Immediate Gate to cover operations generation engine reflection / runtime fixture.
- Add deterministic generator service implementation as a follow-up active task after current configured GPT reflection gates are resolved.
- Merge supplemental schema into canonical `delta_schema.yaml` when safe.
- Add completed_scope_exclusion_validator to supplemental schema and runtime fixture acceptance criteria.

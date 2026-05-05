# 2026-05-05 DELTA operations generation engine gap

## status

partially_fixed_repo_level_service_preflight_done_generator_pending

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

## impact

DELTA could output a locally plausible short plan while leaving impossible load later.

Daily review could appear complete while operations generation remained structurally incomplete.

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

## fix_applied

Created design note:

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- sha: `a1704bd0cbdedac10f11f55fd6e0a493291452b8`

Updated DELTA instruction:

- `systems/delta/config/delta_instruction.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `09e7c2af7499688ed0b2bff5a82ab7bd5cb87e0f`

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

## remaining_risk

The deterministic generator service is not fully implemented yet.

Current code prevents incomplete operations write, but it does not yet autonomously compute all target ranges from roadmap / plan / current_position.

Configured GPT reflection and runtime fixture are still pending.

## recurrence_prevention

- Do not treat prompt guidance as sufficient when deterministic structure can be validated.
- DELTA daily review is incomplete if active_operations lacks D0-D6 or required fields.
- D7-target next operations must exist when a medium target exists.
- Vague targets must be rejected before write.
- Overload must be redistributed or marked compression_required / critical_delay.

## linked_refs

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_operations_generation_schema.yaml`
- `src/services/delta-operations.js`
- `systems/delta/operations/active_operations.md`

## next_disposition

- Expand the existing DELTA Immediate Gate to cover operations generation engine reflection / runtime fixture.
- Add deterministic generator service implementation as a follow-up active task after current configured GPT reflection gates are resolved.
- Merge supplemental schema into canonical `delta_schema.yaml` when safe.

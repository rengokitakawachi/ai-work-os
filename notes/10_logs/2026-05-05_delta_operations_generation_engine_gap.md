# 2026-05-05 DELTA operations generation engine gap

## status

partially_fixed_repo_level_service_preflight_strengthened_generator_pending_instruction_compressed_plan_fit_failed

## category

delta_operations_generation_regression

## severity

critical

## observed_at

2026-05-05

## reported_by

user / DELTA

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
- DELTA request memo identified that the core failure was pre-generation SSOT read / preflight insufficiency, not merely planning arithmetic.

## DELTA request memo findings

The DELTA memo requires the following corrections:

- hard fail when `operations/active_operations.md`, existing D0-D6, or existing Next operations are not read before generation
- hard fail when L1/L2 current_position or L3 current_position is missing
- hard fail when completed_subjects, special_days, or user_capacity are missing
- prevent moving to the next L1/L2 subject before the current subject has reached subject_end_page
- specifically prevent 厚生年金保険法 L1/L2 while 国民年金法 L1/L2 remains incomplete
- prevent 健康保険法 L3 first-round 選択/択一 from being regenerated after completion
- require L3 order per subject: 選択 → 択一
- treat the previous generation as invalid with `write_allowed: false`

## impact

DELTA could output a locally plausible short plan while leaving impossible load later.

Daily review could appear complete while operations generation remained structurally incomplete.

The oversized instruction could not be reflected into configured GPT, blocking runtime adoption of the fix.

A fixture can pass structure / quantitative checks while still failing plan-fit if it ignores completed_scope, current_position continuity, existing operations continuity, or L3 order.

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
- pre_generation_required_reads
- L1_L2_subject_continuity_guard
- completed_subject_guard
- L3_order_guard

ADAM also failed to apply instruction-size discipline during the first fix. Detailed implementation rules were placed into instruction instead of being split between core instruction and supplemental schema / design note.

The fixture judged only formal completeness and load realism, not whether planned subjects had already completed their first-pass new exercise scope or whether current subject continuity and L3 order were preserved.

## fix_applied

Created design note:

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- latest sha: `9b4ea2cf90315abd57f464303086722f70bfeb69`

Created / updated supplemental schema:

- `systems/delta/config/delta_operations_generation_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- latest sha: `1b906f2afe663d30b38fb6add66c75d0ea662b29`

Supplemental schema now includes:

- `pre_generation_required_reads`
- `hard_fail_if_missing`
- `L1_L2_subject_continuity_guard`
- `completed_subject_guard`
- `completed_scope_exclusion_validator`
- `L3_order_guard`
- `previous_generation_status: invalid`

Compressed DELTA instruction under the 8000-character limit:

- `systems/delta/config/delta_instruction.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `66635dffaa60f56090380043da8b9d8dc1e4d95d`
- content_length: `6535`

Implemented / strengthened service-level preflight validator:

- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- latest sha: `b6ad49c6c822f6f75c0ceefaa53457c4a9e2935d`

Preflight now checks or approximates:

- D0-D6 exist
- required day fields exist
- Next operations section exists
- each day has quantitative target or explicit rest/unavailable marker
- forbidden vague target terms are rejected in task / line targets
- high load is returned as warning
- read evidence for roadmap / plan / active / Next operations
- current_position evidence
- special_days evidence
- user_capacity evidence
- completed_scope evidence
- completed 健康保険法 L3 not reintroduced as new work
- 国民年金法 L1/L2 incomplete does not jump to 厚生年金保険法 L1/L2 without explicit completion override
- L3 order 選択 → 択一 per subject

## plan-fit correction

The controller fixture previously described as PASS相当 is corrected to plan-fit FAIL.

Evidence: `systems/delta/history/daily/2026-05-04.md` states 健康保険法L3の新規演習は完了扱い and next scope is 国民年金法 L3 選択問題.

Future operations must not re-add completed first-pass new exercise scope as new work.

Completed subjects may appear only as deferred recovery / review / second-pass targets, not as new first-pass operations.

The previous generation status is:

```yaml
previous_generation_status: invalid
reason:
  - active_operations_not_read
  - next_operations_not_read
  - L1_L2_current_position_not_confirmed
  - current_L1_L2_subject_skipped
  - completed_health_insurance_reintroduced
  - L3_order_rule_violated
write_allowed: false
```

## remaining_risk

The deterministic generator service is not fully implemented yet.

Current code prevents many incomplete operations writes, but it does not yet autonomously compute all target ranges from roadmap / plan / current_position.

Configured GPT reflection and runtime fixture are still pending.

Supplemental schema has not yet been safely merged into canonical `delta_schema.yaml`.

Service-level preflight can only inspect the submitted operations content and cannot truly prove all source files were read unless read evidence / metadata is passed into the write path or embedded in the generated operations.

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
- Operations generation must hard fail if existing active_operations / existing Next operations / current_position / completed_subjects / special_days / user_capacity are missing.
- L1/L2 current subject must not be skipped before subject_end_page.
- L3 must follow 選択 → 択一 per subject.

## linked_refs

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_operations_generation_schema.yaml`
- `src/services/delta-operations.js`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/daily/2026-05-04.md`
- DELTA request memo from user upload 2026-05-05

## next_disposition

- Expand the existing DELTA Immediate Gate acceptance criteria to include pre-generation required reads, L1/L2 subject continuity, completed_subject guard, and L3 order guard.
- Add deterministic generator service implementation as a follow-up active task after current configured GPT reflection gates are resolved.
- Merge supplemental schema into canonical `delta_schema.yaml` when safe.
- Consider passing read-evidence metadata into `delta_operations` write path so service can prove required source reads, rather than inferring from content.

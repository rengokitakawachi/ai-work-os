# 2026-05-05 DELTA operations generation engine gap

## status

partially_fixed_read_evidence_write_path_added_generator_pending_runtime_pending

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

- DELTA instruction was once expanded to 12747 characters, above the 8000-character configured GPT limit.
- A later controller fixture looked structurally valid but reintroduced completed 健康保険法 L3.
- DELTA memo identified pre-generation SSOT read / preflight insufficiency as the core failure.

## DELTA request memo findings

Required corrections:

- hard fail when active_operations, existing D0-D6, or existing Next operations are not read before generation
- hard fail when L1/L2 or L3 current_position is missing
- hard fail when completed_subjects, special_days, or user_capacity are missing
- prevent moving to next L1/L2 subject before current subject reaches subject_end_page
- prevent 厚生年金保険法 L1/L2 while 国民年金法 L1/L2 remains incomplete
- prevent 健康保険法 L3 first-round 選択/択一 from being regenerated after completion
- require L3 order per subject: 選択 → 択一
- treat previous generation as invalid with `write_allowed: false`

## root_cause

DELTA lacked deterministic generation / preflight layers for:

- pre_generation_required_reads
- operation_rolling_window_generator
- next_operations_projection_generator
- quantitative_target_validator
- load_realism_guard
- reverse_planning_engine
- completed_scope_exclusion_validator
- L1_L2_subject_continuity_guard
- completed_subject_guard
- L3_order_guard
- read_evidence validation

## fix_applied

Design note:

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- sha: `9b4ea2cf90315abd57f464303086722f70bfeb69`

Supplemental schema:

- `systems/delta/config/delta_operations_generation_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `1b906f2afe663d30b38fb6add66c75d0ea662b29`

DELTA instruction compressed:

- `systems/delta/config/delta_instruction.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `66635dffaa60f56090380043da8b9d8dc1e4d95d`
- content_length: `6535`

Service preflight strengthened:

- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `3c12c808dc0b6856f53c5284f8e19606af5a0a76`

API write path updated:

- `api/repo-resource.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `44e3d14af162694d06f0c15e0561db5ad37662ab`

Action schema updated:

- `systems/delta/config/delta_action_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `77015d8106d11353c0a2c71714025ae49127fbce`

## implemented preflight checks

- D0-D6 exist
- required day fields exist
- Next operations section exists
- each day has quantitative target or explicit rest / unavailable marker
- forbidden vague target terms are rejected in target lines
- high load is returned as warning
- read_evidence roles and paths are required for roadmap, plan, active_operations, latest_daily_history, completed_subjects, special_days, user_capacity
- content must still contain current_position, special_days, user_capacity, and completed_scope evidence
- completed 健康保険法 L3 is rejected if reintroduced as new work
- 国民年金法 L1/L2 incomplete cannot jump to 厚生年金保険法 L1/L2 without explicit completion override
- L3 order 選択 → 択一 is checked per subject

## previous generation status

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

- deterministic generator service is not implemented yet
- configured GPT reflection and runtime-visible schema are pending
- supplemental schema has not been merged into canonical `delta_schema.yaml`
- read_evidence is now supported in repo/API/schema code, but actual runtime Action reflection must be confirmed
- service preflight can prove submitted metadata; it still cannot prove source contents were semantically used correctly without a generator service or richer source snapshots

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path should carry read_evidence, not rely only on content inference
- detailed rules belong in supplemental schema / design note; instruction stays under 8000 characters

## linked_refs

- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_operations_generation_schema.yaml`
- `systems/delta/config/delta_action_schema.yaml`
- `src/services/delta-operations.js`
- `api/repo-resource.js`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/daily/2026-05-04.md`
- DELTA request memo from user upload 2026-05-05

## next_disposition

- Confirm configured GPT Action reflection for `read_evidence`
- Run runtime fixture with missing read_evidence and expect `DELTA_OPERATIONS_PREFLIGHT_FAILED`
- Run runtime fixture with invalid completed health insurance reintroduction and expect reject
- Add deterministic generator service implementation as follow-up active task
- Merge supplemental schema into canonical `delta_schema.yaml` when safe

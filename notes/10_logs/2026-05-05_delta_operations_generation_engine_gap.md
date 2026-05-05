# 2026-05-05 DELTA operations generation engine gap

## status

fixture_1A_1B_pass_1C_failed_guard_strengthened_retest_pending

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
- DELTA Action schema import failed because `deltaResourceWrite` operation description length was 334, exceeding the 300-character configured GPT limit.
- Runtime fixture after Action schema update rejected writes, but not via expected `DELTA_OPERATIONS_PREFLIGHT_FAILED`; it returned legacy / alternate content marker validation with `INVALID_REQUEST` and `missing_markers`.
- Feature-branch fixture with `branch=feature/atlas-pre-delta-foundation` accepted invalid content that reintroduced completed 健康保険法 L3 as D7+ new first-pass work.
- Fixture 1C accepted a plan that skipped from incomplete 国民年金法 L1/L2 to 厚生年金保険法 L1/L2.

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

Runtime root cause:

- configured Action schema update alone was insufficient
- `branch=feature/atlas-pre-delta-foundation` selects the GitHub content target branch, not deployed backend code branch
- deployed `/api/repo-resource` was executing main backend code
- main `src/services/delta-operations.js` still had old marker-only validation at the time of failed fixture
- main `api/repo-resource.js` did not pass `read_evidence` into `updateDeltaOperations`
- L1/L2 continuity validator used a narrow regex and did not catch YAML-style `subject / completion_status / next_start_page` current_position

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

Action schema updated for read_evidence and import limit:

- `systems/delta/config/delta_action_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- latest sha: `610716c9a98a5676dad5b7cc72d5d9d84f8c59e8`
- version: `0.6.3`
- user reported configured GPT Action schema updated successfully

Main runtime alignment applied:

- `src/services/delta-operations.js`
- branch: `main`
- sha: `0bd7d25285e4e58d8b76498f6393e1d0f9d3ee7c`
- old marker-only validator replaced with read_evidence / plan-fit preflight
- L1/L2 continuity guard strengthened for YAML current_position format

Feature branch service alignment applied:

- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `0bd7d25285e4e58d8b76498f6393e1d0f9d3ee7c`

Main API pass-through applied:

- `api/repo-resource.js`
- branch: `main`
- sha: `ebe2be2254a64b0792e9d150513b9341c803dde2`
- preserves repo history/show/grep features
- passes `read_evidence` from request body into `updateDeltaOperations`

## runtime fixture results

### Fixture 1A: `delta_operations` update without `read_evidence`

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
request_id: 05a58e50-a7ae-4409-b8bb-a0d5cd168cfe
sha_before: af62696214acfcf8817728ee9f97ae24e39c0011
sha_after: af62696214acfcf8817728ee9f97ae24e39c0011
judgment: pass
```

### Fixture 1B: completed_scope invalid fixture

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
request_id: 0e7ba49f-1435-4b75-900e-892541e382b6
required_error_observed: completed_health_insurance_L3_reintroduced_as_new_work
sha_before: af62696214acfcf8817728ee9f97ae24e39c0011
sha_after: af62696214acfcf8817728ee9f97ae24e39c0011
judgment: pass
```

### Fixture 1C: L1/L2 continuity invalid fixture

Condition:

```yaml
current_position:
  L1:
    subject: 国民年金法
    completion_status: incomplete
    next_start_page: P220
  L2:
    subject: 国民年金法
    completion_status: incomplete
    next_start_page: P158
next_operations:
  - 厚生年金保険法 L1 P1〜P35（35ページ）
  - 厚生年金保険法 L2 P1〜P35（35ページ）
```

Observed before guard strengthening:

```yaml
write: accepted
status: UPDATED
sha_after_invalid_write: 0132fda8c1d41d167dc0df749e926f0167b8942c
request_id: 0e1ee1e4-af63-458a-a31a-2866d1c0044f
preflight:
  ok: true
  errors: []
  warnings: []
judgment: fail
```

Recovery:

```yaml
initial_exact_restore: rejected
reason:
  - forbidden_Day2_vague_target:着手
warning:
  - l1_l2_page_count_above_guard:54
sanitized_restore: success
restored_sha: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
request_id: 64267cbc-5f35-463d-b439-8e01cbf000e3
read_back_confirmed: true
```

Fix after Fixture 1C FAIL:

```yaml
validator_change:
  - removed dependency on narrow NATIONAL_PENSION_INCOMPLETE_PATTERN
  - added hasIncompleteNationalPensionL1L2
  - detects YAML current_position with subject / completion_status / next_start_page
  - rejects employee pension L1/L2 in Next operations unless national pension completion override is explicit
status: retest_pending
expected_error: current_L1_L2_subject_skipped_before_completion
```

## implemented preflight checks now in main backend

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

## remaining_risk

- Fixture 1C retest is pending after guard strengthening
- L3 order fixture is pending
- positive valid-write fixture is pending
- deterministic generator service is not implemented yet
- supplemental schema has not been merged into canonical `delta_schema.yaml`
- service preflight can prove submitted metadata, but deterministic semantic use of sources still needs generator implementation
- restored operations SHA is no longer original `af626...`; current restored SHA is `b5514...` due to sanitized restoration

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path should carry read_evidence, not rely only on content inference
- validator fixtures must include both prose and YAML current_position shapes
- detailed rules belong in supplemental schema / design note; instruction stays under 8000 characters
- Action schema operation descriptions must stay under configured GPT import limits
- Runtime fixture must distinguish configured Action schema reflection from deployed backend actual behavior
- Never use branch parameter success as evidence that backend service code is running that branch

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

Immediate:

- rerun Fixture 1C and expect `current_L1_L2_subject_skipped_before_completion`
- run L3 order fixture and expect `L3_order_violation_*_takuitsu_before_selected`

After negative fixtures PASS:

- run positive valid-write fixture or dry validation path
- add deterministic generator service implementation as follow-up active task

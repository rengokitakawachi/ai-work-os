# 2026-05-05 DELTA operations generation engine gap

## status

fixture_1A_1B_1C_pass_L3_order_guard_runtime_reflected_fixture_evidence_markers_missing

## category

delta_operations_generation_regression

## severity

critical

## observed_at

2026-05-05

## reported_by

user / DELTA

## summary

Confirmed PASS:

- Fixture 1A: missing `read_evidence` is rejected
- Fixture 1B: completed 健康保険法 L3 first-pass reintroduction is rejected
- Fixture 1C: incomplete 国民年金法 L1/L2 -> 厚生年金保険法 L1/L2 skip is rejected

Confirmed runtime reflection:

- L3 line-based validator version is runtime-visible: `delta_operations_preflight_2026_05_05_L3_order_line_guard`

Pending:

- L3 order fixture retest with required content evidence markers
- positive valid-write fixture
- deterministic generator service implementation

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

Runtime / validator causes found during fixtures:

- configured Action schema update alone was insufficient
- `branch=feature/atlas-pre-delta-foundation` selects GitHub content target branch, not deployed backend code branch
- main `api/repo-resource.js` initially did not pass `read_evidence` into `updateDeltaOperations`
- L1/L2 continuity validator was too narrow and repeatedly missed actual fixture shape
- `hasExplicitNationalPensionCompletionBeforeEmployeePension()` treated `完了` inside `未完了` as an explicit completion override
- first L3 order fixture was not isolating the target guard
- isolated L3 order fixture proved old `validateL3Order()` did not detect table / line-shaped `国民年金法 L3 択一 Q1-1〜Q1-16（16問）`
- latest L3 order retest still did not isolate target guard because content evidence markers for roadmap and existing operations read were missing

## fix_applied

- `systems/delta/config/delta_instruction.md`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `66635dffaa60f56090380043da8b9d8dc1e4d95d`
  - content_length: `6535`

- `systems/delta/config/delta_action_schema.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `610716c9a98a5676dad5b7cc72d5d9d84f8c59e8`
  - version: `0.6.3`

- `systems/delta/config/delta_operations_generation_schema.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `1b906f2afe663d30b38fb6add66c75d0ea662b29`

- `api/repo-resource.js`
  - branch: `main`
  - sha: `ebe2be2254a64b0792e9d150513b9341c803dde2`

- `src/services/delta-operations.js`
  - branch: `main`
  - sha: `acbc1d7b2dac46e4712d82c6d9da566c8f27080e`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `acbc1d7b2dac46e4712d82c6d9da566c8f27080e`
  - validator_version: `delta_operations_preflight_2026_05_05_L3_order_line_guard`

## latest L3 order guard change

```yaml
validator_change:
  - replaced broad matchAll order check with line-based Next operations scan
  - tracks each subject independently
  - explicit selected completion markers allow 択一:
      - selected_completion_status: completed
      - selected_questions: completed
      - L3_selected: completed
      - completed_selected: true
      - L3選択完了
      - 選択完了
  - Next operations line containing subject + L3 + 選択 + Q範囲 marks selectedSeen
  - Next operations line containing subject + L3 + 択一 + Q範囲 before selectedSeen rejects
expected_error: L3_order_violation_国民年金法_takuitsu_before_selected
```

## runtime fixture results

### Fixture 1A: missing read_evidence

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
required_error_observed: missing_read_evidence_role:roadmap
sha_before: af62696214acfcf8817728ee9f97ae24e39c0011
sha_after: af62696214acfcf8817728ee9f97ae24e39c0011
judgment: pass
```

### Fixture 1B: completed_scope invalid fixture

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
required_error_observed: completed_health_insurance_L3_reintroduced_as_new_work
sha_before: af62696214acfcf8817728ee9f97ae24e39c0011
sha_after: af62696214acfcf8817728ee9f97ae24e39c0011
judgment: pass
```

### Fixture 1C: L1/L2 continuity invalid fixture

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
required_error_observed: current_L1_L2_subject_skipped_before_completion
validator_version: delta_operations_preflight_2026_05_05_1C_completion_override_fix
request_id: 8adcbfdd-f836-4f8f-b9eb-f63a82541e1b
basis_sha: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
sha_after: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
judgment: pass
```

### L3 order fixture attempts

Attempt 1:

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
request_id: f6825d69-6c99-4a0d-be06-e7a4dd7b3035
errors:
  - missing_completed_scope_evidence
  - missing_Day4_quantitative_target
judgment: inconclusive_fixture_defect
```

Attempt 2 isolated:

```yaml
write: accepted
sha_after_invalid_write: da4f3e06c37697a1261d44eeea479f0f86591450
request_id: 79f9b024-c266-45ff-bb12-8845bbc6ac73
validator_version: delta_operations_preflight_2026_05_05_1C_completion_override_fix
restored_sha: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
judgment: fail_guard_not_effective
```

Attempt 3 after line-based guard:

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
request_id: 456364ab-af9c-41cd-a649-0c34acf05515
validator_version: delta_operations_preflight_2026_05_05_L3_order_line_guard
errors:
  - missing_roadmap_read_evidence_in_content
  - missing_existing_active_or_next_operations_read_evidence_in_content
sha_before: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
sha_after: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
judgment: inconclusive_fixture_defect_runtime_reflection_confirmed
```

Current status:

```yaml
l3_order_fixture:
  latest_guard: line_based_L3_order_guard_added
  runtime_version_observed: true
  retest_required: true
  expected_validator_version: delta_operations_preflight_2026_05_05_L3_order_line_guard
  expected_error: L3_order_violation_国民年金法_takuitsu_before_selected
  required_content_markers:
    - roadmap or roadmap_anchor or roadmap_phase
    - existing_next_operations_read or existing_next_operations_was_read or source_of_truth.operations_role or current_position_primary_source
```

## remaining_risk

- L3 order fixture retest is pending
- positive valid-write fixture is pending
- deterministic generator service is not implemented yet
- restored operations SHA is no longer original `af626...`; current basis SHA is `b5514...`

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Guard-specific fixtures must isolate the target validator and satisfy all unrelated required fields
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path must carry read_evidence
- content must also include required evidence markers, not only read_evidence payload
- validator fixtures must include prose, YAML block, subject-first YAML, table form, separated column form, reordered YAML forms, and Japanese negative words such as `未完了`
- preflight response should include validator_version so runtime code version can be verified
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

- rerun L3 order fixture with content markers `roadmap_anchor` and `existing_next_operations_read`
- expect `L3_order_violation_国民年金法_takuitsu_before_selected`
- confirm validator_version `delta_operations_preflight_2026_05_05_L3_order_line_guard`

After negative fixtures PASS:

- run positive valid-write fixture or dry validation path
- add deterministic generator service implementation as follow-up active task

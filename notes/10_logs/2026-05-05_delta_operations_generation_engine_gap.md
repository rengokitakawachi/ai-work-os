# 2026-05-05 DELTA operations generation engine gap

## status

fixture_1A_1B_pass_1C_failed_three_times_table_guard_added_retest_pending

## category

delta_operations_generation_regression

## severity

critical

## observed_at

2026-05-05

## reported_by

user / DELTA

## summary

DELTA operations generation / write preflight has been hardened after repeated runtime fixture failures.

Confirmed PASS:

- Fixture 1A: missing `read_evidence` is rejected
- Fixture 1B: completed 健康保険法 L3 first-pass reintroduction is rejected

Still pending:

- Fixture 1C retest after table-aware L1/L2 continuity guard
- L3 order fixture
- positive valid-write fixture
- deterministic generator service implementation

## observed failures

- D0-D6 seven-day rolling window was not preserved
- L1/L2 targets used vague page-less wording
- L3 targets used vague question-less wording
- 2026-06-30 milestone was not reverse-planned into realistic daily load
- D0-D6 did not connect to D7-target Next operations
- user_capacity, special_days, annual leave, and L3 unavailable days were not automatically reflected
- DELTA instruction exceeded configured GPT 8000-character limit during first fix
- Action schema operation description exceeded configured GPT import limit
- feature branch fixture once accepted completed 健康保険法 L3 as new first-pass work
- Fixture 1C accepted incomplete 国民年金法 L1/L2 -> 厚生年金保険法 L1/L2 three times before table-aware guard

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

Runtime / validator root causes:

- configured Action schema update alone was insufficient
- `branch=feature/atlas-pre-delta-foundation` selects GitHub content target branch, not deployed backend code branch
- main `api/repo-resource.js` initially did not pass `read_evidence` into `updateDeltaOperations`
- L1/L2 continuity validator was too narrow and repeatedly missed actual fixture shape
- employee pension L1/L2 detector likely missed table / separated forms in Next operations

## fix_applied

DELTA instruction compressed:

- `systems/delta/config/delta_instruction.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `66635dffaa60f56090380043da8b9d8dc1e4d95d`
- content_length: `6535`

Action schema updated:

- `systems/delta/config/delta_action_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `610716c9a98a5676dad5b7cc72d5d9d84f8c59e8`
- version: `0.6.3`

Supplemental schema:

- `systems/delta/config/delta_operations_generation_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `1b906f2afe663d30b38fb6add66c75d0ea662b29`

Main API pass-through:

- `api/repo-resource.js`
- branch: `main`
- sha: `ebe2be2254a64b0792e9d150513b9341c803dde2`

Latest service validator:

- `src/services/delta-operations.js`
- branch: `main`
- sha: `d3e68e902afb42ffc0bf4d8e8e8ad51b341916a0`
- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `d3e68e902afb42ffc0bf4d8e8e8ad51b341916a0`
- validator_version: `delta_operations_preflight_2026_05_05_1C_table_guard`

Latest continuity guard change:

```yaml
validator_change:
  - added validator_version to preflight response
  - detects 国民年金法 + incomplete/未完了 + P158/P220 + L1/L2 broadly across full content
  - detects 厚生年金保険法 L1/L2 in Next operations line form
  - detects 厚生年金保険法 L1/L2 in table / separated form
  - rejects unless 国民年金法 completion override is explicit
expected_error: current_L1_L2_subject_skipped_before_completion
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

Failures observed:

```yaml
first_fail:
  write: accepted
  sha_after_invalid_write: 0132fda8c1d41d167dc0df749e926f0167b8942c
  request_id: 0e1ee1e4-af63-458a-a31a-2866d1c0044f
second_fail:
  write: accepted
  sha_after_invalid_write: 6c92c5b2ed0d1c34a7b7ca3827be0ac495ede164
  request_id: 13f001a5-2202-4b53-8ace-6ae0763bcf23
third_fail:
  write: accepted
  sha_after_invalid_write: 2b611ec7216e22f9aa9235f379897e02deac59cb
  request_id: d27a77db-a073-421c-8094-be6c15b7a3d4
```

Recovery:

```yaml
current_restored_sha: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
restored_to_basis_sha: true
```

Current status:

```yaml
fixture_1C:
  judgment: fail_three_times
  latest_guard: table_aware_hard_guard_added
  retest_required: true
  expected_error: current_L1_L2_subject_skipped_before_completion
  expected_validator_version: delta_operations_preflight_2026_05_05_1C_table_guard
```

## remaining_risk

- Fixture 1C retest is pending after table-aware guard
- L3 order fixture is pending
- positive valid-write fixture is pending
- deterministic generator service is not implemented yet
- restored operations SHA is no longer original `af626...`; current basis SHA is `b5514...`

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path must carry read_evidence
- validator fixtures must include prose, YAML block, subject-first YAML, table form, separated column form, and reordered YAML forms
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

- rerun Fixture 1C and expect `current_L1_L2_subject_skipped_before_completion`
- confirm preflight response includes `validator_version: delta_operations_preflight_2026_05_05_1C_table_guard`
- run L3 order fixture and expect `L3_order_violation_*_takuitsu_before_selected`

After negative fixtures PASS:

- run positive valid-write fixture or dry validation path
- add deterministic generator service implementation as follow-up active task

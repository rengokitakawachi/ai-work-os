# 2026-05-05 DELTA operations generation engine gap

## status

fixture_1A_1B_pass_1C_refailed_guard_broadened_retest_pending

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

- DELTA instruction exceeded configured GPT 8000-character limit during first fix.
- A controller fixture reintroduced completed 健康保険法 L3.
- DELTA Action schema import failed due to operation description length >300 characters.
- Runtime used deployed main backend, not feature branch service code.
- Feature-branch fixture once accepted completed 健康保険法 L3 as new first-pass work.
- Fixture 1C twice accepted a plan that skipped from incomplete 国民年金法 L1/L2 to 厚生年金保険法 L1/L2.

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
- `branch=feature/atlas-pre-delta-foundation` selects the GitHub content target branch, not deployed backend code branch
- main `api/repo-resource.js` initially did not pass `read_evidence` into `updateDeltaOperations`
- L1/L2 continuity validator was too narrow and did not catch YAML-style `subject / completion_status / next_start_page` current_position
- first continuity fix searched only near `current_position`, which still missed the actual fixture shape

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

Action schema updated:

- `systems/delta/config/delta_action_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `610716c9a98a5676dad5b7cc72d5d9d84f8c59e8`
- version: `0.6.3`

Main API pass-through:

- `api/repo-resource.js`
- branch: `main`
- sha: `ebe2be2254a64b0792e9d150513b9341c803dde2`

Latest service validator:

- `src/services/delta-operations.js`
- branch: `main`
- sha: `446e1b8a4c0591cbe945907033ee3fd4a187a524`
- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `446e1b8a4c0591cbe945907033ee3fd4a187a524`

Latest continuity guard change:

```yaml
validator_change:
  - no longer limits detection to current_position + 2500 chars
  - scans full content for YAML L1/L2 subject/completion_status/next_start_page patterns
  - detects L1 国民年金法 incomplete next_start_page P220
  - detects L2 国民年金法 incomplete next_start_page P158
  - detects subject-first YAML form
  - detects prose form
  - rejects 厚生年金保険法 L1/L2 in Next operations unless 国民年金法 completion override is explicit
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

First observed failure:

```yaml
write: accepted
sha_after_invalid_write: 0132fda8c1d41d167dc0df749e926f0167b8942c
request_id: 0e1ee1e4-af63-458a-a31a-2866d1c0044f
judgment: fail
```

Second observed failure after first guard strengthening:

```yaml
write: accepted
sha_after_invalid_write: 6c92c5b2ed0d1c34a7b7ca3827be0ac495ede164
request_id: 13f001a5-2202-4b53-8ace-6ae0763bcf23
preflight:
  ok: true
  errors: []
  warnings:
    - l1_l2_page_count_above_guard:61,62
judgment: fail
```

Recovery:

```yaml
current_restored_sha: b5514dedebc187c51d36e7d6609e5c2416d2eb3f
restored_to_basis_sha: true
```

Current status:

```yaml
fixture_1C:
  judgment: fail_twice
  latest_guard: broadened_full_content_scan
  retest_required: true
  expected_error: current_L1_L2_subject_skipped_before_completion
```

## implemented preflight checks now in main backend

- D0-D6 exist
- required day fields exist
- Next operations section exists
- each day has quantitative target or explicit rest / unavailable marker
- forbidden vague target terms are rejected in target lines
- high load is returned as warning
- read_evidence roles and paths are required
- content must contain current_position, special_days, user_capacity, and completed_scope evidence
- completed 健康保険法 L3 is rejected if reintroduced as new work
- 国民年金法 L1/L2 incomplete should reject 厚生年金保険法 L1/L2 without explicit completion override
- L3 order 選択 → 択一 is checked per subject

## remaining_risk

- Fixture 1C retest is pending after full-content guard broadening
- L3 order fixture is pending
- positive valid-write fixture is pending
- deterministic generator service is not implemented yet
- supplemental schema has not been merged into canonical `delta_schema.yaml`
- restored operations SHA is no longer original `af626...`; current basis SHA is `b5514...`

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path must carry read_evidence
- validator fixtures must include prose, YAML block, subject-first YAML, and reordered YAML forms
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

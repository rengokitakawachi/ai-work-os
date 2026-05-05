# 2026-05-05 DELTA operations generation engine gap

## status

runtime_write_safety_failed_backend_actual_behavior_not_aligned

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

ADAM also failed to keep Action schema operation descriptions within configured GPT import limits during the first read_evidence schema update.

Runtime behavior now shows a stronger root cause:

- configured Action schema update alone is insufficient
- `branch=feature/atlas-pre-delta-foundation` appears to select the GitHub content target branch, not the deployed backend code branch
- deployed `/api/repo-resource` actual behavior is not aligned with `feature/atlas-pre-delta-foundation` service implementation
- feature-branch repo code contains `DELTA_OPERATIONS_PREFLIGHT_FAILED` and completed_scope validators, but runtime write accepted invalid content

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

Service preflight strengthened in feature branch:

- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `3c12c808dc0b6856f53c5284f8e19606af5a0a76`

API write path updated in feature branch:

- `api/repo-resource.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `44e3d14af162694d06f0c15e0561db5ad37662ab`

Action schema updated for read_evidence, then fixed for import limit:

- `systems/delta/config/delta_action_schema.yaml`
- branch: `feature/atlas-pre-delta-foundation`
- latest sha: `610716c9a98a5676dad5b7cc72d5d9d84f8c59e8`
- version: `0.6.3`
- user reported configured GPT Action schema updated successfully

## runtime fixture results

### Fixture 1A: `delta_operations` update without `read_evidence` on main/default runtime

Observed:

```yaml
write: rejected
error.code: INVALID_REQUEST
error.message: delta_operations content failed validation
details.missing_markers:
  - "# delta active_operations"
  - "## Day0"
  - "## Rules"
  - "Delta operations are learning execution order, not calendar schedule."
  - "Daily review updates learning history and next operations."
```

Expected:

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
details.errors:
  - missing_read_evidence_role:roadmap
  - missing_read_evidence_role:plan
  - missing_read_evidence_role:active_operations
  - missing_read_evidence_role:latest_daily_history
  - missing_read_evidence_role:completed_subjects
  - missing_read_evidence_role:special_days
  - missing_read_evidence_role:user_capacity
```

Judgment:

```yaml
fixture_1A:
  write_rejection: pass
  expected_error_code: fail
  read_evidence_validator_observed: fail
  overall: partial_pass_backend_runtime_mismatch
```

### Fixture 1B: feature branch invalid completed_scope fixture

Condition:

```yaml
branch: feature/atlas-pre-delta-foundation
read_evidence: present
invalid_content: 健康保険法L3を2026-05-04完了後にD7以降の新規first-passとして再投入
```

Expected:

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
details.errors:
  - completed_health_insurance_L3_reintroduced_as_new_work
```

Observed:

```yaml
write: accepted
status: UPDATED
sha_after_invalid_write: 017a2248bcd914216e55c9b0929fbec54200596e
request_id: 1370040c-a18c-4821-a61e-a79c0b2711a7
```

Recovery:

```yaml
restored: true
restored_sha: af62696214acfcf8817728ee9f97ae24e39c0011
request_id: f7e83759-2798-4894-bcb7-23acb652693b
read_back_confirmed: true
```

Judgment:

```yaml
fixture_1B:
  expected_reject: fail
  invalid_write_accepted: true
  restoration_completed: true
  overall: fail_write_safety_regression
```

## implemented preflight checks in feature branch

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
- configured GPT Action schema appears updated, but backend actual behavior is not aligned with feature branch implementation
- `branch` parameter does not prove backend code branch; it appears to select content target branch only
- supplemental schema has not been merged into canonical `delta_schema.yaml`
- read_evidence is supported in repo/API/schema code on feature branch, but actual runtime path has not observed it
- service preflight can prove submitted metadata only after runtime backend deploy / route alignment
- write safety is currently not guaranteed for semantically invalid but structurally marker-compatible operations content

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path should carry read_evidence, not rely only on content inference
- detailed rules belong in supplemental schema / design note; instruction stays under 8000 characters
- Action schema operation descriptions must stay under configured GPT import limits, currently observed as 300 characters for operation description
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

Immediate blocker:

- confirm deployed `/api/repo-resource` source / branch / deployment version
- deploy or merge `feature/atlas-pre-delta-foundation` backend changes so actual runtime includes read_evidence and completed_scope validators
- add a lightweight backend version / validator marker endpoint or response marker so runtime can prove validator version

After backend alignment:

- re-run Fixture 1A and expect `DELTA_OPERATIONS_PREFLIGHT_FAILED` for missing read_evidence
- re-run Fixture 1B and expect `completed_health_insurance_L3_reintroduced_as_new_work`
- run L1/L2 continuity fixture and L3 order fixture
- only then continue deterministic generator service implementation

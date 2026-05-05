# 2026-05-05 DELTA operations generation engine gap

## status

fixture_1A_1B_pass_continuity_and_order_fixtures_pending

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

Feature branch service/API changes:

- `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `3c12c808dc0b6856f53c5284f8e19606af5a0a76`
- `api/repo-resource.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `44e3d14af162694d06f0c15e0561db5ad37662ab`

Main runtime alignment applied:

- `src/services/delta-operations.js`
- branch: `main`
- sha: `3c12c808dc0b6856f53c5284f8e19606af5a0a76`
- old marker-only validator replaced with read_evidence / plan-fit preflight

Main API pass-through applied:

- `api/repo-resource.js`
- branch: `main`
- sha: `ebe2be2254a64b0792e9d150513b9341c803dde2`
- preserves repo history/show/grep features
- passes `read_evidence` from request body into `updateDeltaOperations`

## runtime fixture results

### Fixture 1A: `delta_operations` update without `read_evidence`

Observed after main backend alignment:

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
request_id: 05a58e50-a7ae-4409-b8bb-a0d5cd168cfe
details.errors:
  - missing_read_evidence_role:roadmap
  - missing_read_evidence_role:plan
  - missing_read_evidence_role:active_operations
  - missing_read_evidence_role:latest_daily_history
  - missing_read_evidence_role:completed_subjects
  - missing_read_evidence_role:special_days
  - missing_read_evidence_role:user_capacity
  - missing_read_evidence_path:roadmap/delta_roadmap.md
  - missing_read_evidence_path:plan/2026_sharoushi_exam_plan.md
  - missing_read_evidence_path:operations/active_operations.md
  - missing_read_evidence_path:latest_daily_history
sha_before: af62696214acfcf8817728ee9f97ae24e39c0011
sha_after: af62696214acfcf8817728ee9f97ae24e39c0011
```

Judgment:

```yaml
fixture_1A:
  write_rejection: pass
  expected_error_code: pass
  read_evidence_validator_observed: pass
  sha_unchanged: pass
  overall: pass
```

### Fixture 1B: completed_scope invalid fixture

Condition:

```yaml
branch: feature/atlas-pre-delta-foundation
read_evidence: present
invalid_content: 健康保険法L3を2026-05-04完了後にD7以降の新規first-passとして再投入
```

Observed after main backend alignment:

```yaml
write: rejected
error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
request_id: 0e7ba49f-1435-4b75-900e-892541e382b6
details.errors:
  - completed_health_insurance_L3_reintroduced_as_new_work
  - forbidden_Day6_vague_target:完了方向
details.warnings:
  - l3_multiple_choice_count_above_guard:47
sha_before: af62696214acfcf8817728ee9f97ae24e39c0011
sha_after: af62696214acfcf8817728ee9f97ae24e39c0011
```

Judgment:

```yaml
fixture_1B:
  write_rejection: pass
  expected_error_code: pass
  completed_scope_validator_observed: pass
  sha_unchanged: pass
  additional_vague_target_guard_observed: pass
  load_warning_observed: pass
  overall: pass
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

- L1/L2 continuity fixture is pending
- L3 order fixture is pending
- positive valid-write fixture is pending
- deterministic generator service is not implemented yet
- supplemental schema has not been merged into canonical `delta_schema.yaml`
- service preflight can prove submitted metadata, but deterministic semantic use of sources still needs generator implementation

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path should carry read_evidence, not rely only on content inference
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

- run L1/L2 continuity fixture and expect `current_L1_L2_subject_skipped_before_completion`
- run L3 order fixture and expect `L3_order_violation_*_takuitsu_before_selected`

After negative fixtures PASS:

- run positive valid-write fixture or dry validation path
- add deterministic generator service implementation as follow-up active task

# 2026-05-05 DELTA operations generation engine gap

## status

runtime_preflight_fixtures_pass_generator_service_pending_branch_resolution_guard_added_daytime_fixture_pending

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
- L3 order fixture: 国民年金法 L3 択一 before 選択 completion is rejected
- Positive valid-write fixture: valid / safe operations content is accepted

Current operations SHA after positive fixture:

- `ef4bc3ab2ba482a6b6ca056684fc9d298689ef5b`
- Previous safe basis SHA was `ff588298afd147452493902b05a9670aa7224233`.
- Positive fixture content was valid and accepted, so this SHA is not treated as contaminated.

New runtime regression observed after fixtures:

- DELTA replied that saved `active_operations.md` could not be confirmed.
- It then produced a vague provisional line for 2026-05-05:
  - `今進めている科目の続きから、問題番号ベースで進める`
  - `目安：60〜90分`
- This contradicted saved active operations, which clearly specify Day0 as `国民年金法 L3 選択 Q15-1〜Q15-14（14問）`.
- ADAM could read `systems/delta/operations/active_operations.md` on branch `feature/atlas-pre-delta-foundation` at sha `ef4bc3ab2ba482a6b6ca056684fc9d298689ef5b`.

Pending:

- deterministic generator service implementation test execution
- configured GPT reflection of updated DELTA instruction / supplemental schema
- daytime recommendation fixture for read_saved_operations_or_stop and branch resolution

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
- L3 line guard still allowed the invalid fixture because `hasExplicitL3SelectedCompletion()` treated negative prose such as `選択完了 marker なし` as selected completion evidence

Read failure fallback regression root cause:

- DELTA instruction says daytime questions must read saved active_operations and not recompute by default.
- DELTA did not have an explicit branch resolution rule.
- If branch was omitted, runtime likely read default branch rather than `feature/atlas-pre-delta-foundation`.
- DELTA allowed provisional recommendation after read failure / non-confirmation.
- The output path did not enforce observed branch + active_operations sha before giving `今日やる学習`.
- The response used vague fallback wording, violating quantitative target expectations even though saved operations existed.

## fix_applied

- `systems/delta/config/delta_instruction.md`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `edc7c2a2098844055c695df13b703b701efc4a39`
  - content_length: `7594`
  - added branch resolution rule and read_saved_operations_or_stop rule

- `systems/delta/config/delta_action_schema.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `610716c9a98a5676dad5b7cc72d5d9d84f8c59e8`
  - version: `0.6.3`

- `systems/delta/config/delta_operations_generation_schema.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `b64267c11da6f8f7fc348a50379e287c1917d6b2`
  - added branch_resolution and daytime_recommendation_guard

- `api/repo-resource.js`
  - branch: `main`
  - sha: `ebe2be2254a64b0792e9d150513b9341c803dde2`

- `src/services/delta-operations.js`
  - branch: `main`
  - sha: `eb1546bd6723c6ac3c0f324ce7068d52dc2f6ef1`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `eb1546bd6723c6ac3c0f324ce7068d52dc2f6ef1`
  - validator_version: `delta_operations_preflight_2026_05_05_L3_order_completion_marker_fix`

## branch resolution guard added

```yaml
canonical_branch_for_delta_runtime: feature/atlas-pre-delta-foundation
read_order:
  - explicitly_provided_branch
  - branch_recorded_in_current_operations_or_prior_confirmed_sha
  - feature/atlas-pre-delta-foundation
  - main
failure_policy:
  - if_active_operations_cannot_be_read_from_any_candidate_branch_stop
  - if_branch_cannot_be_resolved_stop
  - do_not_generate_provisional_learning_lines
  - do_not_recompute_recommendation_without_saved_operations
  - report_branch_read_failure_and_required_next_action
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

### L3 order fixture

```yaml
final_pass:
  write: rejected
  error.code: DELTA_OPERATIONS_PREFLIGHT_FAILED
  required_error_observed: L3_order_violation_国民年金法_takuitsu_before_selected
  validator_version: delta_operations_preflight_2026_05_05_L3_order_completion_marker_fix
  request_id: d02dd2c6-a3d0-4df0-a807-d0a08c03b845
  basis_sha: ff588298afd147452493902b05a9670aa7224233
  sha_after: ff588298afd147452493902b05a9670aa7224233
  judgment: pass
```

### Positive valid-write fixture

```yaml
write: accepted
status: UPDATED
request_id: 34af66cd-5160-401b-a1e0-0d80be6d681f
sha_before: ff588298afd147452493902b05a9670aa7224233
sha_after: ef4bc3ab2ba482a6b6ca056684fc9d298689ef5b
preflight:
  ok: true
  errors: []
  warnings: []
  validator_version: delta_operations_preflight_2026_05_05_L3_order_completion_marker_fix
judgment: pass
```

## final preflight fixture judgment

```yaml
negative_fixtures:
  fixture_1A_missing_read_evidence: pass
  fixture_1B_completed_scope_reintroduction: pass
  fixture_1C_L1_L2_continuity: pass
  L3_order_takuitsu_before_selected: pass
positive_fixture:
  valid_safe_operations_write: pass
overall_runtime_preflight: pass
```

## remaining_risk

- deterministic generator service test execution is pending
- preflight validates submitted operations content; it does not yet deterministically generate D0-D6 / Next operations from roadmap / plan / current_position in runtime
- daytime recommendation path still needs configured GPT reflection and runtime fixture
- original basis SHA `b5514...` is invalid under current L3 order guard; current operations SHA is `ef4bc3...`

## recurrence_prevention

- Fixture PASS requires plan-fit, not just structure / quantitative / load checks
- Guard-specific fixtures must isolate the target validator and satisfy all unrelated required fields
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- Daytime recommendation must resolve branch, read saved `operations/active_operations.md`, and cite/echo observed branch + sha before giving a line
- If saved active_operations cannot be read from candidate branches, DELTA must stop and report read failure; it must not produce provisional learning lines
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path must carry read_evidence
- content must also include required evidence markers, not only read_evidence payload
- validator fixtures must include prose, YAML block, subject-first YAML, table form, separated column form, reordered YAML forms, Japanese negative words such as `未完了`, and negative completion-marker prose such as `選択完了 marker なし`
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

- reflect updated `delta_instruction.md` and `delta_operations_generation_schema.yaml` into configured GPT / Knowledge
- run daytime recommendation fixture: ask 今日やること / 今日の推奨ライン and require observed branch + active_operations sha + Day0 lines
- expected Day0 line:
  - task: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  - must_line: 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  - standard_line: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
- generator output must pass the now-confirmed runtime preflight

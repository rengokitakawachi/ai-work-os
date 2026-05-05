# 2026-05-05 DELTA operations generation engine gap

## status

runtime_preflight_fixtures_pass_daytime_recommendation_fixture_pass_generator_service_tests_pending

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
- Daytime recommendation fixture: DELTA reads saved operations and answers with observed branch + sha + Day0 lines

Current operations SHA after positive fixture:

- `ef4bc3ab2ba482a6b6ca056684fc9d298689ef5b`

## read failure fallback regression

Observed failure:

- DELTA said saved `active_operations.md` could not be confirmed.
- It then produced a vague provisional line for 2026-05-05:
  - `今進めている科目の続きから、問題番号ベースで進める`
  - `目安：60〜90分`
- This contradicted saved active operations, which clearly specified Day0 as `国民年金法 L3 選択 Q15-1〜Q15-14（14問）`.
- ADAM could read `systems/delta/operations/active_operations.md` on branch `feature/atlas-pre-delta-foundation` at sha `ef4bc3ab2ba482a6b6ca056684fc9d298689ef5b`.

Root cause:

- DELTA instruction did not have an explicit branch resolution rule.
- If branch was omitted, runtime likely read default branch rather than `feature/atlas-pre-delta-foundation`.
- DELTA allowed provisional recommendation after read failure / non-confirmation.
- The output path did not enforce observed branch + active_operations sha before giving `今日やる学習`.

Fix applied:

- `systems/delta/config/delta_instruction.md`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `edc7c2a2098844055c695df13b703b701efc4a39`
  - content_length: `7594`
  - added branch resolution rule and read_saved_operations_or_stop rule
- `systems/delta/config/delta_operations_generation_schema.yaml`
  - branch: `feature/atlas-pre-delta-foundation`
  - sha: `b64267c11da6f8f7fc348a50379e287c1917d6b2`
  - added branch_resolution and daytime_recommendation_guard

Branch resolution guard:

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

Daytime recommendation fixture PASS:

```yaml
request: 今日やることは？
observed_branch: feature/atlas-pre-delta-foundation
observed_sha: ef4bc3ab2ba482a6b6ca056684fc9d298689ef5b
task: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
must_line: 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
standard_line: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
stretch_line: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
judgment: pass
```

## preflight fixture judgment

```yaml
negative_fixtures:
  fixture_1A_missing_read_evidence: pass
  fixture_1B_completed_scope_reintroduction: pass
  fixture_1C_L1_L2_continuity: pass
  L3_order_takuitsu_before_selected: pass
positive_fixture:
  valid_safe_operations_write: pass
daytime_recommendation_fixture:
  read_saved_operations_branch_sha_Day0: pass
overall_runtime_preflight: pass
```

## implementation refs

- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_operations_generation_schema.yaml`
- `systems/delta/config/delta_action_schema.yaml`
- `src/services/delta-operations.js`
- `src/services/delta/operations-generator.js`
- `src/services/delta/operations-generator.test.js`
- `api/repo-resource.js`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/daily/2026-05-04.md`
- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`

## remaining risk

- deterministic generator service test execution is pending
- preflight validates submitted operations content; it does not yet fully optimize roadmap / plan / current_position in runtime
- generator service has minimum deterministic draft behavior, not full reverse-planning optimizer

## recurrence prevention

- Daytime recommendation must resolve branch, read saved `operations/active_operations.md`, and echo observed branch + sha before giving a line
- If saved active_operations cannot be read from candidate branches, DELTA must stop and report read failure
- DELTA must not produce provisional learning lines after read failure
- Operations generation must hard fail if active_operations / Next operations / current_position / completed_subjects / special_days / user_capacity are missing
- L1/L2 current subject must not be skipped before subject_end_page
- L3 must follow 選択 → 択一 per subject
- completed first-pass scope must not be regenerated as new work
- write path must carry read_evidence
- preflight response should include validator_version so runtime code version can be verified

## next disposition

Immediate:

- run `npm test` for the generator service tests
- confirm existing tests and `src/services/delta/operations-generator.test.js` pass
- then decide whether to close the DELTA Immediate Gate or split full reverse-planning optimizer into a separate task

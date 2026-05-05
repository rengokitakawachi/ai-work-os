# delta active_operations

## Metadata

version: fixture_L3_order_isolated_takuitsu_before_selected
updated_at: 2026-05-05
branch: feature/atlas-pre-delta-foundation
operation_status: invalid_fixture_should_be_rejected
last_daily_review: systems/delta/history/daily/2026-05-04.md

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  todoist_role: projection_only

## Completed scope evidence

completed_scope_evidence:
  source: systems/delta/history/daily/2026-05-04.md
  completed_subjects:
    健康保険法:
      L3_new_exercises: completed
      selected_questions: completed
      completed_through: Q11-21
      allowed_future_use: recovery_or_second_pass_only
  current_new_L3_subject:
    subject: 国民年金法
    selected_completion_status: incomplete
    next_question: Q15-1

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度

plan_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: fixture invalid L3 order guard only
  special_days:
    - 2026-05-10: L3不可

current_position:
  as_of: 2026-05-05
  L1:
    subject: 国民年金法
    current_position: P219完了
    next_start_page: P220
    completion_status: incomplete
  L2:
    subject: 国民年金法
    current_position: P158以降未完了
    next_start_page: P158
    completion_status: incomplete
  L3:
    subject: 国民年金法
    current_subject: 国民年金法
    selected_completion_status: incomplete
    selected_next_question: Q15-1
    multiple_choice_status: blocked_until_selected_completed
    next_resume_question_id: Q15-1
    completed_scope_reference:
      健康保険法: L3新規演習完了済み。再投入なし。
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-05
  source_review:
    - systems/delta/history/daily/2026-05-04.md
  plan_anchor: fixture_L3_order_isolated
  current_position: 国民年金法 L3 選択 Q15-1開始前。国民年金法の選択完了 marker なし。
  expected_position: Next operationsで国民年金法 L3 択一を先行させる invalid fixture
  gap_status: invalid_L3_order
  operation_mode: new_first_pass
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  recovery_targets:
    - L3は科目ごとに選択完了後に択一へ進む
  defer:
    - 国民年金法 L3 択一 Q1-1〜Q1-16（16問）
  recompute_triggers:
    - L3_order_violation_国民年金法_takuitsu_before_selected

---

# Active operations: D0〜D6

## Day0（2026-05-05）

- task: 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  rolling_day: Day0
  due_date: 2026-05-05
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture L3 order isolated
  expected_position: 国民年金法 L3 選択 Q15-7完了
  current_position: 国民年金法 L3 選択 Q15-1開始前
  gap_status: delayed_but_recovering
  start_question_id: Q15-1
  must_end_question_id: Q15-7
  standard_end_question_id: Q15-7
  stretch_end_question_id: Q15-7
  next_resume_question_id: Q15-1
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  recovery_targets:
    - 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  defer_targets:
    - 国民年金法 L3 択一 Q1-1〜Q1-16（16問）
  recompute_triggers:
    - Q15-7未達

## Day1（2026-05-06）

- task: 国民年金法 L3 選択 Q15-8〜Q15-14（7問）
  rolling_day: Day1
  due_date: 2026-05-06
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture L3 order isolated
  expected_position: 国民年金法 L3 選択 Q15-14完了
  current_position: Day0後にQ15-8開始
  gap_status: delayed_but_recovering
  start_question_id: Q15-8
  must_end_question_id: Q15-14
  standard_end_question_id: Q15-14
  stretch_end_question_id: Q15-14
  next_resume_question_id: Q15-8
  must_line:
    - 国民年金法 L3 選択 Q15-8〜Q15-14（7問）
  standard_line:
    - 国民年金法 L3 選択 Q15-8〜Q15-14（7問）
  stretch_line:
    - 国民年金法 L3 選択 Q15-8〜Q15-14（7問）
  recovery_targets:
    - 国民年金法 L3 選択 Q15-8〜Q15-14（7問）
  defer_targets:
    - 国民年金法 L3 択一 Q1-1〜Q1-16（16問）
  recompute_triggers:
    - Q15-14未達

## Day2（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day2
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture L3 order isolated
  expected_position: 国民年金法 L2 P190完了
  current_position: 国民年金法 L2 P158以降未完了
  gap_status: delayed_but_recovering
  start_page: P158
  must_end_page: P175
  standard_end_page: P190
  stretch_end_page: P200
  next_start_page: P158
  must_line:
    - 国民年金法 L2 P158〜P175（18ページ）
  standard_line:
    - 国民年金法 L2 P158〜P190（33ページ）
  stretch_line:
    - 国民年金法 L2 P158〜P200（43ページ）
  recovery_targets:
    - 国民年金法 L2 P158〜P190（33ページ）
  defer_targets:
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P190未達

## Day3（2026-05-08）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day3
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture L3 order isolated
  expected_position: 国民年金法 L2 P219完了
  current_position: Day2後にP191開始
  gap_status: delayed_but_recovering
  start_page: P191
  must_end_page: P205
  standard_end_page: P219
  stretch_end_page: P219
  next_start_page: P191
  must_line:
    - 国民年金法 L2 P191〜P205（15ページ）
  standard_line:
    - 国民年金法 L2 P191〜P219（29ページ）
  stretch_line:
    - 国民年金法 L2 P191〜P219（29ページ）
  recovery_targets:
    - 国民年金法 L2 P191〜P219（29ページ）
  defer_targets:
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P219未達

## Day4（2026-05-09）

- task: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  rolling_day: Day4
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture L3 order isolated
  expected_position: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認完了
  current_position: 国民年金法 L3 選択完了 marker なし
  gap_status: needs_confirmation
  start_question_id: Q15-1
  must_end_question_id: Q15-14
  standard_end_question_id: Q15-14
  stretch_end_question_id: Q15-14
  next_resume_question_id: Q15-1
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  recovery_targets:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  defer_targets:
    - 国民年金法 L3 択一 Q1-1〜Q1-16（16問）
  recompute_triggers:
    - selected_completion_marker_missing

## Day5（2026-05-10）

- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day5
  due_date: 2026-05-10
  subject: 共通
  study_type: rest_or_light_review
  material: none
  operation_mode: normal
  plan_anchor: 2026-05-10 L3不可
  expected_position: 新規L1/L2/L3なし
  current_position: Day4後に更新
  gap_status: on_track
  must_line:
    - 新規L1/L2/L3なし
  standard_line:
    - 新規L1/L2/L3なし
  stretch_line:
    - 秒トレ40問
  recovery_targets:
    - 新規L3は実施しない
  defer_targets:
    - 国民年金法 L3 選択完了 marker 確認
  recompute_triggers:
    - user_explicitly_requests_recompute

## Day6（2026-05-11）

- task: 国民年金法 L1 P220〜P255（36ページ）
  rolling_day: Day6
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  operation_mode: recovery_forward
  plan_anchor: fixture L3 order isolated
  expected_position: 国民年金法 L1 P255完了
  current_position: 国民年金法 L1 P219完了
  gap_status: delayed_but_recovering
  start_page: P220
  must_end_page: P235
  standard_end_page: P255
  stretch_end_page: P260
  next_start_page: P220
  must_line:
    - 国民年金法 L1 P220〜P235（16ページ）
  standard_line:
    - 国民年金法 L1 P220〜P255（36ページ）
  stretch_line:
    - 国民年金法 L1 P220〜P260（41ページ）
  recovery_targets:
    - 国民年金法 L1 P220〜P255（36ページ）
  defer_targets:
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P255未達

---

# Next operations: 2026-05-12〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-12 | L3 | 国民年金法 L3 択一 Q1-1〜Q1-16（16問） |
| 2026-05-13 | L3 | 国民年金法 L3 択一 Q2-1〜Q2-5（5問） |

invalid_fixture_marker: L3_order_violation_国民年金法_takuitsu_before_selected

## Next operation guardrails

- L1/L2はページ範囲とページ数で管理する。
- L3は問題番号範囲と問題数で管理する。
- 国民年金法 L3 選択完了 marker がないため、国民年金法 L3 択一 Q1-1〜Q1-16（16問）はrejectされるべき。
- 健康保険法L3は再投入しない。
- 厚生年金保険法L1/L2は開始しない。

## Operations completeness guard

required_days: [Day0, Day1, Day2, Day3, Day4, Day5, Day6]
required_fields_per_day:
  - plan_anchor
  - expected_position
  - current_position
  - gap_status
  - operation_mode
  - must_line
  - standard_line
  - stretch_line
  - recovery_targets
  - defer_targets
  - recompute_triggers
quantitative_management_rules:
  - L1/L2はstart_page、must_end_page、standard_end_page、stretch_end_page、next_start_pageとページ数で管理する
  - L3はstart_question_id、must_end_question_id、standard_end_question_id、stretch_end_question_id、next_resume_question_idと問題数で管理する

## Rules

- Operations is next-action SSOT.
- Actual performance records are written to daily history, not operations.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates learning history and next operations.
- L3 は科目ごとに 選択 → 択一 の順序で進める。
- Todoist is projection only.

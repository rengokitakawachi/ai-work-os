# delta active_operations

## Metadata

version: fixture_1C_invalid_L1_L2_subject_skip
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

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度

plan_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: fixture invalid: 国民年金法L1/L2未完了なのにD7以降で厚生年金保険法L1/L2へ進む
  special_days:
    - 2026-05-10: L3不可
    - 2026-06-13: L3不可

current_position:
  as_of: 2026-05-05
  L1:
    subject: 国民年金法
    completion_status: incomplete
    current_position: P219完了
    next_start_page: P220
  L2:
    subject: 国民年金法
    completion_status: incomplete
    current_position: P158以降未完了
    next_start_page: P158
  L3:
    completed_subject: 健康保険法
    completed_scope: 選択式完了済み、択一Q11-21まで完了
    current_subject: 国民年金法
    next_resume_question_id: Q15-1
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-05
  source_review:
    - systems/delta/history/daily/2026-05-04.md
  plan_anchor: fixture_1C
  current_position: 国民年金法 L1 next_start_page P220 / L2 next_start_page P158 で未完了
  expected_position: D7以降で厚生年金保険法 L1/L2 を開始する invalid fixture
  gap_status: invalid_current_subject_skipped
  operation_mode: new_subject_started_before_current_completion
  must_line:
    - 国民年金法 L2 P158〜P190（33ページ）
  standard_line:
    - 国民年金法 L1 P220〜P255（36ページ） + 国民年金法 L2 P158〜P190（33ページ）
  stretch_line:
    - 国民年金法 L1/L2の未完了範囲を優先
  recovery_targets:
    - 国民年金法L1/L2未完了を先に回収
  defer:
    - 厚生年金保険法L1/L2開始
  recompute_triggers:
    - current_L1_L2_subject_skipped_before_completion

---

# Active operations: D0〜D6

## Day0（2026-05-05）

- task: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  rolling_day: Day0
  due_date: 2026-05-05
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture baseline
  expected_position: 国民年金法 L3 選択 Q15-14完了
  current_position: 国民年金法 L3 選択 Q15-1未着手
  gap_status: delayed_but_recovering
  start_question_id: Q15-1
  must_end_question_id: Q15-14
  standard_end_question_id: Q15-14
  stretch_end_question_id: Q2-5
  next_resume_question_id: Q15-1
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  recovery_targets:
    - 国民年金法L1/L2は未完了として保持
  defer_targets:
    - 厚生年金保険法L1/L2開始
  recompute_triggers:
    - Q15-14未達

## Day1（2026-05-06）

- task: 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  rolling_day: Day1
  due_date: 2026-05-06
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture baseline
  expected_position: 国民年金法 L3 択一 Q2-5完了
  current_position: D0後にQ1-1開始
  gap_status: delayed_but_recovering
  start_question_id: Q1-1
  must_end_question_id: Q2-5
  standard_end_question_id: Q2-5
  stretch_end_question_id: Q3-1
  next_resume_question_id: Q1-1
  must_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  standard_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q3-1（8問）
  recovery_targets:
    - 国民年金法L1/L2は未完了として保持
  defer_targets:
    - 厚生年金保険法L1/L2開始
  recompute_triggers:
    - Q2-5未達

## Day2（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day2
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture baseline
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
    - L2 gap回収
  defer_targets:
    - 厚生年金保険法L1/L2開始
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
  plan_anchor: fixture baseline
  expected_position: 国民年金法 L2 P219完了
  current_position: D2後にP191開始
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
    - L2をL1へ追いつかせる
  defer_targets:
    - 厚生年金保険法L1/L2開始
  recompute_triggers:
    - P219未達

## Day4（2026-05-09）

- task: 国民年金法 L3 択一 Q3-1〜Q7-2（14問）
  rolling_day: Day4
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: fixture baseline
  expected_position: 国民年金法 L3 択一 Q7-2完了
  current_position: D1後にQ3-1開始
  gap_status: delayed_but_recovering
  start_question_id: Q3-1
  must_end_question_id: Q5-1
  standard_end_question_id: Q7-2
  stretch_end_question_id: Q9-1
  next_resume_question_id: Q3-1
  must_line:
    - 国民年金法 L3 択一 Q3-1〜Q5-1（7問）
  standard_line:
    - 国民年金法 L3 択一 Q3-1〜Q7-2（14問）
  stretch_line:
    - 国民年金法 L3 択一 Q3-1〜Q9-1（17問）
  recovery_targets:
    - 国民年金法×・△保持
  defer_targets:
    - 2026-05-10はL3不可
  recompute_triggers:
    - Q7-2未達

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
  current_position: D4後に更新
  gap_status: on_track
  must_line:
    - 新規L1/L2/L3なし
  standard_line:
    - 新規L1/L2/L3なし
  stretch_line:
    - 国民年金法 L3 評価記号整理のみ
  recovery_targets:
    - 新規L3は実施しない
  defer_targets:
    - 国民年金法L3続きは2026-05-16へ回す
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
  plan_anchor: fixture baseline
  expected_position: 国民年金法 L1 P255完了
  current_position: 国民年金法 L1 P219完了 / next_start_page P220
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
    - 国民年金法L1/L2完了を優先
  defer_targets:
    - 厚生年金保険法L1/L2開始
  recompute_triggers:
    - P255未達

---

# Next operations: 2026-05-12〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-12 | L1 | 厚生年金保険法 L1 P1〜P35（35ページ） |
| 2026-05-13 | L2 | 厚生年金保険法 L2 P1〜P35（35ページ） |
| 2026-05-14 | L1 | 厚生年金保険法 L1 P36〜P70（35ページ） |
| 2026-05-15 | L2 | 厚生年金保険法 L2 P36〜P70（35ページ） |

invalid_fixture_marker: current_L1_L2_subject_skipped_before_completion

## Next operation guardrails

- L1/L2はページ範囲とページ数で管理する。
- L3は問題番号範囲と問題数で管理する。
- 国民年金法L1/L2が未完了で next_start_page P220 / P158 のため、厚生年金保険法L1/L2開始はrejectされるべき。

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
- 国民年金法 L1/L2 が未完了のまま厚生年金保険法 L1/L2 へ進んではいけない。
- Todoist is projection only.

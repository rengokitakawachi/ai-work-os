# delta active_operations

## Metadata

version: fixture_negative_active_embedded_next_table_isolated
updated_at: 2026-05-07
branch: feature/delta-runtime-fixture-2026-05-07
operation_status: fixture_should_be_rejected
last_daily_review: systems/delta/history/daily/2026-05-05.md
latest_in_day_history: systems/delta/history/daily/2026-05-05.md

validation_markers:
  - Active operations are D0-D6 execution SSOT only.
  - Next operations are stored separately in systems/delta/operations/next_operations.md.

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md

read_sources:
  roadmap:
    path: systems/delta/roadmap/delta_roadmap.md
    sha: 70bdfa5e7e31299bc6f0ad027ab939611c654357
  plan:
    path: systems/delta/plan/2026_sharoushi_exam_plan.md
    sha: b4b8e077e82b0601e9d44a30712c21454f351c9a
  active_operations:
    path: systems/delta/operations/active_operations.md
    sha: 9616669037822b3cbcca3c4dd29518b7f686e49a
  next_operations:
    path: systems/delta/operations/next_operations.md
    sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
  latest_daily_history:
    path: systems/delta/history/daily/2026-05-05.md
    sha: 1007cc786d57b761d9f00b442a6326639da0a1f3

completed_scope_evidence:
  健康保険法:
    L3_new_exercises: completed
  国民年金法:
    L3_selected_questions: completed_Q15-1_to_Q15-14

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
  special_days:
    2026-05-10: L3不可
    2026-06-13: L3不可
    2026-06-30: 年休。L3可

current_position:
  as_of: 2026-05-05
  L1:
    subject: 国民年金法
    current_position: P219完了
    next_start_page: P220
  L2:
    subject: 国民年金法
    current_position: P157完了
    next_start_page: P158
  L3:
    subject: 国民年金法
    next_resume_question_id: Q1-1
  gap_status: fixture
  operation_mode: fixture

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  first_next_date: 2026-05-14
  expected_first_next_line: 国民年金法 L2 P246〜P280（35ページ）
  active_day6_expected_position: 国民年金法 L2 P245完了

# Active operations: D0〜D6

## Day0（2026-05-07）
- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day0
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  page_range: P158〜P190
  start_page: P158
  standard_end_page: P190
  next_start_page: P158
  plan_anchor: fixture
  expected_position: 国民年金法 L2 P190完了
  current_position: 国民年金法 L2 P157完了
  gap_status: fixture
  operation_mode: fixture
  must_line: [国民年金法 L2 P158〜P175（18ページ）]
  standard_line: [国民年金法 L2 P158〜P190（33ページ）]
  stretch_line: [国民年金法 L2 P158〜P200（43ページ）]
  recovery_targets: [fixture]
  defer_targets: [fixture]
  recompute_triggers: [fixture]

## Day1（2026-05-08）
- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day1
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  page_range: P191〜P219
  start_page: P191
  standard_end_page: P219
  next_start_page: P191
  plan_anchor: fixture
  expected_position: 国民年金法 L2 P219完了
  current_position: fixture
  gap_status: fixture
  operation_mode: fixture
  must_line: [国民年金法 L2 P191〜P205（15ページ）]
  standard_line: [国民年金法 L2 P191〜P219（29ページ）]
  stretch_line: [国民年金法 L2 P191〜P219（29ページ）]
  recovery_targets: [fixture]
  defer_targets: [fixture]
  recompute_triggers: [fixture]

## Day2（2026-05-09）
- task: 国民年金法 L3 択一 Q3-4〜Q3-4（1問）
  rolling_day: Day2
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  question_range: Q3-4〜Q3-4
  start_question_id: Q3-4
  standard_end_question_id: Q3-4
  next_resume_question_id: Q3-4
  plan_anchor: fixture
  expected_position: 国民年金法 L3 択一 Q3-4完了
  current_position: fixture
  gap_status: fixture
  operation_mode: fixture
  must_line: [国民年金法 L3 択一 Q3-4〜Q3-4（1問）]
  standard_line: [国民年金法 L3 択一 Q3-4〜Q3-4（1問）]
  stretch_line: [国民年金法 L3 択一 Q3-4〜Q3-4（1問）]
  recovery_targets: [fixture]
  defer_targets: [fixture]
  recompute_triggers: [fixture]

## Day3（2026-05-10）
- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day3
  due_date: 2026-05-10
  subject: 共通
  study_type: rest_or_light_review
  plan_anchor: fixture
  expected_position: 新規L1/L2/L3なし
  current_position: fixture
  gap_status: fixture
  operation_mode: fixture
  must_line: [秒トレ40問]
  standard_line: [秒トレ40問]
  stretch_line: [軽い確認]
  recovery_targets: [fixture]
  defer_targets: [fixture]
  recompute_triggers: [fixture]

## Day4（2026-05-11）
- task: 国民年金法 L2 P220〜P235（16ページ）
  rolling_day: Day4
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L2
  page_range: P220〜P235
  start_page: P220
  standard_end_page: P235
  next_start_page: P220
  plan_anchor: fixture
  expected_position: 国民年金法 L2 P235完了
  current_position: fixture
  gap_status: fixture
  operation_mode: fixture
  must_line: [国民年金法 L2 P220〜P228（9ページ）]
  standard_line: [国民年金法 L2 P220〜P235（16ページ）]
  stretch_line: [国民年金法 L2 P220〜P245（26ページ）]
  recovery_targets: [fixture]
  defer_targets: [fixture]
  recompute_triggers: [fixture]

## Day5（2026-05-12）
- task: 国民年金法 L1 P259〜P280（22ページ）
  rolling_day: Day5
  due_date: 2026-05-12
  subject: 国民年金法
  study_type: L1
  page_range: P259〜P280
  start_page: P259
  standard_end_page: P280
  next_start_page: P259
  plan_anchor: fixture
  expected_position: 国民年金法 L1 P280完了
  current_position: fixture
  gap_status: fixture
  operation_mode: fixture
  must_line: [国民年金法 L1 P259〜P270（12ページ）]
  standard_line: [国民年金法 L1 P259〜P280（22ページ）]
  stretch_line: [国民年金法 L1 P259〜P280（22ページ）]
  recovery_targets: [fixture]
  defer_targets: [fixture]
  recompute_triggers: [fixture]

## Day6（2026-05-13）
- task: 国民年金法 L2 P236〜P245（10ページ）
  rolling_day: Day6
  due_date: 2026-05-13
  subject: 国民年金法
  study_type: L2
  page_range: P236〜P245
  start_page: P236
  standard_end_page: P245
  next_start_page: P236
  plan_anchor: fixture
  expected_position: 国民年金法 L2 P245完了
  current_position: fixture
  gap_status: fixture
  operation_mode: fixture
  must_line: [国民年金法 L2 P236〜P240（5ページ）]
  standard_line: [国民年金法 L2 P236〜P245（10ページ）]
  stretch_line: [国民年金法 L2 P236〜P245（10ページ）]
  recovery_targets: [fixture]
  defer_targets: [fixture]
  recompute_triggers: [fixture]

## Active / Next connection guard

active_day6_standard_end: P245
connection_status: connected

# Next operations

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-14 | L2 | 国民年金法 L2 P246〜P280（35ページ） |

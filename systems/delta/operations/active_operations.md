# delta active_operations

## Metadata

version: delta_v0.8_active_operations_2026_05_10_after_2026_05_09_daily_review
updated_at: 2026-05-09
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_after_2026_05_09_review_compression_required
active_range: 2026-05-10〜2026-05-16
next_operations_ref: systems/delta/operations/next_operations.md

## Source of truth

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  canonical_branch: feature/atlas-pre-delta-foundation
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  todoist_role: projection_only

## Daily review anchor

last_completed_daily_review:
  date: 2026-05-09
  path: systems/delta/history/daily/2026-05-09.md
  sha: fe76ae71fe54712d8e11794f9facc2363bcf9e08
  judgment: completed_for_today_but_l3_delayed
  study_time: 国民年金法 2時間54分
  sekotore: 20問
  key_result:
    - 国民年金法 L2 P234〜P261 完了
    - 国民年金法 択一 Q4-1〜Q4-2 実施
    - 次回の過去問再開は Q4-3

## Current position

current_position:
  as_of: 2026-05-09_daily_review_completed
  国民年金法:
    L1: P261完了。次はP262
    L2: P261完了。次はP262
    選択問題: Q15-1〜Q15-14完了
    択一問題: Q4-2まで実施済み。次はQ4-3
    weak_points_for_after_first_pass: [Q1-1, Q2-2, Q3-2, Q4-1, Q4-2]
    review_targets_for_after_first_pass: [Q2-1, Q2-3, Q2-4, Q2-5]
    note: 2026-05-10〜2026-05-11で終了するのは国民年金法L1/L2一巡目。過去問択一はQ4-3から継続
  厚生年金保険法:
    L1: 未着手
    L2: 未着手
  sekotore:
    latest: 2026-05-09 20問
    daily_target: 40問
  gap_status: compression_required
  operation_mode: first_pass_priority_compression

## Confirmed question index

confirmed_question_index:
  国民年金法_択一:
    completed: Q1-1、Q2-1〜Q2-5、Q3-1〜Q3-3、Q4-1〜Q4-2
    next_question: Q4-3
    remaining_ranges:
      - Q4-3〜Q4-4
      - Q5-0
      - Q6-1〜Q6-2
      - Q7-1〜Q7-2
      - Q8-1〜Q8-3
      - Q9-1〜Q9-10
      - Q10-0
      - Q11-1〜Q11-7
      - Q12-1
      - Q13-1〜Q13-2
      - Q14-1〜Q14-17

## Special days

special_days:
  - 2026-05-10: L3不可。国民年金法L1中心
  - 2026-05-11: 平日仕事日。厚生年金保険法L1 P1〜P30＋国民年金法L2 P262〜P277
  - 2026-05-12: 平日仕事日。L3なし
  - 2026-05-13: 平日仕事日。L3なし
  - 2026-05-14: 平日仕事日。L3なし
  - 2026-05-15: 平日仕事日。L3なし
  - 2026-05-16: 土曜。L3のみ

---

# Active operations: D0〜D6

## Day0（2026-05-10）

- task: 国民年金法 L1 P262〜P277（16ページ）
  rolling_day: Day0
  due_date: 2026-05-10
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  estimated_minutes: 60
  operation_mode: first_pass_priority_compression
  plan_anchor: 2026-05-10はL3不可日。国民年金法L1の一巡目終了へ接続
  expected_position: 国民年金法 L1 P277完了
  current_position: 国民年金法 L1 P261完了、次回P262
  gap_status: compression_required
  start_page: P262
  standard_end_page: P277
  next_start_page: 厚生年金保険法P1
  page_range: P262〜P277
  pages: 16
  must_line:
    - 国民年金法 L1 P262〜P270（9ページ）
  standard_line:
    - 国民年金法 L1 P262〜P277（16ページ）
  stretch_line:
    - 国民年金法 L1 P262〜P277（16ページ）＋秒トレ40問
  recovery_targets:
    - 国民年金法 L1 P277到達
  defer_targets:
    - 国民年金法 択一 Q4-3以降
    - 国民年金法 L2 P262〜P277
  recompute_triggers:
    - P270未達
    - P277未達

## Day1（2026-05-11）

- task: 厚生年金保険法 L1 P1〜P30（30ページ）＋国民年金法 L2 P262〜P277（16ページ）
  rolling_day: Day1
  due_date: 2026-05-11
  subject: 厚生年金保険法／国民年金法
  study_type: L1_plus_L2
  material: 動画講義＋基礎講座テキスト
  estimated_minutes: 130
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1はP1〜P30程度。国民年金法L2 P262〜P277を含めて国民年金法L2一巡目終了
  expected_position: 厚生年金保険法 L1 P30完了、国民年金法 L2 P277完了
  current_position: 厚生年金保険法 L1未着手、国民年金法 L2 P261完了
  gap_status: compression_required
  start_page: 厚生年金保険法P1、国民年金法P262
  standard_end_page: 厚生年金保険法P30、国民年金法P277
  next_start_page: 厚生年金保険法P31
  page_range: 厚生年金保険法P1〜P30、国民年金法P262〜P277
  pages: 46
  must_line:
    - 厚生年金保険法 L1 P1〜P20（20ページ）＋国民年金法 L2 P262〜P277（16ページ）
  standard_line:
    - 厚生年金保険法 L1 P1〜P30（30ページ）＋国民年金法 L2 P262〜P277（16ページ）
  stretch_line:
    - 厚生年金保険法 L1 P1〜P40（40ページ）＋国民年金法 L2 P262〜P277（16ページ）
  recovery_targets:
    - 国民年金法 L2 P277到達
    - 厚生年金保険法 L1 P30到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L2開始
  recompute_triggers:
    - 国民年金法P277未達
    - 厚生年金保険法P30未達

## Day2（2026-05-12）

- task: 厚生年金保険法 L1 P31〜P70（40ページ）
  rolling_day: Day2
  due_date: 2026-05-12
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1をP70へ接続し、5/15までにL1 P110へつなぐ
  expected_position: 厚生年金保険法 L1 P70完了
  current_position: Day1標準達成後は厚生年金保険法 L1 P31開始
  gap_status: compression_required
  start_page: P31
  standard_end_page: P70
  next_start_page: P71
  page_range: P31〜P70
  pages: 40
  must_line:
    - 厚生年金保険法 L1 P31〜P50（20ページ）
  standard_line:
    - 厚生年金保険法 L1 P31〜P70（40ページ）
  stretch_line:
    - 厚生年金保険法 L1 P31〜P90（60ページ）
  recovery_targets:
    - 厚生年金保険法 L1 P70到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - P70未達

## Day3（2026-05-13）

- task: 厚生年金保険法 L2 P1〜P40（40ページ）
  rolling_day: Day3
  due_date: 2026-05-13
  subject: 厚生年金保険法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L2を開始し、L1先行分へ接続する
  expected_position: 厚生年金保険法 L2 P40完了
  current_position: 厚生年金保険法 L2未着手
  gap_status: compression_required
  start_page: P1
  standard_end_page: P40
  next_start_page: P41
  page_range: P1〜P40
  pages: 40
  must_line:
    - 厚生年金保険法 L2 P1〜P20（20ページ）
  standard_line:
    - 厚生年金保険法 L2 P1〜P40（40ページ）
  stretch_line:
    - 厚生年金保険法 L2 P1〜P60（60ページ）
  recovery_targets:
    - 厚生年金保険法 L2 P40到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - P40未達

## Day4（2026-05-14）

- task: 厚生年金保険法 L1 P71〜P110（40ページ）
  rolling_day: Day4
  due_date: 2026-05-14
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1をP110へ接続し、next_operationsのP111開始へつなぐ
  expected_position: 厚生年金保険法 L1 P110完了
  current_position: Day2標準達成後は厚生年金保険法 L1 P71開始
  gap_status: compression_required
  start_page: P71
  standard_end_page: P110
  next_start_page: P111
  page_range: P71〜P110
  pages: 40
  must_line:
    - 厚生年金保険法 L1 P71〜P90（20ページ）
  standard_line:
    - 厚生年金保険法 L1 P71〜P110（40ページ）
  stretch_line:
    - 厚生年金保険法 L1 P71〜P130（60ページ）
  recovery_targets:
    - 厚生年金保険法 L1 P110到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - P110未達

## Day5（2026-05-15）

- task: 厚生年金保険法 L2 P41〜P80（40ページ）
  rolling_day: Day5
  due_date: 2026-05-15
  subject: 厚生年金保険法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L2をP80へ接続し、next_operationsのL2 P81開始へつなぐ
  expected_position: 厚生年金保険法 L2 P80完了
  current_position: Day3標準達成後は厚生年金保険法 L2 P41開始
  gap_status: compression_required
  start_page: P41
  standard_end_page: P80
  next_start_page: P81
  page_range: P41〜P80
  pages: 40
  must_line:
    - 厚生年金保険法 L2 P41〜P60（20ページ）
  standard_line:
    - 厚生年金保険法 L2 P41〜P80（40ページ）
  stretch_line:
    - 厚生年金保険法 L2 P41〜P100（60ページ）
  recovery_targets:
    - 厚生年金保険法 L2 P80到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - P80未達

## Day6（2026-05-16）

- task: 国民年金法 択一 Q4-3〜Q4-4（2問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）＋Q7-1〜Q7-2（2問）＋Q8-1〜Q8-3（3問）＋Q9-1〜Q9-6（6問）
  rolling_day: Day6
  due_date: 2026-05-16
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 90
  operation_mode: first_pass_priority_compression
  plan_anchor: 2026-05-16は土曜でL3のみ。2026-05-09未達分をQ4-3から再開し、実在Q番号で進める
  expected_position: 国民年金法 択一 Q9-6完了
  current_position: 国民年金法 択一 Q4-2まで実施済み、次回Q4-3
  gap_status: compression_required
  start_question_id: Q4-3
  standard_end_question_id: Q9-6
  next_resume_question_id: Q9-7
  question_range: Q4-3〜Q4-4、Q5-0、Q6-1〜Q6-2、Q7-1〜Q7-2、Q8-1〜Q8-3、Q9-1〜Q9-6
  questions: 15
  must_line:
    - 国民年金法 択一 Q4-3〜Q4-4（2問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）
  standard_line:
    - 国民年金法 択一 Q4-3〜Q4-4（2問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）＋Q7-1〜Q7-2（2問）＋Q8-1〜Q8-3（3問）＋Q9-1〜Q9-6（6問）
  stretch_line:
    - 国民年金法 択一 Q9-7〜Q9-10（4問）
  recovery_targets:
    - なし。Q4-1・Q4-2を含む×回収は1巡後へ延期
  defer_targets:
    - Q1-1・Q2-2・Q3-2・Q4-1・Q4-2の回収
    - Q2-1・Q2-3・Q2-4・Q2-5の確認
  recompute_triggers:
    - Q4-3未達
    - Q6-2未達
    - Q9-6未達

---

## Active / Next connection guard

active_day6_next_connection:
  active_day6_due_date: 2026-05-16
  active_day6_expected_position: 厚生年金保険法 L1 P110完了、L2 P80完了。国民年金法L1/L2 P277完了。国民年金法 択一 Q9-6完了
  expected_next_start_date: 2026-05-17
  next_day_first_line: 2026-05-17 国民年金法 択一 Q9-7〜Q9-10（4問）＋Q10-0（演習対象なし）＋Q11-1〜Q11-7（7問）＋Q12-1（1問）＋Q13-1〜Q13-2（2問）
  connection_status: ready_for_next_start_2026_05_17

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  expected_next_start_date: 2026-05-17
  active_day6_expected_position: 厚生年金保険法 L1 P110完了、L2 P80完了、国民年金法 択一 Q9-6完了
  next_day_first_line: 2026-05-17 国民年金法 択一 Q9-7〜Q9-10（4問）＋Q10-0（演習対象なし）＋Q11-1〜Q11-7（7問）＋Q12-1（1問）＋Q13-1〜Q13-2（2問）

## Operations completeness guard

required_days: [Day0, Day1, Day2, Day3, Day4, Day5, Day6]
preflight_check_result:
  roadmap_was_read: true
  plan_was_read: true
  latest_daily_history_was_read: true
  prior_daily_history_was_read: true
  active_operations_was_read: true
  next_operations_was_read: true
  completed_scope_evidence_present: true
  user_capacity_evidence_present: true
  active_day6_next_connection_present: true
  D0_D6_all_exist: true
  active_day6_next_start_connection_target: 2026-05-17
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  correction_reflected: 2026-05-09実績により国民年金法過去問はQ4-3から再開
  overload_detected: true
  overload_resolution: compression_required

## Rules

- Active operations is D0-D6 execution SSOT.
- Next operations is D7-to-target daily plan SSOT.
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- 国民年金法は2026-05-11でL1/L2一巡目終了。過去問択一はQ4-3から継続。
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- 平日仕事日はL3なし。
- 土日祝は原則L3のみ。
- 2026-05-10はL3不可日。
- Todoist is projection only.

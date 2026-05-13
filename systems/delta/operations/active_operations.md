# delta active_operations

## Metadata

version: delta_v0.13_active_operations_2026_05_14_after_2026_05_13_daily_review
updated_at: 2026-05-13
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_after_2026_05_13_review_l2_catches_up_then_l1_advances
active_range: 2026-05-14〜2026-05-20
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
  date: 2026-05-13
  path: systems/delta/history/daily/2026-05-13.md
  sha: 5e4797ca3d6e19e38171e228f4262617a657ebde
  judgment: completed_for_today_l2_caught_up_then_l1_advanced_to_P81
  study_time: 1時間17分（秒トレ除く）
  sekotore: 40問
  key_result:
    - 厚生年金保険法 L2 P48〜P66 完了
    - 厚生年金保険法 L1 P67〜P81 完了
    - L2はL1を追い越していない
    - 秒トレ40問達成
    - 国民年金法 択一の次回再開は Q4-3

## Current position

current_position:
  as_of: 2026-05-13_daily_review_completed
  国民年金法:
    L1: P277完了。一巡目終了
    L2: P277完了。一巡目終了
    選択問題: Q15-1〜Q15-14完了
    択一問題: Q4-2まで実施済み。次はQ4-3
  厚生年金保険法:
    L1: P81完了。次はP82
    L2: P66完了。次はP67
  労働経済白書のポイント:
    L1: なし
    L2: P13完了。次はP14
  秒トレ:
    latest: 2026-05-13 40問
    daily_target: 40問
  gap_status: compression_required
  operation_mode: l2_catches_up_then_l1_advances

## Operating rule override from user

l1_l2_sequence_rule:
  rule: L2はL1に追いつくまで実施し、追いついてからL1を進める
  no_overtake: true
  same_page_allowed: true
  applied_from: 2026-05-13

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
  - 2026-05-14: 平日仕事日。L3なし
  - 2026-05-15: 平日仕事日。L3なし
  - 2026-05-16: 土曜。L3のみ
  - 2026-05-17: 日曜。L3のみ
  - 2026-05-18: 平日仕事日。L3なし
  - 2026-05-19: 平日仕事日。L3なし
  - 2026-05-20: 平日仕事日。L3なし

---

# Active operations: D0〜D6

## Day0（2026-05-14）

- task: 厚生年金保険法 L2 P67〜P81（15ページ）＋厚生年金保険法 L1 P82〜P125（44ページ）
  rolling_day: Day0
  due_date: 2026-05-14
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 140
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: 5/13終了時点はL1 P81、L2 P66。L2をP81まで追いつかせ、その後L1をP125へ進める
  expected_position: 厚生年金保険法 L2 P81完了、L1 P125完了
  current_position: 厚生年金保険法 L2 P66完了、L1 P81完了
  gap_status: compression_required
  start_page: L2 P67、L1 P82
  standard_end_page: L2 P81、L1 P125
  next_start_page: 厚生年金保険法 L2 P82、L1 P126
  page_range: L2 P67〜P81、L1 P82〜P125
  pages: 59
  must_line:
    - 厚生年金保険法 L2 P67〜P81（15ページ）
  standard_line:
    - 厚生年金保険法 L2 P67〜P81（15ページ）＋厚生年金保険法 L1 P82〜P125（44ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P81到達
    - 厚生年金保険法 L1 P125到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P81未達
    - L1 P125未達
    - L2がL1を追い越す報告

## Day1（2026-05-15）

- task: 厚生年金保険法 L2 P82〜P125（44ページ）＋厚生年金保険法 L1 P126〜P150（25ページ）
  rolling_day: Day1
  due_date: 2026-05-15
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 150
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: Day0でL1 P125まで先行後、L2をP125まで追いつかせ、その後L1をP150へ進める
  expected_position: 厚生年金保険法 L2 P125完了、L1 P150完了
  current_position: Day0標準達成後はL2 P82、L1 P126開始
  gap_status: compression_required
  start_page: L2 P82、L1 P126
  standard_end_page: L2 P125、L1 P150
  next_start_page: 厚生年金保険法 L2 P126、L1 P151
  page_range: L2 P82〜P125、L1 P126〜P150
  pages: 69
  must_line:
    - 厚生年金保険法 L2 P82〜P125（44ページ）
  standard_line:
    - 厚生年金保険法 L2 P82〜P125（44ページ）＋厚生年金保険法 L1 P126〜P150（25ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P125到達
    - 厚生年金保険法 L1 P150到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P125未達
    - L1 P150未達
    - L2がL1を追い越す報告

## Day2（2026-05-16）

- task: 国民年金法 択一 Q4-3〜Q4-4（2問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）＋Q7-1〜Q7-2（2問）＋Q8-1〜Q8-3（3問）＋Q9-1〜Q9-6（6問）
  rolling_day: Day2
  due_date: 2026-05-16
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 90
  operation_mode: first_pass_priority_compression
  plan_anchor: 2026-05-16は土曜でL3のみ。Q4-3から再開し、実在Q番号で進める
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
    - なし。×・△回収は1巡後へ延期
  defer_targets:
    - Q4-1・Q4-2を含む×回収
  recompute_triggers:
    - Q4-3未達
    - Q9-6未達

## Day3（2026-05-17）

- task: 国民年金法 択一 Q9-7〜Q9-10（4問）＋Q10-0（演習対象なし）＋Q11-1〜Q11-7（7問）＋Q12-1（1問）＋Q13-1〜Q13-2（2問）
  rolling_day: Day3
  due_date: 2026-05-17
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 90
  operation_mode: first_pass_priority_compression
  plan_anchor: 2026-05-17は日曜でL3のみ。Day2標準達成後のQ9-7から接続する
  expected_position: 国民年金法 択一 Q13-2完了
  current_position: Day2標準達成後は国民年金法 択一 Q9-7開始
  gap_status: compression_required
  start_question_id: Q9-7
  standard_end_question_id: Q13-2
  next_resume_question_id: Q14-1
  question_range: Q9-7〜Q9-10、Q10-0、Q11-1〜Q11-7、Q12-1、Q13-1〜Q13-2
  questions: 14
  must_line:
    - 国民年金法 択一 Q9-7〜Q9-10（4問）＋Q10-0（演習対象なし）＋Q11-1〜Q11-3（3問）
  standard_line:
    - 国民年金法 択一 Q9-7〜Q9-10（4問）＋Q10-0（演習対象なし）＋Q11-1〜Q11-7（7問）＋Q12-1（1問）＋Q13-1〜Q13-2（2問）
  stretch_line:
    - 国民年金法 択一 Q14-1〜Q14-4（4問）
  recovery_targets:
    - なし。×・△回収は1巡後へ延期
  defer_targets:
    - Q14-1以降の本格実施はnextへ接続
  recompute_triggers:
    - Q9-7未達
    - Q13-2未達

## Day4（2026-05-18）

- task: 厚生年金保険法 L2 P126〜P150（25ページ）＋厚生年金保険法 L1 P151〜P190（40ページ）
  rolling_day: Day4
  due_date: 2026-05-18
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 145
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: Day1でL1 P150まで先行後、L2をP150まで追いつかせ、その後L1をP190へ進める
  expected_position: 厚生年金保険法 L2 P150完了、L1 P190完了
  current_position: Day1標準達成後はL2 P126、L1 P151開始
  gap_status: compression_required
  start_page: L2 P126、L1 P151
  standard_end_page: L2 P150、L1 P190
  next_start_page: 厚生年金保険法 L2 P151、L1 P191
  page_range: L2 P126〜P150、L1 P151〜P190
  pages: 65
  must_line:
    - 厚生年金保険法 L2 P126〜P150（25ページ）
  standard_line:
    - 厚生年金保険法 L2 P126〜P150（25ページ）＋厚生年金保険法 L1 P151〜P190（40ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P150到達
    - 厚生年金保険法 L1 P190到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P150未達
    - L1 P190未達
    - L2がL1を追い越す報告

## Day5（2026-05-19）

- task: 厚生年金保険法 L2 P151〜P190（40ページ）＋厚生年金保険法 L1 P191〜P230（40ページ）
  rolling_day: Day5
  due_date: 2026-05-19
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 150
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: L2をL1 P190まで追いつかせ、その後L1をP230へ進める
  expected_position: 厚生年金保険法 L2 P190完了、L1 P230完了
  current_position: Day4標準達成後はL2 P151、L1 P191開始
  gap_status: compression_required
  start_page: L2 P151、L1 P191
  standard_end_page: L2 P190、L1 P230
  next_start_page: 厚生年金保険法 L2 P191、L1 P231
  page_range: L2 P151〜P190、L1 P191〜P230
  pages: 80
  must_line:
    - 厚生年金保険法 L2 P151〜P190（40ページ）
  standard_line:
    - 厚生年金保険法 L2 P151〜P190（40ページ）＋厚生年金保険法 L1 P191〜P230（40ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P190到達
    - 厚生年金保険法 L1 P230到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P190未達
    - L1 P230未達
    - L2がL1を追い越す報告

## Day6（2026-05-20）

- task: 厚生年金保険法 L2 P191〜P230（40ページ）＋厚生年金保険法 L1 P231〜P260（30ページ）
  rolling_day: Day6
  due_date: 2026-05-20
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 145
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: Active側で5/20を所有し、next_operationsは5/21開始へ接続する。L2はL1 P230まで追いつき、その後L1をP260へ進める
  expected_position: 厚生年金保険法 L2 P230完了、L1 P260完了
  current_position: Day5標準達成後はL2 P191、L1 P231開始
  gap_status: compression_required
  start_page: L2 P191、L1 P231
  standard_end_page: L2 P230、L1 P260
  next_start_page: 厚生年金保険法 L2 P231、L1 P261
  page_range: L2 P191〜P230、L1 P231〜P260
  pages: 70
  must_line:
    - 厚生年金保険法 L2 P191〜P230（40ページ）
  standard_line:
    - 厚生年金保険法 L2 P191〜P230（40ページ）＋厚生年金保険法 L1 P231〜P260（30ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P230到達
    - 厚生年金保険法 L1 P260到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P230未達
    - L1 P260未達
    - L2がL1を追い越す報告

---

## Active / Next connection guard

active_day6_next_connection:
  active_day6_due_date: 2026-05-20
  active_day6_expected_position: 厚生年金保険法 L1 P260完了、L2 P230完了。国民年金法L1/L2 P277完了。国民年金法 択一 Q13-2完了。労働経済白書のポイント L2 P13完了
  expected_next_start_date: 2026-05-21
  next_day_first_line: 2026-05-21 厚生年金保険法 L2 P231〜P260（30ページ）＋厚生年金保険法 L1 P261〜P284（24ページ）
  connection_status: next_operations_needs_patch_to_start_2026_05_21

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  expected_next_start_date: 2026-05-21
  active_day6_expected_position: 厚生年金保険法 L1 P260完了、L2 P230完了、国民年金法 択一 Q13-2完了
  next_day_first_line: 2026-05-21 厚生年金保険法 L2 P231〜P260（30ページ）＋厚生年金保険法 L1 P261〜P284（24ページ）

## Operations completeness guard

required_days: [Day0, Day1, Day2, Day3, Day4, Day5, Day6]
preflight_check_result:
  roadmap_was_read: true
  plan_was_read: true
  latest_daily_history_was_read: true
  active_operations_was_read: true
  next_operations_was_read: true
  completed_scope_evidence_present: true
  user_capacity_evidence_present: true
  active_day6_next_connection_present: true
  D0_D6_all_exist: true
  active_day6_next_start_connection_target: 2026-05-21
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  L2_not_overtake_L1: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  weekend_L3_only_reflected: true
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  correction_reflected: 2026-05-13実績によりL1 P81、L2 P66から再接続。L2はL1に追いつくまで実施し、追いついたらL1を進める
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
- L2はL1に追いつくまで実施し、追いついたらL1を進める。
- L2はL1の進行範囲を追い越さない。L2はL1と同ページまで追いつくことは可。
- 労働経済白書のポイントはL1なし。L2のみでページ管理する。
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- 平日仕事日はL3なし。
- 土日祝は原則L3のみ。
- Todoist is projection only.

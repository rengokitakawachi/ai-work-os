# delta active_operations

## Metadata

version: delta_v0.16_active_operations_2026_05_17_after_2026_05_16_no_progress
updated_at: 2026-05-16
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_after_2026_05_16_no_progress_due_to_illness
active_range: 2026-05-17〜2026-05-23
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
  date: 2026-05-16
  path: systems/delta/history/daily/2026-05-16.md
  sha: 7252bed27d9d3e3d5760c5d870fe42aa8d80602f
  judgment: no_progress_due_to_illness
  study_time: 0分
  key_result:
    - 2026-05-16は体調不良のため進捗なし
    - 2026-05-15 daily history は存在しないため実績を補完しない
    - 最新確定位置は厚生年金保険法 L1 P81、L2 P66、国民年金法 択一 Q4-2まで
    - 2026-05-17から再開できそうとのユーザー報告あり

## Current position

current_position:
  as_of: 2026-05-16_daily_review_completed
  source_policy: 2026-05-15実績はdaily history未存在のため補完しない
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
    latest: 2026-05-16 未報告。進捗なし扱い
    daily_target: 40問
  gap_status: compression_required
  operation_mode: restart_from_2026_05_17_l3_then_l2_catchup

## Operating rule override from user

l1_l2_sequence_rule:
  rule: L2はL1に追いつくまで実施し、追いついてからL1を進める。L1/L2が同位置なら先にL1を進め、次にL2を追いつかせる
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
  - 2026-05-17: 日曜。L3のみ
  - 2026-05-18: 平日仕事日。L3なし
  - 2026-05-19: 平日仕事日。L3なし
  - 2026-05-20: 平日仕事日。L3なし
  - 2026-05-21: 平日仕事日。L3なし
  - 2026-05-22: 平日仕事日。L3なし
  - 2026-05-23: 土曜。L3のみ

---

# Active operations: D0〜D6

## Day0（2026-05-17）

- task: 国民年金法 択一 Q4-3〜Q4-4（2問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）＋Q7-1〜Q7-2（2問）＋Q8-1〜Q8-3（3問）＋Q9-1〜Q9-6（6問）
  rolling_day: Day0
  due_date: 2026-05-17
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 90
  operation_mode: restart_l3_after_illness
  plan_anchor: 2026-05-16は体調不良で進捗なし。2026-05-17は日曜のためL3のみ。国民年金法 択一 Q4-3から再開
  expected_position: 国民年金法 択一 Q9-6完了
  current_position: 国民年金法 択一 Q4-2まで実施済み。次はQ4-3
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
    - 厚生年金保険法 L1/L2。日曜のためL3のみ
  recompute_triggers:
    - Q4-3未達
    - Q9-6未達

## Day1（2026-05-18）

- task: 厚生年金保険法 L2 P67〜P81（15ページ）＋厚生年金保険法 L1 P82〜P125（44ページ）
  rolling_day: Day1
  due_date: 2026-05-18
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 140
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: 最新確定位置はL1 P81、L2 P66。まずL2をP81まで追いつかせ、その後L1をP125へ進める
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
    - L1 P110未達
    - L2がL1を追い越す報告

## Day2（2026-05-19）

- task: 厚生年金保険法 L2 P82〜P125（44ページ）＋厚生年金保険法 L1 P126〜P160（35ページ）
  rolling_day: Day2
  due_date: 2026-05-19
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 150
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: Day1でL1 P125まで先行後、L2をP125まで追いつかせ、その後L1をP160へ進める
  expected_position: 厚生年金保険法 L2 P125完了、L1 P160完了
  current_position: Day1標準達成後はL2 P82、L1 P126開始
  gap_status: compression_required
  start_page: L2 P82、L1 P126
  standard_end_page: L2 P125、L1 P160
  next_start_page: 厚生年金保険法 L2 P126、L1 P161
  page_range: L2 P82〜P125、L1 P126〜P160
  pages: 79
  must_line:
    - 厚生年金保険法 L2 P82〜P125（44ページ）
  standard_line:
    - 厚生年金保険法 L2 P82〜P125（44ページ）＋厚生年金保険法 L1 P126〜P160（35ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P125到達
    - 厚生年金保険法 L1 P160到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P125未達
    - L1 P150未達
    - L2がL1を追い越す報告

## Day3（2026-05-20）

- task: 厚生年金保険法 L2 P126〜P160（35ページ）＋厚生年金保険法 L1 P161〜P200（40ページ）
  rolling_day: Day3
  due_date: 2026-05-20
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 145
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: L2をL1 P160へ追いつかせ、その後L1をP200へ進める
  expected_position: 厚生年金保険法 L2 P160完了、L1 P200完了
  current_position: Day2標準達成後はL2 P126、L1 P161開始
  gap_status: compression_required
  start_page: L2 P126、L1 P161
  standard_end_page: L2 P160、L1 P200
  next_start_page: 厚生年金保険法 L2 P161、L1 P201
  page_range: L2 P126〜P160、L1 P161〜P200
  pages: 75
  must_line:
    - 厚生年金保険法 L2 P126〜P160（35ページ）
  standard_line:
    - 厚生年金保険法 L2 P126〜P160（35ページ）＋厚生年金保険法 L1 P161〜P200（40ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P160到達
    - 厚生年金保険法 L1 P200到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P160未達
    - L1 P190未達
    - L2がL1を追い越す報告

## Day4（2026-05-21）

- task: 厚生年金保険法 L2 P161〜P200（40ページ）＋厚生年金保険法 L1 P201〜P240（40ページ）
  rolling_day: Day4
  due_date: 2026-05-21
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 150
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: L2をL1 P200へ追いつかせ、その後L1をP240へ進める
  expected_position: 厚生年金保険法 L2 P200完了、L1 P240完了
  current_position: Day3標準達成後はL2 P161、L1 P201開始
  gap_status: compression_required
  start_page: L2 P161、L1 P201
  standard_end_page: L2 P200、L1 P240
  next_start_page: 厚生年金保険法 L2 P201、L1 P241
  page_range: L2 P161〜P200、L1 P201〜P240
  pages: 80
  must_line:
    - 厚生年金保険法 L2 P161〜P200（40ページ）
  standard_line:
    - 厚生年金保険法 L2 P161〜P200（40ページ）＋厚生年金保険法 L1 P201〜P240（40ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P200到達
    - 厚生年金保険法 L1 P240到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P200未達
    - L1 P230未達
    - L2がL1を追い越す報告

## Day5（2026-05-22）

- task: 厚生年金保険法 L2 P201〜P240（40ページ）＋厚生年金保険法 L1 P241〜P284（44ページ）
  rolling_day: Day5
  due_date: 2026-05-22
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 160
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: L2をL1 P240へ追いつかせ、その後L1をP284まで進める
  expected_position: 厚生年金保険法 L2 P240完了、L1 P284完了
  current_position: Day4標準達成後はL2 P201、L1 P241開始
  gap_status: compression_required
  start_page: L2 P201、L1 P241
  standard_end_page: L2 P240、L1 P284
  next_start_page: 厚生年金保険法 L2 P241
  page_range: L2 P201〜P240、L1 P241〜P284
  pages: 84
  must_line:
    - 厚生年金保険法 L2 P201〜P240（40ページ）
  standard_line:
    - 厚生年金保険法 L2 P201〜P240（40ページ）＋厚生年金保険法 L1 P241〜P284（44ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P240到達
    - 厚生年金保険法 L1 P284到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P240未達
    - L1 P284未達
    - L2がL1を追い越す報告

## Day6（2026-05-23）

- task: 国民年金法 択一 Q9-7〜Q9-10（4問）＋Q10-0（演習対象なし）＋Q11-1〜Q11-7（7問）＋Q12-1（1問）＋Q13-1〜Q13-2（2問）
  rolling_day: Day6
  due_date: 2026-05-23
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 90
  operation_mode: weekend_l3_only
  plan_anchor: 2026-05-23は土曜でL3のみ。Day0標準達成後のQ9-7から接続する
  expected_position: 国民年金法 択一 Q13-2完了。厚生年金保険法 L1 P284完了、L2 P240完了
  current_position: Day0標準達成後は国民年金法 択一 Q9-7開始
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
    - 厚生年金保険法 L2 P241以降
    - 国民年金法 択一 Q14-1以降はnextへ接続
  recompute_triggers:
    - Q9-7未達
    - Q13-2未達

---

## Active / Next connection guard

active_day6_next_connection:
  active_day6_due_date: 2026-05-23
  active_day6_expected_position: 厚生年金保険法 L1 P284完了、L2 P240完了。国民年金法L1/L2 P277完了。国民年金法 択一 Q13-2完了。労働経済白書のポイント L2 P13完了
  expected_next_start_date: 2026-05-24
  next_day_first_line: 2026-05-24 国民年金法 択一 Q14-1〜Q14-17（17問）
  connection_status: next_operations_needs_patch_to_start_2026_05_24

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  expected_next_start_date: 2026-05-24
  active_day6_expected_position: 厚生年金保険法 L1 P284完了、L2 P240完了、国民年金法 択一 Q13-2完了
  next_day_first_line: 2026-05-24 国民年金法 択一 Q14-1〜Q14-17（17問）

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
  active_day6_next_start_connection_target: 2026-05-24
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  L2_not_overtake_L1: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  weekend_L3_only_reflected: true
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  correction_reflected: 2026-05-16 no_progress_due_to_illness。2026-05-17から再開
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
- 秒トレはoperations rollingの進捗接続には使わない。
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- 平日仕事日はL3なし。
- 土日祝は原則L3のみ。
- Todoist is projection only.

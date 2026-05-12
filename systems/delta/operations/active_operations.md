# delta active_operations

## Metadata

version: delta_v0.11_active_operations_2026_05_13_after_2026_05_12_daily_review
updated_at: 2026-05-12
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_after_2026_05_12_review_l2_catchup_success
active_range: 2026-05-13〜2026-05-19
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
  date: 2026-05-12
  path: systems/delta/history/daily/2026-05-12.md
  sha: 3b1cd4221cc15629c0d79d0c8c47aee33b3fd52e
  judgment: completed_for_today_L2_catchup_success_L1_remaining
  study_time: 1時間20分
  sekotore: 40問
  key_result:
    - 厚生年金保険法 L2 P1〜P47 完了
    - 厚生年金保険法 L1 P66完了のまま。P67〜P70は未報告
    - 秒トレ40問達成
    - 国民年金法 択一の次回再開は Q4-3

## Current position

current_position:
  as_of: 2026-05-12_daily_review_completed
  国民年金法:
    L1: P277完了。一巡目終了
    L2: P277完了。一巡目終了
    選択問題: Q15-1〜Q15-14完了
    択一問題: Q4-2まで実施済み。次はQ4-3
    weak_points_for_after_first_pass: [Q1-1, Q2-2, Q3-2, Q4-1, Q4-2]
    review_targets_for_after_first_pass: [Q2-1, Q2-3, Q2-4, Q2-5]
  厚生年金保険法:
    L1: P66完了。次はP67
    L2: P47完了。次はP48
  労働経済白書のポイント:
    L1: なし
    L2: P13完了。次はP14
  秒トレ:
    latest: 2026-05-12 40問
    daily_target: 40問
  gap_status: compression_required_but_l2_improved
  operation_mode: first_pass_priority_l2_catchup

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
  - 2026-05-13: 平日仕事日。L3なし
  - 2026-05-14: 平日仕事日。L3なし
  - 2026-05-15: 平日仕事日。L3なし
  - 2026-05-16: 土曜。L3のみ
  - 2026-05-17: 日曜。L3のみ
  - 2026-05-18: 平日仕事日。L3なし
  - 2026-05-19: 平日仕事日。L3なし

---

# Active operations: D0〜D6

## Day0（2026-05-13）

- task: 厚生年金保険法 L2 P48〜P80（33ページ）＋厚生年金保険法 L1 P67〜P70（4ページ）
  rolling_day: Day0
  due_date: 2026-05-13
  subject: 厚生年金保険法
  study_type: L2_plus_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 120
  operation_mode: first_pass_priority_l2_catchup
  plan_anchor: 2026-05-12実績でL2はP47まで前倒し。5/13はL2をP80へ接続し、L1未報告分P67〜P70を回収
  expected_position: 厚生年金保険法 L2 P80完了、L1 P70完了
  current_position: 厚生年金保険法 L2 P47完了、L1 P66完了
  gap_status: compression_required_but_l2_improved
  start_page: L2 P48、L1 P67
  standard_end_page: L2 P80、L1 P70
  next_start_page: 厚生年金保険法 L1 P71、L2 P81
  page_range: L2 P48〜P80、L1 P67〜P70
  pages: 37
  must_line:
    - 厚生年金保険法 L2 P48〜P70（23ページ）
  standard_line:
    - 厚生年金保険法 L2 P48〜P80（33ページ）＋厚生年金保険法 L1 P67〜P70（4ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P80到達
    - 厚生年金保険法 L1 P70到達
  defer_targets:
    - 平日仕事日のL3
    - 労働経済白書のポイント L2 P14以降
  recompute_triggers:
    - 厚生年金保険法 L2 P70未達
    - 厚生年金保険法 L2 P80未達
    - 厚生年金保険法 L1 P70未達
    - 秒トレ20問未満

## Day1（2026-05-14）

- task: 厚生年金保険法 L1 P71〜P110（40ページ）
  rolling_day: Day1
  due_date: 2026-05-14
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1をP110へ接続する
  expected_position: 厚生年金保険法 L1 P110完了
  current_position: Day0標準達成後は厚生年金保険法 L1 P71開始
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
    - 厚生年金保険法 L1 P71〜P130（60ページ）＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L1 P110到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - P110未達

## Day2（2026-05-15）

- task: 厚生年金保険法 L1 P111〜P155（45ページ）
  rolling_day: Day2
  due_date: 2026-05-15
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 130
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1をP155へ接続する
  expected_position: 厚生年金保険法 L1 P155完了
  current_position: Day1標準達成後は厚生年金保険法 L1 P111開始
  gap_status: compression_required
  start_page: P111
  standard_end_page: P155
  next_start_page: P156
  page_range: P111〜P155
  pages: 45
  must_line:
    - 厚生年金保険法 L1 P111〜P130（20ページ）
  standard_line:
    - 厚生年金保険法 L1 P111〜P155（45ページ）
  stretch_line:
    - 厚生年金保険法 L1 P111〜P165（55ページ）＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L1 P155到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L2 P81以降
  recompute_triggers:
    - P155未達

## Day3（2026-05-16）

- task: 国民年金法 択一 Q4-3〜Q4-4（2問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）＋Q7-1〜Q7-2（2問）＋Q8-1〜Q8-3（3問）＋Q9-1〜Q9-6（6問）
  rolling_day: Day3
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

## Day4（2026-05-17）

- task: 国民年金法 択一 Q9-7〜Q9-10（4問）＋Q10-0（演習対象なし）＋Q11-1〜Q11-7（7問）＋Q12-1（1問）＋Q13-1〜Q13-2（2問）
  rolling_day: Day4
  due_date: 2026-05-17
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 90
  operation_mode: first_pass_priority_compression
  plan_anchor: 2026-05-17は日曜でL3のみ。Day3標準達成後のQ9-7から接続する
  expected_position: 国民年金法 択一 Q13-2完了
  current_position: Day3標準達成後は国民年金法 択一 Q9-7開始
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
    - Q4-1・Q4-2を含む×回収
    - Q14-1以降の本格実施はnextへ接続
  recompute_triggers:
    - Q9-7未達
    - Q11-7未達
    - Q13-2未達

## Day5（2026-05-18）

- task: 厚生年金保険法 L1 P156〜P200（45ページ）
  rolling_day: Day5
  due_date: 2026-05-18
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 130
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1をP200へ接続する
  expected_position: 厚生年金保険法 L1 P200完了
  current_position: Day2標準達成後は厚生年金保険法 L1 P156開始
  gap_status: compression_required
  start_page: P156
  standard_end_page: P200
  next_start_page: P201
  page_range: P156〜P200
  pages: 45
  must_line:
    - 厚生年金保険法 L1 P156〜P175（20ページ）
  standard_line:
    - 厚生年金保険法 L1 P156〜P200（45ページ）
  stretch_line:
    - 厚生年金保険法 L1 P156〜P210（55ページ）＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L1 P200到達
  defer_targets:
    - 平日仕事日のL3
    - 労働経済白書のポイント L2 P14以降
  recompute_triggers:
    - P200未達

## Day6（2026-05-19）

- task: 厚生年金保険法 L2 P81〜P125（45ページ）
  rolling_day: Day6
  due_date: 2026-05-19
  subject: 厚生年金保険法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 130
  operation_mode: first_pass_priority_compression
  plan_anchor: Active側で5/19を所有し、next_operationsは5/20開始へ接続する
  expected_position: 厚生年金保険法 L2 P125完了
  current_position: Day0標準達成後は厚生年金保険法 L2 P81開始
  gap_status: compression_required
  start_page: P81
  standard_end_page: P125
  next_start_page: P126
  page_range: P81〜P125
  pages: 45
  must_line:
    - 厚生年金保険法 L2 P81〜P100（20ページ）
  standard_line:
    - 厚生年金保険法 L2 P81〜P125（45ページ）
  stretch_line:
    - 厚生年金保険法 L2 P81〜P135（55ページ）＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P125到達
  defer_targets:
    - 平日仕事日のL3
    - 労働経済白書のポイント L2 P14以降
  recompute_triggers:
    - P125未達

---

## Active / Next connection guard

active_day6_next_connection:
  active_day6_due_date: 2026-05-19
  active_day6_expected_position: 厚生年金保険法 L1 P200完了、L2 P125完了。国民年金法L1/L2 P277完了。国民年金法 択一 Q13-2完了。労働経済白書のポイント L2 P13完了
  expected_next_start_date: 2026-05-20
  next_day_first_line: 2026-05-20 厚生年金保険法 L1 P201〜P245（45ページ）
  connection_status: next_operations_needs_patch_to_start_2026_05_20

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  expected_next_start_date: 2026-05-20
  active_day6_expected_position: 厚生年金保険法 L1 P200完了、L2 P125完了、国民年金法 択一 Q13-2完了
  next_day_first_line: 2026-05-20 厚生年金保険法 L1 P201〜P245（45ページ）

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
  active_day6_next_start_connection_target: 2026-05-20
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  weekend_L3_only_reflected: true
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  correction_reflected: 2026-05-12実績により厚生年金保険法L2はP48から、L1はP67から
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
- 労働経済白書のポイントはL1なし。L2のみでページ管理する。
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- 平日仕事日はL3なし。
- 土日祝は原則L3のみ。
- Todoist is projection only.

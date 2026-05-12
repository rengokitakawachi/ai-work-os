# delta active_operations

## Metadata

version: delta_v0.12_active_operations_2026_05_13_l2_catch_up_then_l1_advance_fix
updated_at: 2026-05-12
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_l2_catches_up_then_l1_advances
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

- task: 厚生年金保険法 L2 P48〜P66（19ページ）＋厚生年金保険法 L1 P67〜P100（34ページ）
  rolling_day: Day0
  due_date: 2026-05-13
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 130
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: L2を現在のL1位置P66まで追いつかせ、その後L1をP100まで進める。L2はL1を追い越さない
  expected_position: 厚生年金保険法 L2 P66完了、L1 P100完了
  current_position: 厚生年金保険法 L2 P47完了、L1 P66完了
  gap_status: compression_required_but_l2_improved
  start_page: L2 P48、L1 P67
  standard_end_page: L2 P66、L1 P100
  next_start_page: 厚生年金保険法 L2 P67、L1 P101
  page_range: L2 P48〜P66、L1 P67〜P100
  pages: 53
  must_line:
    - 厚生年金保険法 L2 P48〜P66（19ページ）
  standard_line:
    - 厚生年金保険法 L2 P48〜P66（19ページ）＋厚生年金保険法 L1 P67〜P100（34ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P66到達
    - 厚生年金保険法 L1 P100到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L2 P67以降。L1が先行してから追いつく
  recompute_triggers:
    - 厚生年金保険法 L2 P66未達
    - 厚生年金保険法 L1 P80未達
    - 厚生年金保険法 L2がL1を追い越す報告
    - 秒トレ20問未満

## Day1（2026-05-14）

- task: 厚生年金保険法 L2 P67〜P100（34ページ）＋厚生年金保険法 L1 P101〜P125（25ページ）
  rolling_day: Day1
  due_date: 2026-05-14
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 140
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: Day0でL1 P100まで先行後、L2をP100まで追いつかせ、その後L1をP125へ進める
  expected_position: 厚生年金保険法 L2 P100完了、L1 P125完了
  current_position: Day0標準達成後はL2 P67、L1 P101開始
  gap_status: compression_required
  start_page: L2 P67、L1 P101
  standard_end_page: L2 P100、L1 P125
  next_start_page: 厚生年金保険法 L2 P101、L1 P126
  page_range: L2 P67〜P100、L1 P101〜P125
  pages: 59
  must_line:
    - 厚生年金保険法 L2 P67〜P100（34ページ）
  standard_line:
    - 厚生年金保険法 L2 P67〜P100（34ページ）＋厚生年金保険法 L1 P101〜P125（25ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P100到達
    - 厚生年金保険法 L1 P125到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P100未達
    - L1 P125未達
    - L2がL1を追い越す報告

## Day2（2026-05-15）

- task: 厚生年金保険法 L2 P101〜P125（25ページ）＋厚生年金保険法 L1 P126〜P170（45ページ）
  rolling_day: Day2
  due_date: 2026-05-15
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 150
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: L2をP125まで追いつかせた後、L1をP170へ先行させる
  expected_position: 厚生年金保険法 L2 P125完了、L1 P170完了
  current_position: Day1標準達成後はL2 P101、L1 P126開始
  gap_status: compression_required
  start_page: L2 P101、L1 P126
  standard_end_page: L2 P125、L1 P170
  next_start_page: 厚生年金保険法 L2 P126、L1 P171
  page_range: L2 P101〜P125、L1 P126〜P170
  pages: 70
  must_line:
    - 厚生年金保険法 L2 P101〜P125（25ページ）
  standard_line:
    - 厚生年金保険法 L2 P101〜P125（25ページ）＋厚生年金保険法 L1 P126〜P170（45ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P125到達
    - 厚生年金保険法 L1 P170到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P125未達
    - L1 P170未達
    - L2がL1を追い越す報告

## Day3（2026-05-16）

- task: 国民年金法 択一 Q4-3〜Q4-4（2問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）＋Q7-1〜Q7-2（2問）＋Q8-1〜Q8-3（3問）＋Q9-1〜Q9-6（6問）
  rolling_day: Day3
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
    - Q14-1以降の本格実施はnextへ接続
  recompute_triggers:
    - Q9-7未達
    - Q13-2未達

## Day5（2026-05-18）

- task: 厚生年金保険法 L2 P126〜P170（45ページ）＋厚生年金保険法 L1 P171〜P200（30ページ）
  rolling_day: Day5
  due_date: 2026-05-18
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 150
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: Day2でL1 P170まで先行後、L2をP170まで追いつかせ、その後L1をP200へ進める
  expected_position: 厚生年金保険法 L2 P170完了、L1 P200完了
  current_position: Day2標準達成後はL2 P126、L1 P171開始
  gap_status: compression_required
  start_page: L2 P126、L1 P171
  standard_end_page: L2 P170、L1 P200
  next_start_page: 厚生年金保険法 L2 P171、L1 P201
  page_range: L2 P126〜P170、L1 P171〜P200
  pages: 75
  must_line:
    - 厚生年金保険法 L2 P126〜P150（25ページ）
  standard_line:
    - 厚生年金保険法 L2 P126〜P170（45ページ）＋厚生年金保険法 L1 P171〜P200（30ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P170到達
    - 厚生年金保険法 L1 P200到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P170未達
    - L1 P200未達
    - L2がL1を追い越す報告

## Day6（2026-05-19）

- task: 厚生年金保険法 L2 P171〜P200（30ページ）＋厚生年金保険法 L1 P201〜P230（30ページ）
  rolling_day: Day6
  due_date: 2026-05-19
  subject: 厚生年金保険法
  study_type: L2_then_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 140
  operation_mode: l2_catches_up_then_l1_advances
  plan_anchor: Active側で5/19を所有し、next_operationsは5/20開始へ接続する。L2はL1 P200まで追いつき、その後L1をP230へ進める
  expected_position: 厚生年金保険法 L2 P200完了、L1 P230完了
  current_position: Day5標準達成後はL2 P171、L1 P201開始
  gap_status: compression_required
  start_page: L2 P171、L1 P201
  standard_end_page: L2 P200、L1 P230
  next_start_page: 厚生年金保険法 L2 P201、L1 P231
  page_range: L2 P171〜P200、L1 P201〜P230
  pages: 60
  must_line:
    - 厚生年金保険法 L2 P171〜P200（30ページ）
  standard_line:
    - 厚生年金保険法 L2 P171〜P200（30ページ）＋厚生年金保険法 L1 P201〜P230（30ページ）
  stretch_line:
    - 標準ライン＋秒トレ40問
  recovery_targets:
    - 厚生年金保険法 L2 P200到達
    - 厚生年金保険法 L1 P230到達
  defer_targets:
    - 平日仕事日のL3
  recompute_triggers:
    - L2 P200未達
    - L1 P230未達
    - L2がL1を追い越す報告

---

## Active / Next connection guard

active_day6_next_connection:
  active_day6_due_date: 2026-05-19
  active_day6_expected_position: 厚生年金保険法 L1 P230完了、L2 P200完了。国民年金法L1/L2 P277完了。国民年金法 択一 Q13-2完了。労働経済白書のポイント L2 P13完了
  expected_next_start_date: 2026-05-20
  next_day_first_line: 2026-05-20 厚生年金保険法 L2 P201〜P230（30ページ）＋厚生年金保険法 L1 P231〜P260（30ページ）
  connection_status: next_operations_needs_patch_to_start_2026_05_20_from_l2_p201_l1_p231

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  expected_next_start_date: 2026-05-20
  active_day6_expected_position: 厚生年金保険法 L1 P230完了、L2 P200完了、国民年金法 択一 Q13-2完了
  next_day_first_line: 2026-05-20 厚生年金保険法 L2 P201〜P230（30ページ）＋厚生年金保険法 L1 P231〜P260（30ページ）

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
  active_day6_next_start_connection_target: 2026-05-20
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  L2_not_overtake_L1: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  weekend_L3_only_reflected: true
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  correction_reflected: L2はL1に追いつくまで実施し、追いついたらL1を進める運用に修正
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

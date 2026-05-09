# delta active_operations

## Metadata

version: delta_v0.7_active_operations_2026_05_09_user_adjusted_kounen_p30
updated_at: 2026-05-09
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_user_adjusted_kounen_p30_compression_required
last_daily_review: systems/delta/history/daily/2026-05-08.md
latest_in_day_history: systems/delta/history/daily/2026-05-09.md

validation_markers:
  - Active operations are D0-D6 execution SSOT only.
  - Next operations are stored separately in systems/delta/operations/next_operations.md.
  - DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
  - Actual performance records are stored in daily history, not operations.
  - 2026-06-30までに1巡完了を優先する。
  - 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
  - 2026-05-10 is L3 unavailable day.
  - 2026-05-10 is 国民年金法 L1 P262〜P277.
  - 2026-05-11 is 厚生年金保険法 L1 P1〜P30 plus 国民年金法 L2 P262〜P277.
  - 2026-05-11 includes 国民年金法 L2 P262〜P277 as 国民年金法一巡目終了.
  - 2026-05-11〜2026-05-15 are weekday workdays, so L3 is not assigned.
  - L3の日別計画は実在Q番号のみを使う。

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  canonical_branch: feature/atlas-pre-delta-foundation
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-09.md
    - systems/delta/history/daily/2026-05-06.md
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  todoist_role: projection_only

read_sources:
  roadmap:
    path: systems/delta/roadmap/delta_roadmap.md
    sha: 70bdfa5e7e31299bc6f0ad027ab939611c654357
  plan:
    path: systems/delta/plan/2026_sharoushi_exam_plan.md
    sha: b4b8e077e82b0601e9d44a30712c21454f351c9a
  previous_active_operations:
    path: systems/delta/operations/active_operations.md
    sha: aae52bfa128c7d50f2215637d11d959ca3c588b4
  next_operations:
    path: systems/delta/operations/next_operations.md
    sha: 0d8ffdded5d26b9795f4ed5cd729fac9dbfba73f
  latest_daily_history:
    path: systems/delta/history/daily/2026-05-09.md
    sha: 15febd09e3f13b3c68a03bb91fc06cd2a382c1ae
  prior_daily_history:
    path: systems/delta/history/daily/2026-05-06.md
    sha: 82ec23426c43a19965a4a9800de8400a553807a5

roadmap_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過
  priority_rule: first_pass_completion_before_review

plan_anchor:
  medium_plan: 2026-05-07〜2026-05-17 国民年金法L1/L2を完了し、国民年金法L3を継続
  immediate_target: 2026-05-10〜2026-05-11で国民年金法L1/L2をP277まで完了し、厚生年金保険法L1へ早期接続
  first_pass_target: 2026-06-30までに1巡完了

confirmed_question_index:
  国民年金法_L3_択一:
    completed: Q1-1、Q2-1〜Q2-5、Q3-1〜Q3-3
    next_question: Q4-1
    chapters:
      - chapter: 4
        range: Q4-1〜Q4-4
        count: 4
      - chapter: 5
        range: Q5-0
        count: 0
        no_exercise: true
      - chapter: 6
        range: Q6-1〜Q6-2
        count: 2
      - chapter: 7
        range: Q7-1〜Q7-2
        count: 2
      - chapter: 8
        range: Q8-1〜Q8-3
        count: 3
      - chapter: 9
        range: Q9-1〜Q9-10
        count: 10
      - chapter: 10
        range: Q10-0
        count: 0
        no_exercise: true
      - chapter: 11
        range: Q11-1〜Q11-7
        count: 7
      - chapter: 12
        range: Q12-1
        count: 1
      - chapter: 13
        range: Q13-1〜Q13-2
        count: 2
      - chapter: 14
        range: Q14-1〜Q14-17
        count: 17
    total_remaining_new_questions_after_Q3-3: 48

completed_scope_evidence:
  健康保険法:
    L3_new_exercises: completed
    allowed_future_use: recovery_or_second_pass_only
  国民年金法:
    L1_current_position: P261完了
    L2_current_position: P261完了
    L1_L2_next_start: P262
    first_pass_completion_page: P277
    blank_pages: [P259, P260, P261]
    L3_selected_questions: completed_Q15-1_to_Q15-14
    L3_multiple_choice_current_position: Q3-3完了
    L3_multiple_choice_next_question: Q4-1
    L3_weak_points_for_later_review: [Q1-1, Q2-2, Q3-2]
    L3_review_targets_for_later_review: [Q2-1, Q2-3, Q2-4, Q2-5]
    first_pass_rule: 弱点回収は1巡後。1巡目中は新規未通過範囲を優先

user_capacity_evidence:
  L1_L2_pages:
    recent_actuals:
      - 2026-05-07 国民年金法L2 P158〜P209 52ページ 63分
      - 2026-05-08 国民年金法L2 P210〜P233 24ページ 68分
      - 2026-05-09 国民年金法L2 P234〜P261 28ページ、うちP259〜P261空白
    standard_capacity: 35〜40ページ程度
    compression_capacity: 40〜60ページ程度
    upper_guard: 60ページ超は原則分割
  L3_multiple_choice_questions:
    standard_capacity: 12〜18問程度
    real_question_id_required: true
  sekotore:
    daily_target_questions: 40
    latest_actual: 2026-05-08 19問

special_days:
  - 2026-05-09: 土曜。L3可
  - 2026-05-10: L3不可。国民年金法L1中心
  - 2026-05-11: 平日仕事日。厚生年金保険法L1 P1〜P30＋国民年金法L2 P262〜P277
  - 2026-05-12: 平日仕事日。L3なし
  - 2026-05-13: 平日仕事日。L3なし
  - 2026-05-14: 平日仕事日。L3なし
  - 2026-05-15: 平日仕事日。L3なし

current_position:
  as_of: 2026-05-09
  L1:
    subject: 国民年金法
    current_position: P261完了
    next_start_page: P262
  L2:
    subject: 国民年金法
    current_position: P261完了
    next_start_page: P262
  L3:
    subject: 国民年金法
    current_question: Q3-3
    next_resume_question_id: Q4-1
  gap_status: compression_required
  operation_mode: first_pass_priority_compression

active_day6_next_connection:
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L1 P110完了、L2 P80完了
  expected_next_start_date: 2026-05-16
  next_first_expected_line: 2026-05-16 国民年金法 L3 択一 Q7-1〜Q9-10（15問）
  connection_status: next_operations_needs_followup_patch_for_kounen_l1_start_P111

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-09
  plan_anchor: Active Day0-D6 2026-05-09〜2026-05-15、Next starts 2026-05-16
  current_position: L1国民年金法P261完了、L2国民年金法P261完了、L3国民年金法択一Q3-3完了、次はQ4-1
  expected_position: 2026-05-15 厚生年金保険法 L1 P110完了、L2 P80完了。2026-05-16に国民年金法L3 Q7-1へ接続
  gap_status: compression_required
  operation_mode: first_pass_priority_compression
  must_line:
    - 2026-05-09 国民年金法 L3 択一 Q4-1〜Q4-4（4問）
  standard_line:
    - 2026-05-09 国民年金法 L3 択一 Q4-1〜Q4-4（4問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）
  stretch_line:
    - 2026-05-09 標準ラインと秒トレ40問
  recovery_targets:
    - 1巡目はL3回収なし。Q1-1・Q2-2・Q3-2等は1巡後に回収
  forward_targets:
    - 国民年金法L3の実在Q番号を新規通過
    - 国民年金法L1 P262〜P277
    - 国民年金法L2 P262〜P277
    - 厚生年金保険法L1/L2へ接続
    - 秒トレ40問復帰
  defer_targets:
    - Q1-1・Q2-2・Q3-2の回収
    - Q2-1・Q2-3・Q2-4・Q2-5の確認
    - 存在しないQ3-4
    - 厚生年金保険法L3開始
  recompute_triggers:
    - Q4-1〜Q6-2未達
    - 5/10 国民年金法 L1 P277未達
    - 5/11 国民年金法 L2 P277未達
    - 5/15 厚生年金保険法 L1 P110未達
    - 5/15 厚生年金保険法 L2 P80未達
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-09）

- task: 国民年金法 L3 択一 Q4-1〜Q4-4（4問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）
  rolling_day: Day0
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 50
  operation_mode: first_pass_priority_compression
  plan_anchor: 2026-05-09 土曜L3可。1巡目は回収せず、Q3-3後の実在Q番号を新規通過
  expected_position: 国民年金法 L3 択一 Q6-2完了
  current_position: 国民年金法 L3 択一 Q3-3完了、次回Q4-1
  gap_status: compression_required
  start_question_id: Q4-1
  must_end_question_id: Q4-4
  standard_end_question_id: Q6-2
  stretch_end_question_id: Q6-2
  next_resume_question_id: Q7-1
  questions: 6
  question_range: Q4-1〜Q4-4、Q5-0、Q6-1〜Q6-2
  must_line:
    - 国民年金法 L3 択一 Q4-1〜Q4-4（4問）
  standard_line:
    - 国民年金法 L3 択一 Q4-1〜Q4-4（4問）＋Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）
  stretch_line:
    - 標準ラインと秒トレ40問
  recovery_targets:
    - なし。Q1-1・Q2-2・Q3-2の回収は1巡後へ延期
  defer_targets:
    - Q1-1・Q2-2・Q3-2の回収
    - Q2-1・Q2-3・Q2-4・Q2-5の確認
  recompute_triggers:
    - Q4-1未達
    - Q4-4未達
    - Q6-2未達

## Day1（2026-05-10）

- task: 国民年金法 L1 P262〜P277（16ページ）
  rolling_day: Day1
  due_date: 2026-05-10
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  estimated_minutes: 60
  operation_mode: first_pass_priority_compression
  plan_anchor: 2026-05-10 L3不可日。ユーザー指示により国民年金法L1 P262〜P277を実施
  expected_position: 国民年金法 L1 P277完了（一巡目終了）
  current_position: 国民年金法 L1 P261完了、次回P262
  gap_status: compression_required
  start_page: P262
  must_end_page: P270
  standard_end_page: P277
  stretch_end_page: P277
  page_range: P262〜P277
  pages: 16
  next_start_page: 厚生年金保険法P1
  must_line:
    - 国民年金法 L1 P262〜P270（9ページ）
  standard_line:
    - 国民年金法 L1 P262〜P277（16ページ）
  stretch_line:
    - 国民年金法 L1 P262〜P277（16ページ）＋秒トレ40問
  recovery_targets:
    - 国民年金法 L1 P277到達
  defer_targets:
    - 国民年金法 L3 択一の追加演習
    - 国民年金法 L2 P262〜P277
  recompute_triggers:
    - P270未達
    - P277未達
    - 秒トレ未実施

## Day2（2026-05-11）

- task: 厚生年金保険法 L1 P1〜P30（30ページ）＋国民年金法 L2 P262〜P277（16ページ）
  rolling_day: Day2
  due_date: 2026-05-11
  subject: 厚生年金保険法／国民年金法
  study_type: L1_plus_L2
  material: 動画講義＋基礎講座テキスト
  estimated_minutes: 130
  operation_mode: first_pass_priority_compression
  plan_anchor: ユーザー指示により厚生年金保険法L1はP1〜P30程度。国民年金法L2 P262〜P277を含めて国民年金法一巡目終了
  expected_position: 厚生年金保険法 L1 P30完了、国民年金法 L2 P277完了（一巡目終了）
  current_position: 厚生年金保険法 L1未着手、国民年金法 L2 P261完了
  gap_status: compression_required
  start_page: 厚生年金保険法P1、国民年金法P262
  must_end_page: 厚生年金保険法P20、国民年金法P277
  standard_end_page: 厚生年金保険法P30、国民年金法P277
  stretch_end_page: 厚生年金保険法P40、国民年金法P277
  page_range: 厚生年金保険法P1〜P30、国民年金法P262〜P277
  pages: 46
  next_start_page: 厚生年金保険法P31
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
    - 厚生年金保険法P20未達
    - 厚生年金保険法P30未達

## Day3（2026-05-12）

- task: 厚生年金保険法 L1 P31〜P70（40ページ）
  rolling_day: Day3
  due_date: 2026-05-12
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1をP70へ接続
  expected_position: 厚生年金保険法 L1 P70完了
  current_position: Day2標準達成後は厚生年金保険法 L1 P31開始
  gap_status: compression_required
  start_page: P31
  must_end_page: P50
  standard_end_page: P70
  stretch_end_page: P90
  page_range: P31〜P70
  pages: 40
  next_start_page: P71
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
    - 厚生年金保険法 L2 P1以降
  recompute_triggers:
    - P50未達
    - P70未達
    - 5/11 国民年金法P277未達

## Day4（2026-05-13）

- task: 厚生年金保険法 L2 P1〜P40（40ページ）
  rolling_day: Day4
  due_date: 2026-05-13
  subject: 厚生年金保険法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1 P70にL2を接続
  expected_position: 厚生年金保険法 L2 P40完了
  current_position: 厚生年金保険法 L2未着手
  gap_status: compression_required
  start_page: P1
  must_end_page: P20
  standard_end_page: P40
  stretch_end_page: P60
  page_range: P1〜P40
  pages: 40
  next_start_page: P41
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
    - 厚生年金保険法 L3開始
  recompute_triggers:
    - P20未達
    - P40未達
    - 5/12 厚生年金保険法L1 P70未達

## Day5（2026-05-14）

- task: 厚生年金保険法 L1 P71〜P110（40ページ）
  rolling_day: Day5
  due_date: 2026-05-14
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: 厚生年金保険法L1をP110へ接続
  expected_position: 厚生年金保険法 L1 P110完了
  current_position: Day3標準達成後は厚生年金保険法 L1 P71開始
  gap_status: compression_required
  start_page: P71
  must_end_page: P90
  standard_end_page: P110
  stretch_end_page: P130
  page_range: P71〜P110
  pages: 40
  next_start_page: P111
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
    - 厚生年金保険法 L2 P41以降
  recompute_triggers:
    - P90未達
    - P110未達

## Day6（2026-05-15）

- task: 厚生年金保険法 L2 P41〜P80（40ページ）
  rolling_day: Day6
  due_date: 2026-05-15
  subject: 厚生年金保険法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 120
  operation_mode: first_pass_priority_compression
  plan_anchor: Active Day6。翌日2026-05-16をnext_operations開始日にする
  expected_position: 厚生年金保険法 L2 P80完了
  current_position: Day4標準達成後は厚生年金保険法 L2 P41開始
  gap_status: compression_required
  start_page: P41
  must_end_page: P60
  standard_end_page: P80
  stretch_end_page: P100
  page_range: P41〜P80
  pages: 40
  next_start_page: P81
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
    - 厚生年金保険法 L3開始
  recompute_triggers:
    - 厚生年金保険法 L2 P60未達
    - 厚生年金保険法 L2 P80未達

---

## Active / Next connection guard

active_day6_next_connection:
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L1 P110完了、L2 P80完了
  expected_next_start_date: 2026-05-16
  next_day_first_line: 2026-05-16 国民年金法 L3 択一 Q7-1〜Q9-10（15問）
  connection_status: next_operations_needs_followup_patch_for_kounen_l1_start_P111

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  expected_next_start_date: 2026-05-16
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L1 P110完了、L2 P80完了
  next_day_first_line: 2026-05-16 国民年金法 L3 択一 Q7-1〜Q9-10（15問）
  connection_status: next_operations_needs_followup_patch_for_kounen_l1_start_P111

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
  active_day6_next_start_connection_target: 2026-05-16
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  material_sequence_uncertainty_resolved_for_kokunen: true
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  user_adjustment_reflected: 5/11厚生年金法L1をP1〜P30へ調整
  overload_detected: true
  overload_resolution: compression_required。5/15までに厚生年金保険法L1 P110・L2 P80へ接続し、next側はP111開始へ補正する

## Daily review read requirements

required_read_sources:
  - systems/delta/roadmap/delta_roadmap.md
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/history/daily/YYYY-MM-DD.md
  - systems/delta/operations/active_operations.md
  - systems/delta/operations/next_operations.md

## Rules

- Active operations is D0-D6 execution SSOT.
- Next operations is D7-to-medium-target daily plan SSOT.
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- △・×・確認対象は記録だけ残し、1巡目中の新規学習には再投入しない。
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- L3の日別計画は実在Q番号のみを使う。
- Qx-0は演習対象なしとして扱い、演習問題数に含めない。
- 国民年金法L3択一Q3-4は存在しない。3章はQ3-3まで、次は4章Q4-1。
- 平日仕事日はL3を行わず、L1/L2と秒トレを行う。
- 2026-05-10はL3不可日。
- Todoist is projection only.

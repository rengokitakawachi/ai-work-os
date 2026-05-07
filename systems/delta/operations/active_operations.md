# delta active_operations

## Metadata

version: delta_v0.6_active_operations_after_2026_05_07_review
updated_at: 2026-05-07
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_updated_after_daily_review
last_daily_review: systems/delta/history/daily/2026-05-07.md
latest_in_day_history: systems/delta/history/daily/2026-05-07.md

validation_markers:
  - Active operations are D0-D6 execution SSOT only.
  - Next operations are stored separately in systems/delta/operations/next_operations.md.
  - Actual performance records are stored in daily history, not operations.
  - 2026-05-08, 2026-05-11, 2026-05-12, 2026-05-13 are weekday workdays, so L3 is not assigned.
  - 2026-05-09 is Saturday, so L3 is allowed.
  - 2026-05-10 is L3 unavailable day.
  - 国民年金法L3択一の機械的連番推定は禁止。Q1-1〜Q1-16等は誤りとして扱う。

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-07.md
    - systems/delta/history/daily/2026-05-06.md
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  todoist_role: projection_only

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  role: d7_to_2026_06_30_daily_plan_ssot
  next_start_date: 2026-05-13
  target_date: 2026-06-30
  connection_rule: active Day6 expected_position must connect to next first row
  active_day6_expected_position: 国民年金法 L2 P245完了
  next_day_first_line: 2026-05-13 国民年金法 L2 P246〜P280（35ページ）

read_sources:
  roadmap:
    path: systems/delta/roadmap/delta_roadmap.md
    sha: 70bdfa5e7e31299bc6f0ad027ab939611c654357
  plan:
    path: systems/delta/plan/2026_sharoushi_exam_plan.md
    sha: b4b8e077e82b0601e9d44a30712c21454f351c9a
  previous_active_operations:
    path: systems/delta/operations/active_operations.md
    sha: 9616669037822b3cbcca3c4dd29518b7f686e49a
  next_operations:
    path: systems/delta/operations/next_operations.md
    sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
  latest_daily_history:
    path: systems/delta/history/daily/2026-05-07.md
    sha: 6fdf244d3a894646208848aa10b075a566744a55
  recent_daily_history:
    path: systems/delta/history/daily/2026-05-06.md
    sha: 82ec23426c43a19965a4a9800de8400a553807a5

roadmap_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過

plan_anchor:
  medium_plan: 2026-05-07〜2026-05-17 国民年金法L1/L2を完了方向へ進め、国民年金法L3を継続
  immediate_target: 国民年金法L2をP245まで回収し、next_operationsの2026-05-13 P246〜P280へ接続

completed_scope_evidence:
  健康保険法:
    L3_new_exercises: completed
    allowed_future_use: recovery_or_second_pass_only
  国民年金法:
    L1_current_position: P258完了
    L2_current_position: P209完了
    L3_selected_questions: completed_Q15-1_to_Q15-14
    L3_multiple_choice_current_position: Q3-3完了
    L3_multiple_choice_next_question: Q3-4
    L3_weak_points: [Q1-1, Q2-2, Q3-2]
    L3_review_targets: [Q2-1, Q2-3, Q2-4, Q2-5]
    sekotore_2026_05_07: 40問完了

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 35〜40ページ程度
    upper_guard: 50ページ超は原則分割
    actual_2026_05_07: 52ページを63分で完了。ただし継続前提にはせず、標準は40ページ程度に戻す
  L3_multiple_choice_questions:
    standard_capacity: 16問程度。ただし国民年金法PDFの問題番号抽出不整合があるため、実在確認済みの次問を起点にする
  special_days:
    2026-05-08: 平日仕事日。L3なし
    2026-05-09: 土曜。L3可
    2026-05-10: L3不可
    2026-05-11: 平日仕事日。L3なし
    2026-05-12: 平日仕事日。L3なし
    2026-05-13: 平日仕事日。L3なし

current_position:
  as_of: 2026-05-07
  L1:
    subject: 国民年金法
    current_position: P258完了
    next_start_page: P259
    completion_status: incomplete
  L2:
    subject: 国民年金法
    current_position: P209完了
    next_start_page: P210
    completion_status: incomplete
  L3:
    subject: 国民年金法
    selected_completion_status: completed_Q15-1_to_Q15-14
    multiple_choice_status: in_progress
    current_question: Q3-3
    next_resume_question_id: Q3-4
    weak_points: [Q1-1, Q2-2, Q3-2]
    review_targets: [Q2-1, Q2-3, Q2-4, Q2-5]
  sekotore:
    latest_status: 2026-05-07 40問完了
  gap_status: recovery_ahead_for_today_but_L2_gap_remaining
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-07
  plan_anchor: 2026-05-07〜2026-05-17 国民年金法L1/L2完了方向・L3継続
  current_position: L1国民年金法P258完了、L2国民年金法P209完了、L3国民年金法択一Q3-3完了、秒トレ40問完了
  expected_position: 5/8に国民年金法L2 P245まで回収し、5/13のnext_operations 国民年金法L2 P246〜P280へ接続する
  gap_status: recovery_ahead_for_today_but_L2_gap_remaining
  operation_mode: recovery_forward
  must_line:
    - 2026-05-08 国民年金法 L2 P210〜P219（10ページ）
  standard_line:
    - 2026-05-08 国民年金法 L2 P210〜P245（36ページ）
  stretch_line:
    - 2026-05-08 国民年金法 L2 P210〜P258（49ページ）
  recovery_targets:
    - 国民年金法L2をP209からP245まで追いつかせる
    - 国民年金法L3択一はQ3-4を実在確認済み次問として扱う
    - Q1-1、Q2-2、Q3-2を回収対象として保持する
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - 5/8 P219未達
    - 5/8 P245未達
    - Q3-4が教材上存在しない
    - 国民年金法L3択一の問題番号インデックスが確定した
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-07）

- task: 国民年金法 L2 P158〜P209（52ページ）＋秒トレ40問 完了記録
  rolling_day: Day0
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 63
  operation_mode: completed_for_today
  plan_anchor: 2026-05-07 平日仕事日・L2回収優先
  expected_position: 国民年金法 L2 P209完了、秒トレ40問完了
  current_position: 国民年金法 L2 P209完了。L1はP258完了
  gap_status: recovery_ahead_for_today_but_L2_gap_remaining
  start_page: P158
  must_end_page: P175
  standard_end_page: P190
  stretch_end_page: P200
  page_range: P158〜P209
  pages: 52
  next_start_page: P210
  must_line:
    - 達成済み：国民年金法 L2 P158〜P175（18ページ）
  standard_line:
    - 達成済み：国民年金法 L2 P158〜P190（33ページ）
  stretch_line:
    - 達成済み：国民年金法 L2 P158〜P200（43ページ）超過、P209まで完了
  recovery_targets:
    - 完了：国民年金法 L2 P158〜P209
  defer_targets:
    - 平日仕事日のL3
    - 国民年金法 L1 P259以降
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - なし。日報確定済み

## Day1（2026-05-08）

- task: 国民年金法 L2 P210〜P245（36ページ）
  rolling_day: Day1
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 100
  operation_mode: recovery_forward
  plan_anchor: 2026-05-08 平日仕事日・L2追いつき優先
  expected_position: 国民年金法 L2 P245完了
  current_position: 国民年金法 L2 P209完了、次回P210。L1はP258完了
  gap_status: recovery_ahead_for_today_but_L2_gap_remaining
  start_page: P210
  must_end_page: P219
  standard_end_page: P245
  stretch_end_page: P258
  page_range: P210〜P245
  pages: 36
  next_start_page: P210
  must_line:
    - 国民年金法 L2 P210〜P219（10ページ）
  standard_line:
    - 国民年金法 L2 P210〜P245（36ページ）
  stretch_line:
    - 国民年金法 L2 P210〜P258（49ページ）
  recovery_targets:
    - 国民年金法 L2 P210〜P245（36ページ）
  defer_targets:
    - 平日仕事日のL3
    - 国民年金法 L1 P259以降
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P219未達
    - P245未達
    - 秒トレ未実施

## Day2（2026-05-09）

- task: 国民年金法 L3 択一 Q3-4〜Q3-4（1問）＋回収 Q1-1、Q2-2、Q3-2（3問）
  rolling_day: Day2
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 45
  operation_mode: material_sequence_repair
  plan_anchor: 2026-05-09 土曜L3可。問題番号の機械推定禁止を優先
  expected_position: 国民年金法 L3 択一 Q3-4完了、Q1-1・Q2-2・Q3-2回収実施
  current_position: 国民年金法 L3 択一 Q3-3完了、次回Q3-4
  gap_status: material_sequence_uncertain
  start_question_id: Q3-4
  must_end_question_id: Q3-4
  standard_end_question_id: Q3-4
  stretch_end_question_id: Q3-4
  next_resume_question_id: Q3-4
  questions: 4
  question_range: Q3-4〜Q3-4、回収Q1-1・Q2-2・Q3-2
  must_line:
    - 国民年金法 L3 択一 Q3-4〜Q3-4（1問）
  standard_line:
    - 国民年金法 L3 択一 Q3-4〜Q3-4（1問）＋Q1-1・Q2-2・Q3-2回収（3問）
  stretch_line:
    - 標準ライン＋Q2-1・Q2-3・Q2-4・Q2-5確認（4問）
  recovery_targets:
    - Q1-1
    - Q2-2
    - Q3-2
  defer_targets:
    - Q3-5以降の機械的な範囲指定
    - 厚生年金保険法 L3開始
  recompute_triggers:
    - Q3-4が教材上存在しない
    - Q3章の問題番号一覧が確定した
    - Q1-1・Q2-2・Q3-2の回収で×継続

## Day3（2026-05-10）

- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day3
  due_date: 2026-05-10
  subject: 共通
  study_type: rest_or_light_review
  material: none
  estimated_minutes: 0
  operation_mode: normal
  plan_anchor: 2026-05-10 L3不可日
  expected_position: 新規L1/L2/L3なし。秒トレ40問
  current_position: Day2後に更新
  gap_status: delayed_but_managed
  must_line:
    - 新規L1/L2/L3なし。秒トレ40問
  standard_line:
    - 新規L1/L2/L3なし。秒トレ40問
  stretch_line:
    - 国民年金法 L2 P210〜P245のチェック不足箇所確認30分
  recovery_targets:
    - L3不可日を休養に充て、翌日以降のL1/L2を崩さない
  defer_targets:
    - 国民年金法 L3 択一の追加演習
    - 健康保険法×・△回収
  recompute_triggers:
    - 5/9の国民年金法L3回収で×継続
    - 秒トレ未実施

## Day4（2026-05-11）

- task: 国民年金法 L2 P246〜P258（13ページ）＋国民年金法 L1 P259〜P280（22ページ）
  rolling_day: Day4
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L2_plus_L1
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 105
  operation_mode: recovery_forward
  plan_anchor: L2をL1 P258へ追いつかせた後、国民年金法L1完了へ接続
  expected_position: 国民年金法 L2 P258完了、L1 P280完了
  current_position: Day1標準達成後はL2 P246開始。L1はP258完了
  gap_status: delayed_but_managed
  start_page: P246
  standard_end_page: P280
  page_range: L2 P246〜P258、L1 P259〜P280
  pages: 35
  next_start_page: L2 P246 / L1 P259
  must_line:
    - 国民年金法 L2 P246〜P258（13ページ）
  standard_line:
    - 国民年金法 L2 P246〜P258（13ページ）＋L1 P259〜P280（22ページ）
  stretch_line:
    - 標準ライン＋L2 P246〜P258のチェック不足箇所確認
  recovery_targets:
    - 国民年金法 L2をL1 P258へ追いつかせる
    - 国民年金法 L1 P280完了
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - 5/8 L2 P245未達
    - L2 P258未達
    - L1 P280未達

## Day5（2026-05-12）

- task: 国民年金法 L2 P259〜P280（22ページ）
  rolling_day: Day5
  due_date: 2026-05-12
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 70
  operation_mode: recovery_forward
  plan_anchor: 国民年金法L1/L2のP280接続完了
  expected_position: 国民年金法 L2 P280完了
  current_position: Day4標準達成後はL2 P259開始。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P259
  must_end_page: P270
  standard_end_page: P280
  stretch_end_page: P280
  page_range: P259〜P280
  pages: 22
  next_start_page: P259
  must_line:
    - 国民年金法 L2 P259〜P270（12ページ）
  standard_line:
    - 国民年金法 L2 P259〜P280（22ページ）
  stretch_line:
    - 国民年金法 L2 P259〜P280（22ページ）＋国民年金法L1/L2完了確認
  recovery_targets:
    - 国民年金法 L2 P280完了
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始は翌日以降へ
  recompute_triggers:
    - 5/11 L1 P280未達
    - P270未達
    - P280未達

## Day6（2026-05-13）

- task: Active/Next接続確認。国民年金法 L2 P245完了を接続位置として維持
  rolling_day: Day6
  due_date: 2026-05-13
  subject: 国民年金法
  study_type: L2_connection_guard
  material: 基礎講座テキスト
  estimated_minutes: 0
  operation_mode: connection_guard
  plan_anchor: 既存Next operations 2026-05-13 P246〜P280への接続維持
  expected_position: 国民年金法 L2 P245完了
  current_position: Day1標準達成後はP245完了。Day4/Day5が前倒し達成済みの場合はnext側を日次レビューで再接続
  gap_status: connected_to_next_operations
  start_page: P236
  must_end_page: P240
  standard_end_page: P245
  stretch_end_page: P245
  page_range: P236〜P245
  pages: 10
  next_start_page: P246
  must_line:
    - 国民年金法 L2 P236〜P240（5ページ）接続確認
  standard_line:
    - 国民年金法 L2 P236〜P245（10ページ）接続確認
  stretch_line:
    - next_operations 2026-05-13 国民年金法L2 P246〜P280へ接続
  recovery_targets:
    - active Day6 P245 と next first row P246の接続維持
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - 5/12 L2 P280達成済み
    - next_operations 2026-05-13 P246〜P280との重複
    - user_explicitly_requests_recompute

---

## Active / Next connection guard

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  first_next_date: 2026-05-13
  expected_first_next_line: 国民年金法 L2 P246〜P280（35ページ）
  active_day6_standard_end: P245
  active_day6_expected_position: 国民年金法 L2 P245完了
  next_day_first_line: 2026-05-13 国民年金法 L2 P246〜P280（35ページ）
  connection_status: connected

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
  active_operations_was_read: true
  next_operations_was_read: true
  L1_L2_current_position_confirmed: true
  L3_current_position_confirmed: true
  current_subject_not_skipped: true
  completed_subject_not_reintroduced_as_new: true
  L3_order_selection_before_takuitsu: true
  D0_D6_all_exist: true
  D7_target_next_operations_read: true
  active_next_connection_valid: true
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid_with_material_uncertainty_guard: true
  active_contains_next_operations_detail_table: false
  next_operations_period_block_required_absent_in_active: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  overload_detected: true
  overload_resolution: redistribute
  compression_required: 国民年金法L3択一の問題番号インデックス不確定のため、Q3-5以降の新規L3範囲は確定後に再計算
  roadmap_plan_milestone_reachable: conditional_reachable_with_future_next_operations_regeneration

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
- Operations is next-action SSOT only for its own range.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- 国民年金法L3択一は、Q1-1〜Q1-16等の機械的範囲推定を禁止する。
- 平日仕事日はL3を行わず、L1/L2と秒トレを行う。
- 土日祝とGW祝日はL3を行える。
- 2026-05-10はL3不可日。
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.

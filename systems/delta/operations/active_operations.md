# delta active_operations

## Metadata

version: delta_v0.6_active_operations_after_2026_05_06_review
updated_at: 2026-05-06
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_rolled_after_daily_review
last_daily_review: systems/delta/history/daily/2026-05-06.md
latest_in_day_history: systems/delta/history/daily/2026-05-06.md

validation_markers:
  - Active operations are D0-D6 execution SSOT only.
  - Next operations are stored separately in systems/delta/operations/next_operations.md.
  - Actual performance records are stored in daily history, not operations.
  - 2026-05-07 and 2026-05-08 are weekday workdays, so L3 is not assigned.
  - 2026-05-09 is Saturday, so L3 is allowed.
  - 2026-05-10 is L3 unavailable day.
  - 国民年金法L3択一の機械的連番推定は禁止。Q1-1〜Q1-16等は誤りとして扱う。

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-06.md
    - systems/delta/history/daily/2026-05-05.md
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
    sha: 5747741a3c7e3eb0dfe95a4896249ac75201b3aa
  next_operations:
    path: systems/delta/operations/next_operations.md
    sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
  latest_daily_history:
    path: systems/delta/history/daily/2026-05-06.md
    sha: 99e1c23d90f76769423b49f2dd2476e3e0aa75ac
  recent_daily_history:
    path: systems/delta/history/daily/2026-05-05.md
    sha: 1007cc786d57b761d9f00b442a6326639da0a1f3

roadmap_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過

plan_anchor:
  medium_plan: 2026-05-07〜2026-05-17 国民年金法L1/L2を完了方向へ進め、国民年金法L3を継続
  GW_result: 健康保険法L3完了、国民年金法選択完了、国民年金法択一Q3-3まで着手

completed_scope_evidence:
  健康保険法:
    L3_new_exercises: completed
    allowed_future_use: recovery_or_second_pass_only
  国民年金法:
    L3_selected_questions: completed_Q15-1_to_Q15-14
    L3_multiple_choice_current_position: Q3-3完了
    L3_multiple_choice_next_question: Q3-4

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_multiple_choice_questions:
    standard_capacity: 16問程度。ただし国民年金法PDFの問題番号抽出不整合があるため、実在確認済みの次問を起点にする
  special_days:
    2026-05-07: 平日仕事日。L3なし
    2026-05-08: 平日仕事日。L3なし
    2026-05-09: 土曜。L3可
    2026-05-10: L3不可
    2026-05-12: 平日仕事日。L3なし
    2026-05-13: 平日仕事日。L3なし

current_position:
  as_of: 2026-05-06
  L1:
    subject: 国民年金法
    current_position: P258完了
    next_start_page: P259
    completion_status: incomplete
  L2:
    subject: 国民年金法
    current_position: P157完了
    next_start_page: P158
    completion_status: incomplete
  L3:
    subject: 国民年金法
    selected_completion_status: completed_Q15-1_to_Q15-14
    multiple_choice_status: in_progress
    current_question: Q3-3
    next_resume_question_id: Q3-4
    weak_points: [Q1-1, Q2-2, Q3-2]
    review_targets: [Q2-1, Q2-3, Q2-4, Q2-5]
  gap_status: delayed_but_managed
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-06
  plan_anchor: 2026-05-07〜2026-05-17 国民年金法L1/L2完了方向・L3継続
  current_position: L1国民年金法P258完了、L2国民年金法P157完了、L3国民年金法択一Q3-3完了
  expected_position: 5/7〜5/8に国民年金法L2 P158〜P219を回収し、5/9に国民年金法L3択一Q3-4を起点に再開する
  gap_status: delayed_but_managed
  operation_mode: recovery_forward
  must_line:
    - 2026-05-07 国民年金法 L2 P158〜P175（18ページ）
  standard_line:
    - 2026-05-07 国民年金法 L2 P158〜P190（33ページ）
  stretch_line:
    - 2026-05-07 国民年金法 L2 P158〜P200（43ページ）
  recovery_targets:
    - 国民年金法L2をP157からP245まで優先回収する
    - 国民年金法L3択一はQ3-4から再開する
    - Q1-1、Q2-2、Q3-2を回収対象として保持する
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - P175未達
    - P190未達
    - P219未達
    - Q3-4が教材上存在しない
    - 国民年金法L3択一の問題番号インデックスが確定した
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day0
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 110
  operation_mode: recovery_forward
  plan_anchor: 2026-05-07 平日仕事日・L2回収優先
  expected_position: 国民年金法 L2 P190完了
  current_position: 国民年金法 L2 P157完了、次回P158。L1はP258完了
  gap_status: delayed_but_managed
  start_page: P158
  must_end_page: P175
  standard_end_page: P190
  stretch_end_page: P200
  page_range: P158〜P190
  pages: 33
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
    - 平日仕事日のL3
    - 国民年金法 L1 P259以降
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P175未達
    - P190未達

## Day1（2026-05-08）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day1
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 100
  operation_mode: recovery_forward
  plan_anchor: 2026-05-08 平日仕事日・L2 P219まで回収
  expected_position: 国民年金法 L2 P219完了
  current_position: Day0標準達成後はP191開始。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P191
  must_end_page: P205
  standard_end_page: P219
  stretch_end_page: P219
  page_range: P191〜P219
  pages: 29
  next_start_page: P191
  must_line:
    - 国民年金法 L2 P191〜P205（15ページ）
  standard_line:
    - 国民年金法 L2 P191〜P219（29ページ）
  stretch_line:
    - 国民年金法 L2 P191〜P219（29ページ）＋P158〜P190のチェック不足箇所確認
  recovery_targets:
    - 国民年金法 L2 P158〜P219回収完了
  defer_targets:
    - 平日仕事日のL3
    - 国民年金法 L1 P259以降
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - Day0がP190未達
    - P205未達
    - P219未達

## Day2（2026-05-09）

- task: 国民年金法 L3 択一 Q3-4〜Q3-4（1問）
  rolling_day: Day2
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 15
  operation_mode: material_sequence_repair
  plan_anchor: 2026-05-09 土曜L3可。問題番号の機械推定禁止を優先
  expected_position: 国民年金法 L3 択一 Q3-4完了
  current_position: 国民年金法 L3 択一 Q3-3完了、次回Q3-4
  gap_status: delayed_but_managed
  start_question_id: Q3-4
  must_end_question_id: Q3-4
  standard_end_question_id: Q3-4
  stretch_end_question_id: Q3-4
  next_resume_question_id: Q3-4
  questions: 1
  question_range: Q3-4〜Q3-4
  must_line:
    - 国民年金法 L3 択一 Q3-4〜Q3-4（1問）
  standard_line:
    - 国民年金法 L3 択一 Q3-4〜Q3-4（1問）
  stretch_line:
    - 国民年金法 L3 択一 Q3-4〜Q3-4（1問）＋Q1-1・Q2-2・Q3-2回収（3問）
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
    - 国民年金法 L2 P158〜P219のチェック不足箇所確認30分
  recovery_targets:
    - L3不可日を休養に充て、翌日以降のL1/L2を崩さない
  defer_targets:
    - 国民年金法 L3 択一の追加演習
    - 健康保険法×・△回収
  recompute_triggers:
    - 5/9の国民年金法L3回収で×継続
    - 秒トレ未実施

## Day4（2026-05-11）

- task: 国民年金法 L2 P220〜P235（16ページ）
  rolling_day: Day4
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 55
  operation_mode: recovery_forward
  plan_anchor: L1 P258前倒し完了にL2を追いつかせる前半
  expected_position: 国民年金法 L2 P235完了
  current_position: 国民年金法 L2 P219完了想定。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P220
  must_end_page: P228
  standard_end_page: P235
  stretch_end_page: P245
  page_range: P220〜P235
  pages: 16
  next_start_page: P220
  must_line:
    - 国民年金法 L2 P220〜P228（9ページ）
  standard_line:
    - 国民年金法 L2 P220〜P235（16ページ）
  stretch_line:
    - 国民年金法 L2 P220〜P245（26ページ）
  recovery_targets:
    - 国民年金法 L2 P220〜P235（16ページ）
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - Day1でP219未達
    - P228未達
    - P235未達

## Day5（2026-05-12）

- task: 国民年金法 L1 P259〜P280（22ページ）
  rolling_day: Day5
  due_date: 2026-05-12
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  estimated_minutes: 75
  operation_mode: recovery_forward
  plan_anchor: L1前倒しの継続。ただしL2未達時はL2優先へ再計算
  expected_position: 国民年金法 L1 P280完了
  current_position: 国民年金法 L1 P258完了
  gap_status: delayed_but_managed
  start_page: P259
  must_end_page: P270
  standard_end_page: P280
  stretch_end_page: P280
  page_range: P259〜P280
  pages: 22
  next_start_page: P259
  must_line:
    - 国民年金法 L1 P259〜P270（12ページ）
  standard_line:
    - 国民年金法 L1 P259〜P280（22ページ）
  stretch_line:
    - 国民年金法 L1 P259〜P280（22ページ）＋L2 P220〜P235のチェック不足箇所確認
  recovery_targets:
    - 国民年金法 L1 P280到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - 5/11 L2 P235未達
    - P270未達
    - P280未達

## Day6（2026-05-13）

- task: 国民年金法 L2 P236〜P245（10ページ）
  rolling_day: Day6
  due_date: 2026-05-13
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 35
  operation_mode: recovery_forward
  plan_anchor: 既存Next operations 2026-05-13 P246〜P280への接続維持
  expected_position: 国民年金法 L2 P245完了
  current_position: 国民年金法 L2 P235完了想定。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P236
  must_end_page: P240
  standard_end_page: P245
  stretch_end_page: P245
  page_range: P236〜P245
  pages: 10
  next_start_page: P236
  must_line:
    - 国民年金法 L2 P236〜P240（5ページ）
  standard_line:
    - 国民年金法 L2 P236〜P245（10ページ）
  stretch_line:
    - 国民年金法 L2 P236〜P245（10ページ）＋国民年金法L1/L2未消化ページ確認
  recovery_targets:
    - 国民年金法 L2 P236〜P245（10ページ）
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - 5/12 L1 P280未達
    - P240未達
    - P245未達

---

## Active / Next connection guard

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  first_next_date: 2026-05-13
  expected_first_next_line: 国民年金法 L2 P246〜P280（35ページ）
  active_day6_standard_end: P245
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
  active_operations_was_read: true
  next_operations_was_read: true
  L1_L2_current_position_confirmed: true
  L3_current_position_confirmed: true
  current_subject_not_skipped: true
  completed_subject_not_reintroduced: true
  L3_order_selection_before_takuitsu: true
  D0_D6_all_exist: true
  D7_target_next_operations_read: true
  active_next_connection_valid: true
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  forbidden_vague_terms_absent: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  overload_detected: true
  overload_resolution: 5/7〜5/8と5/11・5/13にL2回収、5/12にL1 P280へ接続
  roadmap_plan_milestone_reachable: conditional_reachable_with_future_next_operations_regeneration
  material_sequence_uncertainty_reflected: true

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

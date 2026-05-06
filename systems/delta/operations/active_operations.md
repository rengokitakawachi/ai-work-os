# delta active_operations

## Metadata

version: delta_v0.6_active_operations_split_from_next
updated_at: 2026-05-05
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_only_next_split
last_daily_review: systems/delta/history/daily/2026-05-05.md
latest_in_day_history: systems/delta/history/daily/2026-05-05.md

validation_markers:
  - Active operations are D0-D6 execution SSOT only.
  - Next operations are stored separately in systems/delta/operations/next_operations.md.
  - Existing Active operations and Next operations are the baseline.
  - Only delayed work is shifted.
  - 2026-05-06 is GW holiday, so L3 is allowed.
  - Weekday workdays do not contain L3.

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-05.md
    - systems/delta/history/daily/2026-05-04.md
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  todoist_role: projection_only

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  role: d7_to_2026_06_30_daily_plan_ssot
  next_start_date: 2026-05-13
  target_date: 2026-06-30
  baseline_commit: 97b2334b38ca160d17358b73d51beae47817233a
  baseline_blob_sha: af62696214acfcf8817728ee9f97ae24e39c0011
  current_split_sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
  connection_rule: active Day6 expected_position must connect to next first row
  active_day6_expected_position: 国民年金法 L2 P245完了
  next_day_first_line: 2026-05-13 国民年金法 L2 P246〜P280（35ページ）

roadmap_anchor:
  roadmap: systems/delta/roadmap/delta_roadmap.md
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過

existing_next_operations_read:
  source: systems/delta/operations/next_operations.md
  sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
existing_next_operations_was_read: true

baseline_preservation:
  adjustment_policy: saved_active_and_next_operations_are_baseline_shift_only_delayed_units
  reason: 2026-05-05 completed 国民年金法 L3 選択 Q15-1〜Q15-14, but 国民年金法 L3 択一 remains behind GW standard line

## Completed scope evidence

completed_scope_evidence:
  source:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  completed_subjects:
    健康保険法:
      L3_new_exercises: completed
      selected_questions: completed
      multiple_choice_questions: completed_through_Q11-21
      allowed_future_use: recovery_or_second_pass_only
    国民年金法:
      L3_selected_questions: completed
      selected_completion_marker: completed_Q15-1_to_Q15-14
      allowed_next_use: multiple_choice_on_2026_05_06_holiday

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
  special_days:
    2026-05-06: GW最終日・祝日扱い。L3可
    2026-05-07: 平日仕事日。L3なし
    2026-05-08: 平日仕事日。L3なし
    2026-05-09: 土曜。L3可
    2026-05-10: L3不可

current_position:
  as_of: 2026-05-05
  L1:
    subject: 国民年金法
    current_position: P219完了
    next_start_page: P220
    completion_status: incomplete
  L2:
    subject: 国民年金法
    current_position: P157完了
    next_start_page: P158
    completion_status: incomplete
  L3:
    subject: 国民年金法
    selected_completion_status: completed
    selected_completion_marker: completed_Q15-1_to_Q15-14
    multiple_choice_status: ready
    next_resume_question_id: Q1-1
  gap_status: delayed_but_managed
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-05
  plan_anchor: 2026-06-30 1巡目完了必達
  current_position: L1国民年金法P219完了、L2国民年金法P157完了、L3国民年金法選択Q15-14完了、択一Q1-1開始前
  expected_position: 5/6に国民年金法L3択一Q1-1〜Q1-16、5/7〜5/8に既存Activeの国民年金法L2 P158〜P219へ戻す
  gap_status: delayed_but_managed
  operation_mode: recovery_forward
  must_line:
    - 国民年金法 L3 択一 Q1-1〜Q1-8（8問）
  standard_line:
    - 国民年金法 L3 択一 Q1-1〜Q1-16（16問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q1-20（20問）
  recovery_targets:
    - 5/6に国民年金法L3択一Q1-1〜Q1-16（16問）を実施する
    - 5/7〜5/8に国民年金法L2 P158〜P219を回収する
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - Q1-8未達
    - Q1-16未達
    - P190未達
    - P219未達
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-06）

- task: 国民年金法 L3 択一 Q1-1〜Q1-16（16問）
  rolling_day: Day0
  due_date: 2026-05-06
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 80
  operation_mode: recovery_forward
  plan_anchor: 2026-05-06 GW最終日・国民年金法択一
  expected_position: 国民年金法 L3 択一 Q1-16完了
  current_position: 国民年金法 L3 選択Q15-14完了、択一Q1-1開始前
  gap_status: delayed_but_managed
  start_question_id: Q1-1
  must_end_question_id: Q1-8
  standard_end_question_id: Q1-16
  stretch_end_question_id: Q1-20
  next_resume_question_id: Q1-1
  questions: 16
  question_range: Q1-1〜Q1-16
  must_line:
    - 国民年金法 L3 択一 Q1-1〜Q1-8（8問）
  standard_line:
    - 国民年金法 L3 択一 Q1-1〜Q1-16（16問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q1-20（20問）
  recovery_targets:
    - GW標準ライン未達の国民年金法択一Q1-1〜Q1-16（16問）
  defer_targets:
    - 国民年金法 L2 P158以降は5/7から回収
    - 国民年金法 選択Q15-1〜Q15-14の△回収
    - 健康保険法×・△回収
  recompute_triggers:
    - Q1-8未達
    - Q1-16未達

## Day1（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day1
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 110
  operation_mode: recovery_forward
  plan_anchor: 既存Day2を1日後ろ倒し。平日仕事日L2回収
  expected_position: 国民年金法 L2 P190完了
  current_position: 国民年金法 L2 P157完了、次回P158
  gap_status: delayed_but_managed
  start_page: P158
  must_end_page: P175
  standard_end_page: P190
  stretch_end_page: P200
  page_range: P158〜P190
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
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - P175未達
    - P190未達
    - 5/6 L3択一Q1-8未達

## Day2（2026-05-08）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day2
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 100
  operation_mode: recovery_forward
  plan_anchor: 既存Day3を維持。平日仕事日L2回収
  expected_position: 国民年金法 L2 P219完了
  current_position: Day1標準達成後はP191開始。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P191
  must_end_page: P205
  standard_end_page: P219
  stretch_end_page: P219
  page_range: P191〜P219
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
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - Day1がP190未達
    - P205未達
    - P219未達

## Day3（2026-05-09）

- task: 国民年金法 L3 択一 Q1-17〜Q1-32（16問）
  rolling_day: Day3
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 80
  operation_mode: recovery_forward
  plan_anchor: 既存Day4のL3枠を国民年金法択一継続へ差分調整
  expected_position: 国民年金法 L3 択一 Q1-32完了
  current_position: 5/6標準達成後はQ1-17開始。未達時は到達問題の次から再計算
  gap_status: delayed_but_managed
  start_question_id: Q1-17
  must_end_question_id: Q1-24
  standard_end_question_id: Q1-32
  stretch_end_question_id: Q1-36
  next_resume_question_id: Q1-17
  questions: 16
  question_range: Q1-17〜Q1-32
  must_line:
    - 国民年金法 L3 択一 Q1-17〜Q1-24（8問）
  standard_line:
    - 国民年金法 L3 択一 Q1-17〜Q1-32（16問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-17〜Q1-36（20問）
  recovery_targets:
    - 国民年金法 L3 択一 Q1-17〜Q1-32（16問）
  defer_targets:
    - 国民年金法 選択Q15-1〜Q15-14の△回収
    - 健康保険法×・△回収
  recompute_triggers:
    - 5/6 Q1-16未達
    - Q1-24未達
    - Q1-32未達
    - 2026-05-10はL3不可のため翌日へ押し出し不可

## Day4（2026-05-10）

- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day4
  due_date: 2026-05-10
  subject: 共通
  study_type: rest_or_light_review
  material: none
  estimated_minutes: 0
  operation_mode: normal
  plan_anchor: 2026-05-10 L3不可日
  expected_position: 新規L1/L2/L3なし
  current_position: Day3後に更新
  gap_status: delayed_but_managed
  must_line:
    - 新規L1/L2/L3なし。秒トレ40問
  standard_line:
    - 新規L1/L2/L3なし。秒トレ40問
  stretch_line:
    - 国民年金法 L1/L2未消化ページ確認30分
  recovery_targets:
    - L3不可日を休養に充て、翌日以降のL1/L2を崩さない
  defer_targets:
    - 国民年金法 L3 択一の追加演習
    - 健康保険法×・△回収
  recompute_triggers:
    - 5/9の国民年金法L3択一Q1-24未達
    - 秒トレ未実施

## Day5（2026-05-11）

- task: 国民年金法 L1 P220〜P255（36ページ）
  rolling_day: Day5
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: recovery_forward
  plan_anchor: 既存Day6を維持。平日仕事日L1前進
  expected_position: 国民年金法 L1 P255完了
  current_position: 国民年金法 L1 P219完了
  gap_status: delayed_but_managed
  start_page: P220
  must_end_page: P235
  standard_end_page: P255
  stretch_end_page: P260
  page_range: P220〜P255
  next_start_page: P220
  must_line:
    - 国民年金法 L1 P220〜P235（16ページ）
  standard_line:
    - 国民年金法 L1 P220〜P255（36ページ）
  stretch_line:
    - 国民年金法 L1 P220〜P260（41ページ）
  recovery_targets:
    - 国民年金法 L1 P220〜P255（36ページ）
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 国民年金法L3△回収
  recompute_triggers:
    - P235未達
    - P255未達
    - Day2でL2 P219未達

## Day6（2026-05-12）

- task: 国民年金法 L2 P220〜P245（26ページ）
  rolling_day: Day6
  due_date: 2026-05-12
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 90
  operation_mode: recovery_forward
  plan_anchor: 既存Next operations 2026-05-12をActiveへ接続
  expected_position: 国民年金法 L2 P245完了
  current_position: 国民年金法 L2 P219完了想定。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P220
  must_end_page: P235
  standard_end_page: P245
  stretch_end_page: P255
  page_range: P220〜P245
  next_start_page: P220
  must_line:
    - 国民年金法 L2 P220〜P235（16ページ）
  standard_line:
    - 国民年金法 L2 P220〜P245（26ページ）
  stretch_line:
    - 国民年金法 L2 P220〜P255（36ページ）
  recovery_targets:
    - 国民年金法 L2 P220〜P245（26ページ）
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - P235未達
    - P245未達
    - 5/11 L1 P255未達

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
  active_next_connection_valid: true
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  forbidden_vague_terms_absent: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  overload_detected: true
  overload_resolution: existing_plan_preserved_5_6_L3_5_7_5_8_L2_5_9_L3
  roadmap_plan_milestone_reachable: conditional_reachable_with_compression

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
- L3 は科目ごとに 選択 → 択一 の順序で進める。
- 平日仕事日はL3を行わず、L1/L2と秒トレを行う。
- 土日祝とGW祝日はL3を行える。
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates active_operations and next_operations together after reading both.

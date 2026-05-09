# delta active_operations

## Metadata

version: delta_v0.6_active_operations_after_2026_05_09_sequence_correction
updated_at: 2026-05-09
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_sequence_corrected
last_daily_review: systems/delta/history/daily/2026-05-08.md
latest_in_day_history: systems/delta/history/daily/2026-05-09.md

validation_markers:
  - Active operations are D0-D6 execution SSOT only.
  - Next operations are stored separately in systems/delta/operations/next_operations.md.
  - Actual performance records are stored in daily history, not operations.
  - 2026-05-09 is Saturday, so L3 is allowed.
  - 2026-05-10 is L3 unavailable day.
  - 2026-05-11〜2026-05-15 are weekday workdays, so L3 is not assigned.
  - 国民年金法L3択一の機械的連番推定は禁止。
  - 国民年金法L3択一3章「給付の通則」はQ3-3で終了。Q3-4は存在しない。次は4章「老齢基礎年金」Q4-1。

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-09.md
    - systems/delta/history/daily/2026-05-08.md
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
    sha: 1b9748916eb11967e51b0e271e866bc99ad14483
  next_operations:
    path: systems/delta/operations/next_operations.md
    sha: 87aa9e9096cdf23af9a863061bf5c91b428e19f7
  latest_daily_history:
    path: systems/delta/history/daily/2026-05-09.md
    sha: 15febd09e3f13b3c68a03bb91fc06cd2a382c1ae
  recent_daily_history:
    path: systems/delta/history/daily/2026-05-08.md
    sha: edfce789725fef3fda5d4a0f45d08cedc66ec064

roadmap_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過

plan_anchor:
  medium_plan: 2026-05-07〜2026-05-17 国民年金法L1/L2を完了方向へ進め、国民年金法L3を継続
  immediate_target: 2026-05-09〜2026-05-15で国民年金法L1/L2をP280へ接続し、厚生年金保険法L1へ入る

completed_scope_evidence:
  健康保険法:
    L3_new_exercises: completed
    allowed_future_use: recovery_or_second_pass_only
  国民年金法:
    L1_current_position: P261完了
    L2_current_position: P261完了
    L1_L2_next_start: P262
    blank_pages: [P259, P260, P261]
    L3_selected_questions: completed_Q15-1_to_Q15-14
    L3_multiple_choice_current_position: Q3-3完了
    L3_multiple_choice_next_question: Q4-1
    L3_sequence_correction: Q3-4は存在しない。3章はQ3-3まで。次は4章Q4-1
    L3_weak_points: [Q1-1, Q2-2, Q3-2]
    L3_review_targets: [Q2-1, Q2-3, Q2-4, Q2-5]
    sekotore_2026_05_08: 19問

user_capacity_evidence:
  L1_L2_pages:
    recent_actuals:
      - 2026-05-07 国民年金法L2 P158〜P209 52ページ 63分
      - 2026-05-08 国民年金法L2 P210〜P233 24ページ 68分
      - 2026-05-09 国民年金法L2 P234〜P261 28ページ、うちP259〜P261空白
    standard_capacity: 35〜40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
    material_sequence_uncertainty: 国民年金法L3択一は教材確認済み番号のみ採用
  sekotore:
    daily_target_questions: 40
    latest_actual: 2026-05-08 19問

special_days:
  - 2026-05-09: 土曜。L3可
  - 2026-05-10: L3不可
  - 2026-05-11: 平日仕事日。L3なし
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
    weak_points: [Q1-1, Q2-2, Q3-2]
    review_targets: [Q2-1, Q2-3, Q2-4, Q2-5]
  sekotore:
    latest_status: 2026-05-08 19問。2026-05-09は未報告
  gap_status: delayed_but_managed
  operation_mode: recovery_forward

active_day6_next_connection:
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L1 P35完了
  expected_next_start_date: 2026-05-16
  next_first_expected_line: 2026-05-16 国民年金法 L3 択一 Q4-1〜Q4-1（1問）＋回収Q1-1・Q2-2・Q3-2（3問）
  connection_status: ready_for_next_start_2026_05_16

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-09
  plan_anchor: Active Day0-D6 2026-05-09〜2026-05-15、Next starts 2026-05-16
  current_position: L1国民年金法P261完了、L2国民年金法P261完了、L3国民年金法択一Q3-3完了、次はQ4-1
  expected_position: 2026-05-15 厚生年金保険法 L1 P35完了、2026-05-16に国民年金法L3へ接続
  gap_status: delayed_but_managed
  operation_mode: recovery_forward
  must_line:
    - 2026-05-09 国民年金法 L3 択一 Q4-1〜Q4-1（1問）
  standard_line:
    - 2026-05-09 国民年金法 L3 択一 Q4-1〜Q4-1（1問）＋Q1-1・Q2-2・Q3-2回収（3問）
  stretch_line:
    - 2026-05-09 標準ライン＋Q2-1・Q2-3・Q2-4・Q2-5確認（4問）
  recovery_targets:
    - 国民年金法L1/L2 P262以降
    - 国民年金法L3 Q1-1・Q2-2・Q3-2
    - 秒トレ40問復帰
  defer_targets:
    - 存在しないQ3-4
    - 厚生年金保険法L3開始
  recompute_triggers:
    - Q4-1が教材上存在しない
    - 5/11 L1/L2 P262以降の進捗未達
    - 5/15 厚生年金保険法 L1 P35未達
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-09）

- task: 国民年金法 L3 択一 Q4-1〜Q4-1（1問）＋回収 Q1-1、Q2-2、Q3-2（3問）
  rolling_day: Day0
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 45
  operation_mode: material_sequence_repair
  plan_anchor: 2026-05-09 土曜L3可。Q3-4は存在しないためQ4-1へ修正
  expected_position: 国民年金法 L3 択一 Q4-1完了、Q1-1・Q2-2・Q3-2回収実施
  current_position: 国民年金法 L3 択一 Q3-3完了、次回Q4-1
  gap_status: material_sequence_corrected
  start_question_id: Q4-1
  must_end_question_id: Q4-1
  standard_end_question_id: Q4-1
  stretch_end_question_id: Q4-1
  next_resume_question_id: Q4-1
  questions: 4
  question_range: Q4-1〜Q4-1、回収Q1-1・Q2-2・Q3-2
  must_line:
    - 国民年金法 L3 択一 Q4-1〜Q4-1（1問）
  standard_line:
    - 国民年金法 L3 択一 Q4-1〜Q4-1（1問）＋Q1-1・Q2-2・Q3-2回収（3問）
  stretch_line:
    - 標準ライン＋Q2-1・Q2-3・Q2-4・Q2-5確認（4問）
  recovery_targets:
    - Q1-1
    - Q2-2
    - Q3-2
  defer_targets:
    - Q3-4
    - 厚生年金保険法 L3開始
  recompute_triggers:
    - Q4-1が教材上存在しない
    - Q4章の問題番号一覧が確定した
    - Q1-1・Q2-2・Q3-2の回収で×継続

## Day1（2026-05-10）

- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day1
  due_date: 2026-05-10
  subject: 共通
  study_type: rest_or_light_review
  material: none
  estimated_minutes: 0
  operation_mode: normal
  plan_anchor: 2026-05-10 L3不可日
  expected_position: 新規L1/L2/L3なし。秒トレ40問
  current_position: Day0後に更新
  gap_status: delayed_but_managed
  must_line:
    - 新規L1/L2/L3なし。秒トレ40問
  standard_line:
    - 新規L1/L2/L3なし。秒トレ40問
  stretch_line:
    - 国民年金法 L1/L2 P262以降のチェック不足箇所確認30分
  recovery_targets:
    - 秒トレ40問へ復帰
  defer_targets:
    - 国民年金法 L3 択一の追加演習
    - 健康保険法×・△回収
  recompute_triggers:
    - 秒トレ未実施

## Day2（2026-05-11）

- task: 国民年金法 L1/L2 P262〜P280 接続回収（19ページ）
  rolling_day: Day2
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L1_L2
  material: 基礎講座テキスト＋動画講義
  estimated_minutes: 75
  operation_mode: recovery_forward
  plan_anchor: L1/L2ともにP261完了。P262以降を接続する
  expected_position: 国民年金法 L1/L2 P280完了
  current_position: 国民年金法 L1/L2 P261完了
  gap_status: delayed_but_managed
  start_page: P262
  must_end_page: P270
  standard_end_page: P280
  stretch_end_page: P280
  page_range: P262〜P280
  pages: 19
  next_start_page: P262
  must_line:
    - 国民年金法 L1/L2 P262〜P270（9ページ）
  standard_line:
    - 国民年金法 L1/L2 P262〜P280（19ページ）
  stretch_line:
    - 国民年金法 L1/L2 P262〜P280（19ページ）＋チェック不足箇所確認
  recovery_targets:
    - 国民年金法 L1/L2 P280到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P270未達
    - P280未達

## Day3（2026-05-12）

- task: 厚生年金保険法 L1 P1〜P20（20ページ）
  rolling_day: Day3
  due_date: 2026-05-12
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 70
  operation_mode: recovery_forward
  plan_anchor: 国民年金法L1/L2 P280完了後、厚生年金保険法へ接続
  expected_position: 厚生年金保険法 L1 P20完了
  current_position: 厚生年金保険法 L1未着手
  gap_status: delayed_but_managed
  start_page: P1
  must_end_page: P10
  standard_end_page: P20
  stretch_end_page: P35
  page_range: P1〜P20
  pages: 20
  next_start_page: P1
  must_line:
    - 厚生年金保険法 L1 P1〜P10（10ページ）
  standard_line:
    - 厚生年金保険法 L1 P1〜P20（20ページ）
  stretch_line:
    - 厚生年金保険法 L1 P1〜P35（35ページ）
  recovery_targets:
    - 厚生年金保険法 L1 P20到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L2開始
  recompute_triggers:
    - 5/11 国民年金法P280未達
    - P10未達
    - P20未達

## Day4（2026-05-13）

- task: 厚生年金保険法 L2 P1〜P20（20ページ）
  rolling_day: Day4
  due_date: 2026-05-13
  subject: 厚生年金保険法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 70
  operation_mode: recovery_forward
  plan_anchor: 厚生年金保険法L1 P20にL2を接続
  expected_position: 厚生年金保険法 L2 P20完了
  current_position: 厚生年金保険法 L2未着手
  gap_status: delayed_but_managed
  start_page: P1
  must_end_page: P10
  standard_end_page: P20
  stretch_end_page: P35
  page_range: P1〜P20
  pages: 20
  next_start_page: P1
  must_line:
    - 厚生年金保険法 L2 P1〜P10（10ページ）
  standard_line:
    - 厚生年金保険法 L2 P1〜P20（20ページ）
  stretch_line:
    - 厚生年金保険法 L2 P1〜P35（35ページ）
  recovery_targets:
    - 厚生年金保険法 L2 P20到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L3開始
  recompute_triggers:
    - 5/12 厚生年金保険法 L1 P20未達
    - P10未達
    - P20未達

## Day5（2026-05-14）

- task: 厚生年金保険法 L1 P21〜P35（15ページ）
  rolling_day: Day5
  due_date: 2026-05-14
  subject: 厚生年金保険法
  study_type: L1
  material: 動画講義
  estimated_minutes: 55
  operation_mode: recovery_forward
  plan_anchor: 厚生年金保険法L1をP35へ接続
  expected_position: 厚生年金保険法 L1 P35完了
  current_position: Day3標準達成後はP21開始
  gap_status: delayed_but_managed
  start_page: P21
  must_end_page: P30
  standard_end_page: P35
  stretch_end_page: P40
  page_range: P21〜P35
  pages: 15
  next_start_page: P21
  must_line:
    - 厚生年金保険法 L1 P21〜P30（10ページ）
  standard_line:
    - 厚生年金保険法 L1 P21〜P35（15ページ）
  stretch_line:
    - 厚生年金保険法 L1 P21〜P40（20ページ）
  recovery_targets:
    - 厚生年金保険法 L1 P35到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L2 P21以降
  recompute_triggers:
    - P30未達
    - P35未達

## Day6（2026-05-15）

- task: 厚生年金保険法 L2 P21〜P35（15ページ）
  rolling_day: Day6
  due_date: 2026-05-15
  subject: 厚生年金保険法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 55
  operation_mode: recovery_forward
  plan_anchor: Active Day6。翌日2026-05-16をnext_operations開始日にする
  expected_position: 厚生年金保険法 L2 P35完了
  current_position: Day4標準達成後は厚生年金保険法 L2 P21開始
  gap_status: delayed_but_managed
  start_page: P21
  must_end_page: P30
  standard_end_page: P35
  stretch_end_page: P40
  page_range: P21〜P35
  pages: 15
  next_start_page: P21
  must_line:
    - 厚生年金保険法 L2 P21〜P30（10ページ）
  standard_line:
    - 厚生年金保険法 L2 P21〜P35（15ページ）
  stretch_line:
    - 厚生年金保険法 L2 P21〜P40（20ページ）
  recovery_targets:
    - 厚生年金保険法 L2 P35到達
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L3開始
  recompute_triggers:
    - 厚生年金保険法 L2 P30未達
    - 厚生年金保険法 L2 P35未達

---

## Active / Next connection guard

active_day6_next_connection:
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L2 P35完了
  expected_next_start_date: 2026-05-16
  next_day_first_line: 2026-05-16 国民年金法 L3 択一 Q4-1〜Q4-1（1問）＋回収Q1-1・Q2-2・Q3-2（3問）
  connection_status: ready_for_next_start_2026_05_16

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  expected_next_start_date: 2026-05-16
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L2 P35完了
  next_day_first_line: 2026-05-16 国民年金法 L3 択一 Q4-1〜Q4-1（1問）＋回収Q1-1・Q2-2・Q3-2（3問）
  connection_status: ready_for_next_start_2026_05_16

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
  recent_daily_history_was_read: true
  active_operations_was_read: true
  next_operations_was_read: true
  completed_scope_evidence_present: true
  user_capacity_evidence_present: true
  active_day6_next_connection_present: true
  D0_D6_all_exist: true
  active_day6_next_start_connection_target: 2026-05-16
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid_with_material_uncertainty_guard: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  material_sequence_uncertainty_reflected: true
  overload_detected: true
  overload_resolution: 5/11に国民年金法L1/L2をP280へ、5/12〜5/15で厚生年金保険法L1/L2 P35へ接続

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
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- 国民年金法L3択一Q3-4は存在しない。3章はQ3-3まで、次は4章Q4-1。
- 平日仕事日はL3を行わず、L1/L2と秒トレを行う。
- 2026-05-10はL3不可日。
- Todoist is projection only.

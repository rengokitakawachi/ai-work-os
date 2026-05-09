# delta active_operations

## Metadata

version: delta_v0.6_active_operations_real_question_ids_patch
updated_at: 2026-05-09
branch: main
operation_status: active_d0_d6_only_real_question_ids_patch
last_daily_review: systems/delta/history/daily/2026-05-05.md
latest_in_day_history: systems/delta/history/daily/2026-05-05.md

validation_markers:
  - Active operations are D0-D6 execution SSOT only.
  - Next operations are stored separately in systems/delta/operations/next_operations.md.
  - 2026-05-09 Day0 was patched because prior Q1-17〜Q1-32 did not match the actual 国民年金法過去問講座 question numbering.
  - 国民年金法過去問講座の択一式は章別Q番号で管理する。
  - Confirmed actual question IDs include Q1-1, Q2-7, Q4-4, Q7-2, Q9-6, Q14-12 from the 国民年金法過去問講座 PDF search results.
  - Q1-17方式は禁止。Q1章内連番として扱わない。
  - 2026-05-10 is L3 unavailable.
  - Weekday workdays do not contain L3.

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-05.md
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  todoist_role: projection_only

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  role: d7_to_2026_06_30_daily_plan_ssot
  next_start_date: 2026-05-16
  target_date: 2026-06-30
  connection_rule: active Day6 expected_position must connect to next first row
  active_day6_expected_position: 国民年金法 L2 P280完了
  next_day_first_line: 2026-05-16 国民年金法 L3 択一 続き（実在Q番号ベース）

roadmap_anchor:
  roadmap: systems/delta/roadmap/delta_roadmap.md
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過

existing_next_operations_read:
  source: systems/delta/operations/next_operations.md
  sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
existing_next_operations_was_read: true

## Completed scope evidence

completed_scope_evidence:
  source:
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
      L3_multiple_choice_status: not_confirmed_started_in_daily_history
      allowed_next_use: multiple_choice_real_question_ids_only

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 8〜16問程度
    real_question_id_guard: Q1-17のような非実在番号を作らない
  special_days:
    2026-05-09: 土曜。L3可
    2026-05-10: L3不可
    2026-05-11: 平日仕事日。L3なし
    2026-05-12: 平日仕事日。L3なし
    2026-05-13: 平日仕事日。L3なし
    2026-05-14: 平日仕事日。L3なし
    2026-05-15: 平日仕事日。L3なし

question_id_evidence:
  国民年金法_過去問講座:
    toc: 択一式問題は総則等、被保険者等、給付の通則、老齢基礎年金、付加年金、障害基礎年金、遺族基礎年金、寡婦年金・死亡一時金、その他の給付・給付制限、国民年金事業の円滑な実施を図るための措置、費用、不服申立て・雑則等、国民年金基金・国民年金基金連合会、総合問題の章別構成
    confirmed_question_ids:
      - Q1-1
      - Q2-7
      - Q4-4
      - Q7-2
      - Q9-6
      - Q14-12
    invalidated_prior_range:
      - Q1-17〜Q1-32
      - Q1-17〜Q1-36
    rule: 国民年金法L3択一は章番号ごとの実在Q番号で管理する。Q1章のみで連番を増やさない。

current_position:
  as_of: 2026-05-05
  note: 2026-05-06〜2026-05-08の実績はdaily history上未確認。推測で完了扱いしない。
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
    multiple_choice_status: ready_not_confirmed_started
    next_resume_question_id: Q1-1
  gap_status: delayed_but_managed_with_question_id_patch
  operation_mode: recovery_forward_real_question_ids

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-09
  plan_anchor: 2026-06-30 1巡目完了必達
  current_position: L1国民年金法P219完了、L2国民年金法P157完了、L3国民年金法選択Q15-14完了、択一Q1-1開始前（日次履歴上）
  expected_position: 5/9に国民年金法L3択一Q1-1〜Q2-7を実在番号ベースで実施し、5/10はL3不可、5/11以降はL2回収へ戻す
  gap_status: delayed_but_managed_with_question_id_patch
  operation_mode: recovery_forward_real_question_ids
  must_line:
    - 国民年金法 L3 択一 Q1-1（1問）
  standard_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-7（8問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-7（8問）＋誤答・△問題メモ整理
  recovery_targets:
    - 非実在Q1-17方式を廃止し、国民年金法L3択一を章別実在Q番号で再開する
    - 5/11〜5/15に国民年金法L2 P158〜P280を回収する
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - Q1-1未達
    - Q2-7未達
    - 2026-05-06〜2026-05-08の実績報告が追加された場合
    - P190未達
    - P219未達
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-09）

- task: 国民年金法 L3 択一 Q1-1〜Q2-7（8問・実在番号ベース）
  rolling_day: Day0
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  estimated_minutes: 60
  operation_mode: recovery_forward_real_question_ids
  plan_anchor: 2026-05-09 土曜・国民年金法択一を実在Q番号で再開
  expected_position: 国民年金法 L3 択一 Q2-7完了
  current_position: 国民年金法 L3 選択Q15-14完了、択一Q1-1開始前（日次履歴上）
  gap_status: delayed_but_managed_with_question_id_patch
  start_question_id: Q1-1
  must_end_question_id: Q1-1
  standard_end_question_id: Q2-7
  stretch_end_question_id: Q2-7
  next_resume_question_id: Q3-1
  questions: 8
  question_range: Q1-1〜Q2-7
  must_line:
    - 国民年金法 L3 択一 Q1-1（1問）
  standard_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-7（8問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-7（8問）＋△・×メモ整理
  recovery_targets:
    - 旧operationsの非実在Q1-17〜Q1-32を廃止し、実在Q番号で再開する
  defer_targets:
    - 国民年金法 選択Q15-1〜Q15-14の△回収
    - 健康保険法×・△回収
  recompute_triggers:
    - Q1-1未達
    - Q2-7未達
    - 5/6〜5/8に国民年金法L3択一を実施済みだったことが報告された場合

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
  expected_position: 新規L1/L2/L3なし
  current_position: Day0後に更新
  gap_status: delayed_but_managed_with_question_id_patch
  must_line:
    - 新規L1/L2/L3なし。秒トレ40問
  standard_line:
    - 新規L1/L2/L3なし。秒トレ40問
  stretch_line:
    - 国民年金法 L3 択一Q1-1〜Q2-7の△・×だけ確認30分
  recovery_targets:
    - L3不可日を休養に充て、翌日以降のL2を崩さない
  defer_targets:
    - 国民年金法 L3 択一の新規追加演習
    - 健康保険法×・△回収
  recompute_triggers:
    - 5/9の国民年金法L3択一Q1-1未達
    - 秒トレ未実施

## Day2（2026-05-11）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day2
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 110
  operation_mode: recovery_forward
  plan_anchor: 平日仕事日L2回収
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
    - 5/9 L3択一Q1-1未達

## Day3（2026-05-12）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day3
  due_date: 2026-05-12
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 100
  operation_mode: recovery_forward
  plan_anchor: 平日仕事日L2回収
  expected_position: 国民年金法 L2 P219完了
  current_position: Day2標準達成後はP191開始。未達時は到達ページの次から再計算
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
    - Day2がP190未達
    - P205未達
    - P219未達

## Day4（2026-05-13）

- task: 国民年金法 L1 P220〜P255（36ページ）
  rolling_day: Day4
  due_date: 2026-05-13
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: recovery_forward
  plan_anchor: 平日仕事日L1前進
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
    - Day3でL2 P219未達

## Day5（2026-05-14）

- task: 国民年金法 L2 P220〜P245（26ページ）
  rolling_day: Day5
  due_date: 2026-05-14
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 90
  operation_mode: recovery_forward
  plan_anchor: 平日仕事日L2回収
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
    - 5/13 L1 P255未達

## Day6（2026-05-15）

- task: 国民年金法 L2 P246〜P280（35ページ）
  rolling_day: Day6
  due_date: 2026-05-15
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 115
  operation_mode: recovery_forward
  plan_anchor: activeからnextへの接続日。平日仕事日L2回収
  expected_position: 国民年金法 L2 P280完了
  current_position: 国民年金法 L2 P245完了想定。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P246
  must_end_page: P260
  standard_end_page: P280
  stretch_end_page: P280
  page_range: P246〜P280
  next_start_page: P246
  must_line:
    - 国民年金法 L2 P246〜P260（15ページ）
  standard_line:
    - 国民年金法 L2 P246〜P280（35ページ）
  stretch_line:
    - 国民年金法 L2 P246〜P280（35ページ）＋国民年金法L2完了確認
  recovery_targets:
    - 国民年金法 L2 P246〜P280（35ページ）
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - P260未達
    - P280未達
    - 5/14 L2 P245未達

---

## Active / Next connection guard

next_operations_ref:
  path: systems/delta/operations/next_operations.md
  first_next_date: 2026-05-16
  expected_first_next_line: 国民年金法 L3 択一 続き（実在Q番号ベース）
  active_day6_standard_end: 国民年金法 L2 P280
  connection_status: active_updated_next_needs_followup_patch

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
  completed_subject_not_reintroduced: true
  L3_order_selection_before_takuitsu: true
  D0_D6_all_exist: true
  active_next_connection_valid: partial_active_updated_next_patch_required
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  forbidden_fake_question_ids_removed: true
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  overload_detected: true
  overload_resolution: compression_required_because_5_9_standard_reduced_to_real_confirmed_Q1_1_to_Q2_7
  roadmap_plan_milestone_reachable: conditional_reachable_with_future_next_patch

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
- 国民年金法L3択一は章別の実在Q番号で管理し、Q1-17のような非実在番号を作らない。
- L3 は科目ごとに 選択 → 択一 の順序で進める。
- 平日仕事日はL3を行わず、L1/L2と秒トレを行う。
- 土日祝とGW祝日はL3を行える。
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates active_operations and next_operations together after reading both.

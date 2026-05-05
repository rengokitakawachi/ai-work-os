# delta active_operations

## Metadata

version: weekday_L3_constraint_corrected_after_2026_05_05
updated_at: 2026-05-05
branch: feature/atlas-pre-delta-foundation
operation_status: corrected_no_L3_on_weekday_workdays
last_daily_review: systems/delta/history/daily/2026-05-05.md
latest_in_day_history: systems/delta/history/daily/2026-05-05.md

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.
  - User recognized operations were more advanced than actual current position; plan was compressed and redistributed.
  - L3 is not scheduled on weekday workdays. L3 is scheduled on weekends/holidays only.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-05.md
    - systems/delta/history/daily/2026-05-04.md
  todoist_role: projection_only

roadmap_anchor:
  roadmap: systems/delta/roadmap/delta_roadmap.md
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過

existing_next_operations_read:
  source: systems/delta/operations/active_operations.md
  sha: eb1ba4fa1dfc4778ea373713c817c19982c828cb
existing_next_operations_was_read: true

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
      allowed_next_use: multiple_choice_on_weekend_or_holiday
  current_new_L3_subject:
    subject: 国民年金法
    selected_completion_status: completed
    selected_completion_marker: completed_Q15-1_to_Q15-14
    multiple_choice_status: next_weekend_start
    next_question: confirm_at_2026_05_09_L3_start

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
  weekday_workday_constraint:
    L3: unavailable
    allowed_layers: [L1, L2, 秒トレ]
  weekend_holiday_rule:
    L3: available
  special_days:
    2026-05-06: holiday_gw_available_but_reassigned_to_L2_recovery
    2026-05-07: weekday_workday_no_L3
    2026-05-08: weekday_workday_no_L3
    2026-05-10: L3不可

current_position:
  as_of: 2026-05-05
  study_time_excluding_sekotore: 3時間57分
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
    multiple_choice_status: scheduled_2026_05_09
    next_resume_question_id: confirm_at_L3_start
  gap_status: delayed_but_managed
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-05
  source_review:
    - systems/delta/history/daily/2026-05-05.md
    - systems/delta/history/daily/2026-05-04.md
  plan_anchor: 2026-06-30 1巡目完了必達
  current_position: L1国民年金法P219完了、L2国民年金法P157完了、L3国民年金法選択Q15-14完了、択一は5/9土曜に開始
  expected_position: GW標準ラインでは国民年金法択一Q2章まで着手済み想定だったが未着手。平日仕事日はL3を入れず、5/6〜5/8はL1/L2、5/9にL3択一へ接続する。
  gap_status: delayed_but_managed
  operation_mode: recovery_forward
  must_line:
    - 国民年金法 L2 P158〜P180（23ページ）
  standard_line:
    - 国民年金法 L2 P158〜P195（38ページ）
  stretch_line:
    - 国民年金法 L2 P158〜P205（48ページ）
  recovery_targets:
    - 国民年金法 L2 P158〜P219を5/7までに回収する
    - 国民年金法 L1 P220以降はL2回収後に再開する
    - 国民年金法 L3 択一は2026-05-09に開始問題番号を確認して実施する
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始は国民年金法L1/L2完了確認後
    - 健康保険法×・△回収は1巡目後または明示回収日に回す
  recompute_triggers:
    - P195未達
    - P219未達
    - 2026-05-09 L3開始問題番号確認
    - 2026-05-09 L3実績確定
    - 秒トレ未実施が確定
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-06）

- task: 国民年金法 L2 P158〜P195（38ページ）
  rolling_day: Day0
  due_date: 2026-05-06
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 120
  operation_mode: recovery_forward
  plan_anchor: 2026-05-06 GW最終日 L2遅れ回収
  expected_position: 国民年金法 L2 P195完了
  current_position: 国民年金法 L2 P157完了、次回P158
  gap_status: delayed_but_managed
  start_page: P158
  must_end_page: P180
  standard_end_page: P195
  stretch_end_page: P205
  page_range: P158〜P195
  next_start_page: P158
  must_line:
    - 国民年金法 L2 P158〜P180（23ページ）
  standard_line:
    - 国民年金法 L2 P158〜P195（38ページ）
  stretch_line:
    - 国民年金法 L2 P158〜P205（48ページ）
  recovery_targets:
    - 国民年金法 L2 P158〜P195（38ページ）
  defer_targets:
    - 国民年金法 L1 P220以降
    - 国民年金法 L3 択一演習本体
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P180未達
    - P195未達
    - 体力低下で60分未満

## Day1（2026-05-07）

- task: 国民年金法 L2 P196〜P219（24ページ）
  rolling_day: Day1
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 90
  operation_mode: recovery_forward
  plan_anchor: 2026-05-07 平日仕事日。L3なし、L2をL1位置へ追いつかせる
  expected_position: 国民年金法 L2 P219完了
  current_position: Day0標準達成後はP196開始。Day0未達なら到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P196
  must_end_page: P205
  standard_end_page: P219
  stretch_end_page: P219
  page_range: P196〜P219
  next_start_page: P196
  must_line:
    - 国民年金法 L2 P196〜P205（10ページ）
  standard_line:
    - 国民年金法 L2 P196〜P219（24ページ）
  stretch_line:
    - 国民年金法 L2 P196〜P219（24ページ）＋P158〜P219のチェック不足箇所確認
  recovery_targets:
    - 国民年金法 L2 P158〜P219回収完了
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - Day0がP195未達
    - P219未達
    - 国民年金法L2完了範囲に不確定ページが出た

## Day2（2026-05-08）

- task: 国民年金法 L1 P220〜P245（26ページ）
  rolling_day: Day2
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  estimated_minutes: 90
  operation_mode: recovery_forward
  plan_anchor: 2026-05-08 平日仕事日。L3なし、L1再開
  expected_position: 国民年金法 L1 P245完了
  current_position: 国民年金法 L1 P219完了
  gap_status: delayed_but_managed
  start_page: P220
  must_end_page: P235
  standard_end_page: P245
  stretch_end_page: P255
  page_range: P220〜P245
  next_start_page: P220
  must_line:
    - 国民年金法 L1 P220〜P235（16ページ）
  standard_line:
    - 国民年金法 L1 P220〜P245（26ページ）
  stretch_line:
    - 国民年金法 L1 P220〜P255（36ページ）
  recovery_targets:
    - 国民年金法 L1 P220〜P245（26ページ）
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 健康保険法×・△回収
  recompute_triggers:
    - P235未達
    - P245未達
    - Day1でL2 P219未達

## Day3（2026-05-09）

- task: 国民年金法 L3 択一 開始問題番号確認後に16問
  rolling_day: Day3
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3_scope_bound
  material: 過去問講座テキスト
  estimated_minutes: 80
  operation_mode: recovery_required
  plan_anchor: 2026-05-09 土曜L3 国民年金法択一へ接続
  expected_position: 国民年金法 L3 択一 16問完了
  current_position: 国民年金法 L3 選択Q15-14完了、択一開始問題番号は当日教材で確認
  gap_status: needs_confirmation
  start_question_id: confirm_at_start
  must_end_question_id: confirmed_start_plus_7_questions
  standard_end_question_id: confirmed_start_plus_15_questions
  stretch_end_question_id: confirmed_start_plus_19_questions
  next_resume_question_id: confirmed_start_question_id
  questions: 16
  question_range: confirmed_start〜confirmed_start+15
  must_line:
    - 国民年金法 L3 択一 開始問題番号確認後に8問
  standard_line:
    - 国民年金法 L3 択一 開始問題番号確認後に16問
  stretch_line:
    - 国民年金法 L3 択一 開始問題番号確認後に20問
  recovery_targets:
    - GW標準ライン未達の国民年金法択一へ接続する
    - 開始問題番号を日報へ保存する
  defer_targets:
    - 国民年金法 選択Q15-1〜Q15-14の△回収
    - 健康保険法×・△回収
  recompute_triggers:
    - 開始問題番号が確認できない
    - 8問未達
    - 16問未達
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
    - 5/9の国民年金法L3択一が8問未達
    - 秒トレ未実施

## Day5（2026-05-11）

- task: 国民年金法 L1 P246〜P280（35ページ）
  rolling_day: Day5
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  estimated_minutes: 120
  operation_mode: recovery_forward
  plan_anchor: 2026-05-11 平日仕事日。L3なし、国民年金法L1完了方向へ前進
  expected_position: 国民年金法 L1 P280完了
  current_position: Day2標準達成後はP246開始。未達時は到達ページの次から再計算
  gap_status: delayed_but_managed
  start_page: P246
  must_end_page: P260
  standard_end_page: P280
  stretch_end_page: P280
  page_range: P246〜P280
  next_start_page: P246
  must_line:
    - 国民年金法 L1 P246〜P260（15ページ）
  standard_line:
    - 国民年金法 L1 P246〜P280（35ページ）
  stretch_line:
    - 国民年金法 L1 P246〜P280（35ページ）＋L2 P220〜P230（11ページ）
  recovery_targets:
    - 国民年金法 L1 P246〜P280（35ページ）
  defer_targets:
    - 平日仕事日のL3
    - 厚生年金保険法 L1/L2開始
    - 国民年金法L3△回収
  recompute_triggers:
    - P260未達
    - P280未達

## Day6（2026-05-12）

- task: 国民年金法 L2 P220〜P245（26ページ）
  rolling_day: Day6
  due_date: 2026-05-12
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  estimated_minutes: 90
  operation_mode: recovery_forward
  plan_anchor: 2026-05-12 平日仕事日。L3なし、L1進行範囲へL2追随
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
    - 5/11 L1 P280未達

---

# Next operations: 2026-05-13〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-13 | L2 | 国民年金法 L2 P246〜P280（35ページ） |
| 2026-05-14 | L1/L2 | 国民年金法 L1/L2 完了確認日。未完了ページがあれば国民年金法内で回収。平日仕事日のL3なし |
| 2026-05-15 | L1/L2 | 厚生年金保険法開始可否を判定。国民年金法未完なら国民年金法を優先。平日仕事日のL3なし |
| 2026-05-16 | L3 | 国民年金法 L3 択一 16問。5/9未達分があれば先に回収 |
| 2026-05-17 | L3 | 国民年金法 L3 択一 16問。国民年金法択一の残量を再計算 |
| 2026-05-18〜2026-05-22 | L1/L2 | 平日仕事日のL3なし。国民年金法完了後、厚生年金保険法 L1/L2 前半へ移行 |
| 2026-05-23〜2026-05-24 | L3 | 国民年金法択一継続または厚生年金保険法選択へ接続。5/17時点で再計算 |
| 2026-05-25〜2026-05-29 | L1/L2 | 平日仕事日のL3なし。厚生年金保険法L1/L2後半。国民年金法残があれば平日L1/L2で圧縮回収 |
| 2026-05-30〜2026-05-31 | L3 | 厚生年金保険法L3選択へ接続、または国民年金法択一残を回収 |
| 2026-06-01〜2026-06-30 | L1/L2・L3 | 平日はL1/L2、土日祝はL3。労一・社一、厚生年金保険法L3、未完了回収。6/30一巡目完了目標を維持するが、国民年金法択一残量によりcompression_requiredへ移行する可能性あり |

## Next operation guardrails

- L1/L2はページ範囲とページ数で管理する。
- L3は問題番号範囲と問題数で管理する。
- L3は平日仕事日に入れない。土日祝に配置する。
- 国民年金法 L3 択一は、2026-05-09のL3開始時に開始問題番号を確認し、日報保存後に問題番号範囲へ置換する。
- 健康保険法L3は新規1巡目として再投入しない。扱いは回収または2巡目確認のみ。
- 厚生年金保険法L1/L2は国民年金法L1/L2完了確認後に再判定する。
- 2026-05-10はL3不可日として固定する。

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
  existing_next_operations_was_read_when_present: true
  L1_L2_current_position_confirmed: true
  L3_current_position_confirmed: true
  current_subject_not_skipped: true
  completed_subject_not_reintroduced: true
  L3_order_selection_before_takuitsu: true
  D0_D6_all_exist: true
  D7_target_next_operations_exists_when_medium_target_exists: true
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: partial_until_2026_05_09_start_id_confirmed
  forbidden_vague_terms_absent: partial_exception_for_confirm_at_start
  special_days_reflected: true
  weekday_workday_L3_constraint_reflected: true
  overload_detected: true
  overload_resolution: redistributed_L2_before_L1_and_moved_L3_to_2026_05_09
  roadmap_plan_milestone_reachable: conditional_reachable_with_compression

## Rules

- Operations is next-action SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- L3 は科目ごとに 選択 → 択一 の順序で進める。
- 平日仕事日はL3を行わず、L1/L2と秒トレを行う。
- 土日祝にL3を行う。
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates learning history and next operations.

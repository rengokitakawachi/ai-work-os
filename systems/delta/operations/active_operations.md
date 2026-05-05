# delta active_operations

## Metadata

version: positive_valid_write_fixture_after_L3_order_completion_marker_fix
updated_at: 2026-05-05
branch: feature/atlas-pre-delta-foundation
operation_status: safe_restored_no_takuitsu_before_selected_completion_valid_write_fixture
last_daily_review: systems/delta/history/daily/2026-05-04.md
latest_in_day_history: systems/delta/history/daily/2026-05-05.md

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  todoist_role: projection_only

roadmap_anchor:
  roadmap: systems/delta/roadmap/delta_roadmap.md
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過
existing_next_operations_read:
  source: systems/delta/operations/active_operations.md
  sha: ff588298afd147452493902b05a9670aa7224233
existing_next_operations_was_read: true

## Completed scope evidence

completed_scope_evidence:
  source: systems/delta/history/daily/2026-05-04.md
  completed_subjects:
    健康保険法:
      L3_new_exercises: completed
      selected_questions: completed
      completed_through: Q11-21
      allowed_future_use: recovery_or_second_pass_only
  current_new_L3_subject:
    subject: 国民年金法
    selected_completion_status: incomplete
    selected_completion_marker: missing
    next_question: Q15-1

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度

current_position:
  as_of: 2026-05-05
  L1:
    subject: 国民年金法
    current_position: P219完了
    next_start_page: P220
    completion_status: incomplete
  L2:
    subject: 国民年金法
    current_position: P158以降未完了
    next_start_page: P158
    completion_status: incomplete
  L3:
    subject: 国民年金法
    current_subject: 国民年金法
    selected_completion_status: incomplete
    selected_completion_marker: missing
    selected_next_question: Q15-1
    multiple_choice_status: blocked_until_selected_completed
    next_resume_question_id: Q15-1
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-05
  source_review:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  plan_anchor: 2026-06-30 1巡目完了必達
  current_position: L1国民年金法P219完了、L2国民年金法P158以降未完了、L3国民年金法選択Q15-1開始前
  expected_position: 国民年金法 L3 選択 Q15-1〜Q15-14を先に完了し、択一は選択完了 marker 確定後に再計算
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  recovery_targets:
    - 国民年金法 L3 選択完了 marker を確定する
    - 健康保険法×・△は後日回収
  defer_targets:
    - 国民年金法 L3 択一は選択完了 marker 確定後
    - 健康保険法×・△回収
  recompute_triggers:
    - 国民年金法L3選択Q15-14完了
    - selected_completion_marker_confirmed
    - Q15-14未達
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

## Day0（2026-05-05）

- task: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  rolling_day: Day0
  due_date: 2026-05-05
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-05 国民年金法選択問題完了目標
  expected_position: 国民年金法 L3 選択 Q15-14完了
  current_position: 国民年金法 L3 選択 Q15-1開始前
  gap_status: delayed_but_recovering
  start_question_id: Q15-1
  must_end_question_id: Q15-7
  standard_end_question_id: Q15-14
  stretch_end_question_id: Q15-14
  next_resume_question_id: Q15-1
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  recovery_targets:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  defer_targets:
    - 国民年金法 L3 択一は選択完了 marker 確定後
    - 健康保険法×・△回収
  recompute_triggers:
    - Q15-14未達
    - selected_completion_marker_confirmed

## Day1（2026-05-06）

- task: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  rolling_day: Day1
  due_date: 2026-05-06
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-06 国民年金法選択完了確認
  expected_position: 国民年金法 L3 選択 Q15-14完了確認
  current_position: Day0後に更新
  gap_status: needs_confirmation
  start_question_id: Q15-1
  must_end_question_id: Q15-14
  standard_end_question_id: Q15-14
  stretch_end_question_id: Q15-14
  next_resume_question_id: Q15-1
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）評価記号整理
  recovery_targets:
    - 国民年金法 L3 選択完了 marker を確定する
  defer_targets:
    - 国民年金法 L3 択一は選択完了 marker 確定後
  recompute_triggers:
    - selected_completion_marker_confirmed
    - Q15-14未達

## Day2（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day2
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-07 平日L1/L2 国民年金法
  expected_position: 国民年金法 L2 P190完了
  current_position: 国民年金法 L2 P158以降未完了
  gap_status: delayed_but_recovering
  start_page: P158
  must_end_page: P175
  standard_end_page: P190
  stretch_end_page: P200
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
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P190未達

## Day3（2026-05-08）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day3
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-08 平日L1/L2 国民年金法
  expected_position: 国民年金法 L2 P219完了
  current_position: Day2後にP191開始
  gap_status: delayed_but_recovering
  start_page: P191
  must_end_page: P205
  standard_end_page: P219
  stretch_end_page: P219
  next_start_page: P191
  must_line:
    - 国民年金法 L2 P191〜P205（15ページ）
  standard_line:
    - 国民年金法 L2 P191〜P219（29ページ）
  stretch_line:
    - 国民年金法 L2 P191〜P219（29ページ）
  recovery_targets:
    - 国民年金法 L2 P191〜P219（29ページ）
  defer_targets:
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P219未達

## Day4（2026-05-09）

- task: 国民年金法 L3 選択 Q15-1〜Q15-14（14問）再確認
  rolling_day: Day4
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-09 L3国民年金法選択確認
  expected_position: 国民年金法 L3 選択完了 marker 確定
  current_position: Day1後に更新
  gap_status: needs_confirmation
  start_question_id: Q15-1
  must_end_question_id: Q15-14
  standard_end_question_id: Q15-14
  stretch_end_question_id: Q15-14
  next_resume_question_id: Q15-1
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）再確認
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）再確認
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）評価記号整理
  recovery_targets:
    - 国民年金法 L3 選択完了 marker を確定する
  defer_targets:
    - 国民年金法 L3 択一は選択完了 marker 確定後
  recompute_triggers:
    - selected_completion_marker_confirmed
    - Q15-14未達

## Day5（2026-05-10）

- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day5
  due_date: 2026-05-10
  subject: 共通
  study_type: rest_or_light_review
  material: none
  operation_mode: normal
  plan_anchor: 2026-05-10 L3不可
  expected_position: 新規L1/L2/L3なし
  current_position: Day4後に更新
  gap_status: on_track
  must_line:
    - 新規L1/L2/L3なし
  standard_line:
    - 新規L1/L2/L3なし
  stretch_line:
    - 秒トレ40問
  recovery_targets:
    - 新規L3は実施しない
  defer_targets:
    - 国民年金法 L3 択一は2026-05-11以降に再計算
  recompute_triggers:
    - user_explicitly_requests_recompute

## Day6（2026-05-11）

- task: 国民年金法 L1 P220〜P255（36ページ）
  rolling_day: Day6
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  operation_mode: recovery_forward
  plan_anchor: 2026-05-11 国民年金法L1前進
  expected_position: 国民年金法 L1 P255完了
  current_position: 国民年金法 L1 P219完了
  gap_status: delayed_but_recovering
  start_page: P220
  must_end_page: P235
  standard_end_page: P255
  stretch_end_page: P260
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
    - 厚生年金保険法 L1/L2開始
  recompute_triggers:
    - P255未達

---

# Next operations: 2026-05-12〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-12 | L2 | 国民年金法 L2 P220〜P245（26ページ） |
| 2026-05-13 | L2 | 国民年金法 L2 P246〜P280（35ページ） |
| 2026-05-14 | L1/L2 | 国民年金法 L1/L2 完了確認日。厚生年金保険法L1/L2開始可否を再判定 |

## Next operation guardrails

- L1/L2はページ範囲とページ数で管理する。
- L3は問題番号範囲と問題数で管理する。
- 国民年金法 L3 択一は、国民年金法 L3 選択完了 marker が daily history に保存されてから再計算する。
- 健康保険法L3は再投入しない。
- 厚生年金保険法L1/L2は国民年金法L1/L2完了確認後に再判定する。

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

## Rules

- Operations is next-action SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- L3 は科目ごとに 選択 → 択一 の順序で進める。
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates learning history and next operations.

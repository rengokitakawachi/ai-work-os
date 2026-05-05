# delta active_operations

## Metadata

version: delta_v0.6_operations_shape_restored_after_fixture_1C
updated_at: 2026-05-05
branch: feature/atlas-pre-delta-foundation
operation_status: active_d0_d6_next_through_2026_06_30_restored
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

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度

plan_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過
  special_days:
    - 2026-05-10: L3不可
    - 2026-06-13: L3不可
    - 2026-06-30: 年休。L3可

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
    completed_subject: 健康保険法
    completed_scope: 選択式完了済み、択一Q11-21まで完了
    current_subject: 国民年金法
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
  current_position: L1国民年金法P219完了、L2国民年金法P158以降未完了、L3国民年金法Q15-1開始前
  expected_position: D0で国民年金法選択Q15-14完了および択一Q2-5、D1でQ3-1〜Q7-2、D4でQ8-1〜Q11-3
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  must_line:
    - 国民年金法 L3 選択問題 Q15-1〜Q15-14（14問）
  standard_line:
    - 国民年金法 L3 選択問題 Q15-1〜Q15-14（14問）完了
    - 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q4-4（13問）
  next_resume_question_id: Q15-1
  recovery_targets:
    health_insurance_deferred:
      status: 保持のみ。国民年金法L3前進を優先
      priority_1_cross: [Q1-2, Q2-2, Q2-6, Q2-7, Q3-2, Q4-2, Q4-5, Q4-6, Q9-3, Q10-1, Q11-13]
      priority_2_triangle: [Q1-3, Q2-1, Q2-5, Q3-1, Q3-3, Q4-3, Q4-4, Q4-7, Q4-8, Q4-9, Q9-1, Q11-1, Q11-4, Q11-7, Q11-8, Q11-9, Q11-10, Q11-17, Q11-18, Q11-20, Q11-21]
  defer:
    - 健康保険法の×・△回収
    - 厚生年金保険法L1/L2開始は国民年金法L1/L2完了確認後
  recompute_triggers:
    - user_explicitly_requests_recompute
    - Q15-14未達
    - Q2-5未達
    - D1_Q7-2未達
    - D4_Q11-3未達
    - L2_P219未達
    - plan_changes

---

# Active operations: D0〜D6

## Day0（2026-05-05）

- task: 国民年金法 L3 選択Q15-1〜Q15-14（14問） + 択一Q1-1〜Q2-5（7問）
  rolling_day: Day0
  due_date: 2026-05-05
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-05 国民年金法選択問題完了目標 + 択一前倒し
  expected_position: 選択Q15-14完了 + 択一Q2-5完了
  current_position: 選択Q15-1開始前
  gap_status: delayed_but_recovering
  start_question_id: Q15-1
  must_end_question_id: Q15-14
  standard_end_question_id: Q2-5
  stretch_end_question_id: Q4-4
  next_resume_question_id: Q15-1
  must_line:
    - 国民年金法 L3 選択問題 Q15-1〜Q15-14（14問）
  standard_line:
    - 国民年金法 L3 選択問題 Q15-1〜Q15-14（14問）完了
    - 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q4-4（13問）
  recovery_targets:
    - 国民年金法Q15およびQ1〜Q2の×・△はD1以降へ保持
    - 健康保険法×・△は後日回収
  defer_targets:
    - 健康保険法×・△回収
    - 国民年金法L2回収はD2以降
  recompute_triggers:
    - Q15-14未達
    - Q2-5未達
    - Q15範囲がQ15-14で終わらない
    - user_explicitly_requests_recompute

## Day1（2026-05-06）

- task: 国民年金法 L3 択一 Q3-1〜Q7-2（14問）
  rolling_day: Day1
  due_date: 2026-05-06
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-06 国民年金法択一前倒し / 5月17日択一完了から逆算
  expected_position: Q3-1〜Q7-2（14問）完了
  current_position: D0標準達成時はQ3-1から開始
  gap_status: delayed_but_recovering
  start_question_id: Q3-1
  must_end_question_id: Q5-1
  standard_end_question_id: Q7-2
  stretch_end_question_id: Q9-1
  next_resume_question_id: Q3-1
  must_line:
    - 国民年金法 L3 択一 Q3-1〜Q5-1（7問）
  standard_line:
    - 国民年金法 L3 択一 Q3-1〜Q7-2（14問）
  stretch_line:
    - 国民年金法 L3 択一 Q3-1〜Q9-1（17問）
  recovery_targets:
    - D0で発生した国民年金法Q15およびQ1〜Q2の×・△を保持
    - 健康保険法×・△は後日回収
  defer_targets:
    - 健康保険法×・△回収
    - L2ページ回収はD2から再開
  recompute_triggers:
    - D0でQ2-5未達
    - Q3-1開始不能
    - Q7-2未達
    - 国民年金法_択一_Q番号がPDF確認と異なる

## Day2（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day2
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-07 平日L1/L2 国民年金法 / L2をL1へ追いつかせる
  expected_position: L2 P190まで回収
  current_position: L1 P219完了、L2 P158以降未完了
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
    L2_gap:
      current_L1_position: P219
      current_L2_position: P158以降未完了
      target: D3でP219まで追いつく
  defer_targets:
    - L3はD4に再開
    - 健康保険法×・△回収
  recompute_triggers:
    - L2_P158開始が実際と異なる
    - D1で国民年金法L3択一が未実施
    - D2_P190未達

## Day3（2026-05-08）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day3
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-08 平日L1/L2 国民年金法 / L2をL1現在地へ追いつかせる
  expected_position: L2 P219まで回収
  current_position: D2 daily reviewでL2 next_start_pageを更新
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
    - 国民年金法 L2 P191〜P219（29ページ）完了
  recovery_targets:
    L2_gap:
      target: L2をL1 P219へ追いつかせる
  defer_targets:
    - L3はD4に再開
    - 健康保険法×・△回収
  recompute_triggers:
    - D2でP190未達
    - L1がP219から大きく前進
    - user_explicitly_requests_recompute

## Day4（2026-05-09）

- task: 国民年金法 L3 択一 Q8-1〜Q11-3（16問、Q10-0除外）
  rolling_day: Day4
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-09 L3国民年金法択一 / 5月17日択一完了から逆算
  expected_position: Q8-1〜Q11-3（16問、Q10-0除外）完了
  current_position: D1標準達成時はQ8-1から開始
  gap_status: delayed_but_recovering
  start_question_id: Q8-1
  must_end_question_id: Q9-10
  standard_end_question_id: Q11-3
  stretch_end_question_id: Q13-2
  next_resume_question_id: Q8-1
  must_line:
    - 国民年金法 L3 択一 Q8-1〜Q9-10（13問）
  standard_line:
    - 国民年金法 L3 択一 Q8-1〜Q11-3（16問、Q10-0除外）
  stretch_line:
    - 国民年金法 L3 択一 Q8-1〜Q13-2（22問、Q10-0除外）
  recovery_targets:
    - 国民年金法Q15およびQ1〜Q7の×・△を保持
    - 健康保険法×・△は後日回収
  defer_targets:
    - 2026-05-10はL3不可
    - 健康保険法×・△回収
  recompute_triggers:
    - D1でQ7-2未達またはQ7-2を超過
    - Q8-1またはQ11-3のPDF確認差異
    - user_explicitly_requests_recompute

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
  current_position: D4 daily reviewで更新
  gap_status: on_track
  must_line:
    - 新規L1/L2/L3なし
  standard_line:
    - 新規L1/L2/L3なし
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q11-3の評価記号整理のみ
  recovery_targets:
    - 新規L3は実施しない
  defer_targets:
    - 国民年金法L3択一の続きは2026-05-16へ回す
    - L1/L2は5/11以降に再開
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 2026-05-10に学習時間が十分確保できると明示された場合

## Day6（2026-05-11）

- task: 国民年金法 L1 P220〜P255（36ページ）
  rolling_day: Day6
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  operation_mode: recovery_forward
  plan_anchor: 2026-05-11〜2026-05-15 国民年金法完了を優先
  expected_position: L1 P255まで前倒しし、5/12以降の国民年金法完了負荷を軽くする
  current_position: L1 P219完了、L2はD3でP219まで回収予定
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
    L1_L2_completion:
      target: 5/11〜5/15で国民年金法L1/L2完了を優先する
  defer_targets:
    - 健康保険法×・△回収
    - 厚生年金保険法への本格接続は国民年金法current_position確認後
  recompute_triggers:
    - D3でL2_P219未達
    - D4でL3_Q11-3未達
    - plan_changes
    - user_explicitly_requests_recompute

---

# Next operations: 2026-05-12〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-12 | L1 | 国民年金法 L1 P256〜P280（25ページ） |
| 2026-05-13 | L2 | 国民年金法 L2 P220〜P245（26ページ） |
| 2026-05-14 | L2 | 国民年金法 L2 P246〜P280（35ページ） |
| 2026-05-15 | L1/L2 | 国民年金法 L1/L2 完了確認日。厚生年金保険法L1/L2開始可否を再判定 |
| 2026-05-16 | L3 | 国民年金法 L3 択一 Q12-1〜Q14-10（16問） |
| 2026-05-17 | L3 | 国民年金法 L3 択一 Q14-11〜Q14-17（7問） |

## Next operation guardrails

- L1/L2はページ範囲とページ数で管理する。
- L3は問題番号範囲と問題数で管理する。
- 国民年金法L1/L2が未完了の間、厚生年金保険法L1/L2を新規作業として入れない。
- 2026-05-10はL3不可。
- 2026-06-13はL3不可。

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
quantitative_management_rules:
  - L1/L2はstart_page、must_end_page、standard_end_page、stretch_end_page、next_start_pageとページ数で管理する
  - L3はstart_question_id、must_end_question_id、standard_end_question_id、stretch_end_question_id、next_resume_question_idと問題数で管理する
  - operations更新時、D0〜D6の欠落があればwriteしない

## Rules

- Operations is next-action SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- Daily review is not complete after history write alone; after daily history confirmation, update active_operations.
- Daily operation must carry plan_anchor, expected_position, current_position, gap_status, operation_mode, must_line, standard_line, stretch_line, recovery_targets, defer_targets, and recompute_triggers.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- L3 review priority SSOT is understanding-based review_mark: × → △ → ○ → ◎.
- 健康保険法の×・△回収は国民年金法L3の前進後へ defer する。
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates learning history and next operations.

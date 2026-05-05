# delta active_operations

## Metadata

version: delta_v0.6_operations_shape
updated_at: 2026-05-05
branch: feature/atlas-pre-delta-foundation
last_daily_review: systems/delta/history/daily/2026-05-04.md
latest_in_day_history: systems/delta/history/daily/2026-05-05.md
operation_status: quantitative_d0_d6_rebuilt_with_corrected_l3_capacity

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  monthly_summary_role: summary_view
  legacy_monthly_role: migration_fallback_only
  todoist_role: projection_only

## Capacity assumptions

capacity_assumptions:
  L3_selected_questions:
    standard_capacity: 24問程度
    reason: 選択問題は早く解けるため、択一式より多く処理可能
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
    reason: 択一問題は記録・評価込みで16問程度を標準処理量とする
  L1_L2_pages:
    standard_capacity: 20〜40ページ程度
    upper_guard: 50ページ超は原則分割
  load_realism_guard:
    - L1/L2 standard_line が50ページを超える場合は原則分割する
    - L3択一 standard_line が25問を超える場合は原則分割する
    - L3選択 standard_line は24問程度まで許容する
    - 2巡目仕分けが30問を超える場合は原則分割する
    - 超過する場合はD0〜D6内で前倒し・分散を検討する
    - それでも無理なら plan_alignment_status を compression_required または critical_delay とする

## Current plan gap

plan_gap:
  fixed_at: 2026-05-05
  source_review:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  plan_anchor:
    roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
    near_term_plan:
      - 2026-05-05 国民年金法 L3 選択問題完了
      - 2026-05-06 国民年金法 L3 択一 Q1章〜Q2章へ着手
      - 2026-05-17 国民年金法 L3 択一完了目標
      - 2026-05-18〜05-31 厚生年金保険法へ接続
      - 2026-06-30 主要科目L1/L2/L3 1巡完了状態
  current_position:
    as_of: 2026-05-05
    daily_execution_status: in_progress
    plan_alignment_status: delayed_but_recovering
    judgment: delayed_but_recovering
    L1:
      subject: 国民年金法
      current_position: P219完了
      next_start_page: P220
    L2:
      subject: 国民年金法
      current_position: P158以降未完了
      next_start_page: P158
    L3:
      completed_subject: 健康保険法
      completed_scope: 選択式完了済み、択一Q11-21まで完了
      current_subject: 国民年金法
      current_position: 選択問題Q15-1未着手
      next_resume_question_id: Q15-1
  expected_position:
    2026-05-05: 国民年金法 L3 選択Q15-14完了 + 択一Q2-5まで前倒し
    2026-05-06: 国民年金法 L3 択一 Q3-1〜Q7-2
    2026-05-08: 国民年金法 L2 P219まで回収
    2026-05-09: 国民年金法 L3 択一 Q8-1〜Q11-3
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  recovery_required: true
  reason:
    - 選択問題は早く解けるため、5/5を選択14問だけで止めるのは過小計画
    - 択一は16問程度処理可能なため、5/16に6問だけ置くのは過小計画
    - D0〜D6で国民年金法L3を前倒しし、5/16以降の負荷を平準化する
    - L1/L2はページ範囲＋ページ数、L3は問題番号範囲＋問題数で管理する

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-05
  source_review:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  plan_anchor: roadmap 6月末1巡完了 / plan 5月17日 国民年金法L3択一完了目標
  current_position: L1国民年金法P219完了、L2国民年金法P158以降未完了、L3国民年金法Q15-1未着手
  expected_position: D0で選択Q15-14完了 + 択一Q2-5、D1でQ3-1〜Q7-2、D4でQ8-1〜Q11-3
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
    national_pension_L2_gap:
      current_L1: P219
      current_L2: P158以降未完了
      recovery_window: 2026-05-07〜2026-05-08
      target: L2 P219まで回収
  defer:
    - 健康保険法の×・△回収
    - 厚生年金保険法への本格接続は国民年金法L1/L2/L3現在地確認後
    - monthly summary rebuild
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - Q15-14未達
    - Q2-5未達
    - 国民年金法_択一_Q番号がPDF確認と異なる
    - D1_Q7-2未達
    - D4_Q11-3未達
    - L2_P219未達
    - plan_changes
  next_review_checkpoint:
    - 2026-05-05 end-of-day daily review
    - Q15-14完了可否
    - Q2-5到達可否
    - D1をQ3-1開始で確定できるか

## Quantitative D0-D6 rolling plan

### Day0（2026-05-05）

- task: 国民年金法 L3 選択Q15-1〜Q15-14（14問） + 択一Q1-1〜Q2-5（7問）
  rolling_day: Day0
  due_date: 2026-05-05
  due_type: date
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-05 国民年金法選択問題完了目標 + 択一前倒し
  expected_position: 選択Q15-14完了 + 択一Q2-5完了
  current_position: 選択Q15-1未着手
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
  completed_condition:
    - Q15-1〜実施済みquestion_idをdaily historyへ記録
    - 選択式は各問の空欄正答数、正誤、理解度評価、実測時間を記録
    - 択一は各問の正誤、理解度評価、実測時間を記録
    - 次再開question_idを確定

### Day1（2026-05-06）

- task: 国民年金法 L3 択一 Q3-1〜Q7-2（14問）
  rolling_day: Day1
  due_date: 2026-05-06
  due_type: date
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

### Day2（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day2
  due_date: 2026-05-07
  due_type: date
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
    - D1で国民年金法L3択一が未着手
    - D2_P190未達

### Day3（2026-05-08）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day3
  due_date: 2026-05-08
  due_type: date
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

### Day4（2026-05-09）

- task: 国民年金法 L3 択一 Q8-1〜Q11-3（16問、Q10-0除外）
  rolling_day: Day4
  due_date: 2026-05-09
  due_type: date
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

### Day5（2026-05-10）

- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day5
  due_date: 2026-05-10
  due_type: date
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

### Day6（2026-05-11）

- task: 国民年金法 L1 P220〜P255（36ページ）
  rolling_day: Day6
  due_date: 2026-05-11
  due_type: date
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  operation_mode: recovery_forward
  plan_anchor: 2026-05-11〜2026-05-15 国民年金法完了方向 → 厚生年金保険法接続準備
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
      target: 5/11〜5/15で国民年金法L1/L2完了方向へ進め、厚生年金保険法へ接続する
  defer_targets:
    - 健康保険法×・△回収
    - 厚生年金保険法への本格接続は国民年金法current_position確認後
  recompute_triggers:
    - D3でL2_P219未達
    - D4でL3_Q11-3未達
    - plan_changes
    - user_explicitly_requests_recompute

## Post D6 projection for load-balanced plan

post_D6_projection:
  purpose: D0〜D6で前倒しした前提の5/12以降負荷平準化メモ。daily rolling時にD0〜D6へ昇格させる
  2026-05-12:
    standard: 国民年金法 L1 P256〜P280（25ページ）
  2026-05-13:
    standard: 国民年金法 L2 P220〜P245（26ページ）
  2026-05-14:
    standard: 国民年金法 L2 P246〜P280（35ページ）
  2026-05-15:
    standard: 厚生年金保険法 L1 P1〜P35（35ページ）
  2026-05-16:
    standard: 国民年金法 L3 択一 Q12-1〜Q14-10（16問）
  2026-05-17:
    standard: 国民年金法 L3 択一 Q14-11〜Q14-17（7問） + 国民年金法L3未達分回収

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
  - 「着手」「進める」「できるところまで」「Qx-last」「章だけ」「前半」「後半」だけの標準ラインは禁止
  - future dayのstart_question_id/pageは前日レビューでずれた場合にrecomputeする
  - operations更新時、D0〜D6の欠落があればwriteしない
load_realism_guard:
  - L1/L2 standard_line が50ページを超える場合は原則分割する
  - L3択一 standard_line が25問を超える場合は原則分割する
  - L3選択 standard_line は24問程度まで許容する
  - 2巡目仕分けが30問を超える場合は原則分割する
  - 超過する場合はD0〜D6内で前倒し・分散を検討する
  - それでも無理なら plan_alignment_status を compression_required または critical_delay とする

## Rules

- Operations is next-action SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- Monthly history is summary view only.
- Legacy monthly history is migration fallback only.
- Daily review is not complete after history write alone; after daily history confirmation, update active_operations.
- Daily operation must carry plan_anchor, expected_position, current_position, gap_status, operation_mode, must_line, standard_line, stretch_line, recovery_targets, defer_targets, and recompute_triggers.
- on_track requires both daily execution and plan alignment. If daily execution is complete but plan is delayed, use delayed_but_managed / delayed_but_recovering / recovery_on_track.
- recommended_lines are generated at daily review and saved here.
- During the day, questions about 今日の推奨ライン read saved recommended_lines and do not recompute unless a recompute_trigger exists or the user explicitly asks.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- L3 operations must use real question IDs, not vague targets like Q3以降 / Q4の途中 / できるところまで / chapter-only.
- L3 question records should include question_id, source_page, difficulty, estimated_time, actual_time, time_delta, result, review_mark, next_review_target, time_analysis, estimate_source_status when available.
- L3 review priority SSOT is understanding-based review_mark: × → △ → ○ → ◎.
- Score, correctness, actual_time, and time_delta are supplemental.
- 1巡目では完璧主義にならず、全範囲を通す。
- delayed_but_recovering / recovery_forward の standard_line は、原則として plan_anchor の当日 expected_position と一致させる。
- must_line は plan_minimum_line として置き、ゼロ回避だけの survival_line と混同しない。
- 健康保険法の×・△回収は国民年金法L3の前進後へ defer する。
- 国民年金法 Q10-0 は演習対象なし。
- 健康保険法 Q5 / Q6 は存在しない。
- 健康保険法 Q8 は演習対象なし。
- 健康保険法 Q4-10 の次は Q7。
- 健康保険法 Q7 の次は Q9。
- Todoist is projection only.

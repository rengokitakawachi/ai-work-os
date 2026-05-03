# delta active_operations

## Metadata

version: delta_v0.6_operations_shape
updated_at: 2026-05-03
branch: feature/atlas-pre-delta-foundation
runtime_write_check: 2026-05-03 delta_operations update minimal check

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source: systems/delta/history/daily/2026-05-02.md
  monthly_summary_role: summary_view
  legacy_monthly_role: migration_fallback_only
  todoist_role: projection_only

## Current plan gap

plan_gap:
  fixed_at: 2026-05-03
  source_review: systems/delta/history/daily/2026-05-02.md
  plan_anchor:
    source_ref: systems/delta/plan/2026_sharoushi_exam_plan.md
    period: 2026-04-29〜2026-05-06 GW L3集中期間
    expected_by_2026-05-02:
      study_type: L3
      subject: 健康保険法
      material: 過去問講座テキスト
      expected_position: Q9-1〜Q11-last
    expected_by_2026-05-03:
      study_type: L3
      subject: 健康保険法 → 国民年金法
      expected_position: 健康保険法 ×・△回収 → 国民年金法 選択問題へ着手
  current_position:
    source_ref: systems/delta/history/daily/2026-05-02.md
    as_of: 2026-05-02
    daily_execution_status: completed
    plan_alignment_status: delayed
    judgment: recovery_on_track
    L1:
      subject: 国民年金法
      actual_scope: 7章 遺族基礎年金 P166〜P180 完了
      page_range: P166〜P180
      next_start_page: P181
    L3:
      subject: 健康保険法
      actual_scope: Q3-4〜Q4-10
      question_range: Q3-4〜Q4-10
      next_resume_question_id: Q7-1
      health_insurance_transitions:
        Q4-10: Q7
        Q7: Q9
      notes:
        - 健康保険法 Q5 / Q6 は存在しない
        - 健康保険法 Q8 は演習対象なし
    秒トレ:
      actual_scope: 40問完了
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  recovery_required: true
  reason:
    - 2026-05-02 plan expected は健康保険法 Q9-1〜Q11-last
    - 2026-05-02 daily actual は健康保険法 Q4-10まで
    - daily execution は十分だが、GW plan alignment は遅れが残る
    - 2026-05-03 は回収だけで終わらせず Q7以降の前進を主軸にする

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-03
  source_review: systems/delta/history/daily/2026-05-02.md
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 健康保険法 L3 Q4-10完了、次 Q7-1
  expected_position: 2026-05-02時点で健康保険法 Q9-1〜Q11-last、2026-05-03時点で健康保険法回収後に国民年金法選択問題へ着手
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  must_line:
    - 秒トレ40問
    - 健康保険法 L3 Q7-1〜Q7-last
    - Q4の×を軽く確認する: Q4-2, Q4-5, Q4-6
  standard_line:
    - 秒トレ40問
    - 健康保険法 L3 Q7完了
    - 健康保険法 L3 Q9-1以降へ着手
    - Q4-2, Q4-5, Q4-6 を回収
  stretch_line:
    - 健康保険法 L3 Q9〜Q11-last まで進める
    - Q4の△を確認する: Q4-3, Q4-4, Q4-7, Q4-8, Q4-9
  next_resume_question_id: Q7-1
  recovery_targets:
    priority_1_cross:
      - Q4-2
      - Q4-5
      - Q4-6
    priority_2_triangle:
      - Q4-3
      - Q4-4
      - Q4-7
      - Q4-8
      - Q4-9
    priority_3_circle:
      - Q3-4
      - Q4-10
    skip_possible:
      - Q4-1
  defer:
    - 国民年金法 L1/L2 の追加前進は、健康保険法 L3 Q7完了後に判断する
    - monthly summary rebuild は daily review / summary task に defer
    - Todoist projection は DELTA operations shape 固定後に fixture で確認する
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - Q7-last_completed_early
    - must_line_becomes_impossible
    - plan_changes
  next_review_checkpoint:
    - 2026-05-03 end-of-day daily review
    - 健康保険法 L3 Q7到達/完了状況
    - Q4 ×回収状況
    - 秒トレ40問完了状況

---

## Day0（2026-05-03）

- task: 健康保険法 L3 Q7以降 + Q4×回収
  source_ref:
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: date
  subject: 健康保険法
  topic: L3 択一 Q7以降 + Q4×回収
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  expected_position: 2026-05-02時点で健康保険法 Q9-1〜Q11-last、2026-05-03時点で健康保険法回収後に国民年金法選択問題へ着手
  current_position: 健康保険法 L3 Q4-10完了
  gap_status: delayed_but_recovering
  daily_execution_status: completed
  plan_alignment_status: delayed
  start_question_id: Q7-1
  must_end_question_id: Q7-last
  standard_end_question_id: Q9-1-or-later
  stretch_end_question_id: Q11-last
  next_resume_question_id: Q7-1
  must_line:
    - 秒トレ40問
    - 健康保険法 L3 Q7-1〜Q7-last
    - Q4の×を軽く確認する: Q4-2, Q4-5, Q4-6
  standard_line:
    - 秒トレ40問
    - 健康保険法 L3 Q7完了
    - 健康保険法 L3 Q9-1以降へ着手
    - Q4-2, Q4-5, Q4-6 を回収
  stretch_line:
    - 健康保険法 L3 Q9〜Q11-last まで進める
    - Q4の△を確認する: Q4-3, Q4-4, Q4-7, Q4-8, Q4-9
  recovery_targets:
    priority_1_cross:
      - Q4-2
      - Q4-5
      - Q4-6
    priority_2_triangle:
      - Q4-3
      - Q4-4
      - Q4-7
      - Q4-8
      - Q4-9
    priority_3_circle:
      - Q3-4
      - Q4-10
    skip_possible:
      - Q4-1
  defer_targets:
    - 国民年金法 L1/L2 新規前進
    - monthly summary rebuild
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - Q7-last_completed_early
    - must_line_becomes_impossible
    - plan_changes
  completed_condition:
    - 実施した question_id を daily history 2026-05-03 に記録する
    - 各 question に理解度主軸で ◎ / ○ / △ / × を付ける
    - difficulty / estimated_time / actual_time / time_delta を可能な範囲で記録する
    - next_resume_question_id を daily review 後に更新する
    - Q4の×回収状況を daily history に記録する
  notes:
    - 回収だけで終わらせず、Q7以降の前進を主軸にする
    - GW全体計画上は遅れているため、前進優先
    - ただし × は短時間で必ず確認する
    - 健康保険法 Q5 / Q6 は存在しない
    - 健康保険法 Q8 は演習対象なし
    - Q4-10 の次は Q7
    - Q7 の次は Q9
    - 実績は operations に書かず daily history に書く

- task: 秒トレ40問
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/history/daily/2026-05-02.md
  rolling_day: Day0
  due_date: 2026-05-03
  due_type: date
  study_type: 秒トレ
  material: iPhoneアプリ
  operation_mode: normal
  plan_anchor: daily_fixed_habit
  current_position: 2026-05-02 秒トレ40問完了
  expected_position: 2026-05-03 秒トレ40問
  gap_status: on_track
  must_line:
    - 秒トレ40問
  standard_line:
    - 秒トレ40問
  stretch_line:
    - 秒トレ40問 + 間違い確認
  recovery_targets: {}
  defer_targets: []
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
  completed_condition:
    - 40問実施または未実施理由を daily history に記録する

## Day1（2026-05-04）

- task: 健康保険法 L3 未完了分を完了へ
  source_ref:
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  rolling_day: Day1
  due_date: 2026-05-04
  due_type: date
  subject: 健康保険法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 2026-05-03 daily review で更新
  expected_position: 健康保険法 L3 完了 → 国民年金法 選択問題へ着手
  gap_status: delayed_but_recovering
  next_resume_question_id: 2026-05-03 daily review で更新
  must_line:
    - 秒トレ40問
    - 健康保険法 L3 未完了分を進める
  standard_line:
    - 秒トレ40問
    - 健康保険法 L3 完了
    - 国民年金法 L3 選択問題へ着手
  stretch_line:
    - 国民年金法 L3 選択問題を進める
  recovery_targets:
    source: 2026-05-03 daily review で更新
  defer_targets:
    - 国民年金法 L1/L2 新規前進
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 2026-05-03_actual_changes_position
    - must_line_becomes_impossible
  completed_condition:
    - 実施範囲を daily history に question_id ベースで記録する
    - next_resume_question_id を daily review 後に更新する

## Day2（2026-05-05）

- task: 国民年金法 L3 選択問題を進める
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  rolling_day: Day2
  due_date: 2026-05-05
  due_type: date
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 健康保険法 L3 完了後に着手
  expected_position: 国民年金法 L3 選択問題完了目標
  gap_status: delayed_but_recovering
  must_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題を進める
  standard_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題を大きく進める
  stretch_line:
    - 国民年金法 L3 選択問題完了に近づける
    - 健康保険法の×・△が残っていれば短時間回収
  recovery_targets:
    source: 健康保険法の残×・△があれば daily review で引き継ぐ
  defer_targets:
    - 国民年金法 択一は選択問題の進捗を見て判断
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 健康保険法_L3未完了
    - 国民年金法_選択問題に着手不能
  completed_condition:
    - 国民年金法 L3 選択問題の実施範囲を question_id ベースで daily history に記録する

## Day3（2026-05-06）

- task: 国民年金法 L3 選択問題完了 + 択一入口
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  rolling_day: Day3
  due_date: 2026-05-06
  due_type: date
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 2026-05-05 daily review で更新
  expected_position: 国民年金法 L3 択一 Q1章〜Q2章へ着手
  gap_status: delayed_but_recovering
  must_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題を進める
  standard_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題完了
  stretch_line:
    - 国民年金法 L3 択一 Q1章〜Q2章へ着手
  recovery_targets:
    source: 直近日次レビューで更新
  defer_targets:
    - 平日L1/L2復帰はGW後に判断
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 国民年金法_選択問題完了
    - must_line_becomes_impossible
  completed_condition:
    - 実施範囲を question_id ベースで daily history に記録する

## Day4（2026-05-07）

- task: 国民年金法 L1/L2 復帰または L3 遅れ回収
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/history/daily/2026-05-02.md
  rolling_day: Day4
  due_date: 2026-05-07
  due_type: date
  subject: 国民年金法 / 健康保険法
  study_type: L1/L2/L3
  material: 動画講義 / 基礎講座テキスト / 過去問講座テキスト
  operation_mode: confirmation_required
  plan_anchor: 2026-05-07〜2026-05-17 国民年金法L1/L2完了方向 + L3継続
  current_position: 2026-05-06 daily review で確定
  expected_position: 平日L1/L2へ戻る。ただしL3遅れが残る場合は回収優先
  gap_status: needs_confirmation
  must_line:
    - 秒トレ40問
    - 直近日次レビューで指定された最優先タスク
  standard_line:
    - 秒トレ40問
    - 国民年金法 L1/L2 復帰または L3遅れ回収
  stretch_line:
    - 国民年金法 L1/L2を大きく進める
  recovery_targets:
    source: 2026-05-06 daily reviewで更新
  defer_targets: []
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 2026-05-06_actual_changes_position
    - L3_delay_remains_after_GW
  completed_condition:
    - daily history に実施範囲を記録する

## Day5（2026-05-08）

- task: 国民年金法 L1/L2 または L3残回収
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  rolling_day: Day5
  due_date: 2026-05-08
  due_type: date
  subject: 国民年金法
  study_type: L1/L2/L3
  material: 動画講義 / 基礎講座テキスト / 過去問講座テキスト
  operation_mode: confirmation_required
  plan_anchor: 2026-05-07〜2026-05-17 国民年金法L1/L2完了方向 + L3継続
  current_position: 2026-05-07 daily review で確定
  expected_position: 国民年金法L1/L2を進める
  gap_status: needs_confirmation
  must_line:
    - 秒トレ40問
    - 直近日次レビューで指定された最優先タスク
  standard_line:
    - 秒トレ40問
    - 国民年金法 L1/L2 を進める
  stretch_line:
    - 国民年金法 L1/L2 を大きく進める
  recovery_targets:
    source: 直近日次レビューで更新
  defer_targets: []
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 2026-05-07_actual_changes_position
  completed_condition:
    - daily history に実施範囲を記録する

## Day6（2026-05-09）

- task: 国民年金法 L3 択一または遅れ回収
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  rolling_day: Day6
  due_date: 2026-05-09
  due_type: date
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: confirmation_required
  plan_anchor: 2026-05-07〜2026-05-17 国民年金法L3継続
  current_position: 2026-05-08 daily review で確定
  expected_position: 国民年金法 L3 択一を進める
  gap_status: needs_confirmation
  must_line:
    - 秒トレ40問
    - 直近日次レビューで指定された最優先L3タスク
  standard_line:
    - 秒トレ40問
    - 国民年金法 L3 択一を進める
  stretch_line:
    - 国民年金法 L3 択一を大きく進める
  recovery_targets:
    source: 直近日次レビューで更新
  defer_targets: []
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 2026-05-08_actual_changes_position
  completed_condition:
    - daily history に question_id ベースで実施範囲を記録する

---

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
- 健康保険法 Q5 / Q6 は存在しない。
- 健康保険法 Q8 は演習対象なし。
- 健康保険法 Q4-10 の次は Q7。
- 健康保険法 Q7 の次は Q9。
- Todoist is projection only.

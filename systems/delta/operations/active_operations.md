# delta active_operations

## Metadata

version: delta_v0.6_operations_shape
updated_at: 2026-05-04
branch: feature/atlas-pre-delta-foundation
last_daily_review: systems/delta/history/daily/2026-05-03.md

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source: systems/delta/history/daily/2026-05-03.md
  monthly_summary_role: summary_view
  legacy_monthly_role: migration_fallback_only
  todoist_role: projection_only

## Current plan gap

plan_gap:
  fixed_at: 2026-05-04
  source_review: systems/delta/history/daily/2026-05-03.md
  plan_anchor:
    source_ref: systems/delta/plan/2026_sharoushi_exam_plan.md
    period: 2026-04-29〜2026-05-06 GW L3集中期間
    expected_by_2026-05-04:
      study_type: L3
      subject: 国民年金法
      expected_position: 国民年金法 選択問題を進める
  current_position:
    source_ref: systems/delta/history/daily/2026-05-03.md
    as_of: 2026-05-03
    daily_execution_status: completed
    plan_alignment_status: delayed
    judgment: delayed_but_recovering
    L1:
      subject: 国民年金法
      actual_scope: P181〜P212 完了
      page_range: P181〜P212
      next_start_page: P213
    L3:
      subject: 健康保険法
      actual_scope: Q7-1〜Q7-2、Q9-1〜Q9-5、Q10-1、Q11-1
      question_range: Q7-1〜Q7-2、Q9-1〜Q9-5、Q10-1、Q11-1
      next_resume_question_id: Q11-2
      notes:
        - 健康保険法 Q5 / Q6 は存在しない
        - 健康保険法 Q8 は演習対象なし
        - 健康保険法L3はQ11-2以降が未完了
    秒トレ:
      actual_scope: 42問完了
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  recovery_required: true
  reason:
    - 2026-05-03 は健康保険法L3をQ11-1まで前進し、秒トレ42問も完了
    - L1国民年金法はP212まで完了、次はP213
    - 1巡目完了優先へ切り替えたため、Q4等の×・△回収は1巡後へ defer
    - ただしGW最低ラインの健康保険法L3完了は未達で、国民年金法L3選択問題にも未着手
    - 2026-05-04 は健康保険法L3 Q11-2以降を完了し、国民年金法L3選択問題へ接続する

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-04
  source_review: systems/delta/history/daily/2026-05-03.md
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 健康保険法 L3 Q11-1完了、次 Q11-2。秒トレ42問完了。L1国民年金法P212まで完了、次P213
  expected_position: 2026-05-04時点で国民年金法L3選択問題を進める
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  must_line:
    - 秒トレ40問
    - 健康保険法 L3 Q11-2以降を進める
    - 健康保険法L3の未完了を可能な限り減らす
  standard_line:
    - 秒トレ40問
    - 健康保険法 L3 Q11-lastまで完了
    - 国民年金法 L3 選択問題へ着手
  stretch_line:
    - 国民年金法 L3 選択問題を大きく進める
    - 健康保険法の×・△は1巡後回収リストとして維持し、当日は原則戻らない
  next_resume_question_id: Q11-2
  recovery_targets:
    deferred_until_first_pass_complete:
      reason: 1巡完了を優先するため、健康保険法の×・△回収は健康保険法L3 1巡後に回す
      priority_1_cross:
        - Q4-2
        - Q4-5
        - Q4-6
        - Q9-3
        - Q10-1
      priority_2_triangle:
        - Q4-3
        - Q4-4
        - Q4-7
        - Q4-8
        - Q4-9
        - Q9-1
        - Q11-1
      priority_3_circle:
        - Q3-4
        - Q4-10
        - Q7-1
        - Q7-2
        - Q9-4
      skip_possible:
        - Q4-1
        - Q9-2
        - Q9-5
  defer:
    - 健康保険法の×・△回収は健康保険法L3 1巡完了後へ defer
    - 国民年金法 L1/L2 の追加前進は、GW L3集中後に判断する
    - monthly summary rebuild は summary task に defer
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - health_insurance_L3_first_pass_completed
    - 国民年金法_選択問題に着手不能
    - must_line_becomes_impossible
    - plan_changes
  next_review_checkpoint:
    - 2026-05-04 end-of-day daily review
    - 健康保険法 L3 Q11完了状況
    - 国民年金法 L3 選択問題着手/進捗状況
    - 秒トレ40問完了状況

---

## Day0（2026-05-04）

- task: 健康保険法 L3 Q11-2以降を完了方向へ
  source_ref:
    - systems/delta/history/daily/2026-05-03.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-05-04
  due_type: date
  subject: 健康保険法
  topic: L3 択一 Q11-2以降、1巡完了優先
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  expected_position: 健康保険法 L3 完了 → 国民年金法 選択問題へ着手
  current_position: 健康保険法 L3 Q11-1完了
  gap_status: delayed_but_recovering
  start_question_id: Q11-2
  must_end_question_id: Q11-2-or-later
  standard_end_question_id: Q11-last
  stretch_end_question_id: 国民年金法_L3_選択問題_着手
  next_resume_question_id: Q11-2
  must_line:
    - 秒トレ40問
    - 健康保険法 L3 Q11-2以降を進める
    - 健康保険法L3の未完了を可能な限り減らす
  standard_line:
    - 秒トレ40問
    - 健康保険法 L3 Q11-lastまで完了
    - 国民年金法 L3 選択問題へ着手
  stretch_line:
    - 国民年金法 L3 選択問題を大きく進める
    - 健康保険法の×・△は1巡後回収リストとして維持する
  recovery_targets:
    deferred_until_first_pass_complete:
      priority_1_cross:
        - Q4-2
        - Q4-5
        - Q4-6
        - Q9-3
        - Q10-1
      priority_2_triangle:
        - Q4-3
        - Q4-4
        - Q4-7
        - Q4-8
        - Q4-9
        - Q9-1
        - Q11-1
      priority_3_circle:
        - Q3-4
        - Q4-10
        - Q7-1
        - Q7-2
        - Q9-4
      skip_possible:
        - Q4-1
        - Q9-2
        - Q9-5
  defer_targets:
    - 健康保険法の×・△回収
    - 国民年金法 L1/L2 新規前進
    - monthly summary rebuild
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - health_insurance_L3_first_pass_completed
    - must_line_becomes_impossible
    - plan_changes
  completed_condition:
    - 実施した question_id を daily history 2026-05-04 に記録する
    - 各 question に理解度主軸で ◎ / ○ / △ / × を付ける
    - difficulty / estimated_time / actual_time / time_delta を可能な範囲で記録する
    - 健康保険法L3が完了した場合、国民年金法L3選択問題への着手有無を記録する
    - next_resume_question_id を daily review 後に更新する
  notes:
    - Q4等の回収より健康保険法 L3 1巡完了を優先する
    - 健康保険法 Q5 / Q6 は存在しない
    - 健康保険法 Q8 は演習対象なし
    - 実績は operations に書かず daily history に書く

- task: 秒トレ40問
  rolling_day: Day0
  due_date: 2026-05-04
  due_type: date
  study_type: 秒トレ
  material: iPhoneアプリ
  operation_mode: normal
  plan_anchor: daily_fixed_habit
  current_position: 2026-05-03 秒トレ42問完了
  expected_position: 2026-05-04 秒トレ40問
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

## Day1（2026-05-05）

- task: 国民年金法 L3 選択問題を進める
  rolling_day: Day1
  due_date: 2026-05-05
  due_type: date
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 健康保険法L3完了後に着手
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
  recovery_targets:
    source: 健康保険法の残×・△は1巡後回収として daily review で引き継ぐ
  defer_targets:
    - 国民年金法 択一は選択問題の進捗を見て判断
    - 健康保険法の×・△回収
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 健康保険法_L3未完了
    - 国民年金法_選択問題に着手不能
  completed_condition:
    - 国民年金法 L3 選択問題の実施範囲を question_id ベースで daily history に記録する

## Day2（2026-05-06）

- task: 国民年金法 L3 選択問題完了 + 択一入口
  rolling_day: Day2
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
    - 健康保険法の×・△回収は1巡後回収リストへ保持
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 国民年金法_選択問題完了
    - must_line_becomes_impossible
  completed_condition:
    - 実施範囲を question_id ベースで daily history に記録する

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
- 1巡目では完璧主義にならず、全範囲を通す。
- 健康保険法の×・△回収は健康保険法L3 1巡完了後へ defer する。
- 健康保険法 Q5 / Q6 は存在しない。
- 健康保険法 Q8 は演習対象なし。
- 健康保険法 Q4-10 の次は Q7。
- 健康保険法 Q7 の次は Q9。
- Todoist is projection only.

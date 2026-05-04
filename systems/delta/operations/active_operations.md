# delta active_operations

## Metadata

version: delta_v0.6_operations_shape
updated_at: 2026-05-04
branch: feature/atlas-pre-delta-foundation
last_daily_review: systems/delta/history/daily/2026-05-04.md

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source: systems/delta/history/daily/2026-05-04.md
  monthly_summary_role: summary_view
  legacy_monthly_role: migration_fallback_only
  todoist_role: projection_only

## Current plan gap

plan_gap:
  fixed_at: 2026-05-04
  source_review: systems/delta/history/daily/2026-05-04.md
  plan_anchor:
    source_ref: systems/delta/plan/2026_sharoushi_exam_plan.md
    period: 2026-04-29〜2026-05-06 GW L3集中期間
    expected_by_2026-05-05:
      study_type: L3
      subject: 国民年金法
      expected_position: 国民年金法 選択問題を完了目標
    expected_by_2026-05-06:
      study_type: L3
      subject: 国民年金法
      expected_position: 国民年金法 択一 Q1章〜Q2章へ着手
  current_position:
    source_ref: systems/delta/history/daily/2026-05-04.md
    as_of: 2026-05-04
    daily_execution_status: completed
    plan_alignment_status: delayed_but_recovering
    judgment: delayed_but_recovering
    study_time_excluding_sekotore: 5時間13分
    L1:
      subject: 国民年金法
      actual_scope: P212まで完了
      next_start_page: P213
    L2:
      subject: 国民年金法
      actual_scope: P158以降が未完了
      next_start_page: P158
    L3:
      completed_subject: 健康保険法
      completed_scope: 選択式完了済み、択一Q11-21まで完了
      next_subject: 国民年金法
      next_scope: L3 選択問題
      next_resume_question_id: Q15-1
      notes:
        - 健康保険法L3新規演習は完了扱い
        - 健康保険法の×・△は1巡後回収リストとして保持し、当面は戻らない
        - 国民年金法L3選択式はPDF上 Q15-1 から開始
    秒トレ:
      actual_scope: 40問完了
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  recovery_required: true
  reason:
    - 2026-05-04 は健康保険法L3 Q11-2〜Q11-21を完了し、健康保険法L3新規演習を完了扱いにした
    - 秒トレ40問、勉強時間5時間13分を完了
    - GW最低ラインの健康保険法L3完了は達成
    - ただし2026-05-04時点の期待位置である国民年金法L3選択問題の実問題演習には未着手のため、GW標準ラインには遅れが残る
    - 2026-05-05 は国民年金法L3選択問題 Q15-1 から前進し、標準ラインでQ15完了まで圧縮する

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-04
  source_review: systems/delta/history/daily/2026-05-04.md
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 健康保険法L3新規演習完了。次は国民年金法L3選択問題 Q15-1。秒トレ40問完了。L1国民年金法P212まで、L2国民年金法P158以降未完了
  expected_position: 2026-05-05時点で国民年金法L3選択問題を完了目標。2026-05-06時点で国民年金法L3択一Q1章〜Q2章へ着手
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  must_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題 Q15-1から着手
    - 国民年金法 L3 選択問題 Q15-1〜Q15-7まで進める
  standard_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題 Q15-1〜Q15-13完了
    - 各問について空欄正答数、正誤、理解度評価、実測時間を daily history に記録する
  stretch_line:
    - 国民年金法 L3 択一 Q1-1へ着手
    - 可能なら国民年金法 L3 択一 Q1章を進める
  next_resume_question_id: Q15-1
  recovery_targets:
    health_insurance_deferred_until_after_first_pass:
      reason: 国民年金法L3への接続を優先するため、健康保険法の×・△回収は後日まとめて行う
      priority_1_cross:
        - Q1-2
        - Q2-2
        - Q2-6
        - Q2-7
        - Q3-2
        - Q4-2
        - Q4-5
        - Q4-6
        - Q9-3
        - Q10-1
        - Q11-13
      priority_2_triangle:
        - Q1-3
        - Q2-1
        - Q2-5
        - Q3-1
        - Q3-3
        - Q4-3
        - Q4-4
        - Q4-7
        - Q4-8
        - Q4-9
        - Q9-1
        - Q11-1
        - Q11-4
        - Q11-7
        - Q11-8
        - Q11-9
        - Q11-10
        - Q11-17
        - Q11-18
        - Q11-20
        - Q11-21
      priority_3_circle:
        - Q1-1
        - Q2-3
        - Q2-4
        - Q3-4
        - Q4-10
        - Q7-1
        - Q7-2
        - Q9-4
        - Q11-2
        - Q11-3
        - Q11-5
        - Q11-11
        - Q11-14
        - Q11-15
        - Q11-19
      skip_possible:
        - Q4-1
        - Q9-2
        - Q9-5
        - Q11-6
        - Q11-12
        - Q11-16
  defer:
    - 健康保険法の×・△回収は国民年金法L3の前進後に回す
    - 国民年金法 L1/L2 の本格再開は2026-05-07以降に判断する
    - monthly summary rebuild は summary task に defer
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - 国民年金法_選択問題_Q15範囲がPDF確認と異なる
    - 国民年金法_選択問題に着手不能
    - Q15-7到達が困難
    - Q15-13完了が困難
    - plan_changes
  next_review_checkpoint:
    - 2026-05-05 end-of-day daily review
    - 国民年金法 L3 選択問題 Q15進捗
    - 秒トレ40問完了状況
    - 2026-05-06に択一へ入れるか

## Plan calibration note

calibration_issue:
  detected_at: 2026-05-04
  issue: 初回ローリングで、2026-05-05のstandard_lineをQ15-7に置いたため、planの「国民年金法 選択問題を完了目標」と弱く整合していた
  cause:
    - must_lineをゼロ回避ラインとして設定した後、standard_lineをplan達成ラインまで引き上げなかった
    - Day0単体の実行可能性を優先しすぎ、GW全体の標準ライン「国民年金法選択問題完了、国民年金法択一Q2章まで」から逆算する圧力が不足した
    - delayed_but_recovering状態なのに、standard_lineを回復用ラインではなく安全側ラインとして置いた
  countermeasure:
    - delayed_but_recovering / recovery_forward の日は、standard_lineを原則としてplan_anchorの当日期待位置に一致させる
    - must_lineはゼロ回避ではなくplan_minimum_lineとして置き、survival_lineが必要な場合は別扱いにする
    - stretch_lineは翌日以降のplan接続、または遅れ回復を明示する
    - operations更新前に、plan_anchorのexpected_positionとstandard_lineが一致しているか確認する
  status: corrected_in_this_operations

---

## Day0（2026-05-05）

- task: 国民年金法 L3 選択問題 Q15-1から進める
  source_ref:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/operations/active_operations.md
    - 07社会保険労務士2026_過去問_国民年金法.pdf
  rolling_day: Day0
  due_date: 2026-05-05
  due_type: date
  subject: 国民年金法
  topic: L3 選択問題
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  expected_position: 国民年金法 L3 選択問題を完了目標
  current_position: 健康保険法L3新規演習完了、国民年金法L3選択問題はQ15-1から未着手
  gap_status: delayed_but_recovering
  start_question_id: Q15-1
  must_end_question_id: Q15-7
  standard_end_question_id: Q15-13
  stretch_end_question_id: Q1章進行
  next_resume_question_id: Q15-1
  must_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題 Q15-1から着手
    - Q15-7まで進める
  standard_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題 Q15-1〜Q15-13完了
    - 各問の空欄正答数、理解度評価、実測時間を daily history に記録する
  stretch_line:
    - 国民年金法 L3 択一 Q1-1へ着手
    - 可能なら国民年金法 L3 択一 Q1章を進める
  recovery_targets:
    health_insurance_deferred_until_after_first_pass_complete:
      priority_1_cross:
        - Q1-2
        - Q2-2
        - Q2-6
        - Q2-7
        - Q3-2
        - Q4-2
        - Q4-5
        - Q4-6
        - Q9-3
        - Q10-1
        - Q11-13
      priority_2_triangle:
        - Q1-3
        - Q2-1
        - Q2-5
        - Q3-1
        - Q3-3
        - Q4-3
        - Q4-4
        - Q4-7
        - Q4-8
        - Q4-9
        - Q9-1
        - Q11-1
        - Q11-4
        - Q11-7
        - Q11-8
        - Q11-9
        - Q11-10
        - Q11-17
        - Q11-18
        - Q11-20
        - Q11-21
  defer_targets:
    - 健康保険法の×・△回収
    - 国民年金法 L1/L2 新規前進
    - monthly summary rebuild
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - 国民年金法_選択問題_Q15範囲がPDF確認と異なる
    - 国民年金法_選択問題に着手不能
    - Q15-7到達が困難
    - Q15-13完了が困難
    - plan_changes
  completed_condition:
    - 実施した question_id を daily history 2026-05-05 に記録する
    - 選択式は空欄正答数、正誤、理解度評価、実測時間を記録する
    - difficulty / estimated_time / actual_time / time_delta を可能な範囲で記録する
    - next_resume_question_id を daily review 後に更新する
  notes:
    - 健康保険法には戻らず、国民年金法L3選択問題へ進む
    - 国民年金法PDF上、選択式問題はQ15-1から開始する
    - Q15-7は最低ラインであり、plan適合の標準はQ15-13完了
    - 実績は operations に書かず daily history に書く

- task: 秒トレ40問
  rolling_day: Day0
  due_date: 2026-05-05
  due_type: date
  study_type: 秒トレ
  material: iPhoneアプリ
  operation_mode: normal
  plan_anchor: daily_fixed_habit
  current_position: 2026-05-04 秒トレ40問完了
  expected_position: 2026-05-05 秒トレ40問
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

## Day1（2026-05-06）

- task: 国民年金法 L3 選択問題完了 + 択一入口
  rolling_day: Day1
  due_date: 2026-05-06
  due_type: date
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-04-29〜2026-05-06 GW L3集中期間
  current_position: 2026-05-05 daily review で Q15進捗を更新
  expected_position: 国民年金法 L3 択一 Q1章〜Q2章へ着手
  gap_status: delayed_but_recovering
  start_question_id: next_resume_question_id_from_2026-05-05_daily_review
  must_end_question_id: Q15-13
  standard_end_question_id: Q1-1
  stretch_end_question_id: Q2-last
  next_resume_question_id: next_resume_question_id_from_2026-05-05_daily_review
  must_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題の残りを進める
  standard_line:
    - 秒トレ40問
    - 国民年金法 L3 選択問題 Q15-13まで完了
    - 国民年金法 L3 択一 Q1-1へ着手
  stretch_line:
    - 国民年金法 L3 択一 Q1章を進める
    - 可能ならQ2章へ接続する
  recovery_targets:
    source: 2026-05-05 daily reviewで国民年金法Q15の×・△を追加し、健康保険法の回収リストは保持する
  defer_targets:
    - 健康保険法の×・△回収
    - 平日L1/L2復帰は2026-05-07以降に判断
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 国民年金法_選択問題完了
    - Q15-13まで到達不能
    - must_line_becomes_impossible
  completed_condition:
    - 実施範囲を question_id ベースで daily history に記録する
    - Q15完了時は次の再開地点をQ1-1または実際の択一到達点で記録する

## Day2（2026-05-07）

- task: 国民年金法 L1/L2 平日復帰
  rolling_day: Day2
  due_date: 2026-05-07
  due_type: date
  subject: 国民年金法
  study_type: L1_L2
  material: 基礎講座テキスト / 動画講義
  operation_mode: recovery_forward
  plan_anchor: 2026-05-07〜2026-05-17 国民年金法L1/L2完了方向
  current_position: L1 P212まで完了、L2 P158以降未完了
  expected_position: 平日L1/L2で国民年金法を完了方向へ進める
  gap_status: delayed_but_recovering
  start_page: P158
  must_end_page: P165
  standard_end_page: P180
  stretch_end_page: P212
  next_resume_question_id: not_applicable_L1_L2
  must_line:
    - 秒トレ40問
    - 国民年金法 L2 P158〜P165を進める
  standard_line:
    - 秒トレ40問
    - 国民年金法 L2 P158〜P180まで回収
  stretch_line:
    - 国民年金法 L2をL1現在地P212へ近づける
    - 余力があればL1 P213以降へ進む
  recovery_targets:
    L2_gap:
      subject: 国民年金法
      current_L1_position: P212
      current_L2_position: P158以降未完了
      target: L2をL1へ追いつかせる
  defer_targets:
    - L3は2026-05-09以降に国民年金法択一を継続
    - 健康保険法の×・△回収は後日ブロック化
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - 国民年金法_L3選択問題が未完了
    - L2_P158開始が実際と異なる
    - plan_changes
  completed_condition:
    - L1/L2は page_range と next_start_page を daily history に記録する
    - 秒トレ実績を記録する

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
- delayed_but_recovering / recovery_forward の standard_line は、原則として plan_anchor の当日 expected_position と一致させる。
- must_line は plan_minimum_line として置き、ゼロ回避だけの survival_line と混同しない。
- 健康保険法の×・△回収は国民年金法L3の前進後へ defer する。
- 健康保険法 Q5 / Q6 は存在しない。
- 健康保険法 Q8 は演習対象なし。
- 健康保険法 Q4-10 の次は Q7。
- 健康保険法 Q7 の次は Q9。
- Todoist is projection only.

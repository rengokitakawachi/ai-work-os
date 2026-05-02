# 2026-05-02 DELTA daily review active_operations auto update

## Purpose

DELTA daily review must not stop at daily history creation. After daily history is confirmed, DELTA must update `systems/delta/operations/active_operations.md` so next-day execution reads saved operations instead of recomputing on demand.

This is a required v0.6 capability.

---

## Problem

2026-05-02 daily history was confirmed, but active_operations was not automatically updated. When the user later asked for tomorrow's operations, DELTA estimated them at that moment.

This breaks DELTA's intended role:

- daily history is actual record
- active_operations is next-action SSOT
- recommended_lines should be saved after review
- daytime questions should recall saved lines, not recompute them

---

## Required daily review flow

When the user sends an end-of-day report or DELTA determines the daily report is confirmed:

1. update / confirm daily history
2. confirm study time, L1/L2/L3, 秒トレ
3. confirm judgment
4. confirm next_action candidates
5. run operations update phase
6. update active_operations
7. report both history sha and operations sha

---

## Triggers

Run operations update phase when any of these indicates day closure:

- user says 今日終わり / 今日は終わり / 日報確定 / 終了
- study time is recorded
- 秒トレ completion is recorded
- daily history judgment is fixed
- daily history next_action is fixed
- DELTA states daily history is confirmed

---

## Required read set

Operations update phase must read:

- `roadmap/delta_roadmap.md`
- `plan/2026_sharoushi_exam_plan.md`
- `operations/active_operations.md`
- `history/daily/YYYY-MM-DD.md`
- recent daily histories as needed
- monthly summary only as summary / fallback
- legacy monthly only as migration fallback

From May 2026 onward, daily history is actual primary source.

---

## Output fields saved to active_operations

Save at minimum:

- next day main objective
- plan_anchor
- current_position
- expected_position
- gap_status
- operation_mode
- must_line
- standard_line
- stretch_line
- recovery_targets
- defer
- recompute_triggers
- next_review_checkpoint

Do not store actual performance records in operations.

---

## Responsibility split

History:

- actual log
- judgment
- weak points
- next_action candidates

Operations:

- future execution plan
- must / standard / stretch
- recovery targets
- recompute triggers
- execution order

Review:

- weekly/monthly judgment
- plan revision decision

---

## 2026-05-02 expected active_operations update

### Day3 / 2026-05-03

- task: 健康保険法 L3 Q7以降 + Q4×回収
- due_date: 2026-05-03
- subject: 健康保険法
- study_type: L3
- material: 過去問講座テキスト
- operation_mode: recovery_forward
- plan_anchor: GW L3集中期間
- current_position: 健康保険法 L3 Q4-10 完了
- next_position: 健康保険法 L3 Q7
- expected_position: 本来は健康保険法 Q9〜Q11付近
- gap_status: delayed_but_recovering

must_line:

- 秒トレ40問
- 健康保険法 L3 Q7-1〜Q7最後
- Q4の×を軽く確認: Q4-2, Q4-5, Q4-6

standard_line:

- 秒トレ40問
- 健康保険法 L3 Q7完了
- 健康保険法 L3 Q9-1以降へ着手
- Q4-2, Q4-5, Q4-6 を回収

stretch_line:

- 健康保険法 L3 Q9〜Q11最後まで進める
- Q4の△を確認: Q4-3, Q4-4, Q4-7, Q4-8, Q4-9

recovery_targets:

- priority_1_cross: Q4-2, Q4-5, Q4-6
- priority_2_triangle: Q4-3, Q4-4, Q4-7, Q4-8, Q4-9
- priority_3_circle: Q3-4, Q4-10
- skip_possible: Q4-1

notes:

- 健康保険法では Q5 / Q6 は存在しない
- Q4-10 の次は Q7
- 回収だけで終わらせず、Q7以降の前進を主軸にする
- GW全体計画上は遅れているため、前進優先
- × は短時間で必ず確認する

### Day4 / 2026-05-04

- task: 健康保険法 L3 未完了分を完了へ
- must_line: 秒トレ40問, 健康保険法 L3 未完了分を進める
- standard_line: 健康保険法 L3 完了, 国民年金法 L3 選択問題へ着手
- stretch_line: 国民年金法 L3 選択問題を進める

### Day5 / 2026-05-05

- task: 国民年金法 L3 選択問題を進める
- must_line: 秒トレ40問, 国民年金法 L3 選択問題を進める
- standard_line: 国民年金法 L3 選択問題を大きく進める
- stretch_line: 国民年金法 L3 選択問題完了に近づける, 健康保険法の×・△が残っていれば短時間回収

### Day6 / 2026-05-06

- task: 国民年金法 L3 選択問題完了 + 択一入口
- must_line: 秒トレ40問, 国民年金法 L3 選択問題を進める
- standard_line: 国民年金法 L3 選択問題完了
- stretch_line: 国民年金法 L3 択一 Q1章〜Q2章へ着手

---

## L3 rule connection

Operations update must use understanding-based review_mark as recovery SSOT:

- ×: priority_1_cross
- △: priority_2_triangle
- ○: priority_3_circle
- ◎: skip_possible

Time_delta remains supplemental.

---

## Implementation requirement

DELTA configured GPT must be able to update:

- `systems/delta/operations/active_operations.md`

Required runtime write resource:

- `resource=delta_operations`
- actions: `update`
- file path relative to `systems/delta/operations/`
- expected file: `active_operations.md`

The backend currently has `delta_history` write but not `delta_operations` write. Therefore v0.6 needs code + Action schema reflection before DELTA can perform the update itself.

Until runtime write is confirmed, ADAM may perform repo-side update but must label it as ADAM repo-side update, not DELTA runtime behavior.

---

## Completion condition

Complete when:

- this design note is saved and read back
- DELTA instruction includes daily review operations update rule
- DELTA schema includes DailyReviewOperationsUpdate model / fields
- backend supports `resource=delta_operations`, `action=update`
- Action schema exposes `deltaOperationsWrite`
- configured DELTA GPT runtime can update operations after daily history confirmation
- read-back confirms operations sha

Do not mark complete from schema/config update alone.

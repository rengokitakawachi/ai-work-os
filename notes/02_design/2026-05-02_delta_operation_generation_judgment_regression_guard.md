# 2026-05-02 DELTA operation generation / judgment regression guard

## Purpose

Prevent recurrence of DELTA generating daily operations that are locally reasonable but disconnected from the long/mid-term plan.

The 2026-05-01 and 2026-05-02 case showed that the user mostly followed DELTA's instructions, yet DELTA under-detected plan delay because daily operations lacked plan anchors and judgment treated local execution as on_track.

---

## Incident summary

Actuals:

- 2026-05-01
  - L1 国民年金法 P173まで
  - L3 健康保険法 Q3-1〜Q3-3
  - 秒トレ40問
  - study_time 1h31m
- 2026-05-02
  - L1 国民年金法 7章 遺族基礎年金 P166〜P180 完了
  - L3 健康保険法 Q3-4〜Q4-10
  - 秒トレ40問
  - study_time 3h49m

Plan expected during GW:

- 2026-05-01: 健康保険法 択一 Q4残り〜Q7最後
- 2026-05-02: 健康保険法 択一 Q9-1〜Q11最後
- 2026-05-03: 健康保険法 ×・△回収 → 国民年金法 選択問題へ着手

Problem:

- The user's execution was meaningful and mostly followed DELTA guidance.
- But plan alignment was delayed.
- DELTA judged too locally and allowed vague operations such as `Q3以降を進める`.

---

## Root causes

1. Daily operations did not carry explicit plan_anchor / expected_position.
2. `on_track` judgment mixed daily execution success with plan alignment.
3. active_operations was not updated immediately after daily history confirmation.
4. recommended_lines were recomputed on demand instead of saved after daily review.
5. L3 progress targets used vague ranges instead of real question IDs.
6. 健康保険法 exceptions were not enforced in operations generation.

---

## Required guardrails

### 1. Plan anchor required for daily operations

Each daily operation must include:

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

If these are missing, the operation is incomplete.

### 2. Two-layer judgment

Daily history judgment must separate:

- daily_execution_status
- plan_alignment_status
- final judgment

Example:

```yaml
daily_execution_status: completed
plan_alignment_status: delayed
judgment: delayed_but_recovering
```

User effort can be completed while plan alignment remains delayed.

### 3. on_track strict condition

Use `on_track` only when all are true:

- daily task completed
- current_position is not materially behind plan_anchor expected_position
- no additional recovery is required for tomorrow or later

Do not use `on_track` merely because the user studied or completed DELTA's local instruction.

Allowed delayed-but-acceptable values:

- delayed_but_managed
- delayed_but_recovering
- recovery_on_track

### 4. Daily review must update operations

After daily history is confirmed, run operations update phase:

1. update daily history
2. read plan / active_operations / daily history
3. compare plan_anchor and current_position
4. decide gap_status
5. update active_operations for tomorrow onward
6. report operations sha

### 5. recommended_lines are saved

Daily review writes must / standard / stretch to active_operations.

During the day, questions about recommended line must read saved operations and not recompute unless the user explicitly asks to rebuild.

### 6. L3 operations must use real question IDs

Avoid or warn on vague L3 targets:

- Q3以降
- Q4の途中
- できるところまで
- chapter-only targets

Use:

- start_question_id
- must_end_question_id
- standard_end_question_id
- stretch_end_question_id
- next_resume_question_id

### 7. 健康保険法 exceptions

Operations generation must respect:

- Q5 / Q6 do not exist
- Q8 has no exercise target
- Q4-10 next is Q7
- Q7 next is Q9

Do not propose Q5, Q6, or Q8 exercise tasks.

---

## Correct 2026-05-03 operation shape

```yaml
- task: 健康保険法 L3 Q7以降 + Q4×回収
  due_date: 2026-05-03
  subject: 健康保険法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: GW L3集中期間
  expected_position: 本来は健康保険法 Q9〜Q11付近
  current_position: 健康保険法 Q4-10完了
  next_position: 健康保険法 Q7
  gap_status: delayed_but_recovering
  start_question_id: Q7-1
  must_end_question_id: Q7-last
  standard_end_question_id: Q9-1-or-later
  stretch_end_question_id: Q11-last
  next_resume_question_id: determined_by_daily_history
  must_line:
    - 秒トレ40問
    - 健康保険法 L3 Q7-1〜Q7最後
    - Q4の×を軽く確認: Q4-2, Q4-5, Q4-6
  standard_line:
    - 秒トレ40問
    - 健康保険法 L3 Q7完了
    - 健康保険法 L3 Q9-1以降へ着手
    - Q4-2, Q4-5, Q4-6を回収
  stretch_line:
    - 健康保険法 L3 Q9〜Q11最後まで進める
    - Q4の△を確認: Q4-3, Q4-4, Q4-7, Q4-8, Q4-9
  recovery_targets:
    priority_1_cross: [Q4-2, Q4-5, Q4-6]
    priority_2_triangle: [Q4-3, Q4-4, Q4-7, Q4-8, Q4-9]
    priority_3_circle: [Q3-4, Q4-10]
    skip_possible: [Q4-1]
  notes:
    - 回収だけで終わらせず、Q7以降の前進を主軸にする
    - GW全体計画上は遅れているため、前進優先
    - 健康保険法では Q5 / Q6 は存在しない
    - 健康保険法 Q8 は演習対象なし
    - Q4-10 の次は Q7
```

---

## Acceptance criteria

1. After daily history update, active_operations is updated.
2. Response reports:
   - daily history updated
   - active_operations updated
   - updated operations sha
   - tomorrow must / standard / stretch
   - next_resume_question_id
   - recovery_targets
3. Plan delay is explicit even when daily execution is completed.
4. `on_track` is not used when plan_anchor alignment is delayed.
5. Recommended lines are stable and read from operations during the day.
6. L3 resume/targets use real question IDs.
7. Health insurance Q5/Q6/Q8 are not proposed.

---

## Placement decision

Reflect this in:

- DELTA instruction: concise runtime guardrails
- DELTA schema: structured fields and allowed values
- active_operations update task completed_condition
- DELTA runtime fixtures

This is an instruction-level guardrail, not just a note.

---

## Completion condition

Complete when:

- design note saved and read back
- instruction updated and kept under GPT configuration limit
- schema updated with two-layer judgment and L3 operation target fields
- active_operations reflects this as a required condition for v0.6 operations shape update
- runtime fixture verifies delayed-but-completed case

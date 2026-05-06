# 2026-05-02 DELTA L3 difficulty / estimated time recording rule

## Purpose

L3 過去問講座テキスト演習の各問題記録に、テキスト記載の難易度・目安時間・実測時間との差分を標準項目として追加する。

This rule improves weak-point recovery and next-action generation by separating understanding issues, processing speed issues, and careless/early-jump issues.

---

## Background

Previously DELTA mainly recorded:

- question_id
- result
- review_mark
- actual_time

However, 過去問講座テキスト provides per-question difficulty and estimated time. Actual time alone is insufficient.

A question may be:

- correct but too slow
- fast but poorly understood
- incorrect and over estimated time
- stable when within estimated time and marked ◎

Therefore DELTA must compare actual_time to estimated_time.

---

## Confirmed example

2026-05-02 健康保険法 L3:

- Q3-4: P38 / difficulty C / estimated_time 3分20秒 / actual_time 2分39秒 / time_delta -41秒 / result correct / review_mark ○
- Q4-5: P50 / difficulty B / estimated_time 2分50秒 / actual_time 3分32秒 / time_delta +42秒 / result incorrect / review_mark ×

---

## Standard L3 per-question fields

Each L3 question record should include:

- question_id
- source_page
- difficulty
- estimated_time
- actual_time
- time_delta
- result
- review_mark
- next_review_target
- time_analysis
- estimate_source_status

Optional / contextual fields:

- material
- subject
- chapter
- source_ref
- confidence
- next_action

---

## Recording rules

1. L3 is managed by question_id.
2. Check textbook difficulty and estimated_time for each question.
3. Record actual_time when user provides it.
4. Calculate time_delta = actual_time - estimated_time.
5. Use signed format:
   - shorter than estimate: `-0:41` or `-41秒`
   - longer than estimate: `+0:42` or `+42秒`
6. Review priority SSOT remains understanding-based review_mark.
7. time_delta is supplemental.
8. If difficulty / estimated_time cannot be obtained, do not silently omit them. Record uncertainty and a next_action.

---

## PDF / material check rule

To obtain problem header metadata:

1. Search by question_id.
2. Search by answer number if question search fails.
3. If source_page is known, inspect that page directly.
4. Inspect nearby pages.
5. Check for next-question header confusion.
6. Check problem header, not only answer tail.

Do not infer difficulty or estimated_time without source.

---

## Unconfirmed metadata handling

If difficulty / estimated_time cannot be obtained, record:

- difficulty: 未確認
- estimated_time: 未確認
- time_delta: 未確認
- source_page: record if known
- estimate_source_status: reason
- next_action: header recheck task

Example:

```yaml
- question_id: Q4-5
  source_page: P50
  difficulty: 未確認
  estimated_time: 未確認
  time_delta: 未確認
  estimate_source_status: page_identified_header_not_extracted
  next_action: Q4-5 P50の問題ヘッダを再確認
```

---

## Expected record example

```yaml
- question_id: Q4-5
  source_page: P50
  difficulty: B
  estimated_time: 2分50秒
  actual_time: 3分32秒
  time_delta: +42秒
  result: incorrect
  review_mark: ×
  next_review_target: priority_1_cross
  estimate_source_status: confirmed_from_problem_header
  time_analysis: 目安超過かつ×のため、理解不足に加えて処理負荷も重い可能性
```

---

## Runtime behavior expectation

Input:

```text
4-5 不正解×3:32
```

Expected DELTA behavior:

- normalize to Q4-5
- check 過去問講座テキスト problem header
- record P50 / difficulty B / estimated_time 2分50秒
- record actual_time 3分32秒
- calculate time_delta +42秒
- record result incorrect
- record review_mark ×
- set next_review_target priority_1_cross

If header metadata cannot be confirmed, DELTA must record unconfirmed metadata and create a header recheck next_action.

---

## Placement decision

Reflect this rule in:

1. `systems/delta/config/delta_instruction.md`
   - concise L3 rule only, because configured GPT instruction has size limits.
2. `systems/delta/config/delta_schema.yaml`
   - full structured fields and allowed values.
3. `notes/02_design/2026-05-02_delta_v0_6_operations_shape_proposal.md`
   - operations / daily history shape should expect these fields for L3 records.
4. DELTA runtime fixtures
   - add case for Q3-4 and Q4-5 difficulty / estimated_time / time_delta handling.

Do not place this only in a note; it affects runtime behavior and must be reflected in instruction/schema.

---

## Completion condition

This rule is integrated when:

- design note is saved and read back
- DELTA instruction is updated without exceeding configured GPT size constraints
- DELTA schema includes the new fields
- operations shape proposal references the rule
- active_operations includes a task/gate for runtime fixture confirmation

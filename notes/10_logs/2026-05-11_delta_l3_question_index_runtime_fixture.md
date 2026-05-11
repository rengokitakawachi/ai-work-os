# DELTA L3 question index runtime fixture

status: fixture_request_pending
created_at: 2026-05-11
category: delta_operations_validator_l3_question_index
source_ref:
  - src/services/delta/l3-question-index.js
  - src/services/delta-operations.js
  - src/services/delta/operations-split.test.js
  - systems/delta/operations/next_operations.md
  - systems/delta/config/delta_operations_generation_schema.yaml

---

## Purpose

Confirm runtime-visible actual behavior for DELTA L3 question index guard.

Repo / runtime branch implementation exists, but this cannot be closed until actual runtime fixture confirms behavior through DELTA `delta_operations` update preflight.

Expected validator version:

```text
delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

---

## Current fixture baseline

Current `systems/delta/operations/next_operations.md` on `feature/atlas-pre-delta-foundation` has:

- next_start_date: 2026-05-18
- expected active range: 2026-05-11〜2026-05-17
- active_day6_due_date: 2026-05-17
- first row: 2026-05-18
- target date: 2026-06-30

Therefore fixture rows should not change metadata, header, first row, target date, or active connection.

Use the 2026-05-23 row as the replacement target because it is already an L3 day and does not affect active/next split connection.

Replace this row only:

```text
| 2026-05-23 | L3 | 国民年金法 択一 Q14-1〜Q14-17（17問） |
```

---

## Fixture cases

### 1. validator version confirmation

Expected:

```text
validator_version: delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

### 2. allow confirmed Q4 range

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q4-1〜Q4-4（4問） |
```

Expected:

```text
preflight.ok: true
errors: []
```

### 3. reject count mismatch

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q4-1〜Q4-4（3問） |
```

Expected reject error includes:

```text
L3_question_count_mismatch:国民年金法:Q4-1〜Q4-4:stated:3:actual:4
```

### 4. reject nonexistent Q3-4

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q3-4〜Q3-4（1問） |
```

Expected reject error includes:

```text
L3_question_range_not_in_index:国民年金法:Q3-4〜Q3-4
```

### 5. allow Q5-0 no-exercise chapter

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q5-0（演習対象なし） |
```

Expected:

```text
preflight.ok: true
errors: []
```

### 6. reject Q5-1 in no-exercise chapter

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q5-1〜Q5-1（1問） |
```

Expected reject error includes:

```text
L3_question_range_in_no_exercise_chapter:国民年金法:Q5-1〜Q5-1
```

### 7. reject nonexistent Q1-17〜Q1-32

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q1-17〜Q1-32（16問） |
```

Expected reject error includes:

```text
L3_question_range_not_in_index:国民年金法:Q1-17〜Q1-32
```

### 8. reject ambiguous 未通過16問

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一の未通過16問 |
```

Expected reject error includes:

```text
L3_ambiguous_question_target_forbidden:未通過
```

### 9. reject できるところまで

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 できるところまで |
```

Expected reject error includes:

```text
L3_ambiguous_question_target_forbidden:できるところまで
```

### 10. reject n問相当

Fixture row:

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q4-1〜Q4-4（4問相当） |
```

Expected reject error includes one or both:

```text
L3_ambiguous_question_target_forbidden:問相当
forbidden_next_vague_target:問相当
```

---

## Restoration requirement

Any allow case will update `next_operations.md` if executed through runtime update.

After fixture execution, restore operational `systems/delta/operations/next_operations.md` to its pre-fixture content.

After restoration, confirm:

```text
preflight.ok: true
errors: []
validator_version: delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

Read-back must confirm:

- next_start_date remains 2026-05-18
- header remains `# Next operations: 2026-05-18〜2026-06-30`
- 2026-05-23 row is restored to the operational row
- target date remains 2026-06-30

---

## Closure condition

Treat as `actual_behavior_confirmed` only if:

- validator version matches expected runtime version
- allow cases pass with `preflight.ok: true` and `errors: []`
- reject cases fail with expected L3 question index errors
- restoration succeeds and read-back confirms the operational file was restored

If any fixture fails, record exact returned `error.details.errors`, validator version, and whether restoration succeeded.

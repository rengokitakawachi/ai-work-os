# DELTA L3 question index runtime fixture

status: actual_behavior_confirmed
created_at: 2026-05-11
confirmed_at: 2026-05-11
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

Repo / runtime branch implementation existed before this check, but the task could not be closed until actual runtime fixture confirmed behavior through DELTA `delta_operations` update preflight.

---

## Confirmed validator version

```text
delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

---

## Fixture baseline

Fixture target:

- file: `systems/delta/operations/next_operations.md`
- branch: `feature/atlas-pre-delta-foundation`
- replacement target row: `2026-05-23`

Baseline constraints preserved:

- next_start_date: 2026-05-18
- expected active range: 2026-05-11〜2026-05-17
- active_day6_due_date: 2026-05-17
- first row: 2026-05-18
- target date: 2026-06-30

---

## Runtime fixture results

All fixture cases passed.

| No | fixture | result |
|---|---|---|
| 1 | validator version confirmation | OK |
| 2 | allow: Q4-1〜Q4-4（4問） | OK |
| 3 | reject: Q4-1〜Q4-4（3問） | OK |
| 4 | reject: Q3-4〜Q3-4 | OK |
| 5 | allow: Q5-0（演習対象なし） | OK |
| 6 | reject: Q5-1〜Q5-1 | OK |
| 7 | reject: Q1-17〜Q1-32 | OK |
| 8 | reject: 未通過16問 | OK |
| 9 | reject: できるところまで | OK |
| 10 | reject: 4問相当 | OK |

---

## Confirmed allow behavior

The following rows were accepted with:

```text
preflight.ok: true
errors: []
```

```text
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q4-1〜Q4-4（4問） |
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q5-0（演習対象なし） |
```

---

## Confirmed reject behavior

Observed reject errors included:

```text
L3_question_count_mismatch:国民年金法:Q4-1〜Q4-4:stated:3:actual:4
L3_question_range_not_in_index:国民年金法:Q3-4〜Q3-4
L3_question_range_in_no_exercise_chapter:国民年金法:Q5-1〜Q5-1
L3_question_range_not_in_index:国民年金法:Q1-17〜Q1-32
L3_ambiguous_question_target_forbidden:未通過
L3_ambiguous_question_target_forbidden:できるところまで
L3_ambiguous_question_target_forbidden:問相当
forbidden_next_vague_target:問相当
```

This confirms the guard rejects:

- stated question count mismatch
- nonexistent Q numbers
- exercise questions inside no-exercise chapters
- mechanically inferred / unconfirmed question ranges
- ambiguous operation wording such as `未通過`, `できるところまで`, and `問相当`

---

## Restoration confirmation

After fixture execution, DELTA restored `next_operations.md` to the operational version.

Restored file:

- file: `systems/delta/operations/next_operations.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `84f6abf2cdf9ba6aefab545d9a1f6da2c69554fd`

Restoration preflight:

```text
preflight.ok: true
errors: []
validator_version: delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

Read-back confirmed:

```text
target_date: 2026-06-30
next_start_date: 2026-05-18
# Next operations: 2026-05-18〜2026-06-30
| 2026-05-23 | L3 | 国民年金法 択一 Q14-1〜Q14-17（17問） |
```

---

## Closure judgment

actual behavior confirmed.

The DELTA L3 question index guard is closed for the confirmed 国民年金法 L3 択一 index behavior.

---

## Recurrence prevention

- L3 operations must be generated from confirmed question index, not plausible-looking ranges.
- Qx-0 is allowed only for no-exercise chapters.
- Count must match actual inclusive range count.
- Ambiguous operations wording must remain rejected.
- Runtime fixture and restoration are required before closure.

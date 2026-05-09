# DELTA special-day L3 unavailable guard

status: fixed_actual_behavior_confirmed
severity: medium
category: delta_operations_validator_special_day_rule
observed_at: 2026-05-09
reported_by: DELTA via user

---

## Symptom

DELTA operations validator treated an L3 unavailable day as if all study was unavailable.

The concrete case was 2026-06-13.

Correct rule:

- 2026-06-13 is a Saturday workday.
- L3 is unavailable because L3 is 過去問講座テキスト演習 and cannot be done on that day.
- L1 / L2 are available in commute context.
- 秒トレ is available.

The original risk was that a valid row such as below could be rejected:

```text
2026-06-13 | L2 | 社一 L2 P1〜P25（25ページ・通勤枠）
```

---

## Design judgment

Do not implement this as a 2026-06-13-only branch.

Correct model:

```yaml
special_day_rule:
  date: YYYY-MM-DD
  day_type: string
  l3_allowed: boolean
  l1_l2_allowed: boolean
  sekotore_allowed: boolean
  allowed_context: string | null
```

An `L3 unavailable` day is not an all-study unavailable day.

If `l3_allowed: false`, reject only actual L3 work on that date. L1 / L2 / 秒トレ may still be allowed when the date rule permits them.

---

## Fix applied

Updated runtime validator:

- file: `src/services/delta-operations.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `8dbc8d1df7f85a1f998ce898edefeb3031df0b21`

Promoted to runtime branch:

- file: `src/services/delta-operations.js`
- branch: `main`
- sha: `8dbc8d1df7f85a1f998ce898edefeb3031df0b21`

Validator version:

```text
delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

Added test fixture:

- file: `src/services/delta/special-day.test.js`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `27335ef2e08a50386aae9583613c7a8ee014045a`

Added spec memo:

- file: `systems/delta/config/delta_special_day_guard.md`
- branch: `feature/atlas-pre-delta-foundation`
- sha: `891b592353c2cd5d0b7860e0c5d21ebf51d43c89`

---

## Runtime fixture result

DELTA confirmed runtime-visible behavior.

Observed validator version:

```text
delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

Reject confirmed:

```text
2026-06-13 | L3 | 厚生年金保険法 L3 択一 Q11-2〜Q15-12（16問）
```

Expected error observed:

```text
L3_scheduled_on_2026-06-13_unavailable
```

Reject confirmed on another L3 unavailable day:

```text
2026-06-26 | L3 | 社一 L3 択一 Q1-1〜Q3-2（16問）
```

Expected error observed:

```text
L3_scheduled_on_2026-06-26_unavailable
```

Allow confirmed with `preflight.ok: true` and `errors: []`:

```text
2026-06-13 | L2 | 社一 L2 P1〜P25（25ページ・通勤枠）
2026-06-13 | L1/L2 | 社一 L1 P1〜P20（20ページ・通勤枠）＋社一 L2 P1〜P20（20ページ・通勤枠）
2026-06-13 | rest | 秒トレ40問
```

This confirms:

- L3 unavailable days reject L3.
- L3 unavailable days do not reject L1 / L2 page-range work.
- L3 unavailable days do not reject 秒トレ-only rows.
- The rule is generalized beyond 2026-06-13 because 2026-06-26 also rejected L3.
- A note such as `L3不可` is not treated as actual L3 work.

---

## Restoration

DELTA temporarily overwrote `next_operations.md` during fixture execution and restored the operational version afterward.

Restored file:

- file: `systems/delta/operations/next_operations.md`
- branch: `feature/atlas-pre-delta-foundation`
- restored sha: `d7d9708b309a494c64dd6e903cc2ad60a7336d9c`

Restoration preflight:

```text
preflight.ok: true
errors: []
validator_version: delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard
```

---

## Closure judgment

actual behavior confirmed.

This defect is closed for the generalized L3 unavailable day behavior.

---

## Recurrence prevention

- Do not implement date-specific validator branches when the issue is a general special-day model problem.
- Treat special-day constraints as layer-specific, not all-or-nothing.
- Distinguish actual L3 work from notes such as `L3不可日`.
- Keep runtime validator, test fixture, and config memo aligned.

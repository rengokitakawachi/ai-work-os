# DELTA special day guard

status: mandatory_guard
created_at: 2026-05-09
scope: DELTA operations generation / operations preflight

---

## Core rule

Special-day constraints must be layer-specific.

An `L3 unavailable` day is not an all-study unavailable day.

If a date has `l3_allowed: false`, DELTA must reject only actual L3 work on that date. L1 / L2 / 秒トレ may still be allowed when the date rule permits them.

---

## Rule model

```yaml
special_day_rule:
  date: YYYY-MM-DD
  day_type: string
  l3_allowed: boolean
  l1_l2_allowed: boolean
  sekotore_allowed: boolean
  allowed_context: string | null
```

---

## Current rules

```yaml
special_days:
  2026-05-10:
    day_type: l3_unavailable_day
    l3_allowed: false
    l1_l2_allowed: true
    sekotore_allowed: true
  2026-06-13:
    day_type: saturday_workday
    l3_allowed: false
    l1_l2_allowed: true
    sekotore_allowed: true
    allowed_context: commute
  2026-06-26:
    day_type: weekday
    l3_allowed: false
    l1_l2_allowed: true
    sekotore_allowed: true
  2026-06-30:
    day_type: annual_leave
    l3_allowed: true
    l1_l2_allowed: true
    sekotore_allowed: true
```

---

## Validator behavior

Reject:

```text
2026-06-13 | L3 | 厚生年金保険法 L3 択一 Q11-2〜Q15-12（16問）
```

Allow:

```text
2026-06-13 | L2 | 社一 L2 P1〜P25（25ページ・通勤枠）
2026-06-13 | L1/L2 | 社一 L1 P1〜P20（20ページ・通勤枠）＋社一 L2 P1〜P20（20ページ・通勤枠）
2026-06-13 | rest | 秒トレ40問
```

---

## Non-goals

- Do not create one-off validator branches for individual dates.
- Do not treat `L3不可日` text as actual L3 work.
- Do not reject L1 / L2 merely because a date has `l3_allowed: false`.
- Do not reject 秒トレ merely because a date has `l3_allowed: false`.

---

## Implementation target

Runtime validator must use a generalized `SPECIAL_DAY_RULES` map.

If `SPECIAL_DAY_RULES[date].l3_allowed === false`, reject rows only when the row contains actual L3 work.

Actual L3 work means:

- row layer includes `L3`, or
- standard line includes actual L3 exercise work such as `L3`, `選択 Q`, `択一 Q`, or `過去問講座`, excluding mere notes like `L3不可日`.

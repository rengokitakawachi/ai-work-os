# DELTA validator guardrails: lessons from 2026-05-09

status: draft
created_at: 2026-05-09
source_ref:
  - notes/10_logs/2026-05-09_delta_next_operations_dynamic_d7_validator_fix.md
  - notes/10_logs/2026-05-09_delta_special_day_l3_unavailable_guard.md
  - systems/delta/config/delta_special_day_guard.md
  - src/services/delta-operations.js
  - src/services/delta/l3-question-index.js

---

## Core idea

Validator rules must encode invariants, not old fixture values.

A dated example such as `2026-05-13` can be useful as a test case, but it must not become the rule itself.

---

## Lessons

### 1. Validate relations, not historic examples

For active / next split, the real invariant is:

```text
next_start_date = active Day6 due_date + 1 day
```

The wrong validator encoded a past fixture:

```text
next_start_date = 2026-05-13
```

This blocked valid rolling when Active Day6 moved to 2026-05-15 and Next should start on 2026-05-16.

### 2. Special-day constraints are layer-specific

`L3不可` does not mean all learning is unavailable.

Correct model:

```yaml
l3_allowed: false
l1_l2_allowed: true
sekotore_allowed: true
```

A validator should reject actual L3 work, not L1/L2 or 秒トレ.

### 3. Runtime behavior is a separate layer

Repo changes, configured files, runtime-visible schema, and actual behavior are different states.

A fix is not closed until a runtime fixture confirms actual behavior.

### 4. Question-number planning needs an index

Operations should not generate plausible-looking question IDs.

For L3, daily plans must be based on a confirmed chapter question index. Nonexistent ranges such as `Q1-17〜Q1-32` must be rejected.

---

## Draft angle

Working title:

```text
バリデータに「例」を埋め込むな：計画生成AIを壊さないための3つのガード
```

Potential outline:

1. AI operations generator はもっともらしい計画を作る
2. だから validator は仕様の最後の砦になる
3. fixture value と invariant を混同すると validator が仕様を壊す
4. 特殊日は all-or-nothing ではなく capability matrix として扱う
5. runtime fixture で actual behavior confirmed まで閉じる

---

## Reuse note

This draft is content material only. It is not a specification source of truth.

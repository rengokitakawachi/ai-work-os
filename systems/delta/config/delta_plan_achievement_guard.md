# DELTA roadmap / plan achievement guard

status: mandatory_guard
created_at: 2026-05-09
scope: DELTA operations generation / daily review / recommendation / preflight

---

## Core rule

DELTA の役割は、roadmap / plan の達成に必要な日々の operations を生成することである。

Therefore, DELTA must not generate an easier local plan that is merely comfortable for the next day.

Operations are valid only when they explicitly carry the roadmap / plan achievement line forward.

---

## Hard requirements

Before generating or writing `active_operations.md` / `next_operations.md`, DELTA must:

1. Read roadmap.
2. Read plan.
3. Identify the current roadmap phase.
4. Identify the active plan target period.
5. Identify the target date.
6. Identify the target scope by subject / layer.
7. Compare current_position with target scope.
8. Compute the required daily pace.
9. Put the computed plan-achievement line into `expected_position` and `standard_line`.
10. If the plan is no longer reachable, mark `compression_required` or `critical_delay`; do not silently lower the line.

---

## Current mandatory roadmap / plan anchors

Roadmap Phase 1:

- Period: 2026-04-27〜2026-06-30
- Purpose: L1 / L2 / L3 の1巡目を完了する
- Success condition: 6月末時点で主要科目のL1/L2/L3が1巡済み

Plan 2026-05-07〜2026-05-17:

- 国民年金法L1/L2を完了方向へ進める
- 国民年金法L3をGW後に継続
- 2026-05-11〜2026-05-15: 平日 国民年金法完了 → 厚生年金保険法へ
- 2026-05-16〜2026-05-17: 国民年金法 択一完了目標

Plan 2026-05-18〜2026-05-31:

- 厚生年金保険法L1/L2へ入る
- 厚生年金保険法L3選択問題へ接続

Plan 2026-06-01〜2026-06-30:

- 労一・社一を進める
- 厚生年金保険法L3を完了
- 労一・社一L3を回収
- 6月末までに1巡完了状態を作る

---

## Invalid operation patterns

The following are invalid unless explicitly justified as `compression_required`, `critical_delay`, or `user_explicit_override`:

- roadmap / plan was read but no target scope was extracted
- `expected_position` only says vague progress such as `進める`, `接続`, `確認`, `できるところまで`
- `standard_line` is easier than the plan-achievement line without marking delay / compression
- plan target appears only in `stretch_line`
- one-day comfort plan is generated without D0-D6 and D7-target reverse plan
- recovery / review is inserted before first-pass completion and reduces first-pass pace
- DELTA says `delayed_but_managed` while the generated plan cannot reach the target date
- operations omit the daily pace required to hit 2026-06-30 first-pass completion

---

## Required fields in operations

Each active Day block should expose:

```yaml
roadmap_anchor:
plan_anchor:
target_date:
target_scope:
required_daily_pace:
expected_position:
standard_line:
gap_status:
operation_mode:
plan_fit_status:
```

For `next_operations.md`, the file must expose:

```yaml
roadmap_phase:
target_date:
target_scope:
plan_fit_status:
remaining_scope_summary:
required_pace_summary:
```

---

## Plan-fit statuses

Allowed statuses:

- `on_plan_line`: standard_line reaches the required plan pace
- `delayed_but_recovering`: standard_line is plan-achievement line and remaining delay is allocated
- `compression_required`: plan target is reachable only with compressed load
- `critical_delay`: target cannot be reached without plan revision
- `needs_confirmation`: current_position or material scope is unknown

Forbidden status usage:

- Do not use `delayed_but_managed` when the plan target is not actually reachable.
- Do not use `on_track` unless daily execution and plan alignment are both on track.
- Do not hide plan miss in stretch_line.

---

## Failure policy

If roadmap / plan achievement line cannot be computed, DELTA must not write operations.

Failure output should say:

```text
operations_generation_blocked: plan_fit_incomplete
reason: roadmap / plan target was not converted into daily standard_line
required_next_action: read roadmap, plan, current_position, and regenerate reverse plan
```

---

## Runtime enforcement target

This guard should be enforced at three layers:

1. DELTA instruction / generation schema
2. `delta_operations` service preflight validator
3. runtime fixture that tries to write a too-easy plan and confirms rejection

# 2026-05-05 ADAM DELTA reverse-planning gate misjudgment

## status

corrected_with_active_gate_reopened

## severity

critical

## category

blocker_underestimation / mission_scope_misclassification

## observed_at

2026-05-05

## reported_by

user

## symptom

ADAM treated DELTA operations generation engine gate as resolved after:

- runtime preflight fixtures passed
- daytime recommendation fixture passed
- minimum deterministic generator test passed
- repository `npm test` reached 106 PASS / 0 FAIL

However, the original user-facing DELTA defect was broader:

```text
operationsを生成する際にロードマップやPlanからの逆算をせずに、安易に7日間の計画を立ててしまう
```

ADAM initially classified full reverse-planning as next/future scope rather than a mission-critical blocker.

## impact

DELTA's role is to support learning toward passing the 社労士 exam on 2026-08-23.

If DELTA cannot reverse-plan from roadmap / plan / current_position / remaining_scope / capacity, it cannot reliably support exam success.

Closing the gate based only on minimum generator and tests would allow later DELTA tasks to proceed while the core planning defect remains unresolved.

## root cause

- ADAM conflated test failure resolution with original defect resolution.
- ADAM treated safety/preflight readiness as equivalent to planning intelligence readiness.
- ADAM underweighted DELTA's mission-critical purpose: 2026-08-23 exam success.
- ADAM allowed `full reverse-planning optimizer` to be split into next_operations even though it was the core fix for the reported behavior.

## correction applied

- `notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md` was corrected.
  - It now states that minimum generator readiness is resolved but original reverse-planning gap remains open.
- `notes/04_operations/next_operations.md` was corrected.
  - `DELTA full reverse-planning optimizer を設計する` was promoted out of next_operations.
- `notes/04_operations/active_operations.md` was corrected.
  - New Immediate Gate added: `DELTA reverse-planning operations generator を実装・確認する`
  - DELTA runtime-dependent tasks are blocked by this gate.
  - The previous DELTA operations generation gate is marked `partially_resolved_superseded_by_reverse_planning_gate`.

## recurrence prevention

For mission-critical system behavior, ADAM must separate:

```yaml
test_failures_resolved: not_equal_to_original_issue_resolved
minimum_safe_generator: not_equal_to_reverse_planning_generator
runtime_preflight_pass: not_equal_to_plan_fit_optimizer_pass
```

Before closing an Immediate Gate, ADAM must compare closure evidence against the original user-reported symptom and the subsystem mission.

For DELTA specifically, operations generation is not complete unless the generated plan is reverse-planned from:

- 2026-08-23 exam target
- roadmap milestones
- plan intermediate targets
- current position
- remaining scope
- completed scope
- user capacity
- special days / L3 unavailable days
- overload / compression judgment

## linked_refs

- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md`
- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `notes/10_logs/2026-05-05_delta_operations_generation_engine_gap.md`

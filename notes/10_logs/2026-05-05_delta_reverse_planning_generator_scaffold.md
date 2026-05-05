# 2026-05-05 DELTA reverse-planning generator scaffold

## status

implemented_test_pending

## purpose

Record the first implementation step for the active Immediate Gate:

```text
DELTA reverse-planning operations generator を実装・確認する
```

The goal is to address the original DELTA defect:

```text
operationsを生成する際にロードマップやPlanからの逆算をせずに、安易に7日間の計画を立ててしまう
```

## implementation branch

```yaml
branch: feature/atlas-pre-delta-foundation
```

## created files

```yaml
src/services/delta/reverse-planning-generator.js:
  sha: b4d354ba2127c374cd6b6d2ce75d00b81409de28

src/services/delta/reverse-planning-generator.test.js:
  sha: 72d2b101746bf3d5eed0a2828393d555a063a3f9
```

## implemented behavior

The new reverse-planning generator is separate from the existing minimum deterministic generator.

It adds a catalog-gated reverse-planning path:

- requires roadmap content
- requires plan content
- requires active operations / current position content
- requires latest daily history content
- requires material catalog content
- fails closed with `missing_material_catalog` if material catalog is absent
- parses exam date from plan
- detects 2026-06-30 phase-one target from roadmap / plan
- parses L3 unavailable dates from roadmap / plan
- parses current L1/L2 position and L3 selected next question
- parses a simple material catalog format
- expands remaining pages / questions into dated rows through 2026-06-30
- assigns L1/L2 primarily to non-L3 days
- assigns L3 to weekends / allowed days
- emits `compression_required` if generated work exceeds target date
- emits preflight evidence sections for special_days / user_capacity / completed_scope / current_position

## tests added

The new tests assert:

- material catalog parser extracts subject scopes
- missing material catalog fails closed and does not return fixed draft content
- roadmap / plan / current_position / catalog produce reverse-planned output
- generated content does not reintroduce 健康保険法 L3 as new work
- generated content is intended to pass current DELTA operations preflight
- impossible workload reports `compression_required`

## current limitations

This is a scaffold, not the final full optimizer.

Known limitations:

- material catalog is currently provided as input, not yet stored as canonical DELTA file
- parser accepts a simple catalog line format only
- date allocation is simple rule-based, not yet a rich balancing optimizer
- generated completion evidence is conservative and designed to satisfy current preflight
- ATLAS / local test execution is still pending
- runtime-visible DELTA behavior is not yet confirmed

## gate judgment

Do not close the Immediate Gate yet.

Current judgment:

```yaml
reverse_planning_code_scaffold: implemented
reverse_planning_tests_added: implemented
local_or_ATLAS_test: pending
runtime_behavior: pending
active_gate_status: open
```

## next action

Run tests on `feature/atlas-pre-delta-foundation`:

```text
npm test -- src/services/delta/reverse-planning-generator.test.js
npm test
```

Expected:

- reverse-planning generator tests PASS
- existing operations-generator tests remain PASS
- full repository tests remain PASS or report actionable failures

## linked_refs

- `notes/04_operations/active_operations.md`
- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md`
- `src/services/delta/reverse-planning-generator.js`
- `src/services/delta/reverse-planning-generator.test.js`

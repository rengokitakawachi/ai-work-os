# 2026-05-05 DELTA reverse-planning generator scaffold

## status

repository_test_pass_runtime_pending

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

## created / updated files

```yaml
src/services/delta/reverse-planning-generator.js:
  sha: f5ee7b7fde1a1c77471274d1061d8d1ac49598f4

src/services/delta/reverse-planning-generator.test.js:
  sha: 72d2b101746bf3d5eed0a2828393d555a063a3f9

src/services/delta-operations.js:
  sha: ee8b295dfaf59b1e33dc59c1f9e753f5c5591009
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
- emits preflight evidence sections for source_of_truth / special_days / user_capacity / completed_scope / current_position

## tests

`src/services/delta/reverse-planning-generator.test.js` checks:

- material catalog parser extracts subject scopes
- missing material catalog fails closed and does not return fixed draft content
- roadmap / plan / current_position / catalog produce reverse-planned output
- generated content does not reintroduce 健康保険法 L3 as new work
- generated content passes current DELTA operations preflight
- impossible workload reports `compression_required`

ATLAS test result recorded in `config/from-claude.md`:

```yaml
reported_at: 2026-05-06
commit: b656218
result: 115 PASS / 0 FAIL
operations_split_tests: PASS
reverse_planning_generator_tests: PASS
full_npm_test: PASS
from_claude_sha: 78a9c0b49dc9065faa8428620bd2939e494ab79a
```

ATLAS fixed two reverse-planning/preflight integration gaps before final PASS:

```yaml
F-2a:
  issue: generated reverse-planning content lacked source_of_truth evidence
  fix: add source_of_truth section in reverse-planning generator output

F-2b:
  issue: L3_selected multiline completed evidence was not recognized by preflight
  fix: recognize L3_selected ... completed: true pattern in delta-operations validator
```

## current limitations

This is a scaffold, not the final full optimizer.

Known limitations:

- material catalog is currently provided as input, not yet stored as canonical DELTA file
- parser accepts a simple catalog line format only
- date allocation is simple rule-based, not yet a rich balancing optimizer
- generated completion evidence is conservative and designed to satisfy current preflight
- configured GPT Action schema v0.6.4 has not been re-imported / runtime-confirmed
- runtime-visible DELTA behavior is not yet confirmed

## gate judgment

Do not close the Immediate Gate yet.

Current judgment:

```yaml
reverse_planning_code_scaffold: implemented
reverse_planning_tests_added: implemented
local_or_ATLAS_test: PASS
repository_full_test: PASS_115_0
runtime_behavior: pending
configured_action_schema_v0_6_4: pending
active_gate_status: open
```

## next action

Runtime / configured GPT reflection remains.

Required next confirmations:

```text
1. Import or confirm configured GPT Action schema v0.6.4.
2. Confirm runtime-visible schema accepts delta_operations file=next_operations.md.
3. Runtime fixture: active_operations.md update rejects embedded # Next operations table.
4. Runtime fixture: next_operations.md update rejects period block row.
5. Runtime fixture: valid split active / next update passes with read_evidence.
```

## linked_refs

- `notes/04_operations/active_operations.md`
- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md`
- `notes/10_logs/2026-05-05_delta_active_next_operations_split.md`
- `src/services/delta/reverse-planning-generator.js`
- `src/services/delta/reverse-planning-generator.test.js`
- `src/services/delta-operations.js`
- `config/from-claude.md`

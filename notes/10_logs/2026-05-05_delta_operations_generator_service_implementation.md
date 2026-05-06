# 2026-05-05 DELTA operations generator service implementation

## status

tested_pass_minimum_generator_reverse_planning_gap_open

## purpose

Record the implementation step after runtime preflight fixtures passed, and correct the scope judgment after user clarification.

DELTA's purpose is to support learning toward passing the 社労士 exam on 2026-08-23. Therefore, operations generation must reverse-plan from roadmap / plan / current position / remaining scope / capacity. A generator that merely produces a safe 7-day draft is insufficient for the original bug.

## implemented

### main branch

- `src/services/delta/operations-generator.js`
  - sha: `88fa05b1025820f98cc9795c090bb5e6d3269daf`
- `src/services/delta/operations-generator.test.js`
  - sha: `5dcc691541ce769cd67ae150b4092b1cb23b87b3`

### feature branch

- branch: `feature/atlas-pre-delta-foundation`
- `src/services/delta/operations-generator.js`
  - sha: `88fa05b1025820f98cc9795c090bb5e6d3269daf`
- `src/services/delta/operations-generator.test.js`
  - sha: `5dcc691541ce769cd67ae150b4092b1cb23b87b3`

### additional API / service fixes on feature branch

ATLAS reported 102 PASS / 4 FAIL, then 103 PASS / 3 FAIL after the first ADAM fixes.

ADAM applied the remaining fixes on `feature/atlas-pre-delta-foundation`:

- `src/services/delta-resource.js`
  - sha after fix: `e9a49a31c9cad67ffb375057ebef25d9214f05b3`
  - restored relative-only `buildDeltaPath()` behavior and rejected full `systems/...` paths
- `src/services/repo-resource/common.js`
  - sha after fix: `8d4b92055f2dcd263b14dee791c517d3295fd4e3`
  - propagated `resource` / `action` into `CONFIG_ERROR` from `getConfig()`

## generator version

```text
delta_operations_generator_2026_05_05_minimum_plan_fit
```

## current implemented scope

Implemented as service-layer minimum deterministic generator.

It builds a safe operations draft that:

- includes D0-D6 Active operations
- includes D7-target Next operations section
- includes `roadmap_anchor`
- includes `existing_next_operations_read`
- includes completed scope evidence
- creates read_evidence roles for roadmap / plan / active_operations / latest_daily_history / completed_subjects / special_days / user_capacity
- avoids completed 健康保険法 L3 new first-pass reintroduction
- avoids 厚生年金保険法 L1/L2 while 国民年金法 L1/L2 is incomplete
- avoids 国民年金法 L3 択一 before 選択 completion marker

## tests added

`src/services/delta/operations-generator.test.js` checks:

- generated content passes `validateDeltaOperationsContent()`
- D0-D6 and Next operations exist
- required evidence markers exist
- known invalid work is not scheduled
- required read_evidence roles are present

## test results

ATLAS reran repository tests after the ADAM fixes.

Final observed result recorded in `config/from-claude.md`:

```yaml
branch: feature/atlas-pre-delta-foundation
commit_refs: 199b8d8 / 88af815
npm_ci: pass
npm_test: pass
total_tests: 106
pass: 106
fail: 0
operations_generator_test: pass
buildDeltaPath_full_systems_path_rejection: pass
repo_resource_bulk_newline_validation: pass
repo_resource_bulk_mixed_separator_validation: pass
```

`config/from-claude.md` was pushed to `origin/main` with final test result:

```yaml
commit: 72c920e
status: resolved
result: 106 PASS / 0 FAIL
```

## corrected disposition after user clarification

### Original bug

The original DELTA bug was not merely test failure or unsafe write behavior.

Original symptom:

```text
operationsを生成する際にロードマップやPlanからの逆算をせずに、安易に7日間の計画を立ててしまう
```

Given DELTA's mission, this is a critical blocker. The plan must be derived from:

- 2026-08-23 社労士試験合格 target
- roadmap milestones
- plan intermediate targets
- current position
- remaining page / question scope
- completed scope
- daily capacity
- special days / L3 unavailable days
- overload / compression judgment

### Corrected judgment

```yaml
test_failures: resolved
runtime_preflight_regressions: resolved
minimum_generator_readiness: resolved
original_reverse_planning_gap: open_critical_blocker
gate_status: must_be_reopened_as_reverse_planning_gate
```

### API / Action exposure

Decision: still not the main issue.

Whether generator is exposed through API / Action is secondary. The primary blocker is that the generator must actually reverse-plan from roadmap / plan and remaining scope.

### Full reverse-planning optimizer

Corrected decision: this is not optional future scope for DELTA's mission. It is the core fix for the original defect and must be handled as an Immediate Gate / active blocker.

Required capabilities:

- parse or otherwise reliably consume roadmap / plan milestones
- parse current position and completed scope
- compute remaining scope to target dates
- expand page / question ranges quantitatively
- distribute load across D0-D6 and D7-target
- apply user capacity and special-day constraints
- detect overload and produce compression_required / critical_delay when needed
- produce preflight-compatible read_evidence and operations content
- prove behavior with tests / fixtures

## not done yet

- Full reverse-planning from roadmap / plan to 2026-08-23 exam target
- Material-aware range expansion
- Remaining scope calculation
- Special-day redistribution
- Load balancing / overload judgment
- Reverse-planning fixture proving that generated operations are derived from roadmap / plan rather than a safe fixed draft

## gate impact

The prior gate closure was too broad.

The correct gate split is:

```yaml
minimum_generator_and_test_readiness: resolved
reverse_planning_from_roadmap_and_plan: open_critical_blocker
```

## linked refs

- `config/from-claude.md`
- `notes/10_logs/2026-05-05_delta_operations_generation_engine_gap.md`
- `notes/02_design/2026-05-05_delta_operations_generation_engine.md`
- `src/services/delta-operations.js`
- `src/services/delta/operations-generator.js`
- `src/services/delta/operations-generator.test.js`
- `src/services/delta-resource.js`
- `src/services/repo-resource/common.js`
- `systems/delta/roadmap/delta_roadmap.md`
- `systems/delta/plan/2026_sharoushi_exam_plan.md`
- `systems/delta/operations/active_operations.md`

# 2026-05-02 thread handover

## Positioning

This handover is a restart entry point.

This handover is not the execution source of truth.

Execution SSOT is:

```text
notes/04_operations/active_operations.md
```

Do not execute directly from this handover.

On restart, read `active_operations` first and decide the next action from the current canonical state.

---

## 概要

This session continued Phase 0 / DELTA operations hardening after the 2026-05-01 daily review.

Main outcomes:

- Post-daily-review reroll was performed because a high-priority DELTA operations generation defect was found immediately after daily review.
- DELTA v0.6 was redefined as `Integrated Operations Upgrade`.
- Several DELTA issues/designs were captured and integrated into the active Day0 task.
- DELTA May history was immediately split into daily files on the DELTA feature branch, separate from v0.6 design work.
- Todoist projection was updated for the new active Day0 task.

Affected layers:

- operations: `notes/04_operations/active_operations.md`, `notes/04_operations/next_operations.md`
- notes/design/issues: DELTA v0.6, plan-gap, progress granularity, recommended lines, daily history split
- DELTA branch files: `systems/delta/history/daily/*`, `systems/delta/history/monthly/*`
- Todoist projection: active task title/description updated

---

## 成功（Success）

### Operations reroll

Post-daily-review rolling was executed.

Current active Day0 starts with:

```text
DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解する
```

Todoist task for this active item:

```text
todoist_task_id: 6gWGH6f5vQhpF7gq
```

### DELTA issue/design capture

Captured and integrated into DELTA v0.6 scope:

- `notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md`
- `notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md`
- `notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md`
- `notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md`
- `notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md`
- `notes/02_design/2026-05-02_delta_recommended_line_generation_design.md`
- `notes/01_issues/2026-05-02_delta_history_daily_files_issue.md`
- `notes/02_design/2026-05-02_delta_history_daily_files_design.md`
- `notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md`

### DELTA 5月 history daily file migration

Handled immediately, separate from v0.6 design execution.

Branch:

```text
feature/atlas-pre-delta-foundation
```

Created:

```text
systems/delta/history/daily/2026-05-01.md
sha: f184d8f7605b1e0578221e475cad8fa4666bdea5
```

```text
systems/delta/history/daily/2026-05-02.md
sha: 2f96eb2ce8c0da04b3298d3eb85a13737f1a5f61
```

```text
systems/delta/history/monthly/2026-05.md
sha: 2de5674e27979f671f2c3d5a861f67dec9ceaae8
```

Left untouched:

```text
systems/delta/history/2026-04.md
sha: e217c78d7b50150149fc7aafa2539183c66ba20d
```

```text
systems/delta/history/2026-05.md
sha: fb5216f64858a8d4b95ccf070e816e442009d0cf
```

Important behavior established:

- 5月以降の実績一次記録は `systems/delta/history/daily/YYYY-MM-DD.md`.
- `systems/delta/history/monthly/2026-05.md` is a summary view, not SSOT.
- L3 one-question updates should update only the relevant daily history file.
- Operations are next-action SSOT, not actual performance history.

---

## 判明事項（Findings）

### DELTA operations generation defect

Root defect:

```text
DELTA daily operations generation was too reactive to recent progress and did not reliably reverse-calculate from roadmap / plan / expected position.
```

Key corrections:

- plan-gap check must happen before daily operations generation.
- progress granularity must normalize L1/L2 to page ranges and L3 to question IDs.
- recommended_lines must be generated during daily review and saved in active_operations.
- daytime answer to “今日の推奨ラインは？” should recall saved recommended_lines, not recompute by default.

### DELTA v0.6 scope

User decided both operations generation quality and Todoist projection should be included together in v0.6.

Version name:

```text
DELTA v0.6 Integrated Operations Upgrade
```

Scope:

- daily history primary source of truth
- plan-gap check
- progress granularity
- recommended_lines daily-review fixation
- Todoist execution view projection

### DELTA resource branch/path finding

`resource=delta` on main showed only config and read_only.

DELTA operational files exist on:

```text
branch: feature/atlas-pre-delta-foundation
root: systems/delta/
```

For reads with `resource=delta`, paths are relative under root, e.g. `history/2026-05.md`.

For writes to DELTA feature branch, `resource=code` with full path worked, e.g.:

```text
resource: code
branch: feature/atlas-pre-delta-foundation
file: systems/delta/history/daily/2026-05-02.md
```

---

## 失敗 / 未解決（Issues）

### Tool / path caveat

A `repoResourceGet tree` on `notes/06_handover` failed with `ResponseTooLargeError`.

Recovery used direct reads of likely handover filenames instead.

### DELTA write scope not fully formalized

Daily history files were created through `resource=code` on the DELTA feature branch.

Still unresolved:

- Whether DELTA runtime action schema allows direct daily history writes.
- Whether configured DELTA GPT runtime can write daily history paths.
- Whether schema / allowlist should be updated for `systems/delta/history/daily/*.md` and `systems/delta/history/monthly/*.md`.

### v0.6 not implemented yet

Current active task is a decomposition gate, not final implementation.

Not yet done:

- DELTA instruction / knowledge / schema update.
- DELTA operations active shape update with recommended_lines.
- DELTA Todoist projection dry_run/apply for DELTA operations.
- Runtime confirmation fixtures.

---

## Current canonical snapshot

This snapshot is informational only. It is not execution SSOT.

### active_operations

```text
file: notes/04_operations/active_operations.md
sha: 98f16d4651a4a4f9ebb62c712151f437d8201cf3
```

### Immediate Gates

```text
none
```

### Current Day0

1. `DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解する`
2. `ADAM / EVE instruction 再層化後の runtime 反映確認 task を作る`

### Expected resume task

```text
DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解する
```

### Expected resume task completed_condition summary

Must decide/decompose:

- DELTA v0.6 scope as integrated operations upgrade
- reflection layers: instruction / knowledge / schema / generator / projection service
- daily history primary source and migration/path conventions
- plan-gap check required read set
- gap_status / operation_mode / recovery_required placement
- survival_line vs plan_minimum_line
- progress SSOT by study_type
- L1/L2 page_range and next_start_page
- L3 questions / question_id / next_question
- chapter-only normalization and uncertainty handling
- recommended_lines fields and daytime recall behavior
- recompute triggers
- Todoist projection profile, description shape, target, write-back path
- long-form no nested fenced code block rule placement
- runtime confirmation fixtures
- routing of implementation / runtime reflection tasks to active / next / future

---

## First read list

On restart, read in this order:

1. `notes/04_operations/active_operations.md`
2. `notes/04_operations/next_operations.md`
3. `notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md`
4. `notes/02_design/2026-05-02_delta_history_daily_files_design.md`
5. `notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md`
6. `notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md`
7. `notes/02_design/2026-05-02_delta_recommended_line_generation_design.md`
8. `notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md`
9. DELTA branch files under `systems/delta/` as needed

For DELTA branch files, use:

```text
branch: feature/atlas-pre-delta-foundation
```

---

## Current focus

Current focus is DELTA v0.6 Integrated Operations Upgrade.

The immediate work is not to implement all changes at once. It is to decompose v0.6 safely into instruction / knowledge / schema / operations shape / projection / runtime confirmation tasks.

Phase 1 and other ADAM/EVE runtime reflection work remain active, but the current Day0 first task is DELTA v0.6 decomposition.

---

## 次のアクション（Next Actions）

Do not execute from this handover without reading active_operations.

Expected next action after restart:

1. Read `notes/04_operations/active_operations.md`.
2. Confirm Immediate Gates are still `none`.
3. Confirm Day0 first task is still DELTA v0.6 Integrated Operations Upgrade decomposition.
4. Read the v0.6 integrated design and source designs.
5. Produce a decomposition plan separating:
   - instruction updates
   - knowledge updates
   - schema updates
   - DELTA operations shape updates
   - daily history path/schema work
   - Todoist projection profile work
   - runtime confirmation fixtures
6. Route resulting implementation tasks into active / next / future before executing them.

---

## New candidates routed, not executed

No independent next candidate remains from DELTA v0.6 projection.

`DELTA v0.6 operations を Todoist execution view へ投影する` was absorbed into active Day0 v0.6 scope.

`next_operations` currently says no near-future candidate outside active.

---

## next_operations snapshot

```text
file: notes/04_operations/next_operations.md
sha: f2e46180cb09f32d17a5a04affb058c7b4a498ba
```

Current next order:

```text
none
```

Candidates in `next_operations` are not executable until promoted to active_operations.

---

## 関連docs

- `docs/05_roadmap.md`
- `docs/10_repo_resource_api.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`

Docs were not updated in this final handover turn.

---

## 関連code / config

ADAM / EVE:

- `config/ai/adam_instruction.md`
- `config/ai/eve_instruction.md`
- `config/ai/adam_knowledge.md`
- `config/ai/eve_knowledge.md`
- `config/ai/adam_schema.yaml`
- `config/ai/eve_schema.yaml`

DELTA branch:

- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_schema.yaml`
- `systems/delta/config/delta_action_schema_v0.5.yaml`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/2026-05.md`
- `systems/delta/history/daily/2026-05-01.md`
- `systems/delta/history/daily/2026-05-02.md`
- `systems/delta/history/monthly/2026-05.md`

Potential service/code targets:

- `src/services/tasks/projection.js`
- Todoist projection service or profile handling
- repoResource delta path allowlist / schema handling, if applicable

---

## 関連notes

DELTA v0.6 and components:

- `notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md`
- `notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md`
- `notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md`
- `notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md`
- `notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md`
- `notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md`
- `notes/02_design/2026-05-02_delta_recommended_line_generation_design.md`
- `notes/01_issues/2026-05-02_delta_history_daily_files_issue.md`
- `notes/02_design/2026-05-02_delta_history_daily_files_design.md`
- `notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md`

Operations / reports:

- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/07_reports/daily/2026-05-01_daily_review.md`
- `notes/09_content/drafts/2026-05-01_routing_as_value_conversion_content_seed.md`

Routing / Phase 0 context:

- `notes/02_design/2026-04-30_routing_core_concept_redefinition.md`
- `notes/02_design/2026-05-01_routing_type_destination_constraints.md`
- `notes/08_analysis/2026-04-30_routing_session_checklist.md`
- `notes/01_issues/2026-05-01_inbox_cleanup_once_issue.md`

---

## 状態サマリ

### API

- DELTA operational files exist on `feature/atlas-pre-delta-foundation`.
- `resource=delta` read works for relative paths but showed read_only in tree output.
- `resource=code` write worked for full DELTA paths on the feature branch.
- Dedicated DELTA daily history actions are not implemented yet.

### docs整合

- No docs update was performed for DELTA v0.6 in this thread.
- v0.6 is currently a notes/design + operations scope, not docs SSOT.

### notesフロー

- DELTA issues/designs were captured.
- active_operations was rerolled and updated.
- next_operations was updated to absorb DELTA Todoist projection into active v0.6 scope.

### code / runtime

- DELTA daily files were created on branch using code write.
- No runtime behavior confirmation for DELTA v0.6 behavior yet.
- No schema reflection confirmation yet.

### Todoist projection

- ADAM active projection task for DELTA v0.6 updated:
  - `6gWGH6f5vQhpF7gq`
- Todoist remains projection, not execution SSOT.

---

## Important guardrails

- Execute only tasks in `notes/04_operations/active_operations.md`.
- New conversation candidates must be routed before execution.
- Immediate Gates block dependent active tasks until completed.
- Completed condition must close by observation.
- A note / report / diff / code / test / schema file existing is not enough for completion.
- update before write: read target first.
- create before write: check for same or nearby file first.
- write before update: present Write Gate.
- write after update: read-back and confirm sha.
- docs are spec SSOT. Do not make spec decisions without reading docs.
- repo schema / configured Action schema / runtime-visible schema / actual behavior are distinct.
- Runtime behavior tasks are not complete until behavior is observed.
- Todoist is projection, not execution SSOT.
- Handover is restart entry point, not execution SSOT.
- DELTA daily history files are now primary for May actuals; do not update monthly summary for one-question L3 records.
- Operations are next-action SSOT, not actual history.

---

## Risks / caveats

- Handover snapshot can become stale; always read active_operations first.
- DELTA main branch and feature branch differ; main only showed config via delta tree.
- DELTA daily history migration was performed on `feature/atlas-pre-delta-foundation`; main integration remains separate.
- v0.6 is not implemented; it is active as a decomposition gate.
- Daily history write behavior was confirmed through `resource=code`, not DELTA runtime action.
- Configured GPT/runtime reflection for DELTA is unconfirmed.
- There is a risk of treating monthly summary as SSOT; do not do that for May onward.

---

## 引き継ぎプロンプト

```text
この handover を読み込んでください。ただし handover は restart entry point であり execution SSOT ではありません。

最初に notes/04_operations/active_operations.md を読み、Immediate Gates と先頭 task を確認してください。

その後、関連 docs / notes / code を取得し、現状を把握してから、active_operations の先頭 task から作業を再開してください。

handover に書かれた expected resume task は参考情報です。実行判断は必ず active_operations を正としてください。

特に現在の expected resume task は、DELTA v0.6 Integrated Operations Upgrade を instruction / knowledge / schema / projection 反映 task に分解することです。

DELTA May history の一次記録は feature/atlas-pre-delta-foundation 上の systems/delta/history/daily/YYYY-MM-DD.md に移行済みです。月次 summary は view であり、operations は次アクションの正本です。
```

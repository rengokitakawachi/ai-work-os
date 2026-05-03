# individual issue files routing archive

## date

2026-05-03

## purpose

`notes/01_issues` に残っていた `idea_log.md` 以外の個別 issue files を routing し、source_ref / routed_to / archive_reason 付きで archive する。

This archive preserves traceability. It is not an execution SSOT.

## source files archived

- `notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md`
- `notes/01_issues/2026-05-01_inbox_cleanup_once_issue.md`
- `notes/01_issues/2026-05-02_delta_history_daily_files_issue.md`
- `notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md`
- `notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md`
- `notes/01_issues/2026-05-03_handover_index_structure_issue.md`

---

## archived issues

### 2026-05-01 DELTA daily operations plan-gap check issue

original_file:

- `notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md`

status:

- open at source

routed_to:

- `notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md`
- DELTA v0.6 active readiness / operations generation follow-up

source_ref:

- `systems/delta/roadmap/delta_roadmap.md`
- `systems/delta/plan/2026_sharoushi_exam_plan.md`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/2026-05.md`
- `notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md`

archive_reason:

The issue has been design-processed. The active problem is no longer an unprocessed issue file; it is represented by the design and DELTA v0.6 follow-up work.

---

### 2026-05-01 inbox cleanup once issue

original_file:

- `notes/01_issues/2026-05-01_inbox_cleanup_once_issue.md`

status:

- open at source

routed_to:

- `notes/04_operations/next_operations.md` task: `現在の inbox を一回整理する`
- `notes/02_design/2026-05-01_routing_type_destination_constraints.md`
- `notes/08_analysis/2026-04-30_routing_session_checklist.md`

source_ref:

- `notes/02_design/2026-05-01_routing_type_destination_constraints.md`
- `notes/08_analysis/2026-04-30_routing_session_checklist.md`

archive_reason:

This is a one-time cleanup issue already represented as a next_operations task. Keeping it as a separate issue file duplicates the execution candidate.

---

### 2026-05-02 DELTA history daily files issue

original_file:

- `notes/01_issues/2026-05-02_delta_history_daily_files_issue.md`

status:

- open at source

routed_to:

- `notes/02_design/2026-05-02_delta_history_daily_files_design.md`
- `notes/04_operations/next_operations.md` tasks:
  - `DELTA monthly summary rebuild automation を設計する`
  - `DELTA dedicated append_daily_event action を検討する`

source_ref:

- `notes/02_design/2026-05-02_delta_history_daily_files_design.md`
- `systems/delta/history/daily/2026-05-02.md`
- `systems/delta/history/monthly/2026-05.md`
- `systems/delta/config/delta_schema.yaml`

archive_reason:

The issue has been design-processed and decomposed into next_operations follow-up tasks. The source issue file no longer needs to remain in `01_issues`.

---

### 2026-05-02 DELTA progress granularity rule issue

original_file:

- `notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md`

status:

- open at source

routed_to:

- `notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md`
- `notes/04_operations/active_operations.md` task: `DELTA chapter-only normalization fixture を実行する`

source_ref:

- `notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md`
- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_schema.yaml`
- `systems/delta/operations/active_operations.md`

archive_reason:

The issue has been design-processed and has an active fixture task. It should not remain as an unprocessed issue file.

---

### 2026-05-02 DELTA recommended line generation issue

original_file:

- `notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md`

status:

- open at source

routed_to:

- `notes/02_design/2026-05-02_delta_recommended_line_generation_design.md`
- DELTA v0.6 active readiness evidence / recommended_lines recall behavior

source_ref:

- `notes/02_design/2026-05-02_delta_recommended_line_generation_design.md`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/daily/2026-05-02.md`
- `systems/delta/plan/2026_sharoushi_exam_plan.md`

archive_reason:

The issue has been design-processed and runtime recall behavior has been partially confirmed in DELTA v0.6 readiness work. Remaining work is represented by active / next DELTA tasks, not by this issue file.

---

### 2026-05-03 handover index / monthly folder structure issue

original_file:

- `notes/01_issues/2026-05-03_handover_index_structure_issue.md`

status:

- open at source

routed_to:

- `notes/02_design/2026-05-03_handover_restart_flow_design.md`
- `notes/04_operations/next_operations.md` task: `handover latest index と月別フォルダ構成を導入する`

source_ref:

- `notes/02_design/2026-05-03_handover_restart_flow_design.md`
- `notes/06_handover/handover_template.md`
- `notes/04_operations/active_operations.md`

archive_reason:

The issue has been design-processed and represented as a next_operations task. Keeping the original issue file in `01_issues` duplicates the next task.

---

## postprocess

After this archive is saved:

- update `next_operations.md` source_ref entries that point to deleted issue files
- delete the original individual issue files from `notes/01_issues`
- verify `notes/01_issues` contains only `idea_log.md` and no individual issue files

# 2026-05-17 Todoist projection and bug-log gate issue

## status

open

## category

operations_projection / bug_log_procedure

## impact

high

## created_at

2026-05-17

## last_touched_at

2026-05-17

## touched_by

user_report / issue_creation

## title

Todoist projection の期限補正と ADAM 不具合ログ記録 gate が弱い

## observation

2026-05-17、ADAM Phase 0 priority reroute 後に Todoist 上で active task が期限切れとして残った。

Observed stale projection:

- `現在の inbox を一回整理する` が 2026-05-15 のまま表示された
- `design routing の最小 fixture を実行する` が 2026-05-16 のまま表示された
- `report template / README hardening を実行する` が 2026-05-16 のまま表示された

User pointed out that when active tasks are reviewed or rerouted, today-executable active tasks must be projected to today's date.

ADAM corrected the Todoist due dates and `active_operations.md`, but initially failed to record the defect in the bug log.

User then pointed out that the failure to log the bug immediately was also a bug.

## why it matters

Todoist is projection, not SSOT.

If Todoist shows current active work as overdue, the projection view diverges from `active_operations.md` and can mislead execution priority.

Also, ADAM-owned operational defects must be logged immediately. A correction without bug logging loses recurrence-prevention evidence and weakens daily / weekly review monitoring.

## root cause

Two gates were weak:

1. Todoist projection date normalization gate
   - After active review / reroute, unfinished tasks that remain today-executable must be assigned today's date.
   - ADAM manually closed / created / updated Todoist tasks after `projectTasks dry_run` produced unsafe delete actions, but did not normalize due dates.

2. Bug logging gate
   - ADAM treated the Todoist stale due-date issue as a quick correction.
   - ADAM did not immediately create/update the bug log before reporting correction as complete.

## observed correction

Todoist due_date corrected to 2026-05-17:

- `現在の inbox を一回整理する`
  - Todoist id: `6gfxCHWgH4M8755q`
- `design routing の最小 fixture を実行する`
  - Todoist id: `6gfxCHphWggvM2MH`
- `report template / README hardening を実行する`
  - Todoist id: `6gfxCJ5Gmr25PvRH`

`active_operations.md` corrected:

- `notes/04_operations/active_operations.md`
- sha after correction: `7b8f6f13dda9707282ae19360b0321be4b15ccb2`

Bug logs created:

- `notes/10_logs/2026-05-17_adam_todoist_projection_stale_due_date.md`
- `notes/10_logs/2026-05-17_adam_bug_log_omission_for_todoist_projection_bug.md`

Consolidated bug log updated:

- `notes/10_logs/adam_bug_fix_log.md`
- entries:
  - `2026-05-17-006 Todoist active projection stale due date after reroute`
  - `2026-05-17-007 Bug-log omission after Todoist projection bug`

## routing_hint

operations_candidate / design_candidate_if_recurs / keep_open_until_next_review_confirms_gate

## recurrence prevention candidate

- Active review / reroute completed condition must include Todoist projection date normalization.
- Manual Todoist projection must include due_date inspection or Today view check.
- `projectTasks dry_run` delete result for uncompleted task removal must not be applied blindly.
- ADAM-owned bug correction is not complete until bug log creation/update is done.
- If bug-log step is missed, the omission itself must be logged as a separate bug.

## completed_condition

This issue can be closed when:

- next daily or weekly review checks the two new bug logs
- Todoist projection state is checked for stale overdue active tasks
- `active_operations.md` or review procedure captures the rule that today-executable active tasks get today's date after review/reroute
- bug-log gate is included in correction completed condition for ADAM-owned defects
- if `projectTasks` delete/close/defer semantics need implementation work, an operations or design candidate is created

## source_ref

- `notes/04_operations/active_operations.md`
- `notes/10_logs/2026-05-17_adam_todoist_projection_stale_due_date.md`
- `notes/10_logs/2026-05-17_adam_bug_log_omission_for_todoist_projection_bug.md`
- `notes/10_logs/adam_bug_fix_log.md`
- `notes/10_logs/adam_bug_fix_log_operating_method.md`

# ADAM Todoist projection stale due date bug

status: fixed_with_monitoring
severity: high
category: todoist_projection / operations_rolling
observed_at: 2026-05-17
reported_by: user

---

## symptom

After ADAM rerouted active work to prioritize ADAM Phase 0 completion, Todoist still showed overdue tasks:

- `現在の inbox を一回整理する` due 2026-05-15
- `design routing の最小 fixture を実行する` due 2026-05-16
- `report template / README hardening を実行する` due 2026-05-16

These tasks were still active / today-executable, but Todoist displayed them as overdue.

The user pointed out that when tasks are reviewed, today's tasks should be projected with today's date.

---

## impact

Todoist is a projection of `notes/04_operations/active_operations.md`.

Leaving stale due dates in Todoist caused the projection view to diverge from the current active execution intent.

This could mislead the user into thinking tasks were overdue rather than current active work.

---

## root_cause

During the 2026-05-15 ADAM Phase 0 priority reroute, ADAM manually created and updated Todoist tasks instead of applying `projectTasks`, because dry_run produced delete actions for uncompleted tasks removed from active.

ADAM correctly avoided unsafe delete, but failed to normalize due dates for newly active / still-active unfinished tasks to the current execution date after the active review/reroute.

This was a projection maintenance miss:

- active task order changed
- Todoist projection changed
- due dates were not normalized to today's execution date

---

## fix_applied

On 2026-05-17, ADAM corrected the Todoist due dates to 2026-05-17:

- `現在の inbox を一回整理する`
  - Todoist id: `6gfxCHWgH4M8755q`
  - due_date corrected to 2026-05-17

- `design routing の最小 fixture を実行する`
  - Todoist id: `6gfxCHphWggvM2MH`
  - due_date corrected to 2026-05-17

- `report template / README hardening を実行する`
  - Todoist id: `6gfxCJ5Gmr25PvRH`
  - due_date corrected to 2026-05-17

`notes/04_operations/active_operations.md` was also updated to reflect the correction.

- active_operations sha after correction: `7b8f6f13dda9707282ae19360b0321be4b15ccb2`

---

## remaining_risk

The manual projection path can still create stale due dates if ADAM bypasses `projectTasks apply` and manually closes / creates / updates Todoist tasks.

The current `projectTasks` dry_run behavior also produced delete actions for uncompleted tasks removed from active, which ADAM avoided manually. That suggests the projection workflow needs clearer semantics for:

- active removal due to deferral
- task completion
- close vs delete
- date normalization on reroute

---

## recurrence_prevention

When active tasks are reviewed, rerouted, or manually projected to Todoist:

1. unfinished tasks that remain today-executable must be assigned today's date
2. stale original dates must not remain on current active projection tasks
3. Todoist overdue state must be treated as a projection defect when the task is still active today
4. if `projectTasks dry_run` proposes delete for uncompleted active-removal, do not apply blindly
5. after manual projection, read / inspect the resulting Today view or task due dates when available
6. record the correction in bug fix log immediately when ADAM caused the projection defect

---

## linked_refs

- `notes/04_operations/active_operations.md`
- `notes/10_logs/adam_bug_fix_log.md`
- Todoist task: `6gfxCHWgH4M8755q`
- Todoist task: `6gfxCHphWggvM2MH`
- Todoist task: `6gfxCJ5Gmr25PvRH`

---

## next_disposition

```yaml
status: fixed_with_monitoring
needs_operations: true
needs_issue_or_design: false
needs_docs_or_instruction: possible_if_recurs
needs_monitoring: true
operations_connection:
  - next_operations から次週補充候補を再評価する
  - tasks API 全体を execution projection 前提で再設計する
monitoring_trigger:
  - next daily / weekly review
  - any manual Todoist projection
  - projectTasks dry_run proposing delete for uncompleted task removal
```

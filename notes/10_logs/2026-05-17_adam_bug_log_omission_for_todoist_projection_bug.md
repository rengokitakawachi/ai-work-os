# ADAM bug log omission for Todoist projection bug

status: fixed_with_monitoring
severity: high
category: bug_log_procedure / operations_rolling
observed_at: 2026-05-17
reported_by: user

---

## symptom

ADAM corrected the Todoist stale due-date projection bug but did not immediately record the defect in the ADAM bug fix log.

The user then reminded ADAM that bugs must be automatically recorded in the bug log.

After ADAM recorded the Todoist projection bug, the user correctly pointed out that the failure to log it immediately was itself another bug.

---

## impact

This violated the operating rule in `notes/10_logs/adam_bug_fix_log_operating_method.md`:

- ADAM operational mistakes must be recorded in the bug fix log.
- Daily review must check the bug fix log if ADAM made or corrected an operational mistake.
- A correction without logging loses recurrence-prevention evidence.

The omission weakened traceability of the original projection defect and delayed routing of the recurrence-prevention lesson.

---

## root_cause

ADAM treated the Todoist stale due-date issue as a quick projection correction and did not immediately run the bug-log procedure.

This was a Focus Completion / Bug Logging Gate miss:

- detect ADAM-owned bug
- fix immediate symptom
- record bug log
- decide monitoring / operations / docs / instruction disposition

ADAM executed the fix before completing the log step.

---

## fix_applied

ADAM created the missing Todoist projection bug log:

- `notes/10_logs/2026-05-17_adam_todoist_projection_stale_due_date.md`
- sha: `3150b89ffc3ff5d608bcac6c260fb92454061345`

ADAM updated the consolidated bug ledger:

- `notes/10_logs/adam_bug_fix_log.md`
- entry: `2026-05-17-006 Todoist active projection stale due date after reroute`
- sha after update: `7b3bb61c3fb2b5833e4fb6e5305df2fe70ddb39c`

This log records the second-order defect: failure to log the first defect immediately.

---

## remaining_risk

ADAM may still correct small operational mistakes without logging them if the bug-log step is not treated as part of the correction completed condition.

The risk is highest during:

- Todoist projection corrections
- daily / weekly review corrections
- active reroute corrections
- tool failure interpretation fixes
- report corrections

---

## recurrence_prevention

When ADAM detects or is told about an ADAM-owned defect:

1. fix the immediate symptom if safe
2. immediately create or update the relevant bug log
3. update the consolidated bug ledger if the defect is ADAM-owned and recurrence-relevant
4. only then report the correction as complete
5. if the bug-log step is missed, treat that omission as a separate bug

---

## linked_refs

- `notes/10_logs/README.md`
- `notes/10_logs/adam_bug_fix_log_operating_method.md`
- `notes/10_logs/adam_bug_fix_log.md`
- `notes/10_logs/2026-05-17_adam_todoist_projection_stale_due_date.md`
- `notes/04_operations/active_operations.md`

---

## next_disposition

```yaml
status: fixed_with_monitoring
needs_operations: false
needs_issue_or_design: false
needs_docs_or_instruction: possible_if_recurs
needs_monitoring: true
monitoring_trigger:
  - next daily / weekly review
  - any ADAM-owned bug correction
  - any user reminder that a bug was not logged
```

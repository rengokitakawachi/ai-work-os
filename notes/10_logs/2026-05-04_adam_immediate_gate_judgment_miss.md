# 2026-05-04 ADAM Immediate Gate judgment miss

## status

open

## category

controller_judgment_regression

## severity

high

## observed_at

2026-05-04

## reported_by

user

## symptom

DELTA recovery line calibration fix was first attached to the normal Day2 task `DELTA write resource schema reflection gate を整理する`.

After user challenge, ADAM reassessed and promoted it to an Immediate Gate.

## expected_behavior

ADAM should have made the Immediate Gate judgment on the first pass.

When a repo config / instruction / schema fix is a prerequisite for downstream runtime-dependent tasks, configured GPT reflection and runtime fixture confirmation must be placed as an Immediate Gate before those dependent tasks.

## impact

If left as a Day2 task, Day1 / Day2 DELTA runtime-dependent tasks could have proceeded with unconfirmed configured GPT reflection.

This would allow operations generation or fixture checks to run against stale runtime behavior.

## root_cause

ADAM initially treated runtime confirmation as part of a related schema reflection task instead of as a prerequisite gate for downstream DELTA runtime behavior.

This violated the principle that manual / external / runtime reflection required by later tasks should be an Immediate Gate.

## fix_applied

`notes/04_operations/active_operations.md` was updated:

- Immediate Gate added: `DELTA recovery line calibration configured GPT reflection / runtime fixture を確認する`
- DELTA runtime-dependent tasks were blocked by this gate
- Todoist projection was updated
- new Todoist task id: `6gX2mXQwgvhVv79q`
- active_operations sha after write-back: `4ded611230fa853cb0c3c9d413a8c46ee1ccc64a`

## recurrence_prevention

For any fix that changes instruction / schema / configured GPT behavior:

- if downstream active tasks depend on runtime behavior, runtime reflection must be an Immediate Gate
- do not bury runtime confirmation inside a later normal Day task
- explicitly list blocked tasks
- apply Todoist projection after adding the gate

## linked_refs

- `notes/04_operations/active_operations.md`
- `notes/08_analysis/2026-05-04_delta_recovery_line_calibration_fix.md`
- `notes/10_logs/adam_bug_fix_log.md`

## next_disposition

- Consider folding this entry into `notes/10_logs/adam_bug_fix_log.md` during the next bug fix log operation-method task.
- Consider adding this as an always-on guard if instruction budget allows.

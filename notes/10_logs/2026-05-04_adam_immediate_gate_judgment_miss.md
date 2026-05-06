# 2026-05-04 ADAM Immediate Gate judgment miss

## status

fixed_instruction_reflection_done

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

After daily review, user also pointed out that ADAM's own instruction reflection had not been performed.

## expected_behavior

ADAM should have made the Immediate Gate judgment on the first pass.

When a repo config / instruction / schema fix is a prerequisite for downstream runtime-dependent tasks, configured GPT reflection and runtime fixture confirmation must be placed as an Immediate Gate before those dependent tasks.

This rule should also be reflected into ADAM instruction when the miss is a controller-level judgment regression.

## impact

If left as a Day2 task, Day1 / Day2 DELTA runtime-dependent tasks could have proceeded with unconfirmed configured GPT reflection.

This would allow operations generation or fixture checks to run against stale runtime behavior.

If the rule stayed only in logs / daily report / operations, ADAM could repeat the same first-pass gate judgment miss.

## root_cause

ADAM initially treated runtime confirmation as part of a related schema reflection task instead of as a prerequisite gate for downstream DELTA runtime behavior.

This violated the principle that manual / external / runtime reflection required by later tasks should be an Immediate Gate.

ADAM also failed to immediately apply Rule Placement Guard to itself. The recurrence prevention was recorded in logs and operations, but not reflected into `config/ai/adam_instruction.md` until the user pointed it out.

## fix_applied

`notes/04_operations/active_operations.md` was updated:

- Immediate Gate added: `DELTA recovery line calibration configured GPT reflection / runtime fixture を確認する`
- DELTA runtime-dependent tasks were blocked by this gate
- Todoist projection was updated
- new Todoist task id: `6gX2mXQwgvhVv79q`
- active_operations sha after daily review write-back: `78d5bb1c4aad4cb7c20f90baa88e456fcb57187e`

`config/ai/adam_instruction.md` was updated:

- added always-on guard:
  - instruction / schema / configured GPT behavior を変える修正が後続 runtime-dependent task の前提になる場合、runtime reflection / fixture confirmation を通常 Day task に埋めず Immediate Gate として先頭に置く
- sha: `0553e95b54ac2223ca0d4ae7f2ad0a31d9532f85`

## recurrence_prevention

For any fix that changes instruction / schema / configured GPT behavior:

- if downstream active tasks depend on runtime behavior, runtime reflection must be an Immediate Gate
- do not bury runtime confirmation inside a later normal Day task
- explicitly list blocked tasks
- apply Todoist projection after adding the gate
- if the miss is a controller-level judgment regression, apply Rule Placement Guard to ADAM itself and update ADAM instruction when needed

## linked_refs

- `notes/04_operations/active_operations.md`
- `notes/08_analysis/2026-05-04_delta_recovery_line_calibration_fix.md`
- `notes/10_logs/adam_bug_fix_log.md`
- `config/ai/adam_instruction.md`

## next_disposition

- Consider folding this entry into `notes/10_logs/adam_bug_fix_log.md` during the next bug fix log operation-method task.
- Runtime reflection of updated ADAM instruction is separate and should not be assumed from repo update alone.

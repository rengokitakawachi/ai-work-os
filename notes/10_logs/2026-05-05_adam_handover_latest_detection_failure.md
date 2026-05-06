# 2026-05-05 ADAM handover latest detection failure

## status

open_with_existing_next_task

## severity

high

## category

handover_restart_flow / latest_detection_failure / tool_result_handling

## observed_at

2026-05-05

## reported_by

user

## symptom

At thread restart, user asked ADAM to understand the situation from the latest handover and decide the next action.

ADAM could not reliably identify the latest handover from `notes/06_handover/`.

Observed behavior:

- `notes/06_handover` tree/list attempts were too large or ineffective.
- search / grep did not reliably identify the latest handover.
- ADAM eventually required the user to provide the exact file path:
  - `notes/06_handover/2026-05-05_delta_generator_test_and_runtime_reflection_handover.md`

## impact

Restart flow was not self-contained.

ADAM's handover procedure says handover is a restart entry point and active_operations is execution SSOT, but ADAM still must be able to locate the current restart entry point without relying on the user to know the latest handover path.

This caused friction and delayed correct active_operations reading.

## root cause

Known design gap was left unresolved:

- No `notes/06_handover/latest.md` pointer exists.
- `notes/06_handover/` has grown enough that listing can fail or produce too much data.
- Latest detection depended on history / search / direct guessing rather than a small canonical pointer.
- Handover template says read active_operations first, but does not solve latest handover discovery when user says only "latest handover".

## existing design / task

This is already captured in design:

- `notes/02_design/2026-05-03_handover_restart_flow_design.md`

The design says:

- `notes/06_handover/latest.md` should be a small pointer to the latest handover.
- latest handover detection should not depend on folder listing.
- handover is restart entry point, not execution SSOT.
- restart order should be latest pointer → handover → active_operations → source_ref.

This is already present in next_operations:

- `handover latest index と月別フォルダ構成を導入する`

## correction needed

The existing next task should explicitly cite this observed failure as evidence.

It should not be treated as an abstract cleanup only. It is a restart reliability bug.

## recurrence prevention

Implement at minimum:

- `notes/06_handover/latest.md`
- latest pointer update in handover creation procedure
- read-back check that latest pointer target exists
- small first-read path for restart
- optional monthly folder layout / handover index after pointer is stable

## linked_refs

- `notes/02_design/2026-05-03_handover_restart_flow_design.md`
- `notes/06_handover/handover_template.md`
- `notes/04_operations/next_operations.md`
- `notes/04_operations/active_operations.md`
- `notes/06_handover/2026-05-05_delta_generator_test_and_runtime_reflection_handover.md`

## next_disposition

Keep as next_operations task unless current focus changes.

Current active Immediate Gate remains:

- `DELTA reverse-planning operations generator を実装・確認する`

Do not displace that mission-critical DELTA blocker unless a restart/handover task is explicitly requested or rolled in by review.

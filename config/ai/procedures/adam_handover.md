# ADAM Handover Procedure

## Purpose

This procedure defines how ADAM creates and consumes handovers.

Handover is a restart entry point. It is not the execution source of truth.

---

## Create Handover

When the user asks to create a handover:

1. Read the handover template.
2. Read relevant docs, notes, code, and operations as needed.
3. Summarize current state, completed work, open risks, and next action.
4. Save to `notes/06_handover`.
5. Verify saved result.

---

## Resume From Handover

In a new thread:

1. Read the latest handover.
2. Read related docs / notes / code referenced by handover.
3. Read operations.
4. Decide the next action from operations, not handover alone.

---

## Source-of-Truth Rule

If handover conflicts with docs, docs win.

If handover conflicts with operations execution order, operations win unless operations is stale or broken.

---

## Completion

Handover creation is complete only when the file is saved and verified.

Resume is complete only when the next action is grounded in current operations.

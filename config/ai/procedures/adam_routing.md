# ADAM Routing Procedure

## Purpose

This procedure defines how ADAM handles routing.

Routing classifies and sends inputs to the right layer. It is not review and it is not execution.

---

## Routing Types

- intake routing: structure unorganized inbox input
- issue routing: send issues to plan / operations / design / future / archive / issue
- design routing: send design notes to docs / design / future / archive / operations candidate
- conversation routing: capture new discussion points without interrupting active execution

---

## Core Rule

Do not execute a new candidate immediately just because it appeared in conversation.

First decide whether it is:

- discussion only
- issue
- operations candidate
- design
- future
- archive

If it is an operations candidate, decide active / next / future through rolling.

---

## Issue Routing Procedure

1. Read the issue source.
2. Confirm status, impact, urgency, category, and context.
3. Decide the natural destination.
4. If destination is operations, treat it as a candidate, not direct active execution.
5. If destination is future / archive / issue keep, state the re-evaluation point.
6. Save or update only after Write Gate.

---

## Intake Routing Procedure

1. Read the target inbox source.
2. Split by chunk or item when needed.
3. Generate one theme per memo.
4. Add source_ref to derived outputs.
5. Decide destination.
6. Decide inbox postprocess:
   - archive by default when processing is complete
   - pending only with explicit reason

---

## Completion

Routing is complete only when destination and follow-up state are explicit.

Saving an issue alone does not mean routing is complete.

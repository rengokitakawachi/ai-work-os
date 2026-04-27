# ADAM Operations Procedure

## Purpose

This procedure defines how ADAM handles operations.

Operations is the short-term execution-order source of truth for ADAM.

---

## Active-First Execution

During daytime execution, ADAM executes only tasks in active_operations.

Follow active order unless a structural issue requires exception handling.

Do not pull tasks from next_operations or conversation directly into execution without rolling.

---

## State Layers

Before changing operations, identify the layer being changed:

- repo state
- canonical operations state
- runtime / Todoist projection state

Do not merge these layers.

---

## Reroll Procedure

Use reroll at review points or when active is structurally broken.

Minimum candidate sources:

- plan
- open issue
- next_operations
- current active

Reroll steps:

1. Collect candidates.
2. Normalize task shape.
3. Evaluate dependency and completed condition.
4. Rank by relative priority.
5. Place into active / next / future.
6. Update active_operations and next_operations.
7. Project to Todoist only after operations are updated.

---

## Day Capacity

Use tasks roughly sized 0.5 to 1.5 hours.

A day is roughly 2 hours of execution capacity.

Avoid creating days that are too light unless there is an explicit reason.

---

## Completion

A task may be complete while still present in active_operations until daily review.

Do not archive or structurally move completed tasks outside review unless active is broken.

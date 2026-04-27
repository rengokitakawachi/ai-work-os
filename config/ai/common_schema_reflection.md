# Common Schema Reflection

## Purpose

This file defines the shared schema reflection rule for ADAM and EVE.

It prevents treating repository schema updates as runtime behavior changes.

---

## Layer Separation

Schema-related changes must distinguish at least these layers:

- repo schema
- configured Action / tool schema
- runtime-visible tool schema
- actual tool behavior

A change is not complete merely because the repo schema file was updated.

---

## Minimum Confirmation Chain

For schema-related changes, use this chain when applicable:

1. repo schema updated
2. Action or tool configuration refreshed
3. runtime tool schema shows the new field, enum, required property, or operation
4. dry_run confirms the expected payload or behavior
5. apply confirms the expected persisted or external result, if apply is in scope

If any required layer is unobserved, the task remains incomplete or becomes a follow-up task.

---

## Runtime Visibility

Runtime visibility means the active assistant tool schema exposes the expected interface.

Examples:

- a new field is accepted by the tool call
- an enum value is available
- required fields match the intended contract
- a request payload can carry the new shape

Do not infer runtime visibility from repository contents.

---

## Behavior Confirmation

Runtime schema visibility is not the same as behavior confirmation.

Behavior confirmation requires observing the tool result.

Examples:

- dry_run payload includes the expected field
- create payload carries the expected due date
- update returns the expected state
- bulk read splits files as intended
- validation rejects invalid input as intended

---

## Persona-Specific Scope

ADAM and EVE use this rule differently.

ADAM may need to confirm repoResource, projectTasks, operations projection, and Todoist task schemas.

EVE should usually confirm only Todoist task-management schemas.

Do not expose ADAM-only tools to EVE merely for commonality.

---

## Completed Condition

A schema-related task can be closed only when its required observation layer has been reached.

Examples:

- repo-only task: repo schema update observed
- runtime-interface task: runtime tool schema observed
- behavior task: dry_run or apply result observed
- external-projection task: external state verified or returned ID synchronized

Always state which level is being completed.

---

## Judgment

Schema files are not runtime.

Runtime schema is not behavior.

Behavior is not durable state unless the resulting state is observed or synchronized.

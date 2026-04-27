# EVE Task Retrieval Procedure

## Purpose

This procedure defines how EVE retrieves and organizes existing tasks.

Todoist is EVE's task-state source of truth.

---

## Retrieval First

When the user asks to check, organize, list, prioritize, or decide tasks, call listTasks first.

Do not ask the user to rewrite task lists that can be retrieved from Todoist.

---

## Retrieval Triggers

Use listTasks for requests such as:

- what should I do today
- show my tasks
- organize my tasks
- prioritize my tasks
- what is my current task status
- clean up my Todoist
- decide the next task

---

## Organization Steps

1. Retrieve open tasks.
2. Group by due date, project, label, or urgency when useful.
3. Identify actionable next items.
4. Use operations only as supplemental execution-order context when needed.
5. Present a short recommendation.

---

## Operations Boundary

Operations is not EVE's task-state source of truth.

Use operations only to help reason about execution order.

Do not replace Todoist state with operations state.

---

## Completion

Retrieval is complete when EVE has used Todoist data to present the current task state or next action recommendation.

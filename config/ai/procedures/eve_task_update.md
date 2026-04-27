# EVE Task Update Procedure

## Purpose

This procedure defines how EVE updates or closes Todoist tasks.

Todoist is EVE's task-state source of truth.

---

## Identify Target

Before updateTask, identify the target task.

If the target is not clear, use listTasks first.

Do not update a guessed task.

---

## Update Types

Use updateTask for:

- title changes
- description changes
- due_date changes
- label changes
- priority changes
- completion by status = closed

---

## Completion Flow

When the user asks to mark a task done:

1. Identify the target task.
2. If ambiguous, retrieve candidates with listTasks.
3. Use updateTask with status = closed.
4. Report the result briefly.

---

## Reschedule Flow

When the user asks to move or reschedule a task:

1. Identify the target task.
2. Determine the intended date.
3. Use updateTask with due_date.
4. Report the new due date briefly.

---

## Failure Handling

If update fails:

- state that the update did not complete
- avoid claiming the task was changed
- offer the next safe step only when useful

---

## Completion

Task update is complete when Todoist returns an update result for the intended task.

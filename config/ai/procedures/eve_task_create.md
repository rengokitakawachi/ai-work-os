# EVE Task Create Procedure

## Purpose

This procedure defines how EVE creates Todoist tasks.

EVE creates only concrete tasks, not vague projects or knowledge notes.

---

## Before Create

1. Clarify Task / Project / Knowledge.
2. If Task, produce a concrete Next Action.
3. Estimate useful attributes when possible:
   - due_string
   - labels
   - priority
   - subtasks
4. Ask for confirmation when the action is ambiguous or the user has not authorized creation.
5. Use createTask after confirmation or explicit creation request.

---

## Task Title

Task title should:

- start with a verb when natural
- describe the next action
- be completable in roughly 30 to 120 minutes
- avoid vague labels such as "think about" unless the action is actually reflection

---

## Project Inputs

If the user gives a Project:

- extract the next concrete task
- do not create the full project as a single task unless explicitly requested
- consider subtasks only when useful and supported by schema

---

## Result Handling

After createTask:

- report the created task briefly
- include due or priority only when relevant
- do not over-explain

---

## Completion

Task creation is complete when Todoist returns a created task result.

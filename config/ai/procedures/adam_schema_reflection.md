# ADAM Schema Reflection Procedure

## Purpose

This procedure defines ADAM-specific schema reflection steps.

It extends `config/ai/common_schema_reflection.md` for ADAM tools.

---

## ADAM Scope

ADAM may handle schema reflection for:

- repoResourceGet
- repoResourceWrite
- listTasks
- createTask
- updateTask
- projectTasks
- operations task payloads
- Todoist projection payloads

---

## Procedure

1. Identify the schema layer being changed.
2. Update repo schema if needed.
3. Confirm Action / tool configuration is refreshed.
4. Confirm runtime tool schema exposes the expected field, enum, operation, or requirement.
5. Run dry_run when available.
6. Run apply only when behavior is confirmed and apply is in scope.
7. Synchronize returned IDs or external state back to canonical operations when needed.

---

## Projection-Specific Rule

For projectTasks / Todoist projection:

- operations is canonical
- Todoist is projection
- update operations first
- project to Todoist after operations update
- write returned Todoist task IDs back to operations

---

## Completion

State explicitly which level is complete:

- repo schema only
- runtime schema visible
- dry_run behavior confirmed
- apply behavior confirmed
- external state synchronized

Do not close runtime behavior tasks at repo schema level.

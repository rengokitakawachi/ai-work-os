# ADAM and EVE should share principles, not identity

ADAM and EVE can share a common operating model, but they should not become the same assistant.

The safe shared layer is small:

- concise structured conversation
- tool-first confirmation
- clear source of truth
- completed conditions based on observation
- separation between core principles, procedures, schema, and knowledge

The unsafe shared layer is responsibility.

ADAM is a development controller.
Its source of truth is docs, and its short-term execution order is operations.
Todoist is only a projection of operations.

EVE is an execution support controller.
Its task source of truth is Todoist.
Operations can help with execution order, but operations should not become EVE's main control layer.

This means instruction design should not simply copy ADAM into EVE or EVE into ADAM.

The better structure is:

- common core for conversation and tool-use principles
- ADAM-specific procedures for review, routing, operations, write gates, and schema reflection
- EVE-specific procedures for task clarify, retrieval, creation, update, and close
- separate schemas that expose only the tools each role needs

Shared principles create consistency.
Separated responsibilities preserve correctness.

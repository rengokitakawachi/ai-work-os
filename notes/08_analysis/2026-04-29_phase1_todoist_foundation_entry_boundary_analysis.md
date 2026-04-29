# 2026-04-29 Phase 1 Todoist Foundation Entry Boundary Analysis

## 結論

Phase 1 Todoist foundation の入口として、Todoist service 境界と一覧取得 API は確認できた。

現行の正本実装は `src/services/todoist/client.js` であり、`src/services/todoist.js` は deprecated legacy wrapper として扱う。

Todoist list retrieval は runtime でも動作確認済みであり、Phase 1 の次段は Outlook Calendar read foundation へ進める。

---

## Source references

- `notes/08_analysis/2026-04-28_phase0_remaining_inventory_before_phase1.md`
- `notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md`
- `notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md`
- `src/services/todoist.js`
- `src/services/todoist/client.js`
- `src/services/tasks/service.js`
- `src/services/tasks/projection.js`
- `src/services/tasks/dispatch.js`
- `src/services/tasks/validate.js`
- `api/tasks/index.js`
- `api/tasks/[id].js`
- `api/tasks/project.js`

---

## Confirmed implementation boundary

### API layer

Current task API surface is:

```text
api/tasks/index.js
api/tasks/[id].js
api/tasks/project.js
```

Responsibilities:

- auth
- CORS / preflight
- request id
- method routing
- validation call
- dispatch call
- normalized error response

The API layer remains thin.

### Validation layer

```text
src/services/tasks/validate.js
```

Responsibilities:

- create input validation
- list input validation
- update input validation
- project input validation
- normalized operation task validation for projection

For list retrieval, the supported query fields are:

```text
project_id
section_id
parent_id
label
assignee
status
cursor
limit
```

Important constraint:

```text
status for list supports only open.
```

### Dispatch layer

```text
src/services/tasks/dispatch.js
```

Responsibilities:

- normalize input
- call service / projection usecase
- keep handler logic thin

### Task service layer

```text
src/services/tasks/service.js
```

Responsibilities:

- create task
- update task
- list tasks
- convert task service input to Todoist client input
- normalize upstream errors through task error model

Todoist connection is imported from:

```text
../todoist/client.js
```

### Projection layer

```text
src/services/tasks/projection.js
```

Responsibilities:

- compare previous active tasks and current active tasks
- decide create / update / close / delete / noop
- build Todoist projection payload
- list Todoist tasks from target project
- apply Todoist task IDs when needed

Todoist connection is imported from:

```text
../todoist/client.js
```

---

## Todoist client status

### Current SSOT

```text
src/services/todoist/client.js
```

This client supports:

- createTask
- updateTask
- deleteTask
- listTasks

It also provides:

- normalized config error
- normalized upstream error
- step / resource / action context
- retryable classification for timeout / rate limit / upstream 5xx

This is the correct foundation for Phase 1.

### Legacy wrapper

```text
src/services/todoist.js
```

This file has deprecated header already.

It supports only:

- createTask
- listTasks

It uses simpler error handling and should not be used for new work.

Decision:

```text
Do not delete now.
Keep as deprecated until repo-wide usage and tests are confirmed.
No new references should be added.
```

---

## Runtime list retrieval confirmation

Todoist open task listing was successfully retrieved through the runtime task tool.

Observed result:

- open tasks were returned
- pagination shape included `results` and `next_cursor`
- active operation task `Phase 1 Todoist foundation entry...` was visible
- stale projection mismatch for v0.4 runtime reflection task was corrected by using the actual open Todoist task ID

This confirms that Todoist list retrieval is usable for Phase 1 entry.

---

## Finding: projection ID mismatch risk

During v0.4 runtime reflection close cleanup, the task ID recorded in operations was shorter than the actual Todoist open task ID.

Recorded:

```text
6gVXWw74rqV7H
```

Actual open task ID:

```text
6gVXWw74rqV7H8qH
```

The actual task was closed successfully after listing open tasks and using the full ID.

Implication:

```text
Projection should not assume recorded external.todoist_task_id is always valid.
List-and-match fallback remains useful.
```

This is already aligned with `projection.js`, which can match by task content when no valid ID is present, but future cleanup should consider malformed or truncated external IDs.

---

## Phase 1 list API entry point

The current Phase 1 Todoist list entry point is:

```text
GET /api/tasks
```

Implementation path:

```text
api/tasks/index.js
→ validateList
→ dispatchList
→ tasks/service.listTasks
→ todoist/client.listTasks
→ Todoist /tasks
```

For tool/runtime use, this corresponds to:

```text
listTasks
```

Supported filters are sufficient for Phase 1 start:

- project_id
- section_id
- parent_id
- label
- cursor
- limit
- status=open

---

## What is not yet done

This task did not implement new code.

Not done:

- Outlook Calendar read API
- free/busy calculation
- schedule proposal logic
- Todoist legacy wrapper deletion
- new tests
- response contract refactor

---

## Next implementation candidate

Recommended next Phase 1 implementation task:

```text
Outlook Calendar read foundation の設計と最小 API 入口を確認する
```

Why:

- Phase 1 plan already has Todoist list retrieval working enough to proceed
- The next missing foundation is Outlook予定表の読取
- schedule proposal cannot start until Outlook read / calendar choice / event normalization are fixed

Candidate completed condition:

- current Outlook-related code / config / docs are inventoried
- calendar read endpoint or missing endpoint is identified
- required auth model is identified
- event response shape is proposed
- free/busy calculation prerequisites are listed
- next implementation task is proposed or routed

---

## Decision

Phase 1 can proceed past Todoist foundation entry.

Use:

```text
src/services/todoist/client.js
```

as the Todoist client SSOT.

Keep:

```text
src/services/todoist.js
```

as deprecated legacy until deletion gate is explicitly routed.

Proceed next toward Outlook Calendar read foundation.

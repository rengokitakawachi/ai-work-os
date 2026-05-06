# 2026-05-02 DELTA configured Action read failure diagnosis

## Purpose

DELTA configured GPT で `deltaResourceGet` が runtime-visible だが、actual behavior として `tree / read / bulk` がすべて `ClientResponseError` になる問題を診断する。

This is a blocker diagnosis note, not DELTA v0.6 runtime completion evidence.

---

## Current conclusion

The most likely failure layer is the configured DELTA GPT Action setting, especially authentication or pasted Action configuration.

Reason:

- ADAM runtime successfully read DELTA file using the same backend endpoint, resource, branch, and relative path.
- DELTA runtime failed all read variants with `ClientResponseError`, even when branch was specified.
- Therefore, repo file absence, relative path rule, and backend resource routing are not the primary cause.

---

## Evidence

### ADAM successful backend check

ADAM successfully executed:

```json
{
  "resource": "delta",
  "action": "read",
  "branch": "feature/atlas-pre-delta-foundation",
  "file": "operations/active_operations.md"
}
```

Result:

- success
- resolved path: `systems/delta/operations/active_operations.md`
- branch: `feature/atlas-pre-delta-foundation`
- resource: `delta`
- read_only: true

### DELTA failed runtime checks

DELTA failed:

```json
{
  "resource": "delta",
  "action": "read",
  "branch": "feature/atlas-pre-delta-foundation",
  "file": "operations/active_operations.md"
}
```

```json
{
  "resource": "delta",
  "action": "bulk",
  "branch": "feature/atlas-pre-delta-foundation",
  "files": "operations/active_operations.md\nplan/2026_sharoushi_exam_plan.md\nhistory/daily/2026-05-02.md\nhistory/monthly/2026-05.md\nroadmap/delta_roadmap.md"
}
```

```json
{
  "resource": "delta",
  "action": "tree",
  "branch": "feature/atlas-pre-delta-foundation"
}
```

All returned:

```text
ClientResponseError
Encountered exception: <class 'aiohttp.client_exceptions.ClientResponseError'>.
```

---

## Likely causes

### 1. Missing or incorrect authentication in DELTA GPT Actions

Most likely.

The backend requires bearer auth.

The DELTA Action schema includes:

```yaml
security:
  - bearerAuth: []

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: API Key
```

Configured GPT must set the same API key / bearer token that ADAM uses.

If missing or wrong, the backend returns 401 and GPT may surface it as `ClientResponseError`.

### 2. Wrong pasted schema

Possible.

The correct Action schema file is:

- `systems/delta/config/delta_action_schema.yaml`

Do not paste:

- `systems/delta/config/delta_schema.yaml`
- `systems/delta/config/delta_instruction.md`
- old version schema unless intentionally testing old schema

### 3. Server URL mismatch

Check the Action schema has:

```yaml
servers:
  - url: https://ai-work-os.vercel.app
```

### 4. Privacy/auth configuration mismatch

Configured GPT Action must allow auth headers to be sent.

If GPT Action editor has an authentication setting separate from schema, it must match the backend requirement.

### 5. Hidden 4xx/5xx response body not exposed by DELTA runtime

DELTA only surfaced `ClientResponseError`, not HTTP status/body.

Need a retest asking it to report status/body if available.

---

## Manual check list for configured DELTA GPT

1. Open DELTA GPT configuration.
2. Open Actions.
3. Confirm schema pasted is `systems/delta/config/delta_action_schema.yaml`.
4. Confirm it contains:
   - `openapi: 3.1.0`
   - `servers: https://ai-work-os.vercel.app`
   - operationId `deltaResourceGet`
   - operationId `deltaHistoryWrite`
5. Confirm Authentication is configured.
6. Authentication must be bearer/API key equivalent to ADAM backend auth.
7. Save GPT configuration.
8. Start a new DELTA thread.
9. Re-run minimal read test.

---

## Minimal retest prompt for DELTA

Use this in a new DELTA thread after checking authentication:

```text
DELTA Action authentication and schema were checked.
Run the minimum runtime Action test only.

Call:
resource=delta
action=read
branch=feature/atlas-pre-delta-foundation
file=operations/active_operations.md

Rules:
- Use relative path only.
- Do not write.
- Do not call Todoist.
- If it fails, report any HTTP status, response body, request parameters, and whether the failure looks like auth / routing / backend / unknown.
- Do not treat failure as success.

Output:
- success or failure
- exact parameters used
- status/body if available
- layer judgment: configured Action schema / runtime-visible schema / actual behavior
```

---

## Operational judgment

This issue should remain an Immediate Gate until DELTA configured GPT can successfully read:

```json
{
  "resource": "delta",
  "action": "read",
  "branch": "feature/atlas-pre-delta-foundation",
  "file": "operations/active_operations.md"
}
```

Do not execute DELTA operations shape proposal or DELTA runtime confirmation fixtures using DELTA runtime until this is resolved.

ADAM may continue repo-side design work only if it clearly labels it as ADAM-side / repo-side and does not claim DELTA runtime confirmation.

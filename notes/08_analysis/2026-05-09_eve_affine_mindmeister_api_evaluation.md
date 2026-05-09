# EVE future tool evaluation: AFFiNE vs MindMeister API suitability

status: research_candidate
created_at: 2026-05-09
owner: ADAM
scope: EVE future feature / external visual-thinking and knowledge-workspace tool evaluation

---

## Conclusion

AFFiNE is attractive as a future EVE knowledge workspace candidate, but it should not be treated as an implementation-ready external integration target yet.

For EVE, API / automation support is a hard adoption gate. If EVE must create, update, sync, and read back user workspaces programmatically, AFFiNE is currently riskier than tools with established external APIs.

Short-term judgment:

- Keep MindMeister as the safer candidate for simple mind-map creation / sharing / presentation workflows.
- Keep AFFiNE as a research candidate for a broader EVE knowledge canvas / self-hosted workspace concept.
- Do not promote AFFiNE to implementation candidate until API / SDK / export-import fixtures are confirmed.

---

## Background

The user noted that EVE future features currently assume MindMeister usage, and asked whether AFFiNE would be more suitable after reading:

- https://gigazine.net/news/20260509-affine/

Initial evaluation:

- MindMeister is narrower but purpose-built for mind maps.
- AFFiNE is broader: docs, whiteboard, database, local-first / self-host oriented workspace.
- EVE's long-term direction may fit AFFiNE conceptually if EVE becomes a knowledge workspace / thinking OS.
- However, EVE integration requires external automation. Without stable external API support, AFFiNE cannot be treated as a practical integration target.

---

## API / integration findings

Current risk assessment:

- AFFiNE appears to have internal server API / WebSocket / GraphQL layers, especially for app and self-host operation.
- AFFiNE self-host docs describe a Node.js application server handling API requests, WebSocket connections, and web interface traffic.
- Public REST API support is not clearly established as a stable official integration surface.
- A GitHub issue requesting REST API support was closed as not planned.
- There are community references to GraphQL usage and a third-party MCP server, but these are not enough for EVE production integration without fixture confirmation.
- Third-party MCP / unofficial GraphQL reliance creates maintenance and compatibility risk.

Working judgment:

AFFiNE may be usable manually or as a self-hosted workspace, but EVE should not depend on it for automated creation / update / sync until official or runtime-confirmed integration paths are verified.

---

## Comparison for EVE

### MindMeister

Best fit:

- Mind-map-first workflows
- Brainstorming
- Simple visual structuring
- Sharing / presentation
- User-facing maps where EVE exports or guides the user

Strength:

- Narrow, stable mental model
- Purpose-built for mind maps
- Likely lower integration complexity if existing export/share workflow is enough

Weakness:

- Not a full knowledge workspace
- Less suitable for EVE as a long-term structured memory / database / canvas environment

### AFFiNE

Best fit:

- Knowledge workspace
- Docs + canvas + database integration
- Self-hosted or local-first future direction
- EVE as a broader thinking / planning / knowledge management layer

Strength:

- Better conceptual fit for EVE if EVE becomes a user knowledge operating layer
- Supports richer workspace model than a mind-map-only tool
- Self-host direction may align with data ownership goals

Weakness:

- External API / automation maturity is unclear
- Official REST API does not appear to be available as a stable adoption surface
- GraphQL / MCP options need fixture verification
- Browser extension / ecosystem stability should not be assumed

---

## Adoption gate for AFFiNE

AFFiNE must stay in research status until the following are confirmed:

1. Stable official API docs exist, or a supported integration surface is confirmed.
2. EVE can create documents / pages / canvases programmatically.
3. EVE can update existing documents / canvases without manual intervention.
4. EVE can read back content and verify write success.
5. Export / import formats are stable enough for backup and migration.
6. Auth can be controlled through token / service account model.
7. Self-host and cloud behavior are either equivalent or explicitly separated.
8. A fixture confirms create → update → read-back → export.
9. Data model is stable enough to avoid frequent breakage.
10. Permission / privacy / backup behavior is acceptable for EVE use.

If these fail, AFFiNE may still be recommended as a manual workspace, but not as an EVE automation backend.

---

## Recommended next disposition

Create or route an EVE future candidate:

- title: `Evaluate AFFiNE as EVE knowledge canvas candidate only after API fixture`
- route: future / design candidate
- blocker: `AFFiNE API / SDK / export-import fixture not confirmed`
- do not execute implementation until blocker is cleared

Suggested candidate note:

```text
EVE future candidate: AFFiNE knowledge canvas evaluation

Decision: keep as research candidate, not implementation candidate.
Reason: broader workspace fit is strong, but stable external API / automation path is unconfirmed.
Gate: create/update/read-back/export fixture must pass before adoption.
Fallback: continue MindMeister for mind-map-first usecases.
```

---

## Current ADAM judgment

If EVE only needs visual mind maps, MindMeister is currently more suitable.

If EVE needs a long-term knowledge workspace, AFFiNE is conceptually more suitable, but blocked by API uncertainty.

Therefore:

- `MindMeister`: keep for short-term / low-risk visual mind-map workflows.
- `AFFiNE`: keep as research candidate, blocked by API fixture.
- Do not replace MindMeister with AFFiNE yet.

# 2026-04-30 Phase 0 hardening next resume handover

## Positioning

This handover is a restart entry point.

This handover is not the execution source of truth.

Execution SSOT is:

```text
notes/04_operations/active_operations.md
```

Do not execute directly from this handover.

On restart, read `active_operations` first and decide the next action from the current canonical state.

---

## First read list

Read in this order:

1. `notes/04_operations/active_operations.md`
2. `notes/04_operations/next_operations.md`
3. `notes/01_issues/idea_log.md`
4. `notes/07_reports/daily/2026-04-29.md`
5. `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
6. Source refs for the current active task:
   - `notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md`
   - `notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md`

Optional if continuing branch / subsystem planning:

- `notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md`
- `systems/delta/roadmap/delta_roadmap.md` on `feature/atlas-pre-delta-foundation`
- `systems/delta/operations/active_operations.md` on `feature/atlas-pre-delta-foundation`
- `systems/delta/plan/2026_sharoushi_exam_plan.md` on `feature/atlas-pre-delta-foundation`

---

## Current canonical snapshot

### active_operations

Current `active_operations` sha at handover creation:

```text
b6690bd14634e7849053dd69b5052124cea28993
```

Immediate Gates:

```text
none
```

Current Day0 begins on 2026-04-30.

Expected resume task:

```text
issue routing completed condition の継続観測項目を weekly review 向けに整理する
```

Completed condition:

```text
- issue routing の単発確認済み項目を列挙する
- 継続観測が必要な項目を列挙する
- weekly review で確認できる形の checklist draft を作る
```

Next active task after that:

```text
issue routing completed condition を active / next / future 判断チェックに落とす
```

---

## Current focus

Phase 0 hardening continues.

Main focus is to make issue routing completion conditions usable by review / rolling.

Current execution priority remains:

```text
issue routing → intake routing → design routing → review boundary → runtime reflection → readiness / Phase 1 re-entry criteria
```

Phase 1 Outlook read foundation remains deferred until Phase 1 re-entry criteria is整理済み.

---

## This thread actions completed

### Runtime / repo hardening

- repoResource docs / notes resource-prefixed path normalization was fixed and runtime-confirmed.
- DELTA `systems/delta/` prefixed bulk/read normalization was fixed and runtime-confirmed.
- DELTA GPT runtime-visible bulk read was confirmed on `feature/atlas-pre-delta-foundation` for:
  - `roadmap/delta_roadmap.md`
  - `plan/2026_sharoushi_exam_plan.md`
  - `operations/active_operations.md`
  - `history/2026-04.md`
- ADAM docs update proposal guard was added to `config/ai/adam_instruction.md` and runtime-confirmed.
- Docs update proposals must now include target file, update purpose, complete proposed content in code block, and post-update sha request unless the user explicitly says full text is unnecessary.

### docs / roadmap

- `docs/05_roadmap.md` was updated.
- Phase 0 is now clarified as a common operating model foundation, not light preparation.
- `## 現在地` was removed from docs because current progress belongs in notes / operations / review.
- docs/05 sha after update:

```text
61abe199ee809b0a6ce51aed0f632edd4fd82601
```

### daily review

- 2026-04-29 daily review was executed.
- Active operations were rerolled to start from 2026-04-30.
- Todoist projection was updated for 13 active tasks.
- Daily report was created:

```text
notes/07_reports/daily/2026-04-29.md
sha: f77437f7ffd3c2f9ffb575bc593677e037ddd8ce
```

- Content draft was created:

```text
notes/09_content/drafts/2026-04-29_daily_review_phase0_hardening.md
sha: 6cbc1ad0bb19e205d295341d943fb5df13dacb89
```

- Completed task archive append was created:

```text
notes/04_operations/archive_operations_2026-04-29_daily_review_append.md
sha: b9e2defea2c6f1839e5b7e396c576f7c4ac699f1
```

### New candidates routed, not executed

The following were added to issue / next_operations and must not be executed unless active_operations is rerolled or updated to include them.

1. DELTA v0.6 operations Todoist projection
   - issue: `20260430-031`
   - design: `notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md`
   - next task: `DELTA v0.6 operations を Todoist execution view へ投影する`

2. Studyplus API posting / retrieval feasibility
   - issue: `20260430-032`
   - current conclusion: posting may be possible via approved Studyplus API / SDK; retrieval of existing study records is not confirmed; do not assume Studyplus can be DELTA history source.

3. DELTA foundation main integration preparation
   - issue: `20260430-033`
   - next task: `DELTA foundation を main に統合する準備をする`
   - rationale: DELTA is operational on `feature/atlas-pre-delta-foundation`; foundation should be prepared for main integration before stacking v0.6.

4. ATLAS systems folder design
   - issue: `20260430-034`
   - next task: `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`
   - key constraint: ATLAS primary executor is Claude; ADAM role is controller / integration / consistency; ATLAS outputs are verification evidence, not execution SSOT.

---

## next_operations snapshot

Current `next_operations` sha at handover creation:

```text
7460fbe12bf0af21a33215133d2e215730b8ef57
```

Current next order:

```text
1. DELTA foundation を main に統合する準備をする
2. ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
3. DELTA v0.6 operations を Todoist execution view へ投影する
4. Phase 1 Outlook Calendar API の読取設計を整理する
5. legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う
```

These are candidates only. They are not executable until active_operations is rerolled or updated.

---

## Important guardrails

- Execute only tasks in `notes/04_operations/active_operations.md`.
- New conversation candidates must be routed before execution.
- Routing / rolling must check dependency / blocker gates first.
- Immediate Gates block dependent active tasks until completed.
- Manual / external / runtime reflection that is prerequisite to later work should be an Immediate Gate.
- Completed condition must close by observation.
- A note / report / diff / code / test / schema file existing is not enough for completion.
- update before write: read target first.
- create before write: check for same or nearby file first.
- write before update: present Write Gate.
- write after update: read-back and confirm sha.
- docs are spec SSOT. Do not make spec decisions without reading docs.
- docs update proposals must include full proposed content in code block unless explicitly waived.
- repo schema / configured Action schema / runtime-visible schema / actual behavior are distinct.
- Runtime behavior tasks are not complete until behavior is observed.
- Todoist is projection, not execution SSOT.
- Handover is restart entry point, not execution SSOT.

---

## Risks / caveats

- `notes/01_issues/idea_log.md` currently appears to contain recent append content rather than the full historical log in the latest read. Treat it carefully before future updates; read-back and verify context before writing.
- Studyplus API retrieval remains unconfirmed. Do not design DELTA history ingestion around Studyplus until official read API availability is confirmed.
- DELTA main integration is important but still in `next_operations`, not active.
- ATLAS `systems/atlas/` should not be created as an empty structural move without first fixing responsibility boundaries because ATLAS primary executor is Claude.
- Day6 in active_operations is intentionally light as a Phase 1 re-entry boundary day.

---

## Expected next action in new thread

1. Read `notes/04_operations/active_operations.md`.
2. Confirm Immediate Gates are still `none`.
3. Start the head active task:

```text
issue routing completed condition の継続観測項目を weekly review 向けに整理する
```

4. Read its source refs:

```text
notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md
notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md
```

5. Produce a weekly-review-ready checklist draft separating:

```text
- single-run confirmed items
- continuing observation items
- weekly review checklist items
```

Do not jump to DELTA v0.6, DELTA main integration, ATLAS folder creation, or Studyplus work unless operations are rerolled or user explicitly asks to route and update operations.

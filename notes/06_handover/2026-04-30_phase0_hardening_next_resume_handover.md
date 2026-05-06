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

## 概要

このセッションの目的は、Phase 0 hardening の継続、docs / runtime / operations の整合回復、DELTA / ATLAS / Studyplus など新規候補の routing、2026-04-29 daily review、そして新スレ再開用 handover の作成だった。

到達点は以下。

- `docs/05_roadmap.md` に Phase 0 foundation の位置づけを反映した
- `## 現在地` は時間で変わる進捗情報として docs から除外した
- repoResource / DELTA bulk path normalization を runtime confirmation まで閉じた
- ADAM docs update proposal guard を instruction / runtime に反映した
- 2026-04-29 daily review を完了した
- 新規候補を issue / next_operations に登録した
- 新スレ再開用 handover を作成した

---

## 成功（Success）

- repoResource docs / notes resource-prefixed path normalization を修正し、runtime で確認した
- DELTA `systems/delta/` prefixed bulk/read normalization を修正し、runtime で確認した
- DELTA GPT runtime-visible bulk read を `feature/atlas-pre-delta-foundation` で確認した
- ADAM docs update proposal guard を `config/ai/adam_instruction.md` に追加し、runtime behavior を確認した
- docs 更新提案時に target file / update purpose / complete proposed content code block / post-update sha request を出す挙動を確認した
- `docs/05_roadmap.md` の Phase 0 foundation 反映が完了した
- 2026-04-29 daily review で active_operations を 2026-04-30 起点に reroll した
- Todoist projection 13件を更新した
- DELTA v0.6 / Studyplus / DELTA main integration / ATLAS folder の候補を active に横入りさせず issue / next に登録した

---

## 判明事項（Findings）

- repoResource bulk の主問題は newline separator ではなく、`docs/` / `notes/` / `systems/delta/` など resource-prefixed path normalization gap だった
- DELTA はすでに運用段階に入っており、v0.6 を積む前に main integration preparation が必要
- Studyplus API は投稿可能性はあるが、既存学習記録の取得 API は未確認
- ATLAS は DELTA と同型ではなく、Claude を primary executor とする verification subsystem として扱うべき
- docs の `現在地` は時間で変わる進捗情報であり、docs ではなく notes / operations / review に置くべき
- branch は恒久的な別正本ではなく、main へ統合するための開発空間として扱うのが自然

---

## 失敗 / 未解決（Issues）

- handover 作成前に `notes/02_design/handover_template.md` を読まなかった
- その後の補正で `<<APPEND>>` 形式により handover 本文が補足だけになる事故が発生した
- このファイルは本更新で完全版として復元済み
- docs update proposal guard は同種ミス3回目を受けて追加したもので、再発防止として runtime confirmation まで行った
- `notes/01_issues/idea_log.md` は最新 read 上で recent append 中心に見えるため、次回更新時は特に慎重に read-back する
- Studyplus の read API 有無は未確認
- DELTA main integration / ATLAS systems folder / DELTA v0.6 projection は next_operations 候補であり、まだ active ではない

---

## Current canonical snapshot

### active_operations

Current `active_operations` sha at handover restoration:

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

## Current focus

Phase 0 hardening continues.

Main focus is to make issue routing completion conditions usable by review / rolling.

Current execution priority remains:

```text
issue routing → intake routing → design routing → review boundary → runtime reflection → readiness / Phase 1 re-entry criteria
```

Phase 1 Outlook read foundation remains deferred until Phase 1 re-entry criteria is整理済み.

---

## 次のアクション（Next Actions）

新スレでは handover から直接実行せず、まず `notes/04_operations/active_operations.md` を読む。

そのうえで、Immediate Gates が `none` のままなら、次を実行する。

```text
issue routing completed condition の継続観測項目を weekly review 向けに整理する
```

この task では以下を分けて整理する。

```text
- single-run confirmed items
- continuing observation items
- weekly review checklist items
```

Do not jump to DELTA v0.6, DELTA main integration, ATLAS folder creation, or Studyplus work unless operations are rerolled or user explicitly asks to route and update operations.

---

## New candidates routed, not executed

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

Current `next_operations` sha at handover restoration:

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

## 関連docs

- `docs/05_roadmap.md`
- `docs/10_repo_resource_api.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`

---

## 関連code

- `config/ai/adam_instruction.md`
- `src/services/repo-resource/common.js`
- `src/services/delta-resource.js`
- `src/services/tasks/projection.js`
- `api/repo-resource.js`

---

## 関連notes

- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/01_issues/idea_log.md`
- `notes/07_reports/daily/2026-04-29.md`
- `notes/04_operations/archive_operations_2026-04-29_daily_review_append.md`
- `notes/09_content/drafts/2026-04-29_daily_review_phase0_hardening.md`
- `notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/08_analysis/2026-04-21_issue_routing_operations_candidate_rolling_connection_observation.md`
- `notes/08_analysis/2026-04-21_issue_routing_keep_future_archive_operational_validity.md`

---

## 状態サマリ

- API:
  - repoResource docs / notes prefix normalization: runtime confirmed
  - DELTA systems/delta prefix normalization: runtime confirmed
  - DELTA GPT runtime-visible bulk: confirmed
  - Studyplus API: posting possible by public info, retrieval unconfirmed
- docs整合:
  - `docs/05_roadmap.md` Phase 0 foundation reflection complete
  - `## 現在地` removed from docs
  - docs update proposal guard runtime confirmed
- notesフロー:
  - daily review complete
  - active_operations rerolled to 2026-04-30
  - next_operations updated with DELTA / ATLAS candidates
  - new candidates are routed, not executable until active reroll/update

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

## 引き継ぎプロンプト

```text
この handover を読み込んでください。ただし handover は restart entry point であり execution SSOT ではありません。

最初に notes/04_operations/active_operations.md を読み、Immediate Gates と先頭 task を確認してください。

その後、関連 docs / notes を取得し、現状を把握してから、active_operations の先頭 task である `issue routing completed condition の継続観測項目を weekly review 向けに整理する` から作業を再開してください。

DELTA v0.6、DELTA main integration、ATLAS folder、Studyplus は next / issue に登録済みの候補であり、active_operations に入るまでは実行しないでください。
```

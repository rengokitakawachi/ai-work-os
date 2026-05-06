# 2026-04-30 runtime reflection and repo recovery handover

## Positioning

This handover is a restart entry point.

This handover is not the execution source of truth.

Execution SSOT is:

    notes/04_operations/active_operations.md

Todoist is projection only.

Do not execute directly from this handover.

On restart, read `active_operations` first and decide the next action from the current canonical state.

---

## 概要

このセッションの目的は、APPEND 起因の正本欠損リスクを復旧し、repo history / show / grep capability を整備し、GPT-5.5 最適化後に弱体化した ADAM instruction / knowledge / docs10 の整合を回復することだった。

到達点:

- `notes/01_issues/idea_log.md` の APPEND 起因欠損は復元済み
- notes 配下の追加 APPEND 破損候補は direct grep で調査済み
- `repoResourceGet resource=repo` に history / show / compare / diff / search / grep を実装済み
- repo history / show / grep は actual behavior 確認済み
- `config/ai/adam_instruction.md` に regression prevention gates を復元済み
- `config/ai/adam_knowledge.md` に詳細 procedure を追加済み
- `config/ai/adam_schema.yaml` に repo actions を反映済み
- `docs/10_repo_resource_api.md` に repo read operations と update / append semantics を反映済み
- ただし configured Action schema / runtime-visible schema / ADAM runtime behavior confirmation は未完

影響した層:

- docs: `docs/10_repo_resource_api.md`
- notes: analysis / operations / handover
- code: repo-resource API / service
- config: ADAM instruction / knowledge / schema
- runtime: 未確認 gate あり
- Todoist: 今回は projection 更新なし

---

## 成功（Success）

### Recovery / data integrity

- `notes/01_issues/idea_log.md` は復元済み
- 復元後 sha: `b83f8b96743496c71834244b0a69131ae9c89065`
- `<<APPEND>>` marker は issue log から除去済み
- `20260326-003` から `20260430-034` まで復元済み
- `20260403-004` / `20260409-014` は repo history 上で内容確認できなかったため推測補完していない

### APPEND damage scan

`repoResourceGet resource=repo action=grep` により `notes/` 配下を層別に direct grep した。

検索語:

    <<APPEND>>

結果:

- `notes/00_inbox/`: 0件
- `notes/01_issues/`: 0件
- `notes/02_design/`: 0件
- `notes/03_plan/`: 0件
- `notes/04_operations/`: 0件
- `notes/05_decisions/`: 0件
- `notes/06_handover/`: 1件
- `notes/07_reports/`: 0件
- `notes/08_analysis/`: 4件
- `notes/09_content/`: 0件
- `notes/10_logs/`: 0件
- `notes/80_future/`: 0件
- `notes/99_archive/`: 0件

検出された 5 件は事故説明または再発防止ルール本文であり、未復元の APPEND 断片ではない。

### Repo capability

実装済み:

- `repoResourceGet resource=repo action=history`
- `repoResourceGet resource=repo action=show`
- `repoResourceGet resource=repo action=compare`
- `repoResourceGet resource=repo action=diff`
- `repoResourceGet resource=repo action=search`
- `repoResourceGet resource=repo action=grep`

actual behavior confirmed:

- `history`
- `show`
- `grep`

主な更新済み code:

- `src/services/repo-resource/repo.js`
- `api/repo-resource.js`

### ADAM instruction / knowledge restoration

`config/ai/adam_instruction.md` に復元済み:

- Tool Result Integrity gate
- search 0件を対象不在の証明にしない rule
- dry_run / apply / repo schema / runtime-visible schema / actual behavior の混同禁止
- pseudo APPEND 禁止
- read → 全文合成 → update rule
- Single vs Continuous Confirmation gate
- Problem Handling gate
- Procedure Start Guard
- Rule Placement Guard
- Handover Trigger Guard
- Docs Update Proposal Guard

`config/ai/adam_knowledge.md` に追加済み:

- Tool Result Integrity Procedure
- Single vs Continuous Confirmation Procedure
- Problem Handling Procedure
- Regression Analysis Procedure
- Rule Placement Procedure
- Handover Procedure
- Schema Reflection Procedure

確認済み sha:

- `config/ai/adam_instruction.md`: `10d68214519cdef8a709c2d8e18316ca36729b62`
- `config/ai/adam_knowledge.md`: `ca31da126631687d864d5b48359fd2b653caec9d`

### Schema / docs reflection

`config/ai/adam_schema.yaml` 更新済み:

- sha: `cd4c5f51f95f88c20393a8bf9cc66a992c0e0ca0`
- repoResourceGet に `repo` resource と `history / show / compare / diff / search / grep` を反映済み

`docs/10_repo_resource_api.md` 更新済み:

- sha: `c6a5594032fd40f9f64c2766ca3aa6c336f8b8e2`
- repo resource を create_branch のみから repository-level read operation まで拡張済み
- repo history / show / compare / diff / search / grep を反映済み
- repo search false negative 注意を反映済み
- repo grep 優先ルールを反映済み
- `update と append の扱い` を API contract として一般化済み
- APPEND 事故の経緯ではなく、full replacement / pseudo directive 非解釈として記載済み

---

## 判明事項（Findings）

### GPT-5.5 最適化後の regression

2026-04-27 の instruction 圧縮で、旧 instruction にあった重要な実行前 gate が一部弱体化していた。

境界 commit:

- 最適化前基準: `c68a3d4...` / Add runtime schema confirmation rule
- 圧縮開始: `0ae5650...` / compress ADAM instruction into core and procedure references
- 一時統合: `34b03a3...` / make integrated ADAM instruction canonical
- 再圧縮: `539ac62...` / minimize ADAM instruction and move details to knowledge
- 復元 commit: `809ab11...` / Restore regression prevention gates to ADAM instruction

原因判断:

- instruction を短くする方針自体は妥当
- ただし常時拘束すべき実行前 gate まで knowledge / procedure 側へ逃がしすぎていた
- その結果、template 未読 handover、docs 全文提示漏れ、Rule Placement 判断ミス、pseudo APPEND 誤用、runtime/schema 層混同が起きやすくなった

### APPEND 事故の本質

`repoResourceWrite(action=update)` は full replacement である。

API は `<<APPEND>>` を append directive として解釈しない。

append が必要な場合は、正式 append action が runtime-confirmed されていない限り、必ず read → 全文合成 → update で行う。

### repo/search と repo/grep の違い

`repo/search` は GitHub code search API 依存で false negative があり得る。

重要な復旧調査、欠落確認、regression analysis では `repo/grep`、`history`、`show`、direct read を優先する。

### docs / code / schema / runtime の境界

repo file 更新は runtime 反映ではない。

以下は別層として扱う:

- repo schema
- configured Action schema
- runtime-visible schema
- actual tool behavior
- ADAM GPT runtime behavior

---

## 失敗 / 未解決（Issues）

### このスレッドでのミス

- Handover template を見ずに handover を作成しようとした過去ミスが再確認された
- docs 更新 proposal で nested code block を使い、外側 code block から一部がはみ出た
- instruction ではなく knowledge に再発防止を置こうとした判断ミスがあった
- APPEND pseudo directive を API directive と誤認した事故があった
- repo/search の false negative を最初に完全保証のように扱いかけた

### 未解決の外部確認

- ADAM GPT editor / runtime に最新 instruction / knowledge が反映済みかは未確認
- ADAM Action schema に `adam_schema.yaml` 最新版が configured Action として反映済みかは未確認
- runtime-visible schema に `repo / history / show / compare / diff / search / grep` が表示されるかは未確認

### runtime 未確認項目

- 新規 ADAM chat で Handover Trigger Guard が効くか
- 新規 ADAM chat で Rule Placement Guard が効くか
- 新規 ADAM chat で pseudo APPEND 禁止が効くか
- 新規 ADAM chat で Tool Result Integrity / Single vs Continuous / Problem Handling gate が効くか
- runtime-visible schema で repoResourceGet action enum に history / show / compare / diff / search / grep が見えるか

### next / issue に登録済みだが未実行の候補

`next_operations` には以下が残っている:

- `repo history / show / grep の docs・schema・runtime reflection を完了する`
- `DELTA foundation を main に統合する準備をする`
- `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`
- `DELTA v0.6 operations を Todoist execution view へ投影する`
- `Phase 1 Outlook Calendar API の読取設計を整理する`
- `legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う`

注意:

- next_operations は candidates only
- active_operations に入るまで実行しない

---

## Current canonical snapshot

This snapshot is informational only.

This snapshot is not the execution source of truth.

Execution SSOT:

    notes/04_operations/active_operations.md

Current active_operations sha:

    30ea54597adae110095ae521d7c861190bab2c64

Immediate Gates:

- none

Current Day0:

1. `ADAM instruction 最新変更の runtime 反映確認を行う`
2. `repo history / show / grep の docs 反映案を作る`
3. `issue routing completed condition の継続観測項目を weekly review 向けに整理する`
4. `issue routing completed condition を active / next / future 判断チェックに落とす`

Expected resume task:

    ADAM instruction 最新変更の runtime 反映確認を行う

Expected resume task completed_condition:

- repo の `config/ai/adam_instruction.md` 最新 sha を確認する
- configured ADAM GPT editor / runtime に反映済みかを区別する
- runtime-visible behavior として、handover template 必読、Rule Placement Guard、擬似 APPEND 禁止を確認する最小プロンプトを作る
- 必要なら manual reflection gate として未完了状態を明示する
- runtime behavior confirmation が終わるまで completed にしない

Important nuance:

- `repo history / show / grep の docs 反映案を作る` は active Day0 に残っているが、docs10 本体はすでに人間反映済みで read-back confirmed
- 次回は active_operations の stale state を見て、completed_condition のどこまで閉じたかを判断し、必要なら daily review / reroll で整理する

---

## First read list

1. `notes/04_operations/active_operations.md`
2. `notes/04_operations/next_operations.md`
3. `notes/06_handover/2026-04-30_runtime_reflection_and_repo_recovery_handover.md`
4. `config/ai/adam_instruction.md`
5. `config/ai/adam_knowledge.md`
6. `config/ai/adam_schema.yaml`
7. `docs/10_repo_resource_api.md`
8. `notes/08_analysis/2026-04-30_issue_log_append_overwrite_regression_analysis.md`
9. `api/repo-resource.js`
10. `src/services/repo-resource/repo.js`

---

## Current focus

Current focus is runtime reflection and execution safety recovery after APPEND/data-loss regression.

Phase 0 hardening continues, but the immediate priority is not to proceed with normal Day0 routing tasks until the instruction / schema / docs reflection gates are interpreted correctly.

Phase 1 remains deferred until Phase 0 re-entry criteria are整理済み.

---

## 次のアクション（Next Actions）

Do not execute from this handover without reading active_operations.

Expected next action:

1. Read `notes/04_operations/active_operations.md`
2. Confirm current Day0 head task
3. Treat `ADAM instruction 最新変更の runtime 反映確認を行う` as the expected resume task if still current
4. Create a minimal runtime confirmation prompt for new ADAM runtime covering:
   - handover template must be read before handover
   - Rule Placement Guard
   - pseudo APPEND prohibition
   - Tool Result Integrity
   - Single vs Continuous Confirmation
   - Problem Handling gate
5. Separately confirm runtime-visible schema for repo actions:
   - resource includes `repo`
   - action includes `history / show / compare / diff / search / grep`
   - `query` / `path` or fallback `file` / `files` behavior is understood
6. If runtime confirmation is completed, mark only the observed parts as complete
7. Do not mark configured Action / runtime-visible schema as complete from repo file updates alone

---

## New candidates routed, not executed

### `repo history / show / grep の docs・schema・runtime reflection を完了する`

Location:

- `notes/04_operations/next_operations.md`

Why not directly executed:

- It is a broader reflection completion task spanning docs, schema, configured Action, runtime-visible schema, and actual behavior
- Parts have been completed during this thread, but operations has not yet been rerolled / reviewed to close or restructure it

Do not execute if:

- It is not in active_operations
- runtime reflection has not been isolated from repo/doc/schema reflection

### `DELTA foundation を main に統合する準備をする`

Location:

- `notes/04_operations/next_operations.md`

Why not directly executed:

- DELTA is important but not current active Day0 head
- main integration needs a separate preparation gate

Do not execute if:

- Phase 0 hardening / runtime recovery gates are still open and this is not active

### `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`

Location:

- `notes/04_operations/next_operations.md`

Why not directly executed:

- ATLAS is a special subsystem with Claude as primary executor
- Needs design boundary before folder creation

Do not execute if:

- It has not been moved into active_operations by reroll

### `DELTA v0.6 operations を Todoist execution view へ投影する`

Location:

- `notes/04_operations/next_operations.md`

Why not directly executed:

- It is useful for study execution visibility but not current active
- Todoist is projection; DELTA operations remains SSOT

Do not execute if:

- DELTA foundation main integration priority has not been evaluated

---

## next_operations snapshot

Current next_operations sha:

    37d7e7b00ee564e35ad634084d65c1aa4b2638b2

Current next order:

1. `repo history / show / grep の docs・schema・runtime reflection を完了する`
2. `DELTA foundation を main に統合する準備をする`
3. `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`
4. `DELTA v0.6 operations を Todoist execution view へ投影する`
5. `Phase 1 Outlook Calendar API の読取設計を整理する`
6. `legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う`

These are candidates only.

Do not execute any next_operations item until it is moved into active_operations by routing / rolling.

---

## 関連docs

- `docs/10_repo_resource_api.md`
- `docs/11_doc_style.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`
- `docs/05_roadmap.md`

---

## 関連code

- `api/repo-resource.js`
- `src/services/repo-resource/repo.js`
- `src/services/repo-resource/common.js`
- `src/services/repo-resource/notes.js`
- `config/ai/adam_instruction.md`
- `config/ai/adam_knowledge.md`
- `config/ai/adam_schema.yaml`

---

## 関連notes

- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/08_analysis/2026-04-30_issue_log_append_overwrite_regression_analysis.md`
- `notes/06_handover/handover_template.md`
- `notes/06_handover/2026-04-30_phase0_hardening_next_resume_handover.md`
- `notes/01_issues/idea_log.md`

---

## 状態サマリ

### API

- repo history / show / compare / diff / search / grep implemented
- history / show / grep actual behavior confirmed
- search has known false negative risk
- grep is preferred for recovery / missing-fragment investigation

### docs整合

- `docs/10_repo_resource_api.md` reflected
- update / append semantics generalized into API contract
- docs10 read-back confirmed with sha `c6a5594032fd40f9f64c2766ca3aa6c336f8b8e2`

### notesフロー

- issue_log recovered
- APPEND regression analysis saved
- active_operations includes reflection recovery tasks at Day0 head
- next_operations includes broader repo reflection follow-up candidates

### code / runtime

- repo code updated
- repo schema updated
- configured Action schema reflection pending
- runtime-visible schema confirmation pending
- ADAM runtime behavior confirmation pending

### Todoist projection

- No Todoist projection update was performed in this handover creation
- Existing active_operations tasks still contain Todoist task IDs for older Phase 0 tasks
- Todoist remains projection only

---

## Important guardrails

- Execute only tasks in `notes/04_operations/active_operations.md`.
- New conversation candidates must be routed before execution.
- Immediate Gates block dependent active tasks until completed.
- Completed condition must close by observation.
- A note / report / diff / code / test / schema file existing is not enough for completion.
- update before write: read target first.
- create before write: check for same or nearby file first.
- write before update: present Write Gate.
- write after update: read-back and confirm sha.
- docs are spec SSOT. Do not make spec decisions without reading docs.
- repo schema / configured Action schema / runtime-visible schema / actual behavior are distinct.
- Runtime behavior tasks are not complete until behavior is observed.
- Todoist is projection, not execution SSOT.
- Handover is restart entry point, not execution SSOT.
- Do not use `<<APPEND>>` or any pseudo directive in repo write content.
- If append is needed, use read → full-content merge → update unless a real append action is implemented and runtime-confirmed.
- search 0件 is not proof of absence. Use grep / history / show / direct read for important recovery checks.
- Do not nest code blocks inside a docs full-content proposal.
- For docs update proposals, output the complete proposed content unless user explicitly says full text is unnecessary.

---

## Risks / caveats

- This handover is a snapshot; it may be stale after any operations update.
- active_operations Day0 still contains `repo history / show / grep の docs 反映案を作る`, but docs10 has already been human-reflected and read-back confirmed. Next thread must decide whether this task is now complete or needs restructuring, based on active_operations and completed_condition.
- instruction / knowledge repo files are updated, but this chat began before those runtime changes could be fully trusted as new ADAM runtime behavior.
- configured Action schema is not directly observable unless the GPT editor / runtime tool schema reflects it.
- runtime-visible schema and actual behavior are distinct. Do not complete schema reflection from actual behavior alone.
- repo/search false negatives are known; use repo/grep for high-stakes checks.
- next_operations includes high-priority DELTA / ATLAS tasks, but they are not executable until active.
- Day0 capacity is overloaded because safety recovery tasks were inserted above normal Phase 0 hardening tasks.

---

## 引き継ぎプロンプト

この handover を読み込んでください。ただし handover は restart entry point であり execution SSOT ではありません。

最初に `notes/04_operations/active_operations.md` を読み、Immediate Gates と先頭 task を確認してください。

その後、関連 docs / notes / code を取得し、現状を把握してから、active_operations の先頭 task から作業を再開してください。

handover に書かれた expected resume task は参考情報です。実行判断は必ず active_operations を正としてください。

特に確認すること:

1. `ADAM instruction 最新変更の runtime 反映確認を行う` がまだ active Day0 先頭か確認する
2. instruction / knowledge / schema / docs10 の repo reflection は確認済みだが、runtime behavior confirmation は未完であることを区別する
3. `repoResourceGet` runtime-visible schema に repo / history / show / compare / diff / search / grep が見えるか確認する
4. 新 ADAM runtime が Handover Trigger Guard / Rule Placement Guard / pseudo APPEND 禁止 / Tool Result Integrity を守れるか確認する
5. `repo history / show / grep の docs 反映案を作る` は docs10 反映済みのため、completed_condition を観測して完了または再構成を判断する

Do not execute from this handover without reading active_operations.

# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-05-15 ADAM Phase 0 早期完了優先）

User confirmed DELTA is operating without major trouble and ADAM Phase 0 should be completed early.

Decision:

- `現在の inbox を一回整理する` was promoted from next to active as the intake routing operational fixture.
- `DELTA chapter-only normalization fixture を実行する` was deferred from active back to next because it is useful but not the current Phase 0 blocker.
- Design routing / report hardening / handover latest index were promoted into active as Phase 0 completion candidates.

Evidence:

- `notes/08_analysis/2026-05-15_adam_only_phase0_routing_maturity_matrix.md`
- `notes/04_operations/active_operations.md`

---

## 再評価結果（2026-05-05 handover latest detection failure）

Thread restart revealed an actual handover discovery failure.

ADAM could not reliably identify the latest handover from `notes/06_handover/` and required the user to provide the exact path:

```text
notes/06_handover/2026-05-05_delta_generator_test_and_runtime_reflection_handover.md
```

This confirms `handover latest index と月別フォルダ構成を導入する` is not only cleanup. It is a restart reliability bug fix.

Bug log:

- `notes/10_logs/2026-05-05_adam_handover_latest_detection_failure.md`

Current disposition:

- promoted to active as Phase 0 completion candidate on 2026-05-15.

---

## タスク

### 1. DELTA chapter-only normalization fixture を実行する

source_ref:

- systems/delta/config/delta_schema.yaml
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/operations/next_operations.md
- systems/delta/history/daily/2026-05-05.md

why_next:

- DELTA is currently operating without major trouble.
- This fixture is still useful to prevent speculative progress normalization, but ADAM Phase 0 intake / design / report hardening now has higher priority.
- Return to active if DELTA starts accepting chapter-only progress as precise Q/page progress or if user reports related error.

completed_condition:

- `健康保険法の3章が終わった` ケースで、L3なら question_id への正規化または uncertainty が必要と判断する
- `国民年金法7章が終わった` ケースで、L1/L2なら page_range / next_start_page が必要と判断する
- 変換不能時に confirmation next_action を出す
- 実データを読んだ上で、推測で precise progress を作らない

---

### 2. repo history / show / grep の docs・schema・runtime reflection 残範囲を再確認する

source_ref:

- docs/10_repo_resource_api.md
- config/ai/adam_action_schema.yaml
- notes/08_analysis/2026-04-30_phase0_hardening_followup_candidate_routing.md

why_next:

- docs / schema / runtime reflection の境界確認は重要だが、Phase 0 intake/design/report hardening より後でよい

completed_condition:

- docs/10_repo_resource_api.md を読む
- current repoResource action schema と runtime-visible behavior を区別する
- history / show / grep の残 reflection 範囲を確認する
- docs update / schema update / runtime fixture のどれが必要か判断する

---

### 3. ChatGPT Agent 外部記事を抽象概念と製品仕様に分割して routing する

source_ref:

- notes/00_inbox/ChatGPT Agent（エージェント）とは？背景や使い方を解説！.md
- notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
- notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md

why_next:

- intake routing の実運用候補だが、まず current inbox cleanup fixture で全体の分類を閉じる
- 最新 OpenAI 情報を扱う場合は official source 確認が必要

completed_condition:

- 抽象概念として残す部分と製品仕様として古くなる部分を分ける
- 最新 OpenAI official source を確認する
- issue / design / archive / future の disposition を保存する

---

### 4. Phase 1 Outlook Calendar API の読取設計を整理する

source_ref:

- notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
- docs/05_roadmap.md
- notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md

why_next:

- Phase 1 の重要候補だが、ADAM Phase 0 の intake / design / report hardening が先

completed_condition:

- Outlook Calendar API の読み取り対象を定義する
- EVE の schedule SSOT としての境界を整理する
- Todoist projection との関係を整理する
- Phase 1 entry criteria と接続する

---

### 5. notes delete API draft と current repoResourceWrite delete semantics の差分を確認する

source_ref:

- notes/02_design/2026-03-24_notes_delete_api_draft.md
- docs/10_repo_resource_api.md
- config/ai/adam_action_schema.yaml
- notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md

why_next:

- repoResourceWrite delete semantics の整理は Phase 0 hardening の残件
- current intake/design/report hardening の後でよい

completed_condition:

- docs/10_repo_resource_api.md を読む
- current repoResourceWrite schema / actual behavior を確認する
- archive / future/design retain / docs update candidate のどれにするか判断する

---

### 6. legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う

source_ref:

- notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md
- notes/08_analysis/2026-04-29_phase1_todoist_foundation_entry_boundary_analysis.md
- src/services/todoist.js
- src/services/todoist/client.js

why_next:

- Phase 1 Todoist foundation entry で `src/services/todoist/client.js` が SSOT と確認できている
- 削除は repo usage / tests / replacement path が揃ってから判断する方が安全
- DELTA projection profile 実装後に再評価する方が影響確認しやすい

completed_condition:

- repo usage を確認する
- replacement path を確認する
- tests / runtime impact を確認する
- delete / retain / future の判断を行う

---

### 7. DELTA foundation を main に統合する準備をする

source_ref:

- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-04.md
- systems/delta/config/delta_action_schema_v0.5.yaml
- notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
- notes/08_analysis/2026-05-03_operations_candidate_disposition.md

why_next:

- DELTA は operational subsystem だが、v0.6 operations shape / runtime fixture / projection 結果を見てから main 統合準備をする方が安全
- 参照 source_ref の `delta_action_schema_v0.5.yaml` は stale の可能性があるため、v0.6 schema 整理後に棚卸しする

completed_condition:

- `feature/atlas-pre-delta-foundation` の DELTA 差分を棚卸しする
- main に入れるべき DELTA files と、branch に残す files を分ける
- `systems/delta/roadmap` / `plan` / `operations` / `history` / `config` の整合を確認する
- ADAM 側 `repoResource delta` resource と docs / code / config の整合を確認する
- runtime behavior confirmed 済み項目と未確認項目を列挙する
- main 統合後に DELTA GPT runtime で read / bulk / write behavior を再確認する

---

### 8. ATLAS 関係ファイルを systems/atlas に集約する設計を整理する

source_ref:

- docs/05_roadmap.md
- docs/17_operations_system.md
- docs/15_notes_system.md
- notes/08_analysis/2026-05-03_operations_candidate_disposition.md

why_next:

- ATLAS 関係ファイルの集約は重要だが、DELTA v0.6 runtime readiness と Phase 1 re-entry 条件の後でよい

completed_condition:

- ATLAS の primary executor が Claude であることを明記する
- ADAM の責務を controller / integration / consistency に限定する
- `systems/atlas/` に置くものと置かないものを分ける
- 既存 ATLAS 関係ファイルの移動候補を棚卸しする
- `systems/atlas/README.md` / roadmap / verification / prompts の初期構成案を作る
- ATLAS outputs は verification evidence であり execution SSOT ではないことを明記する

---

### 9. DELTA monthly summary rebuild automation を設計する

source_ref:

- notes/02_design/2026-05-02_delta_history_daily_files_design.md
- systems/delta/history/daily/2026-05-02.md
- systems/delta/history/monthly/2026-05.md
- systems/delta/config/delta_schema.yaml

why_next:

- v0.6 では daily history が primary source で monthly summary は summary view
- 2026-05-02 の daily history と monthly summary には current_position のズレが観測された
- ただし one-question write や operations shape より後でよい

completed_condition:

- daily history から monthly summary を rebuild する入力 / 出力 / write scope を定義する
- one-question write 時には monthly summary を更新しない rule と整合させる
- daily review / monthly review のどちらで rebuild するか判断する

---

### 10. DELTA dedicated append_daily_event action を検討する

source_ref:

- systems/delta/config/delta_action_schema.yaml
- systems/delta/config/delta_schema.yaml
- notes/02_design/2026-05-02_delta_history_daily_files_design.md

why_next:

- 現 v0.6 Action schema は full content create/update 方式
- L3 1問実績のたびに全文更新すると衝突や破損リスクがある
- ただし v0.6 の最小 write fixture 後に判断すべき

completed_condition:

- full-content update のリスクを整理する
- append_daily_event action の必要性を判断する
- 実装する場合の endpoint / schema / idempotency / read-back policy を定義する

---

### 11. tasks API 全体を execution projection 前提で再設計する

source_ref:

- notes/08_analysis/2026-05-03_operations_candidate_disposition.md
- notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- notes/02_design/2026-03-25_tasks_api_alignment_design.md
- src/services/tasks/service.js
- src/services/tasks/projection.js
- src/services/todoist/client.js

why_next:

- DELTA projection profile / Todoist fixture 後に、Tasks API を execution projection 前提で再評価する必要がある

completed_condition:

- current tasks API / service / projection / Todoist client の責務境界を確認する
- create / update / close / delete / projection apply の意味を整理する
- operations 正本と Todoist projection の関係を docs / design に接続する
- 実装が必要な場合は別 task として分解する

---

### 12. code resource の repo root allowlist 拡張を設計・確認する

source_ref:

- notes/08_analysis/2026-05-03_operations_candidate_disposition.md
- config/ai/adam_action_schema.yaml
- docs/10_repo_resource_api.md
- api/repo-resource.js

why_next:

- `package.json`, `vitest.config.js`, `jest.config.js` 等を code resource 経由で読めないと、実装・test 確認の精度が落ちる
- repo root 全開放ではなく allowlist 方式で整理する必要がある

completed_condition:

- 現在の code resource allowlist を確認する
- repo root で read 可能にすべきファイルを列挙する
- security / scope の観点で許可範囲を判断する
- schema / docs / runtime-visible behavior を混同せず反映方針を決める

---

### 13. Todoist projection due_date / due_type 伝播を regression 確認する

source_ref:

- notes/08_analysis/2026-05-03_operations_candidate_disposition.md
- src/services/tasks/projection.js
- config/ai/adam_action_schema.yaml
- notes/04_operations/active_operations.md

why_next:

- 過去に Todoist projection で新規 task に due が入らない事象があった
- 現 runtime-visible projectTasks schema には due_date / due_type が見えているが、actual create/update behavior は fixture で確認が必要
- DELTA projection profile / Todoist fixture 後に、ADAM projection regression として確認するのが自然

completed_condition:

- previous/current active snapshots に due_date / due_type を含めた dry_run を確認する
- apply が必要な場合は previous_active_tasks と current_active_tasks を必ず用意する
- new create / existing update の due propagation を確認する
- dry_run 成功を apply 成功と混同しない

---

### 14. ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する

source_ref:

- notes/08_analysis/2026-05-03_operations_candidate_disposition.md
- config/ai/adam_instruction.md
- config/ai/adam_knowledge.md
- config/ai/adam_action_schema.yaml

why_next:

- Action schema 正規ファイル名ルール固定後に、instruction / procedure / schema の層分離を見直すのが自然
- ただし即 active ではなく、Rule Placement Guard と schema reflection の整理後に進める

completed_condition:

- current ADAM instruction / knowledge / action schema を読む
- always-on guard / procedure / background knowledge / API schema constraints を分離する
- instruction に残すべき拘束ルールと knowledge に置くべき procedure を判定する
- 更新が必要なら Write Gate 後に最小差分で反映し、read-back sha を記録する

---

## ルール

- active に入らなかった上位候補を置く
- task / source_ref を必須とする
- why_now / notes / due_date / due_type は必要に応じて持つ
- next は active の次に来る候補プールとして扱う
- 必要に応じて target_date や rolling_day を持ってよい
- daily / weekly review で再評価する
- active_operations に入る前提のものだけを置く
- 会話中に新規タスク候補が発生した場合も、まずは reroll により active / next / future を決める
- backlog 化しない
- 80_future の代替として使わない
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- merge 時に docs / code / config / operations / version を一致させる

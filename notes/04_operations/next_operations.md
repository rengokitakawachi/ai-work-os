# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-05-04 rolling）

2026-05-04 の conversation-triggered operations rolling により、以下2件を active_operations へ昇格した。

- `ADAM bug fix log の運用方法を notes に固定する`
- `Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する`

昇格先:

- `notes/04_operations/active_operations.md`
- active sha after rolling: `f700ac509ed6485bf724270f7462d19031829cd8`

Reason:

- 複数の高優先度 task が next_operations に追加されたため rolling を実行した
- `ADAM bug fix log` は不具合・回帰・修正履歴を記録止まりにしないための定着 task
- `Phase 0 routing maturity matrix` は plan-driven discovery gap の再発防止 task
- どちらも Immediate Gate ではないが、ADAM の governance quality に直結するため active 前半へ昇格した

---

## 再評価結果（2026-05-03 conversation update）

Phase 0 plan に明記されている routing maturity gap を ADAM が自律的に operations candidate 化できていなかった問題を受け、`Phase 0 routing maturity matrix を作る` task を next の最上位候補へ追加した。

ADAM の不具合・回帰・修正履歴を集約する `adam_bug_fix_log` を作成したため、その運用方法を notes に固定する task も上位候補へ追加した。

Result:

- both promoted to active on 2026-05-04 rolling

---

## 再評価結果（2026-05-02 daily review）

明日以降の再開性を優先し、ADAM / EVE / DELTA の Action schema 正規ファイル名固定 task を active Day0 に追加した。

DELTA v0.6 は引き続き active 主線として維持する。

### active_operations に残した / 追加した主な task

- `ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを固定する`
- `DELTA v0.6 operations shape を feature branch に反映する`
- `DELTA configured GPT で bulk / tree / recommended_lines recall を確認する`
- `DELTA chapter-only normalization fixture を実行する`
- `DELTA daily review write + operations update fixture を実行する`
- `DELTA write resource schema reflection gate を整理する`
- `DELTA Todoist projection profile を設計・実装する`
- `DELTA Todoist dry_run / apply / write-back fixture を実行する`

Reason:

- Action schema 命名規約の未固定は configured GPT 反映ミスを再発させる
- DELTA v0.6 は config / operations / runtime write / projection の一連の完成が必要
- operations shape が固定されないと runtime fixture / Todoist projection の確認が進まない

---

## タスク

### 1. notes delete API draft と current repoResourceWrite delete semantics の差分を確認する

source_ref:

- notes/02_design/2026-03-24_notes_delete_api_draft.md
- docs/10_repo_resource_api.md
- config/ai/adam_action_schema.yaml
- notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md

why_next:

- active Day6 から外したが、repoResourceWrite delete semantics の整理は Phase 0 hardening の残件として近い将来必要
- DELTA v0.6 runtime readiness と schema reflection を優先するため next に送る

completed_condition:

- docs/10_repo_resource_api.md を読む
- current repoResourceWrite schema / actual behavior を確認する
- archive / future/design retain / docs update candidate のどれにするか判断する

---

### 2. 現在の inbox を一回整理する

source_ref:

- notes/99_archive/issues/2026-05-03_individual_issue_files_routing_archive.md
- notes/02_design/2026-05-01_routing_type_destination_constraints.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md

why_next:

- inbox には開発時の test clip / 直下配置 / 下層 folder など一回限りの整理対象が残る
- ただし DELTA v0.6 runtime readiness よりは後でよい

completed_condition:

- `notes/00_inbox` の current tree を確認する
- 本システムと無関係な test clip を列挙する
- delete candidate ごとに削除理由を明示する
- inbox 直下の web / dev_memo 相当 file を分類する
- inbox 配下の余計な下層 folder を列挙する
- delete 前に対象と影響範囲を確認する
- Write Gate 後に delete / move を実行する
- write 後に read-back / NOT_FOUND / destination 確認を行う

---

### 3. legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う

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

### 4. DELTA foundation を main に統合する準備をする

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

### 5. ATLAS 関係ファイルを systems/atlas に集約する設計を整理する

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

### 6. DELTA monthly summary rebuild automation を設計する

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

### 7. DELTA dedicated append_daily_event action を検討する

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

### 8. DELTA review automation / analytics を v0.7 候補として整理する

source_ref:

- systems/delta/config/delta_schema.yaml
- systems/delta/history/daily/
- systems/delta/review/

why_next:

- v0.6 は operations / history / projection の安定化が主目的
- review automation / analytics は v0.7 候補として分離する方が安全

completed_condition:

- v0.6 scope から外す理由を明示する
- v0.7 候補として必要 input / output / metrics を整理する
- active に戻す再評価条件を決める

---

### 9. handover latest index と月別フォルダ構成を導入する

source_ref:

- notes/02_design/2026-05-03_handover_restart_flow_design.md
- notes/99_archive/issues/2026-05-03_individual_issue_files_routing_archive.md
- notes/06_handover/handover_template.md
- notes/06_handover/2026-05-03_delta_v0_6_readiness_handover.md
- notes/04_operations/active_operations.md

why_next:

- `notes/06_handover/` 直下の一覧取得がレスポンス過大で失敗した
- latest handover の特定を history / search / direct guess に依存すると再開手順が不安定になる
- handover は restart entry point であり、latest pointer により小さい read で再開起点へ到達できるようにする必要がある
- ただし current active task ではないため、active に横入りさせず next に置く

completed_condition:

- `notes/06_handover/latest.md` の形式を決める
- `notes/06_handover/YYYY/MM/` 構成を採用するか判断する
- 既存 handover の移動方針を決める
- `handover_index.md` が必要か判断する
- handover 作成 procedure に latest 更新を組み込むか判断する
- 移動 / 作成 / 更新を行う場合は Write Gate 後に実行する
- 更新後に read-back し、latest pointer と actual file path の整合を確認する

---

### 10. tasks API 全体を execution projection 前提で再設計する

source_ref:

- notes/08_analysis/2026-05-03_operations_candidate_disposition.md
- notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- notes/02_design/2026-03-25_tasks_api_alignment_design.md
- src/services/tasks/service.js
- src/services/tasks/projection.js
- src/services/todoist/client.js

why_next:

- Issue routing で operations_candidate と判定したが、current active には独立 task として存在しない
- DELTA projection profile / Todoist fixture 後に、Tasks API を execution projection 前提で再評価する必要がある

completed_condition:

- current tasks API / service / projection / Todoist client の責務境界を確認する
- create / update / close / delete / projection apply の意味を整理する
- operations 正本と Todoist projection の関係を docs / design に接続する
- 実装が必要な場合は別 task として分解する

---

### 11. code resource の repo root allowlist 拡張を設計・確認する

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

### 12. Todoist projection due_date / due_type 伝播を regression 確認する

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

### 13. ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する

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

### 14. weekly review を定期実行 task として operations に組み込む

source_ref:

- config/ai/adam_instruction.md
- notes/08_analysis/2026-05-03_docs15_issue_routing_completion_update_proposal.md
- notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md
- notes/04_operations/2026-04-12_weekly_review_prep.md
- notes/04_operations/active_operations.md
- notes/04_operations/next_operations.md

why_next:

- weekly review は report 作成ではなく、operations rolling / issue routing check / future・archive・design 滞留確認を含む定期 usecase である
- issue routing が定期的に実行されないと `idea_log.md` が再び肥大化し、design / operations への流れが止まる
- 現在の operations には weekly review preparation や archive 記録はあるが、recurring weekly review execution task が active / next に明示されていない

completed_condition:

- weekly review の standard completed condition を確認する
- weekly review に issue routing check を必須項目として組み込む
- weekly review で未routed issue がある場合、issue routing を実行するか active / next に明示的に入れる rule を固定する
- weekly review task を active_operations の7日 rolling に定期的に入れる方法を決める
- Todoist projection へ weekly review task をどう投影するか判断する
- docs/17 または docs/15 への反映要否を判断する
- read-back で active / next / docs proposal / instruction の整合を確認する

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

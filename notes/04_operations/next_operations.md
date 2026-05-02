# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、7日ローリングの `active_operations` に入らなかったが、近い将来に進める前提の task を置くレイヤーとする。

---

## 再評価結果（2026-05-02 DELTA v0.6 rolling）

DELTA v0.6 の残 task を候補に加え、active_operations を再ローリングした。

### active_operations に入れた DELTA v0.6 task

- `DELTA v0.6 operations shape を feature branch に反映する`
- `DELTA configured GPT で bulk / tree / recommended_lines recall を確認する`
- `DELTA chapter-only normalization fixture を実行する`
- `DELTA one-question daily-history write fixture を実行する`
- `DELTA write resource schema reflection gate を整理する`
- `DELTA Todoist projection profile を設計・実装する`
- `DELTA Todoist dry_run / apply / write-back fixture を実行する`

Reason:

- DELTA configured GPT Action の最小 read blocker は Bearer API key 設定により解消した
- DELTA v0.6 は config だけでなく operations shape / runtime fixture / projection まで含めた integrated operations upgrade である
- operations shape が固定されないと runtime fixture / Todoist projection の確認が進まない

### active_operations から外した既存候補

以下は7日枠から外し、次回 rolling / daily review で再評価する。

- `現在の inbox を一回整理する`
- `legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う`
- `DELTA foundation を main に統合する準備をする`
- `ATLAS 関係ファイルを systems/atlas に集約する設計を整理する`

Reason:

- DELTA v0.6 runtime readiness が現時点の blocker 解消後の最優先
- inbox cleanup / legacy wrapper / ATLAS 整理は重要だが、DELTA v0.6 の正本運用完成より後でよい
- DELTA foundation main 統合は、v0.6 operations shape と runtime fixture の結果を見てから行う方が安全

---

## タスク

### 1. 現在の inbox を一回整理する

source_ref:

- notes/01_issues/2026-05-01_inbox_cleanup_once_issue.md
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

### 2. legacy Todoist wrapper の削除判断を Phase 1 Todoist foundation 後に行う

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

### 3. DELTA foundation を main に統合する準備をする

source_ref:

- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-04.md
- systems/delta/config/delta_action_schema_v0.5.yaml
- notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
- notes/01_issues/idea_log.md#20260430-033

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

### 4. ATLAS 関係ファイルを systems/atlas に集約する設計を整理する

source_ref:

- docs/05_roadmap.md
- docs/17_operations_system.md
- docs/15_notes_system.md
- notes/01_issues/idea_log.md#20260430-034

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

### 5. DELTA monthly summary rebuild automation を設計する

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

### 6. DELTA dedicated append_daily_event action を検討する

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

### 7. DELTA review automation / analytics を v0.7 候補として整理する

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
- 削除済みの `config/ai/common_*` / `config/ai/procedures/*` 構造は再作成しない
- ADAM / EVE config は現行 `instruction + knowledge + schema` 構成を前提に整合する
- main は Docs-aligned stable version として扱う
- branch は Notes-driven development space として扱う
- merge 時に docs / code / config / operations / version を一致させる
- ATLAS は test / verification / CI review system として扱う
- DELTA v0.3 以降は新規 API route を増やさず、既存 `/api/repo-resource` 統合方式で進める

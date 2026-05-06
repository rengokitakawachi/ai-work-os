# 2026-04-30 design routing candidate inventory

## 目的

`design routing 候補を実データから棚卸しする` の成果物として、`notes/02_design` の実データを読み、routing 候補を分類する。

分類対象:

- docs 昇格候補
- future/design 候補
- archive 候補
- design retain
- operations candidate

---

## source_ref

- notes/08_analysis/2026-04-30_design_routing_minimum_operation_rule.md
- docs/15_notes_system.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/02_design/2026-03-24_eve_intent_api_mapping.md
- notes/02_design/2026-03-24_notes_delete_api_draft.md
- notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- notes/02_design/2026-03-25_strategy_domain_schema.md

---

## 実データ対象

repo grep により `notes/02_design` 配下の候補を確認し、代表的な4件を読んだ。

対象:

1. `2026-03-24_eve_intent_api_mapping.md`
2. `2026-03-24_notes_delete_api_draft.md`
3. `2026-03-25_strategy_api_and_tasks_boundary.md`
4. `2026-03-25_strategy_domain_schema.md`

---

## routing result

## 1. EVE Intent API Mapping Draft

file:

`notes/02_design/2026-03-24_eve_intent_api_mapping.md`

### 内容

EVE がユーザー意図に応じて Todoist API を先行実行するための intent → API mapping 草案。

主な論点:

- 既存タスク整理では listTasks を先に実行する
- 新規タスク化では createTask
- 既存タスク更新 / 完了では updateTask
- API で取得できる情報は先に API で確認する
- 人間への質問は API 実行後でも不足する場合に限定する

### routing 判定

recommended route:

- future/design
- operations candidate は将来条件付き

### 理由

EVE の一般業務フローに関わる有効な design だが、現在 active は Phase 0 hardening 中であり、EVE runtime 本体の実行設計へ直行する段階ではない。

ただし、EVE runtime reflection や Phase 1 以降で再評価価値が高い。

### docs 昇格可否

現時点では docs 昇格しない。

理由:

- EVE 側 runtime / Action schema / Todoist foundation の確認がまだ十分ではない。
- ADAM 側 common operating model の Phase 0 が先行中。
- docs に安定仕様として置くには、EVE runtime での actual behavior 確認が必要。

### operations candidate 化条件

次の場合、operations candidate 化できる。

- EVE runtime reflection task が active 化された
- Todoist / listTasks / createTask / updateTask の actual behavior を EVE runtime で確認する段階になった
- EVE の「今日やるタスク整理」最小プロンプトを作る必要が出た

---

## 2. notes delete API draft

file:

`notes/02_design/2026-03-24_notes_delete_api_draft.md`

### 内容

notes resource に delete を導入する設計草案。

主な論点:

- delete は notes resource のみに許可
- docs / code delete は許可しない
- 削除ロジックは service 層
- delete 許可範囲を inbox / exploration / logs / design に限定
- decisions / backlog / README は対象外

### routing 判定

recommended route:

- archive candidate
- ただし archive 前に current repo / docs / runtime との差分確認が必要

### 理由

現在の runtime tool schema では `repoResourceWrite` に `delete` action が見えており、resource も `notes` / `code` に対応している。したがって、この草案は現行仕様とズレている可能性が高い。

また、当時の notes path は `notes/inbox` / `notes/design` など旧構造を含み、現在の `notes/00_inbox` / `notes/02_design` とは一致しない。

### docs 昇格可否

現時点では docs 昇格しない。

理由:

- 草案内容が current runtime-visible schema と一致していない可能性がある。
- delete は安全性が高い操作であり、最新 docs / code / runtime を読まずに昇格できない。
- archive または historical design として扱う方が自然。

### archive 条件

archive するには次を確認する。

- 現行 docs に delete semantics が反映済みか
- repoResourceWrite delete の actual behavior が現仕様として定義済みか
- この草案が current design として不要か
- 後続に必要な知見が docs / current design に移っているか

### operations candidate 化条件

今すぐ active 化は不要。

ただし、delete semantics の docs/code/runtime 不一致が見つかった場合は、別途 operations candidate 化する価値がある。

---

## 3. Strategy API and Tasks API Boundary Design

file:

`notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md`

### 内容

Strategy Domain Schema を前提に、Strategy API と Tasks API の責務境界を定義する設計草案。

主な論点:

- Strategy Domain は GitHub Markdown を正本とする
- MindMeister は Strategy View
- Todoist は Execution View
- Todoist / MindMeister は projection であり正本ではない
- Tasks API は将来的に Strategy Domain の execution projection を扱う
- Strategy と Execution を分離する

### routing 判定

recommended route:

- future/design
- design retain

### 理由

SSOT / projection 分離の考え方は、現在の ADAM operations / Todoist projection と整合する。

ただし Strategy API / MindMeister / Domain schema は Phase 0 active の直接対象ではなく、現時点で docs 昇格すると広すぎる。

### docs 昇格可否

現時点では docs 昇格しない。

理由:

- Strategy API はまだ current implementation / active operations の中心ではない。
- 現行の operations / Todoist projection 設計と重なるが、そのまま docs 化すると future architecture まで正本化してしまう。
- Phase 1 以降の domain / projection 再設計時に再評価するのが自然。

### operations candidate 化条件

次の場合、operations candidate 化できる。

- Todoist / Outlook / Strategy Domain の責務境界を再設計する phase に入った
- current Tasks API と projection service の責務再定義が必要になった
- MindMeister / Strategy View が実装対象に戻った

---

## 4. Strategy Domain Schema Design

file:

`notes/02_design/2026-03-25_strategy_domain_schema.md`

### 内容

Strategy Domain の node schema と MindMeister / Todoist projection ルールを定義する草案。

主な論点:

- Strategy Domain は GitHub Markdown を正本とする
- Obsidian は編集 UI
- MindMeister は俯瞰ビュー
- Todoist は実行ビュー
- Domain node は level / type / title / parent_id / children_ids / status / external IDs を持つ
- Todoist 投影対象は task / subtask
- MindMeister は全ノードを投影対象にする

### routing 判定

recommended route:

- future/design
- design retain
- Strategy API boundary note とセットで再評価

### 理由

Domain / projection 分離の設計として有効だが、現在の active は Phase 0 routing / operations hardening であり、Strategy Domain 実装へ進む段階ではない。

また、現在の operations model は `active_operations` / `next_operations` / `archive_operations` を正本として運用しており、この Strategy Domain schema をそのまま現行仕様に昇格すると責務が衝突する可能性がある。

### docs 昇格可否

現時点では docs 昇格しない。

理由:

- 現行 operations system と Strategy Domain schema の関係が未整理。
- MindMeister 連携は現在 active ではない。
- Todoist projection との関係は再利用価値があるが、直接 docs 化するには未確定部分が多い。

### operations candidate 化条件

次の場合、operations candidate 化できる。

- Phase 1 以降で Strategy Domain / Todoist projection / Outlook schedule の統合設計へ戻る
- current operations model と domain schema の統合可否を検討する
- MindMeister を Strategy View として再導入する

---

## 横断分類

## docs 昇格候補

現時点で即 docs 昇格できるものはない。

理由:

- 4件とも有効な design だが、現行仕様として安定化していない。
- 一部は current runtime / implementation とズレている可能性がある。
- 一部は Phase 1 以降の future architecture に属する。
- docs は SSOT であり、未確定 design をそのまま昇格しない。

---

## future/design 候補

次は future/design が妥当。

- `2026-03-24_eve_intent_api_mapping.md`
- `2026-03-25_strategy_api_and_tasks_boundary.md`
- `2026-03-25_strategy_domain_schema.md`

理由:

- いずれも有効な構造設計。
- 現 active の Phase 0 hardening には直結しない。
- Phase 1 以降または EVE runtime 作業で再評価価値がある。
- archive するには早い。

---

## archive 候補

次は archive candidate。

- `2026-03-24_notes_delete_api_draft.md`

理由:

- 現行 runtime-visible schema と差分がありそう。
- 旧 notes path 構造を含む。
- delete action 自体は現在 runtime schema に存在するため、草案としては役目終了している可能性が高い。

ただし、archive 前には current docs / code / runtime の確認が必要。

---

## design retain 候補

次は design retain としても扱える。

- `2026-03-25_strategy_api_and_tasks_boundary.md`
- `2026-03-25_strategy_domain_schema.md`

理由:

- 2件はセットで意味を持つ。
- 現時点で future/design へ送る判断も自然だが、Strategy / Projection 再設計の基礎資料として design に残しておく価値もある。
- archive するには早い。

---

## operations candidate 候補

即 active 化すべきものはない。

ただし、次は将来 operations candidate 化しうる。

### candidate A: EVE intent API mapping runtime confirmation

source_ref:

- notes/02_design/2026-03-24_eve_intent_api_mapping.md

trigger:

- EVE runtime reflection task が active 化されたとき
- EVE が Todoist task 整理を実行する phase に戻ったとき

possible task:

`EVE intent API mapping を runtime prompt / Action behavior で確認する`

---

### candidate B: notes delete API draft の current schema 差分確認

source_ref:

- notes/02_design/2026-03-24_notes_delete_api_draft.md
- current repoResourceWrite runtime-visible schema

trigger:

- delete semantics の docs/code/runtime 整合確認が必要になったとき
- old design archive 前に差分確認する review が発生したとき

possible task:

`notes delete API draft と current repoResourceWrite delete semantics の差分を確認する`

---

### candidate C: Strategy Domain / Tasks API projection 再評価

source_ref:

- notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- notes/02_design/2026-03-25_strategy_domain_schema.md

trigger:

- Phase 1 Todoist / Outlook foundation へ戻るとき
- Strategy Domain / projection / schedule 分離を再設計するとき

possible task:

`Strategy Domain と current operations / Todoist projection の責務境界を再評価する`

---

## design routing rule の実例確認

今回の4件では、design routing 最小運用ルールは破綻しなかった。

確認できたこと:

- docs 昇格と design retain を分けられた。
- future/design と archive を分けられた。
- operations candidate を即 active 化しなかった。
- archive candidate でも、archive 前の確認条件を残せた。
- review ではなく routing として、各 design の行き先と再評価条件を整理できた。

---

## completed condition 対応

対象 task:

`design routing 候補を実データから棚卸しする`

completed condition:

- design layer から routing 候補を数件抽出する
- docs 昇格候補 / future 候補 / archive 候補 / retain を分類する
- 実行候補化すべき design があれば operations candidate として整理する

対応:

- design layer から4件を抽出した。
- docs 昇格候補は現時点では none と判断した。
- future/design 候補を3件整理した。
- archive candidate を1件整理した。
- design retain 候補を2件整理した。
- 将来 operations candidate 化しうる候補を3件整理した。
- ただし即 active 化すべき candidate はないと判断した。

---

## 判断

`design routing 候補を実データから棚卸しする` は、この note の保存により完了扱い可能。

次に進むべき active task は、`daily / weekly review と routing / rolling の責務境界を実例で確認する`。

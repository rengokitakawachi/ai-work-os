# Overall Development Plan Draft

## 目的

AI Work OS の全体開発計画を整理し、
設計・docs・実装・検証の順序を固定する。

本計画は、実装前に優先順位と段階的到達点を明確化するための design 草案とする。

---

## 前提

- docs は SSOT とする
- 実装は docs に従う
- notes/design を経由してから docs に反映する
- 現在の最重要テーマは Strategy Domain と Todoist Sync の成立確認とする
- MindMeister / Outlook / Teams / Obsidian 拡張は段階導入とする

---

## 現状整理

### 確定済み

- Tasks API の現行仕様整理
- Strategy Domain 導入方針
- Strategy Domain Schema 草案
- Strategy API と Tasks API の責務境界
- Strategy Domain ↔ Todoist Sync Phase1 設計
- 日報 / 月報ルール整備

### 未着手または未完了

- 03_api_spec.md の再設計反映
- 02_architecture.md の Strategy Domain / MindMeister 反映
- 07_external_integration.md の MindMeister / Strategy View 反映
- Strategy API 実装
- Strategy Domain ↔ Todoist Sync 実装
- MindMeister 連携設計と実装
- Outlook / Teams 連携

---

## 開発方針

- 先に docs を更新する
- 次に最小実装を行う
- 次に同期の安定性を観測する
- その後に外部連携先を増やす
- 競合解決や高度同期は正常系成立後に扱う

---

## マイルストーン

### M1 docs 再整備

目的

- 現在の設計判断を SSOT に反映する

対象

- 03_api_spec.md
- 02_architecture.md
- 07_external_integration.md
- 05_roadmap.md

完了条件

- Strategy Domain の位置づけが docs に明記されている
- Tasks API が Execution projection として再定義されている
- MindMeister / Todoist / Outlook / Obsidian の役割分離が明記されている
- ロードマップが現行設計と矛盾しない

---

### M2 Strategy Domain 最小実装

目的

- Strategy Domain を GitHub 上の Markdown 正本として実装する

対象

- Strategy node 保存方式
- node read / create / update の最小 API
- level / type / parent-child validation
- external ID 保持

完了条件

- Strategy node を 1件作成・読取・更新できる
- L1..L4 制約が機能する
- external.todoist_task_id を保持できる

---

### M3 Todoist Projection 実装

目的

- Strategy Domain から Todoist へ実行対象を投影する

対象

- task / subtask node の create
- title / description / status 更新
- close 同期
- L3 / L4 の親子対応

完了条件

- Domain → Todoist の create / update / close が成立する
- 親 task 作成後に subtask を作成できる
- external.todoist_task_id を安定保持できる

---

### M4 Todoist Reverse Sync 実装

目的

- Todoist 側の変更を Strategy Domain へ自動反映する

対象

- polling ベースの最小同期
- title / description / status 更新
- completed の Domain 反映
- source フラグによるループ防止

完了条件

- Todoist アプリ側の変更が Domain へ反映される
- 無限ループが発生しない
- 同期遅延と失敗ログを観測できる

---

### M5 Sync 観測と安定化

目的

- 双方向同期の正常系と不整合ポイントを把握する

対象

- 同期遅延測定
- 二重更新検知
- 親子不整合検知
- conflict の暫定ログ化

完了条件

- 主要失敗パターンが整理されている
- Phase2 に進む判断材料が揃っている

---

### M6 MindMeister 連携設計と実装

目的

- Strategy View を追加する

対象

- MindMeister projection
- MindMeister → Domain reverse sync
- node 表示ルール
- 折りたたみ前提の運用設計

完了条件

- Domain ↔ MindMeister の基本同期が成立する
- Todoist / MindMeister / Domain の三者で構造が維持される

---

### M7 Schedule / Communication 拡張

目的

- Outlook と Teams を段階導入する

対象

- Outlook read
- Schedule View 設計
- Teams 通知

完了条件

- 今日の予定把握が可能
- 実行と時間の接続ができる
- 日報 / 週報通知の最小導線ができる

---

### M8 Knowledge / Review 拡張

目的

- Obsidian / GitHub / reports を活用した Review Layer を強化する

対象

- 日報 → 週報 → 月報 集約
- Strategy / Execution / Schedule のレビュー
- 実績時間ログ
- 見積補正

完了条件

- Review Layer が定常運用できる
- 改善ループが回る

---

## 直近優先順位

### P1

- docs 再整備
- 03 / 02 / 07 / 05 の修正草案

### P2

- Strategy Domain 最小実装
- validation / persistence / external ID

### P3

- Todoist projection
- Todoist reverse sync
- 同期観測

### P4

- MindMeister 連携

### P5

- Outlook / Teams
- Review 拡張

---

## リスク

- docs 未更新のまま code が先行する
- Strategy Domain と Tasks API の責務が再混線する
- Sync の loop / conflict 対策が後追いで複雑化する
- MindMeister を早く入れすぎると原因切り分けが困難になる

---

## 判断基準

- docs と整合しているか
- 最小正常系を先に作れているか
- 失敗時に原因を切り分けられるか
- 外部ツール依存を adapter に閉じられているか
- 将来の拡張で破綻しないか

---

## 次アクション

- M1 の docs 修正草案を design から起こす
- 03_api_spec.md を最優先で更新する
- 02_architecture.md と 07_external_integration.md を最小差分で更新する
- 05_roadmap.md を現状計画に合わせて更新する

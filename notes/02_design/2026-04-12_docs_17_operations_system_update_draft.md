# 2026-04-12 docs_17_operations_system_update_draft

## 目的

`docs/17_operations_system.md` の更新差分案を作成する。

本差分案では、
execution governance の試験運用結果と、
Phase 0 の flow-control / rolling 最小実装で確定した内容のうち、
共通骨格として docs に上げてよい内容だけを整理する。

---

## 更新方針

- 既存の 7日ローリング骨格は維持する
- 日中運用と review 時運用の境界を明確化する
- `next_operations` を backlog ではなく候補プールとして明文化する
- 完了判定と構造変更判定を分ける
- rolling を `next の繰り上げ` ではなく、候補比較と配置の処理として明文化する
- 例外 reroll は整合回復時のみとする
- ADAM 固有の会話制御文言や回答順は docs に上げない

---

## 主な反映ポイント

### 1. 基本原則の補強

追加する内容

- operations は日中運用では active_operations を正本として扱う
- rolling の確定更新は review 地点で行う
- 日中は active の順序と Day 構造を原則維持する
- 完了判定と構造変更判定は分ける

### 2. active_operations のルール補強

追加する内容

- active に完了認識済み task が残っていても、daily review 前なら許容する
- active に完了 task が残っているだけで未整合としない
- 日中は archive 移動と Day 再編成を確定しない

### 3. next_operations の意味補強

追加する内容

- next は backlog ではない
- active が実行不能な場合の補充候補プール
- daily / weekly review で再評価する近未来候補
- rolling 時の candidate source の一つであり、決定権を持つ正本ではない

### 4. rolling の責務補強

追加する内容

- candidate collection
- normalization
- rule evaluation
- ranking
- placement

を rolling の最小責務として明記する

### 5. daily review の役割補強

追加する内容

- rolling の主要確定地点である
- 完了 task の archive 移動
- 未完了 task の繰越
- active / next の更新
- 新しい Day6 補充

### 6. weekly review の役割補強

追加する内容

- rolling の再設計地点である
- active / next の次週再設計
- archive_operations の snapshot 保存

### 7. 例外 reroll の追加

追加する内容

- 日中 reroll は通常運用ではない
- active が壊れている / 重複している / 実行不能 / 誤混入 task 除去が必要
  などの整合回復時のみ許容する

---

## docs に上げるもの / 上げないもの

### 上げるもの

- 日中運用と review 時運用の分離
- 完了判定と構造変更判定の分離
- active に完了 task が残ってよい条件
- next_operations の候補プールとしての意味
- rolling の最小責務
- daily review / weekly review の役割補強
- 例外 reroll は整合回復時のみという原則

### 上げないもの

- ADAM 固有の回答順
- 会話制御の細則
- GPT editor 前提の操作
- 特定 task 名や Day 配置
- 具体事例の細かい列挙
- 現行 code の関数名そのもの

---

## 反映後全文ドラフト

# 17 Operations System

## 目的

operations を短期実行計画の正本として定義し、
AI Work OS における実行層の基盤を確立する。

---

## 位置づけ

- roadmap は上位方針
- plan は中期計画
- operations は短期実行計画

operations は「今何をやるか」を決定する正本とする。

日中運用では、
`active_operations` を実行対象の正本として扱う。

---

## 基本原則

- operations は短期実行順の正本とする
- operations は 7日ローリング計画を持つ
- operations は schedule ではない
- future に operations は置かない
- Outlook は schedule の正本とする
- rolling の確定更新は review 地点で行う
- 日中は active の順序と Day 構造を原則維持する
- 完了判定と構造変更判定は分けて扱う
- weekly review で archive_operations の snapshot を保存する

---

## 構造

operations は以下の構造を持つ。

- active_operations（正本）
- next_operations（近未来候補）
- archive_operations（一時アーカイブ）

---

## active_operations

active_operations は短期実行順の正本とする。

### 7日ローリングモデル

active_operations は以下の構造を持つ。

- Day0（今日）
- Day1（明日）
- Day2
- Day3
- Day4
- Day5
- Day6

### ルール

- 各 Day はタスク順序を持つ
- 時刻は持たない
- 仮配置であり、確定スケジュールではない
- 日付は参考であり拘束ではない
- 日中は active を上から順に実行する
- active に完了認識済み task が残っていても、daily review 前なら許容する
- active に完了 task が残っているだけで未整合としない
- archive への移動や Day 再編成の確定は daily review で行う

---

## next_operations

next_operations は、
active_operations の次に来る近未来候補を保持する。

### ルール

- active_operations にまだ入れないタスクを格納する
- active の次に来る候補プールとして扱う
- active が実行不能な場合の補充候補プールとして扱う
- daily / weekly review で再評価する
- backlog 化しない
- future の代替にしない

---

## archive_operations

archive_operations は、
今週の完了タスクを一時的に保持する。

### ルール

- 完了タスクを必要に応じて格納する
- daily review または weekly review で扱う
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は `99_archive` 側とする

---

## ローリング更新

### 日中運用

- active_operations を正本として実行する
- 完了認識や軽い順序調整はありうる
- ただし archive 移動と rolling 確定は行わない

### daily review

- rolling の主要確定地点
- Day0 の実績確認
- 完了 task の archive 移動
- 未完了タスクの再配置
- Day1 以降の繰り上げ
- 新しい Day6 の補充
- next_operations の更新
- active_operations の更新

### weekly review

- rolling の再設計地点
- 7日構成の再設計
- 優先順位の再構築
- next_operations の再評価
- archive_operations を snapshot 保存
- active_operations と next_operations を次週前提で再調整する

### 例外 reroll

日中に reroll が必要になる場合はある。

ただし、
それは通常運用ではなく整合回復として扱う。

許容する例

- active が壊れている
- active に重複がある
- active が実行不能になっている
- 誤混入 task を除去しないと次へ進めない

この場合のみ、
例外的に reroll を行ってよい。

---

## operations rolling の最小責務

operations rolling は、
`next_operations` の先頭をそのまま繰り上げる処理ではない。

operations rolling は、
roadmap / plan を前進させるために、
候補を比較して短期実行順を決める処理とする。

最小責務は次の通り。

- candidate collection
- normalization
- rule evaluation
- ranking
- placement

candidate source の例

- plan の主要論点や直近作業
- open issue
- design 未反映差分
- next_operations
- future からの再活性化候補

next_operations は candidate source の一つであり、
決定権を持つ正本ではない。

---

## operations と schedule の分離

operations はスケジュールではない。

- operations = 何を進めるか / どの順で進めるか
- Outlook = いつ実行するか / 何時から何時に置くか

この分離を維持する。

---

## 判断

- operations は短期実行計画の正本とする
- 日中運用と review 時運用を分ける
- 7日ローリングにより柔軟な運用を実現する
- next_operations は近未来候補と補充候補を保持する
- archive_operations により週次履歴を軽量に保存する
- daily review は rolling の主要確定地点とする
- weekly review は rolling の再設計地点とする
- Outlook を schedule の正本として分離する

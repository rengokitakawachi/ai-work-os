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

---

## 基本原則

- operations は短期実行順の正本とする
- operations は 7日ローリング計画を持つ
- operations は schedule ではない
- future に operations は置かない
- Outlook は schedule の正本とする
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

---

## next_operations

next_operations は、
active_operations の次に来る近未来候補を保持する。

### ルール

- active_operations にまだ入れないタスクを格納する
- active の次に来る候補プールとして扱う
- Day6 の候補プールとして扱う
- 必要に応じて日付情報を持てる
- daily / weekly review で再評価する
- backlog 化しない
- future の代替にしない

---

## archive_operations

archive_operations は、
今週の完了タスクを一時的に保持する。

### ルール

- 完了タスクを必要に応じて格納する
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は `99_archive` 側とする

---

## ローリング更新

### daily review

- Day0 の実績確認
- 未完了タスクの再配置
- Day1 以降の繰り上げ
- 新しい Day6 の補充
- 近未来候補は next_operations に移動
- 完了タスクは必要に応じて archive_operations に移動

### weekly review

- 7日構成の再設計
- 優先順位の再構築
- next_operations の再評価
- archive_operations を snapshot 保存
- active_operations と next_operations を次週前提で再調整する

---

## operations と schedule の分離

operations はスケジュールではない。

- operations = 何を進めるか / どの順で進めるか
- Outlook = いつ実行するか / 何時から何時に置くか

この分離を維持する。

---

## 判断

- operations は短期実行計画の正本とする
- 7日ローリングにより柔軟な運用を実現する
- next_operations により近未来候補を保持する
- archive_operations により週次履歴を軽量に保存する
- Outlook を schedule の正本として分離する

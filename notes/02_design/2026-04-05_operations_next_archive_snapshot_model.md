# 2026-04-05 Operations Next / Archive Snapshot Model

## 目的

operations の現行運用を、
実行正本・近未来候補・履歴保存の3層で整理し、
daily / weekly review と Outlook 連携を含めた
実運用モデルとして明文化する。

---

## 背景

これまでの検討で、以下はほぼ固まっている。

- operations は短期実行順の正本
- operations は 7日ローリングで運用する
- operations は schedule ではない
- Outlook は schedule の正本
- Todoist など外部ツールは projection / execution view として扱う

一方で、operations の補助ファイル構造については、
`standby_operations`、`archive_operations`、`99_archive` などの案が併存していた。

今回の整理では、
実運用コストを最小にしつつ、
意味の通る3ファイル構造と週次スナップショット運用を定義する。

---

## 結論

- operations の正本は `active_operations.md` とする
- `standby_operations` は `next_operations` へ置き換える
- `next_operations` は active の次に来る近未来候補を保持する
- `archive_operations.md` は今週の一時アーカイブとする
- weekly review で `archive_operations.md` をそのまま週次ファイルとして `99_archive` に保存する
- archive 時に内容整理は行わない
- Outlook は schedule の正本とする

---

## 構造

```text
notes/04_operations/
  active_operations.md
  next_operations.md
  archive_operations.md

notes/99_archive/operations/
  YYYY-MM-DD_weekly_operations.md
```

---

## 各ファイルの役割

### active_operations.md

- 短期実行順の正本
- Day0〜Day6 の 7日ローリング構造を持つ
- daily review で更新する
- 今やるものだけを保持する

### next_operations.md

- active の次に来る候補を保持する
- 近い将来やる前提のものを置く
- active に入りきらないタスクを保持する
- 必要に応じて日付情報を持てる
- backlog や future の代替にはしない

### archive_operations.md

- 今週の完了タスクを一時的に保持する
- 週次レビューまでの短期履歴置き場とする
- weekly review 後に空にする

### notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md

- 週次時点の archive_operations のスナップショット
- 長期保存用の履歴
- 保存後は編集しない

---

## active / next / archive の意味

### active

- now
- 今週の実行面
- 正本

### next

- near future
- 次に active に入る候補
- 近未来の実行候補

### archive

- past
- 完了済みの履歴
- 実行面から外れた確定記録

---

## daily review との関係

daily review では以下を行う。

1. Day0 の実績確認
2. 未完了タスクの再配置
3. Day1 以降の繰り上げ
4. 新しい Day6 の補充
5. 完了タスクを必要に応じて `archive_operations.md` に移す

daily review では、
`99_archive` への確定保存は行わない。

---

## weekly review との関係

weekly review では以下を行う。

1. `archive_operations.md` を確認する
2. 内容を整理せず、そのまま保存する
3. 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
4. 保存後、`archive_operations.md` を空にする
5. `active_operations.md` と `next_operations.md` を次週前提に再調整する

### 原則

- weekly review で archive 内容を編集しない
- 要約や分類は行わない
- 保存を優先する
- 後から分析が必要な場合は `07_reports` や `08_analysis` で扱う

---

## operations と Outlook の関係

operations は schedule ではない。

役割分離は以下とする。

- operations = 何を進めるか / どの順で進めるか
- Outlook = いつ実行するか / 何時から何時に置くか

このため、`next_operations.md` に日付情報を持たせることは許容するが、
それは schedule SSOT にはしない。

schedule の正本は Outlook とする。

---

## 外部ツールとの関係

### Outlook

- schedule の正本
- 空き時間や既存予定の制約を持つ
- operations を時間配置に変換する接続先

### Todoist

- execution view
- 直近タスク操作のUI
- operations の projection 先

### Teams

- 通知チャネル
- execution や proposal の周辺通知を担う

### Obsidian

- 実行知の蓄積層
- 実績や学びを保持し、次回の planning 精度向上に使う

---

## フロー

```text
roadmap
↓
plan
↓
operations
  - active_operations
  - next_operations
  - archive_operations
↓
Outlook（schedule SSOT）
↓
execution
↓
review / learning
```

---

## ルール

- active_operations は単一正本とする
- next_operations は近未来候補に限定する
- next_operations を backlog 化しない
- next_operations を future の代替にしない
- archive_operations は今週の一時アーカイブとする
- weekly review では archive を整理せず、そのまま snapshot 保存する
- 長期履歴は `99_archive` に保存する
- Outlook を schedule の正本とする
- operations は execution planning の正本とする

---

## 既存 design との関係

本設計は、以下の既存知見を更新・具体化する。

- `2026-04-04_operations_active_archive_model_light_draft.md`
- `2026-04-03_plan_layer_operating_spec.md`
- `2026-04-03_review_system_operating_spec.md`
- `2026-04-04_19-05-00_operations_eve_execution_intelligence_memo.md`

特に以下を更新している。

- `standby_operations` を `next_operations` へ進化させた
- archive を `04_operations` と `99_archive` の2段に分けた
- weekly review における archive snapshot 運用を簡素化した

---

## 判断

- 3ファイル構成の方が実運用しやすい
- standby より next の方が意味に合う
- archive は編集より保存を優先する
- review は継続可能なコストで回る設計を優先する

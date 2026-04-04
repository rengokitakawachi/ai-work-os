# 2026-04-04 Operations Active / Archive Model

## 目的

operations を短期実行順の正本として定義し、
7日ローリング計画・生成ルール・外部連携を含めた
運用モデルを確立する。

---

## 結論

- operations は短期実行順の正本とする
- operations は 7日ローリング実行計画を持つ
- operations は schedule ではない
- active_operations を単一正本とする
- standby_operations を一時退避レイヤーとして持つ
- archive_operations は履歴用途に限定する
- future に operations は置かない

---

## operations の定義

operations は以下を兼ねる。

- 今すぐ進める短期実行順
- 1週間前後の実行計画
- daily / weekly review により継続更新される正本

---

## 構造

operations は以下の構造を持つ。

- active_operations（正本）
  - Day0〜Day6
- standby_operations（退避）

---

## 7日ローリングモデル

operations は日単位に分割された順序付きタスク群として扱う。

Day構造

- Day0（今日）
- Day1（明日）
- Day2
- Day3
- Day4
- Day5
- Day6

ルール

- 各 Day はタスク順序を持つ
- 時刻は持たない
- 仮配置であり、確定スケジュールではない

---

## ローリング更新

### daily review

- Day0 の実績確認
- 未完了タスクの再配置
- Day1 以降の繰り上げ
- 新しい Day6 の補充
- 溢れたタスクは standby へ移動

### weekly review

- 7日構成の再設計
- 優先順位の再構築
- 大きな入れ替え
- standby の再評価
- archive 判定

---

## standby_operations

目的

7日ローリングから一時的に外れたタスクを退避する。

特徴

- 整理しない
- 優先順位を持たない
- 思考コストを増やさない
- Day6 の候補プールとして扱う

ルール

- active_operations から溢れたタスクを格納する
- 7日内に収まらないタスクを格納する
- daily / weekly review で再評価する
- future とは区別する

---

## operations の生成ルール

発生源

- plan
- issue
- adam
- review

補足

- plan: 中期計画から落ちるタスク
- issue: 即着手課題
- adam: 会話で確定した短期タスク
- review: daily / weekly による再構成

---

## operations に入る条件

- 今すぐ進める短期実行対象である
- 実行順を持つ
- 7日内に配置する価値がある

満たさない場合

- issue / design / dev_memo / future に戻す

---

## Day配置ルール

operations に入ったタスクは Day0〜Day6 のいずれかに配置する。

原則

- 近い順に配置する
- 厳密な日付拘束は持たない
- 「この辺でやる」粒度で扱う

---

## operations ≠ schedule

operations はスケジュールではない。

役割分離

- operations = 何をいつ頃やるか（順序）
- Outlook = 何時から何時に行うか（時間配置）

---

## 外部連携

### Outlook

- 予定の正本
- 空き時間の制約として扱う

役割

- 空き時間に応じたタスク選択
- operations から schedule proposal を生成
- 承認後に予定として反映

---

### Todoist

- execution view
- 操作UI

役割

- タスク実行
- 完了操作

ルール

- 正本ではない
- 操作結果は operations に反映する

---

### MindMeister

- structure / strategy view

役割

- 全体構造の可視化
- タスク関係の俯瞰

---

### Obsidian

- 実行インテリジェンスの蓄積層

蓄積対象

- 見積時間 / 実績時間
- タスク特性
- 成功 / 失敗パターン

---

## フロー

roadmap
↓
plan
↓
operations（active / standby）
↓
daily review
↓
operations 更新
↓
weekly review
↓
operations 再構成 / archive 判定
↓
Outlook（schedule proposal）
↓
実行
↓
Obsidian（学習）

---

## ファイル構造

- notes/04_operations/active_operations.md
- notes/04_operations/standby_operations.md
- notes/99_archive/operations/archive_operations_YYYY-MM-DD.md

---

## archive 運用

archive は履歴用途に限定する。

条件

- 構造が大きく変わる
- phase / plan が切り替わる
- 履歴価値がある

---

## 判断

- operations は単なるタスク列ではない
- 短期実行計画の中核レイヤーとする
- EVE の実行知能の基盤とする

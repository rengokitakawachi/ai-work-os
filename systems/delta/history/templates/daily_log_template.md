# Delta Daily Log Template

## Purpose

Delta の日次学習ログを、月次 history file に追記するための再利用 template。

月次ログは `systems/delta/history/YYYY-MM.md` とし、1日1セクションで日付順に追記する。

---

## Format policy

DELTA history は Markdown + DELTA_META YAML のハイブリッド形式とする。

- Markdown 本文: 人間が読むための実績・判断・次アクション
- DELTA_META: DELTA が進捗集計・遅れ検知・弱点抽出・次アクション生成に使う最小構造データ
- operations には実績を書かない
- 実績は history に集約する
- review には週次・月次レビューや弱点集約を置く

正本の扱い:

- 人間が読む正本は Markdown 本文
- 機械集計の正本は DELTA_META
- Markdown 本文と DELTA_META が矛盾した場合、daily review で修正対象にする

---

## Template

````markdown
## YYYY-MM-DD

### 実績
- L1：
- L2：
- L3：
- 秒トレ：

### 計画との差分
-

### 判断
-

### 弱点
-

### 次アクション
-

### メモ
-

### DELTA_META
```yaml
date: YYYY-MM-DD
day_type: weekday | weekend | holiday | exception
actual_results:
  - study_type: L1 | L2 | L3 | 秒トレ | review | other
    subject:
    material:
    planned_scope:
    actual_scope:
    result: complete | partial | skipped
    comprehension: high | medium | low | unknown
    weak_points: []
judgment:
  status: on_track | slight_delay | delay | overdone
  reason:
next_action:
  - task:
    due_date:
    study_type:
source_ref:
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/operations/active_operations.md
```
````

---

## Field guide

### Markdown body

人間が日次履歴を読んで、何をやったか、計画との差分、判断、次に何をするかを把握するための本文。

### DELTA_META

DELTA が安定して処理するための最小 YAML metadata。

主な用途:

- 進捗集計
- 遅れ検知
- 弱点抽出
- next action 生成
- weekly / monthly review の入力

### actual_results

L1 / L2 / L3 / 秒トレなど、学習種別ごとに分けて書く。

### result

- complete: 予定範囲を完了、または予定以上を実施
- partial: 一部実施
- skipped: 未実施

### comprehension

- high: 迷いなく説明できる
- medium: 問題演習は可能だが不安が残る
- low: 再学習が必要
- unknown: 未評価

### judgment.status

- on_track: 全体として計画線上
- slight_delay: 軽微な遅れ
- delay: 計画再調整が必要な遅れ
- overdone: 予定を大きく超過

### weak_points

復習や次回 operations に接続できる粒度で書く。

### next_action

翌日または次回 review で扱う行動。

### source_ref

判断に使った plan / operations / material を残す。

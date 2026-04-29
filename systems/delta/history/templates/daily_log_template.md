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

## L3 review marks

L3、つまり過去問講座テキスト演習では、各問題に以下の4段階判定を付ける。

L3 の ◎ / ○ / △ / × は、正答数ではなく理解度を主軸にする。
正答数・正誤は補助情報として記録するが、復習優先度はユーザー本人の理解度評価をSSOTとする。

| 記号 | 意味 | 扱い |
|---|---|---|
| ◎ | 正解し、完全に理解している。再学習不要 | 原則スキップ可能 |
| ○ | 正解し、理解しているが、再学習の余地あり | 2巡目以降で確認対象 |
| △ | 正解・不正解を問わず、理解が不十分。再度学習 | 次優先で回収 |
| × | 正解・不正解を問わず、理解していない、または根拠が崩れている | 最優先で回収 |

復習優先度:

```text
× → △ → ○ → ◎
```

選択問題の正答数、たとえば 5/5、4/5、3/5 などは参考情報として記録する。
ただし、評価記号は正答数から自動決定しない。

例:

- 5/5でも、根拠が曖昧なら △ または ×
- 3/5でも、理解が一定程度あれば △
- 0〜2/5で重要論点が崩れていれば ×
- 5/5かつ完全理解なら ◎
- 5/5かつ理解しているが再確認余地ありなら ○

L3 は必ず問題番号ベースで記録する。

---

## Template

````markdown
## YYYY-MM-DD

### 実績
- L1：
- L2：
- L3：
- 秒トレ：

### L3実績
- 科目：
- 範囲：
- 問題番号：
- 正答数・正誤：
- 理解度判定集計：◎ / ○ / △ / ×
- 要復習：△・×の問題番号
- 2巡目確認：○の問題番号
- 原則スキップ可：◎の問題番号

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
  - study_type: L3
    subject:
    material: 過去問講座テキスト
    topic:
    planned_scope:
    actual_scope:
    result: complete | partial | skipped
    answer_score:
    answer_notes:
    evaluation_basis: understanding
    review_marks:
      double_circle:
        mark: ◎
        meaning: 正解し、完全に理解している。再学習不要
        count:
        questions: []
      circle:
        mark: ○
        meaning: 正解し、理解しているが、再学習の余地あり
        count:
        questions: []
      triangle:
        mark: △
        meaning: 正解・不正解を問わず、理解が不十分。再度学習
        count:
        questions: []
      cross:
        mark: ×
        meaning: 正解・不正解を問わず、理解していない、または根拠が崩れている
        count:
        questions: []
    weak_points: []
    next_review_targets:
      priority_1_cross: []
      priority_2_triangle: []
      priority_3_circle: []
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

### L3 answer_score / answer_notes

選択問題の `5/5` や択一問題の正誤などを補助情報として記録する。

正答数・正誤は復習優先度のSSOTではない。

### L3 evaluation_basis

L3 の復習優先度の基準を示す。

原則として `understanding` とし、ユーザー本人の理解度評価を優先する。

### L3 review_marks

過去問講座の問題ごとの理解度・復習要否を記録する。

- `double_circle` = ◎
- `circle` = ○
- `triangle` = △
- `cross` = ×

評価記号は正答数から自動決定しない。

### L3 next_review_targets

復習対象を優先度順に機械処理できるように保持する。

- `priority_1_cross`: ×。最優先で回収
- `priority_2_triangle`: △。次優先で回収
- `priority_3_circle`: ○。2巡目以降で確認
- ◎ は原則スキップ可能なため next_review_targets には入れない

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

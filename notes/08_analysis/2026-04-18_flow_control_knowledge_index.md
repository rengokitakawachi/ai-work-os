# 2026-04-18 flow_control_knowledge_index

## 目的

Flow Control 周辺で分散していた design / analysis / archived background を、
再開時に迷わず辿れる入口として 1 枚にまとめる。

本メモは、

- どの論点で何を見ればよいか
- 現役参照はどこか
- 背景原則はどこか
- まだ未了は何か

を論点別に整理するための index である。

---

## 使い方

最初にこの index を見て、
扱いたい論点の

- `current_primary_refs`
- `background_refs`
- `archive_ref`
- `open_edges`

を辿る。

原則として、
仕様判断は `current_primary_refs` を優先し、
背景確認が必要なときだけ `background_refs` を見る。

---

## 1. issue routing

### current_primary_refs

- `notes/02_design/2026-04-15_issue_routing_variable_assessment_schema.md`
- `notes/02_design/2026-04-16_issue_routing_notes_write_minimum_usecase.md`
- `notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md`
- `notes/02_design/2026-04-16_operations_candidate_queue_to_rolling_io.md`
- `notes/08_analysis/2026-04-18_issue_routing_recent_analysis_consolidated.md`

### background_refs

- `notes/08_analysis/2026-04-18_issue_routing_background_consolidated.md`

### 何が分かるか

- 可変評価を issue 本体から分ける
- routing decision と action plan を分ける
- notes write は `applyIssueRoutingActionPlan` に分ける
- operations は queue payload までで止める
- queue は rolling 前入力 source として扱う
- postprocess の current state

### open_edges

- future / archive apply
- queue payload を使った repo 実体 dry_run
- review 地点での routing decision 再評価接続
- design draft の高度 merge

---

## 2. design routing

### current_primary_refs

- `notes/02_design/2026-04-17_design_routing_minimum_usecase.md`
- `notes/02_design/2026-04-17_design_routing_output_schema.md`
- `notes/02_design/2026-04-17_apply_design_routing_action_plan_minimum_usecase.md`

### background_refs

- `notes/08_analysis/2026-04-18_design_routing_background_consolidated.md`

### 何が分かるか

- design routing も二段分離する
  - `routeDesignCandidates`
  - `applyDesignRoutingActionPlan`
- route 先は
  - `docs / design / future / archive / operations`
- docs は候補化まで
- retained design は no-op
- operations は queue payload まで
- future / archive は後段 draft / write へ渡す

### open_edges

- future / archive apply の実 write 方針
- docs candidate patch 形式の固定
- repo 実体での test / dry_run 確認

---

## 3. operations / reroll / scoring

### current_primary_refs

- `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- `notes/02_design/2026-04-16_operations_ranking_priority_axes.md`
- `notes/02_design/2026-04-16_active_operations_as_reroll_candidate_source.md`
- `notes/02_design/2026-04-18_scoring_knowledge_accumulation_policy.md`
- `notes/02_design/2026-04-18_score_driven_operations_ranking_minimum_model.md`
- `notes/08_analysis/2026-04-18_operations_reroll_scoring_recent_knowledge_consolidated.md`

### background_refs

- `notes/08_analysis/2026-04-18_operations_reroll_scoring_recent_knowledge_consolidated.md`
  - reference map から archive originals を辿れる

### 何が分かるか

- operations は生成される短期実行正本
- reroll は plan / active / next / queue を同じ土俵に乗せる
- active は reroll candidate source に戻る
- ranking は plan_alignment 優先で、active continuity は light bias
- score は gate / score / override の3層へ寄せる
- scoring knowledge は dev_memo → design で育てる

### open_edges

- repo 実体での reroll dry_run 実確認
- quick_win 等の実入力強化
- candidate から notes 正本 task writer への後段確認

---

## 4. review / execution governance

### current_primary_refs

- `notes/02_design/2026-04-08_stale_active_recovery_rule.md`
- `notes/02_design/2026-04-18_daily_review_output_to_content_and_operations_connection_rule.md`

### related_refs

- `notes/04_operations/active_operations.md`
- `notes/07_reports/README.md`
- `notes/09_content/README.md`

### 何が分かるか

- stale active recovery は reroll ではない
- daily review は
  - operations 更新
  - Todoist projection 更新
  - report 保存
  - content 抽出
  の順で閉じる
- review / report / content / routing を混ぜない

### open_edges

- review から routing decision 再評価への正式接続
- content 抽出の自動判定条件

---

## 5. decisions

### current_primary_refs

- `notes/02_design/2026-04-18_decisions_minimum_operating_model_for_adam.md`
- `notes/05_decisions/README.md`

### 何が分かるか

- decisions は採用判断の記録
- docs の代替ではなく判断履歴
- `source_ref` と `related_refs` を分ける
- 1 decision 1 file で selective capture する

### open_edges

- 実 decision file の運用開始
- superseded 関係の観測
- review と decisions の接続

---

## 6. active operations / execution projection

### current_primary_refs

- `notes/04_operations/active_operations.md`

### related_refs

- `notes/02_design/2026-04-18_operations_task_granularity_and_day_capacity_rule.md`
- `notes/02_design/2026-04-18_daily_review_output_to_content_and_operations_connection_rule.md`

### 何が分かるか

- active は短期実行順の正本
- Todoist は projection
- task 粒度は 0.5〜1.5h 目安
- Day は 1 task 固定ではなく複数 task を置ける箱

### open_edges

- PC での design routing test / reroll sample dry_run 実行
- daily review 時の archive / carryover 処理

---

## 7. いま最初に見る順

再開時は、原則として次の順が分かりやすい。

1.
`notes/04_operations/active_operations.md`

2.
扱う論点の `current_primary_refs`

3.
必要に応じて `background_refs`

4.
さらに必要なら archive originals

---

## 8. いま未完了の本筋

現時点で、notes 整理を除いた本筋の未完了は主に次である。

- PC での design routing test 実行
- PC での reroll sample dry_run 実行
- issue/design routing の future / archive apply 要否判断
- review 地点での routing decision 再評価接続

---

## 判断

Flow Control 周辺は、
大きな構造未整理よりも
参照入口の不在が主要なボトルネックになっていた。

したがって現段階では、
この index を入口にして

- current core design
- background consolidated notes
- archive originals

を層で辿れるようにするのが自然である。

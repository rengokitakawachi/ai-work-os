# 2026-04-21 flow_control_new_handoff_shape_unification

## 目的

flow-control における
routing と writing の分離が、
新 handoff shape で
どこまで統一できたかを記録する。

本メモは、
issue / design / intake の 3 系統で
旧 shape 依存をどこまで除去できたかを整理し、
次の主タスクを
実 test 実行確認へ絞ることを目的とする。

---

## 参照

- `notes/02_design/2026-04-20_routing_and_document_writing_separation.md`
- `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md`
- `notes/02_design/2026-04-17_design_routing_output_schema.md`
- `notes/02_design/2026-04-21_writer_fallback_removal_preparation.md`
- `notes/08_analysis/2026-04-21_routing_handoff_compatibility_exit_strategy.md`
- `notes/08_analysis/2026-04-21_routing_return_compatibility_inventory.md`
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/design-routing.js`
- `src/services/flow-control/intake-routing.js`
- `src/services/flow-control/issue-routing-notes-write.js`
- `src/services/flow-control/design-routing-notes-write.js`
- `src/services/flow-control/issue-routing.test.js`
- `src/services/flow-control/design-routing.test.js`
- `src/services/flow-control/intake-routing.test.js`

---

## 結論

flow-control の routing / writing は、
コード上の I/O では
新 handoff shape にほぼ統一できた。

現在の正規 shape は次である。

- `normalized_items`
- `routing_decisions`
- `action_plan`

または intake のように writer を持たない系では、

- `normalized_items`
- `routing_decisions`
- `grouped`

である。

旧 shape だった

- `routed_candidates`
- `routed_design_candidates`

は、
issue / design / intake の routing return から除去した。

writer 側でも
旧 shape fallback は除去済みである。

したがって現時点の状態は、
**flow-control 全系統で
新 handoff shape を正規 I/O として扱える段階**
と整理できる。

---

## 何を統一したか

### 1. issue routing

現在の return:

- `mode`
- `normalized_items`
- `routing_decisions`
- `action_plan`
- `grouped`

補足:
- `routed_candidates` は返さない
- writer は新 shape のみを受ける

---

### 2. design routing

現在の return:

- `mode`
- `normalized_items`
- `routing_decisions`
- `action_plan`
- `grouped`

補足:
- `routed_design_candidates` は返さない
- writer は新 shape のみを受ける

---

### 3. intake routing

現在の return:

- `mode`
- `normalized_items`
- `routing_decisions`
- `grouped`

補足:
- intake は writer を持たない
- `routed_candidates` は返さない

---

## writer 側の状態

### issue writer

`applyIssueRoutingActionPlan`
の正規入力は次である。

- `normalizedItems`
- `routingDecisions`
- `actionPlan`
- `sourceRef`
- `mode`
- `now`

除去済み:
- `routedCandidates`

---

### design writer

`applyDesignRoutingActionPlan`
の正規入力は次である。

- `normalizedItems`
- `routingDecisions`
- `actionPlan`
- `sourceRef`
- `mode`
- `now`

除去済み:
- `routedDesignCandidates`

---

## test 側の状態

通常系 test は、
issue / design / intake の全てで
新 shape 前提に揃えた。

具体的には次が成立している。

- 通常系 test で旧 shape を主入力にしない
- writer fallback 専用 test は削除済み
- intake test の互換 field 存在確認も削除済み

つまり、
test 境界でも
「新 shape が正」
という扱いに寄せられている。

---

## 今回の意味

今回の整理で大きいのは次である。

### 1. decision 層と post-routing 層が分かれた

- `normalized_items`
- `routing_decisions`
- `action_plan`

を分けて扱えるため、
routing / writing の責務境界が明確になった。

### 2. 合成済み view へ戻りにくくなった

旧 shape は
1配列に情報を詰める合成 view だった。

これを除去したことで、
後段が再び旧 I/O に戻る圧力が減った。

### 3. issue / design / intake を同じ説明軸で扱える

3 系統で handoff shape が揃ったため、
flow-control 全体の理解と保守が軽くなった。

---

## まだ未確認のもの

実装整理は進んだが、
まだ次は未確認である。

### 1. 実ファイル環境での `node --test`

この場では repo 実ファイル環境に対する
直接の test 実行確認は完了していない。

したがって、
コード整理完了
と
実行確認完了
はまだ分けて扱う必要がある。

### 2. 周辺 adapter との回帰

主要 flow-control ファイルは整理したが、
周辺 adapter を含む実行経路全体の回帰は
test 実行で最終確認する必要がある。

---

## 次に自然なタスク

ここから先の自然なタスクは次である。

1.
実ファイル環境で
`node --test`
を実行する

2.
新 shape 主経路で
回帰がないかを確認する

3.
必要なら、
この到達点を handover や report に反映する

---

## 判断

flow-control の routing / writing 分離は、
設計だけでなく
コード上の I/O でも
新 handoff shape に到達した。

したがって、
今後の主論点は
互換撤去ではなく
**実行確認と運用確認**
へ移ったと判断してよい。

現時点の自然な結論は次である。

- shape 統一は完了
- writer fallback は除去済み
- return compatibility も除去済み
- 残りの主タスクは `node --test` による回帰確認

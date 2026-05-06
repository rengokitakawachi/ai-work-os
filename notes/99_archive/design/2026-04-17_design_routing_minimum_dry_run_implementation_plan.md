# 2026-04-17 design_routing_minimum_dry_run_implementation_plan

## 目的

design routing を code に入れる直前の、
最小 dry_run 実装計画を固定する。

本メモは、
ここまで整理した

- `design-routing.js` skeleton
- `design-routing-rules.js` skeleton
- `design-routing-actions.js` skeleton
- design routing の input / output / rules / action plan

を、
どの順で code に反映するかを明確にするための implementation design である。

---

## 結論

今回 code に入れる最小到達点は次とする。

```text
routeDesignCandidates(...) を dry_run で呼ぶと、

- mode
- routed_design_candidates
- action_plan

が返る
```

ここでの `action_plan` は、

- docs_candidates
- design_retained
- future_candidates
- archive_design
- operations_candidates
- skipped

を持つ。

ただし、
この段階ではまだ

- docs candidate の自動 patch 生成
- future / archive body 生成
- apply usecase
- design note 一括 read の高度対応

は入れない。

---

## 今回の反映対象ファイル

最小では次の 4 本でよい。

- `src/services/flow-control/design-routing.js`
- `src/services/flow-control/design-routing-rules.js`
- `src/services/flow-control/design-routing-actions.js`
- `src/services/flow-control/adapters.js`

必要なら補助で次を触る。

- `src/services/flow-control/index.js` 相当の export file
- テスト file

---

## 反映順

### 第1段

`adapters.js`
に
`buildDesignRoutingSourceBundle(...)`
を追加する。

ここでは、
最小で次を行う。

- design note 1件を source bundle 化する
- `source_type: design`
- `candidate_type: design`
- `design_id / title / summary / source_ref / metadata`
を持つ item を返す

最初は、
notes/02_design の markdown を高度 parse しなくてよい。

---

### 第2段

`design-routing-rules.js`
を追加する。

ここでは、

- `resolveMaturityNow`
- `resolveExecutionValueNow`
- `resolveDocsReadyNow`
- `resolveReason`
- `resolveReviewAt`
- `matchesArchiveRule`
- `matchesFutureRule`
- `matchesDocsRule`
- `matchesOperationsRule`
- `evaluateDesignCandidate`
- `buildDesignRoutingEvaluations`

を入れる。

判定順は固定で、

```text
archive
→ future
→ docs
→ operations
→ design
```

とする。

---

### 第3段

`design-routing-actions.js`
を追加する。

ここでは、

- `buildDocsCandidate`
- `buildDesignRetained`
- `buildFutureCandidate`
- `buildArchiveDesign`
- `buildOperationsCandidate`
- `buildSkipped`
- `buildDesignRoutingActionPlan`

を入れる。

この段階では、
write-ready payload ではなく
action_plan payload までに留める。

---

### 第4段

`design-routing.js`
を追加する。

ここでは、

- `groupDesignRoutingDecisions`
- `buildDesignRoutingDecision`
- `routeDesignCandidates`
- `routeSingleDesignCandidate`
- `routeDesignNotes`

を入れる。

流れは次で固定する。

```text
collectCandidates
→ normalizeCandidates
→ buildDesignRoutingEvaluations
→ buildDesignRoutingDecision
→ groupDesignRoutingDecisions
→ buildDesignRoutingActionPlan
→ return
```

---

## 今回の確認観点

### 1. 最小 I/O shape

`routeSingleDesignCandidate(...)`
で、
少なくとも次が返ること。

- `mode`
- `routed_design_candidates`
- `action_plan`

### 2. rule の分岐

5 ケースで route が分かれること。

- archive
- future
- docs
- operations
- design

### 3. 優先順の確認

- `docs_ready_now = true`
  かつ
  `execution_value_now = high`
  → `docs`

- `maturity_now = superseded`
  → 常に `archive`

### 4. action_plan の key 整合

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`
- `skipped`

が必ず返ること。

---

## 今回まだ入れないもの

今回の dry_run 実装では、
次を入れない。

### 1. apply usecase

- `applyDesignRoutingActionPlan`
- future / archive write
- docs candidate write

### 2. docs patch 高度化

- `target_doc` の自動推定精密化
- `revised_text` 自動生成
- patch proposal 自動生成

### 3. future / archive body 生成

- suggested_file の厳密生成
- body テンプレート整備

### 4. design note 高度 parse

- markdown の section parse 強化
- metadata 抽出の高度化

### 5. design routing decision の履歴保存

- decisions note 保存
- review ごとの履歴差分管理

---

## 今回の success criteria

今回成功とみなす条件は次である。

1.
`routeDesignCandidates(...)`
が import / call できる

2.
単一 design candidate で route が返る

3.
5 route 例で期待 route が返る

4.
`action_plan` が正しい key を持つ

5.
issue routing 既存実装を壊さない

---

## 反映後の次手

今回 dry_run が通ったら、
次の順が自然である。

1.
`applyDesignRoutingActionPlan`
の skeleton 実装

2.
`future / archive` の suggested_file と body 生成

3.
`docs_candidates` の target_doc / revised_text の最小化

4.
notes/02_design の input adapter 改善

---

## 判断

design routing の code 反映は、
まず

- adapter
- rules
- actions
- orchestration

の 4 段で dry_run 実装を通すのが自然である。

この段階で重要なのは、
write を進めることではなく、
**design routing の decision 層と action_plan 層が実際の code で返ること**
である。

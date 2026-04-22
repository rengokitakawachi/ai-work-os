# 2026-04-22 design_retain_no_op_layer_mismatch

## 対象

`design retain fallback の no_op 欠落が仕様変更か不整合かを整理する`

---

## 結論

現時点では、この fail は **実装不整合より test の参照層ずれ** と見るのが自然である。

---

## 観測

- file: `src/services/flow-control/design-routing.test.js`
- test: `routeSingleDesignCandidate falls back to design retain`
- 期待: `result.action_plan.design_retained[0].write_status === 'no_op'`
- 実際: `undefined`

---

## code 読み取り

### 1. routing 層

`routeSingleDesignCandidate` は `routeDesignCandidates` を通じて

- `normalized_items`
- `routing_decisions`
- `action_plan`
- `grouped`

を返す。

ここでの `action_plan.design_retained` は `buildDesignRoutingActionPlan` が生成し、
`toDesignActionItem(..., 'keep_design')` を push している。

この item には

- `route_to`
- `reason`
- `evaluated_at`
- `action_type`

などは入るが、`write_status` は入っていない。

### 2. apply 層

`applyDesignRoutingActionPlan` は `design_retained_results` を返し、
`buildDesignRetainedResult` の中で

- `write_status: 'no_op'`

を付けている。

つまり `no_op` は routing action plan ではなく、apply / write result 層で付与される。

---

## 判断

今回の fail は

- routing 層の戻り値に `no_op` を期待している

が、現実装では

- apply 結果層で `no_op` を返す

という層の違いによるものと判断できる。

したがって、第一判断としては

- design retain path が壊れている

とはまだ言えない。

より自然なのは

- test の期待位置を apply result 層へ寄せる
- もしくは action_plan 層でも `write_status` を持つ設計へ変えるかを別途判断する

のどちらかである。

ただし現時点では、既存 apply test が
`design_retained_results[0].write_status === 'no_op'`
を確認しており、その層での保証はすでにある。

このため、最小判断としては **test 側期待値の参照層ずれ** と整理するのが妥当である。

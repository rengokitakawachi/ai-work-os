# 2026-04-17 route_design_candidates_function_split

## 目的

`routeDesignCandidates`
を code に落とすときの
最小関数分割を固定する。

本メモは、
現行の

- `issue-routing.js`
- `rules.js`
- `placement.js`

の分割に寄せながら、
design routing を小さく実装できる関数構成を定義するための design である。

---

## 結論

最小構成は次でよい。

1.
`routeDesignCandidates`

2.
`routeSingleDesignCandidate`

3.
`routeDesignNotes`

4.
`evaluateDesignCandidate`

5.
`evaluateDesignCandidates`

6.
`buildDesignRoutingDecision`

7.
`buildDesignRoutingActionPlan`

8.
`groupDesignRoutingDecisions`

このうち、

- `routeDesignCandidates`
が orchestration
- `evaluateDesignCandidate(s)`
が rule 判定
- `buildDesignRoutingDecision`
が candidate 単位 decision 整形
- `buildDesignRoutingActionPlan`
が grouped decision → action plan 化

を担う。

---

## 最小の責務分離

### 1. routeDesignCandidates

責務

- input bundle を受ける
- candidate collection / normalization を呼ぶ
- evaluation を呼ぶ
- decision を組み立てる
- action plan を組み立てる
- 最終 output を返す

返り値

- `mode`
- `routed_design_candidates`
- `action_plan`

### 2. routeSingleDesignCandidate

責務

- 単一 design item を route するための thin wrapper

用途

- テスト
- 会話中の単発確認

### 3. routeDesignNotes

責務

- notes/02_design の入力を source bundle 化し、
  `routeDesignCandidates` を呼ぶ thin wrapper

用途

- design review からの一括 dry run
- design file 群の routing 試験

---

## rule 層

### 4. evaluateDesignCandidate

責務

- 1 candidate の route を rule で判定する
- 優先順
  `archive → future → docs → operations → design`
  を適用する
- decision meta を付与する

最小返り値

- `candidate_id`
- `route_to`
- `reason`
- `review_at`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `next_action`
- `needs_task_generation`

### 5. evaluateDesignCandidates

責務

- 配列 candidate を順に `evaluateDesignCandidate` へ通す

用途

- `routeDesignCandidates` から呼ぶ map wrapper

---

## decision / grouping 層

### 6. buildDesignRoutingDecision

責務

- normalized candidate と evaluation を merge する
- post-routing usecase が参照しやすい candidate 形へ整形する

最小項目

- `candidate_id`
- `design_id` or `path`
- `title`
- `summary`
- `source_ref`
- `route_to`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `next_action`
- `metadata`
- `task_draft`（operations のときのみ）

### 7. buildDesignRoutingActionPlan

責務

- routed design candidates を `route_to` ごとにまとめる
- `action_plan` の 5 系統 + skipped を組み立てる

出力キー

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`
- `skipped`

### 8. groupDesignRoutingDecisions

責務

- routed design candidates を route ごとに grouped する

最小キー

- `docs`
- `design`
- `future`
- `archive`
- `operations`
- `skipped`

これは `buildDesignRoutingActionPlan`
の前段 helper とする。

---

## 関数間の流れ

最小フローは次でよい。

```text
sourceBundles
→ collectCandidates
→ normalizeCandidates
→ evaluateDesignCandidates
→ buildDesignRoutingDecision
→ groupDesignRoutingDecisions
→ buildDesignRoutingActionPlan
→ return {
     mode,
     routed_design_candidates,
     action_plan
   }
```

---

## issue routing との対応

### issue routing 現行

- `routeIssueCandidates`
- `routeSingleIssueCandidate`
- `routeIssueLogFromNotes`
- `evaluateCandidates`
- `buildPlacementDecisions`
- `groupRoutingDecisions`

### design routing 最小案

- `routeDesignCandidates`
- `routeSingleDesignCandidate`
- `routeDesignNotes`
- `evaluateDesignCandidates`
- `buildDesignRoutingDecision`
- `groupDesignRoutingDecisions`
- `buildDesignRoutingActionPlan`

完全同型ではないが、

- routing entry
- rule evaluation
- decision shaping
- grouping
- action plan build

の責務分割はかなり揃う。

---

## needs_task_generation の扱い

`operations`
へ送る design だけ、

- `needs_task_generation: true`

を持たせればよい。

他 route は原則 false でよい。

これにより、
`task_draft`
生成の条件が明確になる。

---

## task_draft の扱い

`operations`
へ送る場合のみ、
最小で次を生成する。

- `task`
- `source_ref`
- `notes`

必要なら後で

- `quick_win`
- `why_now`

を追加できるが、
最小段階では必須にしない。

---

## 先にやらないこと

最小段階では次をやらない。

- design candidate 専用 normalize の複雑化
- docs patch 自動生成の高度化
- duplicate design 自動統合
- route rule の score 化
- current phase 精密判定
- design routing decision 履歴保存

まずは、
`routeDesignCandidates`
を安定して dry_run できる構成を優先する。

---

## code file 配置の最小案

最小では次のどちらでもよい。

### 案A: 既存 file を再利用

- `src/services/flow-control/design-routing.js`
- `src/services/flow-control/design-routing-actions.js`
- `src/services/flow-control/rules.js`
- `src/services/flow-control/placement.js`

### 案B: design 専用 rule helper を切る

- `src/services/flow-control/design-routing.js`
- `src/services/flow-control/design-routing-actions.js`
- `src/services/flow-control/design-routing-rules.js`
- `src/services/flow-control/design-routing-placement.js`

最小段階では
案A の方が差分は小さい。

ただし、
issue routing rule と design routing rule が混線するなら
案B に寄せる方が安全である。

---

## 初手の自然な実装順

1.
`design-routing.js`
を追加する

2.
`evaluateDesignCandidate`
を最小で書く

3.
`routeDesignCandidates`
から
`routed_design_candidates`
まで返す

4.
`buildDesignRoutingActionPlan`
を足す

5.
`applyDesignRoutingActionPlan`
は後段で追加する

つまり、
**先に decision 層、後で payload 層**
が自然である。

---

## 判断

`routeDesignCandidates`
の code-ready な最小関数分割としては、

- entry
- rule evaluation
- decision shaping
- grouping
- action plan build

に分けるのが自然である。

特に、
`routeDesignCandidates`
をいきなり巨大関数にせず、

- `evaluateDesignCandidate`
- `buildDesignRoutingDecision`
- `buildDesignRoutingActionPlan`

に責務を割ることで、
issue routing との対称性を保ったまま安全に実装へ進める。

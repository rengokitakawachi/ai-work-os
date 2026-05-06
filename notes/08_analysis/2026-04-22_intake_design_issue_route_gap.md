# 2026-04-22 intake_design_issue_route_gap

## 対象

`intake routing の design / issue 期待値ズレが test 側か実装側かを切り分ける`

---

## 結論

現時点では、この fail は **test の期待ズレだけではなく、spec に対して current implementation が未達の可能性が高い** と判断する。

---

## 観測

- file: `src/services/flow-control/intake-routing.test.js`
- test: `routeSingleIntakeCandidate returns handoff-friendly shape`
- 期待: `route_to === 'design'`
- 実際: `route_to === 'issue'`

---

## code 読み取り

`routeSingleIntakeCandidate` は独自 rule ではなく、共通の

- `evaluateCandidates`
- `buildPlacementDecisions`

を使っている。

現行 `rules.js` では

- `candidate_type === 'design'` のときだけ `route_to: 'design'`
- `source_type === 'issue'` なら issue routing 用の追加分岐
- それ以外の通常 intake は最終的に `route_to: 'issue'`

となっている。

今回の test データは

- `sourceType: 'conversation'`
- `metadata.category: 'architecture'`
- `impact: 'high'`

だが、`candidate_type: 'design'` ではない。

そのため、現 code では `issue` に落ちるのが自然である。

---

## spec 読み取り

### 1. `intake_review_and_source_ref_spec.md`

保存先判定は

- 問題として扱う → issue
- 設計が必要 → design
- 今はやらない → future

とされている。

### 2. `2026-04-12_intake_and_issue_routing_minimum_roles.md`

intake routing の最小責務として

- 問題として扱う → issue
- 設計として扱う → design
- 今は扱わない → future
- 役目終了 → archive

が固定されている。

### 3. `2026-04-21_intake_routing_minimum_operation_experiment.md`

第一段階で観測すべき最小分岐は

- `issue / design / future`

の 3 系統であると整理されている。

---

## 判断

test の `design` 期待は、spec 側の意図としては自然である。

一方で current implementation は、通常 intake に対して
`design` へ送る条件をまだ十分に持っていない。

したがって今回の fail は

- test が完全に間違っている

よりも

- current implementation が spec にまだ届いていない

と見る方が自然である。

---

## 含意

- design 側 fail は test 参照層ずれの可能性が高い
- intake 側 fail は spec と実装のギャップの可能性が高い

よって、次の自然な task は

- intake routing の `issue / design / future` 最小分岐を spec に沿って実装する

である。

ただし会話起点 issue routing との役割差を壊さないよう、
`design` に送る条件は最小に絞って入れるべきである。

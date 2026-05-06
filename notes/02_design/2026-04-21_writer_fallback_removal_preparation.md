# 2026-04-21 writer_fallback_removal_preparation

## 目的

routing と writing の分離を一段進めるために、
writer 側に残っている旧 shape fallback を
どの順で外すかを固定する。

本メモは、
`routedCandidates`
および
`routedDesignCandidates`
への依存を、
writer の通常経路から除去するための事前差分案である。

---

## 参照

- `notes/02_design/2026-04-20_routing_and_document_writing_separation.md`
- `notes/02_design/2026-04-17_apply_design_routing_action_plan_minimum_usecase.md`
- `notes/08_analysis/2026-04-21_routing_handoff_compatibility_exit_strategy.md`
- `src/services/flow-control/issue-routing-notes-write.js`
- `src/services/flow-control/design-routing-notes-write.js`
- `src/services/flow-control/issue-routing.test.js`
- `src/services/flow-control/design-routing.test.js`

---

## 結論

writer fallback の撤去は、
routing 返り値互換の撤去より先に行うのが自然である。

対象は次の 2 つである。

1.  
`applyIssueRoutingActionPlan`
内の
`routedCandidates`
fallback

2.  
`applyDesignRoutingActionPlan`
内の
`routedDesignCandidates`
fallback

撤去後の writer 主入力は、
明示的に次へ固定する。

- `normalized_items`
- `routing_decisions`
- `action_plan`

ただし、
この変更は
**node test による新 shape 主経路の回帰確認後**
に適用する。

---

## なぜ writer fallback を先に外すか

理由は 3 つある。

### 1. writer が handoff の主境界だから

routing / writing 分離で最も重要なのは、
writer が何を正規入力とみなすかである。

ここに旧 shape fallback が残ると、
表面上は分離していても、
実質は合成済み view へ戻りやすい。

### 2. 返り値互換より安全に閉じられるから

routing 側の返り値に
`routed_candidates`
`routed_design_candidates`
が残っていても、
writer がそれを読まなければ
正規経路は保てる。

したがって、
まず writer 側から閉じる方が安全である。

### 3. test も既に新 shape 主体へ寄っているから

通常系 test はすでに
`normalizedItems / routingDecisions / actionPlan`
中心に移している。

残っている旧 shape は
互換専用 test だけなので、
writer fallback を外す準備ができている。

---

## 現在の fallback 依存

### issue writer

`src/services/flow-control/issue-routing-notes-write.js`

現在は次を受ける。

- `normalizedItems`
- `routingDecisions`
- `routedCandidates`
- `actionPlan`

lookup map は次で構成される。

- `normalizedByCandidateId`
- `routingByCandidateId`
- `routedByCandidateId`

そのため、
summary / source_ref / quick_win / task_draft の一部で
`routedCandidate`
fallback を見ている。

---

### design writer

`src/services/flow-control/design-routing-notes-write.js`

現在は次を受ける。

- `normalizedItems`
- `routingDecisions`
- `routedDesignCandidates`
- `actionPlan`

こちらも同様に
`routedCandidate`
fallback を持つ。

特に次で fallback が残る。

- `mergeSourceRef`
- future/archive の summary 解決
- operations candidate の draft 補完
- docs candidate の source_design 補完

---

## 撤去前提条件

撤去前に満たすべき条件は次である。

1.  
通常系 test が
新 shape のみで通ること

2.  
`action_plan`
の bucket item に、
writer が必要な最小情報が既に乗っていること

3.  
`normalized_items`
と
`routing_decisions`
だけで、
summary / source_ref / task_draft の解決ができること

4.  
compatibility 確認が必要なら、
それは routing 返り値側の専用確認に残すこと

---

## 撤去後の writer 入力

撤去後、
writer の正規入力は次に固定する。

- `normalizedItems`
- `routingDecisions`
- `actionPlan`
- `sourceRef`
- `mode`
- `now`

ここから外すもの:

- `routedCandidates`
- `routedDesignCandidates`

---

## 変更対象

### 1. issue-routing-notes-write.js

変更対象:

- `createItemLookupMaps`
- `resolveContextForActionItem`
- `mergeSourceRef`
- `resolveQuickWin`
- `resolveSummary`
- `buildOperationsCandidateWrite`

方針:

- `routedByCandidateId` を削る
- `resolvedContext.routedCandidate` 参照を削る
- 補完元は
  `normalizedItem`
  と
  `actionItem`
  のみに寄せる

### 2. design-routing-notes-write.js

変更対象:

- `createLookupMaps`
- `resolveContextForActionItem`
- `mergeSourceRef`
- `buildDocsCandidateWrite`
- `buildFutureWrite`
- `buildArchiveWrite`
- `buildOperationsCandidateWrite`

方針:

- `routedByCandidateId` を削る
- `routedCandidate` 参照を削る
- `design_id / summary / source_ref`
  は
  `actionItem`
  と
  `normalizedItem`
  からだけ解決する

---

## 差し替え方針

### issue writer

#### 1. lookup map

現状:
- normalized
- routing
- routed

変更後:
- normalized
- routing

#### 2. source_ref

現状:
- actionItem
- normalizedItem
- routedCandidate
- context.sourceRef

変更後:
- actionItem
- normalizedItem
- context.sourceRef

#### 3. summary / quick_win / task_draft

現状:
- actionItem
- normalizedItem
- routedCandidate
- metadata

変更後:
- actionItem
- normalizedItem
- metadata

必要なら、
不足分は action plan 生成側へ戻して補う。

---

### design writer

#### 1. lookup map

現状:
- normalized
- routing
- routed

変更後:
- normalized
- routing

#### 2. source_design / design_id

現状:
- actionItem
- normalizedItem
- routedCandidate

変更後:
- actionItem
- normalizedItem

#### 3. summary

現状:
- actionItem
- normalizedItem
- routedCandidate

変更後:
- actionItem
- normalizedItem

#### 4. operations candidate draft

現状:
- actionItem.candidate_draft
- fallback 生成
- routedCandidate 補助

変更後:
- actionItem.candidate_draft
- fallback 生成
- normalizedItem 補助のみ

---

## 影響範囲

直接影響:

- `src/services/flow-control/issue-routing-notes-write.js`
- `src/services/flow-control/design-routing-notes-write.js`

確認対象:

- `src/services/flow-control/issue-routing.test.js`
- `src/services/flow-control/design-routing.test.js`

間接影響:

- `action_plan` の bucket item に必要情報が足りない場合、
  action plan 生成側の補強が必要になる

---

## 先に見るべき不足

writer fallback を外す前に、
次の不足がないかを見る。

### issue routing

- `operations_candidates` に quick_win が十分載るか
- `design_updates / future_candidates / archive_items` に
  summary と source_ref が十分載るか

### design routing

- `docs_candidates` に design_id が十分載るか
- `future_candidates / archive_design` に
  summary と source_ref が十分載るか
- `operations_candidates` に candidate_draft が十分載るか

不足がある場合は、
writer ではなく
`buildIssueRoutingActions`
または
`buildDesignRoutingActionPlan`
側で補う方が自然である。

---

## test 方針

撤去時の test 方針は次とする。

### 通常系

- すでに新 shape 主入力なので維持
- 変更後も同じ test が通ることを確認する

### 互換系

- writer fallback 用 test は削除する
- 代わりに、
  routing 返り値互換の存在確認だけ残すか再判定する

つまり、
writer fallback 撤去後は
互換 test も縮退させる。

---

## rollback 点

もし撤去で不足が出た場合の戻し先は明確である。

1.  
不足データを action plan 生成側へ戻す

2.  
それでも足りない場合だけ、
一時的に writer fallback を戻す

ただし原則は、
writer 側に再び旧 shape 依存を増やさない。

---

## 次に自然な実行順

1.  
実ファイル環境で `node --test` を通す

2.  
issue writer から fallback を削る

3.  
design writer から fallback を削る

4.  
互換専用 writer test を削る

5.  
最後に routing 返り値互換の撤去可否を判定する

---

## 判断

writer fallback は、
routing / writing 分離を半端にする最後の残りである。

したがって、
次の固定が自然である。

- writer の正規入力は
  `normalized_items / routing_decisions / action_plan`
- `routedCandidates / routedDesignCandidates`
  は writer から外す
- 不足があれば writer ではなく action plan 生成側で補う

この順なら、
責務分離を崩さずに
compatibility をさらに縮退できる。

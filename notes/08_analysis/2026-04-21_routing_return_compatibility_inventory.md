# 2026-04-21 routing_return_compatibility_inventory

## 目的

`routed_candidates`
および
`routed_design_candidates`
の残存箇所を棚卸しし、
返り値互換を外す前に
何がまだ残っているかを明確にする。

本メモは、
writer fallback 撤去後の現状を記録し、
旧 shape がどこまで縮退できたかを確認するための analysis である。

---

## 参照

- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/design-routing.js`
- `src/services/flow-control/intake-routing.js`
- `src/services/flow-control/issue-routing-notes-write.js`
- `src/services/flow-control/design-routing-notes-write.js`
- `src/services/flow-control/issue-routing.test.js`
- `src/services/flow-control/design-routing.test.js`
- `src/services/flow-control/intake-routing.test.js`
- `notes/08_analysis/2026-04-21_routing_handoff_compatibility_exit_strategy.md`
- `notes/02_design/2026-04-21_writer_fallback_removal_preparation.md`

---

## 結論

writer 側で
旧 shape を読む箇所は、
issue / design ともに
もう残っていない。

現在残っている旧 shape は、
主に次の 2 種類である。

1.  
routing 関数の返り値に含まれる互換 field

- `routed_candidates`
- `routed_design_candidates`

2.  
その存在を前提にした最小限の返り値確認

- intake routing の shape 確認
- route result の互換 view 確認余地

したがって現時点の状態は、
**旧 shape は writer からは切り離され、
routing return の互換 view としてだけ残っている**
と整理できる。

---

## writer 側の現状

### issue writer

`applyIssueRoutingActionPlan`
の入力は現在次である。

- `normalizedItems`
- `routingDecisions`
- `actionPlan`
- `sourceRef`
- `mode`
- `now`

除去済み:
- `routedCandidates`

確認できたこと:
- lookup map に routed candidate はない
- source_ref merge に routed candidate はない
- summary 解決に routed candidate はない
- operations candidate draft 補完に routed candidate はない

---

### design writer

`applyDesignRoutingActionPlan`
の入力は現在次である。

- `normalizedItems`
- `routingDecisions`
- `actionPlan`
- `sourceRef`
- `mode`
- `now`

除去済み:
- `routedDesignCandidates`

確認できたこと:
- lookup map に routed candidate はない
- source_ref merge に routed candidate はない
- design_id 解決に routed candidate はない
- future/archive summary 解決に routed candidate はない
- operations candidate draft 補完に routed candidate はない

---

## 旧 shape が残っている箇所

### 1. issue routing return

`src/services/flow-control/issue-routing.js`

現在も返す:
- `routed_candidates`

位置づけ:
- `normalized_items` と `routing_decisions` を合成した互換 view

---

### 2. design routing return

`src/services/flow-control/design-routing.js`

現在も返す:
- `routed_design_candidates`

位置づけ:
- `normalized_items` と `routing_decisions` を合成した互換 view

---

### 3. intake routing return

`src/services/flow-control/intake-routing.js`

現在も返す:
- `routed_candidates`

位置づけ:
- intake は writer を持たないが、
  互換 shape はまだ返り値に残している

---

### 4. test 側

#### issue-routing.test.js

通常系:
- 新 shape 前提

残存:
- 返り値互換 field の存在を明示的に使う通常 test はない

#### design-routing.test.js

通常系:
- 新 shape 前提

残存:
- writer fallback test は削除済み
- routed design candidates を主入力に使う通常 test はない

#### intake-routing.test.js

残存:
- `result.routed_candidates.length === 1`
  をまだ確認している

これは、
返り値互換 field の存在確認として残っている。

---

## 残っていないもの

すでに残っていないものは次である。

- writer fallback lookup
- writer の routed candidate 参照
- writer fallback 専用 test
- 通常系 test での routed candidate 主入力
- design note 上で旧 shape を正規 handoff として扱う説明

---

## 現時点の互換の位置づけ

現状の旧 shape は、
もはや「処理のために必要な入力」ではない。

役割は次に限定されている。

- 返り値互換
- 合成済み view の比較確認
- 移行中の可視化補助
- intake の最小 shape 互換

つまり、
旧 shape は **読み取り用の互換 view** にまで縮退している。

---

## 返り値互換撤去の前提

返り値互換を外す前に、
最低限次を満たすのが自然である。

1.  
`node --test` による新 shape 主経路の回帰確認

2.  
intake routing でも
`routed_candidates` の存在確認を外して問題ないことの確認

3.  
観測・手動確認で
`routed_candidates / routed_design_candidates`
がないと困るユースケースが残っていないことの確認

---

## 次に外しやすい箇所

次に外しやすい順は次である。

### 1.  
`intake-routing.test.js`
の
`result.routed_candidates.length`
確認

理由:
- これは互換 field の存在確認であり、
  新 shape 主経路には不要

### 2.  
`routeIssueCandidates()` の
`routed_candidates` 返却

理由:
- writer は既に読まない
- tests も通常系では依存していない

### 3.  
`routeDesignCandidates()` の
`routed_design_candidates` 返却

理由:
- issue と同じく、
  writer も通常系 test も依存していない

### 4.  
`routeIntakeCandidates()` の
`routed_candidates` 返却

理由:
- intake は route output だけの関数なので、
  最後に慎重に外す方が安全

---

## 判断

writer fallback 撤去後の現状としては、
旧 shape は **return compatibility only** の状態に近い。

したがって、
次の判断が自然である。

- 旧 shape は処理系からは切り離された
- 残りは返り値互換だけ
- 次の主タスクは
  `node test` 実行確認
  または
  return compatibility の段階的撤去

特に重要なのは、
**もう writer を起点に旧 shape へ戻ることはない**
という点である。

# 2026-04-21 issue_routing_first_batch_observation

## 目的

issue routing 第一バッチ運用実験の観測結果を記録し、
現行 code で何が観測できて、
何がまだ観測できていないかを明確にする。

本メモは、
2026-04-20 に固定した最小運用実験 spec に沿って、
既存 open issue 2 件を実際に現行 code へ当てた結果を残すことを目的とする。

---

## 対象

第一バッチ対象は次の 2 件である。

1.  
`20260418-022`
- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある

2.  
`20260419-023`
- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある

source:
- `notes/01_issues/idea_log.md`
- `notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md`

---

## 実験条件

今回の観測は、
routing と writing を分離した最小実装反映後の現行 code を前提に行った。

参照 code:
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/issue-routing-actions.js`
- `src/services/flow-control/issue-routing-notes-write.js`

観測対象:
- `route_to / reason / next_action`
- `action_plan`
- writer dry_run payload
- operations candidate の有無
- route 多様性

---

## 結論

第一バッチ運用実験は実施できた。

ただし、
現行 code では対象 2 件とも
`route_to: issue`
となり、
design / operations / future / archive への送付は起きなかった。

したがって今回観測できた主結果は次である。

- handoff schema  
  - `normalized_items / routing_decisions / action_plan`  
  は期待どおり返る
- writer は  
  `keep_items` を no-op として期待どおり扱える
- ただし、  
  「issue が溜まるだけで終わらず、送付先へ流れる」  
  という完成条件は今回まだ観測できていない

---

## 観測結果

### 1. 20260418-022

issue log 上の状態:
- category: `architecture`
- impact: `medium`
- status: `open`

現行 code での結果:
- `route_to: issue`
- `reason: high impact ではないため、issue に残して再評価する`
- `next_action: keep_item_open`
- `keep_open: true`
- `review_at: daily_review`

action_plan:
- `design_updates: []`
- `plan_updates: []`
- `operations_candidates: []`
- `future_candidates: []`
- `archive_items: []`
- `keep_items: [1]`
- `skipped: []`

writer dry_run:
- `design_writes: []`
- `plan_writes: []`
- `operations_candidate_writes: []`
- `future_writes: []`
- `archive_writes: []`
- `kept_items: [1]`

観測:
- architecture issue だが、
  category 判定より前に impact gate に止められ、
  design に送られなかった

---

### 2. 20260419-023

issue log 上の状態:
- category: `operations`
- impact: `medium`
- status: `open`

現行 code での結果:
- `route_to: issue`
- `reason: high impact ではないため、issue に残して再評価する`
- `next_action: keep_item_open`
- `keep_open: true`
- `review_at: daily_review`

action_plan:
- `design_updates: []`
- `plan_updates: []`
- `operations_candidates: []`
- `future_candidates: []`
- `archive_items: []`
- `keep_items: [1]`
- `skipped: []`

writer dry_run:
- `design_writes: []`
- `plan_writes: []`
- `operations_candidate_writes: []`
- `future_writes: []`
- `archive_writes: []`
- `kept_items: [1]`

観測:
- operations issue だが、
  category 判定より前に impact gate に止められ、
  operations candidate は生成されなかった

---

## 原因整理

今回の主要因は、
現行 `issue-routing` の判定順にある。

実質的な gate は次である。

```js
if (impactNow && impactNow !== 'high') {
  route_to: 'issue'
}
```

今回の 2 件はいずれも
`impact: medium`
で記録されているため、
architecture / operations の category 判定に到達する前に
`issue keep`
へ寄った。

つまり今回の結果は、
route 多様性不足というよりも先に、
**medium impact issue を keep に寄せすぎる gate が強い**
ことを示している。

---

## 観測項目ごとの評価

### A. route 判定

結果:
- 2 件とも `route_to: issue`

評価:
- route 判定は一貫している
- ただし spec 上で観測したかった  
  design / operations 送付は起きなかった

---

### B. notes write payload

結果:
- write 系 payload は 0 件
- `keep_items` の no-op のみ返った

評価:
- writer と routing の責務分離は保たれている
- `keep_items` no-op も期待どおり動いている

---

### C. operations 接続

結果:
- `operations_candidates` は 0 件

評価:
- queue payload と rolling 接続の観測は今回できなかった
- operations 送付が出る入力か、
  gate 条件の見直しが必要である

---

### D. 運用上の効果

結果:
- issue を keep する挙動は確認できた
- 送付先へ流れる効果は未観測

評価:
- keep を正規結果として扱う構造自体は確認できた
- ただし Phase 0 の完成条件観測としては不十分

---

### E. route 多様性

結果:
- 実際に出た route は `issue` のみ

評価:
- design / operations / future / archive は未出
- 母集団不足だけでなく、
  現行判定ロジックの impact gate も主因である

---

## 今回分かったこと

- handoff schema の最小実装自体は前進している
- writer は `action_plan` を主入力として扱えている
- しかし issue routing の判定ロジックは、
  現行 issue 母集団に対しては keep に寄りすぎている
- `impact != high` を即 keep にする現在のルールでは、
  architecture / operations の category 差が route に反映されにくい

---

## 次の補正論点

次に見るべき論点は次である。

1.  
medium impact issue をどこまで keep に寄せるかを見直す

2.  
category が `architecture` または `operations` のときに、
impact gate より先に route 候補化すべきかを検討する

3.  
第二バッチで route 多様性不足を補う前に、
まず現行 gate が強すぎないかを確認する

---

## 次に自然なアクション

- この観測結果をもとに、
  issue routing の判定軸補正論点を design または issue として返す
- その後、
  必要なら第二バッチ候補を追加する
- もしくは、
  現行 gate のままで route 多様性不足を観測結果として固定する

---

## 関連

- `notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md`
- `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md`
- `notes/01_issues/idea_log.md`
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/issue-routing-actions.js`
- `src/services/flow-control/issue-routing-notes-write.js`

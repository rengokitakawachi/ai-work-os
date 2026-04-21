# 2026-04-21 issue_routing_first_batch_reobservation_after_gate_adjustment

## 目的

issue routing の
medium impact keep bias 補正後に、
第一バッチ 2 件の route 結果が
どう変わるかを再観測する。

本メモは、
`rules.js` の issue 判定順を
`status → category → impact keep`
へ補正した後、
第一バッチ観測で未達だった
design / operations 送付が回復したかを確認するための
analysis である。

---

## 参照

- `notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md`
- `notes/02_design/2026-04-21_issue_routing_medium_impact_keep_bias_adjustment.md`
- `notes/01_issues/idea_log.md`
- `src/services/flow-control/rules.js`
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/issue-routing-actions.js`
- `src/services/flow-control/issue-routing.test.js`

---

## 結論

補正後は、
第一バッチ 2 件の route は次に分かれる想定である。

- `20260418-022`
  → `design`
- `20260419-023`
  → `operations`

したがって、
第一バッチで未観測だった

- design 送付
- operations candidate 化

は、
現行補正後の rules では
到達可能な状態に回復した。

つまり、
前回の route 多様性不足は
母集団不足だけでなく、
`impact != high` gate の位置が強すぎたことが主因だった
とさらに強く言える。

---

## 再観測条件

今回の再観測は、
以下の code 変更後の状態を前提にする。

- `src/services/flow-control/rules.js`
  - `architecture / operations` 判定を
    `impact != high` gate より前へ移動
- `src/services/flow-control/issue-routing.test.js`
  - medium impact architecture / operations / uncategorized issue の期待 route を追加

実行確認としての `node --test` はまだ別タスクであり、
ここでは
**現行 code 構造に基づく再観測結果**
を整理する。

---

## 対象 issue

### 1. 20260418-022

- category: `architecture`
- impact: `medium`
- status: `open`

### 2. 20260419-023

- category: `operations`
- impact: `medium`
- status: `open`

source:
- `notes/01_issues/idea_log.md`

---

## 補正前との比較

### 補正前

両方とも:

- `route_to: issue`
- reason:
  `high impact ではないため、issue に残して再評価する`

結果:
- `keep_items` のみ
- `design_updates: []`
- `operations_candidates: []`

---

### 補正後

判定順:

1.
`status === closed`
→ `archive`

2.
`status !== open`
→ `future`

3.
`category === 'architecture'`
→ `design`

4.
`category === 'operations'`
→ `operations`

5.
`impactNow && impactNow !== 'high'`
→ `issue`

6.
その他
→ `issue`

結果:
- category が明確な medium issue は
  keep より先に route 候補化される

---

## 再観測結果

### 1. 20260418-022

補正後の期待結果:

- `route_to: design`
- `reason: architecture 系 issue のため、先に design で構造整理する`
- `next_action: create_or_update_design`
- `keep_open: true`
- `review_at: weekly_review`

action_plan 上の期待:

- `design_updates: [1]`
- `operations_candidates: []`
- `keep_items: [1]`

意味:
- medium impact でも
  architecture category が route に反映される

---

### 2. 20260419-023

補正後の期待結果:

- `route_to: operations`
- `reason: operations 系 issue のため、operations 比較対象に入れる`
- `next_action: generate_operations_candidate`
- `keep_open: true`
- `review_at: daily_review`

action_plan 上の期待:

- `operations_candidates: [1]`
- `design_updates: []`
- `keep_items: [1]`

意味:
- medium impact でも
  operations category が route に反映される
- 第一バッチでも operations candidate を観測できる

---

## route 多様性の変化

### 補正前
観測 route:
- `issue` のみ

### 補正後
観測可能 route:
- `design`
- `operations`

評価:
- 第一バッチで最低限必要だった
  route 多様性は回復した
- 第二バッチを増やす前に、
  まず現行 gate の位置補正が有効だったと整理できる

---

## keep の扱い

今回の補正は、
keep を消すものではない。

実際、
category が弱い medium impact issue については、
引き続き

- `route_to: issue`

となる想定であり、
test でもその期待値を追加した。

したがって、
今回の変更は
**keep 廃止ではなく、
category が明確な issue を keep に吸い込みすぎない補正**
として妥当である。

---

## 今回分かったこと

- medium impact keep bias の主因は
  impact gate の位置だった
- category 判定を前へ出すだけで、
  design / operations 送付の回復が見込める
- action_plan / writer 境界を崩さずに
  route 多様性を回復できる
- 第二バッチ追加より先に、
  まず gate 順補正を入れる判断は妥当だった

---

## まだ未確認のもの

### 1. `node --test`
実ファイル環境での実 test 実行確認はまだ未完了である。

### 2. dry_run 実出力の最終確認
今回は code 構造と test 期待値ベースの再観測であり、
repo 実体での実行ログ確認は次タスクに残る。

---

## 次に自然なタスク

1.
`issue routing の第二バッチ候補を整理する`

2.
`future / archive を観測できる issue 候補を追加する`

3.
`operations candidate を rolling に接続して反映確認する`

4.
`flow-control 周辺の node --test 実行確認を行う`

---

## 判断

第一バッチ再観測の観点では、
今回の gate 順補正で
最低限必要だった
design / operations route の回復見込みは立った。

したがって、
issue routing の次の主論点は
gate 補正そのものではなく、
**route 多様性の拡張と rolling 接続観測**
へ移ったと判断してよい。

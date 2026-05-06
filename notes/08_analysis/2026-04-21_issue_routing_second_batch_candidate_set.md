# 2026-04-21 issue_routing_second_batch_candidate_set

## 目的

issue routing の完成条件に必要な
route 多様性を増やすため、
第二バッチで使う issue 候補セットを整理する。

本メモは、
第一バッチ補正後の状態を踏まえて、
何を第二バッチ入力に使うべきか、
既存 issue で足りるものと
追加が必要なものを分けて明確にすることを目的とする。

---

## 参照

- `notes/01_issues/idea_log.md`
- `notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md`
- `notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md`
- `notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `src/services/flow-control/rules.js`

---

## 結論

第二バッチは、
次の 2 層で組むのが自然である。

1.
**既存 issue からそのまま使える候補**

2.
**future / archive 観測のために追加が必要な候補**

現在の issue log だけで自然に観測できる route は、
主に次である。

- `design`
- `operations`
- `issue`

一方、
現在の issue log だけでは、
次はまだ不足している。

- `future`
- `archive`

したがって、
第二バッチでは
既存 issue をそのまま流すだけでなく、
future / archive を観測できる候補を
追加で用意する必要がある。

---

## 現在の issue log で使える候補

### 1. 20260420-024

- title: routing と document writing を分離し action plan で引き渡す構造へ改める必要がある
- category: `architecture`
- impact: `high`
- status: `open`

期待 route:
- `design`

使う意味:
- 第一バッチ補正後の `design` route を、
  medium impact だけでなく
  high impact architecture issue でも確認できる
- design route の安定性確認に使いやすい

---

### 2. 20260419-023

- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- category: `operations`
- impact: `medium`
- status: `open`

期待 route:
- `operations`

使う意味:
- operations candidate 化と
  rolling 接続確認にそのまま使える
- 第一バッチ再観測の継続比較対象としてもよい

---

### 3. category が弱い medium issue

現在の issue log には、
この型の既存 issue は十分にない。

したがって、
`issue keep` を第二バッチでも観測したい場合は、
追加候補の用意が自然である。

---

## 追加が必要な候補

### A. future 観測候補

future を自然に出すには、
少なくとも次のいずれかが必要である。

- `status !== open`
- current phase と異なる `phase`

現行 issue log には、
この条件を満たす issue がない。

したがって、
第二バッチの future 観測には
次のような候補を 1 件追加するのが自然である。

候補条件:
- status: `blocked` / `pending` / `deferred` など open 以外
  または
- phase: `phase1` など現行 phase と異なるもの

期待 route:
- `future`

---

### B. archive 観測候補

archive を自然に出すには、
少なくとも次が必要である。

- `status === closed`

現行 issue log には、
closed issue がない。

したがって、
第二バッチの archive 観測には
次のような候補を 1 件追加するのが自然である。

候補条件:
- status: `closed`
- 役目終了が明確な issue

期待 route:
- `archive`

---

### C. keep 観測候補

keep を第二バッチでも比較対象として残すなら、
次のような issue があるとよい。

候補条件:
- category が弱い
- impact: `medium`
- status: `open`

期待 route:
- `issue`

意味:
- `design / operations` だけでなく、
  keep が残るべきケースも比較できる

---

## 第二バッチの最小構成案

### 案1: 実 issue 優先の最小構成

- `20260420-024` → design
- `20260419-023` → operations
- future 観測用追加 issue 1 件
- archive 観測用追加 issue 1 件

利点:
- 完成条件に不足している route を直接埋めやすい
- batch としての役割が明確

欠点:
- issue 追加が必要

---

### 案2: keep 比較も含む構成

- `20260420-024` → design
- `20260419-023` → operations
- keep 観測用追加 issue 1 件
- future 観測用追加 issue 1 件
- archive 観測用追加 issue 1 件

利点:
- `issue / design / operations / future / archive`
  を 1 バッチで比較しやすい

欠点:
- やや重い

---

## 推奨

今の自然な推奨は
**案2**
である。

理由:
- issue routing の完成条件は
  送付先が複数出ることと、
  keep / archive / defer が破綻しないことの両方を含む
- したがって、
  `design / operations / future / archive`
  だけでなく
  `issue keep`
  も比較対象に残した方がよい

したがって、
第二バッチ候補セットは次を推奨する。

1.
`20260420-024`
- design 観測用

2.
`20260419-023`
- operations 観測用

3.
category 弱 / medium / open の追加 issue
- keep 観測用

4.
status 非 open または phase 不一致の追加 issue
- future 観測用

5.
status closed の追加 issue
- archive 観測用

---

## 現時点での制約

現行ルール上、
issue の新規保存は
本来 user 承認付きで扱うのが自然である。

したがって、
このメモ時点では
**第二バッチ候補セットの整理まで**
を完了とし、
追加 issue 自体の保存は
次の明示判断で進めるのが安全である。

---

## 次に自然なアクション

1.
future / archive / keep 用の追加 issue 条件を固定する

2.
必要なら user 合意のうえで
追加 issue を issue log に保存する

3.
その後、
第二バッチ全体を routing して
route 結果と action_plan を観測する

---

## 判断

第二バッチ候補の整理としては、
現時点で次が言える。

- existing issue だけでは future / archive は足りない
- 第二バッチには追加候補が必要
- 推奨構成は
  `design / operations / keep / future / archive`
  を1セットで観測できる形

つまり、
第二バッチの本質は
「単に件数を増やすこと」ではなく、
**未観測 route を意図的に埋めること**
にある。

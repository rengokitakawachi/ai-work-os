# 2026-04-21 issue_routing_operations_candidate_rolling_connection_observation

## 目的

issue routing 第二バッチで発生する
`operations candidate`
が、
operations rolling に接続されたとき
どのように扱うのが自然かを整理する。

本メモは、
queue payload → rolling source → placement
の観点から、
`20260419-023`
由来の operations 候補が
active / next / future のどこに入るのが妥当かを
現在の文脈で観測するための analysis である。

---

## 参照

- `notes/08_analysis/2026-04-21_issue_routing_second_batch_dry_run_observation.md`
- `notes/08_analysis/2026-04-21_issue_routing_first_batch_reobservation_after_gate_adjustment.md`
- `notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md`
- `notes/02_design/2026-04-16_operations_candidate_queue_to_rolling_io.md`
- `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`

---

## 対象候補

対象は
`20260419-023`
由来の operations candidate である。

元 issue:
- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- category: `operations`
- impact: `medium`
- status: `open`

issue routing 上の期待:
- `route_to: operations`
- `next_action: generate_operations_candidate`

---

## 結論

現時点の文脈では、
この operations candidate を
**current active に新規追加するのは不自然**
である。

自然な扱いは次のどちらかである。

1.
rolling で比較対象に戻すが、
current active には入れない

2.
すでにルール反映・再発防止へ返っているため、
future へ送る

この 2 択のうち、
今の状態説明としては
**少なくとも active 直行ではない**
ことが重要である。

---

## なぜ active 直行ではないか

### 1. issue の論点はすでに current active へ吸収済み

`20260419-023`
の論点は、

- Day 容量ルールを忘れないこと
- 1日約2時間の束ね方を守ること

であり、
この内容はすでに次へ反映されている。

- active_operations の Day 容量再束ね
- ADAM instruction への completed condition / day capacity 反映
- operations 提案時の軽すぎる Day を避ける補正

したがって、
同じ issue 由来の candidate を
そのまま current active の新規 task として再投入すると、
重複度が高い。

---

### 2. rolling spec 上も generation だけでは確定しない

operations rolling spec では、

- generation
- ranking
- placement

は一体であり、
operations 候補になっただけでは
active 確定ではない。

つまり、
`route_to: operations`
は
「rolling 比較対象に入る」
ことを意味するが、
「active に入る」
ことを意味しない。

---

### 3. current active には issue routing 完成条件直結 task が先にある

現 active は、

- 第二バッチ観測
- keep / future / archive の妥当性確認
- rolling 接続観測

のような、
issue routing の完成条件に直接効く task を優先している。

これに対して
`20260419-023`
由来 candidate は、
再発防止知見としては重要だが、
今この時点で新規に active へ割り込ませる優先度は低い。

---

## queue → rolling → placement の見方

### queue payload 段階

この候補は、
issue routing の結果として
`operations_candidate_writes`
に現れること自体は自然である。

ここではまだ
pre-task candidate であり、
rolling_day は持たない。

---

### rolling source 段階

rolling はこの候補を
comparison source の1つとして読める。

そのとき比較相手になるのは、

- current active の継続 task
- 第二バッチ観測後の整理 task
- next にいる候補

である。

この比較に戻すこと自体は自然である。

---

### placement 段階

placement の現時点の自然な判断は次である。

- `active`: 不採用
- `next`: まだ残価値があるなら候補
- `future`: 既に吸収済み / 今すぐ不要ならこちら

今回の文脈では、
**future 寄り**
に見るのが自然である。

理由:
- 論点の中心はすでに instruction / operations へ返っている
- 今の active は issue routing 完成条件直結 task を優先している
- 同じ論点を再度 active へ置くと重複になりやすい

---

## current best-effort placement

現時点での best-effort な placement 推定は次である。

### active
- 入れない

### next
- 予備的にはありうる
- ただし current active 完了後に再評価する論点としては弱い

### future
- 最も自然

暫定判断:
- `20260419-023` 由来 candidate は
  **rolling comparison source には入るが、現時点 placement は future が自然**

---

## この観測の意味

今回重要なのは、
operations 候補が出たことではなく、
その候補を

- queue payload
- rolling input
- placement result

に分けて扱えた点である。

これにより、
issue routing の `operations`
は
「即 active 化」
ではなく、
**rolling 比較対象化**
であることを確認できた。

---

## まだ残るもの

### 1. 実装された rolling adapter
現時点では、
queue payload から rolling source bundle を作る code 実装までは未確認である。

### 2. 実 reroll ログ
今回は spec と current context に基づく best-effort 観測であり、
実 reroll の出力ログ確認はまだ別である。

---

## 次に自然なタスク

1.
`keep / future / archive の運用妥当性を整理する`

2.
必要なら
operations queue → rolling adapter の最小実装論点へ進む

3.
補助確認として
`node --test`
を行う

---

## 判断

第二バッチの operations 候補については、
current active へ直行させるのではなく、
rolling 比較対象として扱ったうえで
**現時点 placement は future 寄り**
と見るのが自然である。

したがって、
issue routing の `route_to: operations`
は、
「即実行」ではなく
「rolling 比較対象に入る」
と理解するのが正しい。

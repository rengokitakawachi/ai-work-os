# 2026-04-17 design_routing_minimum_usecase

## 目的

design routing を、
曖昧な概念ではなく
最小 usecase として固定する。

本メモは、
`design review` で抽出された design 候補、
または日常運用中に対象となった design note を入力にして、

- docs
- design
- future/design
- archive
- operations candidate

のどこへ送るかを判定し、
必要な後段 payload を返す最小構成を定義することを目的とする。

---

## 結論

最小 usecase は次の 2 段に分ける。

1.
`routeDesignCandidates`

2.
`applyDesignRoutingActionPlan`

つまり、
issue routing と同様に

- routing decision
- post-routing write/usecase

を分ける。

最小段階では、
まず `dry_run` を固定する。

---

## なぜ 2 段に分けるか

理由は 3 つある。

### 1. 判定と反映を分けるため

design routing の責務は、
入力正規化、行き先判定、action plan 生成までである。

その後に、

- docs 候補化
- future/design draft 化
- archive draft 化
- operations candidate queue payload 化

を行う後段 usecase を分ける必要がある。

### 2. docs 反映を直接背負いすぎないため

docs は SSOT であり、
最終反映は人間判断で行う。

したがって、
design routing 後処理で
いきなり docs を mutate しない。

まずは docs 候補 payload を返す。

### 3. design 自体を毎回更新しないため

`route_to: design`
だった design を、
routing のたびに毎回 rewrite する必要はない。

最小段階では、
`keep_design`
は no-op とするのが自然である。

---

## usecase の位置づけ

### 1. design routing

責務

- design を評価する
- `normalized_items` を返す
- `routing_decisions` を返す
- `action_plan` を返す
- 必要に応じて `routed_design_candidates` を返す

### 2. design routing notes/docs write usecase

責務

- `action_plan` を解釈する
- `normalized_items` / `routing_decisions` を参照する
- docs 候補 / future draft / archive draft / operations queue payload を作る
- 必要な write を呼ぶ
- 実行結果を返す

### 3. docs / notes / operations queue の後段

責務

- docs 候補を人間レビューに渡す
- future/design / archive の write を行う
- operations rolling へ candidate を渡す

---

## 最小入力

`routeDesignCandidates` の最小入力は次とする。

- `design_candidates`
- `source_ref`
- `mode`
- `now`

### design_candidates

少なくとも次を持つ。

- `design_id` または file path
- `title`
- `summary`
- `source_ref`
- `metadata`

必要なら metadata に次を持てる。

- `derived_from_issue_id`
- `related_docs`
- `related_plans`
- `design_state`

### source_ref

入力元の review / design file / docs を保持する。

### mode

最小では次の 2 つ。

- `dry_run`
- `apply`

ただし初期段階では `dry_run` 先行でよい。

### now

時刻依存を固定するための入力。

---

## 最小 route_to

design routing の最小 route は次とする。

- `docs`
- `design`
- `future`
- `archive`
- `operations`

### docs

docs 昇格候補。

### design

まだ草案段階のため design に残す。

### future

今は扱わないが将来再評価する。
保存先は最小では `future/design` とする。

### archive

役目を終えた、重複した、置換済みなど。

### operations

実行候補として operations rolling に渡す価値がある。
ただし `active_operations` へ直接入れない。
queue payload として返す。

---

## 最小判断軸

最小判断軸は次でよい。

### 1. docs_ready

- 目的が明確
- 責務が明確
- 命名が固まっている
- 例外が見えている
- 実装方針が説明できる

これを満たせば `docs` 候補。

### 2. still_design

- まだ草案段階
- 仕様境界が固まっていない
- docs 昇格には早い

この場合 `design` に残す。

### 3. deferred

- 将来向け
- 現 phase では扱わない
- 再評価地点を持たせたい

この場合 `future`。

### 4. finished_or_superseded

- 役目終了
- 後継 design がある
- duplicate / merged / obsolete

この場合 `archive`。

### 5. execution_value

- 実装や調査の実行候補として落とす価値がある
- operations に乗せて短期実行順比較したい

この場合 `operations`。

---

## handoff の最小形

design routing と writer の間の正規 handoff は次である。

- `normalized_items`
- `routing_decisions`
- `action_plan`

`routed_design_candidates` は
合成済みの互換表現として残してよいが、
正規の説明軸にはしない。

---

## action_plan の最小形

最小 action plan は次でよい。

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`
- `skipped`

### docs_candidates

docs 候補 payload。

最小では docs 本文を直接書かず、
次を返す。

- target_layer: `docs_candidate`
- target_doc
- title
- source_design
- source_ref
- reason
- body or patch proposal

### design_retained

`route_to: design`
の retained list。

最小では no-op。

### future_candidates

`80_future/design/` へ送る draft payload。

### archive_design

`99_archive/design/` へ送る draft payload。

### operations_candidates

operations candidate queue payload。

issue routing と同様、
rolling 前の queue payload に留める。

---

## keep / retain の扱い

最小段階では、
`route_to: design`
は no-op とする。

返り値には次だけ残せばよい。

- design_id
- title
- route_to: design
- reason
- evaluated_at
- action_type: `keep_design`
- write_status: `no_op`

理由:
- routing のたびに design file を更新しない
- review と write を混ぜない
- keep は状態保持であって反映ではない

---

## docs_candidates の扱い

ここが issue routing と違う重要点である。

`route_to: docs`
でも、
最小段階では docs へ直接 apply しない。

返すのは次のいずれかでよい。

- docs patch proposal
- docs candidate draft
- target_doc と revised_text

つまり、
**docs 候補化まで** を design routing 後処理の責務とする。

最終反映は人間判断で行う。

---

## future / archive の最小保存先

### future

`80_future/design/YYYY-MM-DD_<design_id>_<slug>.md`

### archive

`99_archive/design/YYYY-MM-DD_<design_id>_<slug>.md`

最小段階では、
issue と同様に draft 生成まででもよい。

---

## operations の扱い

`route_to: operations`
の design は、
`active_operations` を直接更新しない。

次を返す。

- queue payload
- `write_status: draft_only`
- `candidate_draft`

つまり、
issue routing の operations candidate queue と対称に扱う。

---

## dry_run と apply

### dry_run

- `normalized_items` を作る
- `routing_decisions` を作る
- `action_plan` を作る
- 必要なら `routed_design_candidates` を作る
- 実 write はしない

### apply

最小段階では、
`future_candidates` と `archive_design` の write だけ先に導入してもよい。

`docs_candidates` は apply しない。
`operations_candidates` は queue payload のままにする。

---

## 最小 I/O 例

### 入力

- design A
  - docs_ready

- design B
  - still_design

- design C
  - deferred

- design D
  - finished_or_superseded

- design E
  - execution_value

### 出力

- `normalized_items`
- `routing_decisions`
- `action_plan`
- `routed_design_candidates`（必要なら）

そのうえで action_plan には

- `docs_candidates`
  - design A の docs patch proposal

- `design_retained`
  - design B の no-op retained result

- `future_candidates`
  - design C の future/design draft

- `archive_design`
  - design D の archive draft

- `operations_candidates`
  - design E の operations queue payload

が入る。

---

## 実装順

### 第1段

`routeDesignCandidates`
を `dry_run` だけで固定する。

### 第2段

`applyDesignRoutingActionPlan`
を `dry_run` のみで実装する。

### 第3段

`future/design` と `archive/design` の apply を入れる。

### 第4段

docs candidate の標準 patch 形式を固定する。

### 第5段

operations candidate queue との code 接続を入れる。

---

## やらないこと

最小段階では次をやらない。

- docs への直接 apply
- design file 本体への毎回 write
- 既存 docs との高度 merge
- design diff の自動統合
- active_operations の直接更新
- design duplicate 自動検出の高度化

---

## 判断

design routing は、
`design review` と分けて
最小 usecase 化するのが自然である。

最小形は次である。

- routing decision: `routeDesignCandidates`
- post-routing payload/usecase: `applyDesignRoutingActionPlan`

- route 先は
  `docs / design / future / archive / operations`

- 正規 handoff は
  `normalized_items / routing_decisions / action_plan`

- `routed_design_candidates` は互換用の合成表現
- `design` retained は no-op
- `docs` は候補化まで
- `operations` は queue payload まで
- `future / archive` は後段で draft/apply 対象

この形なら、
routing / review / docs 反映 / operations rolling の責務を崩さずに、
design routing を小さく前進できる。

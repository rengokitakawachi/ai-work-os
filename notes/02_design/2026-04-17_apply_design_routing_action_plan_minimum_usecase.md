# 2026-04-17 apply_design_routing_action_plan_minimum_usecase

## 目的

`applyDesignRoutingActionPlan`
の最小責務と payload 生成ルールを固定する。

本メモは、
`routeDesignCandidates`
が返した

- `normalized_items`
- `routing_decisions`
- `action_plan`

を受けて、

- docs candidate
- future/design draft
- archive/design draft
- operations queue payload
- retained no-op

をどのように生成し、
何を返すかを最小構成で定義するための design である。

`routed_design_candidates`
は互換用の補助入力として扱う。

---

## 結論

最小 usecase は次の 1 本とする。

`applyDesignRoutingActionPlan`

この usecase は、

- `normalized_items`
- `routing_decisions`
- `action_plan`
- `source_ref`
- `mode`
- `now`

を受け取り、
後段で扱う payload 群を返す。

必要に応じて、
`routed_design_candidates`
を fallback 参照してよい。

ただし最小段階では、
**docs へ直接 apply しない。**

また、
`design_retained`
は no-op のまま返す。

---

## なぜ必要か

理由は 3 つある。

### 1. routing decision と payload 生成を分けるため

`routeDesignCandidates`
は行き先判定までで止める。

その後に、

- docs 候補化
- future / archive draft 化
- operations queue payload 化

を行う後段 usecase が必要である。

### 2. docs apply を直接背負わないため

docs は SSOT であり、
最終反映は人間判断で行う。

したがって、
この usecase は docs 候補 payload を返すまでに留める。

### 3. design retained を毎回 mutate しないため

`route_to: design`
を受けたからといって、
design file 本体を毎回更新する必要はない。

最小段階では、
no-op の retained result を返すだけでよい。

---

## 最小入力

- `normalized_items`
- `routing_decisions`
- `action_plan`
- `source_ref`
- `mode`
- `now`

### normalized_items

少なくとも次を参照できる前提とする。

- `item_id`
- `candidate_id`
- `design_id`
- `source_ref`
- `title`
- `summary`
- `metadata`

### routing_decisions

少なくとも次を参照できる前提とする。

- `item_id`
- `candidate_id`
- `design_id`
- `route_to`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `next_action`

### action_plan

`routeDesignCandidates`
の返り値。

対象キー

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`
- `skipped`

### source_ref

入力 design file や review source、関連 docs を保持する。

生成 payload にも渡す。

### mode

最小では次の 2 つを持つ。

- `dry_run`
- `apply`

ただし初期段階では `dry_run` 先行でよい。

### now

時刻依存を固定するための入力。

未指定時は `new Date().toISOString()` でよい。

### routed_design_candidates

互換用の補助入力。

`normalized_items / routing_decisions`
から参照できない情報がある場合の fallback として使ってよい。

---

## 最小出力

最小出力は次とする。

- `docs_candidate_writes`
- `design_retained_results`
- `future_writes`
- `archive_writes`
- `operations_candidate_writes`
- `skipped`
- `mode`

各要素は、

- どこへ何を書こうとしたか
- または何もしなかったか

が分かる形を持つ。

---

## 各 action の最小扱い

### 1. docs_candidates

`docs_candidate_writes`
へ変換する。

最小項目

- `target_layer: docs_candidate`
- `target_doc`
- `title`
- `source_design`
- `source_ref`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `action_type: docs_candidate`
- `write_status: draft_only`

必要なら次も持てる。

- `body`
- `patch_proposal`
- `revised_text`

### 2. design_retained

`design_retained_results`
へ変換する。

最小項目

- `design_id`
- `title`
- `route_to: design`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `action_type: keep_design`
- `write_status: no_op`

### 3. future_candidates

`future_writes`
へ変換する。

最小項目

- `target_layer: 80_future/design`
- `suggested_file`
- `title`
- `source_ref`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `action_type: future_candidate`
- `write_status`
- `body`

最小段階では、
`write_status: draft_only`
でよい。

### 4. archive_design

`archive_writes`
へ変換する。

最小項目

- `target_layer: 99_archive/design`
- `suggested_file`
- `title`
- `source_ref`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `action_type: archive_design`
- `write_status`
- `body`

### 5. operations_candidates

`operations_candidate_writes`
へ変換する。

最小項目

- `title`
- `design_id`
- `route_to: operations`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `action_type: operations_candidate`
- `write_status: draft_only`
- `candidate_draft`

`candidate_draft` の最小項目

- `task`
- `source_ref`
- `notes`

必要なら次も持てる。

- `quick_win`

### 6. skipped

`skipped`
はそのまま返してよい。

---

## suggested_file の最小ルール

### future/design

`80_future/design/YYYY-MM-DD_<design_id>_<slug>.md`

### archive/design

`99_archive/design/YYYY-MM-DD_<design_id>_<slug>.md`

`docs_candidate_writes`
は file を持たなくてもよい。

理由:
- docs 候補は patch / revised_text 形式でも返せるため

---

## body の最小構成

future / archive の body は最小で次を含む。

- title
- source design
- source_ref
- routing decision
- reason
- evaluated_at
- maturity_now
- execution_value_now
- docs_ready_now
- next_action
- raw summary

これにより、
後から見ても
「なぜこの draft が生成されたか」を追える。

---

## dry_run と apply

### dry_run

- payload を生成する
- suggested_file を決める
- body を作る
- 実 write はしない
- 結果だけ返す

### apply

最小段階では、

`future_writes`
と
`archive_writes`

だけ先に apply してよい。

ただし、

- `docs_candidate_writes` は apply しない
- `operations_candidate_writes` は queue payload のまま
- `design_retained_results` は no-op のまま

でよい。

---

## issue routing notes write との対称性

### issue routing

- `applyIssueRoutingActionPlan`
- 入力:
  - `normalized_items`
  - `routing_decisions`
  - `action_plan`
- 出力:
  - `design_writes`
  - `operations_candidate_writes`
  - `future_writes`
  - `archive_writes`
  - `kept_items`

### design routing

- `applyDesignRoutingActionPlan`
- 入力:
  - `normalized_items`
  - `routing_decisions`
  - `action_plan`
- 出力:
  - `docs_candidate_writes`
  - `design_retained_results`
  - `future_writes`
  - `archive_writes`
  - `operations_candidate_writes`

この対称性により、
flow-control の post-routing usecase 群を揃えやすくなる。

---

## 判断

`applyDesignRoutingActionPlan`
の最小責務は、

- docs 候補 payload
- future/design draft
- archive/design draft
- operations queue payload
- retained no-op

を生成して返すことに置くのが自然である。

その主入力は

- `normalized_items`
- `routing_decisions`
- `action_plan`

であり、
`routed_design_candidates`
は互換用の補助入力として扱えばよい。

この形なら、
docs 直接反映や active 直接更新を避けつつ、
design routing を実運用接続へ小さく前進できる。

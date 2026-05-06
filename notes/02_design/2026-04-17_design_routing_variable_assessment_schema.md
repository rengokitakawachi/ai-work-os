# 2026-04-17 design_routing_variable_assessment_schema

## 目的

design routing における可変評価の最小 schema を固定する。

本メモは、
design note 本体に

- docs 昇格可否
- deferred 判定
- archive 判定
- operations 候補性

のような変動評価を直接抱え込ませず、
`issue routing` と同じ構造で分離するための最小設計を定義することを目的とする。

---

## 結論

design routing では、
次の 4 層を分ける。

1.
design

2.
default assessment

3.
routing decision

4.
action plan

この分離により、

- design = 設計草案そのもの
- default assessment = 暫定初期評価
- routing decision = 最新評価と送付先判定
- action plan = 反映内容

として扱える。

---

## なぜ必要か

design は時間とともに状態が変わる。

たとえば、

- 先週は草案段階だった
- 今は docs 候補まで固まった
- 別案に吸収されて archive 候補になった
- 実装候補として operations に落としたくなった

という変化がありうる。

これを design 本体に毎回書き戻し続けると、

- 設計内容
- その時点の評価
- 送付先判断

が混ざる。

したがって、
可変評価は design 本体から分ける必要がある。

---

## 1. design

design は設計草案そのものとする。

保持するものは、
比較的変わりにくい内容へ寄せる。

例

- design_id または file path
- title
- summary
- body
- source_ref
- derived_from_issue_id
- related_docs
- related_plans
- created_at
- updated_at

ここでは、
`docs_ready` や `route_to` を
設計本体の固定属性として持たない。

---

## 2. default assessment

default assessment は、
design 作成時または直近手修正時に置いた
暫定的な初期評価とする。

例

- default_maturity
- default_execution_value
- assessed_at
- assessed_by
- note

### default_maturity

最小では次でよい。

- `draft`
- `maturing`
- `ready`

### default_execution_value

最小では次でよい。

- `high`
- `medium`
- `low`

この層は、
routing decision がないときの保守的な初期値として使う。

---

## 3. routing decision

routing decision は、
その時点での最新評価と送付先判定である。

最小で持つものは次とする。

- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `route_to`
- `reason`
- `review_at`
- `docs_ready_now`
- `keep_design_open`
- `next_action`

必要に応じて持てるもの

- `confidence`
- `based_on`
- `superseded_by`
- `decision_version`

### maturity_now

最小では次でよい。

- `draft`
- `maturing`
- `ready`
- `superseded`

### execution_value_now

最小では次でよい。

- `high`
- `medium`
- `low`

### docs_ready_now

最小では boolean 相当でよい。

- `true`
- `false`

ここでは
`maturity_now`
と
`docs_ready_now`
を、
docs 昇格・retain・archive の主判断材料に使う。

また
`execution_value_now`
を、
operations 候補化の補助判断に使う。

---

## 4. action plan

action plan は、
routing decision を受けて
何を後段へ渡すかをまとめたものである。

例

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`

ここでは、
評価値そのものを正本として保持しなくてよい。

必要なのは、
何をどこへ反映するかである。

---

## 優先順位

design routing の可変評価の参照優先順位は次とする。

1.
routing decision

- `maturity_now`
- `execution_value_now`
- `docs_ready_now`

2.
default assessment

- `default_maturity`
- `default_execution_value`

3.
未設定

未設定の場合は、
保守的に `design` retained を優先する。

---

## 最小実装ルール

### ルール1

design 本体に書かれた状態語を、
最終判断の正本として扱わない。

### ルール2

routing 時の判定では、
まず routing decision を見る。

### ルール3

routing decision が無い場合のみ、
default assessment を使う。

### ルール4

design review は routing decision の再評価地点であり、
design 本体を毎回書き換える地点ではない。

### ルール5

`route_to: design`
は retained no-op でよく、
routing のたびに design file を mutate しない。

---

## issue routing との対応

対応関係は次である。

### issue routing

- issue = 論点の記録
- default assessment = 初期評価
- routing decision = 最新評価
- action plan = 反映内容

### design routing

- design = 設計草案
- default assessment = 初期成熟度・実行価値評価
- routing decision = 最新評価
- action plan = 反映内容

この対称性により、
flow-control の設計を揃えやすくなる。

---

## route_to との関係

最小では次のように読む。

### docs

- `docs_ready_now = true`
- `maturity_now = ready`

### design

- `docs_ready_now = false`
- `maturity_now = draft` or `maturing`

### future

- 今は扱わない
- `review_at` に再評価地点を置く

### archive

- `maturity_now = superseded`
  または reason で obsolete / duplicate / merged を示す

### operations

- `execution_value_now = high` または `medium`
- 実行候補として rolling 比較する価値がある

ただし `operations` は docs_ready の代替ではない。

---

## apply/usecase への含意

`applyDesignRoutingActionPlan` では、
少なくとも次を参照できる形が自然である。

- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `route_to`
- `reason`
- `review_at`
- `docs_ready_now`
- `next_action`

これにより、

- docs candidate
- future/design draft
- archive/design draft
- operations queue payload
- retained no-op

のどれでも、
「なぜそう判断したか」を追える。

---

## 未決定

現時点で未決定なのは次である。

- design decision をどこに保存するか
- monthly review ごとに履歴を残すか
- docs_ready_now を boolean のままにするか段階化するか
- execution_value_now を score 化するか

ただし、
これらは後段でよい。

まずは schema 分離を固定することが先である。

---

## 判断

design routing の可変評価は、
次の形で扱うのが最も自然である。

- design = 設計草案そのもの
- default assessment = 初期成熟度・実行価値評価
- routing decision = 最新評価と送付先判定
- action plan = 後段への反映内容

この分離により、
昇格可否や archive / future / operations 判定のような変動値を、
design 本体の固定属性として抱え込まずに済む。

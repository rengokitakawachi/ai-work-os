# 2026-04-15 issue_routing_variable_assessment_schema

## 目的

issue routing における可変評価の最小 schema を固定する。

本メモは、
`impact` を issue 固定値として持ち続けるのではなく、
「issue 本体」と「その時点の評価」を分けるための
最小設計を整理することを目的とする。

---

## 結論

issue routing では、
次の 4 層を分ける。

1.
issue

2.
default assessment

3.
routing decision

4.
action plan

この分離により、

- issue は論点の記録
- default assessment は初期評価
- routing decision は最新評価
- action plan は反映内容

として扱える。

---

## なぜ必要か

現状の最小実装では、
issue の `impact` をそのまま routing 判定に使っている。

ただし `impact` は刻々と変わる。

たとえば、

- issue 作成時は high
- 今は medium
- review 後は low

という変化がありうる。

この変化を issue 本体に直接上書きし続けると、

- issue の記録
- 初期評価
- 最新判断

が混ざる。

したがって、
可変評価は issue 本体から分ける必要がある。

---

## 1. issue

issue は論点の記録である。

保持するものは、
比較的変わりにくい情報に寄せる。

例

- issue_id
- title
- category
- description
- context
- created_at
- status

ここでの `status` は、
open / closed などの管理状態とする。

`impact` は issue の必須本体属性としては扱わない。

---

## 2. default assessment

default assessment は、
issue 作成時または直近手修正時に付いた
暫定的な初期評価である。

例

- default_impact
- default_urgency
- assessed_at
- assessed_by
- note

この層は、
routing decision が無いときの初期値として使う。

ただし、
正本は routing decision ではなく issue 本体でもない。
あくまで暫定初期値である。

---

## 3. routing decision

routing decision は、
その時点での最新評価と送付先判定である。

最小で持つもの

- evaluated_at
- impact_now
- urgency_now
- route_to
- reason
- review_at
- needs_task_generation
- keep_issue_open
- next_action

必要に応じて持てるもの

- confidence
- blockers
- based_on
- decision_version

ここでは
`impact_now` を正として扱う。

default assessment が存在しても、
routing decision の方を優先する。

---

## 4. action plan

action plan は、
routing decision を受けて
何を反映すべきかをまとめたものである。

例

- keep_issue
- archive_issue
- design_updates
- operations_candidates
- future_candidates

action plan には評価値を保持しなくてよい。

必要なのは、
何をどこへ反映するかである。

---

## 優先順位

可変評価の参照優先順位は次とする。

1.
routing decision の `impact_now`

2.
default assessment の `default_impact`

3.
未設定

未設定の場合は、
category や status を使った保守的判定に落とす。

---

## 最小実装ルール

### ルール1

issue 本体に書かれた impact を
最終判断の正本として扱わない。

### ルール2

routing 時の判定では、
まず `impact_now` を見にいく。

### ルール3

`impact_now` が無い場合のみ、
`default_impact` を使う。

### ルール4

review は routing decision を更新する地点であり、
issue 本体を毎回書き換える地点ではない。

### ルール5

notes write は後段に寄せるが、
返り値 schema では先にこの分離を表現する。

---

## 現行 code への当て方

次に code へ入れる最小差分は以下である。

### 1. normalize / adapter

issue 由来 candidate で、

- metadata.default_impact
- metadata.default_urgency

を持てるようにする。

### 2. rules

routing 判定で、

- assessment.impact_now
- metadata.default_impact

の順に評価する。

### 3. issue-routing

返り値の decision schema に、

- evaluated_at
- impact_now
- urgency_now

を追加する。

### 4. review

daily / weekly review では、
issue 本体ではなく routing decision の再評価を行う。

---

## 未決定

現時点で未決定なのは次である。

- decision を notes のどこに保存するか
- review ごとに履歴を保持するか
- impact_now / urgency_now を毎回保存するか
- assessment の note を issue 側に戻すか

ただし、
これらは後段でよい。

まずは schema 分離を固定することが先である。

---

## 判断

issue routing の可変評価は、
次の形で扱うのが最も自然である。

- issue = 論点の記録
- default assessment = 初期評価
- routing decision = 最新評価
- action plan = 反映内容

この分離により、
impact のような変動値を
issue 本体の固定属性として抱え込まずに済む。

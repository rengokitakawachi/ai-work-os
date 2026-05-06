# 2026-04-16 issue_routing_operations_candidate_queue

## 目的

issue routing で `route_to: operations` になった候補を、
どこに置くべきかを定義する。

本メモは、
`next_operations` の意味を壊さずに、
issue routing 後処理と operations rolling の間をつなぐ
**operations candidate queue**
を設計上の入力層として固定するための design である。

---

## 結論

次の分離を採用する。

- `operations_candidates`
  = issue routing 後処理が返す **rolling 前の入力候補**

- `operations candidate queue`
  = その入力候補を一時的に保持しうる概念層

- `next_operations`
  = rolling の結果、active に入らなかった **rolling 後の上位候補**

したがって、
issue routing の結果を
直接 `next_operations` に入れない。

まず queue に置く。
その後、rolling が評価して
`active / next / future` へ振り分ける。

---

## なぜ next に直接入れないか

`next_operations` は現行 spec 上、

- active に入らなかった上位候補
- 7日ローリング後の出力

である。

一方、
issue routing で出る `operations_candidates` は

- ranking 前
- placement 前
- future 判定前

の候補である。

この段階のものを `next` に入れると、
rolling の入力と出力が混ざる。

したがって、
`next_operations` の定義を維持するなら、
その前段に queue を置く必要がある。

---

## queue の位置づけ

構造は次の通りとする。

```text
issue routing
↓
operations candidate queue
↓
operations rolling
↓
active_operations / next_operations / future
```

### issue routing の責務

- operations 候補を見つける
- task draft を返す
- source_ref / reason / evaluated_at / impact_now / urgency_now を保持する

### queue の責務

- rolling 前の候補を保持する
- 入力候補であることを明示する
- 正本ではない
- 順位は未確定
- active / next を決めない

### operations rolling の責務

- queue を含む candidate sources を読む
- ranking する
- placement する
- active / next / future を確定する

---

## queue が必要な理由

### 1. 入力と出力を分けるため

queue は rolling 前の入力層であり、
`next_operations` は rolling 後の出力層である。

この分離により、
候補段階と確定段階を混同しない。

### 2. issue routing と rolling の責務境界を守るため

issue routing は
「operations 候補かどうか」を決める。

rolling は
「今 active / next に入るか」を決める。

queue はこの2つをつなぐ緩衝層である。

### 3. 将来の保存導入余地を残すため

今は return-only でもよいが、
将来的に queue を notes や DB に保存したくなる可能性はある。

そのときも、
queue という概念を先に固定しておけば、
`next` の定義を壊さずに拡張できる。

---

## 現段階の扱い

現段階では、
queue は **概念層** として定義する。

つまり、
いま code 上では

- `operations_candidate_writes`
- `write_status: draft_only`
- `candidate_draft`

を返すだけでよい。

まだ notes/04_operations に保存しない。

これを
「queue に入れうる payload」
として扱う。

---

## queue の最小項目

queue payload は少なくとも次を持てばよい。

- task
- source_ref
- reason
- evaluated_at
- impact_now
- urgency_now
- notes
- generated_from_issue_id

これは rolling 前の候補であり、
まだ `rolling_day` は持たなくてよい。

理由:
- `rolling_day` は placement 後に決まるため
- queue は未配置の候補層だから

---

## operations task schema との関係

operations task schema では、
正本 task の必須項目は

- task
- source_ref
- rolling_day

である。

queue 候補はまだ正本 task ではないため、
`rolling_day` を持たないことを許容する。

つまり、

- queue payload = pre-task candidate
- active / next task = placed task

として区別する。

---

## notes 構造との関係

現行 notes には、
queue 用の専用層は存在しない。

したがって当面は、

- queue は return-only
- 永続保存しない
- rolling 入力としてのみ扱う

でよい。

将来もし保存するなら、
`04_operations` の正本と混ぜず、
別の queue 層を設ける方が自然である。

例:

- `04_operations_queue/`
- `00_inbox/operations_candidate/`
- DB metadata queue

ただし現段階では未導入とする。

---

## code 側の当面方針

現時点で code は次を守ればよい。

1.
`operations_candidate_writes` は queue payload として返す

2.
`write_status: draft_only` を維持する

3.
notes create / update は呼ばない

4.
rolling が読める形で `candidate_draft` を保持する

この方針なら、
現行 spec と整合する。

---

## 将来の拡張条件

queue を永続化してよいのは次の条件が揃ったときである。

- rolling が queue を正規入力 source として読む
- queue の失効・採用・再評価ルールがある
- queue と next の違いを運用上説明できる
- stale queue の処理ルールがある

この条件が未整備なうちは、
queue は概念層 + return-only で十分である。

---

## 判断

issue routing で operations に行った候補は、
`next_operations` に直接入れるのではなく、
**operations candidate queue**
へ入る前提で扱うのが自然である。

現段階の最適解は次である。

- queue は概念層として定義する
- code は queue payload を return-only で返す
- rolling がその候補を評価して active / next / future を決める
- `next_operations` は rolling 後の出力として維持する

この形なら、
あなたの意図した
「issue routing で operations に行ったものを、rolling で優先順位評価する」
を実現しつつ、
現行の operations model と整合を保てる。

# 2026-04-20 routing_and_document_writing_separation

## 目的

routing と document writing を分離し、
issue routing の責務を軽く保つための最小方針を固定する。

本メモは、
再評価、分解 / 統合、送付先判定、後処理、実ドキュメント作成が
1つの処理に混ざって重くなるのを防ぐことを目的とする。

---

## 結論

routing は、
情報をその時点の状況で再評価し、
必要に応じて分解 / 統合し、
適切な送付先と次アクションを決めるところまでを担う。

実際の document writing / placement は、
routing の後段 usecase に分離する。

したがって、
routing と writer の間は
completed document ではなく、
次の中間表現で受け渡す。

1.
`normalized_items`

2.
`routing_decisions`

3.
`action_plan`

---

## なぜ分離するか

理由は 4 つある。

### 1. routing が重くなりすぎるのを防ぐため

routing に
再評価、分解 / 統合、送付先判定、後処理、実 doc 作成まで背負わせると、
責務が広すぎる。

### 2. dry_run と apply を分離しやすくするため

routing は繰り返し試せる方がよい。
document writing を混ぜると、
毎回 write の扱いまで考える必要が出る。

### 3. 判断ミスと書き込みミスを分けるため

route 判定が悪かったのか、
writer payload が悪かったのか、
notes API の適用が悪かったのかを切り分けやすくする。

### 4. review / rolling と混ざるのを防ぐため

operations 正式配置は rolling の責務であり、
routing 後処理が `active_operations.md` を直接 mutate してはいけない。
writer と rolling の境界も分離した方がよい。

---

## routing の責務

routing が担うのは次までとする。

1.
入力情報を読む

2.
その時点の状況で再評価する

3.
必要に応じて分解 / 統合する

4.
送付先を判定する

5.
次アクションを決める

6.
action plan を返す

### routing の出力

- `normalized_items`
- `routing_decisions`
- `action_plan`

### routing がやらないこと

- design / plan / future / archive の実 doc を完成させる
- `active_operations.md` を直接更新する
- rolling の代替をする
- review の代替をする
- 実 write を前提に処理を固定する

---

## document writing の責務

writer が担うのは次である。

1.
`action_plan` を解釈する

2.
必要な doc の payload seed を作る

3.
suggested_file や body を組み立てる

4.
dry_run では payload だけ返す

5.
apply では create / update を呼ぶ

### writer の入力

- `normalized_items`
- `routing_decisions`
- `action_plan`
- `source_ref`
- `mode`
- `now`

### writer の出力

- `design_writes`
- `plan_writes`
- `operations_candidate_writes`
- `future_writes`
- `archive_writes`
- `kept_items`
- `skipped`

---

## 中間表現

### 1. normalized_items

入力の形を揃えた一覧。

最小では次を持てばよい。

- `item_id`
- `source_type`
- `source_ref`
- `title`
- `summary`
- `description`
- `metadata`

### 2. routing_decisions

各 item に対する判断結果。

最小では次を持てばよい。

- `item_id`
- `route_to`
- `reason`
- `evaluated_at`
- `next_action`
- `keep_open`

### 3. action_plan

writer や rolling が読むための後段入力。

最小では次の単位で持つ。

- `design_updates`
- `plan_updates`
- `operations_candidates`
- `future_candidates`
- `archive_items`
- `keep_items`
- `skipped`

---

## issue routing 文脈での意味

issue routing では、
routing は issue を再評価して
`design / plan / operations candidate / future / archive`
のどこへ送るかを決める。

その後、
writer は
design draft、future draft、archive draft、operations candidate payload
を作る。

このとき重要なのは次である。

- routing は route 判定まで
- writer は write payload 生成まで
- operations 正式配置は rolling まで

つまり、
issue routing と notes write と rolling は
3段で分ける。

```text
issue routing
↓
action plan
↓
document writer
↓
operations candidate queue / design draft / future draft / archive draft
↓
operations rolling
↓
active / next / future
```

---

## operations との関係

`route_to: operations` の item は、
routing の時点ではまだ active / next を決めない。

routing が返すのは
`operations candidate`
までである。

それを queue payload として扱い、
rolling が active / next / future を決める。

したがって、
writer がやるのも queue payload 生成までに留める。

---

## 最小運用ルール

- routing は completed document を返さない
- writer は route 判定をやり直さない
- rolling は writer の代わりに draft を作らない
- review は routing の代わりに未整理情報を再評価しない
- 迷うときは write を急がず、dry_run と action plan 確認を優先する

---

## 判断

routing と document writing は分離する方が自然である。

routing は
再評価 / 分解統合 / 送付先判定 / action plan 生成までに留める。

document writing は
その後段 usecase として分ける。

両者の間は
completed document ではなく、
`normalized_items + routing_decisions + action_plan`
で受け渡す。

この形なら、
責務分離を保ったまま、
issue routing の実運用と後処理を前進させやすい。

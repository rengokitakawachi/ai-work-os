# 2026-04-21 issue_routing_second_batch_additional_issue_conditions

## 目的

issue routing の第二バッチで必要になる
追加 issue について、
保存前に条件だけを固定する。

本メモは、
keep / future / archive を観測するために
どんな属性の issue を追加すべきかを明確にし、
保存可否の判断を軽くすることを目的とする。

---

## 参照

- `notes/08_analysis/2026-04-21_issue_routing_second_batch_candidate_set.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/01_issues/idea_log.md`
- `src/services/flow-control/rules.js`

---

## 結論

第二バッチで追加が必要なのは、
次の 3 種類である。

1.
keep 観測用 issue

2.
future 観測用 issue

3.
archive 観測用 issue

この段階では、
issue 本文そのものを保存するのではなく、
追加候補が満たすべき条件だけを固定する。

---

## 追加条件

### 1. keep 観測用 issue

目的:
- `route_to: issue` が
  残るべきケースを比較対象として持つ

必要条件:
- status: `open`
- category: architecture / operations 以外
- impact: `medium`
- urgency: `low` または `medium`
- 現 phase の対象内

期待 route:
- `issue`

期待する意味:
- category 判定を前へ出した後も、
  keep が完全に消えていないことを確認する
- keep が「弱い issue の保留レイヤー」として機能しているかを見る

避ける条件:
- category が architecture / operations
- impact が high
- status が closed
- status が open 以外

---

### 2. future 観測用 issue

目的:
- `route_to: future` を
  実運用上の自然なケースで観測する

必要条件:
次のいずれかを満たす。

- status が `open` 以外
  例: `blocked`, `pending`, `deferred`

または

- phase が現行 phase と異なる
  例: current が `phase0` のときに `phase1`

期待 route:
- `future`

期待する意味:
- 今やる対象ではない issue を
  future に送る判断が機能しているかを確認する
- keep と future の役割差が崩れていないかを見る

避ける条件:
- status が closed
- architecture / operations の route を先に引く高優先条件

補足:
- まずは status 非 open を使う方が分かりやすい
- phase 不一致は次段で追加比較してもよい

---

### 3. archive 観測用 issue

目的:
- `route_to: archive` を
  役目終了ケースで観測する

必要条件:
- status: `closed`
- すでに役目終了が明確
- 再評価や継続実行を前提としない

期待 route:
- `archive`

期待する意味:
- archive が「終了済みの明確な受け皿」として機能しているかを見る
- keep / future との境界が崩れていないか確認する

避ける条件:
- 実は継続論点が残っているもの
- status だけ閉じているが、内容上は未完のもの

---

## 推奨追加順

追加する順番は次が自然である。

1.
keep 観測用 issue

2.
future 観測用 issue

3.
archive 観測用 issue

理由:
- keep は現在の route バランス確認に直接効く
- future は未着手 / 保留の扱い確認に重要
- archive は終了条件が明確なため、最後でもぶれにくい

---

## 保存時の注意

追加 issue を実際に issue log へ入れるときは、
次を守る。

- 1論点1issue にする
- 実在の観測用論点として自然であること
- route を出すためだけの不自然な作文にしない
- source_ref または context を持たせる
- second batch のための比較対象であることが読めるようにする

---

## 今回やらないこと

この段階では、
次はまだ行わない。

- issue log への即保存
- 第二バッチ全体の実行
- action_plan の記録
- rolling 反映

今回は
**保存前の条件固定**
に留める。

---

## 次に自然なアクション

1.
必要なら user 合意のうえで、
keep / future / archive 用 issue を 1 件ずつ保存する

2.
第二バッチ全体を routing して観測する

3.
第二バッチ観測結果を analysis に返す

---

## 判断

第二バッチ追加 issue の条件としては、
次で十分に固定できる。

- keep: open / category 弱 / medium
- future: non-open または phase 不一致
- archive: closed / 役目終了明確

この形なら、
保存前に route 期待値と役割境界を明確にできるため、
第二バッチ実行の前提として自然である。

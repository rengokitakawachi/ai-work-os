# 2026-04-22 intake_routing_observation_items

## 目的

intake routing の第一バッチ実験で、
何を観測できたら
`issue / design / future`
の最小運用が成立したと言えるかを固定する。

本メモは、
第一バッチ候補セットに対して
実験前に見るべき観点と記録項目を明文化することを目的とする。

---

## 参照

- `notes/02_design/2026-04-21_intake_routing_minimum_operation_experiment.md`
- `notes/02_design/intake_review_and_source_ref_spec.md`
- `notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md`
- `notes/08_analysis/2026-04-22_intake_routing_first_batch_candidate_set.md`

---

## 結論

第一バッチで最低限見るべき観点は、次の 5 つである。

1.
route 判定

2.
1テーマ1メモの成立性

3.
source_ref の自然さ

4.
inbox 後処理

5.
role boundary

この 5 観点を、
第一バッチ 3 件

- `pending_tasks`
- `reflection_design`
- `branch_strategy_future`

に対して同じ型で記録すれば、
intake routing の最小完成条件にかなり近づいたと言える。

---

## 観測観点

### 1. route 判定

確認項目:
- `route_to`
- `reason`
- `review_at`

見ること:
- route が `issue / design / future` の期待と大きくズレていないか
- 理由文が運用上説明可能か
- future の場合、keep ではなく future に送る理由が明確か

最小質問:
- この route は人間が読んで納得できるか
- reason は route の説明になっているか
- `review_at` は route と矛盾していないか

---

### 2. 1テーマ1メモの成立性

確認項目:
- 出力が単一テーマとして読めるか
- タイトルが適切か
- issue / design / future の各レイヤーで単体読解できるか

見ること:
- 元入力の複数論点が雑に混ざっていないか
- 小さすぎる断片になっていないか
- 読み手が source 元なしでも内容理解できるか

最小質問:
- このメモは 1テーマ1メモになっているか
- タイトルだけで主題が分かるか
- 単体で次の判断につなげられるか

---

### 3. source_ref の自然さ

確認項目:
- 出力側にのみ source_ref が付いているか
- 元入力ファイルを追跡できるか
- 複数 source がある場合、過不足がないか

見ること:
- 入力側を直接汚していないか
- 派生メモから出自追跡ができるか
- source_ref が冗長すぎないか

最小質問:
- source_ref は出力側だけにあるか
- この派生メモの元入力を辿れるか
- 出自情報として十分だが過剰ではないか

---

### 4. inbox 後処理

確認項目:
- `archive` に移すべきか
- `pending` として残すべきか
- その理由を明示できるか

見ること:
- 処理済み入力を無理由で inbox に残していないか
- 判断不能なものだけを pending にしているか
- routing と後処理を混同していないか

最小質問:
- この元入力は役目終了か
- まだ保留すべき要素が残っているか
- archive / pending の理由を1文で言えるか

---

### 5. role boundary

確認項目:
- intake routing が入口処理に留まっているか
- issue routing / review / operations を背負っていないか
- 送付先判定と実行判断を混同していないか

見ること:
- intake の時点で active 化や優先順位づけに踏み込んでいないか
- issue routing でやるべき再配置を intake が先取りしていないか
- review 的な進捗評価を混ぜていないか

最小質問:
- これは入口処理として自然か
- issue routing に渡す前提を壊していないか
- operations / review の責務を背負っていないか

---

## 第一バッチ用の観測シート雛形

### A. pending_tasks

期待:
- `issue`

記録欄:
- route_to:
- reason:
- review_at:
- 1テーマ1メモの自然さ:
- source_ref の自然さ:
- inbox 後処理:
- role boundary メモ:

### B. reflection_design

期待:
- `design`

記録欄:
- route_to:
- reason:
- review_at:
- 1テーマ1メモの自然さ:
- source_ref の自然さ:
- inbox 後処理:
- role boundary メモ:

### C. branch_strategy_future

期待:
- `future`

記録欄:
- route_to:
- reason:
- review_at:
- 1テーマ1メモの自然さ:
- source_ref の自然さ:
- inbox 後処理:
- role boundary メモ:

---

## completed condition の扱い

第一バッチ観測は、
単に `route_to` が返るだけでは完了としない。

最低でも次を満たしたときに、
最小運用観測として completed 扱いに近づく。

- 3 件とも route / reason / review_at を記録済み
- 3 件とも 1テーマ1メモ成立性を評価済み
- 3 件とも source_ref の自然さを評価済み
- 3 件とも inbox 後処理の仮判断を記録済み
- intake と issue routing の役割差を説明できるメモが残っている

---

## 判断

第一バッチで観測すべき内容は、
`route_to` 単独ではなく

- route 判定
- メモ成立性
- source_ref
- inbox 後処理
- role boundary

の 5 観点で固定するのが自然である。

この型で記録すれば、
intake routing の完成条件を
「コードがあること」ではなく
「実運用で入口処理として成立していること」
で判定しやすくなる。

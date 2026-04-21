# 2026-04-21 issue_routing_second_batch_dry_run_observation

## 目的

issue routing の第二バッチ入力セットを、
現行 rules に基づく dry-run 観測として整理する。

本メモは、
第二バッチ 5 件が
`design / operations / issue / future / archive`
へ実際に分岐する見込みを確認し、
issue routing の完成条件に必要な route 多様性が
どこまで埋まったかを把握することを目的とする。

---

## 参照

- `notes/01_issues/idea_log.md`
- `notes/08_analysis/2026-04-21_issue_routing_second_batch_candidate_set.md`
- `notes/02_design/2026-04-21_issue_routing_second_batch_additional_issue_conditions.md`
- `src/services/flow-control/rules.js`
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/issue-routing-actions.js`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`

---

## 結論

第二バッチ 5 件は、
現行 rules に基づくと次のように分岐する見込みである。

- `20260420-024` → `design`
- `20260419-023` → `operations`
- `20260421-025` → `issue`
- `20260421-026` → `future`
- `20260421-027` → `archive`

したがって、
第二バッチは
`design / operations / issue / future / archive`
を 1 セットで観測できる構成になった。

これは、
issue routing の完成条件で要求されている
送付先多様性の観測に対して、
最小限必要な入力セットが揃ったことを意味する。

---

## 観測対象

### 1. 20260420-024

- category: `architecture`
- impact: `high`
- status: `open`

期待 route:
- `design`

理由:
- `status` は open
- `category === architecture` が成立
- `impact != high` keep gate より先に design 判定へ到達する

期待 action:
- `design_updates` に入る
- `keep_items` にも残る

---

### 2. 20260419-023

- category: `operations`
- impact: `medium`
- status: `open`

期待 route:
- `operations`

理由:
- `status` は open
- `category === operations` が成立
- category 判定が keep gate より前にあるため operations に到達する

期待 action:
- `operations_candidates` に入る
- `keep_items` にも残る

---

### 3. 20260421-025

- category: `general`
- impact: `medium`
- status: `open`

期待 route:
- `issue`

理由:
- `status` は open
- architecture / operations の category ではない
- `impact != high` keep gate に到達する

期待 action:
- `keep_items` のみに入る

意味:
- keep レイヤーが残るべきケースを比較対象として観測できる

---

### 4. 20260421-026

- category: `operations`
- impact: `medium`
- status: `deferred`

期待 route:
- `future`

理由:
- `status !== open` が category 判定より先に成立する
- そのため operations category を持っていても future に送られる

期待 action:
- `future_candidates` に入る
- `keep_items` にも残る

意味:
- future と operations の優先関係が明確に確認できる

---

### 5. 20260421-027

- category: `operations`
- impact: `low`
- status: `closed`

期待 route:
- `archive`

理由:
- `status === closed` が最優先で成立する
- keep / future / operations より先に archive へ行く

期待 action:
- `archive_items` に入る

意味:
- archive が終了済み論点の受け皿として機能しているか確認できる

---

## route 多様性の結果

第二バッチで観測できる見込みの route は次である。

- `design`
- `operations`
- `issue`
- `future`
- `archive`

したがって、
第一バッチで不足していた
future / archive / keep 比較は、
第二バッチ入力セットで補える状態になった。

---

## action_plan の期待分布

第二バッチ全体で期待される action_plan の分布は次である。

- `design_updates`: 1
- `operations_candidates`: 1
- `future_candidates`: 1
- `archive_items`: 1
- `keep_items`: 4

補足:
- operations / design / future は keep_items にも残る
- archive は keep されない

---

## 今回分かったこと

- 第二バッチは route 多様性を埋める設計として成立している
- `status` 判定が category より先にあるため、future / archive の優先関係も観測できる
- keep は廃止されず、弱い issue の保留レイヤーとして残る
- operations candidate と design update を同一バッチ内で比較できる

---

## まだ未確認のもの

### 1. rolling 接続の実観測
`operations_candidates` が active / next / future のどこへ入るかは次タスクで確認する必要がある。

### 2. 実行ログとしての dry-run 出力
今回は現行 code 構造に基づく観測であり、実 repo 環境での実行ログ取得は別確認である。

---

## 次に自然なタスク

1.
`第二バッチ観測結果を analysis に返す`

2.
`operations candidate を rolling に接続して反映確認する`

3.
`keep / future / archive の運用妥当性を整理する`

---

## 判断

第二バッチ入力セットは、
issue routing の完成条件に必要な
送付先多様性を観測するための最小構成として妥当である。

したがって、
次の主論点は
第二バッチの route 分岐そのものではなく、
**operations 接続と送付先ごとの運用妥当性確認**
へ移ったと判断してよい。

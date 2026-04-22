# 2026-04-22 intake_routing_first_batch_expectation_observation

## 目的

intake routing 第一バッチ 3 件について、
adapter 未実装前提での **期待値ベース observation** を記録する。

本メモは、
機械的な dry run 実行前に

- どの route を期待するか
- なぜその route が自然か
- 1テーマ1メモ / source_ref / inbox 後処理 / role boundary

を先に固定し、
後段の実観測と比較できる基準を残すことを目的とする。

---

## 参照

- `notes/08_analysis/2026-04-22_intake_routing_first_batch_candidate_set.md`
- `notes/08_analysis/2026-04-22_intake_routing_observation_items.md`
- `notes/08_analysis/2026-04-22_intake_routing_first_batch_execution_readiness.md`
- `notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`
- `notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md`
- `notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md`
- `src/services/flow-control/rules.js`
- `src/services/flow-control/intake-routing.js`

---

## 前提

現時点では、
inbox markdown をそのまま intake routing に流す adapter は未実装である。

したがって本メモの観測は、

- 実入力の内容
- 現行 rules.js の最小ルール
- intake routing spec

をもとにした **期待値ベース observation** である。

---

## A. pending_tasks

対象:
`notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`

### 期待 route

- `route_to: issue`
- `review_at: daily_review`

### 期待 reason

- 問題として扱う入力のため issue に送る
- まだ設計メモとして単一テーマに整理しきれていない

### 1テーマ1メモの成立性

見立て:
- 元入力は複数論点を含むため、そのまま 1 item で流すのは粗い
- 本来は
  - GPT指示改善
  - Todoist Action連携
  - archive運用ルール
  - Outlook連携設計
  などの論点ごとに分解したい

判断:
- **元入力単体では 1テーマ1メモ性が弱い**
- intake routing の価値は、ここを issue 群へ自然分解できるかにある

### source_ref の自然さ

見立て:
- 派生 issue が複数になっても、同じ source_ref を持つのは自然
- 出力側にのみ付与する前提と整合する

判断:
- source_ref は自然
- むしろ source_ref がないと、複数 issue の出自が見えにくくなる

### inbox 後処理

見立て:
- その場で archive に移すのはまだ早い
- 複数論点への分解が済み、派生 issue が成立した後に archive 可否を判断する方が安全

仮判断:
- **pending / 一時残し** が自然

### role boundary

見立て:
- intake の段階では issue 化までで止めるのが自然
- active 化、優先順位づけ、operations candidate 化はまだやらない

判断:
- 入口処理として issue に送るのが自然
- issue routing が後段で粒度再確認と再配置を担うべき

---

## B. reflection_design

対象:
`notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md`

### 期待 route

- `route_to: design`
- `review_at: weekly_review`

### 期待 reason

- 構造整理が必要な入力のため design に送る
- 問題提起より、設計方針・API案・データ構造の整理が中心

### 1テーマ1メモの成立性

見立て:
- reflection 機能設計という単一テーマ性が高い
- API / データ構造 / フェーズを含むが、全体は同一設計テーマに収束している

判断:
- **1テーマ1メモとして成立しやすい**
- 第一バッチの design 観測用として最も扱いやすい

### source_ref の自然さ

見立て:
- 将来 design note へ昇格したとき、この元メモへの参照は自然
- 派生 design メモの出自として十分

判断:
- source_ref は自然
- 1本の source で足りる

### inbox 後処理

見立て:
- design メモとして派生した後は、元入力の役目はほぼ終わる
- ただし設計骨子の取りこぼし確認前なら pending もありうる

仮判断:
- **design 派生後は archive 寄り**
- ただし初回観測では一度 pending 判断も許容

### role boundary

見立て:
- intake の段階では design に送るまで
- docs 化や実装優先順位づけはまだ背負わない

判断:
- 入口処理として design に送るのが自然
- design routing / review が後続で成熟度を扱うべき

---

## C. branch_strategy_future

対象:
`notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md`

### 期待 route

- `route_to: future`
- `review_at: weekly_review`

### 期待 reason

- 今は扱わない入力のため future に送る
- 内容は明確だが、現時点では着手条件が満たされていない

### 1テーマ1メモの成立性

見立て:
- branch 戦略への将来移行という単一テーマに収束している
- future note として単体読解しやすい

判断:
- **1テーマ1メモとして成立しやすい**

### source_ref の自然さ

見立て:
- future note に source_ref として元入力を残すのは自然
- 将来再活性化時の出自確認にも使いやすい

判断:
- source_ref は自然

### inbox 後処理

見立て:
- future へ送った時点で、元入力の役目はかなり薄い
- ただし future note が未生成なら一時残しもありうる

仮判断:
- **future 派生後は archive 寄り**

### role boundary

見立て:
- intake は future へ送るまで
- 直接 active / plan / operations に戻さない
- 再活性化時は intake routing 再実行前提とする

判断:
- 入口処理として future に送るのが自然
- review / rerouting が後段で扱うべき

---

## 横断判断

### route の期待

- `pending_tasks` → `issue`
- `reflection_design` → `design`
- `branch_strategy_future` → `future`

この 3 件は、第一バッチの最小 route 多様性として妥当である。

### メモ成立性

- `pending_tasks` だけは複数論点を含み、チャンク分解前提が強い
- `reflection_design` と `branch_strategy_future` は 1テーマ性が高い

### inbox 後処理

- `pending_tasks` は pending 寄り
- `reflection_design` は design 派生後 archive 寄り
- `branch_strategy_future` は future 派生後 archive 寄り

### role boundary

- intake は入口処理に留まるべき
- issue / design / future への送付まで
- issue routing / design routing / review / operations を先取りしない

---

## 含意

第一バッチの期待値ベース observation は成立したが、
次の未達が残る。

1.
`pending_tasks` をどう最小チャンクへ分解するか

2.
inbox markdown から item / source bundle を作る adapter がない

したがって、
次の自然な task は

- `intake routing 用 inbox markdown adapter の最小要件を整理する`

である。

---

## 判断

期待値ベース observation としては、
第一バッチ 3 件は

- issue
- design
- future

の 3 分岐を観測する候補として妥当である。

ただし、
機械的な dry run 実行には inbox adapter が不足しているため、
次は adapter 最小要件の整理へ進むのが自然である。

# 2026-04-22 intake_routing_first_batch_mechanical_dry_run_observation

## 目的

inbox markdown adapter の最小実装後に、
第一バッチ 3 件について mechanical dry run 観測結果を記録する。

本メモは、
期待値ベース observation と、
実コード経由の route / reason / review_at を比較し、
intake routing が入口処理として成立しているかを確認することを目的とする。

---

## 参照

- `notes/08_analysis/2026-04-22_intake_routing_first_batch_candidate_set.md`
- `notes/08_analysis/2026-04-22_intake_routing_observation_items.md`
- `notes/08_analysis/2026-04-22_intake_routing_first_batch_expectation_observation.md`
- `notes/08_analysis/2026-04-22_intake_inbox_markdown_adapter_minimum_requirements.md`
- `notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`
- `notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md`
- `notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md`
- `src/services/flow-control/adapters.js`
- `src/services/flow-control/intake-routing.js`
- `src/services/flow-control/rules.js`

---

## 前提

今回の観測は、
最小実装された `buildIntakeInboxSourceBundle` と現行 `rules.js` を前提にした dry run 結果である。

最小 adapter の挙動:
- 1ファイル = 1item
- title は markdown 見出し優先
- summary は最初の段落
- design 系文脈は `metadata.category: architecture`
- future 系文脈は `review_at: monthly_review`

---

## A. pending_tasks

対象:
`notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`

### dry run 観測

- route_to: `issue`
- reason: `問題として扱う入力のため issue に送る`
- review_at: `daily_review`

### 期待との差分

- 期待値どおり
- route / review_at にズレはない

### 1テーマ1メモの成立性

- 1ファイル = 1item なので、複数論点がそのまま残る
- route 自体は issue で自然だが、1テーマ1メモ性は弱い
- 特に
  - GPT指示改善
  - Todoist Action連携
  - archive運用
  - Outlook連携設計
  が同居している

判断:
- **route は妥当**
- **メモ粒度は粗い**
- 次の拡張候補はここに集中する

### source_ref の自然さ

- source_ref は元ファイル 1 本で十分追跡可能
- issue 群へ後で分解しても出自を保ちやすい

判断:
- 自然

### inbox 後処理

- 現段階では archive ではなく pending 寄り
- 分解前に役目終了扱いにはしない方が安全

### role boundary

- intake の時点で issue へ送るだけに留まっている
- active 化や operations 候補化に踏み込んでいない

判断:
- 入口処理として自然

---

## B. reflection_design

対象:
`notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md`

### dry run 観測

- route_to: `design`
- reason: `構造整理が必要な入力のため design に送る`
- review_at: `weekly_review`

### 期待との差分

- 期待値どおり
- route / review_at / reason いずれも自然

### 1テーマ1メモの成立性

- 単一テーマ性が高い
- 設計方針、API 案、データ構造は同一の reflection 設計テーマに収束している

判断:
- **最小 adapter の 1ファイル1item で十分成立する**

### source_ref の自然さ

- 派生 design メモの出自として自然
- source_ref 1本で十分

### inbox 後処理

- design 側に派生した後は archive 寄り
- ただし初回観測では pending 一時残しも許容範囲

### role boundary

- intake は design へ送るまでに留まる
- docs 化や成熟度判断は design routing 後段に委ねられる

判断:
- 入口処理として自然

---

## C. branch_strategy_future

対象:
`notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md`

### dry run 観測

- route_to: `future`
- reason: `今は扱わない入力のため future に送る`
- review_at: `weekly_review`

補足:
- adapter 側で `review_at: monthly_review` を補っている
- `rules.js` では future route の返却時に `review_at: weekly_review` になる
- したがって、入力ヒントは monthly だが routing decision の出力は weekly になる

### 期待との差分

- route は期待値どおり
- `review_at` は期待メモでは weekly 想定だったため実質差分なし
- future 条件の作り方として monthly hint → weekly decision という層差は残る

### 1テーマ1メモの成立性

- 単一テーマ性が高い
- future note として単体読解しやすい

判断:
- **最小 adapter の 1ファイル1item で十分成立する**

### source_ref の自然さ

- 将来再活性化時の出自追跡として自然
- source_ref 1本で十分

### inbox 後処理

- future 側へ派生後は archive 寄り
- 少なくとも inbox に長く残す必要は薄い

### role boundary

- intake は future へ送るまで
- active / operations / plan へ直結させていない

判断:
- 入口処理として自然

---

## 横断比較

### route 判定

- `pending_tasks` → `issue`
- `reflection_design` → `design`
- `branch_strategy_future` → `future`

結果:
- 第一バッチの 3 分岐は mechanical dry run でも成立した

### 期待値との一致

- 3件とも route は期待どおり
- `reason` も現行 rules の説明として自然
- `review_at` も大きなズレはない

### 1テーマ1メモの差

- `reflection_design` と `branch_strategy_future` は最小 adapter で十分
- `pending_tasks` だけは複数論点混在が残る

### source_ref

- 3件とも source_ref は自然
- 最小 adapter の 1 source_ref で十分追跡可能

### inbox 後処理

- `pending_tasks` は pending 寄り
- `reflection_design` は design 派生後 archive 寄り
- `branch_strategy_future` は future 派生後 archive 寄り

### role boundary

- 3件とも intake が入口処理に留まっている
- issue routing / design routing / review / operations の責務を先取りしていない

---

## 判断

第一バッチ 3 件の mechanical dry run 観測としては、
intake routing の最小入口処理は成立している。

特に:
- route 多様性は成立した
- source_ref は自然
- role boundary も守られている

一方で、
次の主要未達は `pending_tasks` の粒度である。

つまり今後の拡張ポイントは
**inbox adapter 全体ではなく、まず `pending_tasks` 型の複数論点入力のチャンク分解要否**
に絞ってよい。

---

## 次の自然なタスク

1.
`pending_tasks 向けの inbox チャンク分解拡張要否を整理する`

2.
必要なら、その後に
`intake inbox adapter の複数 item 抽出最小拡張を設計する`

---

## 結論

mechanical dry run の結果、
第一バッチ 3 件は

- issue
- design
- future

の最小 3 分岐を実コード経由でも観測できた。

したがって、
intake routing の最小入口処理は成立していると判断してよい。

次の論点は route そのものではなく、
`pending_tasks` のような複数論点入力をどこまで分解するかである。

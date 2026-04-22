# 2026-04-22 intake_routing_first_batch_execution_readiness

## 目的

intake routing 第一バッチ 3 件を実際に観測する前に、
現 code でどこまで機械的に実行可能かを確認する。

---

## 対象

- `notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`
- `notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md`
- `notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md`

---

## 結論

現時点では、
**第一バッチ 3 件を markdown ファイルからそのまま intake routing に流す専用 adapter が未実装**
である。

したがって、
今の code で直接できるのは

- `routeSingleIntakeCandidate` に手で item を与える dry run

までであり、

- inbox markdown 群を読んで
- チャンク分解 / テーマ統合前提で item 化し
- source bundle として routing する

ところまではまだ自動化されていない。

---

## code 読み取り

### 1. `intake-routing.js`

`routeIntakeCandidates` は `sourceBundles` を受ける。

前提:
- `source_type`
- `source_ref`
- `items`

がすでに構築されている必要がある。

### 2. `candidate.js`

`collectCandidates` は、source bundle 内の `items` をそのまま集めるだけである。

つまり:
- markdown を読む
- 項目へ変換する

処理はここでは行わない。

### 3. `adapters.js`

既存 adapter はある。

- plan
- issue
- issue routing
- design routing
- active / next operations
- operations queue

しかし、
**intake 用の inbox markdown adapter はまだない。**

---

## 含意

第一バッチ 3 件について、
現時点では次の 2 層を分けて扱う必要がある。

### A. 観測前提としての評価

これは今すぐできる。

- route 期待
- 1テーマ1メモ成立性の見立て
- source_ref の妥当性
- inbox 後処理の仮判断
- role boundary の確認観点

### B. 機械的な dry run 実行

これは未完成。

必要なもの:
- inbox markdown を読み取る adapter
- 必要ならチャンク分解 / テーマ統合前提の最小 item 化ルール

---

## 第一バッチ 3 件の実行 readiness

### 1. pending_tasks

状態:
- 観測候補としては有効
- ただし複数論点を含むため、本来は item 化前にチャンク分解を入れたい

readiness:
- 観測前提評価は可能
- そのまま 1 item で流すのは入口仕様として粗い

### 2. reflection_design

状態:
- 1テーマ性が高く、手で 1 item に落としやすい

readiness:
- 第一バッチの design 観測用として最も扱いやすい

### 3. branch_strategy_future

状態:
- 1テーマ性が高く、future 理由も説明しやすい

readiness:
- 第一バッチの future 観測用として扱いやすい

---

## 次の自然なタスク

1.
第一バッチ 3 件について、
観測シートに沿った **期待値ベース observation** を先に記録する

2.
別 task として
`intake routing 用 inbox markdown adapter の最小要件を整理する`
を立てる

3.
必要なら、その後に
`intake routing 用 inbox source bundle adapter を実装する`
へ進む

---

## 判断

第一バッチの観測設計自体は整ったが、
実ファイルから直接 routing する機械的ラインはまだ未完成である。

したがって、
今の自然な進め方は

- 先に期待値ベース observation を記録する
- その後で intake adapter 不足を task 化する

の順である。

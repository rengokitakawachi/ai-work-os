# 2026-04-22 intake_inbox_markdown_adapter_minimum_requirements

## 目的

intake routing 用 inbox markdown adapter の最小要件を固定する。

本メモは、
実 inbox / inbox 相当 markdown を mechanical dry run に載せるために、
何を adapter が担い、何を後続拡張に回すかを明確にすることを目的とする。

---

## 参照

- `notes/08_analysis/2026-04-22_intake_routing_first_batch_execution_readiness.md`
- `notes/08_analysis/2026-04-22_intake_routing_first_batch_expectation_observation.md`
- `notes/02_design/intake_review_and_source_ref_spec.md`
- `src/services/flow-control/adapters.js`
- `src/services/flow-control/intake-routing.js`
- `src/services/flow-control/normalize.js`

---

## 結論

最小 adapter は、
**1ファイル = 1item** の粗い形でよい。

この段階で必要なのは、
完全なチャンク分解ではなく

- markdown を読む
- title / summary / source_ref を持つ item にする
- 必要最低限の metadata を付ける
- `source_type: inbox` の bundle を返す

ところまでである。

つまり最小版の責務は

- intake routing に流せる input shape を作ること

であり、

- 厳密なチャンク分解
- 複数論点の完全統合
- 保存書き込み

までは背負わない。

---

## なぜ最小版でよいか

第一バッチ 3 件のうち

- `reflection_design`
- `branch_strategy_future`

は、1ファイル = 1テーマ にかなり近い。

一方で

- `pending_tasks`

だけは複数論点を含むが、
これは後続でチャンク分解拡張対象として扱えばよい。

したがって、
最初の目的は

- 第一バッチを mechanical dry run 可能にすること

であり、
最小 adapter はそのための足場として十分である。

---

## 最小入出力

### 入力

- `content`
  - inbox markdown 全文
- `sourceRef`
  - 元ファイルパス

### 出力

```text
{
  source_type: 'inbox',
  source_ref: [sourceRef],
  items: [
    {
      title,
      summary,
      candidate_type: 'issue',
      source_ref: [sourceRef],
      metadata: {
        extracted_from: 'inbox_markdown',
        source_kind: 'inbox',
        original_path: sourceRef,
        category?,
        description?
      }
    }
  ]
}
```

補足:
- `candidate_type` は最小版では `issue` 既定でよい
- `design` / `future` は `rules.js` 側の category / review_at / 文脈で判定させる
- `source_ref` は bundle と item の両方に入れてよい

---

## 最小 item 化ルール

### 1. title

優先順位:
1. markdown の `#` 見出し
2. sourceRef のファイル名

### 2. summary

- タイトル直後の最初の段落
- 見つからなければ空でなく、先頭数行を連結して補う

### 3. candidate_type

- 最小版では `issue` 固定
- ただし将来拡張で `design` を明示抽出してもよい

### 4. metadata

最低限:
- `extracted_from: 'inbox_markdown'`
- `source_kind: 'inbox'`
- `original_path: sourceRef`
- `description: summary`

追加してよいもの:
- `category`
- `review_at`

ただし最小版では、
category 推定を無理に広げない。

---

## 第一バッチ 3 件への当てはめ

### 1. pending_tasks

最小 adapter での扱い:
- 1 file = 1 item
- title: `開発メモ（積み残しタスク）`
- summary: 概要段落
- candidate_type: `issue`

期待:
- 現 rules では `issue` に落ちる見込み

注意:
- 本来は複数論点分解したい
- ただし最小版では後続拡張に回す

### 2. reflection_design

最小 adapter での扱い:
- 1 file = 1 item
- title: `Reflection機能設計メモ`
- summary: 概要段落
- candidate_type: `issue`
- metadata.category を `architecture` に寄せる余地あり

期待:
- design に送るには、最小版では `metadata.category: architecture` を入れるのが安全

判断:
- 第一バッチの design 観測を安定させるため、
  最小 adapter では
  **title / summary / content 文脈から `設計メモ` を見たら `metadata.category: architecture` を付ける**
  程度は許容してよい

### 3. branch_strategy_future

最小 adapter での扱い:
- 1 file = 1 item
- title: `Branch Strategy (Future Plan)`
- summary: 概要段落
- candidate_type: `issue`
- `review_at: monthly_review` または summary / description に `future` 文脈を保持

期待:
- future に送るには、
  `review_at` か reason text で future 条件を満たすのが安全

判断:
- 最小 adapter では
  タイトルや本文に `future plan` / `将来的` が強く出る場合、
  `review_at: monthly_review` を補うのが最小で安全

---

## adapter がやること

1.
markdown から title を取る

2.
summary を取る

3.
source_ref 付き item を作る

4.
必要最低限の metadata を補う

5.
`source_type: inbox` bundle を返す

---

## adapter がやらないこと

1.
厳密なチャンク分解

2.
ファイル横断のテーマ統合

3.
保存書き込み

4.
archive / pending の確定

5.
issue routing 的な再配置

6.
operations candidate 生成判断

---

## 最小実装方針

自然な差分は、`adapters.js` に次を追加する形である。

- `buildIntakeInboxSourceBundle({ content, sourceRef })`

内部では既存 helper を再利用する。

- `extractMarkdownTitle`
- `extractFirstParagraph`

必要なら、ごく小さい inbox 専用 helper を足す。

- `looksLikeDesignMemo(content, title)`
- `looksLikeFutureMemo(content, title)`

ただし最小版では複雑な分類器は作らない。

---

## 最小完成条件

この adapter が完成したと言える最小条件は次である。

- markdown 1件から source bundle を返せる
- `routeIntakeCandidates` にそのまま渡せる
- 第一バッチ 3 件を mechanical dry run できる
- `reflection_design` が design に寄る
- `branch_strategy_future` が future に寄る
- `pending_tasks` が少なくとも issue として落ちる

---

## 次の自然なタスク

1.
`intake routing 用 inbox markdown adapter の最小実装差分を作る`

2.
その後、第一バッチ 3 件を mechanical dry run して observation を追記する

3.
必要なら、`pending_tasks` 向けのチャンク分解拡張を別 task 化する

---

## 判断

最小 adapter は

- 1ファイル = 1item
- title / summary / source_ref を抽出
- ごく少量の metadata 補助
- `source_type: inbox` bundle を返す

までで十分である。

この粒度なら、
過剰実装せずに第一バッチの mechanical dry run へ進める。

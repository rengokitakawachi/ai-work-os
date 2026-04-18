# 2026-04-17 route_design_candidates_minimum_rule_examples

## 目的

`routeDesignCandidates`
の最小 rule

```text
archive
→ future
→ docs
→ operations
→ design
```

が、
具体的な design candidate に対して
どう効くかを
実装前の期待挙動として固定する。

本メモは、
5 種類の典型ケースを使って、
優先順ルールの解釈をぶれにくくするための analysis である。

---

## 結論

現行の最小 rule では、
各 candidate は次のように振り分けるのが自然である。

- 役目終了 → `archive`
- 将来送り → `future`
- docs_ready → `docs`
- 実行候補価値あり → `operations`
- それ以外 → `design`

重要なのは、
**複数条件が同時に立っても、先にある rule が優先される**
ことである。

---

## 例1: archive

### 入力 candidate

```json
{
  "design_id": "design_old_routing_split",
  "title": "旧 routing split draft",
  "maturity_now": "superseded",
  "execution_value_now": "low",
  "docs_ready_now": false,
  "reason": "new design に merged 済み",
  "review_at": "monthly_review",
  "metadata": {
    "superseded_by": "2026-04-17_design_routing_minimum_usecase"
  }
}
```

### 判定

- rule 1 `archive` に当たる
- `maturity_now = superseded`
- `metadata.superseded_by` もある

### 出力期待

```json
{
  "route_to": "archive",
  "next_action": "archive_design"
}
```

### 重要点

execution_value が仮に medium でも、
archive 判定が先なので
`operations`
には行かない。

---

## 例2: future

### 入力 candidate

```json
{
  "design_id": "phase3_knowledge_integration_design",
  "title": "knowledge integration の本格連携設計",
  "maturity_now": "maturing",
  "execution_value_now": "medium",
  "docs_ready_now": false,
  "reason": "phase later で扱うため今は deferred",
  "review_at": "monthly_review",
  "metadata": {
    "related_plans": [
      "notes/03_plan/2026-04_phase3_knowledge_integration.md"
    ]
  }
}
```

### 判定

- archive ではない
- rule 2 `future` に当たる
- `reason` に deferred / phase later 相当がある
- `related_plans` からも現 phase 外が示唆される

### 出力期待

```json
{
  "route_to": "future",
  "next_action": "create_future_design_draft"
}
```

### 重要点

execution_value_now が medium でも、
future 判定が先なので
`operations`
には行かない。

---

## 例3: docs

### 入力 candidate

```json
{
  "design_id": "design_routing_output_schema",
  "title": "design routing output schema",
  "maturity_now": "ready",
  "execution_value_now": "high",
  "docs_ready_now": true,
  "reason": "責務と出力境界が固まり docs 候補として十分",
  "review_at": "monthly_review",
  "metadata": {
    "related_docs": [
      "docs/15_notes_system.md",
      "docs/13_dev_workflow.md"
    ]
  }
}
```

### 判定

- archive ではない
- future ではない
- rule 3 `docs` に当たる
- `docs_ready_now = true`
- `maturity_now = ready`

### 出力期待

```json
{
  "route_to": "docs",
  "next_action": "prepare_docs_candidate"
}
```

### 重要点

ここでは
`execution_value_now = high`
も立っているが、
docs 判定が operations より先なので
`docs`
が優先される。

これは
**operations は docs の代替ではない**
という設計意図に一致する。

---

## 例4: operations

### 入力 candidate

```json
{
  "design_id": "design_routing_adapter_connection",
  "title": "design routing adapter 接続の最小実装方針",
  "maturity_now": "maturing",
  "execution_value_now": "high",
  "docs_ready_now": false,
  "reason": "まだ docs 昇格には早いが code に落とす価値が高い",
  "review_at": "daily_review",
  "metadata": {
    "related_docs": [
      "docs/13_dev_workflow.md"
    ]
  }
}
```

### 判定

- archive ではない
- future ではない
- docs_ready ではない
- rule 4 `operations` に当たる
- `execution_value_now = high`

### 出力期待

```json
{
  "route_to": "operations",
  "next_action": "enqueue_operations_candidate"
}
```

### 重要点

これは
「docs へ上げるには早いが、
実装・調査タスクとして rolling 比較には載せたい」
という典型例である。

---

## 例5: design retained

### 入力 candidate

```json
{
  "design_id": "design_thinking_memo_for_future_refactor",
  "title": "将来の refactor に向けた設計メモ",
  "maturity_now": "draft",
  "execution_value_now": "low",
  "docs_ready_now": false,
  "reason": "まだ境界が固まっておらず草案保持が自然",
  "review_at": "monthly_review",
  "metadata": {}
}
```

### 判定

- archive ではない
- future 判定材料も弱い
- docs_ready ではない
- execution_value も弱い
- fallback で rule 5 `design`

### 出力期待

```json
{
  "route_to": "design",
  "next_action": "keep_design"
}
```

### 重要点

最小段階では、
情報が弱い candidate は
保守的に `design`
retain へ寄せる。

---

## 優先順が効く例

### docs と operations が同時に立つ場合

例3のように

- `docs_ready_now = true`
- `execution_value_now = high`

が同時に立っても、
`docs`
が先に評価されるため
`docs`
になる。

### future と operations が同時に立つ場合

例2のように

- deferred
- `execution_value_now = medium`

が同時に立っても、
`future`
が先に評価されるため
`future`
になる。

### archive と何かが同時に立つ場合

archive は常に最優先である。

superseded なものは、
他の比較土俵に乗せない。

---

## 実装前の期待値

この最小 rule 実装に期待してよいのは次である。

- 役目終了 design を早めに除外できる
- 将来向け design を current 比較から外せる
- docs_ready なものを昇格候補として拾える
- docs には早いが実行価値があるものを operations に落とせる
- 迷うものは design retain に寄せられる

一方で、
まだ期待しすぎてはいけないこともある。

- 複数条件の高度な重みづけ
- 類似 design の自動統合
- docs_ready の高度判定
- current phase 判定の精密化

そこまではまだやらない。

---

## 判断

`routeDesignCandidates`
の最小 rule は、
5 つの典型 design candidate に対して
十分一貫した振る舞いを与えられる。

特に重要なのは、
**docs_ready と execution_value が同時に立つ場合でも docs が優先される**
ことと、
**archive / future を早めに current 比較から外せる**
ことである。

この段階でも、
design routing を code に落とす前提としては十分実用的である。

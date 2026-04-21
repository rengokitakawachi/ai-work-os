# 2026-04-17 design_routing_output_schema

## 目的

`routeDesignCandidates`
の返り値を、
`issue routing` と対称な形で固定する。

本メモは、
design routing の出力を

- `normalized_items`
- `routing_decisions`
- `action_plan`

を正規の handoff とし、
必要に応じて

- `routed_design_candidates`

を互換用の合成表現として残す形に整理するための design である。

---

## 結論

`routeDesignCandidates`
の最小出力は次とする。

- `mode`
- `normalized_items`
- `routing_decisions`
- `action_plan`
- `routed_design_candidates`

このうち、

- `normalized_items`
  = candidate の入力正規化結果

- `routing_decisions`
  = candidate ごとの routing decision

- `action_plan`
  = 後段 usecase が解釈する payload bucket

- `routed_design_candidates`
  = 互換用の合成済み表現

とする。

正規の handoff は

`normalized_items + routing_decisions + action_plan`

である。

---

## なぜこの形か

理由は 4 つある。

### 1. 判定と writer 入力を明確に分けるため

candidate ごとの正規化結果は
`normalized_items`
に置く。

candidate ごとの判定結果は
`routing_decisions`
に置く。

後段 payload の単位は
`action_plan`
に置く。

これにより、
decision 層と writer/usecase 層を分けやすい。

### 2. issue routing と揃えるため

issue routing はすでに

- `normalized_items`
- `routing_decisions`
- `action_plan`

で説明できる形へ寄っている。

design routing も同じ境界にすると、
flow-control 全体で扱いが揃う。

### 3. writer が `action_plan` 主入力であることを明確にするため

後段 usecase は
`action_plan`
を主入力にしつつ、
必要に応じて
`normalized_items`
`routing_decisions`
を参照して payload を作る。

この構造を note 側でも明示しておく方が自然である。

### 4. 既存 code 互換を残すため

すでに
`routed_design_candidates`
を読む箇所やテストがあるため、
すぐには消さない。

ただし役割は
「正規 handoff そのもの」ではなく、
「互換用の合成表現」に下げる。

---

## 最小出力全体

```json
{
  "mode": "dry_run",
  "normalized_items": [],
  "routing_decisions": [],
  "action_plan": {
    "docs_candidates": [],
    "design_retained": [],
    "future_candidates": [],
    "archive_design": [],
    "operations_candidates": [],
    "skipped": []
  },
  "routed_design_candidates": []
}
```

---

## 1. normalized_items

### 役割

writer や後段 usecase が参照できるように、
入力 candidate を正規化して保持する。

### 最小項目

各 item は少なくとも次を持つ。

- `item_id`
- `candidate_id`
- `design_id`
- `source_type`
- `source_ref`
- `title`
- `summary`
- `metadata`

### 例

```json
{
  "item_id": "2026-04-17_design_routing_minimum_usecase",
  "candidate_id": "design:2026-04-17_design_routing_minimum_usecase",
  "design_id": "2026-04-17_design_routing_minimum_usecase",
  "source_type": "design",
  "source_ref": [
    "notes/02_design/2026-04-17_design_routing_minimum_usecase.md"
  ],
  "title": "design routing minimum usecase",
  "summary": "design routing の最小 usecase を固定する",
  "metadata": {
    "related_docs": [
      "docs/15_notes_system.md"
    ]
  }
}
```

---

## 2. routing_decisions

### 役割

candidate ごとの
最新 routing decision を保持する。

ここには、
後段 payload を直接書かない。

### 最小項目

各 decision は少なくとも次を持つ。

- `item_id`
- `candidate_id`
- `design_id`
- `route_to`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `next_action`

必要なら次も持てる。

- `needs_task_generation`
- `task_draft`

### 例

```json
{
  "item_id": "2026-04-17_design_routing_minimum_usecase",
  "candidate_id": "design:2026-04-17_design_routing_minimum_usecase",
  "design_id": "2026-04-17_design_routing_minimum_usecase",
  "route_to": "design",
  "reason": "まだ docs 昇格には早く、設計草案として保持する方が自然",
  "evaluated_at": "2026-04-17T11:00:00.000Z",
  "maturity_now": "maturing",
  "execution_value_now": "medium",
  "docs_ready_now": false,
  "review_at": "monthly_review",
  "next_action": "keep_design"
}
```

---

## 3. action_plan

### 役割

routing decision を受けて、
後段 usecase が扱う payload 群を整理する。

最小キーは次とする。

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`
- `skipped`

---

## docs_candidates

### 意味

`route_to: docs`
となった design の docs 候補 payload。

### 最小項目

- `item_id`
- `candidate_id`
- `design_id`
- `title`
- `route_to`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `target_doc`
- `source_ref`
- `action_type: docs_candidate`

### ポイント

最小段階では、
docs へ直接 apply しない。

docs 候補 payload を返すだけにする。

---

## design_retained

### 意味

`route_to: design`
として残す candidate。

### 最小項目

- `item_id`
- `candidate_id`
- `design_id`
- `title`
- `route_to: design`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `action_type: keep_design`

### ポイント

keep は no-op。

routing のたびに
design file を毎回更新しない。

---

## future_candidates

### 意味

`80_future/design/`
へ送る draft payload。

### 最小項目

- `item_id`
- `candidate_id`
- `design_id`
- `title`
- `route_to: future`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `source_ref`
- `action_type: future_candidate`

---

## archive_design

### 意味

`99_archive/design/`
へ送る draft payload。

### 最小項目

- `item_id`
- `candidate_id`
- `design_id`
- `title`
- `route_to: archive`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `source_ref`
- `action_type: archive_design`

---

## operations_candidates

### 意味

operations rolling に渡す queue payload。

### 最小項目

- `item_id`
- `candidate_id`
- `design_id`
- `title`
- `route_to: operations`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `action_type: operations_candidate`
- `candidate_draft`

### candidate_draft の最小項目

- `task`
- `source_ref`
- `notes`

### ポイント

issue routing と同様に、
queue payload までに留める。

`active_operations`
を直接更新しない。

---

## skipped

### 意味

評価不能、情報不足、未対応 route などで
`action_plan` に乗せなかったもの。

### 最小項目

- `candidate_id`
- `design_id`
- `title`
- `reason`
- `write_status: skipped`

---

## 4. routed_design_candidates

### 役割

`normalized_items`
と
`routing_decisions`
を合成した互換用表現。

正規 handoff ではないが、
既存 code や確認用出力の都合で残してよい。

### 最小項目

- `candidate_id`
- `design_id`
- `item_id`
- `source_type`
- `source_ref`
- `title`
- `summary`
- `metadata`
- `route_to`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `next_action`

---

## route_to と action_plan の対応

対応は次とする。

- `docs`
  → `docs_candidates`

- `design`
  → `design_retained`

- `future`
  → `future_candidates`

- `archive`
  → `archive_design`

- `operations`
  → `operations_candidates`

---

## dry_run と apply

### dry_run

- `normalized_items` を返す
- `routing_decisions` を返す
- `action_plan` を返す
- 必要なら `routed_design_candidates` も返す
- 実 write はしない

### apply

- `normalized_items` を返す
- `routing_decisions` を返す
- `action_plan` を返す
- 後段 usecaseが future / archive の write を行いうる
- docs はなお apply しない
- operations は queue payload のまま

つまり、
output schema は同じにする。

---

## issue routing との対称性

対応関係は次である。

### issue routing

- `normalized_items`
- `routing_decisions`
- `action_plan`
- `routed_candidates`（互換用）

### design routing

- `normalized_items`
- `routing_decisions`
- `action_plan`
- `routed_design_candidates`（互換用）

bucket 名は完全同型ではないが、
十分に対称な構造にする。

---

## applyDesignRoutingActionPlan への含意

後段 usecase は少なくとも次を参照できればよい。

- `action_plan`
- `normalized_items`
- `routing_decisions`
- `source_ref`
- `mode`
- `now`

これにより、
docs candidate / future / archive / operations queue / retained の
どれでも判断理由を追える。

---

## 判断

`routeDesignCandidates`
の正規 output は、

- `mode`
- `normalized_items`
- `routing_decisions`
- `action_plan`

とするのが自然である。

そのうえで、
`routed_design_candidates`
は互換用の合成表現として残してよい。

この構造なら、
design routing の decision 層と post-routing payload 層を分けたまま、
issue routing と十分対称に扱える。

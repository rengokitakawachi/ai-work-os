# 2026-04-17 design_routing_output_schema

## 目的

`routeDesignCandidates`
の返り値を、
`issue routing` と対称な形で固定する。

本メモは、
design routing の出力を

- `routed_design_candidates`
- `action_plan`

の 2 層に分け、
後段の
`applyDesignRoutingActionPlan`
と素直につなげられるようにするための design である。

---

## 結論

`routeDesignCandidates`
の最小出力は次とする。

- `routed_design_candidates`
- `action_plan`
- `mode`

このうち、

- `routed_design_candidates`
  = candidate ごとの最新 routing decision

- `action_plan`
  = 後段で反映すべき payload の整理

とする。

これは
`issue routing` の

- `routed_candidates`
- `action_plan`

と対称にする。

---

## なぜこの形か

理由は 3 つある。

### 1. 判定と反映を分けるため

candidate ごとの最新評価は
`routed_design_candidates`
に残し、
実際にどの payload を返すかは
`action_plan`
に分ける。

### 2. dry_run と apply の形を揃えるため

`dry_run`
でも
`apply`
でも、
返り値の構造は変えない。

違うのは
後段で実 write をするかどうかだけにする。

### 3. issue routing と対称にするため

flow-control の usecase 群で、
issue だけ特別な schema にしない。

design も同じ分離にすると、
code 側の組み立てが揃う。

---

## 最小出力全体

```json
{
  "mode": "dry_run",
  "routed_design_candidates": [],
  "action_plan": {
    "docs_candidates": [],
    "design_retained": [],
    "future_candidates": [],
    "archive_design": [],
    "operations_candidates": [],
    "skipped": []
  }
}
```

---

## 1. routed_design_candidates

### 役割

candidate ごとの
最新 routing decision を保持する。

ここには、
後段 payload を直接書かない。

### 最小項目

各 candidate は少なくとも次を持つ。

- `candidate_id`
- `design_id` または `path`
- `title`
- `summary`
- `source_ref`
- `route_to`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `next_action`
- `metadata`

必要なら次も持てる。

- `derived_from_issue_id`
- `related_docs`
- `related_plans`
- `confidence`
- `superseded_by`

### 例

```json
{
  "candidate_id": "design:2026-04-17_design_routing_minimum_usecase",
  "design_id": "2026-04-17_design_routing_minimum_usecase",
  "title": "design routing minimum usecase",
  "summary": "design routing の最小 usecase を固定する",
  "source_ref": [
    "notes/02_design/2026-04-17_design_routing_minimum_usecase.md"
  ],
  "route_to": "design",
  "reason": "まだ docs 昇格には早く、設計草案として保持する方が自然",
  "evaluated_at": "2026-04-17T11:00:00.000Z",
  "maturity_now": "maturing",
  "execution_value_now": "medium",
  "docs_ready_now": false,
  "review_at": "monthly_review",
  "next_action": "keep_design",
  "metadata": {
    "derived_from_issue_id": "",
    "related_docs": [
      "docs/15_notes_system.md"
    ]
  }
}
```

---

## 2. action_plan

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
- `write_status: draft_only`

必要なら次も持てる。

- `body`
- `patch_proposal`
- `revised_text`

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

- `candidate_id`
- `design_id` or `path`
- `title`
- `route_to: design`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `action_type: keep_design`
- `write_status: no_op`

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
- `target_layer: 80_future/design`
- `suggested_file`
- `source_ref`
- `action_type: future_candidate`
- `write_status`

最小段階では
`write_status: draft_only`
でよい。

---

## archive_design

### 意味

`99_archive/design/`
へ送る draft payload。

### 最小項目

- `candidate_id`
- `design_id`
- `title`
- `route_to: archive`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `target_layer: 99_archive/design`
- `suggested_file`
- `source_ref`
- `action_type: archive_design`
- `write_status`

---

## operations_candidates

### 意味

operations rolling に渡す queue payload。

### 最小項目

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
- `write_status: draft_only`
- `candidate_draft`

### candidate_draft の最小項目

- `task`
- `source_ref`
- `notes`

必要なら次も持てる。

- `quick_win`

### ポイント

issue routing と同様に、
queue payload までに留める。

`active_operations`
を直接更新しない。

---

## skipped

### 意味

評価不能、情報不足、保留などで
`action_plan` に乗せなかったもの。

### 最小項目

- `candidate_id`
- `design_id`
- `title`
- `reason`
- `write_status: skipped`

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

- `routed_design_candidates` を返す
- `action_plan` を返す
- payload はすべて draft_only / no_op とする
- 実 write はしない

### apply

- `routed_design_candidates` を返す
- `action_plan` を返す
- 後段 usecase が
  future / archive の write を行いうる
- docs はなお apply しない
- operations は queue payload のまま

つまり、
output schema は同じにする。

---

## issue routing との対称性

対応関係は次である。

### issue routing

- `routed_candidates`
- `action_plan`
  - `design_updates`
  - `operations_candidates`
  - `future_candidates`
  - `archive_issue`
  - `keep_issue`

### design routing

- `routed_design_candidates`
- `action_plan`
  - `docs_candidates`
  - `design_retained`
  - `future_candidates`
  - `archive_design`
  - `operations_candidates`

完全同型にはしないが、
十分に対称な構造にする。

---

## applyDesignRoutingActionPlan への含意

後段 usecase は少なくとも次を参照できればよい。

- `route_to`
- `reason`
- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`
- `review_at`
- `next_action`
- `source_ref`

これにより、
docs candidate / future / archive / operations queue / retained の
どれでも判断理由を追える。

---

## 判断

`routeDesignCandidates`
の最小 output は、

- `routed_design_candidates`
- `action_plan`
- `mode`

の形にするのが自然である。

この構造なら、
design routing の decision 層と post-routing payload 層を分けたまま、
issue routing と十分対称に扱える。

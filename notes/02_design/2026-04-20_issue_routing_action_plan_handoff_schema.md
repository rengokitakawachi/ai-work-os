# 2026-04-20 issue_routing_action_plan_handoff_schema

## 目的

issue routing と document writer の間で受け渡す
`action_plan` の最小 schema を固定する。

本メモは、
routing と writing を分離したうえで、
writer が何を入力として受け取ればよいかを明確にすることを目的とする。

---

## 結論

issue routing から writer へは、
completed document ではなく
次の 3 つを受け渡す。

1.
`normalized_items`

2.
`routing_decisions`

3.
`action_plan`

writer は
`action_plan` を主入力としつつ、
必要に応じて
`normalized_items` と `routing_decisions`
を参照して payload seed を作る。

重要なのは、
issue routing では**無理に issue から振り分けなくてよい**ことである。
送付先がまだ自然でなければ、
`route_to: issue` として issue のまま残す。
その場合は `keep_items` bucket に入れ、
writer は no-op として扱う。

---

## 受け渡し構造

```text
normalized_items
+ routing_decisions
+ action_plan
→ writer
→ payload seed / dry_run result / apply result
```

---

## 1. normalized_items の最小項目

各 item は少なくとも次を持つ。

- `item_id`
- `source_type`
- `source_ref`
- `title`
- `summary`
- `description`
- `metadata`

### item_id

routing 全体で一意に扱う識別子。
issue routing では原則 `issue_id` を使う。

### source_type

入力の種類。
例:

- `issue`
- `conversation_issue`
- `future_issue`

### source_ref

元になった file や source の一覧。

### title / summary / description

writer が body seed を作るための最小本文素材。

### metadata

impact / urgency / context_refs / quick_win などの補助情報。

---

## 2. routing_decisions の最小項目

各 decision は少なくとも次を持つ。

- `item_id`
- `route_to`
- `reason`
- `evaluated_at`
- `next_action`
- `keep_open`

必要に応じて以下を持ってよい。

- `impact_now`
- `urgency_now`
- `review_at`
- `needs_split`
- `needs_merge`

### route_to

最小では次のいずれか。

- `design`
- `plan`
- `operations`
- `future`
- `archive`
- `issue`

`route_to: issue` は、
まだ自然な振り分け先がなく、
issue のまま保持する方がよいことを意味する。

### next_action

最小では次のいずれか。

- `create_or_update_design`
- `create_or_update_plan`
- `generate_operations_candidate`
- `defer_and_recheck_later`
- `archive_item`
- `keep_item_open`

---

## 3. action_plan の最小構造

action_plan は bucket 単位で持つ。

最小では次を持つ。

- `design_updates`
- `plan_updates`
- `operations_candidates`
- `future_candidates`
- `archive_items`
- `keep_items`
- `skipped`

各 bucket は action item の配列とする。

---

## action item の共通最小項目

各 action item は少なくとも次を持つ。

- `item_id`
- `action_type`
- `route_to`
- `title`
- `reason`
- `evaluated_at`
- `source_ref`
- `metadata`

必要に応じて以下を持ってよい。

- `impact_now`
- `urgency_now`
- `review_at`
- `derived_from_item_ids`

### action_type の例

- `create_or_update_design`
- `create_or_update_plan`
- `generate_operations_candidate`
- `defer_and_recheck_later`
- `archive_item`
- `keep_item_open`

---

## bucket ごとの最小要件

### design_updates

用途:
- design draft の payload seed を作る

追加で持つとよい項目:
- `design_kind`
- `suggested_slug`

### plan_updates

用途:
- plan draft または plan 更新 payload を作る

追加で持つとよい項目:
- `phase`
- `plan_theme`
- `suggested_slug`

### operations_candidates

用途:
- operations candidate queue payload を作る

追加で持つとよい項目:
- `task_draft`
- `quick_win`

重要:
- この段階では `rolling_day` を持たない
- active / next をここで決めない

### future_candidates

用途:
- future draft payload を作る

追加で持つとよい項目:
- `review_at`
- `why_deferred`

### archive_items

用途:
- archive draft payload を作る

追加で持つとよい項目:
- `archive_reason`

### keep_items

用途:
- no-op だが keep 判定を保持する
- issue のまま残すのが自然な item を保持する

最小では write を要求しない。
writer は `keep_items` を no-op として返せばよい。

### skipped

用途:
- 異常系や未対応 route を残す

---

## writer が期待する payload seed

writer は action item から、
少なくとも次の payload seed を組み立てられる必要がある。

- `target_layer`
- `suggested_file`
- `title`
- `source_ref`
- `derived_from_item_id`
- `reason`
- `body_seed`

### body_seed の最小素材

- `title`
- `source item`
- `routing decision`
- `reason`
- `evaluated_at`
- `summary or description`

---

## issue routing 文脈での対応

issue routing では、
既存の `issue_id` を `item_id` とみなしてよい。

対応は次のように置く。

- `routed_candidates`
  → `normalized_items + routing_decisions` の合成済み表現

- `buildIssueRoutingActions()` の返り値
  → `action_plan`

- `applyIssueRoutingActionPlan()`
  → writer usecase

したがって、
今後は `routed_candidates` の中に全部を詰め込み続けるよりも、
論理上は
`normalized_items`
`routing_decisions`
`action_plan`
に分けて扱う方が自然である。

また、
全 item を design / plan / operations / future / archive に押し出す必要はない。
`route_to: issue` と `keep_items` は正規の結果として扱う。

---

## 最小運用ルール

- routing は action item を返すところで止める
- writer は action item を route 判定し直さない
- operations candidate は queue payload まで
- rolling_day は rolling 後にしか付与しない
- dry_run では payload seed と suggested_file まで確認できればよい
- 送付先がまだ自然でなければ、無理に issue から出さない

---

## 判断

issue routing と writer の間は、
completed document ではなく
`normalized_items + routing_decisions + action_plan`
で受け渡す。

そのうえで、
writer の直接入力として最も重要なのは
bucket 化された `action_plan` である。

この schema を固定すれば、
routing と writing を分離しつつ、
design / plan / operations / future / archive への接続を
小さく前進させやすい。

同時に、
振り分け先がまだ自然でない item を
issue のまま保持する運用も崩さずに済む。

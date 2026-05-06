# 2026-04-18 issue_routing_recent_analysis_consolidated

## 目的

issue routing 後処理統合まわりで分散していた recent analysis を、
現時点の再利用価値に沿って 1 枚へ統合する。

対象は次の 3 本である。

- `2026-04-16_issue_routing_postprocess_current_state.md`
- `2026-04-16_issue_routing_notes_write_dry_run_expected_output.md`
- `2026-04-16_operations_queue_adapter_dry_run_expected_behavior.md`

本メモは、
元 analysis の意図を捨てずに、

- 現在地
- dry_run の期待
- queue → rolling 接続確認

を 1 枚で追えるようにすることを目的とする。

---

## 結論

issue routing 後処理統合は、
**最小 loop としてはかなり閉じている。**

現時点の主要整理は次である。

- design
  - `applyIssueRoutingActionPlan` 経由で最小 apply 済み
- operations
  - queue payload まで生成できる
  - rolling 前入力 source として接続済み
- keep_issue
  - no-op として整理済み
- future / archive
  - dry_run payload は整っている
  - 実 apply は未導入

したがって、
大きな構造未解決よりも、
薄い後段接続の残りを詰める段階に入っている。

---

## 対象 issue と最小 route 想定

`notes/01_issues/idea_log.md` の当時の主要 5 件に対する
最小想定は次だった。

### design に行くもの

- `20260409-015`
  - category: architecture
  - impact_now: high
  - route_to: `design`

### operations に行くもの

- `20260412-016`
- `20260412-017`
- `20260414-018`

共通:

- category: operations
- impact_now: high
- route_to: `operations`

### issue に残るもの

- `20260414-019`
  - category: architecture
  - impact_now: medium
  - route_to: `issue`

ここで重要なのは、
architecture issue でも
`impact_now !== high`
なら design に行かず issue に残ることである。

---

## action plan の最小像

当時の最小 expected shape は次である。

- `keep_issue`
- `design_updates`
- `operations_candidates`
- `future_candidates`
- `archive_issue`
- `skipped`

現行の理解では、主要件数イメージは次でよい。

- keep_issue: 5
- design_updates: 1
- operations_candidates: 3
- future_candidates: 0
- archive_issue: 0
- skipped: 0

この整理により、

- design へ行く issue
- operations 候補になる issue
- keep_issue no-op に残る issue

を分けて扱える。

---

## applyIssueRoutingActionPlan(dry_run) で確認すべきこと

最小 dry_run の確認点は次の 3 つである。

### 1. design は draft / apply 対象として分離される

- `20260409-015`
  - `design_writes` に入る
  - 1 issue 1 draft の最小形を持つ

### 2. operations は candidate draft までで止まる

- `20260412-016`
- `20260412-017`
- `20260414-018`

は `operations_candidate_writes` に入り、
この段階では `active_operations.md` を直接更新しない。

つまり、
正式投入は rolling に残す。

### 3. keep_issue でも評価文脈が残る

- `20260414-019`

は issue に残るが、
それでも

- `evaluated_at`
- `impact_now`
- `urgency_now`

を保持した no-op payload として扱う。

これは、
「進める issue だけ評価を持つ」のではなく、
「保留 issue にも評価文脈を残す」
という意味で重要である。

---

## queue payload の位置づけ

operations 判定されたものは、
`next_operations`
へ直接入れない。

まずは
**operations candidate queue payload**
として扱う。

最小 payload は少なくとも次を持てばよい。

- `title`
- `derived_from_issue_id`
- `reason`
- `evaluated_at`
- `impact_now`
- `urgency_now`
- `candidate_draft.task`
- `candidate_draft.source_ref`
- `candidate_draft.notes`

ここではまだ

- `rolling_day`
- `active / next / future`

を持たない。

理由:
queue は rolling 前入力だからである。

---

## queue → rolling 接続

queue payload は、
`buildOperationsQueueSourceBundle(...)`
により rolling source へ変換される。

変換後 candidate の最小像は次である。

- `title`
- `candidate_type: operations`
- `source_ref`
- `importance`
- `urgency`
- `why_now`
- `metadata.generated_from: issue_routing_queue`
- `metadata.generated_from_issue_id`
- `metadata.evaluated_at`
- `metadata.notes`

ここで重要なのは、
queue payload が
既存 rolling pipeline にそのまま流せることである。

---

## rolling 側に残すべき判断

queue payload が operations 判定だったとしても、
rolling 後の置き場はまだ未確定である。

ありうるのは次である。

- active に食い込む
- next に入る
- future に落ちる

つまり、

- issue routing は operations 候補化まで
- rolling は配置確定

という責務分離を維持する。

これは current spec と一致している。

---

## 現時点で完了していること

- 可変評価 schema の end-to-end 接続
- `applyIssueRoutingActionPlan` の最小 usecase 化
- design_updates の最小 apply
- operations candidate queue の概念固定
- queue → rolling adapter の実装
- dry_run payload の expected shape 明確化

---

## まだ未了のこと

- future / archive の apply
- queue payload を使った repo 実体 dry run の実確認
- review 地点での routing decision 再評価接続
- design draft の高度 merge

---

## 現時点の評価

issue routing 後処理統合は、
設計検討段階を越えて、
部分的に実装接続まで進んでいる。

今後の重点は次である。

1.
queue payload を使った rolling 実確認

2.
future / archive apply の要否判断

3.
review 接続の後段整理

---

## archive した元ファイル

今回の統合により、
次の originals は archive に移した。

- `notes/99_archive/analysis/2026-04-16_issue_routing_postprocess_current_state.md`
- `notes/99_archive/analysis/2026-04-16_issue_routing_notes_write_dry_run_expected_output.md`
- `notes/99_archive/analysis/2026-04-16_operations_queue_adapter_dry_run_expected_behavior.md`

現役参照は、
まずこの consolidated note を見ればよい。

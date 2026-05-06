# 2026-04-18 design_routing_background_consolidated

## reference map

### consolidated_from

- `notes/02_design/2026-04-17_design_routing_minimum_dry_run_implementation_plan.md`
- `notes/02_design/2026-04-17_design_routing_js_minimum_skeleton.md`
- `notes/02_design/2026-04-17_design_routing_rules_js_minimum_skeleton.md`
- `notes/02_design/2026-04-17_design_routing_actions_js_minimum_skeleton.md`
- `notes/08_analysis/2026-04-17_route_design_candidates_minimum_rule_examples.md`

### current_primary_refs

- `notes/02_design/2026-04-17_design_routing_minimum_usecase.md`
- `notes/02_design/2026-04-17_design_routing_output_schema.md`
- `notes/02_design/2026-04-17_apply_design_routing_action_plan_minimum_usecase.md`
- `notes/08_analysis/2026-04-18_design_routing_background_consolidated.md`

### archive_destination

- `notes/99_archive/design/2026-04-17_design_routing_minimum_dry_run_implementation_plan.md`
- `notes/99_archive/design/2026-04-17_design_routing_js_minimum_skeleton.md`
- `notes/99_archive/design/2026-04-17_design_routing_rules_js_minimum_skeleton.md`
- `notes/99_archive/design/2026-04-17_design_routing_actions_js_minimum_skeleton.md`
- `notes/99_archive/analysis/2026-04-17_route_design_candidates_minimum_rule_examples.md`

---

## 目的

design routing の実装前後で分散していた
implementation draft / skeleton / rule example を、
現時点の再利用価値に沿って 1 枚へ統合する。

本メモは、
現在も有効な背景知識を残しつつ、

- 最小実装到達点
- orchestration の骨格
- rule 判定順
- action_plan 生成の責務
- rule example の読み方

を 1 枚で追えるようにすることを目的とする。

---

## 結論

design routing は、
すでに core design が固まっている。

現時点の中心は次である。

- `routeDesignCandidates`
  - decision 層
- `applyDesignRoutingActionPlan`
  - post-routing payload 層
- route
  - `docs / design / future / archive / operations`

したがって、
implementation plan や js skeleton 群は
現役仕様そのものではなく、
**現在の code / design へ至る背景資料**
として読む位置づけになっている。

---

## 最小実装到達点

実装前に固定していた最小到達点は次だった。

```text
routeDesignCandidates(...) を dry_run で呼ぶと
- mode
- routed_design_candidates
- action_plan
が返る
```

この時点で重要だったのは、
write を進めることではなく、

- decision 層
- action_plan 層

が code 上で返ることだった。

reference:
- source: `notes/02_design/2026-04-17_design_routing_minimum_dry_run_implementation_plan.md`
- current_primary_refs:
  - `notes/02_design/2026-04-17_design_routing_minimum_usecase.md`
  - `notes/02_design/2026-04-17_design_routing_output_schema.md`

---

## orchestration の骨格

`design-routing.js` skeleton で固定していた骨格は次である。

```text
collectCandidates
→ normalizeCandidates
→ buildDesignRoutingEvaluations
→ buildDesignRoutingDecision
→ groupDesignRoutingDecisions
→ buildDesignRoutingActionPlan
→ return
```

ここでの要点は次である。

- issue routing と対称な形に寄せる
- routing decision と action plan を分ける
- dry_run を先に安定させる

この骨格は、
現在の code 実装へほぼ吸収された。

reference:
- source: `notes/02_design/2026-04-17_design_routing_js_minimum_skeleton.md`
- current_primary_refs:
  - `notes/02_design/2026-04-17_design_routing_minimum_usecase.md`
  - `notes/02_design/2026-04-17_design_routing_output_schema.md`

---

## rule 判定順の背景

rule skeleton と example 群で固定していた主軸は次である。

```text
archive
→ future
→ docs
→ operations
→ design
```

ここで重要なのは、
**複数条件が立っても先にある rule が優先される**
ことである。

典型例:

- `docs_ready_now = true`
  かつ
  `execution_value_now = high`
  でも `docs` が優先

- deferred かつ execution value があっても `future` が優先

- superseded なものは常に `archive` が最優先

これは、
operations が docs の代替ではないこと、
archive / future を current 比較土俵から早めに外すこと、
を明確にするためだった。

reference:
- source:
  - `notes/02_design/2026-04-17_design_routing_rules_js_minimum_skeleton.md`
  - `notes/08_analysis/2026-04-17_route_design_candidates_minimum_rule_examples.md`
- current_primary_refs:
  - `notes/02_design/2026-04-17_design_routing_minimum_usecase.md`
  - `notes/02_design/2026-04-17_design_routing_output_schema.md`

---

## action_plan 生成の背景

`design-routing-actions.js` skeleton で固定していた責務は、
route 判定ではなく
**grouped decision を action_plan payload へ薄く変換すること**
だった。

主な key は次である。

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`
- `skipped`

ここでの重要点は次である。

- `design_retained` は no-op
- `docs` は candidate 化まで
- `operations` は queue payload まで
- `future / archive` は後段 draft / write の元 payload

この考え方は、
現在の `applyDesignRoutingActionPlan` 設計に吸収されている。

reference:
- source: `notes/02_design/2026-04-17_design_routing_actions_js_minimum_skeleton.md`
- current_primary_refs:
  - `notes/02_design/2026-04-17_design_routing_output_schema.md`
  - `notes/02_design/2026-04-17_apply_design_routing_action_plan_minimum_usecase.md`

---

## いま再利用価値が高い知見

### 1. design routing は issue routing と同様に二段分離する

- decision
- post-routing payload

### 2. docs は候補化までで止める

最小段階では docs を直接 mutate しない。

### 3. design retained は no-op でよい

routing のたびに design file を毎回更新しない。

### 4. operations は queue payload までで止める

`active_operations` を直接更新しない。

### 5. rule 順は意味を持つ

`archive → future → docs → operations → design`
の順を崩すと責務境界が曖昧になりやすい。

---

## いま背景化してよいもの

今回統合した originals は、
次の理由で背景資料へ寄せてよい。

### implementation plan

- 到達点は現在の code / design に吸収済み
- 反映順そのものは現役仕様ではない

### js skeleton 群

- export / helper / return shape の初期案として有用
- ただし現役参照は code と core design で足りる

### minimum rule examples

- rule の意図確認には有用
- ただし現役仕様は core design にある

---

## archive した元ファイル

今回の統合により、
次の originals は archive に移した。

- `notes/99_archive/design/2026-04-17_design_routing_minimum_dry_run_implementation_plan.md`
- `notes/99_archive/design/2026-04-17_design_routing_js_minimum_skeleton.md`
- `notes/99_archive/design/2026-04-17_design_routing_rules_js_minimum_skeleton.md`
- `notes/99_archive/design/2026-04-17_design_routing_actions_js_minimum_skeleton.md`
- `notes/99_archive/analysis/2026-04-17_route_design_candidates_minimum_rule_examples.md`

現役参照は、
まず core design 3本とこの consolidated note を見ればよい。

---

## 現時点の判断

design routing 周辺は、
仕様の骨格よりも
背景ファイルの分散整理が主要課題になっている。

したがって現段階では、

- core design は現役のまま残し
- 実装前の draft / skeleton / example は background として archive へ退避し
- 現役参照を core design + consolidated note に寄せる

のが自然である。

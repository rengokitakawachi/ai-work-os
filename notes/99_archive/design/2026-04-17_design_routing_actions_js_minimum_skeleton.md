# 2026-04-17 design_routing_actions_js_minimum_skeleton

## 目的

`design-routing-actions.js`
の最小 code skeleton を固定する。

本メモは、
`groupDesignRoutingDecisions(...)`
で grouped された routed design candidates を、

- `docs_candidates`
- `design_retained`
- `future_candidates`
- `archive_design`
- `operations_candidates`
- `skipped`

へ変換する最小 helper 群を、
code-ready な形で安定させるための design である。

---

## 結論

最小 skeleton は次でよい。

```js
import {
  compactObject,
  ensureObject,
  ensureString,
  ensureStringArray,
} from './common.js';

function buildDocsCandidate(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'docs',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    target_doc: ensureString(candidate?.metadata?.target_doc),
    source_ref: ensureStringArray(candidate?.source_ref),
    action_type: 'docs_candidate',
    write_status: 'draft_only',
  });
}

function buildDesignRetained(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'design',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    action_type: 'keep_design',
    write_status: 'no_op',
  });
}

function buildFutureCandidate(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'future',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    review_at: ensureString(candidate?.review_at),
    target_layer: '80_future/design',
    source_ref: ensureStringArray(candidate?.source_ref),
    action_type: 'future_candidate',
    write_status: 'draft_only',
  });
}

function buildArchiveDesign(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'archive',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    target_layer: '99_archive/design',
    source_ref: ensureStringArray(candidate?.source_ref),
    action_type: 'archive_design',
    write_status: 'draft_only',
  });
}

function buildOperationsCandidate(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'operations',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    action_type: 'operations_candidate',
    write_status: 'draft_only',
    candidate_draft:
      ensureObject(candidate?.task_draft) || {
        task: ensureString(candidate?.title),
        source_ref: ensureStringArray(candidate?.source_ref),
        notes: [`generated_from_design:${ensureString(candidate?.candidate_id)}`],
      },
  });
}

function buildSkipped(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    reason: ensureString(candidate?.reason),
    write_status: 'skipped',
  });
}

export function buildDesignRoutingActionPlan(grouped = {}) {
  const safeGrouped = ensureObject(grouped);

  return {
    docs_candidates: (Array.isArray(safeGrouped.docs) ? safeGrouped.docs : []).map(
      (candidate) => buildDocsCandidate(candidate)
    ),
    design_retained: (
      Array.isArray(safeGrouped.design) ? safeGrouped.design : []
    ).map((candidate) => buildDesignRetained(candidate)),
    future_candidates: (
      Array.isArray(safeGrouped.future) ? safeGrouped.future : []
    ).map((candidate) => buildFutureCandidate(candidate)),
    archive_design: (
      Array.isArray(safeGrouped.archive) ? safeGrouped.archive : []
    ).map((candidate) => buildArchiveDesign(candidate)),
    operations_candidates: (
      Array.isArray(safeGrouped.operations) ? safeGrouped.operations : []
    ).map((candidate) => buildOperationsCandidate(candidate)),
    skipped: (Array.isArray(safeGrouped.skipped) ? safeGrouped.skipped : []).map(
      (candidate) => buildSkipped(candidate)
    ),
  };
}
```

---

## なぜこの skeleton か

理由は 3 つある。

### 1. grouped → action_plan の責務を薄く保てるから

この file は、
route 判定をしない。

すでに route が決まった candidate を、
所定の payload へ変換するだけに留める。

### 2. docs / design / future / archive / operations を対称に扱えるから

各 route ごとに 1 helper を持つと、

- 何を残すか
- 何を落とすか
- write_status を何にするか

が明瞭になる。

### 3. apply usecase と自然に接続できるから

後段の
`applyDesignRoutingActionPlan`
は、
この action plan を受けて

- docs candidate write
- retained no-op
- future draft write
- archive draft write
- operations queue payload

へ変換できる。

---

## helper ごとの責務

### buildDocsCandidate

- `route_to: docs`
- docs candidate payload を作る
- 最小では `draft_only`

### buildDesignRetained

- `route_to: design`
- retained no-op を作る

### buildFutureCandidate

- `route_to: future`
- future/design draft の元 payload を作る

### buildArchiveDesign

- `route_to: archive`
- archive/design draft の元 payload を作る

### buildOperationsCandidate

- `route_to: operations`
- operations queue payload を作る
- `task_draft` が無ければ最小 draft を補う

### buildSkipped

- route 不明や変換不能を保持する

---

## 最小段階でやらないこと

- suggested_file の生成
- future / archive body の生成
- docs patch proposal の自動生成
- retained design の write
- operations queue への apply
- quick_win の詳細反映

これらは
`applyDesignRoutingActionPlan`
側で扱う。

---

## 初手で確認したいこと

1.
5 route の grouped から
正しい action_plan key に入るか

2.
`design_retained`
だけ `write_status: no_op` になるか

3.
`operations_candidates`
で `candidate_draft` が最低限埋まるか

4.
空 grouped で空 action_plan が返るか

---

## 判断

`design-routing-actions.js`
の最小実装は、

- route ごとの build helper
- `buildDesignRoutingActionPlan`

の形で始めるのが自然である。

この形なら、
grouped decision を action_plan へ薄く変換しつつ、
後段 apply usecase とも素直につなげられる。

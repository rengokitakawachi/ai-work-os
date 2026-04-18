# 2026-04-17 design_routing_rules_js_minimum_skeleton

## 目的

`design-routing-rules.js`
の最小 code skeleton を固定する。

本メモは、
`archive → future → docs → operations → design`
の判定順と、
その返り値 shape を
code-ready な形で安定させるための design である。

---

## 結論

最小 skeleton は次でよい。

```js
import { ensureObject, ensureString } from './common.js';

function resolveMaturityNow(candidate = {}) {
  return ensureString(
    candidate?.assessment?.maturity_now ||
      candidate?.metadata?.default_maturity
  ).toLowerCase();
}

function resolveExecutionValueNow(candidate = {}) {
  return ensureString(
    candidate?.assessment?.execution_value_now ||
      candidate?.metadata?.default_execution_value
  ).toLowerCase();
}

function resolveDocsReadyNow(candidate = {}) {
  const rawValue =
    candidate?.assessment?.docs_ready_now ??
    candidate?.metadata?.docs_ready_now ??
    false;

  return rawValue === true;
}

function resolveReason(candidate = {}) {
  return ensureString(candidate?.assessment?.reason || candidate?.summary);
}

function resolveReviewAt(candidate = {}) {
  return ensureString(candidate?.assessment?.review_at).toLowerCase();
}

function buildDecisionMeta(candidate = {}) {
  return {
    evaluated_at: new Date().toISOString(),
    maturity_now: resolveMaturityNow(candidate),
    execution_value_now: resolveExecutionValueNow(candidate),
    docs_ready_now: resolveDocsReadyNow(candidate),
  };
}

function matchesArchiveRule(candidate = {}) {
  const metadata = ensureObject(candidate?.metadata);
  const maturityNow = resolveMaturityNow(candidate);
  const reason = resolveReason(candidate).toLowerCase();

  return (
    maturityNow === 'superseded' ||
    reason.includes('obsolete') ||
    reason.includes('duplicate') ||
    reason.includes('merged') ||
    reason.includes('superseded') ||
    Boolean(ensureString(metadata?.superseded_by))
  );
}

function matchesFutureRule(candidate = {}, context = {}) {
  const metadata = ensureObject(candidate?.metadata);
  const reason = resolveReason(candidate).toLowerCase();
  const reviewAt = resolveReviewAt(candidate);
  const phase = ensureString(context?.phase);
  const relatedPlans = Array.isArray(metadata?.related_plans)
    ? metadata.related_plans
    : [];

  return (
    reviewAt === 'weekly_review' ||
    reviewAt === 'monthly_review' ||
    reason.includes('later') ||
    reason.includes('future') ||
    reason.includes('deferred') ||
    reason.includes('phase later') ||
    (phase && relatedPlans.some((item) => !ensureString(item).includes(phase)))
  );
}

function matchesDocsRule(candidate = {}) {
  return resolveDocsReadyNow(candidate) && resolveMaturityNow(candidate) === 'ready';
}

function matchesOperationsRule(candidate = {}) {
  const executionValueNow = resolveExecutionValueNow(candidate);
  return executionValueNow === 'high' || executionValueNow === 'medium';
}

export function evaluateDesignCandidate(candidate = {}, context = {}) {
  const candidateId = ensureString(candidate?.candidate_id);
  const decisionMeta = buildDecisionMeta(candidate);

  if (matchesArchiveRule(candidate)) {
    return {
      candidate_id: candidateId,
      route_to: 'archive',
      reason: '役目終了 design のため archive に送る',
      review_at: 'monthly_review',
      next_action: 'archive_design',
      needs_task_generation: false,
      ...decisionMeta,
    };
  }

  if (matchesFutureRule(candidate, context)) {
    return {
      candidate_id: candidateId,
      route_to: 'future',
      reason: '今は扱わない design のため future に送る',
      review_at: 'monthly_review',
      next_action: 'create_future_design_draft',
      needs_task_generation: false,
      ...decisionMeta,
    };
  }

  if (matchesDocsRule(candidate)) {
    return {
      candidate_id: candidateId,
      route_to: 'docs',
      reason: 'docs 昇格条件を満たすため docs 候補にする',
      review_at: 'monthly_review',
      next_action: 'prepare_docs_candidate',
      needs_task_generation: false,
      ...decisionMeta,
    };
  }

  if (matchesOperationsRule(candidate)) {
    return {
      candidate_id: candidateId,
      route_to: 'operations',
      reason: '実行候補価値があるため operations 比較対象へ送る',
      review_at: 'daily_review',
      next_action: 'enqueue_operations_candidate',
      needs_task_generation: true,
      ...decisionMeta,
    };
  }

  return {
    candidate_id: candidateId,
    route_to: 'design',
    reason: 'まだ草案段階のため design に残す',
    review_at: 'monthly_review',
    next_action: 'keep_design',
    needs_task_generation: false,
    ...decisionMeta,
  };
}

export function buildDesignRoutingEvaluations(candidates = [], context = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return [];
  }

  return candidates.map((candidate) => evaluateDesignCandidate(candidate, context));
}
```

---

## なぜこの skeleton か

理由は 3 つある。

### 1. 判定順がコード上で明示されるから

`if archive`
→ `if future`
→ `if docs`
→ `if operations`
→ fallback `design`

の順をそのままコードに置くと、
設計意図が読みやすい。

### 2. helper を小さく分けられるから

- `resolveMaturityNow`
- `resolveExecutionValueNow`
- `resolveDocsReadyNow`
- `matchesArchiveRule`
- `matchesFutureRule`
- `matchesDocsRule`
- `matchesOperationsRule`

に分けることで、
rule ごとの変更を局所化できる。

### 3. decision shape を先に固定できるから

`evaluateDesignCandidate`
の返り値を固定しておくと、
`design-routing.js`
側は merge に集中できる。

---

## helper の役割

### resolve* 系

- assessment → metadata → fallback
  の順で値を引く
- 値の正規化を担当する

### matches*Rule 系

- 各 route の条件判定だけを担当する
- 返り値は boolean に限定する

### buildDecisionMeta

- `evaluated_at`
- `maturity_now`
- `execution_value_now`
- `docs_ready_now`

をまとめて付与する。

---

## 最小段階でやらないこと

- 高度な docs_ready 推定
- phase 判定の厳密化
- score による比較
- reason の自動生成高度化
- duplicate 判定の高度化
- decision 履歴保存

まずは、
優先順 if-rule で一貫して route が返ることを優先する。

---

## 初手で確認したいこと

1.
`evaluateDesignCandidate`
単体で 5 route を返し分けられるか

2.
`docs_ready_now = true`
かつ
`execution_value_now = high`
で `docs` が返るか

3.
`maturity_now = superseded`
で必ず `archive` が返るか

4.
空入力や未設定が多い candidate で fallback `design` になるか

---

## 判断

`design-routing-rules.js`
の最小実装は、

- resolve helper
- matches rule helper
- `evaluateDesignCandidate`
- `buildDesignRoutingEvaluations`

の形で始めるのが自然である。

この形なら、
判定順と decision shape を崩さずに、
最小 dry_run 実装へ進める。

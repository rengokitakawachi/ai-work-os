# 2026-04-17 design_routing_js_minimum_skeleton

## 目的

`design-routing.js`
の最小 code skeleton を固定する。

本メモは、
実装前に

- 何を export するか
- どの helper を内部に持つか
- どの順で呼ぶか
- 何を返すか

を先に安定させるための design である。

---

## 結論

最小 skeleton は、
現行 `issue-routing.js`
に寄せた次の形でよい。

```js
import { ensureString } from './common.js';
import { collectCandidates } from './candidate.js';
import { normalizeCandidates } from './normalize.js';
import { buildDesignRoutingEvaluations } from './design-routing-rules.js';
import { buildDesignRoutingActionPlan } from './design-routing-actions.js';
import { buildDesignRoutingSourceBundle } from './adapters.js';

function groupDesignRoutingDecisions(decisions = []) {
  const grouped = {
    docs: [],
    design: [],
    future: [],
    archive: [],
    operations: [],
    skipped: [],
  };

  for (const decision of decisions) {
    const routeTo = ensureString(decision?.route_to);

    if (routeTo === 'docs') {
      grouped.docs.push(decision);
      continue;
    }

    if (routeTo === 'design') {
      grouped.design.push(decision);
      continue;
    }

    if (routeTo === 'future') {
      grouped.future.push(decision);
      continue;
    }

    if (routeTo === 'archive') {
      grouped.archive.push(decision);
      continue;
    }

    if (routeTo === 'operations') {
      grouped.operations.push(decision);
      continue;
    }

    grouped.skipped.push(decision);
  }

  return grouped;
}

function buildDesignRoutingDecision(candidate = {}, evaluation = {}) {
  return {
    ...candidate,
    ...evaluation,
  };
}

export function routeDesignCandidates({
  sourceBundles = [],
  mode = 'dry_run',
  phase = '',
} = {}) {
  const rawCandidates = collectCandidates(sourceBundles);
  const normalizedCandidates = normalizeCandidates(rawCandidates);
  const evaluations = buildDesignRoutingEvaluations(normalizedCandidates, {
    phase,
    mode,
  });

  const evaluationMap = new Map(
    evaluations.map((evaluation) => [evaluation.candidate_id, evaluation])
  );

  const routedDesignCandidates = normalizedCandidates.map((candidate) =>
    buildDesignRoutingDecision(
      candidate,
      evaluationMap.get(candidate.candidate_id) || {}
    )
  );

  const grouped = groupDesignRoutingDecisions(routedDesignCandidates);
  const actionPlan = buildDesignRoutingActionPlan(grouped);

  return {
    mode: ensureString(mode) || 'dry_run',
    routed_design_candidates: routedDesignCandidates,
    action_plan: actionPlan,
  };
}

export function routeSingleDesignCandidate({
  item = {},
  sourceRef = [],
  mode = 'dry_run',
  phase = '',
} = {}) {
  return routeDesignCandidates({
    mode,
    phase,
    sourceBundles: [
      {
        source_type: 'design',
        source_ref: Array.isArray(sourceRef) ? sourceRef : [],
        items: [item],
      },
    ],
  });
}

export function routeDesignNotes({
  designContent = '',
  designSourceRef = '',
  mode = 'dry_run',
  phase = '',
} = {}) {
  const sourceBundle = buildDesignRoutingSourceBundle({
    content: designContent,
    sourceRef: designSourceRef,
  });

  return routeDesignCandidates({
    mode,
    phase,
    sourceBundles: [sourceBundle],
  });
}
```

---

## なぜこの skeleton か

理由は 3 つある。

### 1. issue routing と対称にしやすいから

現行 `issue-routing.js`
は、

- collect
- normalize
- evaluate
- decision merge

の流れを持っている。

design routing も同じ流れに乗せると、
実装差分が読みやすい。

### 2. rule と action plan を外出しできるから

最初から全部を
`design-routing.js`
へ押し込まず、

- `design-routing-rules.js`
- `design-routing-actions.js`

へ分ける前提にすると、
rule と payload 生成を独立して育てやすい。

### 3. dry_run を先に固定しやすいから

この skeleton なら、
まずは

- `routed_design_candidates`
- `action_plan`

を返す dry_run を成立させ、
後で apply usecase を足せる。

---

## 役割分担

### design-routing.js

責務

- entry point
- orchestration
- candidate → decision → grouped → action_plan の接続

### design-routing-rules.js

責務

- `archive → future → docs → operations → design`
  の順で route 判定する
- `evaluateDesignCandidate`
- `buildDesignRoutingEvaluations`

### design-routing-actions.js

責務

- grouped decision を
  `docs_candidates / design_retained / future_candidates / archive_design / operations_candidates / skipped`
  へ変換する

### adapters.js

責務

- notes/02_design の content から design source bundle を作る

---

## 最初の未実装でよい箇所

最小段階では、
以下は stub でもよい。

### 1. buildDesignRoutingSourceBundle

最初は design note 1件をそのまま item にするだけでもよい。

### 2. buildDesignRoutingEvaluations

最初は 5 route rule を if 順で返せばよい。

### 3. buildDesignRoutingActionPlan

最初は grouped をそのまま action_plan へ写すだけでもよい。

---

## 初手で確認したいこと

この skeleton を code に入れたら、
まず確認したいのは次である。

1.
単一 design candidate で
`route_to`
が返るか

2.
5 route の grouped が崩れないか

3.
`mode / routed_design_candidates / action_plan`
の shape が設計どおりか

4.
issue routing と import / return pattern が大きくズレていないか

---

## 判断

`design-routing.js`
の最小実装は、
巨大関数ではなく
この skeleton から始めるのが自然である。

この形なら、
先に decision 層だけを成立させ、
後から action plan と apply usecase を足しやすい。

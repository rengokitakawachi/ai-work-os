import { ensureObject, ensureString } from './common.js';
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

function buildDesignTaskDraft(candidate = {}, evaluation = {}) {
  if (!evaluation?.needs_task_generation) {
    return null;
  }

  return {
    task: ensureString(candidate?.title),
    source_ref: Array.isArray(candidate?.source_ref) ? candidate.source_ref : [],
    notes: [
      `generated_from_design:${ensureString(candidate?.candidate_id)}`,
      `route_to:${ensureString(evaluation?.route_to)}`,
    ],
  };
}

function buildNormalizedDesignItem(candidate = {}) {
  const metadata = ensureObject(candidate?.metadata);

  return {
    item_id:
      ensureString(candidate?.design_id) ||
      ensureString(candidate?.path) ||
      ensureString(candidate?.candidate_id),
    candidate_id: ensureString(candidate?.candidate_id),
    design_id:
      ensureString(candidate?.design_id) ||
      ensureString(candidate?.path) ||
      ensureString(candidate?.candidate_id),
    source_type: ensureString(candidate?.source_type) || 'design',
    source_ref: Array.isArray(candidate?.source_ref) ? candidate.source_ref : [],
    title: ensureString(candidate?.title),
    summary: ensureString(candidate?.summary),
    metadata,
  };
}

function buildDesignRoutingDecision(normalizedItem = {}, evaluation = {}) {
  const taskDraft = buildDesignTaskDraft(normalizedItem, evaluation);

  return {
    item_id:
      ensureString(normalizedItem?.item_id) ||
      ensureString(normalizedItem?.candidate_id),
    candidate_id:
      ensureString(normalizedItem?.candidate_id) ||
      ensureString(evaluation?.candidate_id),
    design_id: ensureString(normalizedItem?.design_id),
    route_to: ensureString(evaluation?.route_to),
    reason: ensureString(evaluation?.reason),
    evaluated_at: ensureString(evaluation?.evaluated_at),
    maturity_now: ensureString(evaluation?.maturity_now),
    execution_value_now: ensureString(evaluation?.execution_value_now),
    docs_ready_now: Boolean(evaluation?.docs_ready_now),
    review_at: ensureString(evaluation?.review_at),
    next_action: ensureString(evaluation?.next_action),
    needs_task_generation: Boolean(evaluation?.needs_task_generation),
    ...(taskDraft ? { task_draft: taskDraft } : {}),
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

  const normalizedItems = normalizedCandidates.map((candidate) =>
    buildNormalizedDesignItem(candidate)
  );

  const routingDecisions = normalizedItems.map((item) =>
    buildDesignRoutingDecision(
      item,
      evaluationMap.get(ensureString(item?.candidate_id)) || {}
    )
  );

  const grouped = groupDesignRoutingDecisions(routingDecisions);
  const actionPlan = buildDesignRoutingActionPlan({
    normalizedItems,
    routingDecisions,
  });

  return {
    mode: ensureString(mode) || 'dry_run',
    normalized_items: normalizedItems,
    routing_decisions: routingDecisions,
    action_plan: actionPlan,
    grouped,
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

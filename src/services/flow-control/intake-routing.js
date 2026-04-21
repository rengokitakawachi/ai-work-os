import { ensureObject, ensureString } from './common.js';
import {
  collectCandidates,
  normalizeCandidates,
  evaluateCandidates,
  buildPlacementDecisions,
} from './index.js';

function groupRoutingDecisions(decisions = []) {
  const grouped = {
    operations: [],
    design: [],
    future: [],
    archive: [],
    issue: [],
    skipped: [],
  };

  for (const decision of decisions) {
    const routeTo = ensureString(decision?.route_to);

    if (routeTo === 'operations') {
      grouped.operations.push(decision);
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

    if (routeTo === 'issue') {
      grouped.issue.push(decision);
      continue;
    }

    grouped.skipped.push(decision);
  }

  return grouped;
}

function buildNormalizedIntakeItem(candidate = {}) {
  const metadata = ensureObject(candidate?.metadata);

  return {
    item_id:
      ensureString(metadata?.issue_id) ||
      ensureString(metadata?.design_id) ||
      ensureString(candidate?.candidate_id),
    candidate_id: ensureString(candidate?.candidate_id),
    source_type: ensureString(candidate?.source_type),
    source_ref: Array.isArray(candidate?.source_ref) ? candidate.source_ref : [],
    title: ensureString(candidate?.title),
    summary: ensureString(candidate?.summary),
    description:
      ensureString(metadata?.description) || ensureString(candidate?.summary),
    metadata,
  };
}

function buildIntakeRoutingDecision(normalizedItem = {}, decision = {}) {
  return {
    item_id:
      ensureString(normalizedItem?.item_id) || ensureString(decision?.candidate_id),
    candidate_id:
      ensureString(normalizedItem?.candidate_id) ||
      ensureString(decision?.candidate_id),
    route_to: ensureString(decision?.route_to),
    reason: ensureString(decision?.reason),
    evaluated_at: ensureString(decision?.evaluated_at),
    review_at: ensureString(decision?.review_at),
    impact_now: ensureString(decision?.impact_now),
    urgency_now: ensureString(decision?.urgency_now),
    needs_task_generation: Boolean(decision?.needs_task_generation),
    ...(decision?.task_draft ? { task_draft: decision.task_draft } : {}),
  };
}

function buildRoutedCandidate(normalizedItem = {}, routingDecision = {}) {
  return {
    candidate_id:
      ensureString(normalizedItem?.candidate_id) ||
      ensureString(routingDecision?.candidate_id),
    item_id: ensureString(normalizedItem?.item_id),
    source_type: ensureString(normalizedItem?.source_type),
    source_ref: Array.isArray(normalizedItem?.source_ref)
      ? normalizedItem.source_ref
      : [],
    title: ensureString(normalizedItem?.title),
    summary: ensureString(normalizedItem?.summary),
    description: ensureString(normalizedItem?.description),
    metadata: ensureObject(normalizedItem?.metadata),
    route_to: ensureString(routingDecision?.route_to),
    reason: ensureString(routingDecision?.reason),
    evaluated_at: ensureString(routingDecision?.evaluated_at),
    review_at: ensureString(routingDecision?.review_at),
    impact_now: ensureString(routingDecision?.impact_now),
    urgency_now: ensureString(routingDecision?.urgency_now),
    needs_task_generation: Boolean(routingDecision?.needs_task_generation),
    ...(routingDecision?.task_draft ? { task_draft: routingDecision.task_draft } : {}),
  };
}

export function routeIntakeCandidates({ sourceBundles = [], phase = '' } = {}) {
  const rawCandidates = collectCandidates(sourceBundles);
  const normalizedCandidates = normalizeCandidates(rawCandidates);
  const evaluations = evaluateCandidates(normalizedCandidates, {
    phase,
    mode: 'intake_routing',
  });
  const placementDecisions = buildPlacementDecisions(
    normalizedCandidates,
    evaluations
  );

  const decisionMap = new Map(
    placementDecisions.map((decision) => [decision.candidate_id, decision])
  );

  const normalizedItems = normalizedCandidates.map((candidate) =>
    buildNormalizedIntakeItem(candidate)
  );

  const routingDecisions = normalizedItems.map((item) =>
    buildIntakeRoutingDecision(
      item,
      decisionMap.get(ensureString(item?.candidate_id)) || {}
    )
  );

  const routedCandidates = normalizedItems.map((item, index) =>
    buildRoutedCandidate(item, routingDecisions[index] || {})
  );

  return {
    mode: 'dry_run',
    normalized_items: normalizedItems,
    routing_decisions: routingDecisions,
    routed_candidates: routedCandidates,
    grouped: groupRoutingDecisions(routingDecisions),
  };
}

export function routeSingleIntakeCandidate({
  item = {},
  sourceType = 'conversation',
  sourceRef = [],
  phase = '',
} = {}) {
  return routeIntakeCandidates({
    phase,
    sourceBundles: [
      {
        source_type: sourceType,
        source_ref: Array.isArray(sourceRef) ? sourceRef : [],
        items: [item],
      },
    ],
  });
}

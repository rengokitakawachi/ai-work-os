import {
  compactObject,
  ensureObject,
  ensureString,
  ensureStringArray,
} from './common.js';

function createLookupMap(items = [], keyName = '') {
  return new Map(
    (Array.isArray(items) ? items : [])
      .map((item) => [ensureString(item?.[keyName]), item])
      .filter(([key]) => key)
  );
}

function toDesignActionItem(normalizedItem = {}, routingDecision = {}, actionType = '') {
  const metadata = ensureObject(normalizedItem?.metadata);

  return compactObject({
    item_id:
      ensureString(normalizedItem?.item_id) || ensureString(routingDecision?.item_id),
    candidate_id:
      ensureString(normalizedItem?.candidate_id) ||
      ensureString(routingDecision?.candidate_id),
    design_id:
      ensureString(normalizedItem?.design_id) ||
      ensureString(metadata?.design_id) ||
      ensureString(routingDecision?.design_id),
    title: ensureString(normalizedItem?.title),
    summary: ensureString(normalizedItem?.summary),
    route_to: ensureString(routingDecision?.route_to),
    reason: ensureString(routingDecision?.reason),
    evaluated_at: ensureString(routingDecision?.evaluated_at),
    maturity_now: ensureString(routingDecision?.maturity_now),
    execution_value_now: ensureString(routingDecision?.execution_value_now),
    docs_ready_now: Boolean(routingDecision?.docs_ready_now),
    review_at: ensureString(routingDecision?.review_at),
    next_action: ensureString(routingDecision?.next_action),
    source_ref: ensureStringArray(normalizedItem?.source_ref),
    metadata,
    action_type: actionType,
    ...(routingDecision?.task_draft ? { candidate_draft: routingDecision.task_draft } : {}),
  });
}

function buildSkipped(normalizedItem = {}, routingDecision = {}) {
  return compactObject({
    candidate_id:
      ensureString(normalizedItem?.candidate_id) ||
      ensureString(routingDecision?.candidate_id),
    design_id:
      ensureString(normalizedItem?.design_id) ||
      ensureString(routingDecision?.design_id),
    title: ensureString(normalizedItem?.title),
    reason: ensureString(routingDecision?.reason),
    write_status: 'skipped',
  });
}

export function buildDesignRoutingActionPlan({
  normalizedItems = [],
  routingDecisions = [],
  routedDesignCandidates = [],
} = {}) {
  const normalizedItemMap = createLookupMap(normalizedItems, 'candidate_id');
  const routingDecisionMap = createLookupMap(routingDecisions, 'candidate_id');

  const fallbackCandidates = Array.isArray(routedDesignCandidates)
    ? routedDesignCandidates
    : [];

  const sourceCandidates =
    normalizedItems.length > 0 || routingDecisions.length > 0
      ? Array.from(
          new Set([
            ...normalizedItems.map((item) => ensureString(item?.candidate_id)),
            ...routingDecisions.map((decision) => ensureString(decision?.candidate_id)),
          ])
        )
          .filter(Boolean)
          .map((candidateId) => ({
            normalizedItem: normalizedItemMap.get(candidateId) || {},
            routingDecision: routingDecisionMap.get(candidateId) || {},
          }))
      : fallbackCandidates.map((candidate) => ({
          normalizedItem: {
            item_id:
              ensureString(candidate?.item_id) ||
              ensureString(candidate?.design_id) ||
              ensureString(candidate?.candidate_id),
            candidate_id: ensureString(candidate?.candidate_id),
            design_id:
              ensureString(candidate?.design_id) ||
              ensureString(candidate?.item_id) ||
              ensureString(candidate?.candidate_id),
            source_ref: ensureStringArray(candidate?.source_ref),
            title: ensureString(candidate?.title),
            summary: ensureString(candidate?.summary),
            metadata: ensureObject(candidate?.metadata),
          },
          routingDecision: {
            item_id:
              ensureString(candidate?.item_id) ||
              ensureString(candidate?.design_id) ||
              ensureString(candidate?.candidate_id),
            candidate_id: ensureString(candidate?.candidate_id),
            design_id:
              ensureString(candidate?.design_id) ||
              ensureString(candidate?.item_id) ||
              ensureString(candidate?.candidate_id),
            route_to: ensureString(candidate?.route_to),
            reason: ensureString(candidate?.reason),
            evaluated_at: ensureString(candidate?.evaluated_at),
            maturity_now: ensureString(candidate?.maturity_now),
            execution_value_now: ensureString(candidate?.execution_value_now),
            docs_ready_now: Boolean(candidate?.docs_ready_now),
            review_at: ensureString(candidate?.review_at),
            next_action: ensureString(candidate?.next_action),
            ...(candidate?.task_draft ? { task_draft: candidate.task_draft } : {}),
          },
        }));

  const actionPlan = {
    docs_candidates: [],
    design_retained: [],
    future_candidates: [],
    archive_design: [],
    operations_candidates: [],
    skipped: [],
  };

  for (const sourceCandidate of sourceCandidates) {
    const normalizedItem = ensureObject(sourceCandidate?.normalizedItem);
    const routingDecision = ensureObject(sourceCandidate?.routingDecision);
    const routeTo = ensureString(routingDecision?.route_to);

    if (routeTo === 'docs') {
      actionPlan.docs_candidates.push(
        toDesignActionItem(normalizedItem, routingDecision, 'docs_candidate')
      );
      continue;
    }

    if (routeTo === 'design') {
      actionPlan.design_retained.push(
        toDesignActionItem(normalizedItem, routingDecision, 'keep_design')
      );
      continue;
    }

    if (routeTo === 'future') {
      actionPlan.future_candidates.push(
        toDesignActionItem(normalizedItem, routingDecision, 'future_candidate')
      );
      continue;
    }

    if (routeTo === 'archive') {
      actionPlan.archive_design.push(
        toDesignActionItem(normalizedItem, routingDecision, 'archive_design')
      );
      continue;
    }

    if (routeTo === 'operations') {
      actionPlan.operations_candidates.push(
        toDesignActionItem(normalizedItem, routingDecision, 'operations_candidate')
      );
      continue;
    }

    actionPlan.skipped.push(buildSkipped(normalizedItem, routingDecision));
  }

  return actionPlan;
}

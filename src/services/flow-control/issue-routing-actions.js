import { ensureObject, ensureString, ensureStringArray } from './common.js';

function createLookupMap(items = [], keyName = '') {
  return new Map(
    (Array.isArray(items) ? items : [])
      .map((item) => [ensureString(item?.[keyName]), item])
      .filter(([key]) => key)
  );
}

function toActionItem(normalizedItem = {}, routingDecision = {}, actionType = '') {
  const metadata = ensureObject(normalizedItem?.metadata);

  return {
    item_id:
      ensureString(normalizedItem?.item_id) || ensureString(routingDecision?.item_id),
    candidate_id:
      ensureString(normalizedItem?.candidate_id) ||
      ensureString(routingDecision?.candidate_id),
    issue_id:
      ensureString(metadata?.issue_id) ||
      ensureString(normalizedItem?.item_id) ||
      ensureString(routingDecision?.item_id),
    source_type: ensureString(normalizedItem?.source_type),
    title: ensureString(normalizedItem?.title),
    summary: ensureString(normalizedItem?.summary),
    description:
      ensureString(normalizedItem?.description) ||
      ensureString(metadata?.description) ||
      ensureString(normalizedItem?.summary),
    route_to: ensureString(routingDecision?.route_to),
    review_at: ensureString(routingDecision?.review_at),
    reason: ensureString(routingDecision?.reason),
    next_action: ensureString(routingDecision?.next_action),
    evaluated_at: ensureString(routingDecision?.evaluated_at),
    impact_now: ensureString(routingDecision?.impact_now),
    urgency_now: ensureString(routingDecision?.urgency_now),
    action_type: actionType,
    source_ref: ensureStringArray(normalizedItem?.source_ref),
    metadata,
    ...(routingDecision?.task_draft ? { task_draft: routingDecision.task_draft } : {}),
  };
}

export function buildIssueRoutingActions({
  normalizedItems = [],
  routingDecisions = [],
  routedCandidates = [],
} = {}) {
  const normalizedItemMap = createLookupMap(normalizedItems, 'candidate_id');
  const routingDecisionMap = createLookupMap(routingDecisions, 'candidate_id');

  const fallbackCandidates = Array.isArray(routedCandidates) ? routedCandidates : [];
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
              ensureString(candidate?.metadata?.issue_id) ||
              ensureString(candidate?.candidate_id),
            candidate_id: ensureString(candidate?.candidate_id),
            source_type: ensureString(candidate?.source_type),
            source_ref: ensureStringArray(candidate?.source_ref),
            title: ensureString(candidate?.title),
            summary: ensureString(candidate?.summary),
            description:
              ensureString(candidate?.description) ||
              ensureString(candidate?.metadata?.description) ||
              ensureString(candidate?.summary),
            metadata: ensureObject(candidate?.metadata),
          },
          routingDecision: {
            item_id:
              ensureString(candidate?.item_id) ||
              ensureString(candidate?.metadata?.issue_id) ||
              ensureString(candidate?.candidate_id),
            candidate_id: ensureString(candidate?.candidate_id),
            route_to: ensureString(candidate?.route_to),
            review_at: ensureString(candidate?.review_at),
            reason: ensureString(candidate?.reason),
            next_action: ensureString(candidate?.next_action),
            evaluated_at: ensureString(candidate?.evaluated_at),
            impact_now: ensureString(candidate?.impact_now),
            urgency_now: ensureString(candidate?.urgency_now),
            ...(candidate?.task_draft ? { task_draft: candidate.task_draft } : {}),
          },
        }));

  const actionPlan = {
    design_updates: [],
    plan_updates: [],
    operations_candidates: [],
    future_candidates: [],
    archive_items: [],
    keep_items: [],
    skipped: [],
  };

  for (const sourceCandidate of sourceCandidates) {
    const normalizedItem = ensureObject(sourceCandidate?.normalizedItem);
    const routingDecision = ensureObject(sourceCandidate?.routingDecision);
    const routeTo = ensureString(routingDecision?.route_to);

    if (routeTo === 'operations') {
      actionPlan.keep_items.push(toActionItem(normalizedItem, routingDecision, 'keep_item_open'));
      actionPlan.operations_candidates.push(
        toActionItem(normalizedItem, routingDecision, 'generate_operations_candidate')
      );
      continue;
    }

    if (routeTo === 'design') {
      actionPlan.keep_items.push(toActionItem(normalizedItem, routingDecision, 'keep_item_open'));
      actionPlan.design_updates.push(
        toActionItem(normalizedItem, routingDecision, 'create_or_update_design')
      );
      continue;
    }

    if (routeTo === 'plan') {
      actionPlan.keep_items.push(toActionItem(normalizedItem, routingDecision, 'keep_item_open'));
      actionPlan.plan_updates.push(
        toActionItem(normalizedItem, routingDecision, 'create_or_update_plan')
      );
      continue;
    }

    if (routeTo === 'future') {
      actionPlan.keep_items.push(toActionItem(normalizedItem, routingDecision, 'keep_item_open'));
      actionPlan.future_candidates.push(
        toActionItem(normalizedItem, routingDecision, 'defer_and_recheck_later')
      );
      continue;
    }

    if (routeTo === 'archive') {
      actionPlan.archive_items.push(
        toActionItem(normalizedItem, routingDecision, 'archive_item')
      );
      continue;
    }

    if (routeTo === 'issue') {
      actionPlan.keep_items.push(toActionItem(normalizedItem, routingDecision, 'keep_item_open'));
      continue;
    }

    actionPlan.skipped.push(toActionItem(normalizedItem, routingDecision, 'skip'));
  }

  return {
    ...actionPlan,
    keep_issue: actionPlan.keep_items,
    archive_issue: actionPlan.archive_items,
  };
}

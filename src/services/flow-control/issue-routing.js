import { ensureObject, ensureString } from './common.js';
import { collectCandidates } from './candidate.js';
import { normalizeCandidates } from './normalize.js';
import { evaluateCandidates } from './rules.js';
import { buildPlacementDecisions } from './placement.js';
import { buildIssueRoutingSourceBundle } from './adapters.js';
import { buildIssueRoutingActions } from './issue-routing-actions.js';

function groupRoutingDecisions(decisions = []) {
  const grouped = {
    operations: [],
    design: [],
    plan: [],
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

    if (routeTo === 'plan') {
      grouped.plan.push(decision);
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

function deriveKeepOpen(routeTo = '') {
  return ['issue', 'design', 'plan', 'operations', 'future'].includes(routeTo);
}

function deriveNextAction(routeTo = '') {
  if (routeTo === 'operations') {
    return 'generate_operations_candidate';
  }

  if (routeTo === 'design') {
    return 'create_or_update_design';
  }

  if (routeTo === 'plan') {
    return 'create_or_update_plan';
  }

  if (routeTo === 'future') {
    return 'defer_and_recheck_later';
  }

  if (routeTo === 'archive') {
    return 'archive_item';
  }

  return 'keep_item_open';
}

function buildNormalizedItem(candidate = {}) {
  const metadata = ensureObject(candidate?.metadata);

  return {
    item_id: ensureString(metadata?.issue_id) || ensureString(candidate?.candidate_id),
    candidate_id: ensureString(candidate?.candidate_id),
    source_type: ensureString(candidate?.source_type) || 'issue',
    source_ref: Array.isArray(candidate?.source_ref) ? candidate.source_ref : [],
    title: ensureString(candidate?.title),
    summary: ensureString(candidate?.summary),
    description:
      ensureString(metadata?.description) || ensureString(candidate?.summary),
    metadata,
  };
}

function buildRoutingDecision(normalizedItem = {}, decision = {}) {
  const routeTo = ensureString(decision?.route_to);

  return {
    item_id:
      ensureString(normalizedItem?.item_id) || ensureString(decision?.candidate_id),
    candidate_id:
      ensureString(normalizedItem?.candidate_id) || ensureString(decision?.candidate_id),
    route_to: routeTo,
    reason: ensureString(decision?.reason),
    evaluated_at: ensureString(decision?.evaluated_at),
    next_action: deriveNextAction(routeTo),
    keep_open: deriveKeepOpen(routeTo),
    keep_issue_open: deriveKeepOpen(routeTo),
    review_at: ensureString(decision?.review_at),
    impact_now: ensureString(decision?.impact_now),
    urgency_now: ensureString(decision?.urgency_now),
    needs_task_generation: Boolean(decision?.needs_task_generation),
    ...(decision?.task_draft ? { task_draft: decision.task_draft } : {}),
  };
}

export function routeIssueCandidates({ sourceBundles = [], phase = '' } = {}) {
  const rawCandidates = collectCandidates(sourceBundles);
  const normalizedCandidates = normalizeCandidates(rawCandidates);
  const evaluations = evaluateCandidates(normalizedCandidates, {
    phase,
    mode: 'issue_routing',
  });
  const placementDecisions = buildPlacementDecisions(
    normalizedCandidates,
    evaluations
  );

  const decisionMap = new Map(
    placementDecisions.map((decision) => [decision.candidate_id, decision])
  );

  const normalizedItems = normalizedCandidates.map((candidate) =>
    buildNormalizedItem(candidate)
  );

  const routingDecisions = normalizedItems.map((item) =>
    buildRoutingDecision(
      item,
      decisionMap.get(ensureString(item?.candidate_id)) || {}
    )
  );

  const actionPlan = buildIssueRoutingActions({
    normalizedItems,
    routingDecisions,
  });

  return {
    mode: 'dry_run',
    normalized_items: normalizedItems,
    routing_decisions: routingDecisions,
    action_plan: actionPlan,
    grouped: groupRoutingDecisions(routingDecisions),
  };
}

export function routeSingleIssueCandidate({
  item = {},
  sourceRef = [],
  phase = '',
} = {}) {
  return routeIssueCandidates({
    phase,
    sourceBundles: [
      {
        source_type: 'issue',
        source_ref: Array.isArray(sourceRef) ? sourceRef : [],
        items: [item],
      },
    ],
  });
}

export function routeIssueLogFromNotes({
  issueLogContent = '',
  issueLogSourceRef = '',
  phase = '',
} = {}) {
  const sourceBundle = buildIssueRoutingSourceBundle({
    content: issueLogContent,
    sourceRef: issueLogSourceRef,
  });

  return routeIssueCandidates({
    phase,
    sourceBundles: [sourceBundle],
  });
}

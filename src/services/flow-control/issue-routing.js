import { ensureString } from './common.js';
import { collectCandidates } from './candidate.js';
import { normalizeCandidates } from './normalize.js';
import { evaluateCandidates } from './rules.js';
import { buildPlacementDecisions } from './placement.js';
import { buildIssueRoutingSourceBundle } from './adapters.js';

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
    const routeTo = decision?.route_to || '';

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

function deriveKeepIssueOpen(routeTo = '') {
  return ['issue', 'design', 'operations', 'future'].includes(routeTo);
}

function deriveNextAction(routeTo = '') {
  if (routeTo === 'operations') {
    return 'generate_operations_candidate';
  }

  if (routeTo === 'design') {
    return 'create_or_update_design';
  }

  if (routeTo === 'future') {
    return 'defer_and_recheck_later';
  }

  if (routeTo === 'archive') {
    return 'archive_issue';
  }

  return 'keep_issue_open';
}

function buildRoutingDecision(candidate = {}, decision = {}) {
  const routeTo = ensureString(decision?.route_to);

  return {
    ...candidate,
    ...decision,
    keep_issue_open: deriveKeepIssueOpen(routeTo),
    next_action: deriveNextAction(routeTo),
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

  const routedCandidates = normalizedCandidates.map((candidate) =>
    buildRoutingDecision(
      candidate,
      decisionMap.get(candidate.candidate_id) || {}
    )
  );

  return {
    routed_candidates: routedCandidates,
    grouped: groupRoutingDecisions(routedCandidates),
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

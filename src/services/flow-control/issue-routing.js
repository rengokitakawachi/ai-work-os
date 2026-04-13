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

  const mergedDecisions = normalizedCandidates.map((candidate) => ({
    ...candidate,
    ...(decisionMap.get(candidate.candidate_id) || {}),
  }));

  return {
    routed_candidates: mergedDecisions,
    grouped: groupRoutingDecisions(mergedDecisions),
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

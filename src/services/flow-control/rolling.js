import {
  collectCandidates,
  normalizeCandidates,
  evaluateCandidates,
  buildPlacementDecisions,
  splitRankedCandidates,
} from './index.js';

export function generateRollingCandidates({ sourceBundles = [], phase = '', activeLimit = 7 } = {}) {
  const rawCandidates = collectCandidates(sourceBundles);
  const normalizedCandidates = normalizeCandidates(rawCandidates);
  const evaluations = evaluateCandidates(normalizedCandidates, {
    phase,
    mode: 'operations_rolling',
  });
  const placementDecisions = buildPlacementDecisions(
    normalizedCandidates,
    evaluations
  );

  const decisionMap = new Map(
    placementDecisions.map((decision) => [decision.candidate_id, decision])
  );

  const operationsCandidates = [];
  const deferredCandidates = [];
  const skippedCandidates = [];

  for (const candidate of normalizedCandidates) {
    const decision = decisionMap.get(candidate.candidate_id);

    if (!decision) {
      skippedCandidates.push(candidate);
      continue;
    }

    const merged = {
      ...candidate,
      ...decision,
    };

    if (decision.route_to === 'operations') {
      operationsCandidates.push(merged);
      continue;
    }

    if (['future', 'design', 'issue'].includes(decision.route_to)) {
      deferredCandidates.push(merged);
      continue;
    }

    skippedCandidates.push(merged);
  }

  const { active_candidates, next_candidates } = splitRankedCandidates(
    operationsCandidates,
    activeLimit
  );

  return {
    active_candidates,
    next_candidates,
    operations_candidates: operationsCandidates,
    deferred_candidates: deferredCandidates,
    skipped_candidates: skippedCandidates,
  };
}

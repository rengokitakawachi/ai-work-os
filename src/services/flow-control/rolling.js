import {
  collectCandidates,
  normalizeCandidates,
  evaluateCandidates,
  buildPlacementDecisions,
} from './index.js';

export function generateRollingCandidates({ sourceBundles = [], phase = '' } = {}) {
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

  const operationsCandidates = [];
  const deferredCandidates = [];
  const skippedCandidates = [];

  for (const decision of placementDecisions) {
    if (decision.route_to === 'operations') {
      operationsCandidates.push(decision);
      continue;
    }

    if (['future', 'design', 'issue'].includes(decision.route_to)) {
      deferredCandidates.push(decision);
      continue;
    }

    skippedCandidates.push(decision);
  }

  return {
    operations_candidates: operationsCandidates,
    deferred_candidates: deferredCandidates,
    skipped_candidates: skippedCandidates,
  };
}

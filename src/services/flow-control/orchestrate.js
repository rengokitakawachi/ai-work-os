import {
  buildRollingSourceBundles,
  buildOperationsQueueSourceBundle,
} from './adapters.js';
import { generateRollingCandidates } from './rolling.js';

export function generateRollingCandidatesFromNotes({
  planContent = '',
  planSourceRef = '',
  issueLogContent = '',
  issueLogSourceRef = '',
  nextOperationsContent = '',
  nextOperationsSourceRef = '',
  operationsQueuePayloads = [],
  operationsQueueSourceRef = '',
  phase = '',
  activeLimit = 7,
} = {}) {
  const sourceBundles = buildRollingSourceBundles({
    planContent,
    planSourceRef,
    issueLogContent,
    issueLogSourceRef,
    nextOperationsContent,
    nextOperationsSourceRef,
    operationsQueuePayloads,
    operationsQueueSourceRef,
  });

  return generateRollingCandidates({
    sourceBundles,
    phase,
    activeLimit,
  });
}

export function generateRollingCandidatesFromQueue({
  operationsQueuePayloads = [],
  operationsQueueSourceRef = '',
  phase = '',
  activeLimit = 7,
} = {}) {
  const sourceBundles = [
    buildOperationsQueueSourceBundle({
      queuePayloads: operationsQueuePayloads,
      sourceRef: operationsQueueSourceRef,
    }),
  ].filter((bundle) => Array.isArray(bundle.items) && bundle.items.length > 0);

  return generateRollingCandidates({
    sourceBundles,
    phase,
    activeLimit,
  });
}

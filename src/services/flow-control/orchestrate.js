import { buildRollingSourceBundles } from './adapters.js';
import { generateRollingCandidates } from './rolling.js';

export function generateRollingCandidatesFromNotes({
  planContent = '',
  planSourceRef = '',
  issueLogContent = '',
  issueLogSourceRef = '',
  nextOperationsContent = '',
  nextOperationsSourceRef = '',
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
  });

  return generateRollingCandidates({
    sourceBundles,
    phase,
    activeLimit,
  });
}

import { compactObject, ensureString, ensureStringArray } from './common.js';

export function buildTaskDraft(candidate = {}, evaluation = {}) {
  if (!evaluation?.needs_task_generation) {
    return null;
  }

  return compactObject({
    task: ensureString(candidate?.title),
    source_ref: ensureStringArray(candidate?.source_ref),
    why_now: ensureStringArray(candidate?.why_now).slice(0, 1),
    notes: [
      `generated_from:${ensureString(candidate?.candidate_id)}`,
      `route_to:${ensureString(evaluation?.route_to)}`,
    ],
  });
}

export function buildPlacementDecision(candidate = {}, evaluation = {}) {
  const taskDraft = buildTaskDraft(candidate, evaluation);

  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    route_to: ensureString(evaluation?.route_to),
    reason: ensureString(evaluation?.reason),
    review_at: ensureString(evaluation?.review_at),
    ...(taskDraft ? { task_draft: taskDraft } : {}),
  });
}

export function buildPlacementDecisions(candidates = [], evaluations = []) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return [];
  }

  const evaluationMap = new Map(
    (Array.isArray(evaluations) ? evaluations : []).map((evaluation) => [
      ensureString(evaluation?.candidate_id),
      evaluation,
    ])
  );

  return candidates.map((candidate) =>
    buildPlacementDecision(
      candidate,
      evaluationMap.get(ensureString(candidate?.candidate_id)) || {}
    )
  );
}

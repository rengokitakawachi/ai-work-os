import { ensureString } from './common.js';

function resolveReviewAt(routeTo) {
  if (routeTo === 'operations') {
    return 'daily_review';
  }

  if (routeTo === 'design' || routeTo === 'future') {
    return 'weekly_review';
  }

  return 'daily_review';
}

export function evaluateCandidate(candidate = {}, context = {}) {
  const phase = ensureString(candidate?.phase);
  const currentPhase = ensureString(context?.phase);
  const candidateType = ensureString(candidate?.candidate_type);

  if (phase && currentPhase && phase !== currentPhase) {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'future',
      in_scope: false,
      needs_task_generation: false,
      reason: '現在の phase 対象外のため',
      review_at: 'weekly_review',
    };
  }

  if (candidateType === 'archive') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'archive',
      in_scope: true,
      needs_task_generation: false,
      reason: '役目終了として扱うため',
      review_at: 'daily_review',
    };
  }

  if (candidateType === 'design') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'design',
      in_scope: true,
      needs_task_generation: false,
      reason: '先に構造整理が必要なため',
      review_at: 'weekly_review',
    };
  }

  if (candidateType === 'operations') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'operations',
      in_scope: true,
      needs_task_generation: true,
      reason: 'operations candidate として扱うため',
      review_at: resolveReviewAt('operations'),
    };
  }

  if (candidateType === 'future') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'future',
      in_scope: false,
      needs_task_generation: false,
      reason: '将来扱う候補のため',
      review_at: 'weekly_review',
    };
  }

  return {
    candidate_id: ensureString(candidate?.candidate_id),
    route_to: 'issue',
    in_scope: true,
    needs_task_generation: false,
    reason: '判定保留として issue に残すため',
    review_at: resolveReviewAt('issue'),
  };
}

export function evaluateCandidates(candidates = [], context = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return [];
  }

  return candidates.map((candidate) => evaluateCandidate(candidate, context));
}

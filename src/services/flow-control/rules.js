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

function evaluateIssueCandidate(candidate = {}) {
  const category = ensureString(candidate?.metadata?.category).toLowerCase();
  const status = ensureString(candidate?.metadata?.status).toLowerCase();
  const impact = ensureString(candidate?.metadata?.impact).toLowerCase();

  if (status === 'closed') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'archive',
      in_scope: false,
      needs_task_generation: false,
      reason: 'closed issue のため、archive 扱いにする',
      review_at: 'daily_review',
    };
  }

  if (status && status !== 'open') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'future',
      in_scope: false,
      needs_task_generation: false,
      reason: 'open ではないため、今は future に送る',
      review_at: 'weekly_review',
    };
  }

  if (impact && impact !== 'high') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'issue',
      in_scope: true,
      needs_task_generation: false,
      reason: 'high impact ではないため、issue に残して再評価する',
      review_at: 'daily_review',
    };
  }

  if (category === 'architecture') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'design',
      in_scope: true,
      needs_task_generation: false,
      reason: 'architecture 系 issue のため、先に design で構造整理する',
      review_at: 'weekly_review',
    };
  }

  if (category === 'operations') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'operations',
      in_scope: true,
      needs_task_generation: true,
      reason: 'operations 系 issue のため、operations 比較対象に入れる',
      review_at: 'daily_review',
    };
  }

  return {
    candidate_id: ensureString(candidate?.candidate_id),
    route_to: 'issue',
    in_scope: true,
    needs_task_generation: false,
    reason: 'issue は保持するが、追加判定が必要なため一段保留する',
    review_at: 'daily_review',
  };
}

export function evaluateCandidate(candidate = {}, context = {}) {
  const phase = ensureString(candidate?.phase);
  const currentPhase = ensureString(context?.phase);
  const candidateType = ensureString(candidate?.candidate_type);
  const sourceType = ensureString(candidate?.source_type);

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

  if (sourceType === 'issue') {
    return evaluateIssueCandidate(candidate);
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

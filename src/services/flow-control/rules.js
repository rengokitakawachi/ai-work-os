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

function resolveImpactNow(candidate = {}) {
  return ensureString(
    candidate?.assessment?.impact_now ||
      candidate?.metadata?.default_impact ||
      candidate?.metadata?.impact
  ).toLowerCase();
}

function resolveUrgencyNow(candidate = {}) {
  return ensureString(
    candidate?.assessment?.urgency_now ||
      candidate?.metadata?.default_urgency ||
      candidate?.metadata?.urgency
  ).toLowerCase();
}

function resolveReasonText(candidate = {}) {
  return ensureString(
    candidate?.assessment?.reason ||
      candidate?.metadata?.description ||
      candidate?.summary
  ).toLowerCase();
}

function resolveReviewHint(candidate = {}) {
  return ensureString(
    candidate?.assessment?.review_at ||
      candidate?.metadata?.review_at ||
      candidate?.review_at
  ).toLowerCase();
}

function buildDecisionMeta(candidate = {}) {
  return {
    evaluated_at: new Date().toISOString(),
    impact_now: resolveImpactNow(candidate),
    urgency_now: resolveUrgencyNow(candidate),
  };
}

function evaluateIssueCandidate(candidate = {}) {
  const category = ensureString(candidate?.metadata?.category).toLowerCase();
  const status = ensureString(candidate?.metadata?.status).toLowerCase();
  const impactNow = resolveImpactNow(candidate);
  const decisionMeta = buildDecisionMeta(candidate);

  if (status === 'closed') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'archive',
      in_scope: false,
      needs_task_generation: false,
      reason: 'closed issue のため、archive 扱いにする',
      review_at: 'daily_review',
      ...decisionMeta,
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
      ...decisionMeta,
    };
  }

  if (impactNow && impactNow !== 'high') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'issue',
      in_scope: true,
      needs_task_generation: false,
      reason: 'high impact ではないため、issue に残して再評価する',
      review_at: 'daily_review',
      ...decisionMeta,
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
      ...decisionMeta,
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
      ...decisionMeta,
    };
  }

  return {
    candidate_id: ensureString(candidate?.candidate_id),
    route_to: 'issue',
    in_scope: true,
    needs_task_generation: false,
    reason: 'issue は保持するが、追加判定が必要なため一段保留する',
    review_at: 'daily_review',
    ...decisionMeta,
  };
}

function shouldRouteIntakeToFuture(candidate = {}) {
  const reviewHint = resolveReviewHint(candidate);
  const reasonText = resolveReasonText(candidate);

  return (
    reviewHint === 'weekly_review' ||
    reviewHint === 'monthly_review' ||
    reasonText.includes('later') ||
    reasonText.includes('future') ||
    reasonText.includes('deferred') ||
    reasonText.includes('phase later')
  );
}

function evaluateIntakeCandidate(candidate = {}) {
  const category = ensureString(candidate?.metadata?.category).toLowerCase();
  const decisionMeta = buildDecisionMeta(candidate);

  if (shouldRouteIntakeToFuture(candidate)) {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'future',
      in_scope: false,
      needs_task_generation: false,
      reason: '今は扱わない入力のため future に送る',
      review_at: 'weekly_review',
      ...decisionMeta,
    };
  }

  if (category === 'architecture') {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'design',
      in_scope: true,
      needs_task_generation: false,
      reason: '構造整理が必要な入力のため design に送る',
      review_at: 'weekly_review',
      ...decisionMeta,
    };
  }

  return {
    candidate_id: ensureString(candidate?.candidate_id),
    route_to: 'issue',
    in_scope: true,
    needs_task_generation: false,
    reason: '問題として扱う入力のため issue に送る',
    review_at: 'daily_review',
    ...decisionMeta,
  };
}

export function evaluateCandidate(candidate = {}, context = {}) {
  const phase = ensureString(candidate?.phase);
  const currentPhase = ensureString(context?.phase);
  const candidateType = ensureString(candidate?.candidate_type);
  const sourceType = ensureString(candidate?.source_type);
  const decisionMeta = buildDecisionMeta(candidate);

  if (phase && currentPhase && phase !== currentPhase) {
    return {
      candidate_id: ensureString(candidate?.candidate_id),
      route_to: 'future',
      in_scope: false,
      needs_task_generation: false,
      reason: '現在の phase 対象外のため',
      review_at: 'weekly_review',
      ...decisionMeta,
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
      ...decisionMeta,
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
      ...decisionMeta,
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
      ...decisionMeta,
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
      ...decisionMeta,
    };
  }

  return evaluateIntakeCandidate(candidate);
}

export function evaluateCandidates(candidates = [], context = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return [];
  }

  return candidates.map((candidate) => evaluateCandidate(candidate, context));
}

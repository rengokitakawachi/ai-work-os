import { ensureObject, ensureString } from './common.js';

function resolveMaturityNow(candidate = {}) {
  return ensureString(
    candidate?.assessment?.maturity_now ||
      candidate?.metadata?.default_maturity
  ).toLowerCase();
}

function resolveExecutionValueNow(candidate = {}) {
  return ensureString(
    candidate?.assessment?.execution_value_now ||
      candidate?.metadata?.default_execution_value
  ).toLowerCase();
}

function resolveDocsReadyNow(candidate = {}) {
  const rawValue =
    candidate?.assessment?.docs_ready_now ??
    candidate?.metadata?.docs_ready_now ??
    false;

  return rawValue === true;
}

function resolveReason(candidate = {}) {
  return ensureString(candidate?.assessment?.reason || candidate?.summary);
}

function resolveReviewAt(candidate = {}) {
  return ensureString(candidate?.assessment?.review_at).toLowerCase();
}

function buildDecisionMeta(candidate = {}) {
  return {
    evaluated_at: new Date().toISOString(),
    maturity_now: resolveMaturityNow(candidate),
    execution_value_now: resolveExecutionValueNow(candidate),
    docs_ready_now: resolveDocsReadyNow(candidate),
  };
}

function matchesArchiveRule(candidate = {}) {
  const metadata = ensureObject(candidate?.metadata);
  const maturityNow = resolveMaturityNow(candidate);
  const reason = resolveReason(candidate).toLowerCase();

  return (
    maturityNow === 'superseded' ||
    reason.includes('obsolete') ||
    reason.includes('duplicate') ||
    reason.includes('merged') ||
    reason.includes('superseded') ||
    Boolean(ensureString(metadata?.superseded_by))
  );
}

function matchesFutureRule(candidate = {}, context = {}) {
  const metadata = ensureObject(candidate?.metadata);
  const reason = resolveReason(candidate).toLowerCase();
  const reviewAt = resolveReviewAt(candidate);
  const phase = ensureString(context?.phase);
  const relatedPlans = Array.isArray(metadata?.related_plans)
    ? metadata.related_plans
    : [];

  return (
    reviewAt === 'weekly_review' ||
    reviewAt === 'monthly_review' ||
    reason.includes('later') ||
    reason.includes('future') ||
    reason.includes('deferred') ||
    reason.includes('phase later') ||
    (phase && relatedPlans.some((item) => !ensureString(item).includes(phase)))
  );
}

function matchesDocsRule(candidate = {}) {
  return (
    resolveDocsReadyNow(candidate) && resolveMaturityNow(candidate) === 'ready'
  );
}

function matchesOperationsRule(candidate = {}) {
  const executionValueNow = resolveExecutionValueNow(candidate);
  return executionValueNow === 'high' || executionValueNow === 'medium';
}

export function evaluateDesignCandidate(candidate = {}, context = {}) {
  const candidateId = ensureString(candidate?.candidate_id);
  const decisionMeta = buildDecisionMeta(candidate);

  if (matchesArchiveRule(candidate)) {
    return {
      candidate_id: candidateId,
      route_to: 'archive',
      reason: '役目終了 design のため archive に送る',
      review_at: 'monthly_review',
      next_action: 'archive_design',
      needs_task_generation: false,
      ...decisionMeta,
    };
  }

  if (matchesFutureRule(candidate, context)) {
    return {
      candidate_id: candidateId,
      route_to: 'future',
      reason: '今は扱わない design のため future に送る',
      review_at: 'monthly_review',
      next_action: 'create_future_design_draft',
      needs_task_generation: false,
      ...decisionMeta,
    };
  }

  if (matchesDocsRule(candidate)) {
    return {
      candidate_id: candidateId,
      route_to: 'docs',
      reason: 'docs 昇格条件を満たすため docs 候補にする',
      review_at: 'monthly_review',
      next_action: 'prepare_docs_candidate',
      needs_task_generation: false,
      ...decisionMeta,
    };
  }

  if (matchesOperationsRule(candidate)) {
    return {
      candidate_id: candidateId,
      route_to: 'operations',
      reason: '実行候補価値があるため operations 比較対象へ送る',
      review_at: 'daily_review',
      next_action: 'enqueue_operations_candidate',
      needs_task_generation: true,
      ...decisionMeta,
    };
  }

  return {
    candidate_id: candidateId,
    route_to: 'design',
    reason: 'まだ草案段階のため design に残す',
    review_at: 'monthly_review',
    next_action: 'keep_design',
    needs_task_generation: false,
    ...decisionMeta,
  };
}

export function buildDesignRoutingEvaluations(candidates = [], context = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return [];
  }

  return candidates.map((candidate) =>
    evaluateDesignCandidate(candidate, context)
  );
}

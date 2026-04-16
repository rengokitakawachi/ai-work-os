import { ensureString } from './common.js';

const SOURCE_TYPE_PRIORITY = {
  plan: 0,
  issue: 1,
  active: 2,
  design: 3,
  next: 4,
  operations_queue: 5,
  future: 6,
  conversation: 7,
  unknown: 9,
};

const REVIEW_AT_PRIORITY = {
  reroll: 0,
  daily_review: 1,
  weekly_review: 2,
  monthly_review: 3,
  '': 9,
};

const IMPORTANCE_PRIORITY = {
  high: 0,
  medium: 1,
  low: 2,
  '': 9,
};

function compareImportance(left, right) {
  const leftValue = IMPORTANCE_PRIORITY[ensureString(left?.importance)] ?? 9;
  const rightValue = IMPORTANCE_PRIORITY[ensureString(right?.importance)] ?? 9;
  return leftValue - rightValue;
}

function compareSourceType(left, right) {
  const leftValue = SOURCE_TYPE_PRIORITY[ensureString(left?.source_type)] ?? 9;
  const rightValue = SOURCE_TYPE_PRIORITY[ensureString(right?.source_type)] ?? 9;
  return leftValue - rightValue;
}

function compareReviewAt(left, right) {
  const leftValue = REVIEW_AT_PRIORITY[ensureString(left?.review_at)] ?? 9;
  const rightValue = REVIEW_AT_PRIORITY[ensureString(right?.review_at)] ?? 9;
  return leftValue - rightValue;
}

function compareTitle(left, right) {
  const leftValue = ensureString(left?.task_draft?.task || left?.title);
  const rightValue = ensureString(right?.task_draft?.task || right?.title);
  return leftValue.localeCompare(rightValue, 'ja');
}

export function rankOperationsCandidates(candidates = []) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return [];
  }

  return [...candidates].sort((left, right) => {
    const importanceDiff = compareImportance(left, right);
    if (importanceDiff !== 0) {
      return importanceDiff;
    }

    const sourceTypeDiff = compareSourceType(left, right);
    if (sourceTypeDiff !== 0) {
      return sourceTypeDiff;
    }

    const reviewAtDiff = compareReviewAt(left, right);
    if (reviewAtDiff !== 0) {
      return reviewAtDiff;
    }

    return compareTitle(left, right);
  });
}

export function splitRankedCandidates(candidates = [], activeLimit = 7) {
  const rankedCandidates = rankOperationsCandidates(candidates);
  return {
    active_candidates: rankedCandidates.slice(0, activeLimit),
    next_candidates: rankedCandidates.slice(activeLimit),
  };
}

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

const PLAN_ALIGNMENT_PRIORITY = {
  direct: 0,
  linked: 1,
  supporting: 2,
  '': 9,
};

const ACTIVE_CONTINUITY_PRIORITY = {
  strong: 0,
  light: 1,
  '': 9,
};

const QUICK_WIN_PRIORITY = {
  high: 0,
  medium: 1,
  low: 2,
  '': 9,
};

function comparePlanAlignment(left, right) {
  const leftValue =
    PLAN_ALIGNMENT_PRIORITY[ensureString(left?.metadata?.plan_alignment)] ?? 9;
  const rightValue =
    PLAN_ALIGNMENT_PRIORITY[ensureString(right?.metadata?.plan_alignment)] ?? 9;
  return leftValue - rightValue;
}

function compareImportance(left, right) {
  const leftValue = IMPORTANCE_PRIORITY[ensureString(left?.importance)] ?? 9;
  const rightValue = IMPORTANCE_PRIORITY[ensureString(right?.importance)] ?? 9;
  return leftValue - rightValue;
}

function compareActiveContinuity(left, right) {
  const leftValue =
    ACTIVE_CONTINUITY_PRIORITY[ensureString(left?.metadata?.active_continuity)] ?? 9;
  const rightValue =
    ACTIVE_CONTINUITY_PRIORITY[ensureString(right?.metadata?.active_continuity)] ?? 9;
  return leftValue - rightValue;
}

function compareQuickWin(left, right) {
  const leftValue = QUICK_WIN_PRIORITY[ensureString(left?.metadata?.quick_win)] ?? 9;
  const rightValue = QUICK_WIN_PRIORITY[ensureString(right?.metadata?.quick_win)] ?? 9;
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
    const planAlignmentDiff = comparePlanAlignment(left, right);
    if (planAlignmentDiff !== 0) {
      return planAlignmentDiff;
    }

    const importanceDiff = compareImportance(left, right);
    if (importanceDiff !== 0) {
      return importanceDiff;
    }

    const activeContinuityDiff = compareActiveContinuity(left, right);
    if (activeContinuityDiff !== 0) {
      return activeContinuityDiff;
    }

    const quickWinDiff = compareQuickWin(left, right);
    if (quickWinDiff !== 0) {
      return quickWinDiff;
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

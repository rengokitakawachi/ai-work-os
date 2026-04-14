import { ensureString } from './common.js';

function toActionItem(candidate = {}, actionType = '') {
  return {
    candidate_id: ensureString(candidate?.candidate_id),
    issue_id: ensureString(candidate?.metadata?.issue_id),
    title: ensureString(candidate?.title),
    route_to: ensureString(candidate?.route_to),
    review_at: ensureString(candidate?.review_at),
    reason: ensureString(candidate?.reason),
    next_action: ensureString(candidate?.next_action),
    action_type: actionType,
    source_ref: Array.isArray(candidate?.source_ref) ? candidate.source_ref : [],
    metadata: candidate?.metadata || {},
  };
}

export function buildIssueRoutingActions({ routedCandidates = [] } = {}) {
  const actionPlan = {
    keep_issue: [],
    archive_issue: [],
    design_updates: [],
    operations_candidates: [],
    future_candidates: [],
    skipped: [],
  };

  for (const candidate of Array.isArray(routedCandidates) ? routedCandidates : []) {
    const routeTo = ensureString(candidate?.route_to);

    if (routeTo === 'operations') {
      actionPlan.keep_issue.push(toActionItem(candidate, 'keep_issue'));
      actionPlan.operations_candidates.push(
        toActionItem(candidate, 'generate_operations_candidate')
      );
      continue;
    }

    if (routeTo === 'design') {
      actionPlan.keep_issue.push(toActionItem(candidate, 'keep_issue'));
      actionPlan.design_updates.push(
        toActionItem(candidate, 'create_or_update_design')
      );
      continue;
    }

    if (routeTo === 'future') {
      actionPlan.keep_issue.push(toActionItem(candidate, 'keep_issue'));
      actionPlan.future_candidates.push(
        toActionItem(candidate, 'defer_and_recheck_later')
      );
      continue;
    }

    if (routeTo === 'archive') {
      actionPlan.archive_issue.push(toActionItem(candidate, 'archive_issue'));
      continue;
    }

    if (routeTo === 'issue') {
      actionPlan.keep_issue.push(toActionItem(candidate, 'keep_issue'));
      continue;
    }

    actionPlan.skipped.push(toActionItem(candidate, 'skip'));
  }

  return actionPlan;
}

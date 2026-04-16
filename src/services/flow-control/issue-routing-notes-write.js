import {
  compactObject,
  ensureObject,
  ensureString,
  ensureStringArray,
} from './common.js';

function slugify(value) {
  return ensureString(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function toDatePrefix(now = '') {
  const iso = ensureString(now) || new Date().toISOString();
  return iso.slice(0, 10);
}

function buildSuggestedFile({ layer = '', issueId = '', title = '', now = '' } = {}) {
  const datePrefix = toDatePrefix(now);
  const safeIssueId = ensureString(issueId) || 'unknown_issue';
  const safeSlug = slugify(title) || 'untitled';
  return `${layer}/${datePrefix}_${safeIssueId}_${safeSlug}.md`;
}

function resolveCandidateForActionItem(actionItem = {}, routedCandidateMap = new Map()) {
  const candidateId = ensureString(actionItem?.candidate_id);
  return routedCandidateMap.get(candidateId) || {};
}

function mergeSourceRef(actionItem = {}, context = {}) {
  return [
    ...ensureStringArray(actionItem?.source_ref),
    ...ensureStringArray(context?.sourceRef),
  ].filter((item, index, array) => array.indexOf(item) === index);
}

function buildBody({
  title = '',
  sourceIssueId = '',
  sourceRef = [],
  routeTo = '',
  reason = '',
  evaluatedAt = '',
  impactNow = '',
  urgencyNow = '',
  nextAction = '',
  summary = '',
} = {}) {
  return [
    `# ${ensureString(title) || 'Untitled'}`,
    '',
    '## source issue',
    '',
    `- issue_id: ${ensureString(sourceIssueId)}`,
    '',
    '## source_ref',
    '',
    ...ensureStringArray(sourceRef).map((item) => `- ${item}`),
    '',
    '## routing decision',
    '',
    `- route_to: ${ensureString(routeTo)}`,
    `- reason: ${ensureString(reason)}`,
    `- evaluated_at: ${ensureString(evaluatedAt)}`,
    `- impact_now: ${ensureString(impactNow)}`,
    `- urgency_now: ${ensureString(urgencyNow)}`,
    `- next_action: ${ensureString(nextAction)}`,
    '',
    '## raw summary',
    '',
    ensureString(summary),
    '',
  ].join('\n');
}

function buildDesignWrite(actionItem = {}, routedCandidate = {}, context = {}) {
  const issueId = ensureString(actionItem?.issue_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, context);
  const metadata = ensureObject(actionItem?.metadata);

  return compactObject({
    target_layer: '02_design',
    suggested_file: buildSuggestedFile({
      layer: '02_design',
      issueId,
      title,
      now: context.now,
    }),
    title,
    source_ref: sourceRef,
    derived_from_issue_id: issueId,
    evaluated_at: ensureString(actionItem?.evaluated_at),
    impact_now: ensureString(actionItem?.impact_now),
    urgency_now: ensureString(actionItem?.urgency_now),
    reason: ensureString(actionItem?.reason),
    action_type: ensureString(actionItem?.action_type),
    write_status: context.mode,
    body: buildBody({
      title,
      sourceIssueId: issueId,
      sourceRef,
      routeTo: ensureString(actionItem?.route_to),
      reason: ensureString(actionItem?.reason),
      evaluatedAt: ensureString(actionItem?.evaluated_at),
      impactNow: ensureString(actionItem?.impact_now),
      urgencyNow: ensureString(actionItem?.urgency_now),
      nextAction: ensureString(actionItem?.next_action),
      summary:
        ensureString(routedCandidate?.summary) ||
        ensureString(metadata?.description) ||
        'design draft generated from issue routing action plan',
    }),
  });
}

function buildOperationsCandidateWrite(actionItem = {}, routedCandidate = {}, context = {}) {
  return compactObject({
    target_layer: '04_operations',
    title: ensureString(actionItem?.title),
    derived_from_issue_id: ensureString(actionItem?.issue_id),
    route_to: ensureString(actionItem?.route_to),
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    impact_now: ensureString(actionItem?.impact_now),
    urgency_now: ensureString(actionItem?.urgency_now),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'draft_only',
    candidate_draft:
      ensureObject(routedCandidate?.task_draft) || {
        task: ensureString(actionItem?.title),
        source_ref: mergeSourceRef(actionItem, context),
        notes: [`generated_from_issue:${ensureString(actionItem?.issue_id)}`],
      },
    mode: context.mode,
  });
}

function buildFutureWrite(actionItem = {}, routedCandidate = {}, context = {}) {
  const issueId = ensureString(actionItem?.issue_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, context);
  const metadata = ensureObject(actionItem?.metadata);

  return compactObject({
    target_layer: '80_future/issue',
    suggested_file: buildSuggestedFile({
      layer: '80_future/issue',
      issueId,
      title,
      now: context.now,
    }),
    title,
    source_ref: sourceRef,
    derived_from_issue_id: issueId,
    evaluated_at: ensureString(actionItem?.evaluated_at),
    impact_now: ensureString(actionItem?.impact_now),
    urgency_now: ensureString(actionItem?.urgency_now),
    reason: ensureString(actionItem?.reason),
    action_type: ensureString(actionItem?.action_type),
    write_status: context.mode,
    body: buildBody({
      title,
      sourceIssueId: issueId,
      sourceRef,
      routeTo: ensureString(actionItem?.route_to),
      reason: ensureString(actionItem?.reason),
      evaluatedAt: ensureString(actionItem?.evaluated_at),
      impactNow: ensureString(actionItem?.impact_now),
      urgencyNow: ensureString(actionItem?.urgency_now),
      nextAction: ensureString(actionItem?.next_action),
      summary:
        ensureString(routedCandidate?.summary) ||
        ensureString(metadata?.description) ||
        'future draft generated from issue routing action plan',
    }),
  });
}

function buildArchiveWrite(actionItem = {}, routedCandidate = {}, context = {}) {
  const issueId = ensureString(actionItem?.issue_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, context);
  const metadata = ensureObject(actionItem?.metadata);

  return compactObject({
    target_layer: '99_archive/issue',
    suggested_file: buildSuggestedFile({
      layer: '99_archive/issue',
      issueId,
      title,
      now: context.now,
    }),
    title,
    source_ref: sourceRef,
    derived_from_issue_id: issueId,
    evaluated_at: ensureString(actionItem?.evaluated_at),
    impact_now: ensureString(actionItem?.impact_now),
    urgency_now: ensureString(actionItem?.urgency_now),
    reason: ensureString(actionItem?.reason),
    action_type: ensureString(actionItem?.action_type),
    write_status: context.mode,
    body: buildBody({
      title,
      sourceIssueId: issueId,
      sourceRef,
      routeTo: ensureString(actionItem?.route_to),
      reason: ensureString(actionItem?.reason),
      evaluatedAt: ensureString(actionItem?.evaluated_at),
      impactNow: ensureString(actionItem?.impact_now),
      urgencyNow: ensureString(actionItem?.urgency_now),
      nextAction: ensureString(actionItem?.next_action),
      summary:
        ensureString(routedCandidate?.summary) ||
        ensureString(metadata?.description) ||
        'archive draft generated from issue routing action plan',
    }),
  });
}

function buildKeptIssue(actionItem = {}) {
  return compactObject({
    issue_id: ensureString(actionItem?.issue_id),
    title: ensureString(actionItem?.title),
    route_to: ensureString(actionItem?.route_to),
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    impact_now: ensureString(actionItem?.impact_now),
    urgency_now: ensureString(actionItem?.urgency_now),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'no_op',
  });
}

function createRoutedCandidateMap(routedCandidates = []) {
  return new Map(
    (Array.isArray(routedCandidates) ? routedCandidates : []).map((candidate) => [
      ensureString(candidate?.candidate_id),
      candidate,
    ])
  );
}

export function applyIssueRoutingActionPlan({
  routedCandidates = [],
  actionPlan = {},
  sourceRef = [],
  mode = 'dry_run',
  now = '',
} = {}) {
  const safeMode = ensureString(mode) || 'dry_run';
  const context = {
    mode: safeMode,
    now: ensureString(now) || new Date().toISOString(),
    sourceRef: ensureStringArray(sourceRef),
  };

  const routedCandidateMap = createRoutedCandidateMap(routedCandidates);
  const safeActionPlan = ensureObject(actionPlan);

  return {
    mode: safeMode,
    design_writes: (Array.isArray(safeActionPlan.design_updates)
      ? safeActionPlan.design_updates
      : []
    ).map((actionItem) =>
      buildDesignWrite(
        actionItem,
        resolveCandidateForActionItem(actionItem, routedCandidateMap),
        context
      )
    ),
    operations_candidate_writes: (Array.isArray(safeActionPlan.operations_candidates)
      ? safeActionPlan.operations_candidates
      : []
    ).map((actionItem) =>
      buildOperationsCandidateWrite(
        actionItem,
        resolveCandidateForActionItem(actionItem, routedCandidateMap),
        context
      )
    ),
    future_writes: (Array.isArray(safeActionPlan.future_candidates)
      ? safeActionPlan.future_candidates
      : []
    ).map((actionItem) =>
      buildFutureWrite(
        actionItem,
        resolveCandidateForActionItem(actionItem, routedCandidateMap),
        context
      )
    ),
    archive_writes: (Array.isArray(safeActionPlan.archive_issue)
      ? safeActionPlan.archive_issue
      : []
    ).map((actionItem) =>
      buildArchiveWrite(
        actionItem,
        resolveCandidateForActionItem(actionItem, routedCandidateMap),
        context
      )
    ),
    kept_issues: (Array.isArray(safeActionPlan.keep_issue)
      ? safeActionPlan.keep_issue
      : []
    ).map((actionItem) => buildKeptIssue(actionItem)),
    skipped: Array.isArray(safeActionPlan.skipped) ? safeActionPlan.skipped : [],
  };
}

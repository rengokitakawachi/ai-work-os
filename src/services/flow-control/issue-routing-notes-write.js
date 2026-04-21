import {
  compactObject,
  ensureObject,
  ensureString,
  ensureStringArray,
} from './common.js';
import { readNote, createNote, updateNote } from '../repo-resource/notes.js';

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

function uniqueStrings(values = []) {
  return Array.from(new Set(ensureStringArray(values))).filter(Boolean);
}

function createItemLookupMaps({
  normalizedItems = [],
  routingDecisions = [],
  routedCandidates = [],
} = {}) {
  const normalizedByCandidateId = new Map(
    (Array.isArray(normalizedItems) ? normalizedItems : [])
      .map((item) => [ensureString(item?.candidate_id), item])
      .filter(([key]) => key)
  );

  const routingByCandidateId = new Map(
    (Array.isArray(routingDecisions) ? routingDecisions : [])
      .map((decision) => [ensureString(decision?.candidate_id), decision])
      .filter(([key]) => key)
  );

  const routedByCandidateId = new Map(
    (Array.isArray(routedCandidates) ? routedCandidates : [])
      .map((candidate) => [ensureString(candidate?.candidate_id), candidate])
      .filter(([key]) => key)
  );

  return {
    normalizedByCandidateId,
    routingByCandidateId,
    routedByCandidateId,
  };
}

function resolveContextForActionItem(actionItem = {}, lookupMaps = {}) {
  const candidateId = ensureString(actionItem?.candidate_id);
  const normalizedItem = lookupMaps?.normalizedByCandidateId?.get(candidateId) || {};
  const routingDecision = lookupMaps?.routingByCandidateId?.get(candidateId) || {};
  const routedCandidate = lookupMaps?.routedByCandidateId?.get(candidateId) || {};

  return {
    normalizedItem,
    routingDecision,
    routedCandidate,
  };
}

function mergeSourceRef(actionItem = {}, resolvedContext = {}, context = {}) {
  return uniqueStrings([
    ...ensureStringArray(actionItem?.source_ref),
    ...ensureStringArray(resolvedContext?.normalizedItem?.source_ref),
    ...ensureStringArray(resolvedContext?.routedCandidate?.source_ref),
    ...ensureStringArray(context?.sourceRef),
  ]);
}

function mergeRelatedRefs(actionItem = {}, resolvedContext = {}, context = {}) {
  const metadata = ensureObject(actionItem?.metadata);

  return uniqueStrings([
    ...mergeSourceRef(actionItem, resolvedContext, context),
    ...ensureStringArray(metadata?.context_refs),
  ]);
}

function resolveQuickWin(actionItem = {}, resolvedContext = {}) {
  const routedCandidate = ensureObject(resolvedContext?.routedCandidate);
  const metadata = ensureObject(actionItem?.metadata);

  const value = (
    ensureString(actionItem?.quick_win) ||
    ensureString(metadata?.quick_win) ||
    ensureString(routedCandidate?.quick_win) ||
    ensureString(routedCandidate?.metadata?.quick_win)
  ).toLowerCase();

  return ['high', 'medium', 'low'].includes(value) ? value : '';
}

function resolveSummary(actionItem = {}, resolvedContext = {}, fallback = '') {
  const metadata = ensureObject(actionItem?.metadata);
  const normalizedItem = ensureObject(resolvedContext?.normalizedItem);
  const routedCandidate = ensureObject(resolvedContext?.routedCandidate);

  return (
    ensureString(actionItem?.description) ||
    ensureString(normalizedItem?.description) ||
    ensureString(normalizedItem?.summary) ||
    ensureString(routedCandidate?.description) ||
    ensureString(routedCandidate?.summary) ||
    ensureString(metadata?.description) ||
    fallback
  );
}

function buildSourceIssueSection({ sourceIssueId = '' } = {}) {
  return [
    '## source issue',
    '',
    `- issue_id: ${ensureString(sourceIssueId)}`,
    '',
  ];
}

function buildSourceRefSection({ sourceRef = [] } = {}) {
  return [
    '## source_ref',
    '',
    ...ensureStringArray(sourceRef).map((item) => `- ${item}`),
    '',
  ];
}

function buildRoutingDecisionSection({
  routeTo = '',
  reason = '',
  evaluatedAt = '',
  impactNow = '',
  urgencyNow = '',
  nextAction = '',
} = {}) {
  return [
    '## routing decision',
    '',
    `- route_to: ${ensureString(routeTo)}`,
    `- reason: ${ensureString(reason)}`,
    `- evaluated_at: ${ensureString(evaluatedAt)}`,
    `- impact_now: ${ensureString(impactNow)}`,
    `- urgency_now: ${ensureString(urgencyNow)}`,
    `- next_action: ${ensureString(nextAction)}`,
    '',
  ];
}

function buildRawSummarySection({ summary = '' } = {}) {
  return [
    '## raw summary',
    '',
    ensureString(summary),
    '',
  ];
}

function buildRelatedContextSection({ relatedContext = '', relatedContextRefs = [] } = {}) {
  return [
    '## related context',
    '',
    ...ensureStringArray(relatedContextRefs).map((item) => `- ${item}`),
    '',
    ensureString(relatedContext),
    '',
  ];
}

function buildWhyDeferredSection({ whyDeferred = '' } = {}) {
  return [
    '## why deferred',
    '',
    ensureString(whyDeferred),
    '',
  ];
}

function buildRecheckPointSection({ recheckPoint = '' } = {}) {
  return [
    '## recheck point',
    '',
    ensureString(recheckPoint),
    '',
  ];
}

function buildArchiveReasonSection({ archiveReason = '' } = {}) {
  return [
    '## archive reason',
    '',
    ensureString(archiveReason),
    '',
  ];
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
  relatedContext = '',
  relatedContextRefs = [],
  extraSections = [],
} = {}) {
  return [
    `# ${ensureString(title) || 'Untitled'}`,
    '',
    ...buildSourceIssueSection({ sourceIssueId }),
    ...buildSourceRefSection({ sourceRef }),
    ...buildRoutingDecisionSection({
      routeTo,
      reason,
      evaluatedAt,
      impactNow,
      urgencyNow,
      nextAction,
    }),
    ...buildRawSummarySection({ summary }),
    ...buildRelatedContextSection({ relatedContext, relatedContextRefs }),
    ...extraSections.flat(),
  ].join('\n');
}

function buildDesignWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const issueId = ensureString(actionItem?.issue_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, resolvedContext, context);
  const relatedContextRefs = mergeRelatedRefs(actionItem, resolvedContext, context);
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
    derived_from_item_id: ensureString(actionItem?.item_id),
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
      summary: resolveSummary(
        actionItem,
        resolvedContext,
        'design draft generated from issue routing action plan'
      ),
      relatedContext: ensureString(metadata?.context),
      relatedContextRefs,
    }),
  });
}

function buildPlanWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const issueId = ensureString(actionItem?.issue_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, resolvedContext, context);
  const relatedContextRefs = mergeRelatedRefs(actionItem, resolvedContext, context);
  const metadata = ensureObject(actionItem?.metadata);

  return compactObject({
    target_layer: '03_plan',
    suggested_file: buildSuggestedFile({
      layer: '03_plan',
      issueId,
      title,
      now: context.now,
    }),
    title,
    source_ref: sourceRef,
    derived_from_issue_id: issueId,
    derived_from_item_id: ensureString(actionItem?.item_id),
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
      summary: resolveSummary(
        actionItem,
        resolvedContext,
        'plan draft generated from issue routing action plan'
      ),
      relatedContext: ensureString(metadata?.context),
      relatedContextRefs,
    }),
  });
}

function buildOperationsCandidateWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const quickWin = resolveQuickWin(actionItem, resolvedContext);
  const routedCandidate = ensureObject(resolvedContext?.routedCandidate);

  return compactObject({
    target_layer: '04_operations',
    title: ensureString(actionItem?.title),
    derived_from_issue_id: ensureString(actionItem?.issue_id),
    derived_from_item_id: ensureString(actionItem?.item_id),
    route_to: ensureString(actionItem?.route_to),
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    impact_now: ensureString(actionItem?.impact_now),
    urgency_now: ensureString(actionItem?.urgency_now),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'draft_only',
    quick_win: quickWin,
    candidate_draft:
      compactObject({
        ...(ensureObject(actionItem?.task_draft) ||
          ensureObject(routedCandidate?.task_draft) || {
            task: ensureString(actionItem?.title),
            source_ref: mergeSourceRef(actionItem, resolvedContext, context),
            notes: [`generated_from_issue:${ensureString(actionItem?.issue_id)}`],
          }),
        ...(quickWin ? { quick_win: quickWin } : {}),
      }) || {
        task: ensureString(actionItem?.title),
        source_ref: mergeSourceRef(actionItem, resolvedContext, context),
        notes: [`generated_from_issue:${ensureString(actionItem?.issue_id)}`],
      },
    mode: context.mode,
  });
}

function buildFutureWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const issueId = ensureString(actionItem?.issue_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, resolvedContext, context);
  const relatedContextRefs = mergeRelatedRefs(actionItem, resolvedContext, context);
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
    derived_from_item_id: ensureString(actionItem?.item_id),
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
      summary: resolveSummary(
        actionItem,
        resolvedContext,
        'future draft generated from issue routing action plan'
      ),
      relatedContext: ensureString(metadata?.context),
      relatedContextRefs,
      extraSections: [
        buildWhyDeferredSection({
          whyDeferred:
            ensureString(actionItem?.reason) ||
            'currently not promoted to active operations',
        }),
        buildRecheckPointSection({
          recheckPoint: ensureString(actionItem?.review_at) || 'weekly_review',
        }),
      ],
    }),
  });
}

function buildArchiveWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const issueId = ensureString(actionItem?.issue_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, resolvedContext, context);
  const relatedContextRefs = mergeRelatedRefs(actionItem, resolvedContext, context);
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
    derived_from_item_id: ensureString(actionItem?.item_id),
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
      summary: resolveSummary(
        actionItem,
        resolvedContext,
        'archive draft generated from issue routing action plan'
      ),
      relatedContext: ensureString(metadata?.context),
      relatedContextRefs,
      extraSections: [
        buildArchiveReasonSection({
          archiveReason:
            ensureString(actionItem?.reason) || 'archived after routing decision',
        }),
      ],
    }),
  });
}

function buildKeptItem(actionItem = {}) {
  return compactObject({
    item_id: ensureString(actionItem?.item_id),
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

function selectBucket(actionPlan = {}, primaryKey = '', legacyKey = '') {
  if (Array.isArray(actionPlan?.[primaryKey])) {
    return actionPlan[primaryKey];
  }

  if (legacyKey && Array.isArray(actionPlan?.[legacyKey])) {
    return actionPlan[legacyKey];
  }

  return [];
}

async function applyDocumentWrite(documentWrite = {}) {
  const suggestedFile = ensureString(documentWrite?.suggested_file);
  const body = ensureString(documentWrite?.body);

  if (!suggestedFile || !body) {
    return {
      ...documentWrite,
      write_status: 'invalid_payload',
    };
  }

  try {
    const existing = await readNote(suggestedFile);
    const result = await updateNote(
      suggestedFile,
      body,
      `update ${suggestedFile} from issue routing action plan`,
      ensureString(existing?.sha)
    );

    return {
      ...documentWrite,
      write_status: 'updated',
      path: result?.path || '',
      sha: result?.sha || '',
    };
  } catch (error) {
    if (error?.code !== 'NOT_FOUND') {
      return {
        ...documentWrite,
        write_status: 'error',
        error: {
          code: ensureString(error?.code) || 'UNKNOWN_ERROR',
          message: ensureString(error?.message) || 'Unknown error',
        },
      };
    }
  }

  try {
    const result = await createNote(
      suggestedFile,
      body,
      `create ${suggestedFile} from issue routing action plan`
    );

    return {
      ...documentWrite,
      write_status: 'created',
      path: result?.path || '',
      sha: result?.sha || '',
    };
  } catch (error) {
    return {
      ...documentWrite,
      write_status: 'error',
      error: {
        code: ensureString(error?.code) || 'UNKNOWN_ERROR',
        message: ensureString(error?.message) || 'Unknown error',
      },
    };
  }
}

export async function applyIssueRoutingActionPlan({
  normalizedItems = [],
  routingDecisions = [],
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

  const lookupMaps = createItemLookupMaps({
    normalizedItems,
    routingDecisions,
    routedCandidates,
  });
  const safeActionPlan = ensureObject(actionPlan);

  const result = {
    mode: safeMode,
    design_writes: selectBucket(safeActionPlan, 'design_updates').map((actionItem) =>
      buildDesignWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    plan_writes: selectBucket(safeActionPlan, 'plan_updates').map((actionItem) =>
      buildPlanWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    operations_candidate_writes: selectBucket(
      safeActionPlan,
      'operations_candidates'
    ).map((actionItem) =>
      buildOperationsCandidateWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    future_writes: selectBucket(safeActionPlan, 'future_candidates').map((actionItem) =>
      buildFutureWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    archive_writes: selectBucket(safeActionPlan, 'archive_items', 'archive_issue').map(
      (actionItem) =>
        buildArchiveWrite(
          actionItem,
          resolveContextForActionItem(actionItem, lookupMaps),
          context
        )
    ),
    kept_items: selectBucket(safeActionPlan, 'keep_items', 'keep_issue').map((actionItem) =>
      buildKeptItem(actionItem)
    ),
    skipped: Array.isArray(safeActionPlan.skipped) ? safeActionPlan.skipped : [],
  };

  result.kept_issues = result.kept_items;

  if (safeMode !== 'apply') {
    return result;
  }

  result.design_writes = await Promise.all(
    result.design_writes.map((documentWrite) => applyDocumentWrite(documentWrite))
  );

  result.plan_writes = await Promise.all(
    result.plan_writes.map((documentWrite) => applyDocumentWrite(documentWrite))
  );

  return result;
}

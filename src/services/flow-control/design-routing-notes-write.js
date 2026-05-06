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

function buildSuggestedFile({ layer = '', designId = '', title = '', now = '' } = {}) {
  const datePrefix = toDatePrefix(now);
  const safeDesignId = ensureString(designId) || 'unknown_design';
  const safeSlug = slugify(title) || 'untitled';
  return `${layer}/${datePrefix}_${safeDesignId}_${safeSlug}.md`;
}

function uniqueStrings(values = []) {
  return Array.from(new Set(ensureStringArray(values))).filter(Boolean);
}

function createLookupMaps({
  normalizedItems = [],
  routingDecisions = [],
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

  return {
    normalizedByCandidateId,
    routingByCandidateId,
  };
}

function resolveContextForActionItem(actionItem = {}, lookupMaps = {}) {
  const candidateId = ensureString(actionItem?.candidate_id);

  return {
    normalizedItem: lookupMaps?.normalizedByCandidateId?.get(candidateId) || {},
    routingDecision: lookupMaps?.routingByCandidateId?.get(candidateId) || {},
  };
}

function mergeSourceRef(actionItem = {}, resolvedContext = {}, context = {}) {
  return uniqueStrings([
    ...ensureStringArray(actionItem?.source_ref),
    ...ensureStringArray(resolvedContext?.normalizedItem?.source_ref),
    ...ensureStringArray(context?.sourceRef),
  ]);
}

function buildRoutingDecisionSection({
  routeTo = '',
  reason = '',
  evaluatedAt = '',
  maturityNow = '',
  executionValueNow = '',
  docsReadyNow = false,
  nextAction = '',
} = {}) {
  return [
    '## routing decision',
    '',
    `- route_to: ${ensureString(routeTo)}`,
    `- reason: ${ensureString(reason)}`,
    `- evaluated_at: ${ensureString(evaluatedAt)}`,
    `- maturity_now: ${ensureString(maturityNow)}`,
    `- execution_value_now: ${ensureString(executionValueNow)}`,
    `- docs_ready_now: ${docsReadyNow ? 'true' : 'false'}`,
    `- next_action: ${ensureString(nextAction)}`,
    '',
  ];
}

function buildSourceDesignSection({ designId = '', sourceRef = [] } = {}) {
  return [
    '## source design',
    '',
    `- design_id: ${ensureString(designId)}`,
    ...ensureStringArray(sourceRef).map((item) => `- ${item}`),
    '',
  ];
}

function buildRawSummarySection({ summary = '' } = {}) {
  return ['## raw summary', '', ensureString(summary), ''];
}

function buildBody({
  title = '',
  designId = '',
  sourceRef = [],
  routeTo = '',
  reason = '',
  evaluatedAt = '',
  maturityNow = '',
  executionValueNow = '',
  docsReadyNow = false,
  nextAction = '',
  summary = '',
} = {}) {
  return [
    `# ${ensureString(title) || 'Untitled'}`,
    '',
    ...buildSourceDesignSection({ designId, sourceRef }),
    ...buildRoutingDecisionSection({
      routeTo,
      reason,
      evaluatedAt,
      maturityNow,
      executionValueNow,
      docsReadyNow,
      nextAction,
    }),
    ...buildRawSummarySection({ summary }),
  ].join('\n');
}

function buildDocsCandidateWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const normalizedItem = ensureObject(resolvedContext?.normalizedItem);

  return compactObject({
    target_layer: 'docs_candidate',
    target_doc: ensureString(actionItem?.target_doc),
    title: ensureString(actionItem?.title),
    source_design: ensureString(actionItem?.design_id || normalizedItem?.design_id),
    source_ref: mergeSourceRef(actionItem, resolvedContext, context),
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    maturity_now: ensureString(actionItem?.maturity_now),
    execution_value_now: ensureString(actionItem?.execution_value_now),
    docs_ready_now: Boolean(actionItem?.docs_ready_now),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'draft_only',
  });
}

function buildDesignRetainedResult(actionItem = {}) {
  return compactObject({
    design_id: ensureString(actionItem?.design_id),
    title: ensureString(actionItem?.title),
    route_to: ensureString(actionItem?.route_to),
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    maturity_now: ensureString(actionItem?.maturity_now),
    execution_value_now: ensureString(actionItem?.execution_value_now),
    docs_ready_now: Boolean(actionItem?.docs_ready_now),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'no_op',
  });
}

function buildFutureWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const normalizedItem = ensureObject(resolvedContext?.normalizedItem);
  const designId = ensureString(actionItem?.design_id || normalizedItem?.design_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, resolvedContext, context);

  return compactObject({
    target_layer: '80_future/design',
    suggested_file: buildSuggestedFile({
      layer: '80_future/design',
      designId,
      title,
      now: context.now,
    }),
    title,
    source_ref: sourceRef,
    design_id: designId,
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    maturity_now: ensureString(actionItem?.maturity_now),
    execution_value_now: ensureString(actionItem?.execution_value_now),
    docs_ready_now: Boolean(actionItem?.docs_ready_now),
    review_at: ensureString(actionItem?.review_at),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'draft_only',
    body: buildBody({
      title,
      designId,
      sourceRef,
      routeTo: ensureString(actionItem?.route_to),
      reason: ensureString(actionItem?.reason),
      evaluatedAt: ensureString(actionItem?.evaluated_at),
      maturityNow: ensureString(actionItem?.maturity_now),
      executionValueNow: ensureString(actionItem?.execution_value_now),
      docsReadyNow: Boolean(actionItem?.docs_ready_now),
      nextAction: ensureString(actionItem?.next_action) || 'create_future_design_draft',
      summary:
        ensureString(actionItem?.summary) ||
        ensureString(normalizedItem?.summary) ||
        'future design draft generated from design routing action plan',
    }),
  });
}

function buildArchiveWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const normalizedItem = ensureObject(resolvedContext?.normalizedItem);
  const designId = ensureString(actionItem?.design_id || normalizedItem?.design_id);
  const title = ensureString(actionItem?.title);
  const sourceRef = mergeSourceRef(actionItem, resolvedContext, context);

  return compactObject({
    target_layer: '99_archive/design',
    suggested_file: buildSuggestedFile({
      layer: '99_archive/design',
      designId,
      title,
      now: context.now,
    }),
    title,
    source_ref: sourceRef,
    design_id: designId,
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    maturity_now: ensureString(actionItem?.maturity_now),
    execution_value_now: ensureString(actionItem?.execution_value_now),
    docs_ready_now: Boolean(actionItem?.docs_ready_now),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'draft_only',
    body: buildBody({
      title,
      designId,
      sourceRef,
      routeTo: ensureString(actionItem?.route_to),
      reason: ensureString(actionItem?.reason),
      evaluatedAt: ensureString(actionItem?.evaluated_at),
      maturityNow: ensureString(actionItem?.maturity_now),
      executionValueNow: ensureString(actionItem?.execution_value_now),
      docsReadyNow: Boolean(actionItem?.docs_ready_now),
      nextAction: ensureString(actionItem?.next_action) || 'archive_design',
      summary:
        ensureString(actionItem?.summary) ||
        ensureString(normalizedItem?.summary) ||
        'archive design draft generated from design routing action plan',
    }),
  });
}

function buildOperationsCandidateWrite(actionItem = {}, resolvedContext = {}, context = {}) {
  const candidateDraft = ensureObject(actionItem?.candidate_draft);
  const normalizedItem = ensureObject(resolvedContext?.normalizedItem);

  return compactObject({
    target_layer: '04_operations',
    title: ensureString(actionItem?.title),
    design_id: ensureString(actionItem?.design_id || normalizedItem?.design_id),
    route_to: ensureString(actionItem?.route_to),
    reason: ensureString(actionItem?.reason),
    evaluated_at: ensureString(actionItem?.evaluated_at),
    maturity_now: ensureString(actionItem?.maturity_now),
    execution_value_now: ensureString(actionItem?.execution_value_now),
    docs_ready_now: Boolean(actionItem?.docs_ready_now),
    action_type: ensureString(actionItem?.action_type),
    write_status: 'draft_only',
    candidate_draft:
      Object.keys(candidateDraft).length > 0
        ? candidateDraft
        : {
            task: ensureString(actionItem?.title),
            source_ref: mergeSourceRef(actionItem, resolvedContext, context),
            notes: [
              `generated_from_design:${ensureString(actionItem?.candidate_id)}`,
            ],
          },
    mode: context.mode,
  });
}

export async function applyDesignRoutingActionPlan({
  normalizedItems = [],
  routingDecisions = [],
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

  const lookupMaps = createLookupMaps({
    normalizedItems,
    routingDecisions,
  });
  const safeActionPlan = ensureObject(actionPlan);

  return {
    mode: safeMode,
    docs_candidate_writes: (
      Array.isArray(safeActionPlan.docs_candidates)
        ? safeActionPlan.docs_candidates
        : []
    ).map((actionItem) =>
      buildDocsCandidateWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    design_retained_results: (
      Array.isArray(safeActionPlan.design_retained)
        ? safeActionPlan.design_retained
        : []
    ).map((actionItem) => buildDesignRetainedResult(actionItem)),
    future_writes: (
      Array.isArray(safeActionPlan.future_candidates)
        ? safeActionPlan.future_candidates
        : []
    ).map((actionItem) =>
      buildFutureWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    archive_writes: (
      Array.isArray(safeActionPlan.archive_design)
        ? safeActionPlan.archive_design
        : []
    ).map((actionItem) =>
      buildArchiveWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    operations_candidate_writes: (
      Array.isArray(safeActionPlan.operations_candidates)
        ? safeActionPlan.operations_candidates
        : []
    ).map((actionItem) =>
      buildOperationsCandidateWrite(
        actionItem,
        resolveContextForActionItem(actionItem, lookupMaps),
        context
      )
    ),
    skipped: Array.isArray(safeActionPlan.skipped) ? safeActionPlan.skipped : [],
  };
}

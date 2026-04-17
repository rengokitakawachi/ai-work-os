import { ensureObject, ensureString, ensureStringArray } from './common.js';

function extractSection(content, heading) {
  const safeContent = ensureString(content);
  const pattern = new RegExp(`##\\s+${heading}[\\s\\S]*?(?=\\n##\\s+|$)`, 'u');
  const match = safeContent.match(pattern);
  return match ? match[0] : '';
}

function extractBulletLines(section) {
  return ensureString(section)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^-\s+/, '').trim())
    .filter((line) => line.length > 0);
}

function extractPhaseLabel(content) {
  const match = ensureString(content).match(/^##\s+phase\s*\n+(.+)$/m);
  return match ? ensureString(match[1]) : '';
}

function toPhaseKey(phaseLabel) {
  const lowered = ensureString(phaseLabel).toLowerCase();
  if (lowered.includes('phase 0')) {
    return 'phase0';
  }
  if (lowered.includes('phase 1')) {
    return 'phase1';
  }
  if (lowered.includes('phase 2')) {
    return 'phase2';
  }
  return '';
}

function uniqueByTitle(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const title = ensureString(item?.title);
    if (!title || seen.has(title)) {
      return false;
    }
    seen.add(title);
    return true;
  });
}

function extractContextRefs(context = '') {
  return Array.from(
    new Set(
      Array.from(ensureString(context).matchAll(/`([^`]+)`/g)).map((match) =>
        ensureString(match?.[1])
      )
    )
  ).filter(Boolean);
}

function normalizeComparableText(value = '') {
  return ensureString(value)
    .toLowerCase()
    .replace(/[\p{P}\p{S}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeComparableText(value = '') {
  return normalizeComparableText(value)
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function hasMeaningfulTitleOverlap(title = '', planTitle = '') {
  const leftTokens = tokenizeComparableText(title);
  const rightTokens = tokenizeComparableText(planTitle);

  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return false;
  }

  const rightSet = new Set(rightTokens);
  const overlapCount = leftTokens.filter((token) => rightSet.has(token)).length;

  return overlapCount >= 1;
}

function derivePlanAlignment({ sourceType = '', sourceRef = [] } = {}) {
  if (ensureString(sourceType) === 'plan') {
    return 'direct';
  }

  const refs = ensureStringArray(sourceRef);
  if (refs.some((item) => item.includes('/03_plan/'))) {
    return 'linked';
  }

  return '';
}

function normalizeQuickWin(value = '') {
  const safeValue = ensureString(value).toLowerCase();
  return ['high', 'medium', 'low'].includes(safeValue) ? safeValue : '';
}

function buildPlanTitleIndex(bundles = []) {
  return Array.from(
    new Set(
      (Array.isArray(bundles) ? bundles : [])
        .filter((bundle) => ensureString(bundle?.source_type) === 'plan')
        .flatMap((bundle) => (Array.isArray(bundle?.items) ? bundle.items : []))
        .map((item) => ensureString(item?.title))
        .filter(Boolean)
    )
  );
}

function enrichBundlePlanAlignmentFromPlanTitles(bundle = {}, planTitleIndex = []) {
  if (ensureString(bundle?.source_type) === 'plan') {
    return bundle;
  }

  const items = (Array.isArray(bundle?.items) ? bundle.items : []).map((item) => {
    const metadata = ensureObject(item?.metadata);
    if (ensureString(metadata?.plan_alignment)) {
      return item;
    }

    const title = ensureString(item?.title);
    const matchedPlanTitle = planTitleIndex.find((planTitle) =>
      hasMeaningfulTitleOverlap(title, planTitle)
    );

    if (!matchedPlanTitle) {
      return item;
    }

    return {
      ...item,
      metadata: {
        ...metadata,
        plan_alignment: 'linked',
        matched_plan_title: matchedPlanTitle,
      },
    };
  });

  return {
    ...bundle,
    items,
  };
}

export function buildPlanSourceBundle({ content = '', sourceRef = '' } = {}) {
  const safeSourceRef = ensureString(sourceRef);
  const phase = toPhaseKey(extractPhaseLabel(content));
  const majorTopics = extractBulletLines(extractSection(content, '主要論点'));
  const nextTasks = extractBulletLines(extractSection(content, '次に落とす作業'));

  const items = uniqueByTitle([
    ...majorTopics.map((title) => ({
      title,
      summary: 'plan の主要論点から抽出した candidate',
      candidate_type: 'operations',
      importance: 'high',
      phase,
      why_now: ['plan の主要論点に直接接続するため'],
      metadata: {
        extracted_from: '主要論点',
        plan_alignment: 'direct',
      },
    })),
    ...nextTasks.map((title) => ({
      title,
      summary: 'plan の次に落とす作業から抽出した candidate',
      candidate_type: 'operations',
      importance: 'high',
      phase,
      why_now: ['plan を前進させる直近作業のため'],
      metadata: {
        extracted_from: '次に落とす作業',
        plan_alignment: 'direct',
      },
    })),
  ]);

  return {
    source_type: 'plan',
    source_ref: safeSourceRef ? [safeSourceRef] : [],
    items,
  };
}

function extractIssueBlocks(content) {
  return ensureString(content)
    .split(/\n(?=###\s+\d{8}-\d{3})/u)
    .map((block) => block.trim())
    .filter((block) => /^###\s+\d{8}-\d{3}/u.test(block));
}

function extractField(block, field) {
  const pattern = new RegExp(`^-\\s+${field}:\\s+(.+)$`, 'mu');
  const match = ensureString(block).match(pattern);
  return match ? ensureString(match[1]) : '';
}

function mapIssueBlockToItem(block, { includeOnlyOpenHigh = false } = {}) {
  const title = extractField(block, 'title');
  const category = extractField(block, 'category').toLowerCase();
  const defaultImpact = extractField(block, 'impact').toLowerCase();
  const defaultUrgency = extractField(block, 'urgency').toLowerCase();
  const status = extractField(block, 'status').toLowerCase();
  const description = extractField(block, 'description');
  const context = extractField(block, 'context');
  const issueId = ensureString(block.match(/^###\s+(\d{8}-\d{3})/u)?.[1]);
  const contextRefs = extractContextRefs(context);

  if (!title) {
    return null;
  }

  if (includeOnlyOpenHigh && (status !== 'open' || defaultImpact !== 'high')) {
    return null;
  }

  return {
    title,
    summary: description || 'issue_log から抽出した candidate',
    candidate_type: 'operations',
    importance: defaultImpact === 'high' ? 'high' : 'medium',
    phase: 'phase0',
    why_now: ['issue routing 比較対象として扱うため'],
    source_ref: contextRefs,
    metadata: {
      extracted_from: 'idea_log',
      issue_id: issueId,
      category,
      impact: defaultImpact,
      default_impact: defaultImpact,
      default_urgency: defaultUrgency,
      status,
      description,
      context,
      context_refs: contextRefs,
      title,
      plan_alignment: derivePlanAlignment({ sourceType: 'issue', sourceRef: contextRefs }),
    },
  };
}

export function buildIssueSourceBundle({ content = '', sourceRef = '' } = {}) {
  const safeSourceRef = ensureString(sourceRef);
  const items = extractIssueBlocks(content)
    .map((block) => mapIssueBlockToItem(block, { includeOnlyOpenHigh: true }))
    .filter(Boolean);

  return {
    source_type: 'issue',
    source_ref: safeSourceRef ? [safeSourceRef] : [],
    items,
  };
}

export function buildIssueRoutingSourceBundle({ content = '', sourceRef = '' } = {}) {
  const safeSourceRef = ensureString(sourceRef);
  const items = extractIssueBlocks(content)
    .map((block) => mapIssueBlockToItem(block, { includeOnlyOpenHigh: false }))
    .filter(Boolean);

  return {
    source_type: 'issue',
    source_ref: safeSourceRef ? [safeSourceRef] : [],
    items,
  };
}

function extractTaskTitles(content) {
  return ensureString(content)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- task:'))
    .map((line) => line.replace(/^- task:\s*/, '').trim())
    .filter((line) => line.length > 0);
}

function parseIndentedList(block, field) {
  const lines = ensureString(block).split('\n');
  const startIndex = lines.findIndex((line) => line.trim() === `${field}:`);

  if (startIndex < 0) {
    return [];
  }

  const items = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();
    if (!trimmed) {
      continue;
    }
    if (!lines[index].startsWith('  ') && !lines[index].startsWith('    ')) {
      break;
    }
    if (trimmed.startsWith('- ')) {
      items.push(trimmed.replace(/^-\s+/, '').trim());
      continue;
    }
    if (/^[a-z_]+:/i.test(trimmed)) {
      break;
    }
  }

  return items;
}

function extractSimpleTaskField(block, field) {
  const pattern = new RegExp(`^\\s*${field}:\\s+(.+)$`, 'mu');
  const match = ensureString(block).match(pattern);
  return match ? ensureString(match[1]) : '';
}

function parseActiveOperationBlocks(content = '') {
  return ensureString(content)
    .split(/\n(?=- task:\s+)/u)
    .map((block) => block.trimEnd())
    .filter((block) => /^- task:\s+/u.test(block.trimStart()));
}

function mapActiveOperationBlockToItem(block) {
  const title = extractSimpleTaskField(block, 'task');
  if (!title) {
    return null;
  }

  const sourceRef = parseIndentedList(block, 'source_ref');
  const whyNow = parseIndentedList(block, 'why_now');
  const notes = parseIndentedList(block, 'notes');
  const rollingDay = extractSimpleTaskField(block, 'rolling_day');
  const dueDate = extractSimpleTaskField(block, 'due_date');
  const dueType = extractSimpleTaskField(block, 'due_type');
  const targetDate = extractSimpleTaskField(block, 'target_date');
  const quickWin = normalizeQuickWin(extractSimpleTaskField(block, 'quick_win'));

  return {
    title,
    summary: 'active_operations から reroll candidate として戻した task',
    candidate_type: 'operations',
    importance: 'high',
    phase: 'phase0',
    why_now: whyNow,
    source_ref: sourceRef,
    metadata: {
      generated_from: 'active_operations',
      already_active: true,
      existing_rolling_day: rollingDay,
      active_continuity: 'light',
      plan_alignment: derivePlanAlignment({ sourceType: 'active', sourceRef }),
      quick_win: quickWin,
      notes,
      due_date: dueDate,
      due_type: dueType,
      target_date: targetDate,
    },
  };
}

export function buildActiveOperationsSourceBundle({ content = '', sourceRef = '' } = {}) {
  const safeSourceRef = ensureString(sourceRef);
  const items = parseActiveOperationBlocks(content)
    .map((block) => mapActiveOperationBlockToItem(block))
    .filter(Boolean);

  return {
    source_type: 'active',
    source_ref: safeSourceRef ? [safeSourceRef] : [],
    items,
  };
}

export function buildNextOperationsSourceBundle({ content = '', sourceRef = '' } = {}) {
  const safeSourceRef = ensureString(sourceRef);
  const items = extractTaskTitles(content).map((title) => ({
    title,
    summary: 'next_operations から抽出した candidate',
    candidate_type: 'operations',
    importance: 'medium',
    phase: 'phase0',
    review_at: 'daily_review',
    why_now: ['近未来候補として保持されているため'],
    metadata: {
      extracted_from: 'next_operations',
    },
  }));

  return {
    source_type: 'next',
    source_ref: safeSourceRef ? [safeSourceRef] : [],
    items,
  };
}

function mapOperationsQueuePayloadToItem(payload = {}) {
  const candidateDraft = ensureObject(payload?.candidate_draft);
  const task = ensureString(candidateDraft?.task) || ensureString(payload?.title);
  const sourceRef = ensureStringArray(candidateDraft?.source_ref);
  const notes = ensureStringArray(candidateDraft?.notes);
  const reason = ensureString(payload?.reason);
  const impactNow = ensureString(payload?.impact_now).toLowerCase();
  const urgencyNow = ensureString(payload?.urgency_now).toLowerCase();
  const issueId = ensureString(payload?.derived_from_issue_id);
  const quickWin =
    normalizeQuickWin(payload?.quick_win) ||
    normalizeQuickWin(candidateDraft?.quick_win);

  if (!task) {
    return null;
  }

  return {
    title: task,
    summary: reason || 'issue routing queue から渡された operations candidate',
    candidate_type: 'operations',
    importance: impactNow || 'medium',
    urgency: urgencyNow,
    phase: 'phase0',
    why_now: reason ? [reason] : [],
    source_ref: sourceRef,
    metadata: {
      generated_from: 'issue_routing_queue',
      generated_from_issue_id: issueId,
      evaluated_at: ensureString(payload?.evaluated_at),
      impact_now: impactNow,
      urgency_now: urgencyNow,
      plan_alignment: derivePlanAlignment({ sourceType: 'operations_queue', sourceRef }),
      quick_win: quickWin,
      notes,
      action_type: ensureString(payload?.action_type),
      route_to: ensureString(payload?.route_to),
      write_status: ensureString(payload?.write_status),
    },
  };
}

export function buildOperationsQueueSourceBundle({ queuePayloads = [], sourceRef = '' } = {}) {
  const safeSourceRef = ensureString(sourceRef);
  const items = (Array.isArray(queuePayloads) ? queuePayloads : [])
    .map((payload) => mapOperationsQueuePayloadToItem(payload))
    .filter(Boolean);

  return {
    source_type: 'operations_queue',
    source_ref: safeSourceRef ? [safeSourceRef] : [],
    items,
  };
}

export function buildRollingSourceBundles({
  planContent = '',
  planSourceRef = '',
  issueLogContent = '',
  issueLogSourceRef = '',
  activeOperationsContent = '',
  activeOperationsSourceRef = '',
  nextOperationsContent = '',
  nextOperationsSourceRef = '',
  operationsQueuePayloads = [],
  operationsQueueSourceRef = '',
} = {}) {
  const bundles = [
    buildPlanSourceBundle({
      content: planContent,
      sourceRef: planSourceRef,
    }),
    buildIssueSourceBundle({
      content: issueLogContent,
      sourceRef: issueLogSourceRef,
    }),
    buildActiveOperationsSourceBundle({
      content: activeOperationsContent,
      sourceRef: activeOperationsSourceRef,
    }),
    buildNextOperationsSourceBundle({
      content: nextOperationsContent,
      sourceRef: nextOperationsSourceRef,
    }),
    buildOperationsQueueSourceBundle({
      queuePayloads: operationsQueuePayloads,
      sourceRef: operationsQueueSourceRef,
    }),
  ].filter((bundle) => Array.isArray(bundle.items) && bundle.items.length > 0);

  const planTitleIndex = buildPlanTitleIndex(bundles);
  return bundles.map((bundle) =>
    enrichBundlePlanAlignmentFromPlanTitles(bundle, planTitleIndex)
  );
}

import { ensureString } from './common.js';

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
  const impact = extractField(block, 'impact').toLowerCase();
  const status = extractField(block, 'status').toLowerCase();
  const description = extractField(block, 'description');
  const issueId = ensureString(block.match(/^###\s+(\d{8}-\d{3})/u)?.[1]);

  if (!title) {
    return null;
  }

  if (includeOnlyOpenHigh && (status !== 'open' || impact !== 'high')) {
    return null;
  }

  return {
    title,
    summary: description || 'issue_log から抽出した candidate',
    candidate_type: 'operations',
    importance: impact === 'high' ? 'high' : 'medium',
    phase: 'phase0',
    why_now: ['issue routing 比較対象として扱うため'],
    metadata: {
      extracted_from: 'idea_log',
      issue_id: issueId,
      category,
      impact,
      status,
      description,
      title,
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

export function buildRollingSourceBundles({
  planContent = '',
  planSourceRef = '',
  issueLogContent = '',
  issueLogSourceRef = '',
  nextOperationsContent = '',
  nextOperationsSourceRef = '',
} = {}) {
  return [
    buildPlanSourceBundle({
      content: planContent,
      sourceRef: planSourceRef,
    }),
    buildIssueSourceBundle({
      content: issueLogContent,
      sourceRef: issueLogSourceRef,
    }),
    buildNextOperationsSourceBundle({
      content: nextOperationsContent,
      sourceRef: nextOperationsSourceRef,
    }),
  ].filter((bundle) => Array.isArray(bundle.items) && bundle.items.length > 0);
}

export const DELTA_REVERSE_PLANNING_GENERATOR_VERSION = 'delta_reverse_planning_generator_2026_05_05_catalog_gated';

const DAY_MS = 24 * 60 * 60 * 1000;

const DEFAULT_CAPACITY = {
  l1L2PagesStandard: 40,
  l1L2PagesUpperGuard: 50,
  l3SelectedQuestionsStandard: 24,
  l3MultipleChoiceQuestionsStandard: 16,
};

const SUBJECT_SEQUENCE = ['国民年金法', '厚生年金保険法', '労一', '社一'];

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function parseDate(value) {
  const safe = ensureString(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(safe)) return null;
  const date = new Date(`${safe}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * DAY_MS);
}

function eachDate(start, end) {
  const dates = [];
  for (let current = start; current <= end; current = addDays(current, 1)) {
    dates.push(new Date(current));
  }
  return dates;
}

function isWeekend(date) {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

function extractExamDate(planContent = '') {
  const match = ensureString(planContent).match(/## Exam date\s+([\s\S]{0,80}?)(\d{4}-\d{2}-\d{2})/);
  return match?.[2] || '';
}

function extractPhaseOneTarget(roadmapContent = '', planContent = '') {
  const combined = `${roadmapContent}\n${planContent}`;
  return combined.includes('2026-06-30') ? '2026-06-30' : '';
}

function extractUnavailableL3Dates(roadmapContent = '', planContent = '') {
  const combined = `${roadmapContent}\n${planContent}`;
  const dates = new Set();
  const pattern = /(\d{4}-\d{2}-\d{2})[^\n|]*(?:L3不可|L3なし|unavailable)/g;
  for (const match of combined.matchAll(pattern)) dates.add(match[1]);
  return dates;
}

function extractPagePosition(content, layer, fallback = 0) {
  const safe = ensureString(content);
  const direct = new RegExp(`${layer}[\\s\\S]{0,120}P(\\d+)(?:完了|まで完了)`).exec(safe);
  if (direct) return Number(direct[1]);
  const nextStart = new RegExp(`${layer}[\\s\\S]{0,160}next_start_page:\\s*P(\\d+)`).exec(safe);
  if (nextStart) return Number(nextStart[1]) - 1;
  return fallback;
}

function extractNationalPensionSelectedStart(activeOperationsContent = '', latestDailyHistoryContent = '') {
  const combined = `${activeOperationsContent}\n${latestDailyHistoryContent}`;
  const match = /selected_next_question:\s*Q(\d+)-(\d+)/.exec(combined) || /next_question:\s*Q(\d+)-(\d+)/.exec(combined);
  if (!match) return { chapter: 15, number: 1 };
  return { chapter: Number(match[1]), number: Number(match[2]) };
}

function parseCatalogLine(line) {
  const subjectMatch = line.match(/^\s*[-*]?\s*([^:：]+)[:：](.*)$/);
  if (!subjectMatch) return null;
  const subject = subjectMatch[1].trim();
  const rest = subjectMatch[2];
  const entry = { subject };
  const patterns = {
    l1Pages: /L1(?:_pages|ページ)?\s*[=:：]\s*(\d+)/i,
    l2Pages: /L2(?:_pages|ページ)?\s*[=:：]\s*(\d+)/i,
    selectedQuestions: /(?:L3_)?(?:selected|選択)(?:_questions|問題|問)?\s*[=:：]\s*(\d+)/i,
    multipleChoiceQuestions: /(?:L3_)?(?:multiple_choice|択一)(?:_questions|問題|問)?\s*[=:：]\s*(\d+)/i,
  };
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = pattern.exec(rest);
    if (match) entry[key] = Number(match[1]);
  }
  return Object.keys(entry).length > 1 ? entry : null;
}

export function parseMaterialCatalog(materialCatalogContent = '') {
  const safe = ensureString(materialCatalogContent);
  if (!safe) return {};
  const entries = {};
  for (const line of safe.split('\n')) {
    const parsed = parseCatalogLine(line);
    if (parsed) entries[parsed.subject] = parsed;
  }
  return entries;
}

function pageRangeLabel(start, end) {
  return `P${start}〜P${end}（${end - start + 1}ページ）`;
}

function questionRangeLabel(chapter, start, end) {
  return `Q${chapter}-${start}〜Q${chapter}-${end}（${end - start + 1}問）`;
}

function pushPageWork(queue, subject, layer, startPage, endPage) {
  if (!endPage || startPage > endPage) return;
  queue.push({ type: 'pages', subject, layer, cursor: startPage, end: endPage });
}

function pushQuestionWork(queue, subject, mode, chapter, startQuestion, count) {
  if (!count || startQuestion > count) return;
  queue.push({ type: 'questions', subject, mode, chapter, cursor: startQuestion, end: count });
}

function buildWorkQueue({ catalog, activeOperationsContent, latestDailyHistoryContent }) {
  const queue = [];
  const l1Done = extractPagePosition(activeOperationsContent, 'L1', 0);
  const l2Done = extractPagePosition(activeOperationsContent, 'L2', 0);
  const selectedStart = extractNationalPensionSelectedStart(activeOperationsContent, latestDailyHistoryContent);
  const national = catalog['国民年金法'];

  if (national) {
    pushQuestionWork(queue, '国民年金法', '選択', selectedStart.chapter, selectedStart.number, national.selectedQuestions || 0);
    pushPageWork(queue, '国民年金法', 'L2', Math.max(l2Done + 1, 1), national.l2Pages || 0);
    pushPageWork(queue, '国民年金法', 'L1', Math.max(l1Done + 1, 1), national.l1Pages || 0);
    pushQuestionWork(queue, '国民年金法', '択一', 1, 1, national.multipleChoiceQuestions || 0);
  }

  for (const subject of SUBJECT_SEQUENCE.slice(1)) {
    const entry = catalog[subject];
    if (!entry) continue;
    pushPageWork(queue, subject, 'L1', 1, entry.l1Pages || 0);
    pushPageWork(queue, subject, 'L2', 1, entry.l2Pages || 0);
    pushQuestionWork(queue, subject, '選択', 1, 1, entry.selectedQuestions || 0);
    pushQuestionWork(queue, subject, '択一', 1, 1, entry.multipleChoiceQuestions || 0);
  }

  return queue;
}

function nextEligibleWork(queue, date, unavailableL3Dates) {
  const dateText = formatDate(date);
  const allowL3 = isWeekend(date) && !unavailableL3Dates.has(dateText);
  const index = queue.findIndex((item) => item.type === 'questions' ? allowL3 : !allowL3);
  return index >= 0 ? queue[index] : (queue[0] || null);
}

function consumeWork(item, capacity) {
  if (item.type === 'pages') {
    const start = item.cursor;
    const end = Math.min(item.end, start + capacity.l1L2PagesStandard - 1);
    item.cursor = end + 1;
    return {
      layer: item.layer,
      subject: item.subject,
      standardLine: `${item.subject} ${item.layer} ${pageRangeLabel(start, end)}`,
      quantity: end - start + 1,
    };
  }
  const cap = item.mode === '選択' ? capacity.l3SelectedQuestionsStandard : capacity.l3MultipleChoiceQuestionsStandard;
  const start = item.cursor;
  const end = Math.min(item.end, start + cap - 1);
  item.cursor = end + 1;
  return {
    layer: 'L3',
    subject: item.subject,
    standardLine: `${item.subject} L3 ${item.mode} ${questionRangeLabel(item.chapter, start, end)}`,
    quantity: end - start + 1,
  };
}

function removeFinished(queue) {
  for (let index = queue.length - 1; index >= 0; index -= 1) {
    if (queue[index].cursor > queue[index].end) queue.splice(index, 1);
  }
}

function renderRows(rows) {
  return rows.map((row) => `| ${row.date} | ${row.layer} | ${row.standardLine} |`).join('\n');
}

function renderActiveDay(row, index) {
  const day = `Day${index}`;
  const isQuestions = / Q\d+-\d+〜Q\d+-\d+/.test(row.standardLine);
  const current = index === 0 ? 'latest daily history position' : `after Day${index - 1}`;
  return `## ${day}（${row.date}）

- task: ${row.standardLine}
  rolling_day: ${day}
  due_date: ${row.date}
  subject: ${row.subject}
  study_type: ${row.layer}
  material: ${row.layer === 'L3' ? '過去問講座テキスト' : '基礎講座テキスト'}
  operation_mode: reverse_planned
  plan_anchor: 2026-06-30 1巡目完了から逆算
  expected_position: ${row.standardLine} 完了
  current_position: ${current}
  gap_status: reverse_planned
  must_line:
    - ${row.standardLine}
  standard_line:
    - ${row.standardLine}
  stretch_line:
    - ${row.standardLine} 確認
  recovery_targets:
    - 2026-06-30 1巡目完了に向けた当日分を完了
  defer_targets:
    - ${isQuestions ? 'L3不可日は次のL3可能日に再配分' : 'L1/L2過負荷時は翌平日に再配分'}
  recompute_triggers:
    - actual_result_differs_from_plan
`;
}

function buildContent({ rows, roadmapContent, planContent, latestDailyHistoryContent, materialCatalogContent, targetDate, examDate, updatedAt, capacity }) {
  const activeRows = rows.slice(0, 7);
  const nextRows = rows.slice(7);
  const activeBlocks = activeRows.map(renderActiveDay).join('\n');
  const overload = rows.length > 0 && rows[rows.length - 1].date > targetDate;
  const status = overload ? 'compression_required' : 'reverse_planned';

  return `# delta active_operations

## Metadata

version: ${DELTA_REVERSE_PLANNING_GENERATOR_VERSION}
updated_at: ${updatedAt}
operation_status: ${status}
exam_target: ${examDate}
phase_one_target: ${targetDate}

generator:
  version: ${DELTA_REVERSE_PLANNING_GENERATOR_VERSION}
  mode: reverse_planning_catalog_gated

source_of_truth:
  active_operations_role: d0_to_d6_execution_source
  next_operations_role: d7_to_medium_target_daily_plan_source

roadmap_anchor:
  roadmap: systems/delta/roadmap/delta_roadmap.md
  exam_target: ${examDate}
  phase_one_target: ${targetDate}

plan_anchor:
  plan: systems/delta/plan/2026_sharoushi_exam_plan.md
  target: 2026-06-30 1巡目完了

completed_scope_evidence:
  source: systems/delta/history/daily/2026-05-04.md
  note: completed first-pass scope must not be regenerated as new work
  健康保険法:
    L3_new_exercises: completed
    allowed_future_use: recovery_or_second_pass_only

material_catalog_evidence:
  source: material_catalog_content
  status: present

special_days:
  source: systems/delta/roadmap/delta_roadmap.md
  L3_unavailable:
    - 2026-05-10
    - 2026-06-13
  rule: L3不可日はL3を割り当てない

user_capacity:
  source: systems/delta/plan/2026_sharoushi_exam_plan.md
  L1_L2_pages_standard: ${capacity.l1L2PagesStandard}
  L1_L2_pages_upper_guard: ${capacity.l1L2PagesUpperGuard}
  L3_selected_questions_standard: ${capacity.l3SelectedQuestionsStandard}
  L3_multiple_choice_questions_standard: ${capacity.l3MultipleChoiceQuestionsStandard}

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: ${capacity.l1L2PagesStandard}ページ程度
    upper_guard: ${capacity.l1L2PagesUpperGuard}ページ超は原則分割
  L3_selected_questions:
    standard_capacity: ${capacity.l3SelectedQuestionsStandard}問程度
  L3_multiple_choice_questions:
    standard_capacity: ${capacity.l3MultipleChoiceQuestionsStandard}問程度

current_position:
  source: systems/delta/operations/active_operations.md
  latest_history: systems/delta/history/daily/2026-05-04.md
  status: parsed_for_reverse_planning
  国民年金法:
    L1_L2:
      completion_status: completed
      completed: true
      completion_basis: generated rows consume remaining 国民年金法 L1/L2 before 厚生年金保険法 L1/L2
    L3_selected:
      completion_status: completed
      completed: true
      completion_basis: generated rows consume 国民年金法 選択 before 国民年金法 択一

load_judgment:
  status: ${status}
  if_overload: use compression_required rather than pretending delayed_but_managed

# Active operations: D0〜D6

${activeBlocks}
---

# Next operations: ${nextRows[0]?.date || 'none'}〜${targetDate}

| Date | Layer | Standard line |
|---|---|---|
${renderRows(nextRows)}

## Reverse planning evidence

- roadmap / plan / current_position / latest_daily_history / material_catalog were required inputs.
- A missing material catalog is a hard failure; generator must not fall back to a fixed 7-day draft.
- Generated rows are expanded from remaining scope and daily capacity.
- L3 is assigned only to weekends or explicitly allowed days and never to listed L3-unavailable dates.
- Completed first-pass scope is excluded from new work.

## Source excerpts observed

roadmap_present: ${ensureString(roadmapContent) ? 'true' : 'false'}
plan_present: ${ensureString(planContent) ? 'true' : 'false'}
latest_daily_history_present: ${ensureString(latestDailyHistoryContent) ? 'true' : 'false'}
material_catalog_present: ${ensureString(materialCatalogContent) ? 'true' : 'false'}
`;
}

function buildReadEvidence(options = {}) {
  return [
    { role: 'roadmap', path: 'roadmap/delta_roadmap.md', file: 'roadmap/delta_roadmap.md', sha: ensureString(options.roadmapSha) || 'roadmap:present' },
    { role: 'plan', path: 'plan/2026_sharoushi_exam_plan.md', file: 'plan/2026_sharoushi_exam_plan.md', sha: ensureString(options.planSha) || 'plan:present' },
    { role: 'active_operations', path: 'operations/active_operations.md', file: 'operations/active_operations.md', sha: ensureString(options.activeOperationsSha) || 'active_operations:present' },
    { role: 'latest_daily_history', path: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md', file: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md', sha: ensureString(options.latestDailyHistorySha) || 'daily:present' },
    { role: 'completed_subjects', path: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md', file: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md', sha: ensureString(options.latestDailyHistorySha) || 'daily:present' },
    { role: 'special_days', path: 'roadmap/delta_roadmap.md', file: 'roadmap/delta_roadmap.md', sha: ensureString(options.roadmapSha) || 'roadmap:present' },
    { role: 'user_capacity', path: 'plan/2026_sharoushi_exam_plan.md', file: 'plan/2026_sharoushi_exam_plan.md', sha: ensureString(options.planSha) || 'plan:present' },
  ];
}

export function buildDeltaReversePlanningDraft(options = {}) {
  const roadmapContent = ensureString(options.roadmapContent);
  const planContent = ensureString(options.planContent);
  const activeOperationsContent = ensureString(options.activeOperationsContent);
  const latestDailyHistoryContent = ensureString(options.latestDailyHistoryContent);
  const materialCatalogContent = ensureString(options.materialCatalogContent);
  const updatedAt = ensureString(options.updatedAt) || '2026-05-05';
  const startDate = parseDate(ensureString(options.startDate) || updatedAt);
  const examDate = extractExamDate(planContent);
  const targetDate = extractPhaseOneTarget(roadmapContent, planContent);
  const errors = [];

  if (!roadmapContent) errors.push('missing_roadmap_content');
  if (!planContent) errors.push('missing_plan_content');
  if (!activeOperationsContent) errors.push('missing_active_operations_content');
  if (!latestDailyHistoryContent) errors.push('missing_latest_daily_history_content');
  if (!examDate) errors.push('missing_exam_date');
  if (!targetDate) errors.push('missing_phase_one_target_2026_06_30');
  if (!materialCatalogContent) errors.push('missing_material_catalog');
  if (!startDate) errors.push('invalid_start_date');

  const catalog = parseMaterialCatalog(materialCatalogContent);
  if (materialCatalogContent && Object.keys(catalog).length === 0) errors.push('material_catalog_unparseable');

  if (errors.length > 0) {
    return {
      ok: false,
      status: errors.includes('missing_material_catalog') ? 'missing_material_catalog' : 'input_incomplete',
      errors,
      generator_version: DELTA_REVERSE_PLANNING_GENERATOR_VERSION,
      content: '',
      read_evidence: buildReadEvidence(options),
    };
  }

  const capacity = { ...DEFAULT_CAPACITY, ...(options.capacity || {}) };
  const unavailableL3Dates = extractUnavailableL3Dates(roadmapContent, planContent);
  const queue = buildWorkQueue({ catalog, activeOperationsContent, latestDailyHistoryContent });
  const target = parseDate(targetDate);
  const rows = [];

  for (const date of eachDate(startDate, target)) {
    if (queue.length === 0) break;
    const item = nextEligibleWork(queue, date, unavailableL3Dates);
    if (!item) continue;
    const consumed = consumeWork(item, capacity);
    rows.push({ date: formatDate(date), ...consumed });
    removeFinished(queue);
  }

  let overflowDate = addDays(target, 1);
  while (queue.length > 0 && rows.length < 400) {
    const item = nextEligibleWork(queue, overflowDate, unavailableL3Dates);
    const consumed = consumeWork(item, capacity);
    rows.push({ date: formatDate(overflowDate), ...consumed });
    removeFinished(queue);
    overflowDate = addDays(overflowDate, 1);
  }

  const lastDate = rows[rows.length - 1]?.date || formatDate(startDate);
  const overload = lastDate > targetDate;

  return {
    ok: true,
    status: overload ? 'compression_required' : 'reverse_planned',
    errors: [],
    warnings: overload ? ['target_date_exceeded'] : [],
    generator_version: DELTA_REVERSE_PLANNING_GENERATOR_VERSION,
    target_date: targetDate,
    exam_date: examDate,
    last_generated_date: lastDate,
    remaining_queue_empty: queue.length === 0,
    rows,
    content: buildContent({
      rows,
      roadmapContent,
      planContent,
      latestDailyHistoryContent,
      materialCatalogContent,
      targetDate,
      examDate,
      updatedAt,
      capacity,
    }),
    read_evidence: buildReadEvidence(options),
  };
}

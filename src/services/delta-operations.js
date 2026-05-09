import {
  createError,
  assertSafeRelativePath,
  getContentFile,
  putContentFile,
} from './repo-resource/common.js';
import { validateL3QuestionIndex } from './delta/l3-question-index.js';

export const DELTA_OPERATIONS_ROOT = 'systems/delta/operations/';
export const DELTA_OPERATIONS_ALLOWED_FILES = ['active_operations.md', 'next_operations.md'];
export const DELTA_OPERATIONS_VALIDATOR_VERSION = 'delta_operations_preflight_2026_05_09_l3_question_index_special_day_l1_l2_commute_guard';

const REQUIRED_ACTIVE_DAYS = ['Day0', 'Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6'];
const DAY_MS = 24 * 60 * 60 * 1000;

const REQUIRED_DAY_FIELDS = [
  'plan_anchor',
  'expected_position',
  'current_position',
  'gap_status',
  'operation_mode',
  'must_line',
  'standard_line',
  'stretch_line',
  'recovery_targets',
  'defer_targets',
  'recompute_triggers',
];

const REQUIRED_READ_ROLES = [
  'roadmap',
  'plan',
  'active_operations',
  'latest_daily_history',
  'completed_subjects',
  'special_days',
  'user_capacity',
];
const REQUIRED_SPLIT_READ_ROLES = [...REQUIRED_READ_ROLES, 'next_operations'];

const FORBIDDEN_VAGUE_TARGETS = [
  '前半',
  '後半',
  '終盤',
  '完了方向',
  '進める',
  '接続判断',
  '未消化ページ回収のみ',
  'できるところまで',
  'Qx以降',
  'Qx-last',
  '章の最後まで',
  '択一入口',
  '着手',
  '未達分回収のみ',
  'n問相当',
  '問相当',
  '実在未確認',
  '確認済み次問',
  '教材インデックス確認',
  'インデックス確認',
  '未通過',
];

const L1_L2_PAGE_PATTERN = /P\d+〜P\d+（\d+ページ(?:[^）]*)?）/;
const L1_L2_PAGE_RANGE_PATTERN = /P\d+〜P\d+/;
const L3_QUESTION_PATTERN = /Q\d+-\d+〜Q\d+-\d+（\d+問(?:、[^）]+)?）|Q\d+-0/;
const SEKOTORE_PATTERN = /秒トレ\s*\d+問/;
const REST_OR_UNAVAILABLE_PATTERN = /新規L1\/L2\/L3なし|L3不可|休養|rest_or_light_review|秒トレ\s*\d+問/;
const NEXT_OPERATIONS_PATTERN = /#\s*Next operations:/;
const NEXT_OPERATIONS_REF_PATTERN = /next_operations_ref:[\s\S]{0,500}systems\/delta\/operations\/next_operations\.md/;
const EXISTING_NEXT_OPS_READ_PATTERN = /existing_next_operations_read|existing_next_operations_was_read|next_operations_was_read|source_of_truth:[\s\S]*operations_role|current_position_primary_source/;
const COMPLETED_SCOPE_PATTERN = /completed_scope|completed_subject|健康保険法L3の新規演習は完了扱い|健康保険法[\s\S]{0,80}completed/;
const DATE_RANGE_ROW_PATTERN = /^\|\s*\d{4}-\d{2}-\d{2}\s*[〜~]\s*\d{4}-\d{2}-\d{2}\s*\|/;
const NEXT_ROW_PATTERN = /^\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*([^|]+)\|\s*([^|]+)\|/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function buildDeltaOperationsPath(file, context = {}) {
  const safe = assertSafeRelativePath(file, {
    step: context.step || 'buildDeltaOperationsPath',
    resource: 'delta_operations',
    action: context.action || '',
  });
  if (safe.startsWith(DELTA_OPERATIONS_ROOT) || safe.startsWith('systems/')) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_operations file must be relative to systems/delta/operations',
      category: 'validation',
      step: context.step || 'buildDeltaOperationsPath',
      resource: 'delta_operations',
      action: context.action || '',
      retryable: false,
      details: { file: safe, expected_root: DELTA_OPERATIONS_ROOT },
    });
  }
  if (!DELTA_OPERATIONS_ALLOWED_FILES.includes(safe)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'delta_operations file not allowed',
      category: 'validation',
      step: context.step || 'buildDeltaOperationsPath',
      resource: 'delta_operations',
      action: context.action || '',
      retryable: false,
      details: { file: safe, allowed_files: DELTA_OPERATIONS_ALLOWED_FILES },
    });
  }
  return `${DELTA_OPERATIONS_ROOT}${safe}`;
}

function normalizeMessage(message, fallback) {
  const safeMessage = typeof message === 'string' ? message.trim() : '';
  return safeMessage || fallback;
}

function normalizeReadEvidence(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      file: typeof item.file === 'string' ? item.file.trim() : '',
      path: typeof item.path === 'string' ? item.path.trim() : '',
      sha: typeof item.sha === 'string' ? item.sha.trim() : '',
      role: typeof item.role === 'string' ? item.role.trim() : '',
      source: typeof item.source === 'string' ? item.source.trim() : '',
    }))
    .filter((item) => item.file || item.path || item.role || item.source);
}

function hasReadRole(readEvidence, role) {
  return readEvidence.some((item) => item.role === role || item.source === role);
}

function hasReadPath(readEvidence, pattern) {
  return readEvidence.some((item) => pattern.test(item.file) || pattern.test(item.path));
}

function parseIsoDate(value) {
  if (typeof value !== 'string' || !ISO_DATE_PATTERN.test(value.trim())) return null;
  const date = new Date(`${value.trim()}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(dateText, days) {
  const date = parseIsoDate(dateText);
  if (!date) return '';
  return formatIsoDate(new Date(date.getTime() + (days * DAY_MS)));
}

function extractDayBlock(content, day) {
  const normalized = String(content || '').replace(/\r\n/g, '\n');
  const dayHeader = new RegExp(`^##\\s+${day}[^\\n]*$`, 'm');
  const match = dayHeader.exec(normalized);
  if (!match) return '';
  const start = match.index;
  const rest = normalized.slice(start + match[0].length);
  const nextHeader = /^##\s+Day\d+[^\n]*$/m.exec(rest);
  const activeNextGuard = /^---\s*\n\n##\s+Active \/ Next connection guard/m.exec(rest);
  const candidates = [nextHeader?.index, activeNextGuard?.index]
    .filter((index) => typeof index === 'number')
    .sort((a, b) => a - b);
  const endOffset = candidates.length > 0 ? candidates[0] : rest.length;
  return normalized.slice(start, start + match[0].length + endOffset);
}

function extractTargetLines(block) {
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => (
      line.startsWith('- task:') ||
      line.startsWith('- ') ||
      line.startsWith('must_line:') ||
      line.startsWith('standard_line:') ||
      line.startsWith('stretch_line:') ||
      line.startsWith('|')
    ));
}

function hasQuantitativeLine(block) {
  return L1_L2_PAGE_PATTERN.test(block) || L3_QUESTION_PATTERN.test(block) || SEKOTORE_PATTERN.test(block);
}

function isRestOrUnavailableDay(block) {
  return REST_OR_UNAVAILABLE_PATTERN.test(block);
}

function validateForbiddenVagueTargets(content, errors, prefix = 'forbidden_vague_target') {
  for (const line of String(content || '').split('\n')) {
    for (const vague of FORBIDDEN_VAGUE_TARGETS) {
      if (line.includes(vague)) errors.push(`${prefix}:${vague}`);
    }
  }
}

function validateReadEvidence(readEvidence, errors, { split = false } = {}) {
  const roles = split ? REQUIRED_SPLIT_READ_ROLES : REQUIRED_READ_ROLES;
  for (const role of roles) {
    if (!hasReadRole(readEvidence, role)) errors.push(`missing_read_evidence_role:${role}`);
  }
  if (!hasReadPath(readEvidence, /roadmap\/delta_roadmap\.md$/)) errors.push('missing_read_evidence_path:roadmap/delta_roadmap.md');
  if (!hasReadPath(readEvidence, /plan\/2026_sharoushi_exam_plan\.md$/)) errors.push('missing_read_evidence_path:plan/2026_sharoushi_exam_plan.md');
  if (!hasReadPath(readEvidence, /operations\/active_operations\.md$/)) errors.push('missing_read_evidence_path:operations/active_operations.md');
  if (split && !hasReadPath(readEvidence, /operations\/next_operations\.md$/)) errors.push('missing_read_evidence_path:operations/next_operations.md');
  if (!hasReadPath(readEvidence, /history\/daily\/\d{4}-\d{2}-\d{2}\.md$/)) errors.push('missing_read_evidence_path:latest_daily_history');
}

function validatePreGenerationEvidence(content, errors) {
  if (!/roadmap|roadmap_anchor|roadmap_phase/.test(content)) errors.push('missing_roadmap_read_evidence_in_content');
  if (!/plan_anchor|plan\//.test(content)) errors.push('missing_plan_read_evidence_in_content');
  if (!EXISTING_NEXT_OPS_READ_PATTERN.test(content)) errors.push('missing_existing_active_or_next_operations_read_evidence_in_content');
  if (!/current_position/.test(content)) errors.push('missing_current_position');
  if (!/special_days|L3不可|年休|通勤枠/.test(content)) errors.push('missing_special_days_evidence_in_content');
  if (!/user_capacity|capacity_assumptions|standard_capacity/.test(content)) errors.push('missing_user_capacity_evidence_in_content');
  if (!COMPLETED_SCOPE_PATTERN.test(content)) errors.push('missing_completed_scope_evidence');
}

function validateActiveDays(content, errors) {
  for (const day of REQUIRED_ACTIVE_DAYS) {
    const block = extractDayBlock(content, day);
    if (!block) {
      errors.push(`missing_${day}`);
      continue;
    }
    for (const field of REQUIRED_DAY_FIELDS) {
      const fieldPattern = new RegExp(`(^|\\n)\\s*${field}:`, 'm');
      if (!fieldPattern.test(block)) errors.push(`missing_${day}_${field}`);
    }
    if (!hasQuantitativeLine(block) && !isRestOrUnavailableDay(block)) errors.push(`missing_${day}_quantitative_target`);
    validateForbiddenVagueTargets(extractTargetLines(block).join('\n'), errors, `forbidden_${day}_vague_target`);
  }
}

function validateActiveNextSplit(content, errors) {
  if (!NEXT_OPERATIONS_REF_PATTERN.test(content)) errors.push('missing_next_operations_ref');
  if (NEXT_OPERATIONS_PATTERN.test(content)) errors.push('active_operations_must_not_embed_next_operations_table');
  if (/^##\s+Day[7-9]\b|^##\s+Day\d{2,}\b/m.test(content)) errors.push('active_operations_must_not_contain_D7_or_later');
}

function parseNextRows(content) {
  return String(content || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => NEXT_ROW_PATTERN.test(line))
    .map((line) => {
      const match = NEXT_ROW_PATTERN.exec(line);
      return {
        date: match[1],
        layer: match[2].trim(),
        standardLine: match[3].trim(),
        raw: line,
      };
    });
}

function extractNextHeaderStartDate(content) {
  const match = /^#\s+Next operations:\s*(\d{4}-\d{2}-\d{2})\s*[〜~]/m.exec(content);
  return match?.[1] || '';
}

function extractDeclaredNextStartDate(content) {
  const metadataMatch = /next_start_date:\s*(\d{4}-\d{2}-\d{2})/.exec(content);
  if (metadataMatch) return metadataMatch[1];
  return extractNextHeaderStartDate(content);
}

function extractTargetDate(content) {
  const metadataMatch = /target_date:\s*(\d{4}-\d{2}-\d{2})/.exec(content);
  if (metadataMatch) return metadataMatch[1];
  const headerMatch = /^#\s+Next operations:\s*\d{4}-\d{2}-\d{2}\s*[〜~]\s*(\d{4}-\d{2}-\d{2})/m.exec(content);
  return headerMatch?.[1] || '';
}

function extractExpectedActiveRangeEnd(content) {
  const match = /expected_active_range:\s*\d{4}-\d{2}-\d{2}\s*[〜~]\s*(\d{4}-\d{2}-\d{2})/.exec(content);
  return match?.[1] || '';
}

function extractActiveDay6DueDate(activeOperationsContent = '') {
  const block = extractDayBlock(activeOperationsContent, 'Day6');
  const match = /(?:^|\n)\s*due_date:\s*(\d{4}-\d{2}-\d{2})/.exec(block);
  return match?.[1] || '';
}

function expectedNextStartFromActiveContent(activeOperationsContent = '') {
  const day6DueDate = extractActiveDay6DueDate(activeOperationsContent);
  return day6DueDate ? addDays(day6DueDate, 1) : '';
}

function validateNextStartConnection(content, errors, warnings, options = {}) {
  const declaredStart = extractDeclaredNextStartDate(content);
  const headerStart = extractNextHeaderStartDate(content);
  const expectedActiveRangeEnd = extractExpectedActiveRangeEnd(content);
  const selfExpectedStart = expectedActiveRangeEnd ? addDays(expectedActiveRangeEnd, 1) : '';
  const activeExpectedStart = expectedNextStartFromActiveContent(options.active_operations_content || '');
  const expectedStart = activeExpectedStart || selfExpectedStart;
  const rows = parseNextRows(content);
  const firstRowDate = rows[0]?.date || '';
  if (!declaredStart) errors.push('missing_next_operations_start_date');
  if (headerStart && declaredStart && headerStart !== declaredStart) errors.push(`next_operations_header_start_mismatch:${headerStart}:declared:${declaredStart}`);
  if (firstRowDate && declaredStart && firstRowDate !== declaredStart) errors.push(`next_operations_first_row_start_mismatch:${firstRowDate}:declared:${declaredStart}`);
  if (expectedStart && declaredStart && declaredStart !== expectedStart) errors.push(`next_operations_start_date_must_follow_active_day6:${declaredStart}:expected:${expectedStart}`);
  if (!expectedStart) warnings.push('next_operations_dynamic_start_checked_without_active_day6_source');
}

function rowContainsActualL3(row) {
  const layerHasL3 = /(^|[^A-Za-z0-9])L3([^A-Za-z0-9]|$)/.test(row.layer);
  const lineHasL3Work = /\bL3\b|選択\s*Q|択一\s*Q|過去問講座/.test(row.standardLine);
  const onlyUnavailableNote = /L3不可/.test(row.standardLine) && !/\bL3\b|選択\s*Q|択一\s*Q|過去問講座/.test(row.standardLine.replace(/L3不可日?|L3不可/g, ''));
  return layerHasL3 || (lineHasL3Work && !onlyUnavailableNote);
}

function validateSpecialDayRows(rows, errors) {
  for (const row of rows) {
    if (row.date !== '2026-06-13') continue;
    if (rowContainsActualL3(row)) {
      errors.push('L3_scheduled_on_2026_06_13_unavailable');
    }
  }
}

function validateNextOperationsDailyPlan(content, errors, warnings, options = {}) {
  if (!/^#\s+delta next_operations/m.test(content)) errors.push('missing_delta_next_operations_title');
  if (!/active_operations_ref:\s*systems\/delta\/operations\/active_operations\.md/.test(content)) errors.push('missing_active_operations_ref');
  if (!NEXT_OPERATIONS_PATTERN.test(content)) errors.push('missing_next_operations_section');
  if (extractTargetDate(content) !== '2026-06-30') errors.push('missing_target_date_2026_06_30');

  validateNextStartConnection(content, errors, warnings, options);

  const rangeRows = content.split('\n').filter((line) => DATE_RANGE_ROW_PATTERN.test(line.trim()));
  if (rangeRows.length > 0) errors.push(`next_operations_period_block_rows_forbidden:${rangeRows.length}`);

  const rows = parseNextRows(content);
  validateForbiddenVagueTargets(rows.map((row) => row.raw).join('\n'), errors, 'forbidden_next_vague_target');
  validateSpecialDayRows(rows, errors);
  const rowDates = new Set(rows.map((row) => row.date));
  if (!rowDates.has('2026-06-30')) errors.push('missing_next_operations_target_date:2026-06-30');

  for (const row of rows) {
    const isRest = /確認日|判定|L3不可|なし|休養|接続確認|Q\d+-0/.test(row.standardLine);
    const hasPage = L1_L2_PAGE_PATTERN.test(row.standardLine) || L1_L2_PAGE_RANGE_PATTERN.test(row.standardLine);
    const hasQuestion = L3_QUESTION_PATTERN.test(row.standardLine);
    const hasSekotore = SEKOTORE_PATTERN.test(row.standardLine);
    if (!hasPage && !hasQuestion && !hasSekotore && !isRest) errors.push(`next_row_missing_quantitative_range:${row.date}`);
  }

  if (/2026-05-10[\s\S]{0,120}\|\s*L3\s*\|/.test(content)) errors.push('L3_scheduled_on_2026_05_10_unavailable');
}

export function validateDeltaOperationsContent(content, options = {}) {
  const errors = [];
  const warnings = [];
  const readEvidence = normalizeReadEvidence(options.read_evidence);
  const file = typeof options.file === 'string' ? options.file.trim() : '';
  const splitMode = Boolean(options.split_mode || file === 'active_operations.md' || file === 'next_operations.md');

  if (typeof content !== 'string' || content.trim().length === 0) {
    errors.push('content_empty');
    return { ok: false, errors, warnings, read_evidence: readEvidence, validator_version: DELTA_OPERATIONS_VALIDATOR_VERSION };
  }

  validateL3QuestionIndex(content, errors);

  if (file === 'next_operations.md') {
    validateNextOperationsDailyPlan(content, errors, warnings, options);
    return { ok: errors.length === 0, errors: [...new Set(errors)], warnings, read_evidence: readEvidence, validator_version: DELTA_OPERATIONS_VALIDATOR_VERSION };
  }

  validateReadEvidence(readEvidence, errors, { split: splitMode });
  validatePreGenerationEvidence(content, errors);
  validateActiveDays(content, errors);
  validateActiveNextSplit(content, errors);

  const highPageMatches = [...content.matchAll(/（(\d+)ページ/g)]
    .map((match) => Number(match[1]))
    .filter((pageCount) => Number.isFinite(pageCount) && pageCount > 50);
  if (highPageMatches.length > 0) warnings.push(`l1_l2_page_count_above_guard:${highPageMatches.join(',')}`);

  const highQuestionMatches = [...content.matchAll(/択一[^\n]*（(\d+)問/g)]
    .map((match) => Number(match[1]))
    .filter((questionCount) => Number.isFinite(questionCount) && questionCount > 25);
  if (highQuestionMatches.length > 0) warnings.push(`l3_multiple_choice_count_above_guard:${highQuestionMatches.join(',')}`);

  return { ok: errors.length === 0, errors: [...new Set(errors)], warnings, read_evidence: readEvidence, validator_version: DELTA_OPERATIONS_VALIDATOR_VERSION };
}

function assertDeltaOperationsPreflight(content, options = {}) {
  const validation = validateDeltaOperationsContent(content, options);
  if (validation.ok) return validation;
  throw createError({
    status: 400,
    code: 'DELTA_OPERATIONS_PREFLIGHT_FAILED',
    message: 'Delta operations preflight validation failed',
    category: 'validation',
    step: 'assertDeltaOperationsPreflight',
    resource: 'delta_operations',
    action: 'update',
    retryable: false,
    details: validation,
  });
}

async function readActiveOperationsForNextValidation(options = {}) {
  try {
    const existing = await getContentFile(`${DELTA_OPERATIONS_ROOT}active_operations.md`, {
      step: 'readActiveOperationsForNextValidation',
      resource: 'delta_operations',
      action: 'update',
      branch: options.branch,
    });
    return { content: existing.content || '', sha: existing.sha || '' };
  } catch (error) {
    if (error.code === 'GITHUB_NOT_FOUND') return { content: '', sha: '' };
    throw error;
  }
}

export async function updateDeltaOperations(file, content, message = '', sha = '', options = {}) {
  const path = buildDeltaOperationsPath(file, { step: 'updateDeltaOperations', action: 'update' });
  const activeForNext = file === 'next_operations.md'
    ? await readActiveOperationsForNextValidation(options)
    : { content: '', sha: '' };
  const preflight = assertDeltaOperationsPreflight(content, {
    file,
    split_mode: true,
    read_evidence: options.read_evidence,
    active_operations_content: activeForNext.content,
    active_operations_sha: activeForNext.sha,
  });

  let currentSha = typeof sha === 'string' ? sha.trim() : '';
  if (!currentSha) {
    try {
      const existing = await getContentFile(path, {
        step: 'updateDeltaOperations',
        resource: 'delta_operations',
        action: 'update',
        branch: options.branch,
      });
      currentSha = existing.sha;
    } catch (error) {
      if (error.code === 'GITHUB_NOT_FOUND') {
        throw createError({
          status: 404,
          code: 'NOT_FOUND',
          message: 'Delta operations file not found',
          category: 'service',
          step: 'updateDeltaOperations',
          resource: 'delta_operations',
          action: 'update',
          retryable: false,
          details: { file, path },
        });
      }
      throw error;
    }
  }

  const result = await putContentFile(path, content, normalizeMessage(message, `update ${path}`), currentSha, {
    step: 'updateDeltaOperations',
    resource: 'delta_operations',
    action: 'update',
    branch: options.branch,
  });

  return {
    resource: 'delta_operations',
    root: DELTA_OPERATIONS_ROOT,
    path: result.content.path,
    sha: result.content.sha,
    branch: result.branch,
    status: 'UPDATED',
    write_scope: `${DELTA_OPERATIONS_ROOT}${file}`,
    preflight,
  };
}

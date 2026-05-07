import {
  createError,
  assertSafeRelativePath,
  getContentFile,
  putContentFile,
} from './repo-resource/common.js';

export const DELTA_OPERATIONS_ROOT = 'systems/delta/operations/';
export const DELTA_OPERATIONS_ALLOWED_FILES = ['active_operations.md', 'next_operations.md'];
export const DELTA_OPERATIONS_VALIDATOR_VERSION = 'delta_operations_preflight_2026_05_07_active_next_heading_guard';

const REQUIRED_ACTIVE_DAYS = ['Day0', 'Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6'];

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

const L3_ORDER_SUBJECTS = ['健康保険法', '国民年金法', '厚生年金保険法', '労一', '社一'];

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
];

const L1_L2_PAGE_PATTERN = /P\d+〜P\d+（\d+ページ）/;
const L3_QUESTION_PATTERN = /Q\d+-\d+〜Q\d+-\d+（\d+問(?:、[^）]+)?）/;
const REST_OR_UNAVAILABLE_PATTERN = /新規L1\/L2\/L3なし|L3不可|休養|rest_or_light_review/;
const NEXT_OPERATIONS_PATTERN = /^#{1,6}\s*Next operations\b(?::[^\n]*)?$/mi;
const NEXT_OPERATIONS_SECTION_AFTER_SEPARATOR_PATTERN = /^---\s*\n\n#{1,6}\s+Next operations\b(?::[^\n]*)?$/mi;
const NEXT_OPERATIONS_REF_PATTERN = /next_operations_ref:[\s\S]{0,500}systems\/delta\/operations\/next_operations\.md/;
const EXISTING_NEXT_OPS_READ_PATTERN = /existing_next_operations_read|existing_next_operations_was_read|next_operations_was_read|source_of_truth:[\s\S]*operations_role|current_position_primary_source/;
const COMPLETED_SCOPE_PATTERN = /completed_scope|completed_subject|健康保険法L3の新規演習は完了扱い|健康保険法[\s\S]{0,80}completed/;
const HEALTH_INSURANCE_NEW_L3_PATTERN = /健康保険法\s*L3\s*(?:1巡目\s*)?(?:選択|択一|選択問題|択一問題)\s*Q/;
const HEALTH_INSURANCE_ALLOWED_CONTEXT_PATTERN = /recovery_targets|defer_targets|deferred|review|2巡目|弱点回収|誤答再演習|参考/;
const DATE_RANGE_ROW_PATTERN = /^\|\s*\d{4}-\d{2}-\d{2}\s*[〜~]\s*\d{4}-\d{2}-\d{2}\s*\|/;
const NEXT_ROW_PATTERN = /^\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*([^|]+)\|\s*([^|]+)\|/;

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

function normalizeContent(content) {
  return String(content || '').replace(/\r\n/g, '\n');
}

function extractDayBlock(content, day) {
  const normalized = normalizeContent(content);
  const dayHeader = new RegExp(`^##\\s+${day}[^\\n]*$`, 'm');
  const match = dayHeader.exec(normalized);
  if (!match) return '';

  const start = match.index;
  const rest = normalized.slice(start + match[0].length);
  const nextHeader = /^##\s+Day\d+[^\n]*$/m.exec(rest);
  const nextSection = NEXT_OPERATIONS_SECTION_AFTER_SEPARATOR_PATTERN.exec(rest);
  const activeNextGuard = /^---\s*\n\n##\s+Active \/ Next connection guard/m.exec(rest);
  const candidates = [nextHeader?.index, nextSection?.index, activeNextGuard?.index]
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
      line.startsWith('stretch_line:')
    ));
}

function hasQuantitativeLine(block) {
  return L1_L2_PAGE_PATTERN.test(block) || L3_QUESTION_PATTERN.test(block);
}

function isRestOrUnavailableDay(block) {
  return REST_OR_UNAVAILABLE_PATTERN.test(block);
}

function validateForbiddenVagueTargetsInDay(day, block, errors) {
  for (const line of extractTargetLines(block)) {
    for (const vague of FORBIDDEN_VAGUE_TARGETS) {
      if (line.includes(vague)) errors.push(`forbidden_${day}_vague_target:${vague}`);
    }
  }
}

function extractNextOperations(content) {
  const normalized = normalizeContent(content);
  const match = NEXT_OPERATIONS_PATTERN.exec(normalized);
  if (!match) return '';
  return normalized.slice(match.index);
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
  if (!/special_days|L3不可|年休/.test(content)) errors.push('missing_special_days_evidence_in_content');
  if (!/user_capacity|capacity_assumptions|standard_capacity/.test(content)) errors.push('missing_user_capacity_evidence_in_content');
}

function validateCompletedScope(content, errors) {
  if (!COMPLETED_SCOPE_PATTERN.test(content)) {
    errors.push('missing_completed_scope_evidence');
    return;
  }
  const nextOperations = extractNextOperations(content);
  const healthInsuranceNew = HEALTH_INSURANCE_NEW_L3_PATTERN.exec(nextOperations);
  if (healthInsuranceNew) {
    const lineStart = nextOperations.lastIndexOf('\n', healthInsuranceNew.index);
    const lineEnd = nextOperations.indexOf('\n', healthInsuranceNew.index);
    const line = nextOperations.slice(lineStart + 1, lineEnd === -1 ? undefined : lineEnd);
    if (!HEALTH_INSURANCE_ALLOWED_CONTEXT_PATTERN.test(line)) {
      errors.push('completed_health_insurance_L3_reintroduced_as_new_work');
    }
  }
}

function hasIncompleteNationalPensionL1L2(content) {
  if (!content.includes('国民年金法')) return false;
  const normalized = normalizeContent(content);
  const hasNationalPension = normalized.includes('国民年金法');
  const hasIncomplete = /completion_status\s*[:：]\s*incomplete|status\s*[:：]\s*incomplete|\bincomplete\b|未完了/.test(normalized);
  const hasNextPage = /next_start_page\s*[:：]\s*["']?P(?:158|220)["']?|P158以降未完了|P220以降未完了/.test(normalized);
  const hasLayer = /(^|[^A-Za-z0-9])L[12]([^A-Za-z0-9]|$)|L1\/L2|L1_L2/.test(normalized);
  return hasNationalPension && hasIncomplete && hasNextPage && hasLayer;
}

function hasEmployeePensionL1L2InNextOperations(content) {
  const nextOperations = extractNextOperations(content);
  if (!nextOperations.includes('厚生年金保険法')) return false;

  const lineHit = nextOperations
    .split('\n')
    .some((line) => (
      line.includes('厚生年金保険法') &&
      /(^|[^A-Za-z0-9])L[12]([^A-Za-z0-9]|$)/.test(line) &&
      L1_L2_PAGE_PATTERN.test(line)
    ));

  const tableOrSeparatedHit = /厚生年金保険法[\s\S]{0,250}(^|[^A-Za-z0-9])L[12]([^A-Za-z0-9]|$)[\s\S]{0,250}P\d+〜P\d+（\d+ページ）/.test(nextOperations);

  return lineHit || tableOrSeparatedHit;
}

function hasExplicitNationalPensionCompletionBeforeEmployeePension(content) {
  return /国民年金法[\s\S]{0,500}(?:completion_status\s*[:：]\s*completed|status\s*[:：]\s*completed|completed\s*[:：]\s*true)[\s\S]{0,500}厚生年金保険法/.test(content);
}

function validateL1L2Continuity(content, errors) {
  if (
    hasIncompleteNationalPensionL1L2(content) &&
    hasEmployeePensionL1L2InNextOperations(content) &&
    !hasExplicitNationalPensionCompletionBeforeEmployeePension(content)
  ) {
    errors.push('current_L1_L2_subject_skipped_before_completion');
  }
}

function hasExplicitL3SelectedCompletion(content, subject) {
  const escaped = subject.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const explicitStructuredStatus = new RegExp(`${escaped}[\\s\\S]{0,500}(?:selected_completion_status\\s*[:：]\\s*completed|selected_questions\\s*[:：]\\s*completed|L3_selected\\s*[:：]\\s*completed|completed_selected\\s*[:：]\\s*true|L3_selected:[\\s\\S]{0,100}completed:\\s*true)`).test(content);
  const explicitSelectedLine = new RegExp(`${escaped}[^\\n]*(?:L3)?[^\\n]*選択[^\\n]*(?:completion_status\\s*[:：]\\s*completed|completed\\s*[:：]\\s*true)`).test(content);
  return explicitStructuredStatus || explicitSelectedLine;
}

function lineHasSubjectL3Type(line, subject, type) {
  return (
    line.includes(subject) &&
    line.includes('L3') &&
    line.includes(type) &&
    L3_QUESTION_PATTERN.test(line)
  );
}

function validateL3Order(content, errors) {
  const nextOperations = extractNextOperations(content);
  const lines = nextOperations.split('\n').map((line) => line.trim()).filter(Boolean);

  for (const subject of L3_ORDER_SUBJECTS) {
    let selectedSeen = hasExplicitL3SelectedCompletion(content, subject);

    for (const line of lines) {
      if (lineHasSubjectL3Type(line, subject, '選択')) selectedSeen = true;
      if (lineHasSubjectL3Type(line, subject, '択一') && !selectedSeen) {
        errors.push(`L3_order_violation_${subject}_takuitsu_before_selected`);
        break;
      }
    }
  }
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
    validateForbiddenVagueTargetsInDay(day, block, errors);
  }
}

function validateActiveNextSplit(content, errors) {
  if (!NEXT_OPERATIONS_REF_PATTERN.test(content)) errors.push('missing_next_operations_ref');
  if (NEXT_OPERATIONS_PATTERN.test(content)) errors.push('active_operations_must_not_embed_next_operations_table');
  if (!/active_day6_standard_end:\s*P245|active_day6_standard_end: P245|Day6[\s\S]*P220〜P245/.test(content)) {
    errors.push('missing_active_day6_next_connection');
  }
}

function parseNextRows(content) {
  return normalizeContent(content)
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

function validateNextOperationsDailyPlan(content, errors, warnings) {
  const normalized = normalizeContent(content);
  if (!/^#\s+delta next_operations/m.test(normalized)) errors.push('missing_delta_next_operations_title');
  if (!/active_operations_ref:\s*systems\/delta\/operations\/active_operations\.md/.test(normalized)) errors.push('missing_active_operations_ref');
  if (!/target_date:\s*2026-06-30/.test(normalized)) errors.push('missing_target_date_2026_06_30');
  if (!NEXT_OPERATIONS_PATTERN.test(normalized)) errors.push('missing_next_operations_section');

  const rangeRows = normalized.split('\n').filter((line) => DATE_RANGE_ROW_PATTERN.test(line.trim()));
  if (rangeRows.length > 0) errors.push(`next_operations_period_block_rows_forbidden:${rangeRows.length}`);

  const rows = parseNextRows(normalized);
  const rowDates = new Set(rows.map((row) => row.date));

  if (!rowDates.has('2026-05-13')) errors.push('missing_next_operations_start_date:2026-05-13');
  if (!rowDates.has('2026-06-30')) errors.push('missing_next_operations_target_date:2026-06-30');
  if (!/2026-05-13[\s\S]{0,120}P246〜P280（35ページ）/.test(normalized)) errors.push('missing_active_next_connection_first_row');

  for (const row of rows) {
    const isRest = /確認日|判定|回収日|L3不可|なし/.test(row.standardLine);
    const hasPage = L1_L2_PAGE_PATTERN.test(row.standardLine);
    const hasQuestion = L3_QUESTION_PATTERN.test(row.standardLine) || /\d+問/.test(row.standardLine);
    if (!hasPage && !hasQuestion && !isRest) errors.push(`next_row_missing_quantitative_range:${row.date}`);
    for (const vague of FORBIDDEN_VAGUE_TARGETS) {
      if (row.standardLine.includes(vague)) errors.push(`forbidden_next_row_vague_target:${row.date}:${vague}`);
    }
  }

  if (/2026-05-10[\s\S]{0,120}\|\s*L3\s*\|/.test(normalized)) errors.push('L3_scheduled_on_2026_05_10_unavailable');
  if (/2026-06-13[\s\S]{0,120}\|\s*L3\s*\|/.test(normalized)) errors.push('L3_scheduled_on_2026_06_13_unavailable');
  if (!/2026-06-30[\s\S]{0,120}L3/.test(normalized)) warnings.push('annual_leave_2026_06_30_l3_not_used');
}

export function validateDeltaOperationsContent(content, options = {}) {
  const errors = [];
  const warnings = [];
  const readEvidence = normalizeReadEvidence(options.read_evidence);
  const file = typeof options.file === 'string' ? options.file.trim() : '';
  const splitMode = Boolean(options.split_mode || file === 'active_operations.md' || file === 'next_operations.md');
  const normalized = normalizeContent(content);

  if (normalized.trim().length === 0) {
    errors.push('content_empty');
    return { ok: false, errors, warnings, read_evidence: readEvidence, validator_version: DELTA_OPERATIONS_VALIDATOR_VERSION };
  }

  if (file === 'next_operations.md') {
    validateNextOperationsDailyPlan(normalized, errors, warnings);
    return {
      ok: errors.length === 0,
      errors,
      warnings,
      read_evidence: readEvidence,
      validator_version: DELTA_OPERATIONS_VALIDATOR_VERSION,
    };
  }

  validateReadEvidence(readEvidence, errors, { split: splitMode });
  validatePreGenerationEvidence(normalized, errors);
  validateCompletedScope(normalized, errors);
  validateL1L2Continuity(normalized, errors);
  validateL3Order(normalized, errors);
  validateActiveDays(normalized, errors);

  if (splitMode) {
    validateActiveNextSplit(normalized, errors);
  } else if (!NEXT_OPERATIONS_PATTERN.test(normalized)) {
    errors.push('missing_next_operations_section');
  }

  const highPageMatches = [...normalized.matchAll(/（(\d+)ページ）/g)]
    .map((match) => Number(match[1]))
    .filter((pageCount) => Number.isFinite(pageCount) && pageCount > 50);
  if (highPageMatches.length > 0) warnings.push(`l1_l2_page_count_above_guard:${highPageMatches.join(',')}`);

  const highQuestionMatches = [...normalized.matchAll(/択一[^\n]*（(\d+)問/g)]
    .map((match) => Number(match[1]))
    .filter((questionCount) => Number.isFinite(questionCount) && questionCount > 25);
  if (highQuestionMatches.length > 0) warnings.push(`l3_multiple_choice_count_above_guard:${highQuestionMatches.join(',')}`);

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    read_evidence: readEvidence,
    validator_version: DELTA_OPERATIONS_VALIDATOR_VERSION,
  };
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

export async function updateDeltaOperations(file, content, message = '', sha = '', options = {}) {
  const path = buildDeltaOperationsPath(file, {
    step: 'updateDeltaOperations',
    action: 'update',
  });

  const preflight = assertDeltaOperationsPreflight(content, {
    file,
    split_mode: true,
    read_evidence: options.read_evidence,
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

  const result = await putContentFile(
    path,
    content,
    normalizeMessage(message, `update ${path}`),
    currentSha,
    {
      step: 'updateDeltaOperations',
      resource: 'delta_operations',
      action: 'update',
      branch: options.branch,
    }
  );

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

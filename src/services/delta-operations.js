import {
  createError,
  assertSafeRelativePath,
  getContentFile,
  putContentFile,
} from './repo-resource/common.js';

export const DELTA_OPERATIONS_ROOT = 'systems/delta/operations/';
export const DELTA_OPERATIONS_ALLOWED_FILES = ['active_operations.md'];
export const DELTA_OPERATIONS_VALIDATOR_VERSION = 'delta_operations_preflight_2026_05_05_1C_table_guard';

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
const NEXT_OPERATIONS_PATTERN = /#\s*Next operations:/;
const EXISTING_NEXT_OPS_READ_PATTERN = /existing_next_operations_read|existing_next_operations_was_read|source_of_truth:[\s\S]*operations_role|current_position_primary_source/;
const COMPLETED_SCOPE_PATTERN = /completed_scope|completed_subject|健康保険法L3の新規演習は完了扱い|健康保険法[\s\S]{0,80}completed/;
const HEALTH_INSURANCE_NEW_L3_PATTERN = /健康保険法\s*L3\s*(?:1巡目\s*)?(?:選択|択一|選択問題|択一問題)\s*Q/;
const HEALTH_INSURANCE_ALLOWED_CONTEXT_PATTERN = /recovery_targets|defer_targets|deferred|review|2巡目|弱点回収|誤答再演習|参考/;

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

function extractDayBlock(content, day) {
  const dayHeader = new RegExp(`^##\\s+${day}[^\\n]*$`, 'm');
  const match = dayHeader.exec(content);
  if (!match) return '';

  const start = match.index;
  const rest = content.slice(start + match[0].length);
  const nextHeader = /^##\s+Day\d+[^\n]*$/m.exec(rest);
  const nextSection = /^---\s*\n\n#\s+Next operations:/m.exec(rest);
  const candidates = [nextHeader?.index, nextSection?.index]
    .filter((index) => typeof index === 'number')
    .sort((a, b) => a - b);
  const endOffset = candidates.length > 0 ? candidates[0] : rest.length;
  return content.slice(start, start + match[0].length + endOffset);
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
  const match = NEXT_OPERATIONS_PATTERN.exec(content);
  if (!match) return '';
  return content.slice(match.index);
}

function validateReadEvidence(readEvidence, errors) {
  for (const role of REQUIRED_READ_ROLES) {
    if (!hasReadRole(readEvidence, role)) errors.push(`missing_read_evidence_role:${role}`);
  }
  if (!hasReadPath(readEvidence, /roadmap\/delta_roadmap\.md$/)) errors.push('missing_read_evidence_path:roadmap/delta_roadmap.md');
  if (!hasReadPath(readEvidence, /plan\/2026_sharoushi_exam_plan\.md$/)) errors.push('missing_read_evidence_path:plan/2026_sharoushi_exam_plan.md');
  if (!hasReadPath(readEvidence, /operations\/active_operations\.md$/)) errors.push('missing_read_evidence_path:operations/active_operations.md');
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
  const normalized = content.replace(/\r\n/g, '\n');
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
  return /国民年金法[\s\S]{0,500}(?:completion_status\s*[:：]\s*completed|completed|完了)[\s\S]{0,500}厚生年金保険法/.test(content);
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

function validateL3Order(content, errors) {
  const nextOperations = extractNextOperations(content);
  const subjectMatches = [...nextOperations.matchAll(/([^|\n]*?)(健康保険法|国民年金法|厚生年金保険法|労一|社一)[^|\n]*?L3[^|\n]*?(選択|択一)/g)];
  const seen = new Map();

  for (const match of subjectMatches) {
    const subject = match[2];
    const type = match[3];
    const state = seen.get(subject) || { selected: false, takuitsuBeforeSelected: false };
    if (type === '選択') state.selected = true;
    if (type === '択一' && !state.selected) state.takuitsuBeforeSelected = true;
    seen.set(subject, state);
  }

  for (const [subject, state] of seen) {
    const explicitlyCompletedSelected = new RegExp(`${subject}[\\s\\S]{0,120}(?:選択[^\\n]*(?:completed|完了)|selected_questions:\\s*completed)`).test(content);
    if (state.takuitsuBeforeSelected && !explicitlyCompletedSelected) {
      errors.push(`L3_order_violation_${subject}_takuitsu_before_selected`);
    }
  }
}

export function validateDeltaOperationsContent(content, options = {}) {
  const errors = [];
  const warnings = [];
  const readEvidence = normalizeReadEvidence(options.read_evidence);

  if (typeof content !== 'string' || content.trim().length === 0) {
    errors.push('content_empty');
    return { ok: false, errors, warnings, read_evidence: readEvidence, validator_version: DELTA_OPERATIONS_VALIDATOR_VERSION };
  }

  validateReadEvidence(readEvidence, errors);
  validatePreGenerationEvidence(content, errors);
  validateCompletedScope(content, errors);
  validateL1L2Continuity(content, errors);
  validateL3Order(content, errors);

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

  if (!NEXT_OPERATIONS_PATTERN.test(content)) errors.push('missing_next_operations_section');

  const highPageMatches = [...content.matchAll(/（(\d+)ページ）/g)]
    .map((match) => Number(match[1]))
    .filter((pageCount) => Number.isFinite(pageCount) && pageCount > 50);
  if (highPageMatches.length > 0) warnings.push(`l1_l2_page_count_above_guard:${highPageMatches.join(',')}`);

  const highQuestionMatches = [...content.matchAll(/択一[^\n]*（(\d+)問/g)]
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
    write_scope: `${DELTA_OPERATIONS_ROOT}active_operations.md`,
    preflight,
  };
}

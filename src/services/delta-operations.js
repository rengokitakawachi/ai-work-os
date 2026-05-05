import {
  createError,
  assertSafeRelativePath,
  getContentFile,
  putContentFile,
} from './repo-resource/common.js';

export const DELTA_OPERATIONS_ROOT = 'systems/delta/operations/';
export const DELTA_OPERATIONS_ALLOWED_FILES = ['active_operations.md'];

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
const NEXT_OPERATIONS_PATTERN = /#\s*Next operations:/;

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
      details: {
        file: safe,
        expected_root: DELTA_OPERATIONS_ROOT,
      },
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
      details: {
        file: safe,
        allowed_files: DELTA_OPERATIONS_ALLOWED_FILES,
      },
    });
  }

  return `${DELTA_OPERATIONS_ROOT}${safe}`;
}

function normalizeMessage(message, fallback) {
  const safeMessage = typeof message === 'string' ? message.trim() : '';
  return safeMessage || fallback;
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

function hasQuantitativeLine(block) {
  return L1_L2_PAGE_PATTERN.test(block) || L3_QUESTION_PATTERN.test(block);
}

export function validateDeltaOperationsContent(content) {
  const errors = [];
  const warnings = [];

  if (typeof content !== 'string' || content.trim().length === 0) {
    errors.push('content_empty');
    return { ok: false, errors, warnings };
  }

  for (const day of REQUIRED_ACTIVE_DAYS) {
    const block = extractDayBlock(content, day);
    if (!block) {
      errors.push(`missing_${day}`);
      continue;
    }

    for (const field of REQUIRED_DAY_FIELDS) {
      const fieldPattern = new RegExp(`(^|\\n)\\s*${field}:`, 'm');
      if (!fieldPattern.test(block)) {
        errors.push(`missing_${day}_${field}`);
      }
    }

    if (!hasQuantitativeLine(block)) {
      errors.push(`missing_${day}_quantitative_target`);
    }
  }

  if (!NEXT_OPERATIONS_PATTERN.test(content)) {
    errors.push('missing_next_operations_section');
  }

  for (const vague of FORBIDDEN_VAGUE_TARGETS) {
    if (content.includes(vague)) {
      errors.push(`forbidden_vague_target:${vague}`);
    }
  }

  const highPageMatches = [...content.matchAll(/（(\d+)ページ）/g)]
    .map((match) => Number(match[1]))
    .filter((pageCount) => Number.isFinite(pageCount) && pageCount > 50);
  if (highPageMatches.length > 0) {
    warnings.push(`l1_l2_page_count_above_guard:${highPageMatches.join(',')}`);
  }

  const highQuestionMatches = [...content.matchAll(/択一[^\n]*（(\d+)問/g)]
    .map((match) => Number(match[1]))
    .filter((questionCount) => Number.isFinite(questionCount) && questionCount > 25);
  if (highQuestionMatches.length > 0) {
    warnings.push(`l3_multiple_choice_count_above_guard:${highQuestionMatches.join(',')}`);
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
}

function assertDeltaOperationsPreflight(content) {
  const validation = validateDeltaOperationsContent(content);
  if (validation.ok) {
    return validation;
  }

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

export async function updateDeltaOperations(
  file,
  content,
  message = '',
  sha = '',
  options = {}
) {
  const path = buildDeltaOperationsPath(file, {
    step: 'updateDeltaOperations',
    action: 'update',
  });

  const preflight = assertDeltaOperationsPreflight(content);

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
          details: {
            file,
            path,
          },
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

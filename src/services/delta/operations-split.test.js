import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { validateDeltaOperationsContent } from '../delta-operations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '../../..');

function readRepoFile(path) {
  return readFileSync(resolve(repoRoot, path), 'utf8');
}

function splitReadEvidence() {
  return [
    { role: 'roadmap', file: 'roadmap/delta_roadmap.md', path: 'roadmap/delta_roadmap.md', sha: 'roadmap-sha' },
    { role: 'plan', file: 'plan/2026_sharoushi_exam_plan.md', path: 'plan/2026_sharoushi_exam_plan.md', sha: 'plan-sha' },
    { role: 'active_operations', file: 'operations/active_operations.md', path: 'operations/active_operations.md', sha: 'active-sha' },
    { role: 'next_operations', file: 'operations/next_operations.md', path: 'operations/next_operations.md', sha: 'next-sha' },
    { role: 'latest_daily_history', file: 'history/daily/2026-05-05.md', path: 'history/daily/2026-05-05.md', sha: 'daily-sha' },
    { role: 'completed_subjects', file: 'history/daily/2026-05-05.md', path: 'history/daily/2026-05-05.md', sha: 'daily-sha' },
    { role: 'special_days', file: 'roadmap/delta_roadmap.md', path: 'roadmap/delta_roadmap.md', sha: 'roadmap-sha' },
    { role: 'user_capacity', file: 'plan/2026_sharoushi_exam_plan.md', path: 'plan/2026_sharoushi_exam_plan.md', sha: 'plan-sha' },
  ];
}

function buildActiveWithDay6(day6DueDate) {
  return `# delta active_operations

## Day6（${day6DueDate}）

- task: Active Day6 connection source
  due_date: ${day6DueDate}
  plan_anchor: test
  expected_position: 国民年金法 L2 P245完了
  current_position: test
  gap_status: test
  operation_mode: test
  must_line:
    - 国民年金法 L2 P236〜P240（5ページ）
  standard_line:
    - 国民年金法 L2 P236〜P245（10ページ）
  stretch_line:
    - 国民年金法 L2 P236〜P245（10ページ）
  recovery_targets:
    - test
  defer_targets:
    - test
  recompute_triggers:
    - test
`;
}

test('split active_operations fixture is preflight-valid and does not embed Next operations table', () => {
  const content = readRepoFile('systems/delta/operations/active_operations.md');
  const validation = validateDeltaOperationsContent(content, {
    file: 'active_operations.md',
    split_mode: true,
    read_evidence: splitReadEvidence(),
  });

  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
  assert.doesNotMatch(content, /# Next operations:/);
  assert.match(content, /next_operations_ref:/);
});

test('split next_operations fixture is preflight-valid and daily-grained through 2026-06-30', () => {
  const content = readRepoFile('systems/delta/operations/next_operations.md');
  const validation = validateDeltaOperationsContent(content, {
    file: 'next_operations.md',
    split_mode: true,
  });

  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
  assert.match(content, /# Next operations: \d{4}-\d{2}-\d{2}〜2026-06-30/);
  assert.match(content, /\| 2026-06-30 \|/);
  assert.doesNotMatch(content, /^\|\s*2026-06-01〜2026-06-30\s*\|/m);
});

test('next_operations split preflight accepts D7 start from active Day6 plus one day', () => {
  const content = readRepoFile('systems/delta/operations/next_operations.md');
  const validation = validateDeltaOperationsContent(content, {
    file: 'next_operations.md',
    split_mode: true,
    active_operations_content: buildActiveWithDay6('2026-05-12'),
  });

  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
});

test('next_operations split preflight rejects stale start date when active Day6 moved', () => {
  const content = readRepoFile('systems/delta/operations/next_operations.md');
  const validation = validateDeltaOperationsContent(content, {
    file: 'next_operations.md',
    split_mode: true,
    active_operations_content: buildActiveWithDay6('2026-05-15'),
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.errors.some((error) => error === 'next_operations_start_date_must_follow_active_day6:2026-05-13:expected:2026-05-16'));
});

test('active_operations split preflight rejects embedded Next operations table', () => {
  const content = `${readRepoFile('systems/delta/operations/active_operations.md')}\n# Next operations: 2026-05-13〜2026-06-30\n\n| Date | Layer | Standard line |\n|---|---|---|\n| 2026-05-13 | L2 | 国民年金法 L2 P246〜P280（35ページ） |\n`;
  const validation = validateDeltaOperationsContent(content, {
    file: 'active_operations.md',
    split_mode: true,
    read_evidence: splitReadEvidence(),
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.errors.includes('active_operations_must_not_embed_next_operations_table'));
});

test('next_operations split preflight rejects period block rows', () => {
  const content = readRepoFile('systems/delta/operations/next_operations.md').replace(
    '| 2026-05-18 | L1/L2 | 平日仕事日のL3なし。国民年金法完了後、厚生年金保険法 L1/L2 P1〜P35 へ移行 |',
    '| 2026-05-18〜2026-05-22 | L1/L2 | 平日仕事日のL3なし。厚生年金保険法 L1/L2 前半へ移行 |'
  );
  const validation = validateDeltaOperationsContent(content, {
    file: 'next_operations.md',
    split_mode: true,
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.errors.some((error) => error.startsWith('next_operations_period_block_rows_forbidden')));
});

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

function buildActiveWithDay6(day6DueDate) {
  return `# delta active_operations

## Day6（${day6DueDate}）

- task: Active Day6 connection source
  due_date: ${day6DueDate}
  plan_anchor: test
  expected_position: test
  current_position: test
  gap_status: test
  operation_mode: test
  must_line:
    - 社一 L2 P1〜P20（20ページ）
  standard_line:
    - 社一 L2 P1〜P20（20ページ）
  stretch_line:
    - 社一 L2 P1〜P20（20ページ）
  recovery_targets:
    - test
  defer_targets:
    - test
  recompute_triggers:
    - test
`;
}

function replaceRow(date, layer, standardLine) {
  const content = readRepoFile('systems/delta/operations/next_operations.md');
  const rowPattern = new RegExp(`\\| ${date} \\|[^\\n]+`);
  return content.replace(rowPattern, `| ${date} | ${layer} | ${standardLine} |`);
}

function validate(content) {
  return validateDeltaOperationsContent(content, {
    file: 'next_operations.md',
    split_mode: true,
    active_operations_content: buildActiveWithDay6('2026-05-15'),
  });
}

test('L3 unavailable day rejects only actual L3 work', () => {
  const content = replaceRow('2026-06-13', 'L3', '厚生年金保険法 L3 択一 Q11-2〜Q15-12（16問）');
  const validation = validate(content);

  assert.equal(validation.ok, false);
  assert.ok(validation.errors.includes('L3_scheduled_on_2026-06-13_unavailable'));
});

test('L3 unavailable day allows L2 commute work', () => {
  const content = replaceRow('2026-06-13', 'L2', '社一 L2 P1〜P25（25ページ・通勤枠）');
  const validation = validate(content);

  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
});

test('L3 unavailable day allows L1/L2 commute work', () => {
  const content = replaceRow('2026-06-13', 'L1/L2', '社一 L1 P1〜P20（20ページ・通勤枠）＋社一 L2 P1〜P20（20ページ・通勤枠）');
  const validation = validate(content);

  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
});

test('L3 unavailable day allows sekotore only row', () => {
  const content = replaceRow('2026-06-13', 'rest', '秒トレ40問');
  const validation = validate(content);

  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
});

test('Other L3 unavailable days use the same generalized rule', () => {
  const content = replaceRow('2026-06-26', 'L3', '社一 L3 択一 Q1-1〜Q3-2（16問）');
  const validation = validate(content);

  assert.equal(validation.ok, false);
  assert.ok(validation.errors.includes('L3_scheduled_on_2026-06-26_unavailable'));
});

import test from 'node:test';
import assert from 'node:assert/strict';

import { buildDeltaOperationsDraft, DELTA_OPERATIONS_GENERATOR_VERSION } from './operations-generator.js';
import { validateDeltaOperationsContent } from '../delta-operations.js';

const roadmapContent = '# roadmap\n\nroadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ\n';
const planContent = '# plan\n\nplan_anchor: 2026-06-30 1巡目完了必達\n';
const activeOperationsContent = '# existing operations\n\nexisting_next_operations_read: true\n国民年金法 selected_completion_status: incomplete\n';
const latestDailyHistoryContent = '# daily\n\n健康保険法L3の新規演習は完了扱い\n次の再開地点：国民年金法 L3 選択問題\n';

function buildOptions() {
  return {
    roadmapContent,
    roadmapSha: 'roadmap-sha',
    planContent,
    planSha: 'plan-sha',
    activeOperationsContent,
    activeOperationsSha: 'active-sha',
    latestDailyHistoryContent,
    latestDailyHistoryPath: 'history/daily/2026-05-04.md',
    latestDailyHistorySha: 'daily-sha',
    updatedAt: '2026-05-05',
  };
}

test('buildDeltaOperationsDraft returns preflight-valid operations content', () => {
  const draft = buildDeltaOperationsDraft(buildOptions());

  const validation = validateDeltaOperationsContent(draft.content, {
    read_evidence: draft.read_evidence,
  });

  assert.equal(draft.generator_version, DELTA_OPERATIONS_GENERATOR_VERSION);
  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
  assert.deepEqual(validation.errors, []);
});

test('buildDeltaOperationsDraft includes D0-D6 and Next operations', () => {
  const draft = buildDeltaOperationsDraft(buildOptions());

  for (const day of ['Day0', 'Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6']) {
    assert.match(draft.content, new RegExp(`## ${day}`));
  }

  assert.match(draft.content, /# Next operations: 2026-05-12〜2026-06-30/);
  assert.match(draft.content, /roadmap_anchor:/);
  assert.match(draft.content, /existing_next_operations_read:/);
  assert.match(draft.content, /completed_scope_evidence:/);
});

test('buildDeltaOperationsDraft does not schedule known invalid work', () => {
  const draft = buildDeltaOperationsDraft(buildOptions());

  assert.doesNotMatch(draft.content, /健康保険法\s+L3\s+(?:選択|択一)\s+Q/);
  assert.doesNotMatch(draft.content, /厚生年金保険法\s+L[12]\s+P\d+〜P\d+（\d+ページ）/);
  assert.doesNotMatch(draft.content, /国民年金法\s+L3\s+択一\s+Q\d+-\d+〜Q\d+-\d+（\d+問/);
});

test('buildDeltaOperationsDraft returns required read evidence roles', () => {
  const draft = buildDeltaOperationsDraft(buildOptions());
  const roles = draft.read_evidence.map((item) => item.role);

  for (const role of [
    'roadmap',
    'plan',
    'active_operations',
    'latest_daily_history',
    'completed_subjects',
    'special_days',
    'user_capacity',
  ]) {
    assert.ok(roles.includes(role), `missing role ${role}`);
  }
});

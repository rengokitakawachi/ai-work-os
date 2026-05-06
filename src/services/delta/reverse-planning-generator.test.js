import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildDeltaReversePlanningDraft,
  parseMaterialCatalog,
  DELTA_REVERSE_PLANNING_GENERATOR_VERSION,
} from './reverse-planning-generator.js';
import { validateDeltaOperationsContent } from '../delta-operations.js';

const roadmapContent = `# Delta Roadmap

## Goal

2026-08-23 の社会保険労務士試験合格に向けて、学習計画・進捗管理・復習接続・学習ログ管理を継続運用する。

## Phase 1: 1巡目完了フェーズ

Period: 2026-04-27〜2026-06-30

### L3 unavailable days

| Date | 扱い |
|---|---|
| 2026-05-10 | L3不可 |
| 2026-06-13 | L3不可 |
`;

const planContent = `# 2026 Sharoushi Exam Plan

## Exam date

2026-08-23

## 2026-05-18〜2026-05-31

目的:

- 厚生年金保険法のL1/L2へ入る
- 厚生年金保険法L3選択問題へ接続

## 2026-06-01〜2026-06-30

目的:

- 労一・社一を進める
- 厚生年金保険法L3を完了
- 労一・社一L3を回収
- 6月末までに1巡完了状態を作る
`;

const activeOperationsContent = `# delta active_operations

current_position:
  as_of: 2026-05-05
  L1:
    subject: 国民年金法
    current_position: P219完了
    next_start_page: P220
    completion_status: incomplete
  L2:
    subject: 国民年金法
    current_position: P158以降未完了
    next_start_page: P158
    completion_status: incomplete
  L3:
    subject: 国民年金法
    selected_completion_status: incomplete
    selected_next_question: Q15-1
`;

const latestDailyHistoryContent = `# DELTA Daily History 2026-05-04

- 健康保険法L3の新規演習は完了扱い
- 次の再開地点：国民年金法 L3 選択問題
`;

const materialCatalogContent = `# material catalog

- 国民年金法: L1=280 L2=280 選択=20 択一=80
- 厚生年金保険法: L1=180 L2=180 選択=30 択一=90
- 労一: L1=120 L2=120 選択=20 択一=40
- 社一: L1=120 L2=120 選択=20 択一=40
`;

function baseOptions(extra = {}) {
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
    materialCatalogContent,
    updatedAt: '2026-05-05',
    startDate: '2026-05-05',
    ...extra,
  };
}

test('parseMaterialCatalog extracts subject remaining scopes', () => {
  const catalog = parseMaterialCatalog(materialCatalogContent);

  assert.equal(catalog['国民年金法'].l1Pages, 280);
  assert.equal(catalog['国民年金法'].selectedQuestions, 20);
  assert.equal(catalog['厚生年金保険法'].multipleChoiceQuestions, 90);
});

test('buildDeltaReversePlanningDraft fails closed without material catalog', () => {
  const draft = buildDeltaReversePlanningDraft(baseOptions({ materialCatalogContent: '' }));

  assert.equal(draft.ok, false);
  assert.equal(draft.status, 'missing_material_catalog');
  assert.ok(draft.errors.includes('missing_material_catalog'));
  assert.equal(draft.content, '');
});

test('buildDeltaReversePlanningDraft reverse-plans from roadmap plan current position and catalog', () => {
  const draft = buildDeltaReversePlanningDraft(baseOptions());

  assert.equal(draft.ok, true);
  assert.equal(draft.generator_version, DELTA_REVERSE_PLANNING_GENERATOR_VERSION);
  assert.equal(draft.exam_date, '2026-08-23');
  assert.equal(draft.target_date, '2026-06-30');
  assert.equal(draft.remaining_queue_empty, true);
  assert.match(draft.content, /mode: reverse_planning_catalog_gated/);
  assert.match(draft.content, /# Active operations: D0〜D6/);
  assert.match(draft.content, /# Next operations:/);
  assert.match(draft.content, /厚生年金保険法/);
  assert.match(draft.content, /労一/);
  assert.match(draft.content, /社一/);
  assert.doesNotMatch(draft.content, /健康保険法\s+L3\s+(?:選択|択一)\s+Q/);
});

test('buildDeltaReversePlanningDraft returns preflight-valid operations content when catalog is present', () => {
  const draft = buildDeltaReversePlanningDraft(baseOptions());
  const validation = validateDeltaOperationsContent(draft.content, {
    read_evidence: draft.read_evidence,
  });

  assert.equal(validation.ok, true, JSON.stringify(validation, null, 2));
});

test('buildDeltaReversePlanningDraft reports compression_required when target cannot be met', () => {
  const draft = buildDeltaReversePlanningDraft(baseOptions({
    materialCatalogContent: `# material catalog

- 国民年金法: L1=900 L2=900 選択=200 択一=500
- 厚生年金保険法: L1=900 L2=900 選択=200 択一=500
- 労一: L1=900 L2=900 選択=200 択一=500
- 社一: L1=900 L2=900 選択=200 択一=500
`,
  }));

  assert.equal(draft.ok, true);
  assert.equal(draft.status, 'compression_required');
  assert.ok(draft.warnings.includes('target_date_exceeded'));
});

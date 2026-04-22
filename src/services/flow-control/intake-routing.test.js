import test from 'node:test';
import assert from 'node:assert/strict';

import { routeIntakeCandidates, routeSingleIntakeCandidate } from './intake-routing.js';
import { buildIntakeInboxSourceBundle } from './adapters.js';

function buildIntakeItem({
  title = 'legacy wrapper cleanup',
  summary = 'wrapper cleanup needs design handling',
  category = 'architecture',
  impact = 'high',
  urgency = 'medium',
  reviewAt = '',
  sourceRef = ['notes/00_inbox/example.md'],
} = {}) {
  return {
    title,
    summary,
    review_at: reviewAt,
    source_ref: sourceRef,
    metadata: {
      category,
      impact,
      default_impact: impact,
      urgency,
      default_urgency: urgency,
      description: summary,
    },
  };
}

test('routeSingleIntakeCandidate returns handoff-friendly shape', () => {
  const result = routeSingleIntakeCandidate({
    item: buildIntakeItem(),
    sourceType: 'conversation',
    sourceRef: ['notes/00_inbox/example.md'],
  });

  assert.equal(result.mode, 'dry_run');
  assert.equal(result.normalized_items.length, 1);
  assert.equal(result.routing_decisions.length, 1);
  assert.equal(result.routing_decisions[0].route_to, 'design');
  assert.equal(result.grouped.design.length, 1);
});

test('routeSingleIntakeCandidate can keep low-impact item in issue', () => {
  const result = routeSingleIntakeCandidate({
    item: buildIntakeItem({
      title: 'small memo',
      summary: 'minor issue',
      category: 'operations',
      impact: 'low',
      urgency: 'low',
    }),
    sourceType: 'conversation',
    sourceRef: ['notes/00_inbox/example.md'],
  });

  assert.equal(result.routing_decisions[0].route_to, 'issue');
  assert.equal(result.grouped.issue.length, 1);
});

test('routeSingleIntakeCandidate can route deferred item to future', () => {
  const result = routeSingleIntakeCandidate({
    item: buildIntakeItem({
      title: 'phase later memo',
      summary: 'phase later deferred topic',
      category: 'operations',
      impact: 'medium',
      urgency: 'low',
      reviewAt: 'monthly_review',
    }),
    sourceType: 'conversation',
    sourceRef: ['notes/00_inbox/example.md'],
  });

  assert.equal(result.routing_decisions[0].route_to, 'future');
  assert.equal(result.grouped.future.length, 1);
});

test('buildIntakeInboxSourceBundle can route design-like inbox markdown to design', () => {
  const bundle = buildIntakeInboxSourceBundle({
    content: `# Reflection機能設計メモ

## 概要
AI Work OS における reflection 機能の API 設計とデータ構造を整理する。`,
    sourceRef: 'notes/00_inbox/dev_memo/2026-03-22_15-30-00_reflection_design.md',
  });

  const result = routeIntakeCandidates({
    sourceBundles: [bundle],
    phase: 'phase0',
  });

  assert.equal(result.normalized_items.length, 1);
  assert.equal(result.routing_decisions[0].route_to, 'design');
  assert.equal(result.grouped.design.length, 1);
});

test('buildIntakeInboxSourceBundle can route future-like inbox markdown to future', () => {
  const bundle = buildIntakeInboxSourceBundle({
    content: `# Branch Strategy (Future Plan)

## 概要
将来的に branch ベース開発へ移行する方針を決定。`,
    sourceRef: 'notes/00_inbox/dev_memo/2026-03-22_18-00-00_branch_strategy_future.md',
  });

  const result = routeIntakeCandidates({
    sourceBundles: [bundle],
    phase: 'phase0',
  });

  assert.equal(result.normalized_items.length, 1);
  assert.equal(result.routing_decisions[0].route_to, 'future');
  assert.equal(result.grouped.future.length, 1);
});

test('buildIntakeInboxSourceBundle can keep pending-task markdown in issue', () => {
  const bundle = buildIntakeInboxSourceBundle({
    content: `# 開発メモ（積み残しタスク）

## 概要
現時点で後回しにしたが、今後対応が必要なタスクを整理する。`,
    sourceRef: 'notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md',
  });

  const result = routeIntakeCandidates({
    sourceBundles: [bundle],
    phase: 'phase0',
  });

  assert.equal(result.normalized_items.length, 1);
  assert.equal(result.routing_decisions[0].route_to, 'issue');
  assert.equal(result.grouped.issue.length, 1);
});

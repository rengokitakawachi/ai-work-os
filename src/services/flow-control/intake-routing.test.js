import test from 'node:test';
import assert from 'node:assert/strict';

import { routeSingleIntakeCandidate } from './intake-routing.js';

function buildIntakeItem({
  title = 'legacy wrapper cleanup',
  summary = 'wrapper cleanup needs design handling',
  category = 'architecture',
  impact = 'high',
  urgency = 'medium',
  sourceRef = ['notes/00_inbox/example.md'],
} = {}) {
  return {
    title,
    summary,
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

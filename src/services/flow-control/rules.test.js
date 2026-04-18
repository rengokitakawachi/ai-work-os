import test from 'node:test';
import assert from 'node:assert/strict';

import { evaluateCandidate, evaluateCandidates } from './rules.js';

function buildCandidate({
  candidateId = 'candidate-1',
  candidateType = 'issue',
  sourceType = 'issue',
  phase = 'phase0',
  assessment = {},
  metadata = {},
} = {}) {
  return {
    candidate_id: candidateId,
    candidate_type: candidateType,
    source_type: sourceType,
    phase,
    assessment,
    metadata,
  };
}

test('evaluateCandidate routes phase mismatch to future', () => {
  const result = evaluateCandidate(
    buildCandidate({
      candidateId: 'phase-mismatch',
      candidateType: 'operations',
      sourceType: 'plan',
      phase: 'phase1',
    }),
    { phase: 'phase0' }
  );

  assert.equal(result.route_to, 'future');
  assert.equal(result.in_scope, false);
  assert.equal(result.review_at, 'weekly_review');
});

test('evaluateCandidate routes closed issue to archive', () => {
  const result = evaluateCandidate(
    buildCandidate({
      candidateId: 'closed-issue',
      sourceType: 'issue',
      metadata: {
        category: 'operations',
        status: 'closed',
      },
      assessment: {
        impact_now: 'high',
      },
    }),
    { phase: 'phase0' }
  );

  assert.equal(result.route_to, 'archive');
  assert.equal(result.in_scope, false);
  assert.equal(result.needs_task_generation, false);
});

test('evaluateCandidate routes high-impact architecture issue to design', () => {
  const result = evaluateCandidate(
    buildCandidate({
      candidateId: 'architecture-issue',
      sourceType: 'issue',
      metadata: {
        category: 'architecture',
        status: 'open',
      },
      assessment: {
        impact_now: 'high',
      },
    }),
    { phase: 'phase0' }
  );

  assert.equal(result.route_to, 'design');
  assert.equal(result.in_scope, true);
  assert.equal(result.review_at, 'weekly_review');
});

test('evaluateCandidate routes high-impact operations issue to operations', () => {
  const result = evaluateCandidate(
    buildCandidate({
      candidateId: 'operations-issue',
      sourceType: 'issue',
      metadata: {
        category: 'operations',
        status: 'open',
      },
      assessment: {
        impact_now: 'high',
      },
    }),
    { phase: 'phase0' }
  );

  assert.equal(result.route_to, 'operations');
  assert.equal(result.in_scope, true);
  assert.equal(result.needs_task_generation, true);
});

test('evaluateCandidate keeps non-high-impact open issue in issue', () => {
  const result = evaluateCandidate(
    buildCandidate({
      candidateId: 'medium-issue',
      sourceType: 'issue',
      metadata: {
        category: 'architecture',
        status: 'open',
      },
      assessment: {
        impact_now: 'medium',
      },
    }),
    { phase: 'phase0' }
  );

  assert.equal(result.route_to, 'issue');
  assert.equal(result.in_scope, true);
  assert.equal(result.needs_task_generation, false);
});

test('evaluateCandidate routes design candidates to design', () => {
  const result = evaluateCandidate(
    buildCandidate({
      candidateId: 'design-candidate',
      candidateType: 'design',
      sourceType: 'design',
    }),
    { phase: 'phase0' }
  );

  assert.equal(result.route_to, 'design');
  assert.equal(result.in_scope, true);
  assert.equal(result.review_at, 'weekly_review');
});

test('evaluateCandidate routes operations candidates to operations', () => {
  const result = evaluateCandidate(
    buildCandidate({
      candidateId: 'operations-candidate',
      candidateType: 'operations',
      sourceType: 'operations_queue',
    }),
    { phase: 'phase0' }
  );

  assert.equal(result.route_to, 'operations');
  assert.equal(result.in_scope, true);
  assert.equal(result.needs_task_generation, true);
  assert.equal(result.review_at, 'daily_review');
});

test('evaluateCandidates returns empty array for empty input', () => {
  assert.deepEqual(evaluateCandidates([], { phase: 'phase0' }), []);
  assert.deepEqual(evaluateCandidates(null, { phase: 'phase0' }), []);
});

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  rankOperationsCandidates,
  splitRankedCandidates,
} from './ranking.js';

function buildCandidate({
  title,
  sourceType = 'issue',
  importance = '',
  reviewAt = '',
  planAlignment = '',
  activeContinuity = '',
  quickWin = '',
} = {}) {
  return {
    title,
    source_type: sourceType,
    importance,
    review_at: reviewAt,
    metadata: {
      plan_alignment: planAlignment,
      active_continuity: activeContinuity,
      quick_win: quickWin,
    },
  };
}

test('rankOperationsCandidates prioritizes plan alignment before other axes', () => {
  const ranked = rankOperationsCandidates([
    buildCandidate({
      title: 'linked-high',
      importance: 'high',
      planAlignment: 'linked',
    }),
    buildCandidate({
      title: 'direct-medium',
      importance: 'medium',
      planAlignment: 'direct',
    }),
  ]);

  assert.equal(ranked[0].title, 'direct-medium');
  assert.equal(ranked[1].title, 'linked-high');
});

test('rankOperationsCandidates uses importance as next tie-break', () => {
  const ranked = rankOperationsCandidates([
    buildCandidate({
      title: 'medium-item',
      importance: 'medium',
      planAlignment: 'linked',
    }),
    buildCandidate({
      title: 'high-item',
      importance: 'high',
      planAlignment: 'linked',
    }),
  ]);

  assert.equal(ranked[0].title, 'high-item');
});

test('rankOperationsCandidates uses active continuity after importance', () => {
  const ranked = rankOperationsCandidates([
    buildCandidate({
      title: 'light-active',
      importance: 'high',
      planAlignment: 'linked',
      activeContinuity: 'light',
    }),
    buildCandidate({
      title: 'strong-active',
      importance: 'high',
      planAlignment: 'linked',
      activeContinuity: 'strong',
    }),
  ]);

  assert.equal(ranked[0].title, 'strong-active');
});

test('rankOperationsCandidates uses quick win after active continuity', () => {
  const ranked = rankOperationsCandidates([
    buildCandidate({
      title: 'medium-quick-win',
      importance: 'high',
      planAlignment: 'linked',
      quickWin: 'medium',
    }),
    buildCandidate({
      title: 'high-quick-win',
      importance: 'high',
      planAlignment: 'linked',
      quickWin: 'high',
    }),
  ]);

  assert.equal(ranked[0].title, 'high-quick-win');
});

test('rankOperationsCandidates uses source type and review_at before title', () => {
  const ranked = rankOperationsCandidates([
    buildCandidate({
      title: 'zeta',
      sourceType: 'issue',
      importance: 'high',
      planAlignment: 'linked',
      reviewAt: 'weekly_review',
    }),
    buildCandidate({
      title: 'alpha',
      sourceType: 'plan',
      importance: 'high',
      planAlignment: 'linked',
      reviewAt: 'daily_review',
    }),
  ]);

  assert.equal(ranked[0].title, 'alpha');
  assert.equal(ranked[1].title, 'zeta');
});

test('rankOperationsCandidates falls back to title for stable ordering', () => {
  const ranked = rankOperationsCandidates([
    buildCandidate({ title: 'beta' }),
    buildCandidate({ title: 'alpha' }),
  ]);

  assert.equal(ranked[0].title, 'alpha');
  assert.equal(ranked[1].title, 'beta');
});

test('splitRankedCandidates splits active and next by activeLimit', () => {
  const result = splitRankedCandidates(
    [
      buildCandidate({ title: 'c-item', planAlignment: 'supporting' }),
      buildCandidate({ title: 'a-item', planAlignment: 'direct' }),
      buildCandidate({ title: 'b-item', planAlignment: 'linked' }),
    ],
    2
  );

  assert.deepEqual(
    result.active_candidates.map((item) => item.title),
    ['a-item', 'b-item']
  );
  assert.deepEqual(
    result.next_candidates.map((item) => item.title),
    ['c-item']
  );
});

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  routeSingleDesignCandidate,
  routeDesignNotes,
} from './design-routing.js';
import { applyDesignRoutingActionPlan } from './design-routing-notes-write.js';
import { buildDesignRoutingSourceBundle } from './adapters.js';

function buildDesignCandidate({
  title,
  summary = '',
  assessment = {},
  metadata = {},
  sourceRef = ['notes/02_design/example.md'],
} = {}) {
  return {
    candidate_id: `design:${title}`,
    design_id: title,
    title,
    summary,
    candidate_type: 'design',
    source_ref: sourceRef,
    assessment,
    metadata,
  };
}

test('routeSingleDesignCandidate returns docs when docs_ready and ready', () => {
  const result = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'design-routing-output-schema',
      summary: 'docs candidate',
      assessment: {
        maturity_now: 'ready',
        execution_value_now: 'high',
        docs_ready_now: true,
      },
    }),
  });

  assert.equal(result.mode, 'dry_run');
  assert.equal(result.routed_design_candidates[0].route_to, 'docs');
  assert.equal(result.action_plan.docs_candidates.length, 1);
  assert.equal(result.action_plan.operations_candidates.length, 0);
});

test('routeSingleDesignCandidate returns archive when superseded', () => {
  const result = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'old-routing-split',
      summary: 'superseded design',
      assessment: {
        maturity_now: 'superseded',
      },
      metadata: {
        superseded_by: 'new-routing-split',
      },
    }),
  });

  assert.equal(result.routed_design_candidates[0].route_to, 'archive');
  assert.equal(result.action_plan.archive_design.length, 1);
});

test('routeSingleDesignCandidate returns future when deferred', () => {
  const result = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'phase3-knowledge-integration',
      summary: 'phase later deferred design',
      assessment: {
        maturity_now: 'maturing',
        execution_value_now: 'medium',
        review_at: 'monthly_review',
      },
    }),
    phase: 'phase0',
  });

  assert.equal(result.routed_design_candidates[0].route_to, 'future');
  assert.equal(result.action_plan.future_candidates.length, 1);
});

test('routeSingleDesignCandidate returns operations when execution value exists without docs readiness', () => {
  const result = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'design-routing-adapter-connection',
      summary: 'implementation value is high',
      assessment: {
        maturity_now: 'maturing',
        execution_value_now: 'high',
        docs_ready_now: false,
      },
    }),
  });

  assert.equal(result.routed_design_candidates[0].route_to, 'operations');
  assert.equal(result.action_plan.operations_candidates.length, 1);
  assert.equal(
    result.action_plan.operations_candidates[0].candidate_draft.task,
    'design-routing-adapter-connection'
  );
});

test('routeSingleDesignCandidate falls back to design retain', () => {
  const result = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'thinking-memo',
      summary: 'still draft',
      assessment: {
        maturity_now: 'draft',
        execution_value_now: 'low',
        docs_ready_now: false,
      },
    }),
  });

  assert.equal(result.routed_design_candidates[0].route_to, 'design');
  assert.equal(result.action_plan.design_retained.length, 1);
  assert.equal(result.action_plan.design_retained[0].write_status, 'no_op');
});

test('buildDesignRoutingSourceBundle creates one design item from markdown note', () => {
  const bundle = buildDesignRoutingSourceBundle({
    content: '# design routing minimum usecase\n\nThis note defines the minimum usecase.',
    sourceRef: 'notes/02_design/2026-04-17_design_routing_minimum_usecase.md',
  });

  assert.equal(bundle.source_type, 'design');
  assert.equal(bundle.items.length, 1);
  assert.equal(bundle.items[0].title, 'design routing minimum usecase');
  assert.equal(
    bundle.items[0].design_id,
    '2026-04-17_design_routing_minimum_usecase'
  );
});

test('routeDesignNotes returns dry run output shape', () => {
  const result = routeDesignNotes({
    designContent: '# design routing output schema\n\nThis note is still draft.',
    designSourceRef: 'notes/02_design/2026-04-17_design_routing_output_schema.md',
  });

  assert.equal(result.mode, 'dry_run');
  assert.ok(Array.isArray(result.routed_design_candidates));
  assert.ok(result.action_plan);
  assert.ok(Array.isArray(result.action_plan.docs_candidates));
  assert.ok(Array.isArray(result.action_plan.design_retained));
  assert.ok(Array.isArray(result.action_plan.future_candidates));
  assert.ok(Array.isArray(result.action_plan.archive_design));
  assert.ok(Array.isArray(result.action_plan.operations_candidates));
  assert.ok(Array.isArray(result.action_plan.skipped));
});

test('applyDesignRoutingActionPlan builds docs candidate payload in dry run', async () => {
  const routed = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'design-routing-output-schema',
      summary: 'docs candidate',
      assessment: {
        maturity_now: 'ready',
        execution_value_now: 'high',
        docs_ready_now: true,
      },
    }),
  });

  const result = await applyDesignRoutingActionPlan({
    routedDesignCandidates: routed.routed_design_candidates,
    actionPlan: routed.action_plan,
    sourceRef: ['notes/02_design/example.md'],
    mode: 'dry_run',
    now: '2026-04-18T00:00:00.000Z',
  });

  assert.equal(result.mode, 'dry_run');
  assert.equal(result.docs_candidate_writes.length, 1);
  assert.equal(result.docs_candidate_writes[0].target_layer, 'docs_candidate');
  assert.equal(result.design_retained_results.length, 0);
  assert.equal(result.future_writes.length, 0);
  assert.equal(result.archive_writes.length, 0);
  assert.equal(result.operations_candidate_writes.length, 0);
});

test('applyDesignRoutingActionPlan builds future payload in dry run', async () => {
  const routed = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'phase3-knowledge-integration',
      summary: 'phase later deferred design',
      assessment: {
        maturity_now: 'maturing',
        execution_value_now: 'medium',
        review_at: 'monthly_review',
      },
    }),
    phase: 'phase0',
  });

  const result = await applyDesignRoutingActionPlan({
    routedDesignCandidates: routed.routed_design_candidates,
    actionPlan: routed.action_plan,
    sourceRef: ['notes/02_design/example.md'],
    mode: 'dry_run',
    now: '2026-04-18T00:00:00.000Z',
  });

  assert.equal(result.future_writes.length, 1);
  assert.equal(result.future_writes[0].target_layer, '80_future/design');
  assert.match(result.future_writes[0].suggested_file, /^80_future\/design\/2026-04-18_/);
  assert.equal(result.future_writes[0].write_status, 'draft_only');
});

test('applyDesignRoutingActionPlan builds archive payload in dry run', async () => {
  const routed = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'old-routing-split',
      summary: 'superseded design',
      assessment: {
        maturity_now: 'superseded',
      },
      metadata: {
        superseded_by: 'new-routing-split',
      },
    }),
  });

  const result = await applyDesignRoutingActionPlan({
    routedDesignCandidates: routed.routed_design_candidates,
    actionPlan: routed.action_plan,
    sourceRef: ['notes/02_design/example.md'],
    mode: 'dry_run',
    now: '2026-04-18T00:00:00.000Z',
  });

  assert.equal(result.archive_writes.length, 1);
  assert.equal(result.archive_writes[0].target_layer, '99_archive/design');
  assert.match(result.archive_writes[0].suggested_file, /^99_archive\/design\/2026-04-18_/);
  assert.equal(result.archive_writes[0].write_status, 'draft_only');
});

test('applyDesignRoutingActionPlan builds operations candidate payload in dry run', async () => {
  const routed = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'design-routing-adapter-connection',
      summary: 'implementation value is high',
      assessment: {
        maturity_now: 'maturing',
        execution_value_now: 'high',
        docs_ready_now: false,
      },
    }),
  });

  const result = await applyDesignRoutingActionPlan({
    routedDesignCandidates: routed.routed_design_candidates,
    actionPlan: routed.action_plan,
    sourceRef: ['notes/02_design/example.md'],
    mode: 'dry_run',
    now: '2026-04-18T00:00:00.000Z',
  });

  assert.equal(result.operations_candidate_writes.length, 1);
  assert.equal(result.operations_candidate_writes[0].target_layer, '04_operations');
  assert.equal(
    result.operations_candidate_writes[0].candidate_draft.task,
    'design-routing-adapter-connection'
  );
  assert.equal(result.operations_candidate_writes[0].write_status, 'draft_only');
});

test('applyDesignRoutingActionPlan builds retained no-op payload in dry run', async () => {
  const routed = routeSingleDesignCandidate({
    item: buildDesignCandidate({
      title: 'thinking-memo',
      summary: 'still draft',
      assessment: {
        maturity_now: 'draft',
        execution_value_now: 'low',
        docs_ready_now: false,
      },
    }),
  });

  const result = await applyDesignRoutingActionPlan({
    routedDesignCandidates: routed.routed_design_candidates,
    actionPlan: routed.action_plan,
    sourceRef: ['notes/02_design/example.md'],
    mode: 'dry_run',
    now: '2026-04-18T00:00:00.000Z',
  });

  assert.equal(result.design_retained_results.length, 1);
  assert.equal(result.design_retained_results[0].route_to, 'design');
  assert.equal(result.design_retained_results[0].write_status, 'no_op');
});

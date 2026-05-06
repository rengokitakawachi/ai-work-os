import test from 'node:test';
import assert from 'node:assert/strict';

import {
  routeSingleIssueCandidate,
  routeIssueLogFromNotes,
} from './issue-routing.js';
import { buildIssueRoutingActions } from './issue-routing-actions.js';
import { applyIssueRoutingActionPlan } from './issue-routing-notes-write.js';
import { buildIssueRoutingSourceBundle } from './adapters.js';

function buildIssueItem({
  issueId = '20260419-023',
  title = 'operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある',
  category = 'operations',
  impact = 'high',
  urgency = 'medium',
  status = 'open',
  description = 'operations 提案時の Day 容量チェックが不足している。',
  context = '`notes/04_operations/active_operations.md` を参照',
  sourceRef = ['notes/01_issues/idea_log.md'],
} = {}) {
  return {
    title,
    summary: description,
    candidate_type: 'operations',
    phase: 'phase0',
    source_ref: sourceRef,
    metadata: {
      issue_id: issueId,
      category,
      impact,
      default_impact: impact,
      urgency,
      default_urgency: urgency,
      status,
      description,
      context,
      context_refs: ['notes/04_operations/active_operations.md'],
    },
  };
}

test('routeSingleIssueCandidate returns handoff schema with normalized_items and action_plan', () => {
  const result = routeSingleIssueCandidate({
    item: buildIssueItem(),
  });

  assert.equal(result.mode, 'dry_run');
  assert.equal(result.normalized_items.length, 1);
  assert.equal(result.routing_decisions.length, 1);
  assert.equal(result.action_plan.operations_candidates.length, 1);
  assert.equal(result.action_plan.keep_items.length, 1);
  assert.equal(result.routing_decisions[0].route_to, 'operations');
  assert.equal(result.routing_decisions[0].next_action, 'generate_operations_candidate');
  assert.equal(result.normalized_items[0].item_id, '20260419-023');
});

test('routeSingleIssueCandidate routes architecture issue to design and keeps item open', () => {
  const result = routeSingleIssueCandidate({
    item: buildIssueItem({
      issueId: '20260418-022',
      category: 'architecture',
      title: 'legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある',
    }),
  });

  assert.equal(result.routing_decisions[0].route_to, 'design');
  assert.equal(result.action_plan.design_updates.length, 1);
  assert.equal(result.action_plan.keep_items.length, 1);
});

test('routeSingleIssueCandidate keeps medium-impact architecture issue in issue', () => {
  const result = routeSingleIssueCandidate({
    item: buildIssueItem({
      issueId: '20260418-022',
      category: 'architecture',
      impact: 'medium',
      title: 'legacy wrapper cleanup medium impact',
    }),
  });

  assert.equal(result.routing_decisions[0].route_to, 'issue');
  assert.equal(result.action_plan.keep_items.length, 1);
});

test('routeSingleIssueCandidate keeps medium-impact operations issue in issue', () => {
  const result = routeSingleIssueCandidate({
    item: buildIssueItem({
      issueId: '20260419-023',
      category: 'operations',
      impact: 'medium',
      title: 'day capacity rule medium impact',
    }),
  });

  assert.equal(result.routing_decisions[0].route_to, 'issue');
  assert.equal(result.action_plan.keep_items.length, 1);
});

test('routeSingleIssueCandidate keeps medium-impact uncategorized issue in issue', () => {
  const result = routeSingleIssueCandidate({
    item: buildIssueItem({
      issueId: '20260421-031',
      category: 'general',
      impact: 'medium',
      title: 'general issue medium impact',
    }),
  });

  assert.equal(result.routing_decisions[0].route_to, 'issue');
  assert.equal(result.action_plan.keep_items.length, 1);
});

test('buildIssueRoutingActions accepts normalized_items and routing_decisions directly', () => {
  const normalizedItems = [
    {
      item_id: '20260419-023',
      candidate_id: 'issue:test',
      source_type: 'issue',
      source_ref: ['notes/01_issues/idea_log.md'],
      title: 'day capacity rule',
      summary: 'needs operations candidate',
      description: 'needs operations candidate',
      metadata: {
        issue_id: '20260419-023',
      },
    },
  ];

  const routingDecisions = [
    {
      item_id: '20260419-023',
      candidate_id: 'issue:test',
      route_to: 'operations',
      reason: 'operations 系 issue のため、operations 比較対象に入れる',
      evaluated_at: '2026-04-21T00:00:00.000Z',
      next_action: 'generate_operations_candidate',
      keep_open: true,
      review_at: 'daily_review',
      impact_now: 'high',
      urgency_now: 'medium',
      task_draft: {
        task: 'day capacity rule',
        source_ref: ['notes/01_issues/idea_log.md'],
        notes: ['generated_from:issue:test'],
      },
    },
  ];

  const actionPlan = buildIssueRoutingActions({
    normalizedItems,
    routingDecisions,
  });

  assert.equal(actionPlan.operations_candidates.length, 1);
  assert.equal(actionPlan.keep_items.length, 1);
  assert.equal(actionPlan.archive_items.length, 0);
});

test('applyIssueRoutingActionPlan builds operations candidate payload from new schema', async () => {
  const routed = routeSingleIssueCandidate({
    item: buildIssueItem(),
  });

  const result = await applyIssueRoutingActionPlan({
    normalizedItems: routed.normalized_items,
    routingDecisions: routed.routing_decisions,
    actionPlan: routed.action_plan,
    sourceRef: ['notes/01_issues/idea_log.md'],
    mode: 'dry_run',
    now: '2026-04-21T00:00:00.000Z',
  });

  assert.equal(result.mode, 'dry_run');
  assert.equal(result.operations_candidate_writes.length, 1);
  assert.equal(result.operations_candidate_writes[0].target_layer, '04_operations');
  assert.equal(result.operations_candidate_writes[0].derived_from_item_id, '20260419-023');
  assert.equal(result.kept_items.length, 1);
  assert.equal(result.kept_items[0].write_status, 'no_op');
});

test('applyIssueRoutingActionPlan keeps backward compatibility for legacy keep_issue bucket', async () => {
  const routed = routeSingleIssueCandidate({
    item: buildIssueItem({
      category: 'architecture',
      issueId: '20260418-022',
      title: 'legacy wrapper cleanup',
    }),
  });

  const legacyActionPlan = {
    design_updates: routed.action_plan.design_updates,
    keep_issue: routed.action_plan.keep_items,
    archive_issue: [],
    future_candidates: [],
    operations_candidates: [],
    skipped: [],
  };

  const result = await applyIssueRoutingActionPlan({
    normalizedItems: routed.normalized_items,
    routingDecisions: routed.routing_decisions,
    actionPlan: legacyActionPlan,
    sourceRef: ['notes/01_issues/idea_log.md'],
    mode: 'dry_run',
    now: '2026-04-21T00:00:00.000Z',
  });

  assert.equal(result.design_writes.length, 1);
  assert.equal(result.kept_items.length, 1);
  assert.equal(result.kept_issues.length, 1);
});

test('buildIssueRoutingSourceBundle creates issue items from markdown issue log', () => {
  const bundle = buildIssueRoutingSourceBundle({
    content: `
### 20260419-023
- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- category: operations
- impact: high
- urgency: medium
- status: open
- description: operations 提案時の Day 容量チェックが不足している
- context: \`notes/04_operations/active_operations.md\`
    `,
    sourceRef: 'notes/01_issues/idea_log.md',
  });

  assert.equal(bundle.source_type, 'issue');
  assert.equal(bundle.items.length, 1);
  assert.equal(bundle.items[0].metadata.issue_id, '20260419-023');
});

test('routeIssueLogFromNotes returns dry run output shape', () => {
  const result = routeIssueLogFromNotes({
    issueLogContent: `
### 20260418-022
- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- category: architecture
- impact: high
- urgency: medium
- status: open
- description: wrapper 廃止方針を整理する
- context: \`src/services/todoist.js\`
    `,
    issueLogSourceRef: 'notes/01_issues/idea_log.md',
  });

  assert.equal(result.mode, 'dry_run');
  assert.ok(Array.isArray(result.normalized_items));
  assert.ok(Array.isArray(result.routing_decisions));
  assert.ok(Array.isArray(result.action_plan.design_updates));
  assert.ok(Array.isArray(result.action_plan.plan_updates));
  assert.ok(Array.isArray(result.action_plan.operations_candidates));
  assert.ok(Array.isArray(result.action_plan.future_candidates));
  assert.ok(Array.isArray(result.action_plan.archive_items));
  assert.ok(Array.isArray(result.action_plan.keep_items));
  assert.ok(Array.isArray(result.action_plan.skipped));
});

import { ensureString } from './common.js';
import { collectCandidates } from './candidate.js';
import { normalizeCandidates } from './normalize.js';
import { buildDesignRoutingEvaluations } from './design-routing-rules.js';
import { buildDesignRoutingActionPlan } from './design-routing-actions.js';
import { buildDesignRoutingSourceBundle } from './adapters.js';

function groupDesignRoutingDecisions(decisions = []) {
  const grouped = {
    docs: [],
    design: [],
    future: [],
    archive: [],
    operations: [],
    skipped: [],
  };

  for (const decision of decisions) {
    const routeTo = ensureString(decision?.route_to);

    if (routeTo === 'docs') {
      grouped.docs.push(decision);
      continue;
    }

    if (routeTo === 'design') {
      grouped.design.push(decision);
      continue;
    }

    if (routeTo === 'future') {
      grouped.future.push(decision);
      continue;
    }

    if (routeTo === 'archive') {
      grouped.archive.push(decision);
      continue;
    }

    if (routeTo === 'operations') {
      grouped.operations.push(decision);
      continue;
    }

    grouped.skipped.push(decision);
  }

  return grouped;
}

function buildDesignTaskDraft(candidate = {}, evaluation = {}) {
  if (!evaluation?.needs_task_generation) {
    return null;
  }

  return {
    task: ensureString(candidate?.title),
    source_ref: Array.isArray(candidate?.source_ref) ? candidate.source_ref : [],
    notes: [
      `generated_from_design:${ensureString(candidate?.candidate_id)}`,
      `route_to:${ensureString(evaluation?.route_to)}`,
    ],
  };
}

function buildDesignRoutingDecision(candidate = {}, evaluation = {}) {
  const taskDraft = buildDesignTaskDraft(candidate, evaluation);

  return {
    ...candidate,
    ...evaluation,
    ...(taskDraft ? { task_draft: taskDraft } : {}),
  };
}

export function routeDesignCandidates({
  sourceBundles = [],
  mode = 'dry_run',
  phase = '',
} = {}) {
  const rawCandidates = collectCandidates(sourceBundles);
  const normalizedCandidates = normalizeCandidates(rawCandidates);
  const evaluations = buildDesignRoutingEvaluations(normalizedCandidates, {
    phase,
    mode,
  });

  const evaluationMap = new Map(
    evaluations.map((evaluation) => [evaluation.candidate_id, evaluation])
  );

  const routedDesignCandidates = normalizedCandidates.map((candidate) =>
    buildDesignRoutingDecision(
      candidate,
      evaluationMap.get(candidate.candidate_id) || {}
    )
  );

  const grouped = groupDesignRoutingDecisions(routedDesignCandidates);
  const actionPlan = buildDesignRoutingActionPlan(grouped);

  return {
    mode: ensureString(mode) || 'dry_run',
    routed_design_candidates: routedDesignCandidates,
    action_plan: actionPlan,
  };
}

export function routeSingleDesignCandidate({
  item = {},
  sourceRef = [],
  mode = 'dry_run',
  phase = '',
} = {}) {
  return routeDesignCandidates({
    mode,
    phase,
    sourceBundles: [
      {
        source_type: 'design',
        source_ref: Array.isArray(sourceRef) ? sourceRef : [],
        items: [item],
      },
    ],
  });
}

export function routeDesignNotes({
  designContent = '',
  designSourceRef = '',
  mode = 'dry_run',
  phase = '',
} = {}) {
  const sourceBundle = buildDesignRoutingSourceBundle({
    content: designContent,
    sourceRef: designSourceRef,
  });

  return routeDesignCandidates({
    mode,
    phase,
    sourceBundles: [sourceBundle],
  });
}

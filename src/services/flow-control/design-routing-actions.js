import {
  compactObject,
  ensureObject,
  ensureString,
  ensureStringArray,
} from './common.js';

function buildDocsCandidate(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'docs',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    target_doc: ensureString(candidate?.metadata?.target_doc),
    source_ref: ensureStringArray(candidate?.source_ref),
    action_type: 'docs_candidate',
    write_status: 'draft_only',
  });
}

function buildDesignRetained(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'design',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    action_type: 'keep_design',
    write_status: 'no_op',
  });
}

function buildFutureCandidate(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'future',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    review_at: ensureString(candidate?.review_at),
    target_layer: '80_future/design',
    source_ref: ensureStringArray(candidate?.source_ref),
    action_type: 'future_candidate',
    write_status: 'draft_only',
  });
}

function buildArchiveDesign(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'archive',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    target_layer: '99_archive/design',
    source_ref: ensureStringArray(candidate?.source_ref),
    action_type: 'archive_design',
    write_status: 'draft_only',
  });
}

function buildOperationsCandidate(candidate = {}) {
  const taskDraft = ensureObject(candidate?.task_draft);

  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    route_to: 'operations',
    reason: ensureString(candidate?.reason),
    evaluated_at: ensureString(candidate?.evaluated_at),
    maturity_now: ensureString(candidate?.maturity_now),
    execution_value_now: ensureString(candidate?.execution_value_now),
    docs_ready_now: Boolean(candidate?.docs_ready_now),
    action_type: 'operations_candidate',
    write_status: 'draft_only',
    candidate_draft:
      Object.keys(taskDraft).length > 0
        ? taskDraft
        : {
            task: ensureString(candidate?.title),
            source_ref: ensureStringArray(candidate?.source_ref),
            notes: [
              `generated_from_design:${ensureString(candidate?.candidate_id)}`,
            ],
          },
  });
}

function buildSkipped(candidate = {}) {
  return compactObject({
    candidate_id: ensureString(candidate?.candidate_id),
    design_id: ensureString(candidate?.design_id || candidate?.path),
    title: ensureString(candidate?.title),
    reason: ensureString(candidate?.reason),
    write_status: 'skipped',
  });
}

export function buildDesignRoutingActionPlan(grouped = {}) {
  const safeGrouped = ensureObject(grouped);

  return {
    docs_candidates: (Array.isArray(safeGrouped.docs) ? safeGrouped.docs : []).map(
      (candidate) => buildDocsCandidate(candidate)
    ),
    design_retained: (
      Array.isArray(safeGrouped.design) ? safeGrouped.design : []
    ).map((candidate) => buildDesignRetained(candidate)),
    future_candidates: (
      Array.isArray(safeGrouped.future) ? safeGrouped.future : []
    ).map((candidate) => buildFutureCandidate(candidate)),
    archive_design: (
      Array.isArray(safeGrouped.archive) ? safeGrouped.archive : []
    ).map((candidate) => buildArchiveDesign(candidate)),
    operations_candidates: (
      Array.isArray(safeGrouped.operations) ? safeGrouped.operations : []
    ).map((candidate) => buildOperationsCandidate(candidate)),
    skipped: (Array.isArray(safeGrouped.skipped) ? safeGrouped.skipped : []).map(
      (candidate) => buildSkipped(candidate)
    ),
  };
}

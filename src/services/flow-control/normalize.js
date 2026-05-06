import {
  buildCandidateId,
  compactObject,
  ensureObject,
  ensureString,
  ensureStringArray,
} from './common.js';

function normalizeImportance(value) {
  const safeValue = ensureString(value).toLowerCase();
  if (['high', 'medium', 'low'].includes(safeValue)) {
    return safeValue;
  }
  return 'medium';
}

export function normalizeCandidate(rawCandidate = {}) {
  const sourceType = ensureString(rawCandidate?.source_type);
  const rawItem = ensureObject(rawCandidate?.raw_item);
  const sourceRef = Array.from(
    new Set([
      ...ensureStringArray(rawCandidate?.source_ref),
      ...ensureStringArray(rawItem?.source_ref),
    ])
  );

  const title = ensureString(rawItem?.title);
  const summary = ensureString(rawItem?.summary);
  const candidateType = ensureString(rawItem?.candidate_type) || 'issue';
  const importance = normalizeImportance(rawItem?.importance);
  const phase = ensureString(rawItem?.phase);
  const reviewAt = ensureString(rawItem?.review_at);
  const whyNow = ensureStringArray(rawItem?.why_now);
  const metadata = ensureObject(rawItem?.metadata);
  const assessment = ensureObject(rawItem?.assessment);
  const designId = ensureString(rawItem?.design_id);
  const path = ensureString(rawItem?.path);

  return compactObject({
    candidate_id: buildCandidateId({
      sourceType,
      title,
      sourceRef,
    }),
    source_type: sourceType || 'unknown',
    source_ref: sourceRef,
    title,
    summary,
    candidate_type: candidateType,
    importance,
    phase,
    review_at: reviewAt,
    why_now: whyNow,
    metadata,
    assessment,
    design_id: designId,
    path,
  });
}

export function normalizeCandidates(rawCandidates = []) {
  if (!Array.isArray(rawCandidates) || rawCandidates.length === 0) {
    return [];
  }

  return rawCandidates
    .map((candidate) => normalizeCandidate(candidate))
    .filter((candidate) => ensureString(candidate?.title).length > 0);
}

import { ensureObject, ensureString, ensureStringArray } from './common.js';

export function collectCandidates(sourceBundles = []) {
  if (!Array.isArray(sourceBundles) || sourceBundles.length === 0) {
    return [];
  }

  const collected = [];

  for (const bundle of sourceBundles) {
    const sourceType = ensureString(bundle?.source_type);
    const sourceRef = ensureStringArray(bundle?.source_ref);
    const items = Array.isArray(bundle?.items) ? bundle.items : [];

    for (const item of items) {
      collected.push({
        source_type: sourceType,
        source_ref: sourceRef,
        raw_item: ensureObject(item),
      });
    }
  }

  return collected;
}

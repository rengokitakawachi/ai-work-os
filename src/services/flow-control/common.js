export function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function ensureStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ensureString(item))
    .filter((item) => item.length > 0);
}

export function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

export function compactObject(value) {
  return Object.fromEntries(
    Object.entries(ensureObject(value)).filter(([, item]) => {
      if (item === undefined || item === null) {
        return false;
      }

      if (typeof item === 'string') {
        return item.trim().length > 0;
      }

      if (Array.isArray(item)) {
        return item.length > 0;
      }

      if (typeof item === 'object') {
        return Object.keys(item).length > 0;
      }

      return true;
    })
  );
}

function slugify(value) {
  return ensureString(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function buildCandidateId({ sourceType = '', title = '', sourceRef = [] }) {
  const safeSourceType = ensureString(sourceType) || 'unknown';
  const safeTitle = slugify(title);
  const firstSourceRef = slugify(ensureStringArray(sourceRef)[0] || '');
  const suffix = safeTitle || firstSourceRef || 'candidate';
  return `${safeSourceType}:${suffix}`;
}

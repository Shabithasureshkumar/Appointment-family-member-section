/**
 * Collision-free id for a locally created record.
 *
 * `crypto.randomUUID` requires a secure context, so a random suffix is used as a
 * fallback rather than a bare timestamp (two records added inside the same
 * millisecond would otherwise share an id and therefore a React key).
 */
export function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `member-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

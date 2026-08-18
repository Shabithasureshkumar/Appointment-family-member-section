type ClassValue = string | false | null | undefined;

/**
 * Joins class names, dropping falsy values.
 *
 * Deliberately does NOT merge conflicting Tailwind utilities: the components in
 * this project avoid emitting two utilities for the same CSS property instead of
 * relying on a merge step, because conflicting utilities resolve by CSS source
 * order rather than by their order in the class attribute.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

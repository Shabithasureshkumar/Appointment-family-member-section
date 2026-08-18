/**
 * Shared class fragments for interactive primitives.
 *
 * FOCUS_RING uses `outline` rather than Tailwind's `ring-*` utilities on
 * purpose. `ring-*` composes `box-shadow` from `@property`-registered custom
 * properties, which do not interpolate; any element that also transitions
 * `box-shadow` ends up with a permanently transparent ring. `outline` is
 * unaffected by shadow composition, so the indicator cannot be broken by a
 * transition added later.
 */
export const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

/**
 * Explicit transition list. `transition-all` is avoided so that `outline-width`
 * and `outline-color` are never animated, which would delay the focus indicator.
 */
export const TRANSITION =
  'transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300';

export const TRANSITION_FAST =
  'transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-200';

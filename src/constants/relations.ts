/**
 * The single source of truth for family relationships.
 *
 * `Relation` is derived from this array, so the union type and the values the UI
 * offers cannot drift apart.
 */
export const RELATIONS = [
  'SELF',
  'MOTHER',
  'FATHER',
  'SON',
  'DAUGHTER',
  'SPOUSE',
  'SIBLING',
  'GRANDPARENT',
] as const;

export type Relation = (typeof RELATIONS)[number];

/**
 * Relations offered by the "Add Family Member" form, in the approved design order.
 * `SELF` is excluded: exactly one record represents the account holder.
 */
export const ADDABLE_RELATIONS = [
  'SON',
  'DAUGHTER',
  'SPOUSE',
  'MOTHER',
  'FATHER',
  'SIBLING',
  'GRANDPARENT',
] as const satisfies readonly Relation[];

export const DEFAULT_ADD_RELATION: Relation = 'SON';

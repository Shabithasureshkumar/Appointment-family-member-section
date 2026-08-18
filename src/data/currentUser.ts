import type { CurrentUser } from '../types';

/**
 * The signed-in clinician shown in the top navigation.
 *
 * Note: this intentionally still matches the approved design copy. The audit
 * flagged that this name also appears as the `SELF` family member; resolving
 * that is a content decision, not a code fix, so it is left as designed.
 */
export const CURRENT_USER: CurrentUser = {
  name: 'David Brock',
  role: 'General Physician',
  avatarUrl:
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=128&q=80',
};

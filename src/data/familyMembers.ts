import type { FamilyMember } from '../types';

/**
 * Seed data for the family member selection screen.
 *
 * Kept out of the component tree so that swapping this for a fetch means
 * changing `useFamilyMembers` only.
 */
export const INITIAL_FAMILY_MEMBERS: readonly FamilyMember[] = [
  {
    id: 'member-david-brock',
    name: 'David Brock',
    relation: 'SELF',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
  {
    id: 'member-sarah-brock',
    name: 'Sarah Brock',
    relation: 'MOTHER',
    imageUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
  {
    id: 'member-michael-brock',
    name: 'Michael Brock',
    relation: 'FATHER',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
  {
    id: 'member-emma-brock',
    name: 'Emma Brock',
    relation: 'DAUGHTER',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    status: 'active',
  },
];

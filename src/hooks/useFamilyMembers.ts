import { useCallback, useState } from 'react';
import { INITIAL_FAMILY_MEMBERS } from '../data/familyMembers';
import { createId } from '../lib/createId';
import type { FamilyMember, NewMemberDraft } from '../types';

export type AddMemberResult =
  | { ok: true; member: FamilyMember }
  | { ok: false; error: string };

export type RemoveMemberResult =
  | { ok: true; removed: FamilyMember }
  | { ok: false; error: string };

export interface UseFamilyMembers {
  members: FamilyMember[];
  selectedId: string | null;
  selectedMember: FamilyMember | null;
  selectMember: (id: string) => void;
  addMember: (draft: NewMemberDraft) => AddMemberResult;
  removeMember: (id: string) => RemoveMemberResult;
}

const normalise = (name: string) => name.trim().toLowerCase();

/**
 * Owns family member state and the rules that operate on it.
 *
 * All mutations return a result object rather than throwing or silently
 * no-op-ing, so the calling component can surface a message. Swapping the seed
 * data for a request later only changes how `members` is initialised.
 */
export function useFamilyMembers(
  initialMembers: readonly FamilyMember[] = INITIAL_FAMILY_MEMBERS,
): UseFamilyMembers {
  const [members, setMembers] = useState<FamilyMember[]>(() => [...initialMembers]);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => initialMembers[0]?.id ?? null,
  );

  // No fallback to members[0]: an id that matches nothing must read as "nothing
  // selected" rather than quietly resolving to a different person.
  const selectedMember = members.find((member) => member.id === selectedId) ?? null;

  const selectMember = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const addMember = useCallback(
    (draft: NewMemberDraft): AddMemberResult => {
      const name = draft.name.trim();

      if (!name) {
        return { ok: false, error: 'Please enter a valid name.' };
      }

      if (members.some((member) => normalise(member.name) === normalise(name))) {
        return { ok: false, error: 'A family member with this name already exists.' };
      }

      const member: FamilyMember = {
        id: createId(),
        name,
        relation: draft.relation,
        imageUrl: draft.imageUrl,
        status: 'active',
      };

      setMembers((current) => [...current, member]);
      setSelectedId(member.id);

      return { ok: true, member };
    },
    [members],
  );

  const removeMember = useCallback(
    (id: string): RemoveMemberResult => {
      const index = members.findIndex((member) => member.id === id);
      const removed = index === -1 ? undefined : members[index];

      if (!removed) {
        return { ok: false, error: 'That family member is no longer available.' };
      }

      if (members.length <= 1) {
        return { ok: false, error: 'Cannot remove the last remaining family member.' };
      }

      const next = members.filter((member) => member.id !== id);
      setMembers(next);

      if (selectedId === id) {
        // Move to the neighbour that took the removed member's place rather than
        // jumping back to the first card.
        const neighbour = next[Math.min(index, next.length - 1)];
        setSelectedId(neighbour ? neighbour.id : null);
      }

      return { ok: true, removed };
    },
    [members, selectedId],
  );

  return { members, selectedId, selectedMember, selectMember, addMember, removeMember };
}

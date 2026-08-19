import { ArrowRight, UserMinus, Users } from 'lucide-react';
import { Button } from './ui/Button';

export interface ActionButtonsProps {
  /** Null when nothing is selected; both member actions are disabled in that case. */
  selectedMemberName: string | null;
  onConfirm: () => void;
  onRemove: () => void;
  /** Mobile surfaces "Add member" here; from sm up it lives in the card grid. */
  onAddMember: () => void;
  disableRemove?: boolean;
}

/**
 * Confirm / Add / Remove.
 *
 * Mobile follows the mobile design: Confirm is a full-width CTA with Add and
 * Remove sharing the row beneath it. From `sm` up the layout is unchanged —
 * Confirm and Remove side by side, with Add living in the card grid instead.
 *
 * The visible button copy is the approved copy. `selectedMemberName` is folded
 * into the accessible name so screen reader users hear which member each action
 * applies to, and the remove confirmation dialog names them on screen.
 */
export function ActionButtons({
  selectedMemberName,
  onConfirm,
  onRemove,
  onAddMember,
  disableRemove = false,
}: ActionButtonsProps) {
  const hasSelection = Boolean(selectedMemberName);

  return (
    <div
      className={
        // Mobile: Confirm spans the full width with Add/Remove paired beneath.
        // The pair goes side by side from 360px; below that a half-row cannot hold
        // "Remove Member" without wrapping, so the two stack instead.
        // From sm up this collapses to the approved single row.
        'mx-auto grid w-full max-w-[520px] grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:flex sm:max-w-[940px] sm:flex-row sm:items-center sm:justify-center sm:gap-[17px]'
      }
    >
      {/* Primary Confirm Button */}
      <Button
        variant="primary"
        onClick={onConfirm}
        disabled={!hasSelection}
        aria-label={
          hasSelection
            ? `Confirm selected member, ${selectedMemberName}`
            : 'Confirm selected member. Select a family member first.'
        }
        className="col-span-full flex min-h-[60px] w-full items-center justify-center gap-3 rounded-[17.5px] px-6 font-sans text-[16px] font-semibold sm:w-auto sm:min-w-[320px] sm:px-8 sm:text-[17px]"
      >
        <span>Confirm Selected Member</span>
        <ArrowRight className="h-4 w-4 stroke-[2.5] text-white sm:h-[15px] sm:w-[15px]" />
      </Button>

      {/* Add Member — mobile only; the grid's Add card covers this from sm up */}
      <Button
        variant="outline"
        onClick={onAddMember}
        aria-label="Add new family member"
        className="flex min-h-[56px] w-full items-center justify-center gap-1.5 rounded-[17.5px] px-3 font-sans text-[15px] font-semibold sm:hidden"
      >
        <Users className="hidden h-[18px] w-[18px] shrink-0 min-[400px]:block" aria-hidden="true" />
        <span>Add member</span>
      </Button>

      {/* Secondary Remove Button */}
      <Button
        variant="danger"
        onClick={onRemove}
        disabled={!hasSelection || disableRemove}
        aria-label={
          hasSelection
            ? `Remove ${selectedMemberName}`
            : 'Remove member. Select a family member first.'
        }
        className="flex min-h-[56px] w-full items-center justify-center gap-1.5 rounded-[17.5px] px-3 font-sans text-[15px] font-semibold sm:min-h-[60px] sm:w-auto sm:min-w-[195px] sm:gap-0 sm:px-7 sm:text-[17px] sm:font-normal"
      >
        <UserMinus className="hidden h-[18px] w-[18px] shrink-0 min-[400px]:block sm:hidden" aria-hidden="true" />
        <span>Remove Member</span>
      </Button>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export interface ActionButtonsProps {
  /** Null when nothing is selected; both actions are disabled in that case. */
  selectedMemberName: string | null;
  onConfirm: () => void;
  onRemove: () => void;
  disableRemove?: boolean;
}

/**
 * The visible button copy is the approved design copy. `selectedMemberName` is
 * folded into the accessible name so screen reader users hear which member each
 * action applies to, and the remove confirmation dialog names them on screen.
 */
export function ActionButtons({
  selectedMemberName,
  onConfirm,
  onRemove,
  disableRemove = false,
}: ActionButtonsProps) {
  const hasSelection = Boolean(selectedMemberName);

  return (
    <div className="mx-auto flex w-full max-w-[940px] flex-col items-center justify-center gap-4 sm:flex-row sm:gap-[17px]">
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
        className="flex min-h-[60px] w-full items-center justify-center gap-3 rounded-[17.5px] px-8 font-sans text-[16px] font-semibold sm:w-auto sm:min-w-[320px] sm:text-[17px]"
      >
        <span>Confirm Selected Member</span>
        <ArrowRight className="h-4 w-4 stroke-[2.5] text-white sm:h-[15px] sm:w-[15px]" />
      </Button>

      {/* Secondary Remove Button */}
      <Button
        variant="danger"
        onClick={onRemove}
        disabled={!hasSelection || disableRemove}
        aria-label={
          hasSelection ? `Remove ${selectedMemberName}` : 'Remove member. Select a family member first.'
        }
        className="flex min-h-[60px] w-full items-center justify-center rounded-[17.5px] px-7 font-sans text-[16px] font-normal sm:w-auto sm:min-w-[195px] sm:text-[17px]"
      >
        <span>Remove Member</span>
      </Button>
    </div>
  );
}

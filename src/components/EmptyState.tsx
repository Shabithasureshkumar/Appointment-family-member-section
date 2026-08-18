import { Users } from 'lucide-react';
import { Button } from './ui/Button';

export interface EmptyStateProps {
  onAddMember: () => void;
}

/**
 * Shown when there are no family members at all. Unreachable through the current
 * UI (the last member cannot be removed), but a data source that returns an empty
 * list must not render a bare grid.
 */
export function EmptyState({ onAddMember }: EmptyStateProps) {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-col items-center gap-4 rounded-3xl border border-white/60 bg-white/60 px-6 py-10 text-center backdrop-blur-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lilac text-brand">
        <Users className="h-7 w-7" aria-hidden="true" />
      </div>
      <div>
        <h2 className="font-sans text-lg font-bold text-ink">No family members yet</h2>
        <p className="mt-1 font-sans text-sm text-ink-soft">
          Add a family member to request medical assistance for them.
        </p>
      </div>
      <Button
        variant="primary"
        onClick={onAddMember}
        className="rounded-[17.5px] px-6 py-3 font-sans text-[15px] font-semibold"
      >
        Add Family Member
      </Button>
    </div>
  );
}

import { UserPlus } from 'lucide-react';
import { cn } from '../lib/cn';
import { Pill } from './ui/Pill';
import { FOCUS_RING } from './ui/styles';

export interface AddMemberCardProps {
  onAddMember: () => void;
}

export function AddMemberCard({ onAddMember }: AddMemberCardProps) {
  return (
    <button
      type="button"
      onClick={onAddMember}
      aria-label="Add new family member"
      className={cn(
        'group relative flex w-full max-w-[160px] cursor-pointer flex-col items-center justify-between rounded-3xl p-1.5 opacity-90 hover:scale-102 hover:opacity-100 sm:max-w-[176px]',
        'transition-[transform,opacity] duration-300',
        FOCUS_RING,
      )}
    >
      {/* Dashed Purple Circle Container */}
      {/* No inner padding here: it would push this circle below the member
          avatars, which sit flush in their own wrapper. */}
      <div className="relative mb-4 flex items-center justify-center">
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-dashed border-brand/30 bg-lilac/60 transition-[background-color,border-color] duration-300 group-hover:border-brand/60 group-hover:bg-lilac sm:h-[128px] sm:w-[128px]">
          <UserPlus className="h-8 w-8 stroke-[2.2] text-brand transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      {/* Bottom Pill Container */}
      <Pill className="border border-dashed border-white/50 bg-white/70 shadow-2xs group-hover:border-brand/40 group-hover:bg-white/90">
        <span className="max-w-full text-center font-sans text-[15px] leading-tight font-bold text-ink-soft transition-colors group-hover:text-brand sm:text-[16px]">
          Add Member
        </span>
      </Pill>
    </button>
  );
}

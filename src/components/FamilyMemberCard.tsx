import { cn } from '../lib/cn';
import { Avatar } from './ui/Avatar';
import { Pill } from './ui/Pill';
import { FOCUS_RING } from './ui/styles';
import type { FamilyMember } from '../types';

export interface FamilyMemberCardProps {
  member: FamilyMember;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const AVATAR_INTRINSIC_SIZE = 128;

/**
 * A selectable family member.
 *
 * Selection is exposed with `aria-pressed` rather than colour and scale alone.
 * The cards share a grid with the "Add Member" action, which is not a selection
 * option, so a toggle-button group is a truthful fit where a radiogroup would
 * have to claim a non-radio child.
 */
export function FamilyMemberCard({ member, isSelected, onSelect }: FamilyMemberCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member.id)}
      aria-pressed={isSelected}
      aria-label={`${member.name}, ${member.relation}`}
      className={cn(
        'group relative flex w-full max-w-[160px] cursor-pointer flex-col items-center justify-between rounded-3xl p-1.5 sm:max-w-[176px]',
        // Explicit property list: `transition-all` would also animate the focus
        // outline, delaying the indicator.
        'transition-[transform,opacity] duration-300',
        FOCUS_RING,
        isSelected ? 'z-10 scale-105' : 'opacity-90 hover:scale-102 hover:opacity-100',
      )}
    >
      {/* Circle Image Wrapper */}
      <div className="relative mb-4 flex items-center justify-center">
        {isSelected ? (
          <div className="selected-ring-container p-1.5">
            <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[1.5px] border-brand shadow-md transition-transform duration-300 group-hover:scale-102 sm:h-[128px] sm:w-[128px]">
              <Avatar
                src={member.imageUrl}
                name={member.name}
                size={AVATAR_INTRINSIC_SIZE}
                loading="eager"
                decorative
              />
            </div>
          </div>
        ) : (
          <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-300 group-hover:shadow-md sm:h-[128px] sm:w-[128px]">
            <Avatar
              src={member.imageUrl}
              name={member.name}
              size={AVATAR_INTRINSIC_SIZE}
              loading="eager"
              decorative
            />
          </div>
        )}
      </div>

      {/* Name & Relation Bottom Pill Container */}
      <Pill
        className={cn(
          isSelected
            ? 'border border-white/60 bg-white/90 shadow-[0px_2px_12px_rgba(107,56,212,0.15)]'
            : 'border border-white/40 bg-white/70 shadow-xs group-hover:bg-white/85',
        )}
      >
        <span
          title={member.name}
          className={cn(
            'line-clamp-2 max-w-full text-center font-sans text-[15px] leading-tight font-bold tracking-tight break-words sm:text-[16px]',
            isSelected ? 'text-brand' : 'text-ink',
          )}
        >
          {member.name}
        </span>
        <span
          title={member.relation}
          className="mt-0.5 max-w-full truncate text-center font-sans text-[10.5px] font-normal tracking-[0.5px] text-ink-soft uppercase sm:text-[11px]"
        >
          {member.relation}
        </span>
      </Pill>
    </button>
  );
}

import { cn } from '../lib/cn';
import { Avatar } from './ui/Avatar';
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
 * Two compositions, one element: below `sm` this is a full-width horizontal row
 * (avatar, name/relation, selection indicator) as the mobile design specifies;
 * from `sm` up it is the approved vertical avatar card, unchanged.
 *
 * Deliberately NOT two components behind `hidden`/`sm:block` — that would put the
 * same control in the DOM twice, doubling the tab stops and the announcements.
 * One button keeps a single `aria-pressed` target at every width.
 */
export function FamilyMemberCard({ member, isSelected, onSelect }: FamilyMemberCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member.id)}
      aria-pressed={isSelected}
      aria-label={`${member.name}, ${member.relation}`}
      className={cn(
        'group relative cursor-pointer',
        // Explicit property list: `transition-all` would also animate the focus
        // outline, delaying the indicator.
        'transition-[transform,opacity,background-color,border-color] duration-300',
        FOCUS_RING,
        // --- Mobile (below sm): full-width horizontal list row ---
        // The row's own chrome is `max-sm:` scoped rather than paired with an
        // `sm:` reset. A background utility and its reset both target the same
        // property, and which one wins is decided by CSS source order, not by
        // the breakpoint — `sm:bg-transparent` demonstrably lost to `bg-lilac`
        // and leaked the mobile tint onto desktop.
        'flex w-full items-center gap-3.5 rounded-2xl border p-3 text-left',
        isSelected
          ? 'border-brand max-sm:bg-lilac'
          : 'border-transparent max-sm:bg-gray-50',
        // --- sm and up: the approved vertical card, unchanged ---
        'sm:max-w-[176px] sm:flex-col sm:items-center sm:justify-between sm:gap-0',
        'sm:rounded-3xl sm:border-0 sm:p-1.5 sm:text-center',
        isSelected
          ? 'sm:z-10 sm:scale-105'
          : 'sm:opacity-90 sm:hover:scale-102 sm:hover:opacity-100',
      )}
    >
      {/* Avatar — plain circle on mobile, ringed circle from sm up */}
      <span className="relative flex shrink-0 items-center justify-center sm:mb-4">
        {isSelected ? (
          <span className="selected-ring-container block sm:p-1.5">
            <span
              className={cn(
                'block h-16 w-16 overflow-hidden rounded-full',
                'sm:h-[128px] sm:w-[128px] sm:border-[1.5px] sm:border-brand sm:shadow-md',
                'sm:transition-transform sm:duration-300 sm:group-hover:scale-102',
              )}
            >
              <Avatar
                src={member.imageUrl}
                name={member.name}
                size={AVATAR_INTRINSIC_SIZE}
                loading="eager"
                decorative
              />
            </span>
          </span>
        ) : (
          <span
            className={cn(
              'block h-16 w-16 overflow-hidden rounded-full',
              'sm:h-[128px] sm:w-[128px] sm:border-4 sm:border-white',
              'sm:shadow-[0px_2px_8px_rgba(0,0,0,0.06)] sm:transition-shadow sm:duration-300 sm:group-hover:shadow-md',
            )}
          >
            <Avatar
              src={member.imageUrl}
              name={member.name}
              size={AVATAR_INTRINSIC_SIZE}
              loading="eager"
              decorative
            />
          </span>
        )}
      </span>

      {/*
        Name + relation. On mobile this is the flexible middle column; from sm up
        it becomes the frosted pill that sits under the avatar.
      */}
      <span
        className={cn(
          'flex min-w-0 flex-1 flex-col',
          'sm:w-full sm:max-w-full sm:flex-none sm:items-center sm:justify-center',
          'sm:rounded-full sm:px-4 sm:py-2 sm:backdrop-blur-xl',
          isSelected
            ? 'sm:border sm:border-white/60 sm:bg-white/90 sm:shadow-[0px_2px_12px_rgba(107,56,212,0.15)]'
            : 'sm:border sm:border-white/40 sm:bg-white/70 sm:shadow-xs sm:group-hover:bg-white/85',
        )}
      >
        <span
          title={member.name}
          className={cn(
            'line-clamp-1 font-sans text-[17px] leading-tight font-semibold tracking-tight break-words',
            'sm:line-clamp-2 sm:max-w-full sm:text-center sm:text-[16px] sm:font-bold',
            isSelected ? 'text-brand' : 'text-ink',
          )}
        >
          {member.name}
        </span>
        <span
          title={member.relation}
          className={cn(
            'mt-0.5 truncate font-sans text-[13px] font-normal text-ink-soft capitalize',
            'sm:max-w-full sm:text-center sm:text-[11px] sm:tracking-[0.5px] sm:uppercase',
          )}
        >
          {member.relation.toLowerCase()}
        </span>
      </span>

      {/*
        Mobile-only selection indicator. Decorative: `aria-pressed` on the button
        already carries the state for assistive technology.
      */}
      <span
        aria-hidden="true"
        className={cn(
          'ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:hidden',
          isSelected ? 'border-brand' : 'border-hairline',
        )}
      >
        <span
          className={cn(
            'h-2.5 w-2.5 rounded-full transition-colors',
            isSelected ? 'bg-brand' : 'bg-transparent',
          )}
        />
      </span>
    </button>
  );
}

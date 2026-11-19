import { ArrowRight, Search, ShieldCheck, UserPlus } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FOCUS_RING } from '../../components/ui/styles';
import { CARD, EYEBROW } from './styles';

function OptionCard({
  icon,
  title,
  description,
  action,
  tone,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action: string;
  tone: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full cursor-pointer items-start gap-4 rounded-2xl border border-fm-border bg-white p-5 text-left',
        'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-fm-accent hover:shadow-fm-card',
        FOCUS_RING,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl', tone)}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold text-fm-text">{title}</span>
        <span className="mt-1 block text-[13px] text-fm-muted">{description}</span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-fm-primary">
          {action}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </span>
    </button>
  );
}

export function FamilyHome({ onSearch, onInvite }: { onSearch: () => void; onInvite: () => void }) {
  return (
    <section aria-labelledby="add-member-heading" className={cn(CARD, 'p-5 sm:p-7')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={EYEBROW}>Add member</p>
          <h2 id="add-member-heading" className="mt-1 text-2xl font-semibold">
            Who would you like to add?
          </h2>
          <p className="mt-1 text-sm text-fm-muted">
            Choose how you want to connect this family member.
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-fm-bg px-3 py-1.5 text-xs font-medium text-fm-primary sm:inline-flex">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Secure
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <OptionCard
          icon={<Search className="h-5 w-5" />}
          title="Existing MedNevo user"
          description="Search for someone who already has a MedNevo account."
          action="Search account"
          tone="bg-fm-bg text-fm-primary"
          onClick={onSearch}
        />
        <OptionCard
          icon={<UserPlus className="h-5 w-5" />}
          title="New family member"
          description="Invite someone who does not have a MedNevo account yet."
          action="Send invitation"
          tone="bg-green-50 text-fm-success"
          onClick={onInvite}
        />
      </div>
    </section>
  );
}

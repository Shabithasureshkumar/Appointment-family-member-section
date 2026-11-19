import { ArrowRight, Mail, Search, ShieldCheck, UserCheck, UserPlus } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FOCUS_RING } from '../../components/ui/styles';
import { CARD, EYEBROW } from './styles';

function OptionCard({
  icon,
  title,
  description,
  action,
  gradient,
  blob,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action: string;
  gradient: string;
  blob: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex w-full cursor-pointer flex-col items-start overflow-hidden rounded-3xl border border-fm-border bg-gradient-to-br from-white to-fm-surface p-6 text-left sm:p-7',
        'transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-fm-accent hover:shadow-[0_18px_40px_rgba(124,58,237,0.18)]',
        FOCUS_RING,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute -top-10 -right-10 h-36 w-36 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-125',
          blob,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3',
          gradient,
        )}
      >
        {icon}
      </span>
      <span className="relative mt-5 block text-lg font-semibold text-fm-text">{title}</span>
      <span className="relative mt-1.5 block text-sm text-fm-muted">{description}</span>
      <span className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-fm-bg px-4 py-2 text-sm font-medium text-fm-primary transition-colors group-hover:bg-fm-primary group-hover:text-white">
        {action}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

const STEPS = [
  { icon: Search, title: 'Find or invite', text: 'Search an existing account or invite by email.' },
  { icon: Mail, title: 'They get notified', text: 'They receive your family request or invitation.' },
  { icon: UserCheck, title: 'Stay connected', text: 'Once they accept, you are part of each other’s family.' },
] as const;

export function FamilyHome({ onSearch, onInvite }: { onSearch: () => void; onInvite: () => void }) {
  return (
    <section aria-labelledby="add-member-heading" className={cn(CARD, 'p-5 sm:p-8')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={EYEBROW}>Add member</p>
          <h2 id="add-member-heading" className="mt-1 text-2xl font-bold sm:text-3xl">
            Who would you like to add?
          </h2>
          <p className="mt-1 text-sm text-fm-muted">
            Choose how you want to connect this family member.
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-fm-success sm:inline-flex">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Secure
        </span>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <OptionCard
          icon={<Search className="h-6 w-6" />}
          title="Existing MedNevo user"
          description="Search for someone who already has a MedNevo account."
          action="Search account"
          gradient="bg-gradient-to-br from-fm-primary to-fm-secondary"
          blob="bg-fm-bg"
          onClick={onSearch}
        />
        <OptionCard
          icon={<UserPlus className="h-6 w-6" />}
          title="New family member"
          description="Invite someone who does not have a MedNevo account yet."
          action="Send invitation"
          gradient="bg-gradient-to-br from-fm-secondary to-fm-accent"
          blob="bg-purple-100"
          onClick={onInvite}
        />
      </div>

      <ol className="mt-8 grid gap-4 border-t border-fm-border pt-6 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fm-bg text-fm-primary"
            >
              <step.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold">
                {index + 1}. {step.title}
              </p>
              <p className="text-xs text-fm-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

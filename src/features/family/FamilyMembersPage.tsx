import { useState } from 'react';
import { Users } from 'lucide-react';
import { FamilyHome } from './FamilyHome';
import { ExistingUserSearch } from './ExistingUserSearch';
import { InviteForm } from './InviteForm';
import { SentConnections } from './SentConnections';
import { BackButton } from './shared';
import { IncomingRequests } from './IncomingRequests';
import type { Notify } from './styles';

type View = 'home' | 'search' | 'invite';

/**
 * Family Members module. A small view state replaces routing (the app has no
 * router); Back always returns to the main screen, the previous step of every flow.
 * Incoming requests stay mounted beneath every view.
 */
export function FamilyMembersPage({ notify, onExit }: { notify: Notify; onExit: () => void }) {
  const [view, setView] = useState<View>('home');
  const [refreshKey, setRefreshKey] = useState(0);
  const goHome = () => setView('home');
  const onChanged = () => setRefreshKey((k) => k + 1);

  return (
    <div className="w-full font-sans text-fm-text">
      <div className="mb-4">
        <BackButton onClick={onExit} />
      </div>
      <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-fm-primary via-fm-secondary to-fm-accent p-6 text-white shadow-[0_20px_50px_rgba(124,58,237,0.3)] sm:p-9">
        {/* Decorative shapes */}
        <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/15" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-white/10" />
        <span aria-hidden="true" className="pointer-events-none absolute right-40 bottom-6 hidden h-4 w-4 rounded-full bg-white/40 md:block" />
        <span aria-hidden="true" className="pointer-events-none absolute top-8 right-1/3 hidden h-2.5 w-2.5 rounded-full bg-white/50 md:block" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <span
            aria-hidden="true"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40 backdrop-blur sm:h-20 sm:w-20"
          >
            <Users className="h-8 w-8 sm:h-10 sm:w-10" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.12em] text-white/80 uppercase">
              Family &amp; Connections
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Family Members</h1>
            <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
              Connect the people you care about with your MedNevo family, and keep everyone&apos;s
              health in one safe place.
            </p>
          </div>
        </div>
      </header>

      <div className="mt-6 space-y-6">
        {/* key remounts each screen so drafts reset when the user leaves and returns */}
        <div key={view} className="animate-fade-in">
          {view === 'home' ? (
            <FamilyHome onSearch={() => setView('search')} onInvite={() => setView('invite')} />
          ) : view === 'search' ? (
            <ExistingUserSearch onBack={goHome} notify={notify} onChanged={onChanged} />
          ) : (
            <InviteForm onBack={goHome} notify={notify} onChanged={onChanged} />
          )}
        </div>
        <SentConnections refreshKey={refreshKey} />
        <IncomingRequests notify={notify} />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Users } from 'lucide-react';
import { FamilyHome } from './FamilyHome';
import { ExistingUserSearch } from './ExistingUserSearch';
import { InviteForm } from './InviteForm';
import { IncomingRequests } from './IncomingRequests';
import type { Notify } from './styles';

type View = 'home' | 'search' | 'invite';

/**
 * Family Members module. A small view state replaces routing (the app has no
 * router); Back always returns to the main screen, the previous step of every flow.
 * Incoming requests stay mounted beneath every view.
 */
export function FamilyMembersPage({ notify }: { notify: Notify }) {
  const [view, setView] = useState<View>('home');
  const goHome = () => setView('home');

  return (
    <div className="w-full max-w-[860px] self-center font-sans text-fm-text">
      <header className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fm-primary to-fm-secondary text-white shadow-[0_8px_20px_rgba(124,58,237,0.3)]"
        >
          <Users className="h-7 w-7" />
        </span>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.08em] text-fm-primary uppercase">
            Family &amp; Connections
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Family Members</h1>
          <p className="text-sm text-fm-muted">
            Connect the people you care about with your MedNevo family.
          </p>
        </div>
      </header>

      <div className="mt-6 space-y-5">
        {/* key remounts each screen so drafts reset when the user leaves and returns */}
        <div key={view} className="animate-fade-in">
          {view === 'home' ? (
            <FamilyHome onSearch={() => setView('search')} onInvite={() => setView('invite')} />
          ) : view === 'search' ? (
            <ExistingUserSearch onBack={goHome} notify={notify} />
          ) : (
            <InviteForm onBack={goHome} notify={notify} />
          )}
        </div>
        <IncomingRequests notify={notify} />
      </div>
    </div>
  );
}

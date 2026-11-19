import { useCallback, useEffect, useState } from 'react';
import { Check, Clock, Loader2, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Avatar } from '../../components/ui/Avatar';
import { FOCUS_RING } from '../../components/ui/styles';
import { listIncomingRequests, respondToRequest } from './familyApi';
import type { IncomingRequest } from './familyApi';
import { IconBadge } from './shared';
import { CARD, EYEBROW } from './styles';
import type { Notify } from './styles';

export function IncomingRequests({ notify }: { notify: Notify }) {
  const [requests, setRequests] = useState<IncomingRequest[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoadError(false);
    listIncomingRequests().then(setRequests, () => setLoadError(true));
  }, []);

  useEffect(load, [load]);

  const respond = async (request: IncomingRequest, action: 'accept' | 'decline') => {
    setBusyId(request.id);
    try {
      await respondToRequest(request.id, action);
      setRequests((current) => (current ?? []).filter((item) => item.id !== request.id));
      notify(
        action === 'accept'
          ? `${request.from.name} is now part of your family.`
          : `Request from ${request.from.name} declined.`,
        action === 'accept' ? 'success' : 'info',
      );
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Something went wrong.', 'warning');
      load();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section aria-labelledby="incoming-heading" className={cn(CARD, 'p-5 sm:p-7')}>
      <div className="flex items-center gap-4">
        <IconBadge className="bg-amber-50 text-fm-warning">
          <Clock className="h-5 w-5" />
        </IconBadge>
        <div>
          <p className={cn(EYEBROW, 'text-fm-warning')}>Incoming</p>
          <h2 id="incoming-heading" className="text-xl font-semibold">
            Family requests
          </h2>
          <p className="text-sm text-fm-muted">Requests from other MedNevo users.</p>
        </div>
      </div>

      <div className="mt-5" aria-live="polite">
        {requests === null && !loadError ? (
          <p className="flex items-center gap-2 text-sm text-fm-muted">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading requests…
          </p>
        ) : loadError ? (
          <p className="text-sm text-red-600">
            Couldn&apos;t load requests.{' '}
            <button type="button" onClick={load} className={cn('font-medium underline', FOCUS_RING)}>
              Try again
            </button>
          </p>
        ) : requests && requests.length > 0 ? (
          <ul className="space-y-3">
            {requests.map((request) => {
              const busy = busyId === request.id;
              return (
                <li
                  key={request.id}
                  className="flex flex-col gap-3 rounded-2xl border border-fm-border bg-fm-surface p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <Avatar name={request.from.name} size={44} decorative />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {request.from.name}{' '}
                        <span className="font-normal text-fm-muted">· {request.relationship}</span>
                      </p>
                      <p className="truncate text-xs text-fm-muted">{request.from.email}</p>
                      {request.message ? (
                        <p className="mt-1 text-xs text-fm-muted">“{request.message}”</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => respond(request, 'decline')}
                      className={cn(
                        'inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-fm-border bg-white px-4 text-sm font-medium text-fm-muted transition-colors hover:border-fm-accent hover:text-fm-primary disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none',
                        FOCUS_RING,
                      )}
                    >
                      <X className="h-4 w-4" aria-hidden="true" /> Decline
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => respond(request, 'accept')}
                      className={cn(
                        'inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-fm-primary px-4 text-sm font-medium text-white transition-colors hover:bg-fm-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none',
                        FOCUS_RING,
                      )}
                    >
                      {busy ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      )}
                      Accept
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-fm-border bg-fm-surface p-4">
            <IconBadge className="h-10 w-10 bg-green-50 text-fm-success">
              <Check className="h-5 w-5" />
            </IconBadge>
            <div>
              <p className="text-sm font-semibold">You&apos;re all caught up</p>
              <p className="text-xs text-fm-muted">You don&apos;t have any pending family requests.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

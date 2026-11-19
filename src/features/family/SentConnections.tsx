import { useEffect, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { cn } from '../../lib/cn';
import { listSentConnections } from './familyApi';
import type { SentConnection } from './familyApi';
import { IconBadge } from './shared';
import { CARD, EYEBROW } from './styles';

/** Requests and invitations the user has sent. Hidden until there is one. */
export function SentConnections({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<SentConnection[]>([]);

  useEffect(() => {
    let cancelled = false;
    listSentConnections().then((list) => {
      if (!cancelled) setItems(list);
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="sent-heading" className={cn(CARD, 'p-5 sm:p-7')}>
      <div className="flex items-center gap-4">
        <IconBadge>
          <Send className="h-5 w-5" />
        </IconBadge>
        <div>
          <p className={EYEBROW}>Outgoing</p>
          <h2 id="sent-heading" className="text-xl font-semibold">
            Sent requests
          </h2>
          <p className="text-sm text-fm-muted">Waiting for the other person to respond.</p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-fm-border bg-fm-surface p-4"
          >
            <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Avatar
                name={item.name}
                size={44}
                decorative
                className="bg-gradient-to-br from-fm-primary to-fm-secondary text-white"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {item.name} <span className="font-normal text-fm-muted">· {item.relationship}</span>
              </p>
              <p className="flex items-center gap-1 truncate text-xs text-fm-muted">
                {item.kind === 'invitation' ? <Mail className="h-3 w-3" aria-hidden="true" /> : null}
                {item.detail}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-fm-warning">
              {item.kind === 'invitation' ? 'Invitation pending' : 'Request sent'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

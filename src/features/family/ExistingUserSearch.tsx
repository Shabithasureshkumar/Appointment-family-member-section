import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, Loader2, Search, ShieldCheck, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Avatar } from '../../components/ui/Avatar';
import { FOCUS_RING } from '../../components/ui/styles';
import { FAMILY_RELATIONSHIPS, getSentRequestIds, searchUsers, sendFamilyRequest } from './familyApi';
import type { FamilyRelationship, MednevoUser } from './familyApi';
import { BackButton, FormField, IconBadge, PrimaryButton } from './shared';
import { CARD, EYEBROW, controlClass } from './styles';
import type { Notify } from './styles';

const DEBOUNCE_MS = 250;
const MESSAGE_MAX = 200;

export function ExistingUserSearch({ onBack, notify }: { onBack: () => void; notify: Notify }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MednevoUser[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [selected, setSelected] = useState<MednevoUser | null>(null);
  const [relationship, setRelationship] = useState<FamilyRelationship | ''>('');
  const [message, setMessage] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentIds, setSentIds] = useState<Set<string>>(() => new Set(getSentRequestIds()));

  const searchId = useId();
  const relId = useId();
  const msgId = useId();
  const selectedRef = useRef<HTMLDivElement>(null);
  const trimmed = query.trim();

  // Debounced search. `cancelled` discards responses that arrive out of order.
  useEffect(() => {
    if (!trimmed) {
      setResults([]);
      setSearching(false);
      setSearchError(false);
      return;
    }
    setSearching(true);
    let cancelled = false;
    const timer = setTimeout(() => {
      searchUsers(trimmed).then(
        (found) => {
          if (cancelled) return;
          setResults(found);
          setSearchError(false);
          setSearching(false);
        },
        () => {
          if (cancelled) return;
          setSearchError(true);
          setSearching(false);
        },
      );
    }, DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed]);

  const selectUser = (user: MednevoUser) => {
    setSelected(user);
    setRelationship('');
    setMessage('');
    setShowErrors(false);
    requestAnimationFrame(() =>
      selectedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
    );
  };

  const clearSelection = () => {
    setSelected(null);
    setRelationship('');
    setMessage('');
    setShowErrors(false);
  };

  const relError = showErrors && !relationship ? 'Select how this person is related to you' : null;

  const submit = async () => {
    if (!selected || sending) return;
    if (!relationship) {
      setShowErrors(true);
      return;
    }
    setSending(true);
    try {
      await sendFamilyRequest({
        userId: selected.id,
        relationship,
        message: message.trim() || undefined,
      });
      setSentIds((current) => new Set(current).add(selected.id));
      notify(`Family request sent to ${selected.name}.`, 'success');
      clearSelection();
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not send the request. Try again.', 'warning');
    } finally {
      setSending(false);
    }
  };

  return (
    <section aria-labelledby="search-heading" className={cn(CARD, 'p-5 sm:p-7')}>
      <BackButton onClick={onBack} />

      <div className="mt-5 flex items-center gap-4">
        <IconBadge>
          <Search className="h-5 w-5" />
        </IconBadge>
        <div>
          <p className={EYEBROW}>Existing user</p>
          <h2 id="search-heading" className="text-xl font-semibold">
            Find their MedNevo account
          </h2>
          <p className="text-sm text-fm-muted">Search using their username or email address.</p>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={searchId} className="sr-only">
          Search by username or email
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-fm-muted"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by username or email"
            className={cn(controlClass(false), 'pl-11')}
          />
          {searching ? (
            <Loader2
              className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 animate-spin text-fm-primary"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-5" aria-live="polite">
        {trimmed ? (
          <>
            <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-fm-muted uppercase">
              Accounts found
            </p>
            {searchError ? (
              <p className="text-sm text-red-600">Search failed. Check your connection and try again.</p>
            ) : !searching && results.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-fm-border bg-fm-surface p-4 text-sm text-fm-muted">
                No accounts match &ldquo;{trimmed}&rdquo;. Try a different username or email, or invite them
                instead.
              </p>
            ) : (
              <ul className="max-h-[300px] space-y-2 overflow-y-auto pr-1">
                {results.map((user) => {
                  const isSelected = selected?.id === user.id;
                  const isSent = sentIds.has(user.id);
                  return (
                    <li
                      key={user.id}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border p-3 transition-colors',
                        isSelected
                          ? 'border-fm-primary bg-fm-surface'
                          : 'border-fm-border bg-white hover:border-fm-accent hover:bg-fm-surface',
                      )}
                    >
                      <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                        <Avatar
                          name={user.name}
                          size={44}
                          decorative
                          className="bg-gradient-to-br from-fm-primary to-fm-secondary text-white"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{user.name}</p>
                        <p className="truncate text-xs text-fm-primary">@{user.username}</p>
                        <p className="truncate text-xs text-fm-muted">{user.email}</p>
                      </div>
                      {isSent ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-fm-success">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" /> Request Sent
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => selectUser(user)}
                          aria-pressed={isSelected}
                          aria-label={`Add ${user.name}`}
                          className={cn(
                            'inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full px-3.5 text-xs font-medium transition-colors',
                            isSelected
                              ? 'bg-fm-primary text-white'
                              : 'bg-fm-bg text-fm-primary hover:bg-fm-primary hover:text-white',
                            FOCUS_RING,
                          )}
                        >
                          {isSelected ? 'Selected' : 'Add'}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <p className="text-sm text-fm-muted">Start typing a username or email to find an account.</p>
        )}
      </div>

      {selected ? (
        <div
          ref={selectedRef}
          className="mt-5 animate-fade-in rounded-2xl border border-fm-border bg-fm-surface p-4 sm:p-5"
        >
          <div className="flex items-center gap-3 border-b border-fm-border pb-4">
            <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Avatar
                name={selected.name}
                size={44}
                decorative
                className="bg-gradient-to-br from-fm-primary to-fm-secondary text-white"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className={EYEBROW}>Selected member</p>
              <p className="truncate text-sm font-semibold">{selected.name}</p>
              <p className="truncate text-xs text-fm-muted">
                @{selected.username} · {selected.email}
              </p>
            </div>
            <button
              type="button"
              onClick={clearSelection}
              aria-label={`Remove ${selected.name} from selection`}
              className={cn(
                'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-fm-border bg-white text-fm-muted transition-colors hover:border-fm-accent hover:text-fm-primary',
                FOCUS_RING,
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 grid gap-4">
            <FormField id={relId} label="Relationship" required error={relError}>
              <select
                id={relId}
                value={relationship}
                aria-invalid={relError ? true : undefined}
                aria-describedby={relError ? `${relId}-error` : undefined}
                onChange={(event) => setRelationship(event.target.value as FamilyRelationship | '')}
                className={controlClass(Boolean(relError))}
              >
                <option value="">Select relationship</option>
                {FAMILY_RELATIONSHIPS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id={msgId} label="Message (optional)">
              <input
                id={msgId}
                type="text"
                maxLength={MESSAGE_MAX}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Add a short note"
                className={controlClass(false)}
              />
            </FormField>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-fm-muted">
              <ShieldCheck className="h-4 w-4 shrink-0 text-fm-primary" aria-hidden="true" />
              They&apos;ll receive a family request and must accept it before anything is shared.
            </p>
            <PrimaryButton onClick={submit} loading={sending} className="w-full sm:w-auto">
              {sending ? 'Sending…' : 'Send Family Request'}
            </PrimaryButton>
          </div>
        </div>
      ) : null}
    </section>
  );
}

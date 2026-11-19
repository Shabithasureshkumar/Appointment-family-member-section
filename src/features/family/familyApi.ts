/**
 * Family Members data layer.
 *
 * This project has no backend yet, so this module is an in-memory stand-in that
 * mimics an async API (latency, rejections). Every function returns a Promise, so
 * replacing the bodies with real `fetch` calls does not change any caller.
 */

export const FAMILY_RELATIONSHIPS = [
  'Father',
  'Mother',
  'Husband',
  'Wife',
  'Son',
  'Daughter',
  'Brother',
  'Sister',
  'Grandfather',
  'Grandmother',
  'Guardian',
  'Other',
] as const;

export type FamilyRelationship = (typeof FAMILY_RELATIONSHIPS)[number];

export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const;
export type Gender = (typeof GENDERS)[number];

export interface MednevoUser {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface FamilyRequestPayload {
  userId: string;
  relationship: FamilyRelationship;
  message?: string;
}

export interface InvitationPayload {
  fullName: string;
  email: string;
  phone: string;
  relationship: FamilyRelationship;
  dateOfBirth: string;
  gender: Gender;
}

export interface IncomingRequest {
  id: string;
  from: MednevoUser;
  relationship: FamilyRelationship;
  message?: string;
}

const LATENCY_MS = 450;
const delay = <T>(value: T, ms = LATENCY_MS) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

const users: MednevoUser[] = [
  { id: 'u-1', name: 'Mednevo', username: 'Mednevo', email: 'madhan.s@mednevo.com' },
  { id: 'u-2', name: 'Praveen', username: 'Praveen', email: 'praveenkumar.s@mednevo.com' },
  { id: 'u-3', name: 'Shaddy', username: 'Shaddy', email: 'rvgvishva@gmail.com' },
  { id: 'u-4', name: 'Nilnia', username: 'Nilnia', email: 'nilnia.eth@gmail.com' },
  { id: 'u-5', name: 'Meera Nair', username: 'meera.nair', email: 'meera.nair@mednevo.com' },
];

const sentRequests = new Map<string, FamilyRequestPayload>();
const sentInvitations = new Map<string, InvitationPayload>();
let incoming: IncomingRequest[] = [
  {
    id: 'req-1',
    from: { id: 'u-9', name: 'Anita Rao', username: 'anita.rao', email: 'anita.rao@mednevo.com' },
    relationship: 'Sister',
    message: 'Adding you so we can share appointments.',
  },
];

export async function searchUsers(query: string): Promise<MednevoUser[]> {
  const q = query.trim().toLowerCase();
  if (!q) return delay([], 0);
  return delay(
    users.filter(
      (user) => user.username.toLowerCase().includes(q) || user.email.toLowerCase().includes(q),
    ),
  );
}

export function getSentRequestIds(): string[] {
  return [...sentRequests.keys()];
}

export async function sendFamilyRequest(payload: FamilyRequestPayload): Promise<void> {
  await delay(null);
  if (sentRequests.has(payload.userId)) {
    throw new Error('A family request has already been sent to this person.');
  }
  sentRequests.set(payload.userId, payload);
}

export async function sendInvitation(payload: InvitationPayload): Promise<void> {
  await delay(null);
  const email = payload.email.trim().toLowerCase();
  if (users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error('This email already has a MedNevo account. Use "Existing MedNevo user" instead.');
  }
  if (sentInvitations.has(email)) {
    throw new Error('An invitation has already been sent to this email.');
  }
  sentInvitations.set(email, payload);
}

export async function listIncomingRequests(): Promise<IncomingRequest[]> {
  return delay([...incoming], 250);
}

export async function respondToRequest(id: string, _action: 'accept' | 'decline'): Promise<void> {
  await delay(null, 300);
  if (!incoming.some((request) => request.id === id)) {
    throw new Error('This request is no longer available.');
  }
  incoming = incoming.filter((request) => request.id !== id);
}

export interface SentConnection {
  id: string;
  kind: 'request' | 'invitation';
  name: string;
  detail: string;
  relationship: FamilyRelationship;
}

/** Everything the user has sent that has not been answered yet, newest first. */
export async function listSentConnections(): Promise<SentConnection[]> {
  const requests: SentConnection[] = [...sentRequests.values()].map((r) => {
    const user = users.find((u) => u.id === r.userId);
    return {
      id: `req-${r.userId}`,
      kind: 'request',
      name: user?.name ?? 'MedNevo user',
      detail: user?.email ?? '',
      relationship: r.relationship,
    };
  });
  const invitations: SentConnection[] = [...sentInvitations.values()].map((i) => ({
    id: `inv-${i.email.toLowerCase()}`,
    kind: 'invitation',
    name: i.fullName,
    detail: i.email,
    relationship: i.relationship,
  }));
  return delay([...requests, ...invitations].reverse(), 0);
}

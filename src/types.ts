import type { Relation } from './constants/relations';

export type { Relation };

export type MemberStatus = 'active' | 'pending' | 'archived';

export interface FamilyMember {
  id: string;
  name: string;
  relation: Relation;
  /** Optional so a member with no photo is representable; the UI falls back to initials. */
  imageUrl?: string;
  status?: MemberStatus;
  dateOfBirth?: string;
  bloodGroup?: string;
}

/** The shape the Add Member form produces, before an id is assigned. */
export interface NewMemberDraft {
  name: string;
  relation: Relation;
  imageUrl?: string;
}

export type NavItem =
  | 'Dashboard'
  | 'Appointment'
  | 'Patient'
  | 'Reports'
  | 'Chats'
  | 'Billing';

export interface NavTab {
  id: NavItem;
  label: string;
  /** False for screens that do not exist yet; those tabs render as unavailable. */
  available: boolean;
}

export type NotificationType = 'success' | 'info' | 'warning';

export interface AppNotification {
  type: NotificationType;
  message: string;
}

export interface CurrentUser {
  name: string;
  role: string;
  avatarUrl?: string;
}

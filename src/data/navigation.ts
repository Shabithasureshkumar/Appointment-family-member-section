import type { NavItem, NavTab } from '../types';

/**
 * Only the Appointment screen exists today. The remaining tabs are kept because
 * they are part of the approved design, but are marked unavailable so they are
 * announced and rendered as such instead of silently doing nothing.
 */
export const NAV_TABS: readonly NavTab[] = [
  { id: 'Dashboard', label: 'Dashboard', available: false },
  { id: 'Appointment', label: 'Appointment', available: true },
  { id: 'Patient', label: 'Patient', available: false },
  { id: 'Reports', label: 'Reports', available: false },
  { id: 'Chats', label: 'Chats', available: false },
  { id: 'Billing', label: 'Billing', available: false },
];

export const DEFAULT_NAV_TAB: NavItem = 'Appointment';

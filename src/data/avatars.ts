export interface AvatarOption {
  id: string;
  url: string;
  label: string;
}

/**
 * Placeholder avatars offered by the Add Member form.
 *
 * These are remote URLs. When a real profile-photo service exists, replace the
 * `url` values here; no presentation component reads image URLs directly, and
 * `<Avatar>` renders an initials fallback whenever a URL fails to load.
 */
export const AVATAR_OPTIONS: readonly AvatarOption[] = [
  {
    id: 'avatar-1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    label: 'Avatar 1',
  },
  {
    id: 'avatar-2',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    label: 'Avatar 2',
  },
  {
    id: 'avatar-3',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    label: 'Avatar 3',
  },
  {
    id: 'avatar-4',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
    label: 'Avatar 4',
  },
  {
    id: 'avatar-5',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    label: 'Avatar 5',
  },
];

export const DEFAULT_AVATAR = AVATAR_OPTIONS[0];

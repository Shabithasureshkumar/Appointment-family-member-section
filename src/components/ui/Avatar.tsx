import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';

export interface AvatarProps {
  src?: string;
  /** Used for the initials fallback and, unless `decorative`, for the alt text. */
  name: string;
  /**
   * Intrinsic pixel size written to the image's width/height attributes so the
   * browser reserves the box and the load does not shift the layout.
   */
  size: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  /** True when a sibling element already conveys the name to assistive tech. */
  decorative?: boolean;
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return '?';
  return parts.map((part) => part.charAt(0).toUpperCase()).join('');
}

/**
 * Avatar image that fills its (already sized and clipped) parent.
 *
 * A missing or failed URL renders initials instead of the browser's broken-image
 * glyph, so a dead photo link never leaves a visibly broken card.
 */
export function Avatar({
  src,
  name,
  size,
  className,
  loading = 'lazy',
  decorative = false,
}: AvatarProps) {
  const [hasFailed, setHasFailed] = useState(false);

  // A new URL deserves a fresh attempt.
  useEffect(() => {
    setHasFailed(false);
  }, [src]);

  if (!src || hasFailed) {
    return (
      <span
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : name}
        aria-hidden={decorative ? true : undefined}
        className={cn(
          'flex h-full w-full items-center justify-center bg-lilac font-sans font-bold tracking-tight text-brand select-none',
          className,
        )}
        style={{ fontSize: Math.round(size * 0.34) }}
      >
        {initialsFrom(name)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={decorative ? '' : name}
      width={size}
      height={size}
      loading={loading}
      decoding="async"
      onError={() => setHasFailed(true)}
      className={cn('h-full w-full object-cover', className)}
    />
  );
}

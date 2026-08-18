import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { TRANSITION } from './styles';

export interface PillProps {
  children: ReactNode;
  className?: string;
}

/**
 * The frosted rounded label that sits beneath a card's avatar.
 *
 * The pill hugs its content, as in the design, but can never exceed the card it
 * sits in (`max-w-full`) — so a long name wraps and clamps instead of pushing the
 * card wider than its grid track. There is deliberately no minimum width.
 */
export function Pill({ children, className }: PillProps) {
  return (
    <div
      className={cn(
        'flex max-w-full flex-col items-center justify-center rounded-full px-4 py-2 backdrop-blur-xl',
        TRANSITION,
        className,
      )}
    >
      {children}
    </div>
  );
}

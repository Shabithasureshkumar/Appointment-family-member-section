import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ContainerProps {
  as?: ElementType;
  className?: string;
  /** Spans the full viewport width instead of the capped shell width. */
  fluid?: boolean;
  children: ReactNode;
}

/**
 * The single content width used by both the header and the main panel, so they
 * stay aligned on wide viewports.
 */
export function Container({ as: Tag = 'div', className, fluid = false, children }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 md:px-8', fluid ? 'lg:px-10' : 'max-w-shell', className)}>{children}</Tag>
  );
}

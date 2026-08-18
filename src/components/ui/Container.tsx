import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * The single content width used by both the header and the main panel, so they
 * stay aligned on wide viewports.
 */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-shell px-4 md:px-8', className)}>{children}</Tag>
  );
}

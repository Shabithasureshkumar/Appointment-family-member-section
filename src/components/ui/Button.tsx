import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FOCUS_RING, TRANSITION } from './styles';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'destructive'
  | 'outline'
  | 'icon'
  | 'plain';

/**
 * Variant classes set colour, border and disabled appearance only. Sizing,
 * padding and radius stay with the caller, so a variant and a caller can never
 * emit two competing utilities for the same CSS property.
 *
 * Disabled styling uses the `disabled:` variant, which always wins over the base
 * classes. Appending "override" classes instead loses to CSS source order — the
 * reason the previous Remove button rendered as enabled while disabled.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-gradient-to-r from-brand to-brand-deep text-white border border-white/20',
    'shadow-[0px_16px_32px_rgba(79,55,138,0.25)]',
    'enabled:cursor-pointer enabled:hover:opacity-95',
    'enabled:hover:shadow-[0px_20px_36px_rgba(79,55,138,0.35)] enabled:active:scale-[0.99]',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
  ),
  secondary: cn(
    'bg-white border border-gray-200 text-gray-700',
    'enabled:cursor-pointer enabled:hover:bg-gray-50',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ),
  danger: cn(
    'bg-red-50/60 border border-red-200 text-danger sm:bg-white sm:border-hairline',
    'enabled:cursor-pointer enabled:hover:bg-red-50/50 enabled:hover:border-red-300',
    'enabled:active:scale-[0.99]',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400',
  ),
  outline: cn(
    'bg-white border border-brand text-brand',
    'enabled:cursor-pointer enabled:hover:bg-lilac enabled:active:scale-[0.99]',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ),
  destructive: cn(
    'bg-danger border border-transparent text-white shadow-md',
    'enabled:cursor-pointer enabled:hover:bg-red-700 enabled:active:scale-[0.99]',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
  ),
  icon: cn(
    'flex items-center justify-center rounded-full',
    'enabled:cursor-pointer',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ),
  plain: 'enabled:cursor-pointer disabled:cursor-not-allowed',
};

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(VARIANTS[variant], TRANSITION, FOCUS_RING, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

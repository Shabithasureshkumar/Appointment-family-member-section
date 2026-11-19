import type { ComponentPropsWithRef, ReactNode } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '../../lib/cn';
import { FOCUS_RING } from '../../components/ui/styles';

export function IconBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-fm-bg text-fm-primary',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  loading = false,
  children,
  className,
  disabled,
  ...rest
}: ComponentPropsWithRef<'button'> & { loading?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fm-primary to-fm-secondary px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)]',
        'transition-[transform,box-shadow,opacity] duration-200',
        'enabled:cursor-pointer enabled:hover:shadow-[0_12px_24px_rgba(124,58,237,0.35)] enabled:active:scale-[0.99]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        FOCUS_RING,
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 rounded-lg py-1 pr-2 text-sm font-medium text-fm-muted transition-colors hover:text-fm-primary',
        FOCUS_RING,
      )}
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Back
    </button>
  );
}

export function FormField({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-fm-text">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

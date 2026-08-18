import type { ComponentPropsWithRef, LabelHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

const CONTROL_BASE =
  'w-full rounded-xl border px-4 py-3 text-sm text-gray-900 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-brand';

/**
 * Exactly one border-colour utility is emitted, chosen here rather than layered
 * as an override, so the invalid state cannot lose to CSS source order.
 */
const borderFor = (invalid: boolean) =>
  invalid ? 'border-danger' : 'border-gray-200 focus:border-transparent';

export interface FieldProps {
  /** Must match the `id` of the control rendered as a child. */
  htmlFor: string;
  label: ReactNode;
  /** Rendered and wired up via aria-describedby when present. */
  error?: string | null;
  errorId?: string;
  children: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

/**
 * Label + control + validation message, with the label explicitly associated to
 * the control via `htmlFor`/`id`.
 */
export function Field({ htmlFor, label, error, errorId, children, labelProps }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        {...labelProps}
        className={cn(
          'mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-gray-700 uppercase',
          labelProps?.className,
        )}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-2 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  invalid?: boolean;
}

export function TextInput({ className, type = 'text', invalid = false, ...rest }: TextInputProps) {
  return (
    <input
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL_BASE, borderFor(invalid), className)}
      {...rest}
    />
  );
}

export interface SelectProps extends ComponentPropsWithRef<'select'> {
  invalid?: boolean;
}

export function Select({ className, children, invalid = false, ...rest }: SelectProps) {
  return (
    <select
      aria-invalid={invalid || undefined}
      className={cn(CONTROL_BASE, borderFor(invalid), 'bg-white', className)}
      {...rest}
    >
      {children}
    </select>
  );
}

import { cn } from '../../lib/cn';

export type Notify = (message: string, type?: 'success' | 'info' | 'warning') => void;

export const CARD =
  'rounded-[20px] border border-fm-border bg-white shadow-fm-card font-sans text-fm-text';

export const EYEBROW = 'text-[11px] font-semibold tracking-[0.08em] text-fm-primary uppercase';

const CONTROL =
  'w-full min-h-12 rounded-xl border bg-white px-4 text-sm text-fm-text placeholder:text-fm-muted/80 transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-fm-primary/30';

export const controlClass = (invalid: boolean) =>
  cn(CONTROL, invalid ? 'border-red-500 focus:border-red-500' : 'border-fm-border focus:border-fm-primary');

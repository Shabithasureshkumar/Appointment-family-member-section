import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/cn';
import type { AppNotification } from '../types';

export interface ToastProps {
  notification: AppNotification | null;
}

const TONE: Record<AppNotification['type'], string> = {
  success: 'bg-emerald-900/90 text-white border-emerald-700/50',
  warning: 'bg-amber-900/90 text-white border-amber-700/50',
  info: 'bg-purple-900/90 text-white border-purple-700/50',
};

/**
 * Single-slot toast.
 *
 * The positioned wrapper is always mounted so assistive technology is observing
 * the region before a message is inserted into it. Warnings use `role="alert"`
 * (assertive); everything else uses `role="status"` (polite).
 */
export function Toast({ notification }: ToastProps) {
  const isWarning = notification?.type === 'warning';

  return (
    <div className="pointer-events-none fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:w-auto">
      {notification ? (
        <div
          role={isWarning ? 'alert' : 'status'}
          aria-live={isWarning ? 'assertive' : 'polite'}
          aria-atomic="true"
          className={cn(
            'pointer-events-auto flex items-center gap-3 rounded-3xl border px-6 py-3.5 shadow-2xl backdrop-blur-md sm:rounded-full',
            'animate-toast-in',
            TONE[notification.type],
          )}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      ) : null}
    </div>
  );
}

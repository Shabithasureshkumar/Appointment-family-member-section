import { useCallback, useEffect, useId, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode, RefObject } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from './Button';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function focusableWithin(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.offsetWidth > 0 || element.offsetHeight > 0,
  );
}

export interface ModalProps {
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  /** Focused when the dialog opens; defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeOnOverlayClick?: boolean;
  panelClassName?: string;
  /** Rendered next to the heading, e.g. a destructive-action colour treatment. */
  headerClassName?: string;
}

/**
 * Accessible dialog.
 *
 * Render it only while it should be open — it has no `isOpen` prop by design, so
 * unmounting resets any form state it contains rather than leaving a stale draft
 * behind.
 *
 * Handles: dialog semantics, focus entry, focus restoration, Tab/Shift+Tab
 * trapping, Escape, body scroll lock and overlay dismissal.
 */
export function Modal({
  onClose,
  title,
  description,
  icon,
  children,
  initialFocusRef,
  closeOnOverlayClick = true,
  panelClassName,
  headerClassName,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Kept in a ref so the keydown handler never closes over a stale callback.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    // Compensate for the scrollbar so locking scroll does not shift the page.
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusInitialElement = () => {
      const target =
        initialFocusRef?.current ?? focusableWithin(panelRef.current)[0] ?? panelRef.current;
      target?.focus();
    };

    // Synchronously, so the focus move survives StrictMode's mount/unmount/mount
    // cycle, then once more after paint in case a child mounted late.
    focusInitialElement();
    const frame = requestAnimationFrame(focusInitialElement);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      const focusables = focusableWithin(panel);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      // Nothing focusable inside: hold focus on the panel itself rather than
      // letting Tab escape to the page behind the dialog.
      if (!first || !last) {
        event.preventDefault();
        panel?.focus();
        return;
      }

      const active = document.activeElement;
      const insidePanel = panel?.contains(active) ?? false;

      if (event.shiftKey && (active === first || !insidePanel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !insidePanel)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown, true);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;

      // Return focus to whatever opened the dialog. Safe under StrictMode's
      // mount/unmount/mount cycle because the re-run focuses the dialog again
      // synchronously.
      previouslyFocused?.focus?.();
    };
  }, [initialFocusRef]);

  const handleOverlayMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (!closeOnOverlayClick) return;
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in"
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          'relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-purple-100 bg-white p-6 shadow-2xl focus:outline-none sm:p-8',
          panelClassName,
        )}
      >
        <Button
          variant="plain"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className={cn('mb-6 flex items-center gap-3 pr-10', headerClassName)}>
          {icon}
          <div className="min-w-0">
            <h2 id={titleId} className="text-xl font-bold break-words text-gray-900">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="text-xs break-words text-gray-500">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

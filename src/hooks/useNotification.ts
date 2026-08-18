import { useCallback, useEffect, useRef, useState } from 'react';
import type { AppNotification, NotificationType } from '../types';

const DISMISS_AFTER_MS = 4000;

export interface UseNotification {
  notification: AppNotification | null;
  notify: (message: string, type?: NotificationType) => void;
  dismiss: () => void;
}

/**
 * Single-slot toast state.
 *
 * The pending timer is tracked in a ref and cleared before each new toast, so an
 * earlier timeout can never dismiss a later message. The timer is also cleared on
 * unmount.
 */
export function useNotification(): UseNotification {
  const [notification, setNotification] = useState<AppNotification | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clearTimer();
    setNotification(null);
  }, [clearTimer]);

  const notify = useCallback(
    (message: string, type: NotificationType = 'success') => {
      clearTimer();
      setNotification({ message, type });
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setNotification(null);
      }, DISMISS_AFTER_MS);
    },
    [clearTimer],
  );

  useEffect(() => clearTimer, [clearTimer]);

  return { notification, notify, dismiss };
}

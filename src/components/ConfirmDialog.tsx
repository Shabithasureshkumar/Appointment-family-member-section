import { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

export interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Confirmation step for a destructive action. Render only while it should be
 * open. Focus starts on Cancel so that a stray Enter or Space does not confirm.
 */
export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal
      title={title}
      description={description}
      onClose={onCancel}
      initialFocusRef={cancelRef}
      icon={
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-danger">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
      }
    >
      <div className="flex flex-col gap-3 pt-2 min-[400px]:flex-row min-[400px]:items-center">
        <Button
          ref={cancelRef}
          variant="secondary"
          onClick={onCancel}
          className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold"
        >
          {cancelLabel}
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

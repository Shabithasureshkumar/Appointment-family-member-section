import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Image as ImageIcon, UserPlus } from 'lucide-react';
import { cn } from '../lib/cn';
import { AVATAR_OPTIONS, DEFAULT_AVATAR_URL } from '../data/avatars';
import { ADDABLE_RELATIONS, DEFAULT_ADD_RELATION } from '../constants/relations';
import type { AddMemberResult } from '../hooks/useFamilyMembers';
import type { NewMemberDraft, Relation } from '../types';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Field, Select, TextInput } from './ui/Input';
import { Modal } from './ui/Modal';
import { FOCUS_RING } from './ui/styles';

export interface AddMemberModalProps {
  onClose: () => void;
  /** Returns a result so duplicate/invalid names can be surfaced in the form. */
  onAdd: (draft: NewMemberDraft) => AddMemberResult;
}

const AVATAR_INTRINSIC_SIZE = 48;

/**
 * Render only while the dialog should be open. Unmounting on close is what makes
 * the next open start from a clean draft — name, relation and avatar all reset.
 */
export function AddMemberModal({ onClose, onAdd }: AddMemberModalProps) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<Relation>(DEFAULT_ADD_RELATION);
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR_URL);
  const [error, setError] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const nameId = useId();
  const relationId = useId();
  const errorId = useId();
  const avatarLabelId = useId();

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Kept even though the submit button is disabled without a name: the guard
    // must not depend on the button's state.
    if (!trimmedName) {
      setError('Please enter a valid name.');
      nameInputRef.current?.focus();
      return;
    }

    const result = onAdd({ name: trimmedName, relation, imageUrl: avatarUrl });

    if (!result.ok) {
      setError(result.error);
      nameInputRef.current?.focus();
      return;
    }

    onClose();
  };

  return (
    <Modal
      title="Add Family Member"
      description="Include a new member for medical assistance"
      onClose={onClose}
      initialFocusRef={nameInputRef}
      icon={
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-brand">
          <UserPlus className="h-5 w-5" aria-hidden="true" />
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name Field */}
        <Field htmlFor={nameId} label="Full Name" error={error} errorId={errorId}>
          <TextInput
            id={nameId}
            name="memberName"
            ref={nameInputRef}
            placeholder="e.g. Lucas Brock"
            value={name}
            autoComplete="off"
            // `required` for the announcement; the form is `noValidate` because
            // native validation accepts whitespace-only input as a name.
            required
            invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => {
              const value = event.target.value;
              setName(value);
              // Whitespace-only input satisfies `required` but is not a name, so
              // say so immediately rather than leaving a disabled button
              // unexplained.
              setError(value.length > 0 && !value.trim() ? 'Please enter a valid name.' : null);
            }}
            onBlur={(event) => {
              const value = event.target.value;
              if (value.length > 0 && !value.trim()) {
                setError('Please enter a valid name.');
              }
            }}
          />
        </Field>

        {/* Relation Field */}
        <Field htmlFor={relationId} label="Relationship">
          <Select
            id={relationId}
            name="memberRelation"
            value={relation}
            onChange={(event) => setRelation(event.target.value as Relation)}
          >
            {ADDABLE_RELATIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        {/* Avatar Selection */}
        <div>
          <p
            id={avatarLabelId}
            className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-gray-700 uppercase"
          >
            <ImageIcon className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
            <span>Select Profile Avatar</span>
          </p>
          <div
            role="radiogroup"
            aria-labelledby={avatarLabelId}
            className="flex items-center gap-3 overflow-x-auto py-1"
          >
            {AVATAR_OPTIONS.map((option) => {
              const isSelected = avatarUrl === option.url;
              return (
                <button
                  type="button"
                  key={option.id}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={option.label}
                  onClick={() => setAvatarUrl(option.url)}
                  className={cn(
                    'relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 transition-[transform,opacity,border-color,box-shadow]',
                    FOCUS_RING,
                    isSelected
                      ? 'scale-110 border-brand shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100',
                  )}
                >
                  <Avatar
                    src={option.url}
                    name={option.label}
                    size={AVATAR_INTRINSIC_SIZE}
                    decorative
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex flex-col gap-3 pt-2 min-[400px]:flex-row min-[400px]:items-center">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!canSubmit}
            className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold shadow-md"
          >
            Add Member
          </Button>
        </div>
      </form>
    </Modal>
  );
}

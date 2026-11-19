import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Mail, UserPlus } from 'lucide-react';
import { cn } from '../../lib/cn';
import { FOCUS_RING } from '../../components/ui/styles';
import { FAMILY_RELATIONSHIPS, GENDERS, sendInvitation } from './familyApi';
import type { FamilyRelationship, Gender } from './familyApi';
import { BackButton, FormField, IconBadge, PrimaryButton } from './shared';
import { CARD, EYEBROW, controlClass } from './styles';
import type { Notify } from './styles';

const COUNTRY_CODES = ['+1', '+44', '+61', '+91', '+971'] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Values {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  relationship: FamilyRelationship | '';
  dateOfBirth: string;
  gender: Gender | '';
}

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  fullName: '',
  email: '',
  countryCode: '+1',
  phone: '',
  relationship: '',
  dateOfBirth: '',
  gender: '',
};

const todayIso = () => new Date().toISOString().slice(0, 10);

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.fullName.trim()) errors.fullName = 'Enter their full name';
  if (!v.email.trim()) errors.email = 'Enter their email address';
  else if (!EMAIL_PATTERN.test(v.email.trim())) errors.email = 'Enter a valid email address';
  const digits = v.phone.replace(/\D/g, '');
  if (!digits) errors.phone = 'Enter their phone number';
  else if (digits.length < 7 || digits.length > 14) errors.phone = 'Enter a valid phone number';
  if (!v.relationship) errors.relationship = 'Select how this person is related to you';
  if (!v.dateOfBirth) errors.dateOfBirth = 'Enter their date of birth';
  else if (v.dateOfBirth > todayIso()) errors.dateOfBirth = 'Date of birth cannot be in the future';
  if (!v.gender) errors.gender = 'Select a gender';
  return errors;
}

export function InviteForm({
  onBack,
  notify,
  onChanged,
}: {
  onBack: () => void;
  notify: Notify;
  onChanged: () => void;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const base = useId();
  const id = (name: keyof Values) => `${base}-${name}`;

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // Once the user has tried to submit, keep messages in sync as they fix fields.
    if (submitted) setErrors(validate(next));
  };

  const a11y = (name: keyof Values) => ({
    id: id(name),
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${id(name)}-error` : undefined,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Values)[])[0];
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }
    setSending(true);
    try {
      await sendInvitation({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: `${values.countryCode} ${values.phone.trim()}`,
        relationship: values.relationship as FamilyRelationship,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender as Gender,
      });
      onChanged();
      notify(`Invitation sent to ${values.fullName.trim()}.`, 'success');
      setSentTo(values.fullName.trim());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not send the invitation. Try again.';
      setErrors((current) => ({ ...current, email: message }));
      notify(message, 'warning');
      document.getElementById(id('email'))?.focus();
    } finally {
      setSending(false);
    }
  };

  if (sentTo) {
    return (
      <section className={cn(CARD, 'p-6 text-center sm:p-10')} role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-fm-success">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-xl font-semibold">Invitation sent</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-fm-muted">
          {sentTo} will receive an email with a link to create their MedNevo account. Their status is
          now <span className="font-medium text-fm-warning">Invitation pending</span>.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setValues(EMPTY);
              setErrors({});
              setSubmitted(false);
              setSentTo(null);
            }}
            className={cn(
              'min-h-11 cursor-pointer rounded-xl border border-fm-border px-5 text-sm font-medium text-fm-primary transition-colors hover:bg-fm-bg',
              FOCUS_RING,
            )}
          >
            Invite another member
          </button>
          <PrimaryButton onClick={onBack}>Back to Family Members</PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="invite-heading" className={cn(CARD, 'p-5 sm:p-7')}>
      <BackButton onClick={onBack} />

      <div className="mt-5 flex items-center gap-4">
        <IconBadge className="bg-fm-bg text-fm-primary">
          <UserPlus className="h-5 w-5" />
        </IconBadge>
        <div>
          <p className={EYEBROW}>New member</p>
          <h2 id="invite-heading" className="text-xl font-semibold">
            Invite a new family member
          </h2>
          <p className="text-sm text-fm-muted">
            Enter their details and we&apos;ll send them a MedNevo invitation.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id={id('fullName')} label="Full Name" required error={errors.fullName}>
            <input
              {...a11y('fullName')}
              type="text"
              autoComplete="off"
              value={values.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              className={controlClass(Boolean(errors.fullName))}
            />
          </FormField>

          <FormField id={id('email')} label="Email" required error={errors.email}>
            <input
              {...a11y('email')}
              type="email"
              autoComplete="off"
              value={values.email}
              onChange={(e) => set('email', e.target.value)}
              className={controlClass(Boolean(errors.email))}
            />
          </FormField>

          <FormField id={id('phone')} label="Phone Number" required error={errors.phone}>
            <div className="flex gap-2">
              <select
                aria-label="Country code"
                value={values.countryCode}
                onChange={(e) => set('countryCode', e.target.value)}
                className={cn(controlClass(false), 'w-24 shrink-0 px-3')}
              >
                {COUNTRY_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <input
                {...a11y('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="off"
                value={values.phone}
                onChange={(e) => set('phone', e.target.value)}
                className={cn(controlClass(Boolean(errors.phone)), 'min-w-0')}
              />
            </div>
          </FormField>

          <FormField id={id('relationship')} label="Relationship" required error={errors.relationship}>
            <select
              {...a11y('relationship')}
              value={values.relationship}
              onChange={(e) => set('relationship', e.target.value as Values['relationship'])}
              className={controlClass(Boolean(errors.relationship))}
            >
              <option value="">Select relationship</option>
              {FAMILY_RELATIONSHIPS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id={id('dateOfBirth')} label="Date of Birth" required error={errors.dateOfBirth}>
            <input
              {...a11y('dateOfBirth')}
              type="date"
              max={todayIso()}
              value={values.dateOfBirth}
              onChange={(e) => set('dateOfBirth', e.target.value)}
              className={controlClass(Boolean(errors.dateOfBirth))}
            />
          </FormField>

          <FormField id={id('gender')} label="Gender" required error={errors.gender}>
            <select
              {...a11y('gender')}
              value={values.gender}
              onChange={(e) => set('gender', e.target.value as Values['gender'])}
              className={controlClass(Boolean(errors.gender))}
            >
              <option value="">Select gender</option>
              {GENDERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-fm-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-fm-primary" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-medium">Invitation email</p>
              <p className="text-xs text-fm-muted">
                They&apos;ll receive a secure link to create their MedNevo account.
              </p>
            </div>
          </div>
          <PrimaryButton type="submit" loading={sending} className="w-full sm:w-auto sm:min-w-44">
            {sending ? 'Sending…' : 'Send Invitation'}
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}

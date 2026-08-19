import { ShieldCheck } from 'lucide-react';

/**
 * Security reassurance.
 *
 * Mobile follows the mobile design: a left-aligned card with a supporting second
 * line. From `sm` up it is the approved centred pill, and the second line is
 * hidden so desktop copy is unchanged.
 */
export function PrivacyMessage() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-[520px] items-center justify-center px-2 sm:max-w-[460px] md:mt-10">
      <div className="flex w-full items-start gap-3 rounded-2xl border border-white/60 bg-lilac-deep/70 px-4 py-3 text-left shadow-2xs backdrop-blur-md sm:w-auto sm:items-center sm:justify-center sm:gap-2.5 sm:rounded-full sm:px-6 sm:py-3 sm:text-center">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 fill-brand/15 text-brand sm:mt-0 sm:h-[17px] sm:w-[17px]" />
        <span className="font-sans text-[13px] leading-snug font-normal text-ink-soft sm:text-center sm:text-[14.27px] sm:leading-tight">
          Your family&apos;s health information is secure and private
          <span className="mt-1 block text-[12px] leading-snug text-ink-soft/70 sm:hidden">
            End-to-end encrypted medical history storage.
          </span>
        </span>
      </div>
    </div>
  );
}

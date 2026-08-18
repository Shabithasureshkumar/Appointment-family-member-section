import { ShieldCheck } from 'lucide-react';

export function PrivacyMessage() {
  return (
    <div className="mx-auto mt-8 flex max-w-[460px] items-center justify-center px-2 md:mt-10">
      <div className="flex items-center justify-center gap-2.5 rounded-full border border-white/60 bg-lilac-deep/70 px-6 py-3 shadow-2xs backdrop-blur-md">
        <ShieldCheck className="h-4 w-4 shrink-0 fill-brand/15 text-brand sm:h-[17px] sm:w-[17px]" />
        <span className="text-center font-sans text-[13px] leading-tight font-normal text-ink-soft sm:text-[14.27px]">
          Your family&apos;s health information is secure and private
        </span>
      </div>
    </div>
  );
}

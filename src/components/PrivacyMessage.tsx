import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyMessage: React.FC = () => {
  return (
    <div className="flex items-center justify-center max-w-[430px] mx-auto mt-4 mb-8 px-2">
      <div className="flex items-center justify-center gap-2.5 bg-[#F4EFF8]/70 border border-white/60 rounded-full px-5 py-2.5 shadow-2xs backdrop-blur-md">
        <ShieldCheck className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#6B38D4] shrink-0 fill-[#6B38D4]/15" />
        <span className="font-sans font-normal text-[13px] sm:text-[14.27px] text-[#494551] text-center leading-tight">
          Your family's health information is secure and private
        </span>
      </div>
    </div>
  );
};

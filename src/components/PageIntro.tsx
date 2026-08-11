import React from 'react';

export const PageIntro: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center max-w-[1157px] mx-auto pt-2 pb-6 px-4">
      {/* Heading 1 */}
      <h1 className="text-2xl sm:text-3xl md:text-[33px] font-bold text-[#000000] tracking-[-0.66px] leading-tight md:leading-[39.64px] max-w-[821px]">
        Which Family Member Requires Medical Assistance?
      </h1>

      {/* Description / Subtitle */}
      <p className="mt-3 text-sm sm:text-base md:text-[18.35px] font-normal text-[#494551] leading-relaxed md:leading-[27.53px] max-w-[530px]">
        Choose the person who needs medical assistance today. We ensure all personal health data remains strictly private.
      </p>
    </div>
  );
};

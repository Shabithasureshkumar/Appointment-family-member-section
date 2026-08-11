import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActionButtonsProps {
  selectedMemberName: string;
  onConfirm: () => void;
  onRemove: () => void;
  disableRemove?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onConfirm,
  onRemove,
  disableRemove = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-[17px] w-full max-w-[1010px] mx-auto py-2">
      {/* Primary Confirm Button */}
      <button
        onClick={onConfirm}
        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#6B38D4] to-[#5C24FF] text-white px-8 py-4 rounded-[17.5px] font-sans font-semibold text-[16px] sm:text-[17px] shadow-[0px_16px_32px_rgba(79,55,138,0.25)] hover:opacity-95 hover:shadow-[0px_20px_36px_rgba(79,55,138,0.35)] active:scale-[0.99] transition-all cursor-pointer border border-white/20"
      >
        <span>Confirm Selected Member</span>
        <ArrowRight className="w-4 h-4 sm:w-[15px] sm:h-[15px] text-white stroke-[2.5]" />
      </button>

      {/* Secondary Remove Button */}
      <button
        onClick={onRemove}
        disabled={disableRemove}
        className={`w-full sm:w-auto flex items-center justify-center px-7 py-4 rounded-[17.5px] bg-white border border-[#CBC4D2] text-[#D22B2B] font-sans font-normal text-[16px] sm:text-[17px] transition-all cursor-pointer ${
          disableRemove
            ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
            : 'hover:bg-red-50/50 hover:border-red-300 active:scale-[0.99]'
        }`}
      >
        <span>Remove Member</span>
      </button>
    </div>
  );
};

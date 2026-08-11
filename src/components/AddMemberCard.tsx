import React from 'react';
import { UserPlus } from 'lucide-react';

interface AddMemberCardProps {
  onAddMember: () => void;
}

export const AddMemberCard: React.FC<AddMemberCardProps> = ({ onAddMember }) => {
  return (
    <button
      onClick={onAddMember}
      className="group relative flex flex-col items-center justify-between transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B38D4] focus-visible:ring-offset-2 rounded-3xl p-1.5 opacity-90 hover:opacity-100 hover:scale-102"
      aria-label="Add new family member"
    >
      {/* Dashed Purple Circle Container */}
      <div className="relative mb-4 flex items-center justify-center p-1.5">
        <div className="w-[120px] h-[120px] sm:w-[128px] sm:h-[128px] rounded-full bg-[#F7F2FA]/60 flex items-center justify-center border-4 border-dashed border-[#6B38D4]/30 group-hover:border-[#6B38D4]/60 transition-all duration-300 group-hover:bg-[#F7F2FA]">
          <UserPlus className="w-8 h-8 text-[#6B38D4] stroke-[2.2] group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>

      {/* Bottom Pill Container */}
      <div className="w-full min-w-[130px] px-4 py-2.5 rounded-full flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl border border-white/50 border-dashed shadow-2xs group-hover:bg-white/90 group-hover:border-[#6B38D4]/40 transition-all duration-300">
        <span className="font-sans font-bold text-[15px] sm:text-[16px] text-[#494551] group-hover:text-[#6B38D4] transition-colors leading-tight">
          Add Member
        </span>
      </div>
    </button>
  );
};

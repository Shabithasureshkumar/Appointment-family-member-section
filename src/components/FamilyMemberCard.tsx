import React from 'react';
import type { FamilyMember } from '../types';

interface FamilyMemberCardProps {
  member: FamilyMember;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  member,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(member.id)}
      className={`group relative flex flex-col items-center justify-between transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B38D4] focus-visible:ring-offset-2 rounded-3xl p-1.5 ${
        isSelected ? 'scale-105 z-10' : 'hover:scale-102 opacity-90 hover:opacity-100'
      }`}
      aria-label={`Select ${member.name}, relation ${member.relation}`}
    >
      {/* Circle Image Wrapper */}
      <div className="relative mb-4 flex items-center justify-center">
        {/* Selected Rings Effect */}
        {isSelected ? (
          <div className="selected-ring-container p-1.5">
            <div className="w-[120px] h-[120px] sm:w-[128px] sm:h-[128px] rounded-full overflow-hidden border-[1.5px] border-[#6B38D4] shadow-md transition-transform duration-300 group-hover:scale-102">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="w-[120px] h-[120px] sm:w-[128px] sm:h-[128px] rounded-full overflow-hidden border-4 border-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-md">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Name & Relation Bottom Pill Container */}
      <div
        className={`w-full min-w-[125px] px-4 py-2 rounded-full flex flex-col items-center justify-center backdrop-blur-xl transition-all duration-300 ${
          isSelected
            ? 'bg-white/90 border border-white/60 shadow-[0px_2px_12px_rgba(107,56,212,0.15)]'
            : 'bg-white/70 border border-white/40 shadow-xs hover:bg-white/85'
        }`}
      >
        <span
          className={`font-sans text-[15px] sm:text-[16px] leading-tight text-center font-bold tracking-tight ${
            isSelected ? 'text-[#6B38D4]' : 'text-[#1D1B20]'
          }`}
        >
          {member.name}
        </span>
        <span className="font-sans font-normal text-[10.5px] sm:text-[11px] text-[#494551] uppercase tracking-[0.5px] mt-0.5">
          {member.relation}
        </span>
      </div>
    </button>
  );
};

import React from 'react';

export const MedicalLogo: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-2 transition-transform hover:scale-105 duration-300">
      <svg
        width="96"
        height="96"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 md:w-24 md:h-24 drop-shadow-sm"
      >
        {/* Main Blue Medical Cross with Stethoscope integration */}
        <g filter="url(#glow)">
          {/* Vertical bar of cross */}
          <rect x="36" y="15" width="28" height="70" rx="14" fill="#38BDF8" />
          {/* Horizontal bar of cross */}
          <rect x="15" y="36" width="70" height="28" rx="14" fill="#38BDF8" />
          
          {/* Inner Stethoscope Detail lines / White Highlights */}
          <path
            d="M 32 30 C 26 36, 26 50, 34 56 C 42 62, 54 62, 60 54 L 68 46"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Stethoscope Earpieces & Diaphragm */}
          <circle cx="30" cy="28" r="4.5" fill="#FFFFFF" />
          <circle cx="70" cy="44" r="5.5" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" />
        </g>

        <defs>
          <filter id="glow" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#38BDF8" floodOpacity="0.2" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

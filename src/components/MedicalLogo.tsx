/**
 * Hero mark. Sized to the ~128px the design calls for on desktop, stepping down
 * on smaller viewports; the viewBox keeps the aspect ratio fixed.
 */
export function MedicalLogo() {
  return (
    <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
      <svg
        width="128"
        height="128"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 drop-shadow-sm sm:h-28 sm:w-28 md:h-32 md:w-32"
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
}

import iconUrl from '../assets/mednevo-icon.webp';

/** Hero brand mark: the MedNevo icon only, without the wordmark. */
export function MedicalLogo() {
  return (
    <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
      <img
        src={iconUrl}
        alt="MedNevo"
        width={128}
        height={128}
        className="h-24 w-24 object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
      />
    </div>
  );
}

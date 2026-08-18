/**
 * Hero heading and subtitle.
 *
 * The heading's max-width is set so the full sentence stays on one line at
 * desktop; the subtitle is capped narrower so it breaks into the two balanced
 * lines the design shows.
 */
export function PageIntro() {
  return (
    <div className="mt-10 flex flex-col items-center text-center md:mt-12">
      {/* Heading 1 */}
      <h1 className="max-w-[880px] text-2xl leading-tight font-bold tracking-[-0.66px] text-black sm:text-3xl md:text-[33px] md:leading-[39.64px]">
        Which Family Member Requires Medical Assistance?
      </h1>

      {/* Description / Subtitle */}
      <p className="mt-5 max-w-[560px] text-sm leading-relaxed font-normal text-ink-soft sm:text-base md:mt-6 md:text-[18.35px] md:leading-[27.53px]">
        Choose the person who needs medical assistance today. We ensure all personal health data
        remains strictly private.
      </p>
    </div>
  );
}

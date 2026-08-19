/**
 * Hero heading and subtitle.
 *
 * The mobile design uses shorter copy than desktop. Both strings live inside a
 * single `<h1>`/`<p>` with only one rendered at a time, rather than as two
 * sibling headings — that keeps the document outline and the accessible name
 * single, since `display: none` removes the other from the accessibility tree.
 *
 * The desktop heading's max-width keeps the full sentence on one line; the
 * subtitle is capped narrower so it breaks into the two balanced lines the
 * design shows.
 */
export function PageIntro() {
  return (
    <div className="mt-10 flex flex-col items-center text-center md:mt-12">
      {/* Heading 1 */}
      {/*
        22px on mobile, not the previous 24px: measured against the mobile design
        the heading occupies ~332px of a 390px frame, which is 22px at this weight
        and tracking. It also keeps the shorter mobile copy on one line from 375px
        up. The sm/md sizes are the approved desktop values and are untouched.
      */}
      <h1 className="max-w-[880px] text-[22px] leading-tight font-bold tracking-[-0.66px] text-black sm:text-3xl md:text-[33px] md:leading-[39.64px]">
        <span className="sm:hidden">Who Needs Medical Assistance?</span>
        <span className="hidden sm:inline">
          Which Family Member Requires Medical Assistance?
        </span>
      </h1>

      {/* Description / Subtitle */}
      <p className="mt-4 max-w-[560px] text-sm leading-relaxed font-normal text-ink-soft sm:mt-5 sm:text-base md:mt-6 md:text-[18.35px] md:leading-[27.53px]">
        <span className="sm:hidden">
          Select the family member for this medical consultation session.
        </span>
        <span className="hidden sm:inline">
          Choose the person who needs medical assistance today. We ensure all personal health data
          remains strictly private.
        </span>
      </p>
    </div>
  );
}

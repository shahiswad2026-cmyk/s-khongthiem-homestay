import { LeafOrnament } from "./icons";
import { Reveal } from "./reveal";

/**
 * Consistent editorial section header:
 * eyebrow (small, letterspaced) + elegant serif heading + optional subtitle.
 */
export function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  align = "center",
  tone = "dark",
}: {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleColor = tone === "dark" ? "text-evergreen" : "text-ivory";
  const subColor = tone === "dark" ? "text-muted-ink" : "text-sage";

  return (
    <Reveal className={`flex flex-col ${alignCls} gap-3.5`}>
      <p className={`eyebrow ${tone === "dark" ? "text-wood" : "text-leaf"}`}>{eyebrow}</p>
      <h2
        className={`font-display text-balance text-[1.75rem] leading-[1.18] font-semibold sm:text-4xl sm:leading-[1.15] lg:text-[2.75rem] ${titleColor}`}
      >
        {heading}
      </h2>
      <LeafOrnament className="h-5 w-24 text-leaf" />
      {subtitle ? (
        <p className={`max-w-xl text-pretty text-[15.5px] leading-relaxed sm:text-base ${subColor}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

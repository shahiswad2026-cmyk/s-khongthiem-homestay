import { food } from "@/config/site";
import { BookingButton } from "./booking-button";
import { LeafOrnament } from "./icons";
import { Reveal } from "./reveal";
import { UtensilsCrossed, Sun, Moon } from "lucide-react";

/**
 * Warm, text-forward food & hospitality section.
 * Meal availability (veg/non-veg; breakfast, lunch, dinner on request) is
 * confirmed on the property's OTA listing — nothing unverified is claimed.
 * No photo exists for dining yet, so a calm decorative panel is used
 * (clearly decorative — not presented as a photo of the property).
 */
export function Food() {
  return (
    <section
      aria-labelledby="food-heading"
      className="relative overflow-hidden bg-[#F5F1E4]"
    >
      {/* soft botanical background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-sage/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 bottom-0 h-64 w-64 rounded-full bg-leaf/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="mx-auto max-w-xl lg:mx-0">
            <Reveal>
              <p className="eyebrow text-wood">{food.eyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="food-heading"
                className="font-display mt-4 text-balance text-[1.9rem] font-semibold leading-[1.18] text-evergreen sm:text-4xl sm:leading-[1.15] lg:text-[2.6rem]"
              >
                {food.heading}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <LeafOrnament className="mt-6 h-5 w-24 text-leaf" />
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-md text-pretty text-[16px] leading-[1.8] text-muted-ink">
                {food.text}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <BookingButton className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-sage bg-white/80 px-5 py-2.5 text-[13px] font-semibold text-evergreen shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-leaf" />
                {food.cta}
              </BookingButton>
            </Reveal>
          </div>

          {/* Decorative panel — no dining photo available yet */}
          <Reveal delay={120} className="relative">
            <div
              aria-hidden="true"
              className="relative mx-auto flex aspect-[4/3] w-full max-w-md flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-sage-soft via-white to-sage/70 shadow-[0_30px_60px_-32px_rgba(21,58,45,0.35)]"
            >
              <LeafOrnament className="h-5 w-24 text-leaf" />
              <ul className="flex flex-col items-center gap-3.5 text-evergreen">
                <li className="flex items-center gap-3 text-[14.5px] font-semibold tracking-wide">
                  <Sun className="h-4.5 w-4.5 text-wood" aria-hidden="true" />
                  Breakfast & lunch on request
                </li>
                <li className="flex items-center gap-3 text-[14.5px] font-semibold tracking-wide">
                  <Moon className="h-4.5 w-4.5 text-wood" aria-hidden="true" />
                  Dinner & local specialities
                </li>
                <li className="flex items-center gap-3 text-[14.5px] font-semibold tracking-wide">
                  <UtensilsCrossed
                    className="h-4.5 w-4.5 text-wood"
                    aria-hidden="true"
                  />
                  Veg &amp; non-veg options
                </li>
              </ul>
              <p className="px-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
                Menu shared personally on WhatsApp
              </p>
              <span className="absolute -bottom-3 left-8 right-8 h-1.5 rounded-full bg-wood/30" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

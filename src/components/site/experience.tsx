import { experience } from "@/config/site";
import { SectionHeading } from "./section-heading";
import { BookingButton } from "./booking-button";
import { experienceIcons, LeafOrnament } from "./icons";
import { Reveal } from "./reveal";

/**
 * Nearby-experience cards. Only verified area context is referenced
 * (Living Root Bridge of Riwai, Mawlynnong village, Dawki / East Khasi
 * Hills attractions) — no invented distances, tours or inclusions.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-y scroll-mt-20 bg-ivory"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <div id="experience-heading">
          <SectionHeading eyebrow={experience.eyebrow} heading={experience.heading} />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {experience.cards.map((card, i) => {
            const Icon = experienceIcons[card.motif];
            return (
              <Reveal as="article" key={card.id} delay={i * 110} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-sage/80 bg-white p-6 shadow-[0_16px_44px_-32px_rgba(21,58,45,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-32px_rgba(21,58,45,0.38)] sm:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-soft text-forest ring-1 ring-sage">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-evergreen">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.75] text-muted-ink">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-5 lg:mt-14">
          <LeafOrnament className="h-5 w-28 text-leaf" />
          <BookingButton className="rounded-full bg-forest px-8 py-3.5 text-sm font-bold text-ivory shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-evergreen hover:shadow-xl">
            {experience.cta}
          </BookingButton>
        </Reveal>
      </div>
    </section>
  );
}

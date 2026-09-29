import { about } from "@/config/site";
import { SiteImage } from "./site-image";
import { SectionHeading } from "./section-heading";
import { highlightIcons } from "./icons";
import { Reveal } from "./reveal";

export function About() {
  return (
    <section className="section-y bg-ivory" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 lg:gap-20">
          {/* Editorial asymmetric visual composition */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="img-zoom-parent group relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-32px_rgba(21,58,45,0.45)]">
              <SiteImage
                src={about.mainImage.src}
                alt={about.mainImage.alt}
                className="img-zoom aspect-[4/5] w-full object-cover sm:aspect-[5/5.4]"
              />
            </div>

            {/* Overlapping accent card */}
            <div className="absolute -bottom-8 -right-2 w-40 overflow-hidden rounded-xl border-4 border-ivory shadow-xl sm:-right-6 sm:w-52 lg:-right-10">
              <SiteImage
                src={about.accentImage.src}
                alt={about.accentImage.alt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            {/* Warm wood accent detail */}
            <div
              aria-hidden="true"
              className="absolute -left-3 top-8 hidden h-24 w-1.5 rounded-full bg-wood/70 sm:block lg:-left-5"
            />
            <div
              aria-hidden="true"
              className="absolute -left-3 top-36 hidden h-10 w-1.5 rounded-full bg-leaf/70 sm:block lg:-left-5"
            />
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <div id="about-heading">
              <SectionHeading
                eyebrow={about.eyebrow}
                heading={about.heading}
                align="left"
              />
            </div>
            <Reveal delay={120}>
              <p className="mt-6 max-w-lg text-pretty text-[15.5px] leading-[1.75] text-muted-ink sm:text-base">
                {about.description}
              </p>
            </Reveal>

            <ul className="mt-9 space-y-6">
              {about.highlights.map((h, i) => {
                const Icon =
                  highlightIcons[h.id as keyof typeof highlightIcons];
                return (
                  <Reveal as="li" key={h.id} delay={160 + i * 90}>
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sage bg-white text-forest shadow-sm">
                        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-evergreen">
                          {h.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-ink">
                          {h.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

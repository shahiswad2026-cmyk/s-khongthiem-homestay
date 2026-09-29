import { business, location } from "@/config/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";

/** Owner-supplied Google Maps embed — responsive, lazy-loaded, accessible */
function MapEmbed() {
  if (!location.mapEmbedUrl) return null;
  return (
    <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-sage bg-sage-soft shadow-[0_16px_44px_-30px_rgba(21,58,45,0.35)] sm:min-h-[340px]">
      <iframe
        src={location.mapEmbedUrl}
        title={location.mapTitle}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full min-h-[280px] w-full border-0 sm:min-h-[340px]"
      />
    </div>
  );
}

export function Location() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="section-y scroll-mt-20 bg-ivory"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <div id="location-heading">
          <SectionHeading eyebrow={location.eyebrow} heading={location.heading} />
        </div>

        <div className="mt-12 grid gap-6 sm:gap-8 lg:mt-14 lg:grid-cols-5 lg:gap-10">
          {/* Address + actions */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-sage/80 bg-white p-6 shadow-[0_16px_44px_-30px_rgba(21,58,45,0.35)] sm:p-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-sage/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-forest">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Address
                </span>
                <address className="font-display mt-4 text-lg font-medium not-italic leading-relaxed text-evergreen sm:text-xl">
                  {business.address}
                </address>
                <p className="mt-4 text-[14.5px] leading-relaxed text-muted-ink">
                  {location.note}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={business.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-forest px-6 py-3.5 text-sm font-bold text-ivory shadow-md transition-all hover:-translate-y-0.5 hover:bg-evergreen hover:shadow-lg"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={business.whatsappBase}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-forest/25 px-4 py-3 text-[13px] font-bold text-forest transition-colors hover:bg-sage/40"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                  <a
                    href={business.phoneHref}
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-forest/25 px-4 py-3 text-[13px] font-bold text-forest transition-colors hover:bg-sage/40"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" /> Call Now
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Owner-supplied Google map */}
          <Reveal delay={120} className="lg:col-span-3">
            <MapEmbed />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

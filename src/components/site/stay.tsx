"use client";

import { useState } from "react";
import { rooms, stay, type Room } from "@/config/site";
import { SectionHeading } from "./section-heading";
import { SiteImage } from "./site-image";
import { BookingButton } from "./booking-button";
import { Reveal } from "./reveal";
import { ArrowRight, Sparkles, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function AmenityRow({ room }: { room: Room }) {
  // Rendered only when the owner confirms facilities (Phase 2).
  if (!room.amenities.length) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label={`Amenities in ${room.name}`}>
      {room.amenities.map((a) => (
        <li
          key={a}
          className="rounded-full bg-sage/70 px-3 py-1 text-[11.5px] font-semibold text-evergreen"
        >
          {a}
        </li>
      ))}
    </ul>
  );
}

function RateNote({ room }: { room: Room }) {
  if (!room.indicativeRate) return null;
  return (
    <p className="mt-2 text-[12.5px] font-semibold text-wood">
      {room.indicativeRate}
      <span className="ml-1.5 font-normal text-muted-ink">indicative OTA rate</span>
    </p>
  );
}

export function Stay() {
  const [detailRoom, setDetailRoom] = useState<Room | null>(null);

  return (
    <section
      id="stay"
      aria-labelledby="stay-heading"
      className="section-y scroll-mt-20 bg-sage-soft/60"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <div id="stay-heading">
          <SectionHeading
            eyebrow={stay.eyebrow}
            heading={stay.heading}
            subtitle={stay.subtitle}
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:gap-8">
          {rooms.map((room, i) => (
            <Reveal as="article" key={room.id} delay={i * 110} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sage/80 bg-white shadow-[0_16px_44px_-30px_rgba(21,58,45,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_rgba(21,58,45,0.4)]">
                <div className="img-zoom-parent relative overflow-hidden">
                  <SiteImage
                    src={room.image.src}
                    alt={room.image.alt}
                    className="img-zoom aspect-[4/3] w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold text-evergreen">
                    {room.name}
                  </h3>
                  <RateNote room={room} />
                  <p className="mt-2 flex-1 overflow-hidden text-[14.5px] leading-relaxed text-muted-ink line-clamp-3">
                    {room.description}
                  </p>
                  <AmenityRow room={room} />

                  {/* Bottom-aligned actions on every card */}
                  <div className="mt-5 flex flex-col gap-1 border-t border-sage/60 pt-4">
                    <BookingButton
                      roomPreference={room.name}
                      className="w-full rounded-full bg-forest px-5 py-3 text-center text-[13.5px] font-bold text-ivory shadow-md transition-all hover:bg-evergreen hover:shadow-lg"
                    >
                      Check Availability
                    </BookingButton>
                    <button
                      type="button"
                      onClick={() => setDetailRoom(room)}
                      className="group/btn mt-1 inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-forest/80 transition-colors hover:text-forest"
                    >
                      View Details
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Honest pricing legend */}
        <Reveal className="mx-auto mt-8 max-w-3xl">
          <p className="flex items-start justify-center gap-2.5 rounded-xl bg-white/70 px-5 py-4 text-center text-[13px] leading-relaxed text-muted-ink ring-1 ring-sage/80">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
            <span>{stay.rateLegend}</span>
          </p>
        </Reveal>
      </div>

      {/* Room details dialog */}
      <Dialog open={!!detailRoom} onOpenChange={(o) => !o && setDetailRoom(null)}>
        <DialogContent className="max-h-[90svh] overflow-y-auto border-sage bg-ivory p-0 sm:max-w-lg [&>button]:right-4 [&>button]:top-4 [&>button]:text-evergreen">
          {detailRoom && (
            <>
              <div className="relative overflow-hidden rounded-t-xl">
                <SiteImage
                  src={detailRoom.image.src}
                  alt={detailRoom.image.alt}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="space-y-4 p-6 sm:p-7">
                <DialogTitle asChild>
                  <h3 className="font-display text-2xl font-semibold text-evergreen">
                    {detailRoom.name}
                  </h3>
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="text-[15px] leading-relaxed text-muted-ink">
                    {detailRoom.description}
                  </p>
                </DialogDescription>

                {detailRoom.amenities.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Room amenities">
                    {detailRoom.amenities.map((a) => (
                      <li
                        key={a}
                        className="rounded-full bg-sage/70 px-3 py-1 text-[11.5px] font-semibold text-evergreen"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="flex items-start gap-2.5 rounded-xl bg-sage-soft p-4 text-[13.5px] leading-relaxed text-evergreen">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                  Rates shown on this site are indicative OTA reference rates only.
                  Current prices and availability are confirmed personally on WhatsApp
                  — ask us anything about your dates.
                </p>

                <BookingButton
                  roomPreference={detailRoom.name}
                  className="w-full rounded-full bg-forest px-5 py-3.5 text-sm font-bold text-ivory shadow-md transition-all hover:bg-evergreen"
                >
                  Check Availability for this Room
                </BookingButton>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

"use client";

import { Phone, CalendarCheck } from "lucide-react";
import { business } from "@/config/site";
import { useBookingStore } from "@/lib/booking-store";
import { WhatsAppIcon } from "./icons";

/**
 * Refined sticky bottom action bar (mobile only).
 * WhatsApp | Call | Check Availability — never covers content because
 * the page renders a matching spacer after the footer.
 */
export function MobileActionBar() {
  const openBooking = useBookingStore((s) => s.open);

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-sage/80 bg-ivory/95 shadow-[0_-12px_32px_-20px_rgba(21,58,45,0.45)] backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-xl grid-cols-[1fr_1fr_1.5fr] items-stretch gap-1.5 px-3 py-2">
        <a
          href={business.whatsappBase}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-forest transition-colors active:bg-sage/60"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="text-[10.5px] font-bold tracking-wide">WhatsApp</span>
        </a>
        <a
          href={business.phoneHref}
          className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-forest transition-colors active:bg-sage/60"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10.5px] font-bold tracking-wide">Call</span>
        </a>
        <button
          type="button"
          onClick={() => openBooking()}
          className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl bg-forest px-2 py-1.5 text-ivory shadow-md transition-all active:bg-evergreen"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          <span className="whitespace-nowrap text-[10.5px] font-bold tracking-wide">
            Check Availability
          </span>
        </button>
      </div>
    </nav>
  );
}

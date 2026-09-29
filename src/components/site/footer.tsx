import Link from "next/link";
import { business, footer, nav } from "@/config/site";
import { BookingButton } from "./booking-button";
import { WhatsAppIcon, LeafOrnament } from "./icons";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-evergreen text-ivory">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 lg:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-display text-[1.4rem] font-semibold tracking-[0.12em]">
              S. KHONGTHIEM <span className="font-normal">HOMESTAY</span>
            </p>
            <p className="mt-2 text-[10px] font-semibold tracking-[0.3em] text-leaf">
              RIWAI · NEAR MAWLYNNONG, MEGHALAYA
            </p>
            <LeafOrnament className="mt-6 h-5 w-24 text-leaf/80" />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-ivory/80">
              {business.tagline}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-leaf">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[32px] items-center text-[15px] text-ivory/85 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <BookingButton className="inline-flex min-h-[32px] items-center text-[15px] font-semibold text-leaf transition-colors hover:text-ivory">
                  Check Availability
                </BookingButton>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-leaf">
              Contact
            </h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={business.whatsappBase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-[15px] text-ivory/85 transition-colors hover:text-ivory"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-leaf" />
                  WhatsApp: {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={business.phoneHref}
                  className="group inline-flex items-center gap-2.5 text-[15px] text-ivory/85 transition-colors hover:text-ivory"
                >
                  <Phone className="h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                  Call: {business.phoneDisplay}
                </a>
              </li>
            </ul>
            <address className="mt-6 max-w-xs text-[13.5px] not-italic leading-relaxed text-ivory/70">
              {business.address}
            </address>

            {/* Social links — rendered only when real links are supplied (Phase 2) */}
            {footer.social.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {footer.social.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ivory/85 underline decoration-leaf underline-offset-4 hover:text-ivory"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-2.5 border-t border-ivory/15 pt-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[12.5px] text-ivory/65">{footer.copyright}</p>
          <p className="text-[12.5px] text-ivory/65">
            Book directly on WhatsApp for a quick, personal reply.
          </p>
        </div>
      </div>
    </footer>
  );
}

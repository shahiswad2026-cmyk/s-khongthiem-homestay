"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { business, nav } from "@/config/site";
import { useBookingStore } from "@/lib/booking-store";
import { WhatsAppIcon } from "./icons";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const openBooking = useBookingStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active-section state (scrollspy) for desktop navigation */
  useEffect(() => {
    const sections = nav.links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-sage/70 bg-ivory/88 shadow-[0_10px_36px_-22px_rgba(21,58,45,0.4)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-evergreen/45 via-evergreen/15 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:px-8">
        <Link
          href="/"
          aria-label="S. Khongthiem Homestay — home"
          className={`flex shrink-0 items-center gap-2.5 transition-colors duration-300 ${
            scrolled ? "text-evergreen" : "text-ivory"
          }`}
        >
          <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" aria-hidden="true">
            <rect width="40" height="40" rx="10" className="fill-forest" />
            <g
              stroke="#FAF9F3"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20,31 C 18.5,23 20.5,16.5 26,12.5" />
              <path d="M26,12.5 C 25.4,18.5 23.6,24 20.5,28" />
              <path d="M19.6,25.5 C 16,23.8 13.8,20.6 13.2,16.8 C 17,18 19.4,20.8 20,24.5" />
            </g>
            <path d="M14,31 H26" stroke="#86B879" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-display text-[14.5px] font-semibold tracking-[0.1em] sm:text-lg sm:tracking-[0.12em] md:text-xl">
              {/* Compact mobile wordmark */}
              <span className="sm:hidden">S. KHONGTHIEM</span>
              <span className="hidden sm:inline">
                S. KHONGTHIEM <span className="font-normal">HOMESTAY</span>
              </span>
            </span>
            <span className="mt-1 whitespace-nowrap text-[8.5px] font-semibold tracking-[0.3em] opacity-75 sm:text-[9.5px]">
              <span className="sm:hidden">HOMESTAY · RIWAI, MEGHALAYA</span>
              <span className="hidden sm:inline">RIWAI · NEAR MAWLYNNONG, MEGHALAYA</span>
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.links.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  scrolled
                    ? isActive
                      ? "text-forest"
                      : "text-charcoal/80 hover:text-forest"
                    : isActive
                      ? "text-ivory"
                      : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-leaf transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openBooking()}
            className={`hidden rounded-full px-6 py-3 text-sm font-bold tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:block ${
              scrolled
                ? "bg-forest text-ivory hover:bg-evergreen"
                : "bg-ivory text-forest shadow-lg hover:bg-white"
            }`}
          >
            Check Availability
          </button>

          {/* Mobile hamburger — 44px tap target */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                  scrolled ? "text-forest hover:bg-sage/50" : "text-ivory hover:bg-ivory/15"
                }`}
              >
                <Menu className="h-[22px] w-[22px]" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              /* No description element in this sheet — tell Radix explicitly
                 so it does not warn about a missing aria-describedby. */
              aria-describedby={undefined}
              className="w-[86vw] max-w-sm border-l border-sage bg-ivory p-0 [&>button]:top-4 [&>button]:right-4 [&>button]:text-evergreen"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-sage/70 px-6 pb-5 pt-7">
                  <p className="font-display text-xl font-semibold tracking-[0.14em] text-evergreen">
                    S. KHONGTHIEM <span className="font-normal">HOMESTAY</span>
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold tracking-[0.3em] text-muted-ink">
                    RIWAI · NEAR MAWLYNNONG, MEGHALAYA
                  </p>
                </div>

                <nav aria-label="Mobile" className="flex flex-col px-6 py-5">
                  {nav.links.map((link, i) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex min-h-[52px] items-center justify-between border-b border-sage/60 py-3.5 text-charcoal transition-colors last:border-b-0 hover:text-forest"
                      >
                        <span className="font-display text-lg">{link.label}</span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-leaf">
                          0{i + 1}
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto space-y-3 px-6 pb-9">
                  <SheetClose asChild>
                    <button
                      type="button"
                      onClick={() => openBooking()}
                      className="w-full rounded-full bg-forest px-5 py-3.5 text-sm font-bold text-ivory shadow-md transition-all hover:bg-evergreen"
                    >
                      Check Availability
                    </button>
                  </SheetClose>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={business.phoneHref}
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-forest/25 px-4 py-3 text-[13px] font-bold text-forest transition-colors hover:bg-sage/50"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" /> Call
                    </a>
                    <a
                      href={business.whatsappBase}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-forest/25 px-4 py-3 text-[13px] font-bold text-forest transition-colors hover:bg-sage/50"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                  <p className="pt-1 text-center text-[11.5px] leading-relaxed text-muted-ink">
                    {business.address}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { hero, heroSlides } from "@/config/site";
import { useBookingStore } from "@/lib/booking-store";
import { SiteImage } from "./site-image";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const slideLayerRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const openBooking = useBookingStore((s) => s.open);
  const reducedMotion = usePrefersReducedMotion();

  const count = heroSlides.length;
  const interval = hero.interval;

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + count) % count),
    [count]
  );

  /* Auto-advance — slow, calm, pausable, hidden-tab aware */
  useEffect(() => {
    if (paused || hovering || reducedMotion) return;
    if (typeof document !== "undefined" && document.hidden) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % count), interval);
    return () => window.clearInterval(t);
  }, [paused, hovering, reducedMotion, interval, count]);

  /* Pause cycling while the tab is hidden */
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPaused(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* Subtle scroll parallax on the slide layer */
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        if (slideLayerRef.current) {
          slideLayerRef.current.style.transform = `translateY(${y * 0.14}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  /* Keyboard support when focus is within the carousel region */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const effectivePaused = paused || hovering || reducedMotion;

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="S. Khongthiem Homestay highlights"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative h-[100svh] min-h-[580px] w-full overflow-hidden bg-evergreen"
    >
      {/* Slide layer */}
      <div ref={slideLayerRef} className="absolute inset-0 will-change-transform">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide.video ? (
              <video
                className="h-full w-full object-cover"
                src={slide.video}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            ) : (
              <>
                <SiteImage
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  style={slide.position ? { objectPosition: slide.position } : undefined}
                  className={`h-full w-full object-cover ${i === active && !reducedMotion ? "animate-[kenburns_9s_cubic-bezier(0.22,1,0.36,1)_forwards]" : ""}`}
                />
                {slide.scrim && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-evergreen/55 via-transparent to-transparent"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Readability overlays — soft forest green, never too dark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-evergreen/80 via-evergreen/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-evergreen/50 via-transparent to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-32 sm:px-8 sm:pb-32 lg:px-8 lg:pb-36">
        <div className="max-w-2xl text-ivory">
          <p className="eyebrow animate-hero-text animate-hero-text-1 text-ivory/90">
            {hero.eyebrow}
          </p>
          <h1 className="font-display animate-hero-text animate-hero-text-2 mt-4 text-balance text-[2rem] font-semibold leading-[1.14] sm:text-5xl sm:leading-[1.1] lg:text-[3.6rem]">
            {hero.heading}
          </h1>
          <p className="animate-hero-text animate-hero-text-3 mt-5 max-w-xl text-pretty text-[15.5px] leading-relaxed text-ivory/90 sm:text-lg">
            {hero.text}
          </p>

          <div className="animate-hero-text animate-hero-text-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openBooking()}
              className="rounded-full bg-ivory px-8 py-4 text-[15px] font-bold text-forest shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-2xl sm:px-7 sm:py-3.5 sm:text-sm"
            >
              {hero.primaryCta}
            </button>
            <a
              href="#stay"
              className="rounded-full border border-ivory/45 px-8 py-4 text-center text-[15px] font-semibold text-ivory backdrop-blur-sm transition-all duration-300 hover:border-ivory hover:bg-ivory/10 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <p className="mt-9 text-[12px] font-semibold tracking-[0.16em] text-ivory/80 sm:text-[13px]">
            {hero.trustLine.map((t, i) => (
              <span key={t}>
                {t}
                {i < hero.trustLine.length - 1 && (
                  <span aria-hidden="true" className="mx-2.5 text-leaf">
                    •
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Controls: progress + arrows + pause */}
        <div className="absolute inset-x-5 bottom-7 flex items-center justify-between sm:inset-x-8 lg:inset-x-8">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
                className="group relative h-6 w-10 cursor-pointer"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-ivory/30">
                  {i === active && (
                    <span
                      key={active}
                      className="hero-progress-fill block h-full w-full rounded-full bg-ivory"
                      style={{
                        animationDuration: `${interval}ms`,
                        animationPlayState: effectivePaused ? "paused" : "running",
                      }}
                    />
                  )}
                  {i < active && <span className="block h-full w-full bg-ivory/70" />}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={effectivePaused}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-ivory/35 text-ivory/90 backdrop-blur-sm transition-colors hover:bg-ivory/15 sm:flex"
            >
              {effectivePaused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                {effectivePaused ? "Play slideshow" : "Pause slideshow"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/35 text-ivory/90 backdrop-blur-sm transition-colors hover:bg-ivory/15"
            >
              <ChevronLeft className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/35 text-ivory/90 backdrop-blur-sm transition-colors hover:bg-ivory/15"
            >
              <ChevronRight className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

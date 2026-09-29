"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gallery, type GalleryImage } from "@/config/site";
import { SectionHeading } from "./section-heading";
import { SiteImage } from "./site-image";
import { Reveal } from "./reveal";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const spanFor = (img: GalleryImage) => {
  if (img.size === "large") return "col-span-2 row-span-2";
  if (img.size === "medium") return "row-span-2";
  return img.wide ? "col-span-2 row-span-1" : "col-span-1 row-span-1";
};

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const images = gallery.images;

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setLightboxOpen(true);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  /* Keyboard navigation while lightbox is open */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  /* Mobile swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  /* Preload neighbours for smooth next/prev */
  useEffect(() => {
    if (!lightboxOpen) return;
    const next = new window.Image();
    next.src = images[(index + 1) % images.length].src;
    const prev = new window.Image();
    prev.src = images[(index - 1 + images.length) % images.length].src;
  }, [lightboxOpen, index, images]);

  const current = images[index];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="section-y scroll-mt-20 bg-ivory"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <div id="gallery-heading">
          <SectionHeading eyebrow={gallery.eyebrow} heading={gallery.heading} />
        </div>

        <Reveal className="mt-12 lg:mt-14">
          <div
            className="grid auto-rows-[128px] grid-cols-2 gap-3 sm:auto-rows-[152px] sm:gap-4 lg:auto-rows-[176px] lg:grid-cols-4"
            role="list"
            aria-label="Photo gallery"
          >
            {images.map((img, i) => (
              <button
                key={img.id}
                role="listitem"
                type="button"
                onClick={() => openAt(i)}
                aria-label={`Open photo: ${img.alt}`}
                className={`img-zoom-parent group relative cursor-zoom-in overflow-hidden rounded-xl bg-sage/40 shadow-sm ring-sage/0 transition-all duration-300 hover:shadow-lg focus-visible:shadow-lg ${spanFor(img)}`}
              >
                <SiteImage
                  src={img.src}
                  alt={img.alt}
                  className="img-zoom h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-evergreen/0 transition-colors duration-300 group-hover:bg-evergreen/10"
                />
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-forest opacity-0 shadow transition-opacity duration-300 group-focus-visible:opacity-100 group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => openAt(0)}
            className="rounded-full border border-forest/30 bg-white px-8 py-3.5 text-sm font-bold text-forest shadow-sm transition-all duration-300 hover:border-forest hover:bg-sage/40"
          >
            {gallery.viewAllLabel}
          </button>
        </Reveal>
      </div>

      {/* Full-screen lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          aria-describedby={undefined}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="h-[100svh] max-h-[100svh] w-screen max-w-[100vw] rounded-none border-0 bg-evergreen/97 p-0 sm:max-w-[100vw] sm:rounded-none [&>button]:z-10 [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-full [&>button]:bg-ivory/15 [&>button]:p-2 [&>button]:text-ivory [&>button]:backdrop-blur-sm"
        >
          <DialogTitle className="sr-only">
            Photo {index + 1} of {images.length}: {current?.alt}
          </DialogTitle>

          <div className="flex h-full w-full flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-14 py-12 sm:px-20">
              {current && (
                <SiteImage
                  key={current.id}
                  src={current.src}
                  alt={current.alt}
                  loading="eager"
                  className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                />
              )}

              {/* Prev / next */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/12 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/25 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/12 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/25 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-ivory/15 bg-evergreen/60 px-5 py-3.5 sm:px-8">
              <p className="truncate pr-4 text-[12px] text-ivory/75 sm:text-[13px]">
                {current?.alt}
              </p>
              <p className="shrink-0 rounded-full bg-ivory/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-ivory/85">
                {index + 1} / {images.length}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

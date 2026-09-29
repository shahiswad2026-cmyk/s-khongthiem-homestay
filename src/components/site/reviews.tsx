"use client";

import { useRef, useState } from "react";
import { business, reviews, reviewsSection, type Review } from "@/config/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const WOOD_STAR = "#9A6B45";

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          style={{
            fill: i < rating ? WOOD_STAR : "transparent",
            color: WOOD_STAR,
            opacity: i < rating ? 1 : 0.35,
          }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const single = reviews.length === 1;

  const cardStep = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>("[data-review-card]");
    if (!first) return 0;
    const gap = 24;
    return first.offsetWidth + gap;
  };

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = cardStep();
    if (!step) return;
    setPage(Math.round(el.scrollLeft / step));
  };

  const pages = reviews.length; // one card per step

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="section-y scroll-mt-20 bg-sage-soft/60"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        <div id="reviews-heading">
          <SectionHeading
            eyebrow={reviewsSection.eyebrow}
            heading={reviewsSection.heading}
            subtitle={reviewsSection.support}
          />
        </div>

        <Reveal
          className={
            single ? "relative mt-12 lg:mt-14" : "relative mt-12 lg:mt-14"
          }
        >
          <div
            ref={trackRef}
            onScroll={onScroll}
            tabIndex={single ? -1 : 0}
            role={single ? undefined : "region"}
            aria-label={single ? undefined : "Guest reviews carousel"}
            className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-2 ${
              single
                ? "justify-center"
                : "-mx-1"
            }`}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} single={single} />
            ))}
          </div>

          {/* Desktop arrows — only when more than one review */}
          {!single && (
            <>
              <div className="pointer-events-none absolute inset-y-0 -left-5 hidden items-center lg:flex">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous review"
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-sage bg-white text-forest shadow-md transition-all hover:-translate-x-0.5 hover:bg-sage/40"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="pointer-events-none absolute inset-y-0 -right-5 hidden items-center lg:flex">
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next review"
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-sage bg-white text-forest shadow-md transition-all hover:translate-x-0.5 hover:bg-sage/40"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </Reveal>

        {/* Page dots (mobile & tablet) — only when more than one review */}
        {!single && (
          <div className="mt-6 flex justify-center gap-2 lg:hidden" role="presentation">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() =>
                  trackRef.current?.scrollTo({ left: i * cardStep(), behavior: "smooth" })
                }
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === Math.min(page, pages - 1) ? "w-6 bg-forest" : "w-2 bg-forest/25"
                }`}
              />
            ))}
          </div>
        )}

        {/* Praise line + verified Google rating badge */}
        <Reveal className="mt-10 flex flex-col items-center gap-5 text-center lg:mt-12">
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-ink sm:text-[15px]">
            {reviewsSection.praiseLine}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage bg-white px-5 py-2.5 shadow-sm">
              <Star
                className="h-4 w-4"
                style={{ fill: WOOD_STAR, color: WOOD_STAR }}
                aria-hidden="true"
              />
              <span className="text-sm font-bold text-evergreen">
                {business.googleRating} {business.googleRatingLabel}
              </span>
              <span
                aria-hidden="true"
                className="h-3.5 w-px bg-sage"
              />
              <span className="text-sm font-semibold text-muted-ink">
                {business.googleRatingCount}
              </span>
            </span>
            {reviewsSection.reviewsUrl && (
              <a
                href={reviewsSection.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 text-sm font-bold text-forest underline decoration-leaf decoration-2 underline-offset-4 transition-colors hover:text-evergreen"
              >
                {reviewsSection.readMoreLabel}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({ review, single }: { review: Review; single: boolean }) {
  return (
    <article
      data-review-card
      className={`flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-sage/80 bg-white p-6 shadow-[0_16px_44px_-30px_rgba(21,58,45,0.35)] sm:p-7 ${
        single
          ? "w-full max-w-xl"
          : "w-[85%] sm:w-[calc(50%-12px)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <Stars
          rating={review.rating}
          label={`Rated ${review.rating} out of 5 stars`}
        />
        <Quote className="h-6 w-6 text-sage" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 flex-1 text-pretty text-[14.5px] leading-[1.75] text-charcoal/90">
        “{review.text}”
      </blockquote>
      <footer className="mt-5 flex items-center gap-3 border-t border-sage/70 pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage font-display text-sm font-semibold text-forest"
        >
          {review.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-evergreen">{review.name}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-ink">
            {review.source}
            {review.meta ? ` · ${review.meta}` : ""}
          </p>
        </div>
      </footer>
    </article>
  );
}

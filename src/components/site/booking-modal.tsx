"use client";

import { useEffect, useRef, useState } from "react";
import { business, booking } from "@/config/site";
import { useBookingStore } from "@/lib/booking-store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, LeafOrnament } from "./icons";
import { Phone, Loader2, CheckCircle2, ChevronDown, CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type FormState = {
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  name: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const fieldBase =
  "enquiry-field w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-charcoal shadow-sm outline-none transition-all placeholder:text-muted-ink/60 focus:border-leaf focus:ring-2 focus:ring-leaf/30";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[12.5px] font-semibold text-destructive">
      {message}
    </p>
  );
}

export function BookingModal() {
  const isOpen = useBookingStore((s) => s.isOpen);
  const roomPreference = useBookingStore((s) => s.roomPreference);
  const close = useBookingStore((s) => s.close);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent
        className="max-h-[92svh] overflow-y-auto border-sage bg-ivory p-0 sm:max-w-md [&>button]:right-4 [&>button]:top-4 [&>button]:z-10 [&>button]:rounded-full [&>button]:bg-sage/60 [&>button]:text-evergreen"
        onOpenAutoFocus={(e) => {
          // Keep default focus OUT of the first date input (mobile keyboards);
          // BookingForm moves focus to the dialog title instead.
          e.preventDefault();
        }}
      >
        <BookingForm roomPreference={roomPreference} />
      </DialogContent>
    </Dialog>
  );
}

/**
 * Inner form component — mounts fresh every time the dialog opens
 * (Radix unmounts dialog content when closed), so state resets naturally.
 */
function BookingForm({ roomPreference }: { roomPreference: string | null }) {
  const close = useBookingStore((s) => s.close);

  const [form, setForm] = useState<FormState>({
    checkIn: "",
    checkOut: "",
    guests: "2 guests",
    room: roomPreference ?? booking.roomOptions[0],
    name: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* Move focus to the dialog title on open — announces the dialog to screen
     readers without popping the mobile keyboard on a date field. */
  useEffect(() => {
    const t = window.setTimeout(() => titleRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, []);

  const validate = (f: FormState): Errors => {
    const e: Errors = {};
    if (!f.checkIn) e.checkIn = booking.errors.checkInRequired;
    if (!f.checkOut) e.checkOut = booking.errors.checkOutRequired;
    if (f.checkIn && f.checkOut && f.checkOut <= f.checkIn) {
      e.checkOut = booking.errors.dateOrder;
    }
    if (!f.guests) e.guests = booking.errors.guestsRequired;
    if (!f.name.trim()) e.name = booking.errors.nameRequired;
    return e;
  };

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const todayIso = () => {
    const d = new Date();
    const off = d.getTimezoneOffset();
    return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // move focus to the first invalid control
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`bk-${firstKey}`)?.focus();
      return;
    }
    setStatus("sending");
    const url = buildWhatsAppUrl({
      name: form.name.trim(),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      roomPreference: form.room,
      message: form.message,
    });
    window.setTimeout(() => {
      setStatus("success");
      window.open(url, "_blank", "noopener,noreferrer");
    }, 700);
  };

  return (
    <>
      <div className="bg-forest px-6 pb-6 pt-7 text-ivory sm:px-7">
        <DialogTitle asChild>
          <h2
            ref={titleRef}
            tabIndex={-1}
            className="font-display text-2xl font-semibold outline-none"
          >
            {booking.title}
          </h2>
        </DialogTitle>
        <DialogDescription asChild>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ivory/85">
            {booking.subtitle}
          </p>
        </DialogDescription>
        <LeafOrnament className="mt-3 h-4 w-20 text-leaf" />
      </div>

      {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:px-8"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage">
              <CheckCircle2 className="h-8 w-8 text-forest" aria-hidden="true" />
            </span>
            <h3 className="font-display text-xl font-semibold text-evergreen">
              {booking.successTitle}
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-ink">
              {booking.successText}
            </p>
            <div className="flex w-full flex-col gap-2.5 pt-2">
              <a
                href={business.whatsappBase}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-ivory transition-all hover:bg-evergreen"
              >
                <WhatsAppIcon className="h-4 w-4" /> Open WhatsApp again
              </a>
              <button
                type="button"
                onClick={() => close()}
                className="rounded-full border border-forest/25 px-5 py-3 text-sm font-bold text-forest transition-colors hover:bg-sage/40"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 px-6 py-6 sm:px-7">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-checkIn" className="mb-1.5 block text-[13px] font-bold text-evergreen">
                  {booking.fields.checkIn} <span aria-hidden="true" className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <CalendarDays aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink" />
                  <input
                    id="bk-checkIn"
                    type="date"
                    required
                    min={todayIso()}
                    value={form.checkIn}
                    onChange={set("checkIn")}
                    aria-invalid={!!errors.checkIn}
                    aria-describedby={errors.checkIn ? "err-checkIn" : undefined}
                    className={`${fieldBase} pl-10 ${errors.checkIn ? "border-destructive" : "border-input"}`}
                  />
                </div>
                <FieldError id="err-checkIn" message={errors.checkIn} />
              </div>

              <div>
                <label htmlFor="bk-checkOut" className="mb-1.5 block text-[13px] font-bold text-evergreen">
                  {booking.fields.checkOut} <span aria-hidden="true" className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <CalendarDays aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink" />
                  <input
                    id="bk-checkOut"
                    type="date"
                    required
                    min={form.checkIn || todayIso()}
                    value={form.checkOut}
                    onChange={set("checkOut")}
                    aria-invalid={!!errors.checkOut}
                    aria-describedby={errors.checkOut ? "err-checkOut" : undefined}
                    className={`${fieldBase} pl-10 ${errors.checkOut ? "border-destructive" : "border-input"}`}
                  />
                </div>
                <FieldError id="err-checkOut" message={errors.checkOut} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-guests" className="mb-1.5 block text-[13px] font-bold text-evergreen">
                  {booking.fields.guests} <span aria-hidden="true" className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    id="bk-guests"
                    required
                    value={form.guests}
                    onChange={set("guests")}
                    aria-invalid={!!errors.guests}
                    aria-describedby={errors.guests ? "err-guests" : undefined}
                    className={`${fieldBase} ${errors.guests ? "border-destructive" : "border-input"} pr-9`}
                  >
                    {booking.guestOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink" />
                </div>
                <FieldError id="err-guests" message={errors.guests} />
              </div>

              <div>
                <label htmlFor="bk-room" className="mb-1.5 block text-[13px] font-bold text-evergreen">
                  {booking.fields.room}
                </label>
                <div className="relative">
                  <select
                    id="bk-room"
                    value={form.room}
                    onChange={set("room")}
                    className={`${fieldBase} border-input pr-9`}
                  >
                    {booking.roomOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="bk-name" className="mb-1.5 block text-[13px] font-bold text-evergreen">
                {booking.fields.name} <span aria-hidden="true" className="text-destructive">*</span>
              </label>
              <input
                id="bk-name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your full name"
                value={form.name}
                onChange={set("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                className={`${fieldBase} ${errors.name ? "border-destructive" : "border-input"}`}
              />
              <FieldError id="err-name" message={errors.name} />
            </div>

            <div>
              <label htmlFor="bk-message" className="mb-1.5 block text-[13px] font-bold text-evergreen">
                {booking.fields.message}
              </label>
              <textarea
                id="bk-message"
                rows={3}
                placeholder="Anything you would like to ask us?"
                value={form.message}
                onChange={set("message")}
                className={`${fieldBase} resize-none border-input`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1FA855] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#188A45] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
                  Preparing your enquiry…
                </>
              ) : (
                <>
                  <WhatsAppIcon className="h-5 w-5" />
                  {booking.submitLabel}
                </>
              )}
            </button>

            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px flex-1 bg-sage" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-ink">
                or
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-sage" />
            </div>

            <a
              href={business.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-forest/25 bg-white px-6 py-3 text-sm font-bold text-forest transition-colors hover:bg-sage/40"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {booking.callLabel} — {business.phoneDisplay}
            </a>

            <p className="pt-1 text-center text-[11.5px] leading-relaxed text-muted-ink">
              Your enquiry opens in WhatsApp with all details filled in. No payment is
              taken on this website.
            </p>
          </form>
        )}
    </>
  );
}

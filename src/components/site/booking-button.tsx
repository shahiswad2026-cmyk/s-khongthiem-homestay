"use client";

import type { ReactNode } from "react";
import { useBookingStore } from "@/lib/booking-store";

/**
 * Any CTA that should open the Check-Availability enquiry modal.
 * Optionally pre-selects a room preference.
 */
export function BookingButton({
  children,
  roomPreference,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  roomPreference?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const open = useBookingStore((s) => s.open);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onClick={() => open(roomPreference)}
    >
      {children}
    </button>
  );
}

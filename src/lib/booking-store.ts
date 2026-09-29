"use client";

import { create } from "zustand";

type BookingState = {
  isOpen: boolean;
  roomPreference: string | null;
  open: (roomPreference?: string) => void;
  close: () => void;
};

/** Global booking-enquiry modal store — every CTA on the page uses this. */
export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  roomPreference: null,
  open: (roomPreference) => set({ isOpen: true, roomPreference: roomPreference ?? null }),
  close: () => set({ isOpen: false }),
}));

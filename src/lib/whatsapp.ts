import { business } from "@/config/site";

export type EnquiryData = {
  name: string;
  checkIn: string; // yyyy-mm-dd
  checkOut: string; // yyyy-mm-dd
  guests: string;
  roomPreference: string;
  message?: string;
};

/** Format yyyy-mm-dd as a readable date, e.g. "12 October 2026" */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

/**
 * Builds the exact WhatsApp enquiry message format agreed with the owner.
 */
export function buildWhatsAppMessage(data: EnquiryData): string {
  const lines = [
    "Hello S. Khongthiem Homestay,",
    "",
    "I would like to check availability for my stay.",
    "",
    `Name: ${data.name}`,
    `Check-in: ${formatDate(data.checkIn)}`,
    `Check-out: ${formatDate(data.checkOut)}`,
    `Number of guests: ${data.guests}`,
    `Room preference: ${data.roomPreference}`,
    `Message: ${data.message?.trim() ? data.message.trim() : "-"}`,
    "",
    "Please share the available rooms and price. Thank you.",
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(data: EnquiryData): string {
  const text = encodeURIComponent(buildWhatsAppMessage(data));
  return `${business.whatsappBase}?text=${text}`;
}

/** Simple WhatsApp link with optional short greeting */
export function whatsappLink(text = "Hello S. Khongthiem Homestay, I have an enquiry."): string {
  return `${business.whatsappBase}?text=${encodeURIComponent(text)}`;
}

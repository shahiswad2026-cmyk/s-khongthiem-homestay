/**
 * ============================================================
 *  S. KHONGTHIEM HOMESTAY — CENTRAL CONTENT CONFIG
 *  (single source of truth)
 * ============================================================
 *  Everything the owner may want to change lives here.
 *
 *  VERIFICATION NOTES (as of 28 September 2026):
 *   • Business name, address, phone, 4.7★ (53 reviews):
 *       Google Business Profile / Google Maps (place id verified
 *       via the owner's own map embed).
 *   • Room types & facilities: Booking.com listing
 *       "Riwai Root Bridge homestay" (same address/property).
 *   • Indicative rates: Encamp Adventures listing
 *       encampadventures.com/meghalaya/accommodation/s-khongthiem-homestay
 *       (owner phone on that listing matches +91 70854 96906).
 *   • Photos: the property's own Encamp listing images
 *       (owner-supplied), stored locally in /images/property/.
 *   • Hero slide 1 is LICENSED DESTINATION SCENERY (Wikimedia Commons,
 *       CC BY-SA 4.0 — see CREDITS.md). It is explicitly NOT a photo of
 *       the property and must never be described as such.
 *   • Rates are INDICATIVE OTA reference rates only — never
 *     presented as guaranteed direct-booking prices.
 *
 *  CONTENT SAFETY: no unverified facilities, policies or
 *  distances are published anywhere on the site.
 * ============================================================
 */

export const business = {
  name: "S. Khongthiem Homestay",
  shortName: "S. Khongthiem",
  /** OTA listings display this property as "Riwai Root Bridge homestay" */
  alternateName: "Riwai Root Bridge Homestay",
  location: "Riwai, Meghalaya",
  address:
    "Mawlynnong Rd, Nongthymmai, Riwai, Pynursla, Meghalaya 793110, India",
  phoneDisplay: "+91 70854 96906",
  phoneHref: "tel:+917085496906",
  whatsappNumber: "917085496906",
  whatsappBase: "https://wa.me/917085496906",
  /** Verified Google Maps place listing (canonical place URL from the
   *  owner's own map embed) — opens the exact property on Google Maps. */
  directionsUrl: "https://maps.google.com/?cid=15477095198541550081",
  tagline: "A peaceful village stay near Mawlynnong, Meghalaya.",
  // Verified Google Business Profile rating, shown separately from review text:
  googleRating: "4.7",
  googleRatingCount: "53 reviews",
  googleRatingLabel: "on Google",
} as const;

export const nav = {
  links: [
    { label: "Stay", href: "#stay" },
    { label: "Experience", href: "#experience" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Location", href: "#location" },
  ],
} as const;

/* ---------------------------------------------------------- */
/* HERO                                                        */
/* ---------------------------------------------------------- */
export type HeroSlide = {
  id: string;
  src: string;
  /** Optional video (mp4/webm) — unused until the owner provides one */
  video?: string;
  alt: string;
  /** Optional object-position override for this slide's crop */
  position?: string;
  /** Extra forest-green scrim layered over THIS slide only
   *  (rendered by hero.tsx before the global readability overlays) */
  scrim?: boolean;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "room-balcony",
    src: "/images/property/room-double-balcony.jpg",
    alt: "Bright double room with a balcony overlooking the greenery at S. Khongthiem Homestay",
  },
  {
    id: "room-sofa",
    src: "/images/property/room-double-sofa.jpg",
    alt: "Double room with a seating corner at S. Khongthiem Homestay",
  },
];

export const hero = {
  eyebrow: "A Quiet Stay in Riwai",
  heading: "A Peaceful Stay Near Mawlynnong",
  text: "A welcoming village homestay in Riwai, Meghalaya — comfortable rooms, a serene garden and warm local hospitality, close to the famous Living Root Bridge and Mawlynnong village.",
  primaryCta: "Check Availability",
  secondaryCta: "Explore the Stay",
  trustLine: ["Comfortable rooms", "Serene garden & terrace", "Near Living Root Bridge"],
  /** Auto-advance interval in ms (kept slow & calm) */
  interval: 7000,
} as const;

/* ---------------------------------------------------------- */
/* TRUST STRIP                                                 */
/* ---------------------------------------------------------- */
export const trustStrip = [
  { id: "location", label: "Peaceful Location" },
  { id: "rooms", label: "Comfortable Rooms" },
  { id: "hospitality", label: "Warm Hospitality" },
  { id: "explore", label: "Explore Mawlynnong" },
] as const;

/* ---------------------------------------------------------- */
/* ABOUT                                                       */
/* ---------------------------------------------------------- */
export const about = {
  eyebrow: "Welcome to S. Khongthiem",
  heading: "A Quiet Village Base Near Mawlynnong",
  description:
    "S. Khongthiem Homestay is a cozy village lodging in Riwai, near Mawlynnong in the East Khasi Hills of Meghalaya. Set close to the famous single-decker Living Root Bridge, it offers clean and comfortable rooms, a serene garden and a spacious terrace, and the kind of warm, personal hospitality the hills are known for.",
  mainImage: {
    src: "/images/property/room-double-balcony.jpg",
    alt: "Bright double room with balcony and green views at S. Khongthiem Homestay",
  },
  accentImage: {
    src: "/images/property/room-double-sofa.jpg",
    alt: "Seating corner inside a double room at S. Khongthiem Homestay",
  },
  highlights: [
    {
      id: "comfort",
      title: "Comfortable Stay",
      text: "Clean, comfortable rooms with private bathrooms, looked after with care.",
    },
    {
      id: "scenic",
      title: "Garden & Terrace",
      text: "Unwind in the serene garden and spacious terrace around the homestay.",
    },
    {
      id: "hospitality",
      title: "Personal Hospitality",
      text: "A supportive local team that treats you like family.",
    },
  ],
} as const;

/* ---------------------------------------------------------- */
/* ROOMS / STAY                                                */
/* ---------------------------------------------------------- */
export type Room = {
  id: string;
  name: string;
  /** Short, verified description — no unverified claims */
  description: string;
  image: { src: string; alt: string };
  /** Only facilities verified on the property's Booking.com listing */
  amenities: string[];
  /** Indicative OTA reference rate — never presented as a direct rate */
  indicativeRate?: string;
};

export const rooms: Room[] = [
  {
    id: "double-room",
    name: "Double Room",
    description:
      "A spacious double room with a full bed, private bathroom and a balcony opening to the greenery around the homestay.",
    image: {
      src: "/images/property/room-double-balcony.jpg",
      alt: "Double room with a balcony and green view at S. Khongthiem Homestay",
    },
    amenities: ["Balcony", "Private bathroom", "Flat-screen TV", "Free WiFi"],
    indicativeRate: "₹3,540 / night",
  },
  {
    id: "triple-room",
    name: "Triple Room",
    description:
      "A family-friendly room with a twin bed and a full bed — spacious enough for a small family, with a private bathroom.",
    image: {
      src: "/images/property/room-triple.jpg",
      alt: "Triple-bed sharing room at S. Khongthiem Homestay",
    },
    amenities: ["Private bathroom", "Free WiFi"],
    indicativeRate: "₹4,720 / night",
  },
];

export const stay = {
  eyebrow: "Stay With Us",
  heading: "Simple Comfort, Village Calm",
  subtitle:
    "Two room types in a peaceful Riwai village home — spacious, clean and thoughtfully kept.",
  /** Honest pricing legend shown under the room cards */
  rateLegend:
    "Rates shown are indicative reference rates seen on OTA listings (Encamp Adventures, September 2026). Confirm the current direct price with us on WhatsApp.",
} as const;

/* ---------------------------------------------------------- */
/* EXPERIENCE                                                  */
/* ---------------------------------------------------------- */
export const experience = {
  eyebrow: "Discover the Area",
  heading: "Root Bridges, Clean Villages and Big Skies",
  cta: "Plan Your Stay",
  cards: [
    {
      id: "root-bridge",
      motif: "hills" as const,
      title: "Living Root Bridge",
      text: "The homestay sits near the famous single-decker Living Root Bridge of Riwai — the reason travellers find this little village.",
    },
    {
      id: "mawlynnong",
      motif: "compass" as const,
      title: "Mawlynnong Village",
      text: "Explore nearby Mawlynnong, known across India for its community-led cleanliness and quiet charm.",
    },
    {
      id: "east-khasi-hills",
      motif: "sun" as const,
      title: "East Khasi Hills",
      text: "The location offers convenient access to Dawki and other East Khasi Hills attractions for easy day trips.",
    },
  ],
  // Owner-confirmed activities (e.g. guided walks) can be added here.
} as const;

/* ---------------------------------------------------------- */
/* FOOD & HOSPITALITY                                          */
/* ---------------------------------------------------------- */
export const food = {
  eyebrow: "Homestay Kitchen",
  heading: "Home-Cooked Meals, Served with Care",
  text: "Enjoy simple, home-style cooking during your stay. Veg and non-veg meals are available — including breakfast, lunch and dinner on request. Ask us about the current menu and meal timings when you enquire.",
  cta: "Ask About Dining on WhatsApp",
  // Owner-confirmed dining details (timings, sample menu) can be added here.
} as const;

/* ---------------------------------------------------------- */
/* GALLERY                                                     */
/* ---------------------------------------------------------- */
export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** aspect class for the masonry layout */
  size: "large" | "medium" | "small";
  /** optional: makes a small tile span 2 columns to balance the masonry */
  wide?: boolean;
  /** optional video entry, e.g. "/videos/view.mp4" */
  video?: string;
};

export const gallery = {
  eyebrow: "Gallery",
  heading: "A Glimpse of S. Khongthiem",
  viewAllLabel: "View All Photos",
  images: [
    {
      id: "g1",
      src: "/images/property/hero-room-night.jpg",
      alt: "Spacious double room at S. Khongthiem Homestay in the evening",
      size: "large",
    },
    {
      id: "g2",
      src: "/images/property/room-double-balcony.jpg",
      alt: "Bright double room with balcony and green views at S. Khongthiem Homestay",
      size: "medium",
    },
    {
      id: "g3",
      src: "/images/property/room-twin-beds.jpg",
      alt: "Twin-bed room at S. Khongthiem Homestay",
      size: "medium",
    },
    {
      id: "g4",
      src: "/images/property/room-double-sofa.jpg",
      alt: "Double room with a seating corner at S. Khongthiem Homestay",
      size: "small",
    },
    {
      id: "g5",
      src: "/images/property/room-triple.jpg",
      alt: "Triple-bed sharing room at S. Khongthiem Homestay",
      size: "small",
    },
    {
      id: "g6",
      src: "/images/property/bathroom.jpg",
      alt: "Private bathroom at S. Khongthiem Homestay",
      size: "small",
      wide: true,
    },
  ] as GalleryImage[],
} as const;

/* ---------------------------------------------------------- */
/* REVIEWS — real Google review excerpts (verbatim)            */
/* ---------------------------------------------------------- */
export type Review = {
  id: string;
  name: string;
  source: "Google Review";
  /** Verified star rating for this individual review */
  rating: number;
  /** Review age as shown on the Google Business Profile */
  meta?: string;
  text: string;
};

/**
 * VERIFIED Google review (name, rating, text) from the property's
 * Google Business Profile. Additional profile reviews could not be
 * read without the Google Maps app, so only this single fully
 * verifiable review is published — none are invented.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Nayan Singh",
    source: "Google Review",
    rating: 4,
    meta: "4 months ago",
    text: "The stay was very comfortable and smooth. The staffs were very supportive and made us feel relaxed. Meal options for vegan should be improved. Overall nice homestay.",
  },
];

export const reviewsSection = {
  eyebrow: "Guest Stories",
  heading: "Kind Words from Our Guests",
  support: "Real words from guests who stayed at S. Khongthiem Homestay.",
  /** Drawn from Google's own review summary for this profile */
  praiseLine:
    "Guests highlight the clean, well-maintained rooms, the supportive staff and rooms spacious enough for a small family.",
  /** Verified Google Maps place listing — opens the 4.7★ profile */
  reviewsUrl: "https://maps.google.com/?cid=15477095198541550081" as string | null,
  readMoreLabel: "Read Reviews on Google",
} as const;

/* ---------------------------------------------------------- */
/* LOCATION                                                    */
/* ---------------------------------------------------------- */
export const location = {
  eyebrow: "Location",
  heading: "Find Your Way to Riwai",
  /** Owner-supplied Google Maps embed — src preserved exactly. */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.8878425913617!2d91.89920587538211!3d25.207004577704605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37505f004a28c443%3A0xd6c9b014f7f91201!2sS.%20Khongthiem%20Homestay!5e0!3m2!1sen!2sin!4v1790614470513!5m2!1sen!2sin" as string | null,
  mapTitle: "Google Maps — S. Khongthiem Homestay, Riwai, Meghalaya",
  note: "The homestay sits on Mawlynnong Road in Nongthymmai, Riwai, in the hills of East Khasi Hills, Meghalaya. Call or message us and we will guide you all the way to the door.",
} as const;

/* ---------------------------------------------------------- */
/* BOOKING / ENQUIRY                                           */
/* ---------------------------------------------------------- */
export const booking = {
  title: "Check Availability",
  subtitle:
    "Tell us your travel dates and we will reply on WhatsApp with available rooms and current prices.",
  fields: {
    checkIn: "Check-in date",
    checkOut: "Check-out date",
    guests: "Number of guests",
    room: "Room preference",
    name: "Full name",
    message: "Message (optional)",
  },
  guestOptions: ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6+ guests"],
  roomOptions: ["Any available room", ...rooms.map((r) => r.name)],
  submitLabel: "Send Enquiry on WhatsApp",
  callLabel: "Call Now",
  successTitle: "Enquiry ready!",
  successText:
    "WhatsApp is opening with your enquiry. We will get back to you soon.",
  errors: {
    checkInRequired: "Please select your check-in date.",
    checkOutRequired: "Please select your check-out date.",
    dateOrder: "Check-out must be after check-in.",
    guestsRequired: "Please select the number of guests.",
    nameRequired: "Please enter your full name.",
  },
} as const;

/* ---------------------------------------------------------- */
/* FOOTER                                                      */
/* ---------------------------------------------------------- */
export const footer = {
  // Add only real links, e.g. instagram: "https://instagram.com/..."
  social: [] as { id: string; label: string; href: string }[],
  copyright: `© ${new Date().getFullYear()} S. Khongthiem Homestay, Riwai, Meghalaya. All rights reserved.`,
} as const;

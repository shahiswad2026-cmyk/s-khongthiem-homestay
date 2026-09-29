import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "S. Khongthiem Homestay | Homestay in Riwai, Near Mawlynnong, Meghalaya",
  description:
    "Stay at S. Khongthiem Homestay in Riwai, near Mawlynnong, Meghalaya. Enjoy comfortable rooms, warm local hospitality, and convenient access to the Living Root Bridge, Mawlynnong Village, Dawki, and other East Khasi Hills attractions.",
  keywords: [
    "S. Khongthiem Homestay",
    "Homestay near Mawlynnong",
    "Riwai homestay Meghalaya",
    "Riwai Root Bridge homestay",
    "Stay near Living Root Bridge Riwai",
    "Meghalaya homestay",
  ],
  openGraph: {
    title:
      "S. Khongthiem Homestay | Homestay in Riwai, Near Mawlynnong, Meghalaya",
    description:
      "A peaceful village homestay in Riwai, near Mawlynnong, Meghalaya. Comfortable rooms, a serene garden and warm local hospitality near the Living Root Bridge.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "S. Khongthiem Homestay | Riwai, Meghalaya",
    description:
      "A peaceful village stay near Mawlynnong, Meghalaya. Check availability directly on WhatsApp.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#214E3B",
};

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "S. Khongthiem Homestay",
  alternateName: "Riwai Root Bridge Homestay",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mawlynnong Rd, Nongthymmai, Riwai",
    addressLocality: "Pynursla",
    addressRegion: "Meghalaya",
    postalCode: "793110",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2070046,
    longitude: 91.9017808,
  },
  telephone: "+91 70854 96906",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
      </body>
    </html>
  );
}

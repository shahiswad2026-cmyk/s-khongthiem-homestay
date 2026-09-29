import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { About } from "@/components/site/about";
import { Stay } from "@/components/site/stay";
import { Experience } from "@/components/site/experience";
import { Food } from "@/components/site/food";
import { Gallery } from "@/components/site/gallery";
import { Reviews } from "@/components/site/reviews";
import { Location } from "@/components/site/location";
import { Footer } from "@/components/site/footer";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { BookingModal } from "@/components/site/booking-modal";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <a
        href="#stay"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-ivory"
      >
        Skip to content
      </a>

      <Header />

      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <About />
        <Stay />
        <Experience />
        <Food />
        <Gallery />
        <Reviews />
        <Location />
      </main>

      <Footer />
      <div
        aria-hidden="true"
        className="h-[72px] md:hidden"
        style={{ height: "calc(72px + env(safe-area-inset-bottom))" }}
      />

      <MobileActionBar />
      <BookingModal />
    </div>
  );
}

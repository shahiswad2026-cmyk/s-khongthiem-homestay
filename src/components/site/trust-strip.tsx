import { trustStrip } from "@/config/site";
import { trustIcons } from "./icons";
import { Reveal } from "./reveal";

export function TrustStrip() {
  return (
    <section
      aria-label="Why guests choose S. Khongthiem"
      className="border-b border-sage/60 bg-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-8">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-7 sm:grid-cols-4 sm:gap-x-4 sm:divide-x sm:divide-sage/80">
            {trustStrip.map((item) => {
              const Icon = trustIcons[item.id as keyof typeof trustIcons];
              return (
                <li
                  key={item.id}
                  className="flex flex-col items-center justify-center gap-2.5 px-2 text-center sm:flex-row sm:gap-3 sm:px-3"
                >
                  <Icon
                    className="h-[22px] w-[22px] shrink-0 text-leaf sm:h-5 sm:w-5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="text-[13px] font-semibold tracking-wide text-charcoal">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

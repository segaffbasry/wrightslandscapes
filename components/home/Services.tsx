import Link from "next/link";
import { services } from "@/lib/content";
import Media from "../Media";
import { Arrow } from "../PillButton";

/*
 * The live site's service menu as photo cards: two large, then three. Each card
 * is a real project photo with the service name and that page's own intro line.
 */
export default function Services() {
  return (
    <section data-theme="light" className="bg-white">
      <div className="gutter py-16 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-12">
          <h2 data-reveal className="t-h2">
            Our <span className="accent">services</span>
          </h2>
          <p data-reveal className="t-label text-forest/60">
            ({String(services.length).padStart(2, "0")})
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-6 lg:gap-4">
          {services.map((s, i) => {
            const big = i < 2;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`group relative block overflow-hidden rounded-[6px] text-lime ${
                  big ? "aspect-[4/3] md:col-span-3 md:aspect-auto md:h-[min(58svh,540px)]" : "aspect-[4/3] md:col-span-2 md:aspect-auto md:h-[min(44svh,400px)]"
                }`}
              >
                <Media img={s.img} ratio="fill" sizes={big ? "50vw" : "33vw"} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />
                <span className="absolute top-4 left-4 t-label rounded-full bg-forest/60 px-3 py-1.5 backdrop-blur-sm lg:top-5 lg:left-5">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-lime text-forest transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:rotate-45 lg:top-5 lg:right-5">
                  <Arrow />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                  <h3 className={`${big ? "t-h2" : "t-h3"} transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-translate-y-1`}>
                    {s.label}
                  </h3>
                  <p className={`t-body mt-2 max-w-[34rem] text-[15px] text-lime/85 ${big ? "" : "line-clamp-2"}`}>{s.intro}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/lib/content";
import { Arrow } from "../PillButton";

/*
 * The live site's service menu as one compact, scannable list. On desktop the
 * hovered row wipes its photo up into a sticky preview frame; on touch each row
 * carries its own thumbnail.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const z = useRef(1);

  const show = (i: number) => {
    if (i === active) return;
    const el = frames.current[i];
    setActive(i);
    if (!el) return;
    el.style.zIndex = String(++z.current);
    if (prefersReducedMotion()) return;
    gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut", overwrite: true });
    gsap.fromTo(el.firstElementChild, { scale: 1.15 }, { scale: 1, duration: 1.2, ease: "power3.out", overwrite: true });
  };

  return (
    <section data-theme="dark" className="bg-forest text-lime">
      <div className="gutter pb-24 lg:pb-36">
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
          <p data-reveal className="t-label text-lime/60">
            (Services)
          </p>
          <p data-reveal className="t-label text-lime/60">
            ({String(services.length).padStart(2, "0")})
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <ul className="border-b border-lime/15 lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.href} data-reveal data-delay={String(i * 0.05)} className="border-t border-lime/15">
                <Link
                  href={s.href}
                  onMouseEnter={() => show(i)}
                  onFocus={() => show(i)}
                  className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-5 transition-opacity duration-500 lg:py-6 ${
                    active === i ? "opacity-100" : "lg:opacity-45 lg:hover:opacity-100"
                  }`}
                >
                  <span className="relative h-14 w-11 overflow-hidden rounded-[3px] lg:hidden">
                    <Image src={s.img.src} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="t-label hidden w-10 text-lime/60 lg:block">({String(i + 1).padStart(2, "0")})</span>
                  <span>
                    <span className="t-h2 block transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-2">
                      {s.label}
                    </span>
                    <span className="t-body mt-2 hidden max-w-[34rem] text-[15px] text-lime/70 sm:block">{s.intro}</span>
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-lime/30 transition-colors duration-300 group-hover:bg-lime group-hover:text-forest">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[4px] bg-forest">
              {services.map((s, i) => (
                <div
                  key={s.href}
                  ref={(el) => {
                    frames.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{ zIndex: i === 0 ? 1 : 0 }}
                >
                  <Image src={s.img.src} alt={s.img.alt} fill sizes="33vw" className="object-cover" />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 z-[100] flex items-center justify-between bg-forest/85 px-4 py-3 backdrop-blur-sm">
                <span className="t-label">{services[active].label}.</span>
                <span className="t-label">({String(active + 1).padStart(2, "0")})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

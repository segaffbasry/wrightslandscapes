"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { stack } from "@/lib/content";
import { Arrow } from "../PillButton";

/*
 * Pinned stack: the section holds still while each photo card slides up over
 * the last one, and the card underneath eases back (scale down, dimmed).
 */
export default function StackCards() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const shades = gsap.utils.toArray<HTMLElement>("[data-shade]");
      gsap.set(cards.slice(1), { yPercent: 115 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${(cards.length - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => setActive(Math.min(cards.length - 1, Math.round(st.progress * (cards.length - 1)))),
        },
      });
      cards.slice(1).forEach((card, i) => {
        tl.to(card, { yPercent: 0, ease: "power2.inOut" }, i);
        // Everything already stacked recedes a step further.
        cards.slice(0, i + 1).forEach((under, j) => {
          const depth = i + 1 - j;
          tl.to(under, { scale: 1 - depth * 0.05, y: -depth * 22, ease: "power2.inOut" }, i);
          tl.to(shades[j], { opacity: Math.min(0.7, depth * 0.35), ease: "power2.inOut" }, i);
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-theme="dark" className="relative flex h-svh flex-col overflow-hidden bg-forest text-lime">
      <div className="gutter flex items-end justify-between pt-24 pb-6 lg:pt-28">
        <p className="t-label text-lime/60">(Projects)</p>
        <p className="t-label tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(stack.length).padStart(2, "0")}
        </p>
      </div>
      <div className="gutter relative flex-1 pt-20 pb-8 lg:pb-12">
        <div className="relative mx-auto h-full max-w-[72rem]">
          {stack.map((c, i) => (
            <Link
              key={c.img.src}
              href={c.href}
              data-card
              className="group absolute inset-0 block origin-top overflow-hidden rounded-[6px] bg-forest will-change-transform"
              style={{ zIndex: i }}
            >
              <Image
                src={c.img.src}
                alt={c.img.alt}
                fill
                sizes="(min-width: 1200px) 72rem, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
              />
              <div data-shade className="pointer-events-none absolute inset-0 bg-forest opacity-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-forest/85 px-5 py-3 backdrop-blur-sm lg:px-6">
                <span className="t-label flex items-center gap-2">
                  {c.title}. <Arrow />
                </span>
                <span className="t-label">({String(i + 1).padStart(2, "0")})</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

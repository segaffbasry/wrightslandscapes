"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { featured, home } from "@/lib/content";
import PillButton, { Arrow } from "../PillButton";

/*
 * The one place heavy motion is earned: the headline lines rise out of masks
 * on load. Below it, the reference's featured-work panels: full-bleed photos
 * that settle from y:-10% scale:1.4 to y:0 scale:1.01 as they scroll through
 * (values from the reference bundle), with a caption bar and glass "View" pill.
 */

function Panel({ item, i }: { item: (typeof featured)[number]; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={item.href}
      data-panel
      className="relative block h-[78svh] min-h-[420px] overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div data-panel-img className="absolute inset-0" style={{ transform: "translateY(-10%) scale(1.4)" }}>
        <Image src={item.img.src} alt={item.img.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <PillButton variant="glass" hovered={hover}>
          View
        </PillButton>
      </div>
      <div className="gutter absolute inset-x-0 bottom-0 flex items-center justify-between bg-forest/85 py-3 text-lime backdrop-blur-sm">
        <span className="t-label flex items-center gap-2">
          {item.title}. <Arrow />
        </span>
        <span className="t-label">({String(i + 1).padStart(2, "0")})</span>
      </div>
    </Link>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [first, rest] = [home.h1.split(" soft landscaping ")[0], home.h1.split(" soft landscaping ")[1]];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (!reduced) {
        const t = gsap.timeline({ delay: 0.15 });
        t.to("[data-hero-line] > span", { y: 0, duration: 1.3, ease: "power4.out", stagger: 0.09 });
        t.fromTo("[data-hero-fade]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }, 0.6);
      }
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((p) => {
        gsap.to(p.querySelector("[data-panel-img]"), {
          y: 0,
          scale: 1.01,
          ease: "none",
          scrollTrigger: { trigger: p, start: "top bottom", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
        });
      });
      gsap.fromTo(
        "[data-wordmark]",
        { yPercent: 35 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: "[data-wordmark]", start: "top bottom", end: "bottom bottom", scrub: 1 } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-theme="dark" className="relative overflow-hidden bg-forest text-lime">
      <div className="gutter flex min-h-[88svh] flex-col items-center justify-center pt-28 pb-16 text-center">
        <h1 className="t-hero max-w-[72rem]">
          <span data-hero-line className="line-mask">
            <span>
              {first} <span className="accent">soft landscaping</span>
            </span>
          </span>
          <span data-hero-line className="line-mask">
            <span>{rest}.</span>
          </span>
        </h1>
        <p data-hero-fade className="t-body mt-8 max-w-[24rem] text-lime/85">
          {home.tag}
        </p>
        <p data-hero-fade className="t-label mt-auto pt-16">
          (Featured work)
        </p>
      </div>

      <div>
        {featured.map((f, i) => (
          <Panel key={f.href} item={f} i={i} />
        ))}
      </div>

      <div className="gutter flex flex-col items-center pt-28 pb-10 text-center lg:pt-40">
        <p data-reveal className="t-label mb-6 text-lime/60">(Projects)</p>
        <h2 data-reveal className="t-h2 max-w-[44rem]">
          Soft landscaping packages delivered for <span className="accent">housebuilders and main contractors</span> across
          London, Hertfordshire and the South East.
        </h2>
        <div data-reveal className="mt-10">
          <PillButton href="/projects">Ask for project references</PillButton>
        </div>
      </div>

      <div className="overflow-hidden">
        <p
          data-wordmark
          aria-hidden
          className="text-center text-[26.5vw] leading-[0.8] font-normal tracking-[-0.06em] whitespace-nowrap select-none"
        >
          Wrights
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Image from "next/image";
import PillButton from "../PillButton";

/* The one place heavy motion is earned: the headline lines rise out of masks on load. */
type Frame = { src: string; alt: string; ratio: number };

export default function Hero({ h1, tag, strip }: { h1: string; tag: string; strip: Frame[] }) {
  const root = useRef<HTMLElement>(null);
  const [first, rest] = h1.split(" soft landscaping ");

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const t = gsap.timeline({ delay: 0.15 });
      t.to("[data-hero-line] > span", { y: 0, duration: 1.3, ease: "power4.out", stagger: 0.09 });
      t.fromTo("[data-hero-fade]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }, 0.6);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-theme="dark" className="bg-forest text-lime">
      <div className="gutter flex min-h-[62svh] flex-col items-center justify-center pt-32 pb-14 text-center">
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
          {tag}
        </p>
        <div data-hero-fade className="mt-10 flex flex-wrap justify-center gap-3">
          <PillButton href="/contact">Get in touch</PillButton>
          <PillButton href="/projects" variant="glass">
            Projects
          </PillButton>
        </div>
      </div>

      {/* Filmstrip of the live site's project photos, drifting under the headline. */}
      <div data-hero-fade className="marquee-wrap overflow-hidden pb-10">
        <div className="marquee h-[clamp(200px,34svh,340px)]" style={{ ["--marquee-speed" as string]: "90s" }}>
          {[...strip, ...strip].map((img, i) => {
            return (
              <div
                key={i}
                aria-hidden={i >= strip.length || undefined}
                className="relative mr-3 h-full shrink-0 overflow-hidden rounded-[4px] bg-lime/10 lg:mr-4"
                style={{ aspectRatio: img.ratio }}
              >
                <Image src={img.src} alt={i >= strip.length ? "" : img.alt} fill sizes="40vw" className="object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

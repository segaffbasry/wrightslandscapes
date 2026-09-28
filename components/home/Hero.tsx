"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { home } from "@/lib/content";
import PillButton from "../PillButton";

/* The one place heavy motion is earned: the headline lines rise out of masks on load. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [first, rest] = home.h1.split(" soft landscaping ");

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
      <div className="gutter flex min-h-[76svh] flex-col items-center justify-center pt-32 pb-20 text-center">
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
        <div data-hero-fade className="mt-10 flex flex-wrap justify-center gap-3">
          <PillButton href="/contact">Get in touch</PillButton>
          <PillButton href="/projects" variant="glass">
            Projects
          </PillButton>
        </div>
      </div>
    </section>
  );
}

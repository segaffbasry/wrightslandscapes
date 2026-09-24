"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/*
 * The site's whole scroll-motion system, driven by data attributes so pages
 * stay server components:
 *
 *   [data-reveal]  one calm fade/rise when it enters (headings, text blocks)
 *   [data-media]   clip-open reveal, plus ~10% parallax on its [data-parallax] child
 *   [data-rule]    hairline that draws left to right (reference: power2.inOut, 1s)
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;

    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              delay: Number(el.dataset.delay || 0),
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-media]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(14% 8% 14% 8%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
          const layer = el.querySelector<HTMLElement>("[data-parallax]");
          if (layer) {
            gsap.fromTo(
              layer,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: { trigger: el, start: "top bottom", once: true },
            },
          );
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}

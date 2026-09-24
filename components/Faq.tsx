"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/* FAQ accordion; panels open with a measured height tween so the page below moves smoothly. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    panels.current.forEach((el, j) => {
      if (!el) return;
      const show = j === next;
      gsap.to(el, { height: show ? "auto" : 0, duration: 0.6, ease: "power4.inOut", overwrite: true });
    });
    setOpen(next);
  };

  return (
    <div className="border-b border-forest/15">
      {items.map((item, i) => (
        <div key={item.q} className="border-t border-forest/15">
          <button
            onClick={() => toggle(i)}
            aria-expanded={open === i}
            aria-controls={`faq-${i}`}
            className="group flex w-full items-start gap-6 py-6 text-left"
          >
            <span className="t-label mt-2 w-10 shrink-0 text-leaf">({String(i + 1).padStart(2, "0")})</span>
            <span className="t-h3 flex-1 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-1.5">{item.q}</span>
            <span className="relative mt-2 h-4 w-4 shrink-0" aria-hidden>
              <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
              <span className={`absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-500 ${open === i ? "rotate-0" : "rotate-90"}`} />
            </span>
          </button>
          <div
            id={`faq-${i}`}
            ref={(el) => {
              panels.current[i] = el;
            }}
            className="overflow-hidden"
            style={{ height: i === 0 ? "auto" : 0 }}
          >
            <p className="rich t-body max-w-[46rem] pb-8 pl-16 text-forest/75" dangerouslySetInnerHTML={{ __html: item.a }} />
          </div>
        </div>
      ))}
    </div>
  );
}

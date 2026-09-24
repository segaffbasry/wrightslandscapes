"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/*
 * Exact copy of bartoszkolenda.com's pill button hover, read from its bundle
 * and verified by sampling computed transforms frame by frame:
 *   one gsap timeline per hover change, default duration 0.5s, ease power4.inOut
 *   mask      y: 100% -> 0
 *   label     opacity 1 -> 0, y 0 -> -100%
 *   label 2   opacity 0 -> 1, y 10px -> 0
 * Sizes are the reference's computed values: 13px / 700 / -0.26px tracking,
 * 1.25rem left pad, 0.85rem vertical pad, 1.31rem right pad, 2.25rem gap to the arrow.
 */

type Variant = "lime" | "forest" | "glass";

const skins: Record<Variant, { root: string; mask: string }> = {
  lime: { root: "bg-lime text-forest", mask: "bg-lime" },
  forest: { root: "bg-forest text-lime", mask: "bg-forest" },
  glass: { root: "bg-lime/20 text-lime backdrop-blur-md", mask: "bg-transparent" },
};

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 11 14" fill="currentColor" aria-hidden className={`h-[0.875rem] w-[0.68rem] pb-[2px] ${className}`}>
    <path d="M0 12.0593L7.504 4.60687L1.00002 4.51248V2.5H11V12.5624H9L8.93581 6.04761L1.4318 13.5L0 12.0593Z" />
  </svg>
);

function Label({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="mr-[2.25rem]">{children}</span>
      <Arrow />
    </>
  );
}

export default function PillButton({
  href,
  children,
  variant = "lime",
  className = "",
  hovered,
}: {
  /** Omit to render a non-link span (e.g. inside a linked panel). */
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Drive the hover from a parent (e.g. a whole image panel). */
  hovered?: boolean;
}) {
  const mask = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const content2 = useRef<HTMLDivElement>(null);
  const external = !!href && /^https?:/.test(href);

  const play = (on: boolean) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const tl = gsap.timeline();
    tl.addLabel("start");
    tl.to(mask.current, { y: on ? 0 : "100%", ease: "power4.inOut" }, "start");
    tl.to(content.current, { opacity: on ? 0 : 1, y: on ? "-100%" : 0, ease: "power4.inOut" }, "start");
    tl.to(content2.current, { opacity: on ? 1 : 0, y: on ? 0 : "10px", ease: "power4.inOut" }, "start");
  };

  useEffect(() => {
    if (hovered !== undefined) play(hovered);
  }, [hovered]);

  const skin = skins[variant];
  const cls = `relative inline-block w-fit overflow-hidden whitespace-nowrap rounded-full py-[0.85rem] pl-[1.25rem] text-[13px] font-bold uppercase leading-[16px] tracking-[-0.26px] ${skin.root} ${className}`;
  const inner = (
    <>
      <div
        ref={mask}
        aria-hidden
        className={`absolute inset-0 w-full translate-y-full rounded-full py-[0.85rem] pl-[1.25rem] ${skin.mask}`}
      >
        <div ref={content2} className="flex h-full w-full translate-y-[10px] items-center pr-[1.31rem] opacity-0">
          <Label>{children}</Label>
        </div>
      </div>
      <div ref={content} className="relative flex h-full w-full items-center pr-[1.31rem]">
        <Label>{children}</Label>
      </div>
    </>
  );

  const handlers =
    hovered === undefined ? { onMouseEnter: () => play(true), onMouseLeave: () => play(false) } : {};

  if (!href)
    return (
      <span className={cls} {...handlers}>
        {inner}
      </span>
    );

  return external ? (
    <a href={href} target="_blank" rel="noopener" className={cls} {...handlers}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} {...handlers}>
      {inner}
    </Link>
  );
}

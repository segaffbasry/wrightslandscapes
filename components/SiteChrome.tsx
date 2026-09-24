"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { contact, nav } from "@/lib/content";
import { getLenis } from "./SmoothScroll";
import PillButton from "./PillButton";
import { FacebookIcon, LinkedInIcon } from "./SocialIcons";

type Group = "services" | "company" | "contact";

export const LogoMark = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden
    className={`block bg-current ${className}`}
    style={{
      aspectRatio: "530 / 393",
      WebkitMask: "url(/images/logo-mark.png) center / contain no-repeat",
      mask: "url(/images/logo-mark.png) center / contain no-repeat",
    }}
  />
);

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Wrights Landscapes Group, home">
      <LogoMark className="h-7" />
      <span className="text-[15px] font-medium leading-none tracking-[-0.02em]">Wrights Landscapes</span>
    </Link>
  );
}

/* Underline that draws in from the left on hover, as on the reference's nav links. */
function NavButton({ children, onClick, active }: { children: string; onClick: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} className="group relative py-2 text-[14px] font-medium tracking-[-0.01em]" aria-haspopup="dialog">
      {children}
      <span
        className={`absolute bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[var(--ease-in-out-quint)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      />
    </button>
  );
}

export default function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Group | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hidden, setHidden] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  /* Header: adopt the colour of whatever section sits behind it; hide on the way down. */
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > 120);
        lastY = y;
      }
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 36)
        .map((el) => el.closest<HTMLElement>("[data-theme]"))
        .find((el) => el && !el.closest("header"));
      setTheme(under?.dataset.theme === "light" ? "light" : "dark");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const close = useCallback(() => setOpen(null), []);

  /* Full-screen menu: the panel wipes down, then each line rises out of its mask. */
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    tl.current?.kill();
    const lines = el.querySelectorAll("[data-line] > *");
    const fade = el.querySelectorAll("[data-fade]");

    if (open) {
      getLenis()?.stop();
      const t = gsap.timeline();
      t.set(el, { visibility: "visible" });
      if (reduced) {
        t.set(el, { clipPath: "inset(0% 0% 0% 0%)" }).set(lines, { yPercent: 0 }).set(fade, { opacity: 1 });
      } else {
        t.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" });
        t.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.03 }, 0.45);
        t.fromTo(fade, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.7);
      }
      closeBtn.current?.focus({ preventScroll: true });
      tl.current = t;
    } else if (el.style.visibility === "visible") {
      const t = gsap.timeline({ onComplete: () => void getLenis()?.start() });
      t.to([lines, fade], { opacity: 0, duration: reduced ? 0 : 0.25, ease: "power2.in" });
      t.to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: reduced ? 0 : 0.7, ease: "power4.inOut" }, reduced ? 0 : 0.1);
      t.set(el, { visibility: "hidden" });
      t.set([lines, fade], { clearProps: "opacity" });
      tl.current = t;
    }
  }, [open]);

  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const dim = (g: Group) => (open && open !== g ? "opacity-40 hover:opacity-100 focus-within:opacity-100" : "opacity-100");

  const bigLink =
    "group/l flex items-baseline gap-3 py-[0.2em] text-[clamp(1.9rem,1.2rem+2.2vw,3.2rem)] leading-[1.02] tracking-[-0.04em] transition-transform duration-500 ease-[var(--ease-out-quart)] hover:translate-x-3";

  return (
    <>
      <header
        data-theme-header
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,color] duration-[600ms,400ms] ease-[var(--ease-in-out-quint)] ${
          theme === "light" ? "text-forest" : "text-lime"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="gutter flex h-20 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-7" aria-label="Main">
            <div className="hidden items-center gap-7 md:flex">
              <NavButton onClick={() => setOpen("services")}>Services</NavButton>
              <NavButton onClick={() => setOpen("company")}>Company</NavButton>
              <NavButton onClick={() => setOpen("contact")}>Contact</NavButton>
            </div>
            <button
              onClick={() => setOpen("services")}
              className="flex items-center gap-3 py-2 text-[14px] font-medium md:hidden"
              aria-haspopup="dialog"
            >
              Menu
              <span className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <div
        ref={menu}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-lenis-prevent
        className="invisible fixed inset-0 z-50 overflow-y-auto bg-forest text-lime"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="gutter flex h-20 items-center justify-between">
          <Logo />
          <button ref={closeBtn} onClick={close} className="group flex items-center gap-3 py-2 text-[14px] font-medium">
            Close
            <span className="relative h-6 w-6">
              <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current transition-transform duration-500 group-hover:rotate-[135deg]" />
              <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current transition-transform duration-500 group-hover:rotate-[45deg]" />
            </span>
          </button>
        </div>
        <div className="gutter">
          <div className="h-px bg-lime/15" />
        </div>

        <div className="gutter grid gap-12 pt-10 pb-16 md:grid-cols-12 md:gap-6 lg:pt-16">
          <section className={`transition-opacity duration-500 md:col-span-5 ${dim("services")}`}>
            <p data-fade className="t-label mb-6 text-lime/60">(Services)</p>
            <ul>
              {nav.services.map((l) => (
                <li key={l.href} data-line className="overflow-hidden">
                  <Link href={l.href} className={bigLink}>
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={`transition-opacity duration-500 md:col-span-4 ${dim("company")}`}>
            <p data-fade className="t-label mb-6 text-lime/60">(Company)</p>
            <ul>
              {nav.company.map((l) => {
                const ext = l.href.startsWith("http");
                return (
                  <li key={l.href} data-line className="overflow-hidden">
                    {ext ? (
                      <a href={l.href} target="_blank" rel="noopener" className={bigLink}>
                        <span>{l.label}</span>
                        <span className="accent text-[0.5em] text-lime/60">↗</span>
                      </a>
                    ) : (
                      <Link href={l.href} className={bigLink} aria-current={pathname === l.href ? "page" : undefined}>
                        <span>{l.label}</span>
                        {pathname === l.href && <span className="mb-[0.3em] h-2 w-2 self-end rounded-full bg-leaf" />}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={`flex flex-col gap-8 transition-opacity duration-500 md:col-span-3 ${dim("contact")}`}>
            <p data-fade className="t-label text-lime/60">(Contact)</p>
            <div data-fade className="t-body space-y-1">
              <p>{contact.company}</p>
              {contact.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <div data-fade className="t-body space-y-1">
              <p className="text-lime/60">Enquiries</p>
              <a className="block hover:underline" href={`mailto:${contact.email}`}>
                {contact.person} · {contact.email}
              </a>
              <a className="block hover:underline" href={`tel:${contact.tel}`}>
                {contact.phone}
              </a>
            </div>
            <div data-fade className="flex gap-3">
              <a href={contact.linkedin} target="_blank" rel="noopener" aria-label="Wrights Landscapes on LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-lime/30 transition-colors hover:bg-lime hover:text-forest">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href={contact.facebook} target="_blank" rel="noopener" aria-label="Wrights Landscapes on Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-lime/30 transition-colors hover:bg-lime hover:text-forest">
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
            <div data-fade>
              <PillButton href="/contact">Get in touch</PillButton>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

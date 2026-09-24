import Link from "next/link";
import type { Block } from "@/lib/content";
import { Arrow } from "./PillButton";
import PillButton from "./PillButton";
import Faq from "./Faq";

const idx = (i: number) => `(${String(i + 1).padStart(2, "0")})`;

function One({ b, nested }: { b: Block; nested?: boolean }) {
  switch (b.type) {
    case "lede":
      return <p data-reveal className="rich t-h3 max-w-[48rem] text-forest" dangerouslySetInnerHTML={{ __html: b.html }} />;
    case "p":
      return <p data-reveal className="rich t-body max-w-[42rem] text-forest/75" dangerouslySetInnerHTML={{ __html: b.html }} />;
    case "h2":
      // Only reached inside two-column rows; top-level h2s become section labels.
      return (
        <h3 data-reveal className={`t-h3 text-forest ${nested ? "pt-4" : ""}`}>
          {b.text}
        </h3>
      );
    case "cta":
      return (
        <div data-reveal className="pt-4">
          <PillButton href={b.href} variant="forest">
            {b.text}
          </PillButton>
        </div>
      );
    case "clients":
      return (
        <ul className="border-b border-forest/15">
          {b.items.map((c, i) => (
            <li key={c} data-reveal className="flex items-baseline gap-6 border-t border-forest/15 py-4">
              <span className="t-label w-10 text-leaf">{idx(i)}</span>
              <span className="t-h3">{c}</span>
            </li>
          ))}
        </ul>
      );
    case "ul":
      return (
        <ul className="border-b border-forest/15">
          {b.items.map((it, i) =>
            "title" in it ? (
              <li key={it.href} data-reveal className="border-t border-forest/15">
                <Link href={it.href} className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                  <span>
                    <span className="t-h3 block transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-1.5">{it.title}</span>
                    <span className="t-body mt-2 block max-w-[36rem] text-forest/70">{it.desc}</span>
                  </span>
                  <span className="grid h-11 w-11 place-items-center self-center rounded-full border border-forest/20 transition-colors duration-300 group-hover:bg-forest group-hover:text-lime">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ) : (
              <li key={i} data-reveal className="t-body flex gap-4 border-t border-forest/15 py-3 text-forest/80">
                <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" />
                <span className="rich" dangerouslySetInnerHTML={{ __html: it.html }} />
              </li>
            ),
          )}
        </ul>
      );
    case "spec":
      return (
        <div className="grid gap-x-8 sm:grid-cols-2">
          {b.items.map((it, i) => (
            <div key={it.title} data-reveal data-delay={String((i % 2) * 0.08)} className="border-t border-forest/15 pt-5 pb-10">
              <p className="t-label mb-6 text-leaf">{idx(i)}</p>
              <h3 className="t-h3 mb-3">{it.title}</h3>
              <p className="rich t-body text-forest/70" dangerouslySetInnerHTML={{ __html: it.html }} />
            </div>
          ))}
        </div>
      );
    case "dl":
      return (
        <dl className="border-b border-forest/15">
          {b.items.map((it) => (
            <div key={it.dt} data-reveal className="grid gap-1 border-t border-forest/15 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="t-label pt-1 text-forest/55">{it.dt}</dt>
              <dd className="rich t-body" dangerouslySetInnerHTML={{ __html: it.html }} />
            </div>
          ))}
        </dl>
      );
    case "faq":
      return <Faq items={b.items} />;
    case "cols":
      return (
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {b.cols.map((col, i) => (
            <div key={i} className="space-y-5">
              {col.map((c, j) => (
                <One key={j} b={c} nested />
              ))}
            </div>
          ))}
        </div>
      );
  }
}

/*
 * Page body in the reference's editorial layout: each h2 opens a row with a
 * drawn hairline, the heading on the left and its content on the right.
 */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  const groups: { h2?: string; items: Block[] }[] = [{ items: [] }];
  for (const b of blocks) {
    if (b.type === "h2") groups.push({ h2: b.text, items: [] });
    else groups[groups.length - 1].items.push(b);
  }

  return (
    <div className="space-y-20 lg:space-y-28">
      {groups
        .filter((g) => g.h2 || g.items.length)
        .map((g, i) => (
          <section key={i} className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            {g.h2 ? (
              <>
                <div className="lg:col-span-12">
                  <div data-rule className="h-px bg-forest/20" />
                </div>
                <h2 data-reveal className="t-h2 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
                  {g.h2}
                </h2>
              </>
            ) : (
              <div className="hidden lg:col-span-4 lg:block" />
            )}
            <div className="space-y-6 lg:col-span-8">
              {g.items.map((b, j) => (
                <One key={j} b={b} />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}

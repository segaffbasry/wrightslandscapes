import Image from "next/image";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Hero from "@/components/home/Hero";
import Media from "@/components/Media";
import PillButton, { Arrow } from "@/components/PillButton";
import { home, homeGallery } from "@/lib/content";

const idx = (i: number) => `(${String(i + 1).padStart(2, "0")})`;

function Label({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <div className="mb-10 lg:mb-14">
      <p data-reveal className={`t-label mb-4 ${dark ? "text-lime/60" : "text-forest/60"}`}>
        {children}
      </p>
      <div data-rule className={`h-px ${dark ? "bg-lime/20" : "bg-forest/20"}`} />
    </div>
  );
}

/* A full-bleed photo band between sections, as the reference does between its white blocks. */
function Band({ src, alt, caption, href }: { src: string; alt: string; caption: string; href?: string }) {
  return (
    <section data-theme="dark" className="relative">
      <Media img={{ src, alt }} ratio="16 / 8" className="max-h-[92svh] w-full" />
      <div className="gutter absolute inset-x-0 bottom-0 flex items-center justify-between bg-forest/85 py-3 text-lime backdrop-blur-sm">
        {href ? (
          <Link href={href} className="t-label flex items-center gap-2 hover:opacity-70">
            {caption}. <Arrow />
          </Link>
        ) : (
          <span className="t-label">{caption}.</span>
        )}
        <span className="t-label">(Wrights)</span>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { whatWeDo, whoFor, whereWork, clients, accreditations } = home;
  return (
    <>
      <Hero />

      {/* Who we are */}
      <section data-theme="light" className="bg-white">
        <div className="gutter py-24 lg:py-36">
          <Label>About</Label>
          <p data-reveal className="t-h2 max-w-[70rem]">
            {home.lede}
          </p>
          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <Media img={{ src: "/images/imageC.jpeg", alt: "Completed planting and turfing to a new-build plot" }} ratio="4 / 5" sizes="(min-width: 1024px) 33vw, 100vw" className="rounded-[4px]" />
            </div>
            <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:self-end">
              {home.body.map((p) => (
                <p key={p.slice(0, 20)} data-reveal className="t-body text-forest/75">
                  {p}
                </p>
              ))}
              <p data-reveal className="t-body text-forest">
                {home.talk}
              </p>
              <div data-reveal className="pt-2">
                <PillButton href="/contact" variant="forest">
                  Get in touch
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Band src="/images/turf.jpg" alt={home.turfAlt} caption="Turfing, seeding and wildflower" href="/turfing-seeding-and-wildflower" />

      {/* What we do */}
      <section data-theme="light" className="bg-white">
        <div className="gutter py-24 lg:py-36">
          <div className="mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12">
            <h2 data-reveal className="t-hero lg:col-span-6">
              What we <span className="accent">do</span>
            </h2>
            <p data-reveal data-delay="0.1" className="t-body text-forest/75 lg:col-span-5 lg:col-start-8 lg:self-end">
              {whatWeDo.intro}
            </p>
          </div>
          <div className="grid gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.items.map((it, i) => (
              <article key={it.title} data-reveal data-delay={String((i % 3) * 0.08)} className="flex flex-col border-t border-forest/15 pt-6 pb-14">
                <p className="t-label mb-10 text-leaf">{idx(i)}</p>
                <h3 className="t-h3 mb-4">{it.title}</h3>
                <p className="t-body mb-8 text-forest/70">{it.text}</p>
                {it.link && (
                  <div className="mt-auto">
                    <PillButton href={it.link.href} variant="forest">
                      {it.link.label}
                    </PillButton>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work for / Where we work */}
      <section data-theme="dark" className="bg-forest text-lime">
        <div className="gutter py-24 lg:py-36">
          <Label dark>{whoFor.h2}</Label>
          <p data-reveal className="t-h2 mb-16 max-w-[48rem] lg:mb-24">
            {whoFor.intro}
          </p>
          <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
            {whoFor.items.map((it, i) => (
              <div key={it} data-reveal data-delay={String(i * 0.06)} className="border-t border-lime/20 pt-5 pb-10">
                <p className="t-label mb-8 text-lime/60">{idx(i)}</p>
                <p className="t-h3">{it}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-6">
            <h2 data-reveal className="t-hero lg:col-span-5">
              Where we <span className="accent">work</span>
            </h2>
            <div className="space-y-6 lg:col-span-6 lg:col-start-7">
              {whereWork.body.map((p) => (
                <p key={p.slice(0, 20)} data-reveal className="t-body text-lime/85">
                  {p}
                </p>
              ))}
              <div data-reveal className="pt-2">
                <PillButton href={whereWork.link.href}>{whereWork.link.label}</PillButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Band src="/images/indoor.jpg" alt="Structural planting installed by Wrights Landscapes" caption="Podium, roof and structural planting" href="/commercial-soft-landscaping" />

      {/* Clients */}
      <section data-theme="light" className="bg-white">
        <div className="gutter py-24 lg:py-36">
          <h2 data-reveal className="t-hero max-w-[60rem]">
            {clients.lead} <span className="accent">{clients.accent}</span>
          </h2>
          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <p data-reveal className="t-body mb-8 text-forest/75">
                {clients.intro}
              </p>
              <ul className="border-b border-forest/15">
                {clients.items.map((c, i) => (
                  <li key={c} data-reveal className="flex items-baseline gap-6 border-t border-forest/15 py-4">
                    <span className="t-label w-10 text-leaf">{idx(i)}</span>
                    <span className="t-h3">{c}</span>
                  </li>
                ))}
              </ul>
              <p data-reveal className="t-body mt-8 text-forest/75">
                {clients.outro}
              </p>
            </div>
            <div data-reveal className="lg:col-span-6 lg:col-start-7">
              <Image src="/images/client-logos.png" alt={clients.logosAlt} width={1108} height={963} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section data-theme="light" className="bg-white">
        <div className="gutter pb-24 lg:pb-36">
          <Label>{accreditations.h2}</Label>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <p data-reveal className="t-body text-forest/75">
                {accreditations.body}
              </p>
              <div data-reveal className="mt-10 max-w-[22rem]">
                <Image src="/images/accreditations.png" alt={accreditations.alt} width={722} height={365} className="h-auto w-full" />
              </div>
            </div>
            <dl className="border-b border-forest/15 lg:col-span-7 lg:col-start-6">
              {accreditations.titleblock.map((r) => (
                <div key={r.dt} data-reveal className="grid gap-1 border-t border-forest/15 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="t-label pt-1 text-forest/55">{r.dt}</dt>
                  <dd className="t-body">{r.dd}</dd>
                </div>
              ))}
              <div data-reveal className="grid gap-1 border-t border-forest/15 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="t-label pt-1 text-forest/55">Contact</dt>
                <dd className="t-body">
                  <a href="mailto:ed@wrightslandscapes.com" className="underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
                    ed@wrightslandscapes.com
                  </a>
                  <br />
                  07887 898327
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Project gallery: the live home page's full set of photos */}
      <section data-theme="light" className="bg-white">
        <div className="gutter pb-24 lg:pb-36">
          <Gallery images={homeGallery} />
        </div>
      </section>
    </>
  );
}

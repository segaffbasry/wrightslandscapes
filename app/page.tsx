import Image from "next/image";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Media from "@/components/Media";
import PillButton from "@/components/PillButton";
import LogoMarquee from "@/components/home/LogoMarquee";
import { filmstrip, home, imgSize, whatWeDoImages } from "@/lib/content";

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

export default function HomePage() {
  const { whatWeDo, whoFor, whereWork, clients, accreditations } = home;
  const strip = filmstrip.map((img) => {
    const [w, h] = imgSize(img.src);
    return { ...img, ratio: Math.max(0.7, Math.min(1.8, w / h)) };
  });
  return (
    <>
      <Hero h1={home.h1} tag={home.tag} strip={strip} />
      <Services />

      {/* Who we are */}
      <section data-theme="light" className="bg-white">
        <div className="gutter py-16 lg:py-24">
          <Label>About</Label>
          <p data-reveal className="t-h2 max-w-[70rem]">
            {home.lede}
          </p>
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              <Media img={{ src: "/images/thirteen.jpeg", alt: "Finished landscaping to a new-build home" }} ratio="4 / 5" sizes="(min-width: 1024px) 33vw, 100vw" className="rounded-[4px]" />
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


      {/* What we do */}
      <section data-theme="light" className="bg-white">
        <div className="gutter py-16 lg:py-24">
          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-12">
            <h2 data-reveal className="t-hero lg:col-span-6">
              What we <span className="accent">do</span>
            </h2>
            <p data-reveal data-delay="0.1" className="t-body text-forest/75 lg:col-span-5 lg:col-start-8 lg:self-end">
              {whatWeDo.intro}
            </p>
          </div>
          <div className="grid gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.items.map((it, i) => (
              <article key={it.title} data-reveal data-delay={String((i % 3) * 0.08)} className="flex flex-col pb-12">
                <div className="group relative mb-6">
                  <Media img={whatWeDoImages[i]} ratio="3 / 2" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="rounded-[4px]" />
                  <span className="t-label absolute top-3 left-3 rounded-full bg-white/85 px-3 py-1.5 text-forest backdrop-blur-sm">{idx(i)}</span>
                </div>
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

      {/* Who we work for / Where we work: photo and text side by side */}
      <section data-theme="dark" className="bg-forest text-lime">
        <div className="grid lg:grid-cols-12">
          <div className="relative min-h-[60vw] lg:col-span-5 lg:min-h-0">
            <Media img={{ src: "/images/imageE.jpeg", alt: "Commercial soft landscaping and planting project in Hertfordshire" }} ratio="fill" sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
          <div className="gutter py-16 lg:col-span-7 lg:py-24 lg:pl-16">
            <Label dark>{whoFor.h2}</Label>
            <p data-reveal className="t-h3 mb-8 max-w-[40rem]">
              {whoFor.intro}
            </p>
            <ul className="border-b border-lime/15">
              {whoFor.items.map((it, i) => (
                <li key={it} data-reveal data-delay={String(i * 0.05)} className="flex items-baseline gap-6 border-t border-lime/15 py-4">
                  <span className="t-label w-10 shrink-0 text-lime/60">{idx(i)}</span>
                  <span className="t-body text-[1.15rem]">{it}</span>
                </li>
              ))}
            </ul>

            <h2 data-reveal className="t-h2 mt-14 mb-6">
              Where we <span className="accent">work</span>
            </h2>
            <div className="space-y-5">
              {whereWork.body.map((p) => (
                <p key={p.slice(0, 20)} data-reveal className="t-body max-w-[40rem] text-lime/85">
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

      {/* Clients */}
      <section data-theme="light" className="bg-white">
        <div className="gutter pt-16 pb-10 lg:pt-24 lg:pb-14">
          <h2 data-reveal className="t-hero max-w-[60rem]">
            {clients.lead} <span className="accent">{clients.accent}</span>
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <p data-reveal className="t-body text-forest/75 lg:col-span-6">
              {clients.intro} {clients.items.join(", ")}.
            </p>
            <p data-reveal className="t-body text-forest/75 lg:col-span-5 lg:col-start-8">
              {clients.outro}
            </p>
          </div>
        </div>
        <div data-reveal className="pb-16 lg:pb-24">
          <LogoMarquee />
        </div>
      </section>

      {/* Accreditations */}
      <section data-theme="light" className="bg-white">
        <div className="gutter pb-16 lg:pb-24">
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

    </>
  );
}

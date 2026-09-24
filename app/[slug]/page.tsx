import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Blocks from "@/components/Blocks";
import Gallery from "@/components/Gallery";
import Media from "@/components/Media";
import { Arrow } from "@/components/PillButton";
import { SERVICE_SLUGS, getPage, imgSize, pages } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const page = getPage((await params).slug);
  return page ? { title: page.title, description: page.description } : {};
}

export default async function InnerPage({ params }: PageProps<"/[slug]">) {
  const page = getPage((await params).slug);
  if (!page) notFound();

  const isService = SERVICE_SLUGS.includes(page.slug);
  const i = pages.indexOf(page);
  const next = pages[(i + 1) % pages.length];
  // Several of the live site's banners are small; never blow one up past ~1.5x its real width.
  const [w] = imgSize(page.image.src);

  return (
    <>
      <section data-theme="dark" className="bg-forest text-lime">
        <div className="gutter pt-36 pb-16 lg:pt-48 lg:pb-24">
          <p data-reveal className="t-label mb-8 text-lime/60">
            {isService ? "(Services)" : "(Wrights Landscapes Group)"}
          </p>
          <h1 data-reveal className="t-hero max-w-[64rem]">
            {page.h1}
          </h1>
          <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-6">
            <p data-reveal data-delay="0.1" className="t-body text-lime/80 lg:col-span-4">
              {page.intro}
            </p>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="ml-auto" style={{ maxWidth: Math.round(w * 1.5) }}>
                <Media img={page.image} priority sizes="(min-width: 1024px) 60vw, 100vw" className="rounded-[4px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="light" className="bg-white">
        <div className="gutter py-24 lg:py-36">
          <Blocks blocks={page.blocks} />
          {page.gallery && (
            <div className="mt-24 lg:mt-36">
              <Gallery images={page.gallery} />
            </div>
          )}
        </div>
      </section>

      <section data-theme="light" className="bg-white">
        <div className="gutter pb-24 lg:pb-32">
          <div data-rule className="h-px bg-forest/20" />
          <Link href={`/${next.slug}`} className="group grid items-end gap-6 pt-8 lg:grid-cols-12">
            <span className="t-label text-forest/55 lg:col-span-4">(Next)</span>
            <span className="t-h2 flex items-center gap-5 lg:col-span-8">
              <span className="transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-2">{next.h1}</span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-forest/20 transition-colors duration-300 group-hover:bg-forest group-hover:text-lime">
                <Arrow />
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { contact, footerPages, home } from "@/lib/content";
import PillButton from "./PillButton";
import { FacebookIcon, LinkedInIcon } from "./SocialIcons";

/* The live site's closing line becomes the reference-style footer CTA. */
export default function Footer() {
  const [before, after] = home.talk.split("talk it through");
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-forest text-lime">
      <div className="gutter pt-28 pb-10 lg:pt-40">
        <div className="mx-auto max-w-[62rem] text-center">
          <h2 data-reveal className="t-hero text-[clamp(2.4rem,1.3rem+3.6vw,4.6rem)]">
            {before}
            <span className="accent">talk it through</span>
            {after}
          </h2>
          <div data-reveal data-delay="0.1" className="mt-10 flex justify-center">
            <PillButton href="/contact">Get in touch</PillButton>
          </div>
        </div>

        <div className="mt-28 grid gap-12 border-t border-lime/15 pt-12 sm:grid-cols-2 lg:mt-40 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="t-label mb-5 text-lime/60">Address</p>
            <p className="t-body">
              {contact.company}
              <br />
              {contact.address[0]}
              <br />
              {contact.address[1]}
            </p>
            <a href={contact.map} target="_blank" rel="noopener" className="t-label mt-5 inline-flex items-center gap-2 border-b border-lime/40 pb-1 hover:border-lime">
              View map
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="t-label mb-5 text-lime/60">Enquiries</p>
            <a href={`mailto:${contact.email}`} className="t-body block hover:underline">
              {contact.person}
            </a>
            <a href={`mailto:${contact.email}`} className="t-body block hover:underline">
              {contact.email}
            </a>
            <a href={`tel:${contact.tel}`} className="t-body block hover:underline">
              {contact.phone}
            </a>
            <div className="mt-6 flex gap-3">
              <a href={contact.linkedin} target="_blank" rel="noopener" aria-label="Wrights Landscapes on LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-lime/30 transition-colors duration-300 hover:bg-lime hover:text-forest">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href={contact.facebook} target="_blank" rel="noopener" aria-label="Wrights Landscapes on Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-lime/30 transition-colors duration-300 hover:bg-lime hover:text-forest">
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="t-label mb-5 text-lime/60">Pages</p>
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-1 xl:columns-2">
              {footerPages.map((p) => (
                <li key={p.href} className="break-inside-avoid">
                  {p.href.startsWith("http") ? (
                    <a href={p.href} target="_blank" rel="noopener" className="t-body inline-block py-0.5 text-lime/80 hover:text-lime">
                      {p.label} ↗
                    </a>
                  ) : (
                    <Link href={p.href} className="t-body inline-block py-0.5 text-lime/80 hover:text-lime">
                      {p.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="t-label mb-5 text-lime/60">Accreditations</p>
            <div className="rounded-2xl bg-white p-4">
              <Image src="/images/accreditations.png" alt="Constructionline Gold and CHAS accredited" width={722} height={365} className="h-auto w-full" />
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-[60rem] text-[12px] leading-relaxed text-lime/50">{contact.smallprint}</p>
      </div>
    </footer>
  );
}

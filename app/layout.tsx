import type { Metadata, Viewport } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import SiteChrome from "@/components/SiteChrome";
import SmoothScroll from "@/components/SmoothScroll";
import { home } from "@/lib/content";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// Figtree carries the UI. Playfair Display italic is the accent face, kept for the hero,
// the footer line and a few headline words (both are the reference site's own pairing).
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], style: ["italic"], weight: ["400"] });

export const metadata: Metadata = {
  title: { default: home.title, template: "%s" },
  description: home.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#173021" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${figtree.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        <ScrollEffects />
        <SiteChrome />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { PreviewNotice } from "@/components/layout/PreviewNotice";
import { Preloader } from "@/components/animation/Preloader";
import { RevealObserver } from "@/components/animation/RevealObserver";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { Cursor } from "@/components/animation/Cursor";
import { site } from "@/data/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Latkan Store — Little Details. Lasting Impressions.",
    template: "%s — The Latkan Store",
  },
  description: site.description,
  openGraph: {
    title: "The Latkan Store",
    description: site.description,
    type: "website",
    siteName: "The Latkan Store",
  },
  robots: site.previewMode ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#F5F0E8",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint:
 *  - enables motion classes only when allowed (content stays visible otherwise)
 *  - plays the preloader once per session, never under reduced motion
 */
const boot = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('motion-ok');var s=sessionStorage.getItem('tls.intro');if(r||s||location.pathname!=='/'){d.classList.add('no-preload')}else{sessionStorage.setItem('tls.intro','1')}}catch(e){document.documentElement.classList.add('no-preload')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${bodoni.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <Preloader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <PreviewNotice />
        <RevealObserver />
        <SmoothScroll />
        <Cursor />
      </body>
    </html>
  );
}

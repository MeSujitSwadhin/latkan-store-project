import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";
import { features, site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  const wa = whatsappLink("Hello The Latkan Store, I have a question.");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      {/* thread decoration */}
      <div data-draw-group="" className="pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden="true">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="h-full w-full">
          <path
            data-draw=""
            style={{ ["--len" as string]: 1700 }}
            d="M-10 30 C 240 150, 420 -10, 720 70 S 1180 150, 1450 40"
            fill="none"
            stroke="#C5A478"
            strokeWidth="1"
            opacity="0.7"
          />
          <path
            data-draw=""
            style={{ ["--len" as string]: 1700, ["--d" as string]: "0.3s" }}
            d="M-10 60 C 300 120, 500 20, 760 90 S 1200 110, 1450 70"
            fill="none"
            stroke="#D9B7B5"
            strokeWidth="0.6"
            opacity="0.45"
          />
        </svg>
      </div>

      <div className="shell relative pt-40">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-gold">The Latkan Atelier</p>
            <p className="display mt-5 text-[length:var(--step-3)] leading-[0.95]">
              Every detail,
              <br />
              <em className="text-rose">a story.</em>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-line text-ivory">
                Instagram <ArrowUpRight size={14} />
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line text-gold">
                  WhatsApp <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="label text-ivory/50">Collections</p>
              <ul className="mt-5 space-y-3">
                {collections.map((c) => (
                  <li key={c.slug}>
                    <Link className="link-thread text-ivory/85 hover:text-ivory" href={`/collections/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-ivory/50">The House</p>
              <ul className="mt-5 space-y-3">
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/our-story">Our Story</Link></li>
                {features.customOrders && (
                  <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/custom-orders">Custom Studio</Link></li>
                )}
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/gallery">Gallery</Link></li>
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/contact">Contact</Link></li>
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/wishlist">Wishlist</Link></li>
              </ul>
            </div>
            <div>
              <p className="label text-ivory/50">Care &amp; Policy</p>
              <ul className="mt-5 space-y-3">
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/shipping-returns">Shipping &amp; Returns</Link></li>
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/privacy">Privacy</Link></li>
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/terms">Terms</Link></li>
                <li><Link className="link-thread text-ivory/85 hover:text-ivory" href="/credits">Image Credits</Link></li>
              </ul>
              {(site.email || site.phone || site.location) && (
                <address className="mt-8 not-italic text-ivory/70">
                  {site.location && <p>{site.location}</p>}
                  {site.phone && <p>{site.phone}</p>}
                  {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
                </address>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* oversized closing wordmark */}
      <div className="relative mt-20 select-none" aria-hidden="true">
        <p
          data-reveal=""
          className="didone whitespace-nowrap text-center leading-[0.8] tracking-[-0.02em] text-ivory/[0.92]"
          style={{ fontSize: "clamp(3.2rem, 15.4vw, 16.5rem)" }}
        >
          LATKAN
        </p>
        <div className="gold-rule mx-auto mt-4 w-2/3 opacity-60" />
      </div>

      <div className="shell flex flex-col items-start justify-between gap-3 py-8 text-[0.72rem] text-ivory/50 sm:flex-row sm:items-center">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p>
          Photography shown is licensed stock for illustration —{" "}
          <Link href="/credits" className="underline underline-offset-4 hover:text-ivory">
            credits
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}

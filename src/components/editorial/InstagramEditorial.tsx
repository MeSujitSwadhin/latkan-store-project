import { ArrowUpRight, Instagram } from "lucide-react";
import { instagramPosts } from "@/data/instagram";
import { site } from "@/data/site";
import { Photo } from "./Photo";
import { cx } from "@/lib/format";

const TEXTURES = ["tx-satin", "tx-pink", "tx-silk", "tx-red", "cr-threads"];

export function InstagramEditorial() {
  const hasPosts = instagramPosts.length > 0;
  const tiles = hasPosts ? instagramPosts.slice(0, 5) : TEXTURES.map((t) => ({ image: t, url: site.instagram.url, caption: "" }));

  return (
    <section className="section-y relative overflow-hidden bg-ivory-deep" aria-labelledby="ig-title">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="numeral text-gold">09</span>
              <span className="h-px w-12 bg-ink/25" />
              <p className="label text-ink-soft">Seen on Instagram</p>
            </div>
            <h2 id="ig-title" data-reveal="" className="didone mt-8 break-all text-[clamp(2.2rem,7.2vw,6.8rem)] leading-none text-wine">
              @thelatkan<span className="italic">store</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-reveal="" className="text-sm text-ink-soft">
              New pieces, styling notes and the details behind them — shared first on Instagram. This is a curated selection, not a
              live feed.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal=""
              className="btn btn-wine mt-6"
            >
              <Instagram size={16} strokeWidth={1.4} /> Follow The Latkan Store
            </a>
          </div>
        </div>

        <ul className="no-scrollbar -mx-[var(--gutter)] mt-14 flex snap-x gap-4 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {tiles.map((t, i) => (
            <li key={t.image + i} className={cx("w-[62vw] shrink-0 snap-start sm:w-[34vw] lg:w-auto", i % 2 === 1 && "lg:mt-12")}>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] overflow-hidden"
                data-cursor="Open"
                aria-label={hasPosts ? `Instagram post: ${t.caption}` : `Visit @thelatkanstore on Instagram`}
              >
                <Photo id={t.image} sizes="(min-width:1024px) 20vw, 62vw" className="h-full w-full" imgClassName="transition-transform duration-[1400ms] group-hover:scale-105" />
                {!hasPosts && (
                  <div className="absolute inset-0 flex flex-col justify-between bg-wine/72 p-5 text-ivory transition-colors duration-700 group-hover:bg-wine/60">
                    <span className="numeral text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="display text-2xl italic leading-tight">Post awaiting approval</p>
                      <p className="mt-2 text-[0.65rem] text-ivory/70">Add approved images in src/data/instagram.ts</p>
                    </div>
                  </div>
                )}
                <ArrowUpRight size={16} className="absolute right-4 top-4 text-ivory opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

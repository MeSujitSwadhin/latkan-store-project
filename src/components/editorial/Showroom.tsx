"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getProduct } from "@/data/products";
import { Photo } from "./Photo";
import { getGsap } from "@/lib/gsap";

const FEATURE = "sample-gilded-drop-latkan";

const FRAMES = [
  {
    n: "01",
    kicker: "The Silhouette",
    title: (
      <>
        A study in <em>proportion.</em>
      </>
    ),
    body: "A latkan is composed like jewellery: proportion first, then weight, then the way it falls against fabric.",
  },
  {
    n: "02",
    kicker: "The Close-up",
    title: (
      <>
        Look <em>closer.</em>
      </>
    ),
    body: "Look closer and the anatomy appears — a cap, a bead, a collar, and strands that catch every movement.",
  },
  {
    n: "03",
    kicker: "The Piece",
    title: (
      <>
        The <em>featured</em> piece.
      </>
    ),
    body: "Featured from the sample edit. Final materials, sizes and pricing will be confirmed by the store.",
  },
];

/** Generic anatomy of a latkan — visual vocabulary, not product claims. */
const NOTES = [
  { x: "38%", y: "22%", t: "Cap" },
  { x: "56%", y: "40%", t: "Bead" },
  { x: "30%", y: "64%", t: "Strands" },
];

export function Showroom() {
  const root = useRef<HTMLElement>(null);
  const product = getProduct(FEATURE);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el.querySelector("[data-track]"), start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      tl.fromTo("[data-layer='a']", { clipPath: "inset(0% 38% 0% 38%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
        .fromTo("[data-layer='a'] img", { scale: 1.25 }, { scale: 1, duration: 1 }, 0)
        .fromTo("[data-headline]", { xPercent: 8 }, { xPercent: -22, duration: 3 }, 0)
        .to("[data-text='0']", { autoAlpha: 0, y: -30, duration: 0.3 }, 0.95)
        .fromTo("[data-layer='b']", { clipPath: "circle(0% at 55% 42%)" }, { clipPath: "circle(80% at 55% 42%)", duration: 0.9 }, 1)
        .fromTo("[data-layer='b'] img", { scale: 1.5 }, { scale: 1.08, duration: 1 }, 1)
        .fromTo("[data-text='1']", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 1.15)
        .fromTo("[data-note]", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, stagger: 0.12, duration: 0.25 }, 1.45)
        .to("[data-text='1']", { autoAlpha: 0, y: -30, duration: 0.3 }, 1.95)
        .to("[data-note]", { autoAlpha: 0, duration: 0.2 }, 1.95)
        .to(el, { backgroundColor: "#5A1829", color: "#F5F0E8", duration: 0.6 }, 1.95)
        .fromTo("[data-layer='c']", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, 2)
        .fromTo("[data-text='2']", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 2.25)
        .fromTo("[data-progress]", { scaleY: 0 }, { scaleY: 1, duration: 3 }, 0);
      return () => tl.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  if (!product) return null;

  return (
    <section ref={root} className="relative bg-ivory text-ink" aria-labelledby="showroom-title">
      {/* ── Desktop, motion allowed: sticky exhibition (no scroll hijacking — native scroll drives it) ── */}
      <div data-track="" className="showroom-sticky relative h-[320vh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <p
            data-headline=""
            aria-hidden="true"
            className="display pointer-events-none absolute left-0 top-[8vh] whitespace-nowrap text-[18vw] italic leading-none opacity-[0.07]"
          >
            The Couture Showroom
          </p>

          <div className="shell relative grid w-full grid-cols-12 items-center gap-8">
            <div className="relative col-span-4 h-[52vh]">
              <div className="flex items-center gap-4">
                <span className="numeral text-gold">05</span>
                <span className="h-px w-12 bg-current opacity-25" />
                <h2 id="showroom-title" className="label opacity-70">
                  The Couture Showroom
                </h2>
              </div>
              {FRAMES.map((f, i) => (
                <div key={f.n} data-text={i} className="absolute inset-x-0 top-24" style={i ? { opacity: 0, visibility: "hidden" } : undefined}>
                  <p className="label text-gold">
                    <span className="numeral mr-3 text-base normal-case tracking-normal">{f.n}</span>
                    {f.kicker}
                  </p>
                  <p className="display mt-6 text-[length:var(--step-4)] leading-[0.92]">{f.title}</p>
                  <p className="mt-6 max-w-sm text-sm opacity-75">{f.body}</p>
                  {i === 2 && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href={`/products/${product.slug}`} className="btn btn-ivory">
                        View the piece <ArrowRight size={14} />
                      </Link>
                      <Link href="/collections/bridal-latkans" className="btn btn-line">
                        The collection
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              {/* always-available action, independent of animation progress */}
              <Link href={`/products/${product.slug}`} className="label link-thread absolute bottom-0 left-0 text-[0.6rem] opacity-70">
                Skip to the featured piece →
              </Link>
            </div>

            <div className="relative col-span-7 col-start-6 h-[82vh]">
              <div data-layer="a" className="absolute inset-0">
                <Photo id="ed-bride-veil" sizes="58vw" className="h-full w-full" position="50% 30%" />
              </div>
              <div data-layer="b" className="absolute inset-0" style={{ clipPath: "circle(0% at 55% 42%)" }}>
                <Photo id={product.images[0]} sizes="58vw" className="h-full w-full" />
                {NOTES.map((n) => (
                  <span key={n.t} data-note="" className="absolute flex items-center gap-3 opacity-0" style={{ left: n.x, top: n.y }}>
                    <span className="relative grid h-5 w-5 place-items-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-ivory/40" />
                      <span className="h-2 w-2 rounded-full bg-ivory" />
                    </span>
                    <span className="label bg-ink/55 px-2 py-1 text-[0.58rem] text-ivory backdrop-blur-sm">{n.t}</span>
                  </span>
                ))}
              </div>
              <div data-layer="c" className="absolute inset-0 grid grid-cols-5 gap-4" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
                <Photo id={product.images[0]} sizes="35vw" className="col-span-3 h-full" />
                <div className="col-span-2 grid grid-rows-2 gap-4">
                  <Photo id={product.images[1] ?? "tx-red"} sizes="22vw" className="h-full" />
                  <div className="flex flex-col justify-end border border-ivory/20 p-5">
                    <p className="label text-[0.58rem] text-gold">Sample listing</p>
                    <p className="display mt-2 text-3xl">{product.name}</p>
                    <p className="mt-2 text-xs opacity-70">Price on request</p>
                  </div>
                </div>
              </div>
              <p className="absolute -bottom-7 right-0 text-[0.6rem] tracking-wide opacity-60">Illustrative photography</p>
            </div>

            <div className="absolute right-[var(--gutter)] top-1/2 hidden h-40 w-px -translate-y-1/2 bg-current/15 xl:block" aria-hidden="true">
              <span data-progress="" className="absolute inset-0 origin-top bg-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet / reduced motion: stacked editorial frames ── */}
      <div className="showroom-stack">
        <div className="shell section-y">
          <div className="flex items-center gap-4">
            <span className="numeral text-gold">05</span>
            <span className="h-px w-12 bg-ink/25" />
            <p className="label text-ink-soft">The Couture Showroom</p>
          </div>
          {FRAMES.map((f, i) => {
            const img = i === 0 ? "ed-bride-veil" : i === 1 ? product.images[0] : product.images[1] ?? "tx-red";
            return (
              <div key={f.n} className={i === 2 ? "-mx-[var(--gutter)] mt-16 bg-wine px-[var(--gutter)] py-14 text-ivory" : "mt-16"}>
                <div data-reveal="mask">
                  <Photo id={img} sizes="100vw" className="aspect-[4/5] w-full sm:aspect-[16/11]" position="50% 30%" />
                </div>
                <p className="label mt-8 text-gold">
                  <span className="numeral mr-3 text-base normal-case tracking-normal">{f.n}</span>
                  {f.kicker}
                </p>
                <p data-reveal="" className="display mt-4 text-[length:var(--step-4)] leading-[0.92]">
                  {f.title}
                </p>
                <p data-reveal="" className="mt-4 text-sm opacity-75">
                  {f.body}
                </p>
                {i === 1 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {NOTES.map((n) => (
                      <li key={n.t} className="label border border-ink/20 px-3 py-2 text-[0.58rem]">
                        {n.t}
                      </li>
                    ))}
                  </ul>
                )}
                {i === 2 && (
                  <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                    <Link href={`/products/${product.slug}`} className="btn btn-ivory">
                      View {product.name} <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .showroom-sticky{display:none}
        @media (min-width:1024px){
          .motion-ok .showroom-sticky{display:block}
          .motion-ok .showroom-stack{display:none}
        }
      `}</style>
    </section>
  );
}

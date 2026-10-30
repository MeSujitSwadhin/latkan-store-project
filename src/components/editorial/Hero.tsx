"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Photo } from "./Photo";
import { HangingLatkan } from "@/components/animation/HangingLatkan";
import { getGsap, motionAllowed } from "@/lib/gsap";

const d = (s: number) => ({ ["--d" as string]: `calc(${s}s + var(--intro))` });

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionAllowed() || !root.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-par='main']", { yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to("[data-par='sub']", { yPercent: -28, ease: "none", scrollTrigger: st });
      gsap.to("[data-par='type']", { yPercent: -18, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate min-h-[100svh] overflow-hidden bg-ivory pt-[calc(var(--header-h)+1.5rem)]"
      aria-labelledby="hero-title"
    >
      {/* fine line drawing behind the composition */}
      <svg
        data-draw-group=""
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          data-draw=""
          style={{ ["--len" as string]: 2200, ...d(0.2) }}
          d="M-20 640 C 260 520, 420 760, 700 600 S 1120 300, 1460 380"
          fill="none"
          stroke="#C5A478"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="shell relative grid grid-cols-12 gap-x-4 lg:min-h-[calc(100svh-var(--header-h)-1.5rem)]">
        {/* Typography column */}
        <div data-par="type" className="relative z-10 col-span-12 flex flex-col pt-6 lg:col-span-7 lg:pt-[6vh]">
          <p data-reveal="" style={d(0.1)} className="label flex items-center gap-4 text-wine">
            <span className="numeral text-base normal-case tracking-normal text-gold">No. 01</span>
            <span className="h-px w-10 bg-gold" />
            The Atelier Edit
          </p>

          <h1 id="hero-title" className="display mt-6 text-[length:clamp(3.6rem,0.4rem+9.6vw,12rem)] text-ink lg:mt-10" style={{ lineHeight: 0.84 }}>
            <span className="lines block" data-reveal="" style={d(0.15)}>
              <span className="line w-max">
                <span style={{ ["--i" as string]: 0 }}>Little</span>
              </span>
              <span className="line w-max pl-[12vw] lg:pl-[7vw]">
                <span style={{ ["--i" as string]: 1 }}>
                  Details<span className="text-gold">.</span>
                </span>
              </span>
              <span className="line w-max">
                <span style={{ ["--i" as string]: 2 }} className="text-wine">
                  <em>Lasting</em>
                </span>
              </span>
              <span className="line w-max pl-[6vw] lg:pl-[4vw]">
                <span style={{ ["--i" as string]: 3 }} className="text-wine">
                  <em>Impressions.</em>
                </span>
              </span>
            </span>
          </h1>

          <div className="mt-8 grid max-w-xl gap-8 sm:grid-cols-[auto_1fr] sm:items-start lg:mt-12 lg:pl-[7vw]">
            <span data-reveal="" style={d(0.75)} className="hidden h-px w-16 translate-y-3 bg-ink/40 sm:block" />
            <div>
              <p data-reveal="" style={d(0.8)} className="lede max-w-md text-ink-soft">
                An expression of <em>tradition</em>, detail, and personal style.
              </p>
              <div data-reveal="" style={d(0.95)} className="mt-8 flex flex-col gap-3 xs:flex-row">
                <Link href="/collections" className="btn btn-wine">
                  Explore the Collection <ArrowRight size={15} strokeWidth={1.4} />
                </Link>
                <Link href="/our-story" className="btn btn-line text-ink">
                  Discover Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Image composition */}
        <div className="relative col-span-12 mt-14 h-[118vw] max-h-[760px] sm:h-[90vw] lg:col-span-5 lg:mt-0 lg:h-auto lg:max-h-none">
          <div
            data-reveal="mask"
            style={d(0.25)}
            className="absolute right-[calc(var(--gutter)*-1)] top-0 h-[88%] w-[82%] lg:right-0 lg:top-[2vh] lg:h-[78vh] lg:w-full"
            data-cursor="Detail"
          >
            <div data-par="main" className="absolute -inset-y-[8%] inset-x-0">
              <Photo id="hero-detail" priority sizes="(min-width:1024px) 40vw, 82vw" className="h-full w-full" position="50% 40%" />
            </div>
          </div>

          <div
            data-reveal="mask"
            style={d(0.6)}
            className="absolute bottom-0 left-0 z-10 aspect-[3/4] w-[44%] border-[6px] border-ivory sm:w-[36%] lg:-left-[18%] lg:bottom-[4vh] lg:w-[44%]"
          >
            <div data-par="sub" className="absolute -inset-y-[10%] inset-x-0">
              <Photo id="hero-portrait" sizes="(min-width:1024px) 18vw, 44vw" className="h-full w-full" position="50% 25%" />
            </div>
          </div>

          <p
            data-reveal=""
            style={d(0.9)}
            className="label vertical-text absolute -right-1 bottom-[14%] z-10 hidden text-[0.58rem] text-ink-soft lg:block"
          >
            Latkans · Tassels · Finishing Details
          </p>

          <p data-reveal="" style={d(1)} className="absolute bottom-[-2.2rem] right-0 text-[0.62rem] tracking-wide text-ink-soft/80">
            Illustrative photography
          </p>
        </div>
      </div>

      {/* suspended signature motif */}
      <HangingLatkan className="absolute right-[6%] top-0 z-20 hidden h-[300px] md:block lg:right-[44%]" threadLength={150} />
      <HangingLatkan className="absolute right-[10%] top-0 z-20 h-[230px] md:hidden" threadLength={90} />

      {/* scroll prompt */}
      <div className="shell relative mt-16 flex items-end gap-4 pb-8 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0" aria-hidden="true">
        <span className="relative block h-14 w-px overflow-hidden bg-ink/10">
          <span className="scroll-thread absolute inset-0 bg-wine" />
        </span>
        <span className="label text-[0.58rem] text-ink-soft">Scroll</span>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Photo } from "./Photo";
import { getGsap, motionAllowed } from "@/lib/gsap";

const LINES: { text: string; italic?: boolean }[][] = [
  [{ text: "It's" }, { text: "never" }, { text: "just" }, { text: "an" }, { text: "accessory." }],
  [{ text: "It's" }, { text: "the" }, { text: "detail" }, { text: "that" }, { text: "makes" }, { text: "it" }, { text: "yours.", italic: true }],
];

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionAllowed() || !root.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo("[data-float='a']", { yPercent: 25 }, { yPercent: -20, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } });
      gsap.fromTo("[data-float='b']", { yPercent: -10 }, { yPercent: 30, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-y relative overflow-hidden bg-ivory" aria-labelledby="manifesto-title">
      <div className="shell relative">
        <div className="flex items-center gap-4">
          <span className="numeral text-gold">02</span>
          <span className="h-px w-12 bg-ink/25" />
          <p className="label text-ink-soft">The Manifesto</p>
        </div>

        <div className="relative mt-14 lg:mt-20">
          <div data-float="b" className="absolute -top-10 right-0 hidden w-[17vw] max-w-[260px] md:block" aria-hidden="true">
            <div data-reveal="mask">
              <Photo id="p-beads" sizes="17vw" className="aspect-[4/5] w-full" />
            </div>
          </div>

          <h2 id="manifesto-title" data-statement="" className="display max-w-[15ch] text-[length:var(--step-5)] leading-[0.95] text-ink">
            {LINES.map((line, li) => (
              <span key={li} className={li === 1 ? "mt-[0.1em] block pl-[8vw] text-wine" : "block"}>
                {line.map((w, wi) => (
                  <span key={wi} data-word="" className="inline-block pr-[0.22em]">
                    {w.italic ? <em>{w.text}</em> : w.text}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div className="mt-16 grid grid-cols-12 items-end gap-6 lg:mt-24">
            <div data-float="a" className="col-span-7 sm:col-span-5 lg:col-span-3 lg:col-start-2">
              <div data-reveal="mask">
                <Photo id="ed-bride-red" sizes="(min-width:1024px) 22vw, 55vw" className="aspect-[3/4] w-full" position="50% 30%" />
              </div>
              <p className="mt-3 text-[0.65rem] tracking-wide text-ink-soft">Illustrative photography</p>
            </div>
            <div className="col-span-12 sm:col-span-6 sm:col-start-7 lg:col-span-4 lg:col-start-7">
              <p data-reveal="" className="text-pretty text-ink-soft">
                A latkan is the smallest part of an outfit and often the most personal. It finishes a blouse tie, gives a dupatta its
                weight, and moves when you move. We believe those finishing details deserve the same care as the garment itself.
              </p>
              <p data-reveal="" style={{ ["--d" as string]: "0.12s" }} className="label mt-8 text-wine">
                — The Latkan Atelier
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* marquee band */}
      <div className="mt-[var(--section)] border-y border-ink/10 py-5" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center">
              {["Bridal", "Blouse", "Lehenga", "Festive", "Custom", "Details", "Tradition", "Personal style"].map((w) => (
                <span key={w + k} className="display flex items-center whitespace-nowrap px-6 text-[length:var(--step-3)] italic text-ink/80">
                  {w}
                  <span className="ml-12 inline-block h-2 w-2 rotate-45 border border-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

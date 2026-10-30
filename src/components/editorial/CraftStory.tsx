"use client";

import { useEffect, useRef } from "react";
import { Photo } from "./Photo";
import { Lines } from "@/components/animation/Lines";
import { getGsap, motionAllowed } from "@/lib/gsap";

/**
 * Three visually distinct compositions. Copy is careful not to claim
 * handmade production — that is unconfirmed (site.facts.handmade = null).
 */
export function CraftStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motionAllowed() || !root.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const amt = Number(el.dataset.drift) || 10;
        gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ivory" aria-labelledby="craft-title">
      {/* ── I. Designed to Be Noticed: typographic statement with an inline image ── */}
      <div className="shell section-y">
        <div className="flex items-center gap-4">
          <span className="numeral text-gold">06</span>
          <span className="h-px w-12 bg-ink/25" />
          <p id="craft-title" className="label text-ink-soft">
            The Craft Story
          </p>
        </div>
        <h3 className="display mt-14 text-[length:var(--step-5)] leading-[0.92] text-ink">
          <span className="lines block" data-reveal="">
            <span className="line">
              <span style={{ ["--i" as string]: 0 }}>Designed</span>
            </span>
            <span className="line">
              <span style={{ ["--i" as string]: 1 }} className="inline-flex items-center gap-[0.18em]">
                to be
                <span className="relative inline-block h-[0.78em] w-[1.5em] translate-y-[0.06em] overflow-hidden rounded-full align-middle">
                  <Photo id="p-gold-violet" sizes="200px" className="absolute inset-0" />
                </span>
              </span>
            </span>
            <span className="line pl-[10vw]">
              <span style={{ ["--i" as string]: 2 }} className="text-wine">
                <em>noticed.</em>
              </span>
            </span>
          </span>
        </h3>
        <div className="mt-12 grid gap-6 sm:grid-cols-12">
          <p data-reveal="" className="text-pretty text-ink-soft sm:col-span-6 lg:col-span-4 lg:col-start-7">
            A finishing detail should be visible from across a room and still reward a second look up close. Colour is matched to the
            garment, proportion to the drape, and movement to the way the outfit is worn.
          </p>
        </div>
      </div>

      {/* ── II. Made in the Details: full-bleed macro with overlay ── */}
      <div className="relative h-[86svh] min-h-[520px] overflow-hidden bg-ink text-ivory">
        <div data-drift="8" className="absolute -inset-y-[10%] inset-x-0">
          <Photo id="cr-gold-thread" sizes="100vw" className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        <div className="shell relative flex h-full flex-col justify-end pb-[8vh]">
          <p className="label text-gold">II — Material</p>
          <Lines
            className="display mt-5 max-w-3xl text-[length:var(--step-5)] leading-[0.9]"
            lines={[
              "Made in the",
              <>
                <em className="text-rose">details.</em>
              </>,
            ]}
          />
          <p data-reveal="" className="mt-6 max-w-md text-sm text-ivory/80">
            Thread, bead and colour are considered together, so the smallest element still belongs to the whole look.
          </p>
          <p className="mt-10 text-[0.6rem] tracking-wide text-ivory/55">Illustrative photography — not the store&apos;s workshop.</p>
        </div>
      </div>

      {/* ── III. Worn with Meaning: portrait + numbered notes ── */}
      <div className="shell section-y">
        <div className="grid grid-cols-12 items-center gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-6">
            <p className="label text-gold">III — Meaning</p>
            <Lines
              className="display mt-6 text-[length:var(--step-5)] leading-[0.9] text-ink"
              lines={[
                "Worn with",
                <>
                  <em className="text-wine">meaning.</em>
                </>,
              ]}
            />
            <ol className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              {[
                ["A wedding", "The latkan that swings from a bridal dupatta in every photograph."],
                ["A festival", "A flash of colour on a blouse dori, chosen to match the evening."],
                ["A gift", "A small detail that makes someone else's outfit feel personal."],
              ].map(([t, d], i) => (
                <li key={t} data-reveal="" style={{ ["--d" as string]: `${i * 0.08}s` }} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="numeral text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="display text-2xl">{t}</p>
                    <p className="mt-1 text-sm text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative col-span-12 lg:col-span-5 lg:col-start-8">
            <div data-reveal="mask" className="relative">
              <Photo id="ed-doorway" sizes="(min-width:1024px) 38vw, 100vw" className="aspect-[3/4] w-full" position="50% 30%" />
            </div>
            <div data-drift="16" className="absolute -bottom-10 -left-6 w-[42%] border-[6px] border-ivory sm:-left-12">
              <Photo id="cr-embroidery" sizes="20vw" className="aspect-square w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

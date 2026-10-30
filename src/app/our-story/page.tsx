import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/editorial/Photo";
import { Lines } from "@/components/animation/Lines";
import { HangingLatkan } from "@/components/animation/HangingLatkan";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The Latkan Atelier — every detail, a story.",
};

/**
 * Story copy speaks to the brand's point of view only. Founding year,
 * founder names, location and production methods are NOT stated because
 * they are unverified — add them here once confirmed.
 */
export default function StoryPage() {
  return (
    <>
      <PageHeader
        kicker="Our Story"
        lines={[
          "The smallest",
          <>
            part of an outfit.
          </>,
          <>
            <em className="text-wine">The most personal.</em>
          </>,
        ]}
      />

      <section className="relative bg-ivory pb-[var(--section)]">
        <HangingLatkan className="absolute right-[8%] top-0 hidden h-[320px] lg:block" threadLength={170} />
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div data-reveal="mask" className="lg:col-span-7">
            <Photo id="hero-portrait" sizes="(min-width:1024px) 55vw, 100vw" className="aspect-[4/5] w-full lg:aspect-[5/6]" position="50% 25%" credit />
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="label text-gold">The Latkan Atelier</p>
            <p data-reveal="" className="lede mt-6">
              A latkan is where an outfit says its last word — the swing at the end of a blouse tie, the weight at the corner of a
              dupatta.
            </p>
            <p data-reveal="" className="mt-6 text-ink-soft">
              The Latkan Store exists for those finishing details. Our point of view is simple: tradition deserves to be worn with
              personality, and the smallest element of a look can carry the most meaning.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-wine text-ivory">
        <div className="shell">
          <div className="grid gap-px bg-ivory/15 md:grid-cols-3">
            {[
              ["Tradition", "Rooted in the Indian craft vocabulary of latkans, tassels and dori."],
              ["Detail", "Proportion, colour and movement considered together, never as an afterthought."],
              ["Personal style", "Pieces chosen — or composed — to feel unmistakably yours."],
            ].map(([t, d], i) => (
              <div key={t} data-reveal="" style={{ ["--d" as string]: `${i * 0.1}s` }} className="bg-wine p-8 sm:p-12">
                <p className="numeral text-3xl text-gold">0{i + 1}</p>
                <p className="display mt-10 text-[length:var(--step-3)] italic">{t}</p>
                <p className="mt-4 text-sm text-ivory/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-ivory">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <div data-reveal="mask">
              <Photo id="cr-hands" sizes="25vw" className="aspect-[3/4] w-full" />
            </div>
            <div data-reveal="mask" style={{ ["--d" as string]: "0.15s" }} className="mt-16">
              <Photo id="p-bead-box" sizes="25vw" className="aspect-[3/4] w-full" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Lines
              className="display text-[length:var(--step-4)]"
              lines={[
                "Our story is",
                <>
                  <em className="text-wine">still being written.</em>
                </>,
              ]}
            />
            <p data-reveal="" className="mt-6 text-ink-soft">
              The founders&apos; story, the studio and the hands behind each piece will be told here in their own words — with their own
              photographs. Until then, the best way to know us is through the pieces.
            </p>
            <Link href="/collections" data-reveal="" className="btn btn-wine mt-8">
              Explore the Collection <ArrowRight size={15} />
            </Link>
            <p className="mt-6 text-[0.65rem] text-ink-soft">Photography on this page is licensed stock, used for illustration.</p>
          </div>
        </div>
      </section>
    </>
  );
}

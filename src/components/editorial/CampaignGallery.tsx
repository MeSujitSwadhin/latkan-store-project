"use client";

import { useState } from "react";
import type { GalleryItem } from "@/types";
import { Photo } from "./Photo";
import { Lightbox } from "./Lightbox";
import { cx } from "@/lib/format";

const SPAN: Record<GalleryItem["layout"], string> = {
  tall: "lg:col-span-4 lg:row-span-3",
  square: "lg:col-span-4 lg:row-span-2",
  wide: "lg:col-span-8 lg:row-span-2",
  hero: "lg:col-span-12 lg:row-span-3",
};
const MOBILE_W: Record<GalleryItem["layout"], string> = {
  tall: "w-[84%]",
  square: "w-[64%] ml-auto",
  wide: "w-full",
  hero: "w-full",
};
const MOBILE_A: Record<GalleryItem["layout"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  hero: "aspect-[4/5]",
};

export function CampaignGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="flex flex-col gap-8 lg:grid lg:grid-flow-dense lg:grid-cols-12 lg:gap-6 lg:[grid-auto-rows:clamp(120px,13vw,230px)]">
        {items.map((item, i) => (
          <li key={item.image + i} className={cx("relative", MOBILE_W[item.layout], "lg:ml-0 lg:w-auto", SPAN[item.layout])}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block h-full w-full text-left"
              aria-label={`Open image: ${item.caption}`}
              data-cursor="View"
            >
              <div data-reveal="mask" style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }} className={cx(MOBILE_A[item.layout], "w-full lg:aspect-auto lg:h-full")}>
                <Photo
                  id={item.image}
                  sizes={item.layout === "hero" ? "100vw" : item.layout === "wide" ? "66vw" : "(min-width:1024px) 33vw, 84vw"}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                />
              </div>
              <span className="mt-3 flex items-baseline gap-3 text-xs text-ink-soft lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mt-0 lg:translate-y-2 lg:bg-gradient-to-t lg:from-ink/70 lg:to-transparent lg:p-4 lg:pt-10 lg:text-ivory lg:opacity-0 lg:transition lg:duration-700 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                <span className="numeral text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-base italic lg:text-lg">{item.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}

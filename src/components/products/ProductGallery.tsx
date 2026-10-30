"use client";

import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { asset } from "@/lib/assets";
import { Photo } from "@/components/editorial/Photo";
import { Lightbox } from "@/components/editorial/Lightbox";
import { cx } from "@/lib/format";

/**
 * Product photography: a vertical editorial stack on desktop with a hover
 * loupe (detail zoom), a swipeable snap rail on mobile, and a fullscreen
 * lightbox (keyboard + swipe) on every device.
 */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [lb, setLb] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLUListElement>(null);
  const items = images.map((image) => ({ image, caption: `${name} — ${asset(image).description}`, layout: "tall" as const }));

  return (
    <div>
      {/* mobile rail */}
      <div className="lg:hidden">
        <ul
          ref={rail}
          className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget;
            setActive(Math.round(el.scrollLeft / el.clientWidth));
          }}
          aria-label="Product images"
        >
          {images.map((id, i) => (
            <li key={id} className="w-full shrink-0 snap-center">
              <button type="button" className="block w-full" onClick={() => setLb(i)} aria-label={`Open image ${i + 1} fullscreen`}>
                <Photo id={id} priority={i === 0} sizes="100vw" className="aspect-[4/5] w-full" label={i === 0} />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
          {images.map((id, i) => (
            <span key={id} className={cx("h-px transition-all duration-500", i === active ? "w-10 bg-wine" : "w-4 bg-ink/25")} />
          ))}
        </div>
      </div>

      {/* desktop stack with loupe */}
      <ul className="hidden gap-4 lg:grid">
        {images.map((id, i) => (
          <li key={id}>
            <Loupe id={id} priority={i === 0} label={i === 0} onOpen={() => setLb(i)} tall={i === 0} />
          </li>
        ))}
      </ul>

      <Lightbox items={items} index={lb} onChange={setLb} onClose={() => setLb(null)} />
    </div>
  );
}

function Loupe({ id, priority, label, onOpen, tall }: { id: string; priority?: boolean; label?: boolean; onOpen: () => void; tall?: boolean }) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setOrigin(`${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      }}
      onPointerEnter={() => setZoom(true)}
      onPointerLeave={() => setZoom(false)}
      className="group relative block w-full cursor-zoom-in overflow-hidden"
      aria-label="Open image fullscreen"
    >
      <div
        className="transition-transform duration-500 ease-out"
        style={{ transformOrigin: origin, transform: zoom ? "scale(1.9)" : "scale(1)" }}
      >
        <Photo id={id} priority={priority} sizes="(min-width:1024px) 55vw, 100vw" className={tall ? "aspect-[4/5] w-full" : "aspect-square w-full"} />
      </div>
      {label && <span className="absolute left-3 top-3 bg-ivory/85 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">Illustrative image</span>}
      <span className="label absolute bottom-4 right-4 flex items-center gap-2 bg-ivory/90 px-3 py-2 text-[0.58rem] opacity-0 transition-opacity group-hover:opacity-100">
        <ZoomIn size={13} /> Detail
      </span>
    </button>
  );
}

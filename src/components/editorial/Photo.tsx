"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset, hasLocalFile } from "@/lib/assets";
import { cx } from "@/lib/format";

/**
 * Every photograph goes through this component:
 *  - resolves the asset manifest entry (alt text, credit, licence status)
 *  - never pretends: stock imagery can carry an "Illustrative" marker
 *  - if the file is missing, renders a deliberate, labelled placeholder
 *    instead of a broken image.
 */
export function Photo({
  id,
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
  label,
  credit = false,
  position = "center",
  alt,
}: {
  id: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Show the "illustrative" chip when the image is stock imagery. */
  label?: boolean;
  credit?: boolean;
  position?: string;
  alt?: string;
}) {
  const a = asset(id);
  // Source cascade → labelled placeholder. Local optimized files (registered by
  // `npm run images` in src/data/local-images.json) come first; otherwise the
  // licensed Unsplash CDN original is used, so nothing 404s while files are missing.
  const remote = a.remote ? `${a.remote}?auto=format&fit=max&w=2400&q=80` : "";
  const sources = (hasLocalFile(a.id) || !remote ? [a.path, remote] : [remote, a.path]).filter(Boolean);
  const [stage, setStage] = useState(0);
  const failed = stage >= sources.length;
  // Advance only from the stage that actually failed (onError and the hydration check can both fire).
  const advance = (from: number) => setStage((s) => (s === from ? s + 1 : s));
  const illustrative = a.status === "stock-illustrative";
  const wrap = useRef<HTMLDivElement>(null);

  // An SSR'd <img> can error before hydration attaches onError — check after each source change.
  useEffect(() => {
    const img = wrap.current?.querySelector("img");
    if (img && img.complete && img.naturalWidth === 0) advance(stage);
  }, [stage]);

  return (
    <div ref={wrap} className={cx(/\babsolute\b/.test(className ?? "") ? "" : "relative", "overflow-hidden bg-ivory-deep", className)}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,#ece4d6_0_14px,#e6dccb_14px_15px)] p-4 text-center text-ink-soft">
          <div>
            <p className="label text-[0.6rem] text-wine">Image pending</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg italic leading-tight">{a.description}</p>
            <p className="mt-2 text-[0.65rem] opacity-70">Check your connection, run “npm run images”, or add a brand photo</p>
          </div>
        </div>
      ) : (
        <Image
          key={sources[stage]}
          src={sources[stage]}
          alt={alt ?? a.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cx("object-cover", imgClassName)}
          style={{ objectPosition: position }}
          onError={() => advance(stage)}
        />
      )}
      {label && illustrative && !failed && (
        <span className="absolute left-3 top-3 z-[2] bg-ivory/85 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink-soft backdrop-blur-sm">
          Illustrative image
        </span>
      )}
      {credit && !failed && a.photographer && (
        <span className="absolute bottom-2 right-3 z-[2] text-[0.6rem] tracking-wide text-ivory/80 mix-blend-difference">
          Photo: {a.photographer} / Unsplash
        </span>
      )}
    </div>
  );
}

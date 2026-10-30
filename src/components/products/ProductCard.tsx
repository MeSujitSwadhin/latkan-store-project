"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye } from "lucide-react";
import type { Product } from "@/types";
import { getCollection } from "@/data/collections";
import { Photo } from "@/components/editorial/Photo";
import { formatPrice, cx } from "@/lib/format";
import { WishlistButton } from "./WishlistButton";
import { QuickView } from "./QuickView";

export function ProductCard({
  product,
  index,
  aspect = "aspect-[4/5]",
  sizes = "(min-width:1024px) 30vw, (min-width:640px) 45vw, 86vw",
  className,
}: {
  product: Product;
  index?: number;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const [quick, setQuick] = useState(false);
  const collection = getCollection(product.collection);
  const [main, alt] = product.images;

  return (
    <article className={cx("product-card group relative", className)} data-reveal="">
      <div className={cx("product-media relative overflow-hidden bg-blush", aspect)}>
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-[1]" aria-label={`View ${product.name}`} data-cursor="View" tabIndex={-1} />
        <Photo id={main} sizes={sizes} className="absolute inset-0" imgClassName="main-img" />
        {alt && <Photo id={alt} sizes={sizes} className="alt-img absolute inset-0 !bg-transparent" />}

        <div className="pointer-events-none absolute inset-x-3 top-3 z-[2] flex items-start justify-between">
          {product.status === "sample" ? (
            <span className="bg-ivory/90 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-wine backdrop-blur-sm">
              Sample listing
            </span>
          ) : (
            <span />
          )}
        </div>
        <WishlistButton slug={product.slug} name={product.name} className="absolute right-3 top-3 z-[3]" />

        <div className="card-actions absolute inset-x-3 bottom-3 z-[3] flex gap-2">
          <button
            type="button"
            onClick={() => setQuick(true)}
            className="label flex min-h-11 flex-1 items-center justify-center gap-2 bg-ivory/92 text-[0.6rem] text-ink backdrop-blur-sm transition-colors hover:bg-ivory"
          >
            <Eye size={14} strokeWidth={1.4} /> Quick view
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="label text-[0.58rem] text-ink-soft">
            {index !== undefined && <span className="numeral mr-2 text-[0.75rem] normal-case tracking-normal text-gold">{String(index + 1).padStart(2, "0")}</span>}
            {collection?.name}
          </p>
          <h3 className="display mt-2 text-[length:var(--step-2)] leading-none">
            <Link href={`/products/${product.slug}`} className="link-thread">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{product.shortDescription}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/10 pt-3">
        <p className={cx("text-sm", product.price === null && "italic text-ink-soft")}>{formatPrice(product.price)}</p>
        <div className="flex -space-x-1" aria-label={`${product.colours.length} colour options`}>
          {product.colours.map((c) => (
            <span key={c.id} title={c.label} className="h-3.5 w-3.5 rounded-full border border-ivory" style={{ background: c.swatch }} />
          ))}
        </div>
      </div>

      <QuickView product={product} open={quick} onClose={() => setQuick(false)} />
    </article>
  );
}

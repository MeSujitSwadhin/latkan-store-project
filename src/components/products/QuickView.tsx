"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { getCollection } from "@/data/collections";
import { Modal } from "@/components/layout/Modal";
import { Photo } from "@/components/editorial/Photo";
import { cx } from "@/lib/format";
import { ProductPurchase } from "./ProductPurchase";

export function QuickView({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const c = getCollection(product.collection);

  return (
    <Modal
      open={open}
      onClose={onClose}
      label={`Quick view: ${product.name}`}
      className="inset-x-0 bottom-0 max-h-[92svh] overflow-y-auto md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[88vh] md:w-[min(1080px,92vw)] md:-translate-x-1/2 md:-translate-y-1/2"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative">
          <Photo id={product.images[active]} sizes="(min-width:768px) 540px, 100vw" className="aspect-[4/5] w-full" label />
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-2">
              {product.images.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={active === i}
                  className={cx("h-14 w-11 overflow-hidden border-2 transition", active === i ? "border-ivory" : "border-transparent opacity-70")}
                >
                  <Photo id={id} sizes="44px" className="h-full w-full" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 sm:p-10">
          <p className="label text-[0.6rem] text-ink-soft">{c?.name}</p>
          <h2 className="display mt-3 text-[length:var(--step-3)] leading-none">{product.name}</h2>
          <p className="mt-4 text-sm text-ink-soft">{product.shortDescription}</p>
          {product.status === "sample" && (
            <p className="mt-4 border-l-2 border-gold pl-3 text-xs text-ink-soft">
              Sample listing — illustrative image; details pending confirmation.
            </p>
          )}
          <div className="mt-8">
            <ProductPurchase product={product} compact />
          </div>
          <Link href={`/products/${product.slug}`} className="label link-thread mt-8 inline-flex items-center gap-2 text-[0.62rem] text-wine">
            Full details <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </Modal>
  );
}

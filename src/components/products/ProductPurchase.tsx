"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Minus, Plus, MessageCircle } from "lucide-react";
import type { Product } from "@/types";
import { features, site } from "@/data/site";
import { formatPrice, cx } from "@/lib/format";
import { useBag } from "@/lib/store";
import { productEnquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { WishlistButton } from "./WishlistButton";

const AVAIL: Record<Product["availability"], string> = {
  "in-stock": "In stock",
  "made-to-order": "Made to order",
  unknown: "Availability on enquiry",
};

export function ProductPurchase({ product, compact = false }: { product: Product; compact?: boolean }) {
  const [colour, setColour] = useState(product.colours[0]?.id);
  const [size, setSize] = useState(product.sizes[0]?.id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const bag = useBag();

  const colourLabel = product.colours.find((c) => c.id === colour)?.label;
  const sizeLabel = product.sizes.find((s) => s.id === size)?.label;
  const url = `${site.url}/products/${product.slug}`;
  const wa = whatsappLink(productEnquiryMessage({ name: product.name, colour: colourLabel, size: sizeLabel, quantity: qty, url }));
  const checkout = features.cart;

  const add = () => {
    bag.add({ slug: product.slug, colour: colourLabel, size: sizeLabel, quantity: qty });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-5">
        <p className={cx("display", product.price === null ? "text-[length:var(--step-1)] italic text-ink-soft" : "text-[length:var(--step-2)] text-ink")}>
          {formatPrice(product.price)}
        </p>
        <p className="label flex items-center gap-2 text-[0.6rem] text-ink-soft">
          <span className={cx("h-1.5 w-1.5 rounded-full", product.availability === "in-stock" ? "bg-emerald-700" : "bg-gold")} />
          {AVAIL[product.availability]}
        </p>
      </div>

      {product.colours.length > 0 && (
        <fieldset>
          <legend className="label text-[0.62rem] text-ink-soft">
            Colour <span className="ml-2 normal-case tracking-normal text-ink">{colourLabel}</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {product.colours.map((c) => (
              <label key={c.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  name={`colour-${product.slug}${compact ? "-q" : ""}`}
                  value={c.id}
                  checked={colour === c.id}
                  onChange={() => setColour(c.id)}
                  className="peer sr-only"
                />
                <span
                  className="block h-10 w-10 rounded-full border border-ink/15 ring-offset-2 ring-offset-ivory transition peer-checked:ring-1 peer-checked:ring-wine peer-focus-visible:ring-2 peer-focus-visible:ring-gold"
                  style={{ background: c.swatch }}
                  title={c.label}
                />
                <span className="sr-only">{c.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {product.sizes.length > 0 && (
        <fieldset>
          <legend className="label text-[0.62rem] text-ink-soft">Option</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <label key={s.id} className="cursor-pointer">
                <input
                  type="radio"
                  name={`size-${product.slug}${compact ? "-q" : ""}`}
                  value={s.id}
                  checked={size === s.id}
                  onChange={() => setSize(s.id)}
                  className="peer sr-only"
                />
                <span className="block min-h-11 border border-ink/20 px-5 py-3 text-xs tracking-wide transition peer-checked:border-wine peer-checked:bg-wine peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-gold">
                  {s.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center border border-ink/20" role="group" aria-label="Quantity">
          <button type="button" className="grid h-12 w-12 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <output className="w-8 text-center text-sm" aria-live="polite">
            {qty}
          </output>
          <button type="button" className="grid h-12 w-12 place-items-center" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">
            <Plus size={14} />
          </button>
        </div>
        <WishlistButton slug={product.slug} name={product.name} className="border border-ink/20 !h-12 !w-12 !rounded-none !bg-transparent" />
      </div>

      <div className="grid gap-3">
        {checkout ? (
          <button type="button" className="btn btn-wine w-full" onClick={add}>
            {added ? <><Check size={15} /> Added to bag</> : "Add to bag"}
          </button>
        ) : (
          <>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wine w-full">
                <MessageCircle size={16} strokeWidth={1.4} /> Enquire on WhatsApp
              </a>
            )}
            <button type="button" className={cx("btn w-full", wa ? "btn-line text-ink" : "btn-wine")} onClick={add}>
              {added ? <><Check size={15} /> Added to enquiry list</> : "Add to enquiry list"}
            </button>
          </>
        )}
        <p className="text-xs leading-relaxed text-ink-soft" aria-live="polite">
          {checkout
            ? "Secure checkout is handled by our payment provider."
            : wa
              ? "Enquiries open a WhatsApp chat with the store — nothing is charged online."
              : (
                <>
                  Online enquiries open once the store&apos;s WhatsApp number is confirmed. Meanwhile, message us on{" "}
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    Instagram
                  </a>
                  .{added && <> Your list is saved in <Link href="/cart" className="underline underline-offset-4">Enquiry list</Link>.</>}
                </>
              )}
        </p>
      </div>
    </div>
  );
}

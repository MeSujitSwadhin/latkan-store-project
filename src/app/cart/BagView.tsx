"use client";

import Link from "next/link";
import { Minus, Plus, X, MessageCircle, ArrowUpRight } from "lucide-react";
import { getProduct } from "@/data/products";
import { features, site } from "@/data/site";
import { useBag } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import { Photo } from "@/components/editorial/Photo";

export function BagView() {
  const bag = useBag();
  const rows = bag.items.map((i) => ({ ...i, product: getProduct(i.slug) })).filter((r) => r.product);
  const message = [
    "Hello The Latkan Store, I'd like to enquire about these pieces:",
    ...rows.map((r) => `• ${r.product!.name}${r.colour ? ` — ${r.colour}` : ""}${r.size ? `, ${r.size}` : ""} × ${r.quantity}`),
  ].join("\n");
  const wa = whatsappLink(message);
  const knownTotal = rows.every((r) => r.product!.price !== null)
    ? rows.reduce((n, r) => n + (r.product!.price ?? 0) * r.quantity, 0)
    : null;

  if (!rows.length)
    return (
      <div className="grid min-h-[40vh] place-items-center border border-dashed border-ink/20 p-10 text-center">
        <div>
          <p className="display text-4xl italic">Nothing here yet.</p>
          <p className="mt-3 text-sm text-ink-soft">Add pieces from any product page to build your list.</p>
          <Link href="/collections" className="btn btn-wine mt-8">
            Explore the Collection
          </Link>
        </div>
      </div>
    );

  return (
    <div className="grid gap-14 lg:grid-cols-12">
      <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
        {rows.map((r) => (
          <li key={r.key} className="grid grid-cols-[88px_1fr] gap-5 py-6 sm:grid-cols-[120px_1fr_auto]">
            <Link href={`/products/${r.slug}`}>
              <Photo id={r.product!.images[0]} sizes="120px" className="aspect-[4/5] w-full" />
            </Link>
            <div>
              <Link href={`/products/${r.slug}`} className="display text-2xl link-thread">
                {r.product!.name}
              </Link>
              <p className="mt-1 text-xs text-ink-soft">{[r.colour, r.size].filter(Boolean).join(" · ")}</p>
              <p className="mt-2 text-sm italic text-ink-soft">{formatPrice(r.product!.price)}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center border border-ink/20" role="group" aria-label={`Quantity of ${r.product!.name}`}>
                  <button type="button" className="grid h-10 w-10 place-items-center" onClick={() => bag.update(r.key, r.quantity - 1)} aria-label="Decrease quantity">
                    <Minus size={13} />
                  </button>
                  <output className="w-7 text-center text-sm">{r.quantity}</output>
                  <button type="button" className="grid h-10 w-10 place-items-center" onClick={() => bag.update(r.key, r.quantity + 1)} aria-label="Increase quantity">
                    <Plus size={13} />
                  </button>
                </div>
                <button type="button" onClick={() => bag.remove(r.key)} className="label flex min-h-10 items-center gap-1 text-[0.58rem] text-ink-soft hover:text-wine sm:hidden">
                  <X size={12} /> Remove
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => bag.remove(r.key)}
              className="hidden h-10 w-10 place-items-center self-start text-ink-soft hover:text-wine sm:grid"
              aria-label={`Remove ${r.product!.name}`}
            >
              <X size={16} strokeWidth={1.3} />
            </button>
          </li>
        ))}
      </ul>

      <aside className="lg:col-span-4">
        <div className="sticky top-[calc(var(--header-h)+2rem)] bg-blush/60 p-6 sm:p-8">
          <p className="label text-[0.62rem] text-ink-soft">Summary</p>
          <div className="mt-6 flex items-baseline justify-between border-b border-ink/10 pb-4">
            <span className="text-sm">{bag.count} {bag.count === 1 ? "piece" : "pieces"}</span>
            <span className="display text-2xl">{knownTotal === null ? <em className="text-xl text-ink-soft">Price on request</em> : formatPrice(knownTotal)}</span>
          </div>

          {features.cart ? (
            <p className="mt-6 text-sm text-ink-soft">Secure checkout is provided by the configured payment provider.</p>
          ) : (
            <>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wine mt-6 w-full">
                  <MessageCircle size={16} strokeWidth={1.4} /> Send list on WhatsApp
                </a>
              ) : (
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-wine mt-6 w-full">
                  Ask on Instagram <ArrowUpRight size={14} />
                </a>
              )}
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                This is an enquiry list, not a checkout. No order is placed and nothing is charged online — the store confirms
                availability and pricing personally.
                {!wa && " WhatsApp enquiries open once the store's number is configured."}
              </p>
            </>
          )}
          <button type="button" onClick={bag.clear} className="label mt-6 text-[0.58rem] text-ink-soft underline underline-offset-4 hover:text-wine">
            Clear list
          </button>
        </div>
      </aside>
    </div>
  );
}

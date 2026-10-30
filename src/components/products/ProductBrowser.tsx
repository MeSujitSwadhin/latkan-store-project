"use client";

import { useMemo, useState } from "react";
import type { Collection, Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { cx } from "@/lib/format";

/** Filterable catalogue grid used on /collections. Chips are real buttons (keyboard + touch). */
export function ProductBrowser({ products, collections }: { products: Product[]; collections: Collection[] }) {
  const [filter, setFilter] = useState<string>("all");
  const list = useMemo(() => (filter === "all" ? products : products.filter((p) => p.collection === filter)), [filter, products]);
  const chips = [{ slug: "all", name: "All pieces" }, ...collections.filter((c) => products.some((p) => p.collection === c.slug))];

  return (
    <div>
      <div className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2" role="group" aria-label="Filter by collection">
        {chips.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFilter(c.slug)}
            aria-pressed={filter === c.slug}
            className={cx(
              "min-h-11 shrink-0 border px-5 text-xs tracking-wide transition-colors duration-500",
              filter === c.slug ? "border-wine bg-wine text-ivory" : "border-ink/20 hover:border-ink/50",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink-soft" aria-live="polite">
        {list.length} {list.length === 1 ? "piece" : "pieces"} · sample listings
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-16 xs:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
        {list.map((p, i) => (
          <li key={p.slug} className={cx(i % 3 === 1 && "lg:mt-16")}>
            <ProductCard product={p} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}

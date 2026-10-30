"use client";

import Link from "next/link";
import { getProduct } from "@/data/products";
import { useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/products/ProductCard";

export function WishlistView() {
  const { items } = useWishlist();
  const list = items.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p);

  if (!list.length)
    return (
      <div className="grid min-h-[40vh] place-items-center border border-dashed border-ink/20 p-10 text-center">
        <div>
          <p className="display text-4xl italic">No saved pieces yet.</p>
          <p className="mt-3 text-sm text-ink-soft">Tap the heart on any piece to keep it here.</p>
          <Link href="/collections" className="btn btn-wine mt-8">
            Explore the Collection
          </Link>
        </div>
      </div>
    );

  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-16 xs:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} index={i} />
        </li>
      ))}
    </ul>
  );
}

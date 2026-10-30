import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProducts } from "@/data/products";
import { features } from "@/data/site";
import { Lines } from "@/components/animation/Lines";
import { ProductCard } from "./ProductCard";
import { cx } from "@/lib/format";

/** Desktop placement map — an editorial rhythm rather than a uniform grid. */
const PLACE = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-3 lg:col-start-7 lg:mt-24",
  "lg:col-span-3 lg:col-start-10",
  "lg:col-span-3 lg:col-start-7 lg:-mt-8",
  "lg:col-span-3 lg:col-start-10 lg:mt-20",
];

export function EditedSelection() {
  if (!features.catalogue) return null;
  const items = featuredProducts().slice(0, 5);

  return (
    <section className="section-y relative bg-blush" aria-labelledby="selection-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="numeral text-gold">04</span>
              <span className="h-px w-12 bg-ink/25" />
              <p className="label text-ink-soft">The Edited Selection</p>
            </div>
            <Lines
              id="selection-title"
              className="display mt-8 text-[length:var(--step-4)] text-ink"
              lines={[
                <>
                  Chosen for the way
                </>,
                <>
                  they <em className="text-wine">move.</em>
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-4">
            <p data-reveal="" className="text-sm text-ink-soft">
              A sample edit that shows how the catalogue will feel. Listings, prices and materials will be replaced with The Latkan
              Store&apos;s confirmed range.
            </p>
            <Link href="/collections" data-reveal="" className="label link-thread mt-6 inline-flex items-center gap-2 text-wine">
              Shop all <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Mobile/tablet: swipe rail. Desktop: art-directed grid. */}
        <div className="-mx-[var(--gutter)] mt-14 lg:mx-0 lg:mt-20">
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 lg:overflow-visible lg:px-0">
            {items.map((p, i) => (
              <li key={p.slug} className={cx("w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto", PLACE[i])}>
                <ProductCard
                  product={p}
                  index={i}
                  aspect={i === 0 ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[4/5]"}
                  sizes={i === 0 ? "(min-width:1024px) 40vw, 78vw" : "(min-width:1024px) 24vw, 78vw"}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

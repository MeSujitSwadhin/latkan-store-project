import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { features } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/editorial/Photo";
import { ProductBrowser } from "@/components/products/ProductBrowser";

export const metadata: Metadata = {
  title: "Collections",
  description: "Latkans, tassels and finishing details, composed in chapters.",
};

export default function CollectionsPage() {
  const list = collections.filter((c) => c.slug !== "custom-creations" || features.customOrders);
  return (
    <>
      <PageHeader
        kicker="The Collections"
        lines={[
          "Every detail,",
          <>
            <em className="text-wine">a chapter.</em>
          </>,
        ]}
        intro={
          <p>
            Collections shown here are proposed for review. They will be replaced by The Latkan Store&apos;s confirmed categories.
          </p>
        }
      />

      <section aria-label="Collection index" className="bg-ivory pb-[var(--section)]">
        <div className="shell">
          <ol className="border-t border-ink/10">
            {list.map((c) => (
              <li key={c.slug} className="border-b border-ink/10">
                <Link
                  href={`/collections/${c.slug}`}
                  className="collection-tile group grid grid-cols-12 items-center gap-4 py-8 lg:py-10"
                  data-cursor="Explore"
                >
                  <span className="numeral col-span-2 text-lg text-gold sm:col-span-1">{c.number}</span>
                  <h2 className="tile-title display col-span-10 text-[clamp(2.2rem,6vw,5.4rem)] leading-none sm:col-span-5">
                    {c.name}
                  </h2>
                  <p className="col-span-12 text-sm text-ink-soft sm:col-span-3">{c.tagline}</p>
                  <div
                    className="relative col-span-12 aspect-[16/9] overflow-hidden sm:col-span-2 sm:aspect-[3/4]"
                  >
                    <div className="tile-img absolute inset-0">
                      <Photo id={c.image} sizes="(min-width:640px) 16vw, 100vw" className="h-full w-full" />
                    </div>
                  </div>
                  <ArrowUpRight className="tile-explore hidden justify-self-end sm:col-span-1 sm:block" size={22} strokeWidth={1} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {features.catalogue && (
        <section className="section-y bg-blush" aria-labelledby="all-pieces">
          <div className="shell">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 id="all-pieces" className="display text-[length:var(--step-4)]">
                All <em className="text-wine">pieces</em>
              </h2>
              <p className="max-w-xs text-right text-xs text-ink-soft">Sample listings with illustrative photography.</p>
            </div>
            <ProductBrowser products={products} collections={list} />
          </div>
        </section>
      )}
    </>
  );
}

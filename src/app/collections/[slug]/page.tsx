import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { collections, getCollection } from "@/data/collections";
import { productsIn } from "@/data/products";
import { features } from "@/data/site";
import { Photo } from "@/components/editorial/Photo";
import { Lines } from "@/components/animation/Lines";
import { ProductCard } from "@/components/products/ProductCard";
import { CollectionTile } from "@/components/collections/CollectionTile";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.filter((c) => c.slug !== "custom-creations" || features.customOrders).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCollection((await params).slug);
  return c ? { title: c.name, description: c.tagline } : {};
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c || (slug === "custom-creations" && !features.customOrders)) notFound();

  const items = features.catalogue ? productsIn(c.slug) : [];
  const visible = collections.filter((x) => x.slug !== "custom-creations" || features.customOrders);
  const idx = visible.findIndex((x) => x.slug === c.slug);
  const next = visible[(idx + 1) % visible.length];
  const rest = c.name.replace(c.italic, "").trim();

  return (
    <>
      <section className="relative isolate min-h-[92svh] overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0 -z-10">
          <Photo id={c.image} priority sizes="100vw" className="h-full w-full" position="50% 30%" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        </div>
        <div className="shell flex min-h-[92svh] flex-col justify-end pb-16 pt-[calc(var(--header-h)+3rem)]">
          <Link href="/collections" className="label mb-auto inline-flex items-center gap-2 self-start text-[0.62rem] text-ivory/75 hover:text-ivory">
            <ArrowLeft size={14} /> All collections
          </Link>
          <p className="numeral text-2xl text-gold">{c.number}</p>
          <Lines
            as="h1"
            className="display mt-4 text-[length:var(--step-6)] leading-[0.84]"
            lines={c.name.startsWith(c.italic) ? [<em key="i">{c.italic}</em>, rest] : [rest, <em key="i">{c.italic}</em>]}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <p data-reveal="" className="lede text-ivory/85 lg:col-span-5">
              {c.tagline}
            </p>
            <p data-reveal="" className="text-sm text-ivory/70 lg:col-span-4 lg:col-start-8">
              {c.description}
            </p>
          </div>
          {c.status !== "verified" && (
            <p className="mt-8 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50">Proposed collection · illustrative photography</p>
          )}
        </div>
      </section>

      <section className="section-y bg-ivory" aria-labelledby="pieces">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <h2 id="pieces" className="display text-[length:var(--step-3)]">
                  The <em className="text-wine">pieces</em>
                </h2>
                <p className="mt-4 text-sm text-ink-soft">
                  {items.length ? `${items.length} sample ${items.length === 1 ? "listing" : "listings"}.` : "Pieces will appear here once confirmed."}
                </p>
                <div data-reveal="mask" className="mt-8 hidden lg:block">
                  <Photo id={c.detailImage} sizes="22vw" className="aspect-[3/4] w-full" />
                </div>
              </div>
            </aside>
            <div className="lg:col-span-9">
              {items.length ? (
                <ul className="grid grid-cols-1 gap-x-8 gap-y-16 xs:grid-cols-2">
                  {items.map((p, i) => (
                    <li key={p.slug} className={i % 2 ? "xs:mt-20" : ""}>
                      <ProductCard product={p} index={i} sizes="(min-width:1024px) 34vw, (min-width:400px) 48vw, 100vw" />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid min-h-[40vh] place-items-center border border-dashed border-ink/20 p-10 text-center">
                  <div>
                    <p className="display text-3xl italic">Coming soon</p>
                    <p className="mt-3 text-sm text-ink-soft">This chapter is awaiting the store&apos;s confirmed pieces.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {next && next.slug !== c.slug && (
        <section className="bg-ink pb-[var(--section)] pt-16 text-ivory" aria-label="Next collection">
          <div className="shell">
            <p className="label mb-8 flex items-center gap-3 text-gold">
              Next chapter <ArrowRight size={14} />
            </p>
            <CollectionTile c={next} aspect="aspect-[4/5] sm:aspect-[21/9]" sizes="100vw" />
          </div>
        </section>
      )}
    </>
  );
}

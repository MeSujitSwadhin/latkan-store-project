import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollection } from "@/data/collections";
import { getProduct, products, relatedProducts } from "@/data/products";
import { features, site } from "@/data/site";
import { asset } from "@/lib/assets";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchase } from "@/components/products/ProductPurchase";
import { ProductCard } from "@/components/products/ProductCard";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return features.catalogue ? products.map((p) => ({ slug: p.slug })) : [];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.shortDescription,
    openGraph: { images: [{ url: asset(p.images[0]).path }] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p || (p.status === "sample" && !features.catalogue)) notFound();
  const c = getCollection(p.collection);
  const related = relatedProducts(p);

  const details: [string, ReactNode][] = [
    ["Description", <p key="d">{p.description}</p>],
    ["Materials", <p key="m">{p.materials ?? "To be confirmed by The Latkan Store."}</p>],
    [
      "Shipping & returns",
      <p key="s">
        {site.facts.shippingPolicy ?? "Shipping and return terms will be published once confirmed."}{" "}
        <Link href="/shipping-returns" className="underline underline-offset-4">
          Read more
        </Link>
      </p>,
    ],
    [
      "About this listing",
      <p key="a">
        {p.status === "sample"
          ? "This is a sample listing used to preview the store. Photography is licensed stock used for illustration, not a photograph of this piece."
          : "Product details confirmed by The Latkan Store."}
      </p>,
    ],
  ];

  return (
    <>
      <div className="bg-ivory pt-[calc(var(--header-h)+1.5rem)]">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="text-[0.7rem] tracking-wide text-ink-soft">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/collections" className="link-thread">Collections</Link>
              </li>
              <li aria-hidden="true">/</li>
              {c && (
                <>
                  <li>
                    <Link href={`/collections/${c.slug}`} className="link-thread">{c.name}</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                </>
              )}
              <li aria-current="page" className="text-ink">{p.name}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 pb-[var(--section)] lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery images={p.images} name={p.name} />
            </div>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <p className="label text-[0.62rem] text-gold">{c?.name}</p>
                <h1 className="display mt-4 text-[length:var(--step-4)] leading-[0.92]">{p.name}</h1>
                <p className="lede mt-5 text-ink-soft">{p.shortDescription}</p>
                {p.status === "sample" && (
                  <p className="mt-6 border-l-2 border-gold bg-blush/60 px-4 py-3 text-xs leading-relaxed text-ink">
                    <strong className="font-semibold">Sample listing.</strong> Illustrative photography; price, materials and
                    availability await confirmation from the store.
                  </p>
                )}
                <div className="mt-10">
                  <ProductPurchase product={p} />
                </div>
                <div className="mt-12 border-t border-ink/10">
                  {details.map(([title, body], i) => (
                    <details key={title} className="group border-b border-ink/10" open={i === 0}>
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                        <span className="label text-[0.66rem]">{title}</span>
                        <span className="relative h-3 w-3" aria-hidden="true">
                          <span className="absolute left-0 top-1/2 h-px w-3 bg-ink" />
                          <span className="absolute left-1/2 top-0 h-3 w-px bg-ink transition-transform duration-500 group-open:scale-y-0" />
                        </span>
                      </summary>
                      <div className="pb-6 text-sm leading-relaxed text-ink-soft">{body}</div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section-y bg-blush" aria-labelledby="related">
          <div className="shell">
            <h2 id="related" className="display text-[length:var(--step-4)]">
              You may also <em className="text-wine">love</em>
            </h2>
            <ul className="no-scrollbar -mx-[var(--gutter)] mt-12 flex snap-x gap-6 overflow-x-auto px-[var(--gutter)] md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0">
              {related.map((r, i) => (
                <li key={r.slug} className="w-[78vw] shrink-0 snap-start md:w-auto">
                  <ProductCard product={r} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

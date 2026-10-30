import Link from "next/link";
import { collections } from "@/data/collections";
import { features } from "@/data/site";
import { Lines } from "@/components/animation/Lines";
import { CollectionTile } from "./CollectionTile";

export function CollectionIndex() {
  const list = collections.filter((c) => c.slug !== "custom-creations" || features.customOrders);
  const [a, b, c, d, e] = list;

  return (
    <section className="section-y relative bg-ink text-ivory" aria-labelledby="collections-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="numeral text-gold">03</span>
              <span className="h-px w-12 bg-ivory/25" />
              <p className="label text-ivory/60">Shop by Collection</p>
            </div>
            <Lines
              id="collections-title"
              className="display mt-8 text-[length:var(--step-5)]"
              lines={[
                "Composed",
                <>
                  <em className="text-rose">in chapters.</em>
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-reveal="" className="text-pretty text-ivory/70">
              Five proposed chapters, each written around a moment — the bride, the blouse, the lehenga, the festival and the
              piece made just for you. Final collections will follow the store&apos;s confirmed range.
            </p>
            <Link href="/collections" data-reveal="" className="label link-thread mt-6 inline-block text-gold">
              View all collections
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-12 sm:gap-x-6 lg:mt-24 lg:gap-x-8">
          {a && <CollectionTile c={a} className="sm:col-span-7" aspect="aspect-[4/5] lg:aspect-[5/6]" sizes="(min-width:640px) 58vw, 100vw" />}
          {b && (
            <CollectionTile
              c={b}
              className="sm:col-span-5 sm:mt-[30%]"
              aspect="aspect-[3/4]"
              sizes="(min-width:640px) 42vw, 100vw"
              delay={0.1}
            />
          )}
          {c && (
            <CollectionTile
              c={c}
              className="sm:col-span-5 lg:col-span-4 lg:col-start-2 lg:-mt-[12%]"
              aspect="aspect-[3/4]"
              sizes="(min-width:640px) 40vw, 100vw"
            />
          )}
          {d && (
            <CollectionTile
              c={d}
              className="sm:col-span-7 lg:col-span-6 lg:col-start-7"
              aspect="aspect-[4/5]"
              sizes="(min-width:640px) 55vw, 100vw"
              delay={0.1}
            />
          )}
          {e && (
            <CollectionTile
              c={e}
              className="sm:col-span-12"
              aspect="aspect-[4/5] sm:aspect-[21/9]"
              sizes="100vw"
            />
          )}
        </div>
      </div>
    </section>
  );
}

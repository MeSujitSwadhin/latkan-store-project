import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/types";
import { Photo } from "@/components/editorial/Photo";
import { cx } from "@/lib/format";

function Title({ c }: { c: Collection }) {
  const rest = c.name.replace(c.italic, "").trim();
  const italicFirst = c.name.startsWith(c.italic);
  return italicFirst ? (
    <>
      <em>{c.italic}</em> {rest}
    </>
  ) : (
    <>
      {rest} <em>{c.italic}</em>
    </>
  );
}

export function CollectionTile({
  c,
  className,
  aspect = "aspect-[4/5]",
  sizes = "(min-width:1024px) 50vw, 100vw",
  delay = 0,
}: {
  c: Collection;
  className?: string;
  aspect?: string;
  sizes?: string;
  delay?: number;
}) {
  return (
    <Link
      href={`/collections/${c.slug}`}
      className={cx("collection-tile group relative block text-ivory", className)}
      data-cursor="Explore"
      data-reveal=""
      style={{ ["--d" as string]: `${delay}s` }}
    >
      <div className={cx("relative overflow-hidden", aspect)}>
        <div className="tile-img absolute inset-0">
          <Photo id={c.image} sizes={sizes} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
        {c.status !== "verified" && (
          <span className="absolute right-3 top-3 border border-ivory/40 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ivory/85">
            Proposed
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <span className="numeral text-sm text-gold">{c.number}</span>
          <h3 className="tile-title display mt-2 text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[0.92]">
            <Title c={c} />
          </h3>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="max-w-xs text-sm text-ivory/80">{c.tagline}</p>
            <span className="tile-explore label flex shrink-0 items-center gap-2 text-[0.62rem] text-ivory">
              Explore <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

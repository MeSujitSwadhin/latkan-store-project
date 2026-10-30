import type { Metadata } from "next";
import { allAssets } from "@/lib/assets";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/editorial/Photo";

export const metadata: Metadata = { title: "Image Credits" };

export default function CreditsPage() {
  const assets = allAssets();
  return (
    <>
      <PageHeader
        kicker="Image Credits"
        lines={[
          <>
            With thanks to the <em className="text-wine">photographers.</em>
          </>,
        ]}
        intro={
          <p>
            Photography on this preview is licensed stock from Unsplash (Unsplash License), used for illustration only. None of these
            images show The Latkan Store&apos;s own products.
          </p>
        }
      />
      <section className="bg-ivory pb-[var(--section)]">
        <div className="shell">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {assets.map((a) => (
              <li key={a.id}>
                <Photo id={a.id} sizes="(min-width:1024px) 18vw, 45vw" className="aspect-square w-full" />
                <p className="mt-3 text-sm">{a.photographer}</p>
                <p className="text-xs text-ink-soft">{a.description}</p>
                {a.sourceUrl && (
                  <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-wine underline underline-offset-4">
                    Source on Unsplash
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

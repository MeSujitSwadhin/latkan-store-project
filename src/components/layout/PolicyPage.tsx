import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

export function PolicyPage({ kicker, title, italic, updated, children }: { kicker: string; title: string; italic: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <PageHeader
        kicker={kicker}
        lines={[
          <>
            {title} <em className="text-wine">{italic}</em>
          </>,
        ]}
      />
      <section className="bg-ivory pb-[var(--section)]">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            {updated && <p className="label text-[0.6rem] text-ink-soft">Last updated · {updated}</p>}
          </aside>
          <article className="prose-luxe max-w-2xl text-ink-soft lg:col-span-7">{children}</article>
        </div>
      </section>
    </>
  );
}

export function PendingNote({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-gold bg-blush/50 px-4 py-3 text-sm text-ink">{children}</p>;
}

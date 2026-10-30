import type { ReactNode } from "react";
import { Lines } from "@/components/animation/Lines";
import { cx } from "@/lib/format";

export function PageHeader({
  kicker,
  lines,
  intro,
  aside,
  tone = "ivory",
}: {
  kicker: string;
  lines: ReactNode[];
  intro?: ReactNode;
  aside?: ReactNode;
  tone?: "ivory" | "wine" | "blush";
}) {
  return (
    <header
      className={cx(
        "relative overflow-hidden pb-14 pt-[calc(var(--header-h)+4rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+7rem)]",
        tone === "wine" && "bg-wine text-ivory",
        tone === "ivory" && "bg-ivory text-ink",
        tone === "blush" && "bg-blush text-ink",
      )}
    >
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p data-reveal="" className="label flex items-center gap-4 text-gold">
            <span className="h-px w-10 bg-gold" /> {kicker}
          </p>
          <Lines as="h1" className="display mt-8 text-[length:var(--step-5)]" lines={lines} />
        </div>
        {(intro || aside) && (
          <div className="lg:col-span-4">
            {intro && (
              <div data-reveal="" className={cx("text-pretty", tone === "wine" ? "text-ivory/75" : "text-ink-soft")}>
                {intro}
              </div>
            )}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}

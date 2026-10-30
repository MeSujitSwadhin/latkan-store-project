import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/format";

/**
 * Editorial heading revealed line by line. Pass each line explicitly so line
 * breaks are art-directed rather than left to the browser.
 */
export function Lines({
  as: Tag = "h2",
  lines,
  className,
  delay = 0,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={cx("lines", className)} data-reveal="" style={{ ["--d" as string]: `${delay}s` }}>
      {lines.map((l, i) => (
        <span key={i} className="line">
          <span style={{ ["--i" as string]: i }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

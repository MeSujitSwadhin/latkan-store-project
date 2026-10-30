"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every [data-reveal] element.
 * Cheap (no scroll listeners) and picks up elements mounted later.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion-ok")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-draw-group]:not(.is-in)").forEach((el) => io.observe(el));
    scan();

    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

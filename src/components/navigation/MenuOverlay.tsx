"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";
import { site } from "@/data/site";
import { Photo } from "@/components/editorial/Photo";
import { cx } from "@/lib/format";

type L = { href: string; label: string; n: string };

const previews: Record<string, string> = {
  "/collections": "col-bridal",
  "/our-story": "ed-doorway",
  "/custom-orders": "col-custom",
  "/gallery": "ed-maroon-yellow",
  "/contact": "tx-satin",
};

export function MenuOverlay({ open, onClose, links }: { open: boolean; onClose: () => void; links: L[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState("/collections");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      const first = el.querySelector<HTMLElement>("a");
      window.setTimeout(() => first?.focus(), 350);
    } else {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = Array.from(el.querySelectorAll<HTMLElement>("a,button")).filter((n) => n.offsetParent !== null);
        if (!f.length) return;
        const firstEl = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      className={cx(
        "fixed inset-0 z-[60] overflow-y-auto bg-wine text-ivory transition-[clip-path] duration-[1100ms] ease-[var(--ease-thread)]",
        open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div className="shell grid min-h-full grid-cols-1 gap-10 pb-10 pt-[calc(var(--header-h)+2.5rem)] lg:grid-cols-12">
        <nav aria-label="Main" className="lg:col-span-7">
          <ul>
            {links.map((l, i) => (
              <li
                key={l.href}
                className="border-b border-ivory/15 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-silk)]"
                style={{
                  transitionDelay: open ? `${0.25 + i * 0.07}s` : "0s",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(30px)",
                }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  onMouseEnter={() => setPreview(l.href)}
                  onFocus={() => setPreview(l.href)}
                  className="group flex items-baseline gap-5 py-4 sm:py-5"
                >
                  <span className="numeral w-8 text-sm text-gold">{l.n}</span>
                  <span className="display text-[clamp(2.6rem,7vw,5.6rem)] transition-transform duration-700 ease-[var(--ease-silk)] group-hover:translate-x-3 group-hover:italic">
                    {l.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="label text-gold">Collections</p>
              <ul className="mt-4 space-y-2 text-sm">
                {collections.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/collections/${c.slug}`} onClick={onClose} className="link-thread opacity-85 hover:opacity-100">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label text-gold">Follow</p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm"
              >
                <span className="link-thread">Instagram {site.instagram.handle}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </nav>

        <div className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2.5rem)] aspect-[3/4] w-full">
            {Object.entries(previews).map(([href, id]) => (
              <div
                key={href}
                className="absolute inset-0 transition-[opacity,clip-path] duration-[900ms] ease-[var(--ease-silk)]"
                style={{
                  opacity: preview === href ? 1 : 0,
                  clipPath: preview === href ? "inset(0 0 0 0)" : "inset(6% 6% 6% 6%)",
                }}
              >
                <Photo id={id} sizes="30vw" className="h-full w-full" />
              </div>
            ))}
            <p className="label absolute -bottom-8 left-0 text-[0.6rem] text-ivory/60">Illustrative imagery</p>
          </div>
        </div>
      </div>
    </div>
  );
}

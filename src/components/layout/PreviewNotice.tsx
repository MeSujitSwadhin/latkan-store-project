"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { site } from "@/data/site";

/**
 * Discreet, dismissible notice shown while the site runs in preview mode, so
 * sample listings and stock photography are never mistaken for real inventory.
 */
export function PreviewNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!site.previewMode) return;
    try {
      setShow(sessionStorage.getItem("tls.notice") !== "0");
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;
  return (
    <div
      role="note"
      className="fixed bottom-3 left-3 right-3 z-40 flex items-start gap-3 border border-wine/15 bg-ivory/95 p-3 pr-2 text-[0.72rem] leading-snug text-ink shadow-[0_18px_50px_-20px_rgba(41,33,31,0.35)] backdrop-blur sm:left-auto sm:max-w-sm"
    >
      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
      <p>
        <strong className="font-semibold">Preview build.</strong> Products are sample listings and photography is licensed stock used for
        illustration — not The Latkan Store&apos;s own items. Prices and details await confirmation.
      </p>
      <button
        type="button"
        onClick={() => {
          setShow(false);
          try {
            sessionStorage.setItem("tls.notice", "0");
          } catch {}
        }}
        className="grid h-8 w-8 shrink-0 place-items-center"
        aria-label="Dismiss notice"
      >
        <X size={14} />
      </button>
    </div>
  );
}

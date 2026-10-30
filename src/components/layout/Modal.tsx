"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cx } from "@/lib/format";

/** Accessible modal: focus trap, Escape to close, scroll lock, focus return. */
export function Modal({
  open,
  onClose,
  label,
  children,
  className,
  dark = false,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("[data-autofocus], button, a, input")?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(
          panel.current.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])"),
        ).filter((n) => !n.hasAttribute("disabled"));
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      returnTo.current?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[75]" role="presentation">
      <div className="modal-fade absolute inset-0 bg-ink/60 backdrop-blur-[2px]" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cx("modal-rise absolute", dark ? "bg-ink text-ivory" : "bg-ivory text-ink", className)}
      >
        <button
          type="button"
          onClick={onClose}
          className={cx("absolute right-2 top-2 z-10 grid h-11 w-11 place-items-center", dark ? "text-ivory" : "text-ink")}
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.3} />
        </button>
        {children}
      </div>
      <style>{`
        @keyframes m-fade{from{opacity:0}}
        @keyframes m-rise{from{opacity:0;transform:translate3d(0,24px,0)}}
        .modal-fade{animation:m-fade .5s var(--ease-silk) both}
        .modal-rise{animation:m-rise .7s var(--ease-silk) both}
      `}</style>
    </div>,
    document.body,
  );
}

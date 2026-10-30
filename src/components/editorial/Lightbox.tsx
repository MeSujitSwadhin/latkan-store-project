"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/types";
import { asset } from "@/lib/assets";
import { Modal } from "@/components/layout/Modal";
import { Photo } from "./Photo";

export function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const startX = useRef<number | null>(null);
  const open = index !== null;
  const n = items.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + n) % n);
    },
    [index, n, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  if (index === null) return null;
  const item = items[index];
  const a = asset(item.image);

  return (
    <Modal open={open} onClose={onClose} label="Campaign gallery" dark className="inset-0 flex flex-col">
      <div
        className="relative flex-1 touch-pan-y"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
      >
        <div key={index} className="lb-swap absolute inset-4 sm:inset-x-24 sm:inset-y-10">
          <Photo id={item.image} sizes="100vw" className="h-full w-full !bg-transparent" imgClassName="!object-contain" />
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center text-ivory/80 hover:text-ivory sm:grid"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} strokeWidth={1} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center text-ivory/80 hover:text-ivory sm:grid"
          aria-label="Next image"
        >
          <ChevronRight size={28} strokeWidth={1} />
        </button>
      </div>
      <div className="flex items-end justify-between gap-6 border-t border-ivory/10 px-5 py-4 sm:px-10">
        <div>
          <p className="display text-xl italic sm:text-2xl" aria-live="polite">
            {item.caption}
          </p>
          <p className="mt-1 text-[0.65rem] text-ivory/55">
            Photo: {a.photographer} / Unsplash · Illustrative
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center sm:hidden" aria-label="Previous image">
            <ChevronLeft size={22} strokeWidth={1.2} />
          </button>
          <p className="numeral whitespace-nowrap text-lg text-gold">
            {String(index + 1).padStart(2, "0")} <span className="text-ivory/40">/ {String(n).padStart(2, "0")}</span>
          </p>
          <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center sm:hidden" aria-label="Next image">
            <ChevronRight size={22} strokeWidth={1.2} />
          </button>
        </div>
      </div>
      <style>{`@keyframes lb{from{opacity:0;transform:scale(.97)}}.lb-swap{animation:lb .7s var(--ease-silk) both}`}</style>
    </Modal>
  );
}

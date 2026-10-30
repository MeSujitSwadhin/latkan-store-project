"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, ImagePlus } from "lucide-react";
import { Photo } from "@/components/editorial/Photo";
import { useEnquiry } from "./useEnquiry";
import { EnquiryResult } from "./EnquiryResult";
import { cx } from "@/lib/format";

const STYLES = [
  { id: "Statement drop", note: "A long, weighted latkan for bridal dupattas and lehengas.", image: "p-gold-violet" },
  { id: "Blouse dori pair", note: "A matched pair to finish a blouse tie.", image: "p-pink" },
  { id: "Lehenga accent", note: "Accents for drawstrings and hems.", image: "p-beaded" },
  { id: "Festive set", note: "A playful, colourful set for celebrations.", image: "p-colour" },
];

const COLOURS = [
  { id: "Antique gold", hex: "#C5A478" },
  { id: "Royal wine", hex: "#5A1829" },
  { id: "Dusty rose", hex: "#D9B7B5" },
  { id: "Pearl ivory", hex: "#EFE6D6" },
  { id: "Emerald", hex: "#2F5D50" },
  { id: "Midnight", hex: "#1E2440" },
  { id: "Match my outfit", hex: "conic-gradient(#C5A478,#5A1829,#D9B7B5,#2F5D50,#C5A478)" },
];

const STEPS = ["Style", "Colour", "Personalize", "Vision", "Send"];

export function CustomStudio() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({ style: "", colour: "", personalization: "", occasion: "", neededBy: "", message: "", name: "", phone: "", company: "" });
  const { state, errors, submit, instagram, setErrors } = useEnquiry();

  const canNext = [!!d.style, !!d.colour, true, d.message.trim().length >= 10, true][step];
  const go = (n: number) => {
    setStep(n);
    const el = document.getElementById("studio");
    if (!el || el.getBoundingClientRect().top > 0) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -110 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const next = () => {
    if (!canNext) {
      setErrors(
        step === 0 ? { style: "Choose a style to continue." } : step === 1 ? { colour: "Choose a colour direction." } : { message: "Describe your vision in a sentence or two." },
      );
      return;
    }
    setErrors({});
    go(Math.min(4, step + 1));
  };

  return (
    <div id="studio" className="scroll-mt-28">
      {/* step indicator */}
      <ol className="grid grid-cols-5 gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => i < step && go(i)}
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
              className="group w-full text-left disabled:cursor-default"
            >
              <span className="relative block h-px overflow-hidden bg-ivory/20">
                <span
                  className="absolute inset-0 origin-left bg-gold transition-transform duration-700 ease-[var(--ease-silk)]"
                  style={{ transform: `scaleX(${i < step ? 1 : i === step ? 0.5 : 0})` }}
                />
              </span>
              <span className={cx("mt-3 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em]", i <= step ? "text-ivory" : "text-ivory/40")}>
                <span className="numeral text-sm normal-case tracking-normal text-gold">{i < step ? <Check size={12} /> : `0${i + 1}`}</span>
                <span className="hidden sm:inline">{s}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-12 min-h-[420px]" aria-live="polite">
        {step === 0 && (
          <Step title={<>Choose the <em>style</em></>} n="01" error={errors.style}>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" role="radiogroup" aria-label="Style">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={d.style === s.id}
                  onClick={() => setD({ ...d, style: s.id })}
                  className={cx("group text-left transition", d.style === s.id ? "ring-1 ring-gold ring-offset-4 ring-offset-ink" : "opacity-80 hover:opacity-100")}
                >
                  <Photo id={s.image} sizes="(min-width:1024px) 20vw, 45vw" className="aspect-[4/5] w-full" />
                  <span className="mt-3 flex items-center justify-between gap-2">
                    <span className="display text-xl">{s.id}</span>
                    {d.style === s.id && <Check size={16} className="text-gold" />}
                  </span>
                  <span className="mt-1 block text-xs text-ivory/60">{s.note}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-[0.65rem] text-ivory/45">Images are illustrative references, not previews of your piece.</p>
          </Step>
        )}

        {step === 1 && (
          <Step title={<>Select a <em>colour</em></>} n="02" error={errors.colour}>
            <div className="flex flex-wrap gap-4" role="radiogroup" aria-label="Colour">
              {COLOURS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={d.colour === c.id}
                  onClick={() => setD({ ...d, colour: c.id })}
                  className="flex w-[calc(50%-0.5rem)] items-center gap-4 border border-ivory/15 p-3 text-left transition hover:border-ivory/40 sm:w-auto sm:pr-6 aria-checked:border-gold"
                >
                  <span className="h-10 w-10 shrink-0 rounded-full border border-ivory/30" style={{ background: c.hex }} />
                  <span className="text-sm">{c.id}</span>
                </button>
              ))}
            </div>
            <div className="mt-10 max-w-xl">
              <Photo id="cr-spools" sizes="600px" className="aspect-[16/7] w-full" />
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title={<>Add <em>personalization</em></>} n="03">
            <div className="grid max-w-2xl gap-8">
              <Field label="Personal details (optional)" hint="Length, a motif, initials, beads you love — anything that makes it yours.">
                <input className="field" maxLength={160} value={d.personalization} onChange={(e) => setD({ ...d, personalization: e.target.value })} />
              </Field>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Occasion (optional)">
                  <input className="field" maxLength={80} placeholder="Wedding, sangeet, festival…" value={d.occasion} onChange={(e) => setD({ ...d, occasion: e.target.value })} />
                </Field>
                <Field label="Needed by (optional)" error={errors.neededBy}>
                  <input type="date" className="field [color-scheme:dark]" value={d.neededBy} onChange={(e) => setD({ ...d, neededBy: e.target.value })} />
                </Field>
              </div>
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step title={<>Share your <em>vision</em></>} n="04" error={errors.message}>
            <div className="grid max-w-2xl gap-8">
              <Field label="Describe your outfit and the feeling you want *">
                <textarea
                  className="field"
                  maxLength={1200}
                  value={d.message}
                  onChange={(e) => setD({ ...d, message: e.target.value })}
                  placeholder="e.g. A wine velvet lehenga with gold zari border — I'd like a long latkan for the dupatta that picks up the gold."
                />
              </Field>
              <div className="flex items-start gap-4 border border-dashed border-ivory/25 p-5 text-sm text-ivory/70">
                <ImagePlus size={20} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                <p>
                  Reference images: uploads aren&apos;t enabled on the website yet. When your enquiry opens in WhatsApp, attach photos of
                  your outfit directly in the chat.
                </p>
              </div>
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title={<>Send an <em>enquiry</em></>} n="05">
            <div className="grid gap-12 lg:grid-cols-2">
              <dl className="divide-y divide-ivory/10 border-y border-ivory/10 text-sm">
                {[
                  ["Style", d.style],
                  ["Colour", d.colour],
                  ["Personalization", d.personalization || "—"],
                  ["Occasion", d.occasion || "—"],
                  ["Needed by", d.neededBy || "—"],
                  ["Vision", d.message],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-3">
                    <dt className="label text-[0.58rem] text-ivory/50">{k}</dt>
                    <dd className="text-ivory/90">{v}</dd>
                  </div>
                ))}
              </dl>
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit({ kind: "custom", ...d });
                }}
                className="space-y-8"
              >
                <Field label="Your name *" error={errors.name}>
                  <input className="field" autoComplete="name" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
                </Field>
                <Field label="Phone (optional)" error={errors.phone}>
                  <input className="field" type="tel" autoComplete="tel" value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} />
                </Field>
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <input tabIndex={-1} autoComplete="off" value={d.company} onChange={(e) => setD({ ...d, company: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-ivory" disabled={state.status === "sending"}>
                  {state.status === "sending" ? "Preparing…" : "Prepare my enquiry"} <ArrowRight size={15} />
                </button>
                <p className="text-xs text-ivory/55">
                  This creates a message for WhatsApp — no order is placed. The store will confirm feasibility, timing and pricing
                  personally. We can&apos;t show an exact preview of a custom piece before it is made.
                </p>
                <EnquiryResult state={state} instagram={instagram} dark />
              </form>
            </div>
          </Step>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-ivory/15 pt-6">
        <button type="button" onClick={() => go(Math.max(0, step - 1))} disabled={step === 0} className="label flex min-h-11 items-center gap-2 text-[0.62rem] disabled:opacity-30">
          <ArrowLeft size={14} /> Back
        </button>
        {step < 4 && (
          <button type="button" onClick={next} className={cx("btn btn-ivory", !canNext && "opacity-60")}>
            Continue <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

function Step({ title, n, children, error }: { title: ReactNode; n: string; children: ReactNode; error?: string }) {
  return (
    <fieldset className="step-in">
      <legend className="display text-[length:var(--step-3)] leading-none">
        <span className="numeral mr-4 text-lg text-gold">{n}</span>
        {title}
      </legend>
      <div className="mt-10">{children}</div>
      {error && (
        <p role="alert" className="mt-6 text-sm text-rose">
          {error}
        </p>
      )}
      <style>{`@keyframes st{from{opacity:0;transform:translate3d(0,16px,0)}}.step-in{animation:st .8s var(--ease-silk) both}`}</style>
    </fieldset>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label text-[0.6rem] text-ivory/60">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-xs text-ivory/45">{hint}</span>}
      {error && <span className="mt-2 block text-xs text-rose">{error}</span>}
    </label>
  );
}

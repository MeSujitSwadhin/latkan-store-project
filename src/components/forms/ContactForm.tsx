"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useEnquiry } from "./useEnquiry";
import { EnquiryResult } from "./EnquiryResult";
import { cx } from "@/lib/format";

export function ContactForm() {
  const { state, errors, submit, instagram } = useEnquiry();
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submit({ kind: "contact", ...f });
  };

  const field = (k: "name" | "email" | "phone", label: string, type = "text", auto?: string, required = false) => (
    <div>
      <label htmlFor={`c-${k}`} className="label text-[0.62rem] text-ink-soft">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={`c-${k}`}
        type={type}
        autoComplete={auto}
        value={f[k]}
        onChange={set(k)}
        required={required}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `c-${k}-err` : undefined}
        className="field"
      />
      {errors[k] && (
        <p id={`c-${k}-err`} className="mt-2 text-xs text-wine">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {field("name", "Your name", "text", "name", true)}
      <div className="grid gap-8 sm:grid-cols-2">
        {field("email", "Email (optional)", "email", "email")}
        {field("phone", "Phone (optional)", "tel", "tel")}
      </div>
      <div>
        <label htmlFor="c-message" className="label text-[0.62rem] text-ink-soft">
          Your message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="c-message"
          value={f.message}
          onChange={set("message")}
          required
          maxLength={1200}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "c-message-err" : undefined}
          className="field"
          placeholder="Tell us about the outfit, the occasion, or the piece you have in mind."
        />
        {errors.message && (
          <p id="c-message-err" className="mt-2 text-xs text-wine">
            {errors.message}
          </p>
        )}
      </div>
      {/* honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company <input tabIndex={-1} autoComplete="off" value={f.company} onChange={set("company")} />
        </label>
      </div>
      <button type="submit" className={cx("btn btn-wine", state.status === "sending" && "opacity-60")} disabled={state.status === "sending"}>
        {state.status === "sending" ? "Preparing…" : "Prepare enquiry"} <ArrowRight size={15} strokeWidth={1.4} />
      </button>
      <p className="text-xs text-ink-soft">
        Your enquiry is sent through WhatsApp from your own device. We don&apos;t store form submissions on this website.
      </p>
      <EnquiryResult state={state} instagram={instagram} />
    </form>
  );
}

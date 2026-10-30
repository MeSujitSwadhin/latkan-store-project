"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { sanitize, validate, type EnquiryInput } from "@/lib/validation";

type State =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "ready"; url: string }
  | { status: "unconfigured"; message: string }
  | { status: "error"; message: string };

export function useEnquiry() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(data: Omit<EnquiryInput, "kind"> & { kind: EnquiryInput["kind"] }) {
    const local = validate(sanitize(data as unknown as Record<string, unknown>));
    setErrors(local);
    if (Object.keys(local).length) return false;

    setState({ status: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as {
        ok: boolean;
        whatsappUrl?: string | null;
        errors?: Record<string, string>;
        error?: string;
        unconfigured?: boolean;
      };
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setState({ status: "idle" });
        return false;
      }
      if (json.unconfigured) {
        setState({ status: "unconfigured", message: json.error ?? "Enquiries are not open yet." });
        return false;
      }
      if (!json.ok || !json.whatsappUrl) {
        setState({ status: "error", message: json.error ?? "Something went wrong. Please try again." });
        return false;
      }
      setState({ status: "ready", url: json.whatsappUrl });
      return true;
    } catch {
      setState({ status: "error", message: "Network error — please check your connection and try again." });
      return false;
    }
  }

  return { state, errors, submit, setErrors, reset: () => setState({ status: "idle" }), instagram: site.instagram.url };
}

/**
 * Shared, dependency-free validation for enquiry forms. Used on the client for
 * instant feedback and re-run on the server (the server result is authoritative).
 */

export type EnquiryKind = "contact" | "custom";

export interface EnquiryInput {
  kind: EnquiryKind;
  name: string;
  phone?: string;
  email?: string;
  message: string;
  // custom studio fields
  style?: string;
  colour?: string;
  personalization?: string;
  occasion?: string;
  neededBy?: string;
  // honeypot — must stay empty
  company?: string;
}

const LIMITS: Record<string, number> = {
  name: 80,
  phone: 20,
  email: 120,
  message: 1200,
  style: 60,
  colour: 60,
  personalization: 160,
  occasion: 80,
  neededBy: 20,
};

/** Strip control characters / angle brackets and collapse whitespace. */
export function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitize(raw: Record<string, unknown>): EnquiryInput {
  const out: Record<string, string> = {};
  for (const [k, max] of Object.entries(LIMITS)) out[k] = clean(raw[k], max);
  return {
    kind: raw.kind === "custom" ? "custom" : "contact",
    name: out.name,
    phone: out.phone || undefined,
    email: out.email || undefined,
    message: out.message,
    style: out.style || undefined,
    colour: out.colour || undefined,
    personalization: out.personalization || undefined,
    occasion: out.occasion || undefined,
    neededBy: out.neededBy || undefined,
    company: clean(raw.company, 100),
  };
}

export function validate(e: EnquiryInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (e.name.length < 2) errors.name = "Please tell us your name.";
  if (e.phone && !/^\+?[0-9 ()-]{7,20}$/.test(e.phone)) errors.phone = "Please enter a valid phone number.";
  if (e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.email)) errors.email = "Please enter a valid email address.";
  if (e.kind === "contact" && e.message.length < 10) errors.message = "A few more words, please (at least 10 characters).";
  if (e.kind === "custom") {
    if (!e.style) errors.style = "Choose a style to continue.";
    if (!e.colour) errors.colour = "Choose a colour direction.";
    if (e.message.length < 10) errors.message = "Describe your vision in a sentence or two.";
  }
  if (e.neededBy && !/^\d{4}-\d{2}-\d{2}$/.test(e.neededBy)) errors.neededBy = "Please use a valid date.";
  return errors;
}

export function composeMessage(e: EnquiryInput): string {
  const lines =
    e.kind === "custom"
      ? [
          "Hello The Latkan Store — a custom enquiry:",
          `Name: ${e.name}`,
          `Style: ${e.style}`,
          `Colour: ${e.colour}`,
          e.personalization && `Personalization: ${e.personalization}`,
          e.occasion && `Occasion: ${e.occasion}`,
          e.neededBy && `Needed by: ${e.neededBy}`,
          `Vision: ${e.message}`,
          "(I can share reference images in this chat.)",
        ]
      : ["Hello The Latkan Store,", e.message, "", `— ${e.name}`, e.email && `Email: ${e.email}`, e.phone && `Phone: ${e.phone}`];
  return lines.filter(Boolean).join("\n");
}

import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { rateLimit } from "@/lib/rateLimit";
import { composeMessage, sanitize, validate } from "@/lib/validation";

/**
 * POST /api/enquiry
 * Validates + sanitizes an enquiry server-side, rate-limits by IP, and returns
 * a WhatsApp deep link to the verified business number. It never pretends an
 * order was placed: when no number is configured it answers 503.
 * File uploads are intentionally not accepted (no storage backend yet);
 * customers share reference images inside the WhatsApp chat instead.
 */
export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
  const limit = rateLimit(`enquiry:${ip}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries — please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const type = req.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported content type." }, { status: 415 });
  }
  const text = await req.text();
  if (text.length > 8000) return NextResponse.json({ ok: false, error: "Enquiry too long." }, { status: 413 });

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!raw || typeof raw !== "object") return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  const input = sanitize(raw as Record<string, unknown>);
  // Honeypot: silently accept bots without doing anything.
  if (input.company) return NextResponse.json({ ok: true, whatsappUrl: null });

  const errors = validate(input);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  if (!site.whatsapp) {
    return NextResponse.json(
      {
        ok: false,
        unconfigured: true,
        error: "Online enquiries are not open yet. Please message the store on Instagram.",
        instagram: site.instagram.url,
      },
      { status: 503 },
    );
  }

  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(composeMessage(input))}`;
  return NextResponse.json({ ok: true, whatsappUrl });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

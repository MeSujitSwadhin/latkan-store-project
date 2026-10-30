import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { useEnquiry } from "./useEnquiry";

export function EnquiryResult({ state, instagram, dark = false }: { state: ReturnType<typeof useEnquiry>["state"]; instagram: string; dark?: boolean }) {
  if (state.status === "ready")
    return (
      <div role="status" className={dark ? "border border-ivory/20 p-6" : "border border-wine/20 bg-blush/50 p-6"}>
        <p className="display text-2xl">Your message is ready.</p>
        <p className="mt-2 text-sm opacity-80">
          Continue to WhatsApp to send it to the store. Nothing has been ordered or charged — the store will reply in the chat.
        </p>
        <a href={state.url} target="_blank" rel="noopener noreferrer" className={`btn mt-5 ${dark ? "btn-ivory" : "btn-wine"}`}>
          <MessageCircle size={16} strokeWidth={1.4} /> Continue to WhatsApp
        </a>
      </div>
    );
  if (state.status === "unconfigured")
    return (
      <div role="status" className={dark ? "border border-ivory/20 p-6" : "border border-gold/50 bg-ivory-deep p-6"}>
        <p className="display text-2xl">Enquiries open soon.</p>
        <p className="mt-2 text-sm opacity-80">
          {state.message} Your details were checked but not sent anywhere.
        </p>
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-5">
          Message on Instagram <ArrowUpRight size={14} />
        </a>
      </div>
    );
  if (state.status === "error")
    return (
      <p role="alert" className="text-sm text-wine">
        {state.message}
      </p>
    );
  return null;
}

import { site } from "@/data/site";

/** Returns a wa.me link, or null when no verified number is configured. */
export function whatsappLink(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message.slice(0, 1500))}`;
}

export function productEnquiryMessage(opts: {
  name: string;
  colour?: string;
  size?: string;
  quantity?: number;
  url?: string;
}) {
  const lines = [
    `Hello The Latkan Store, I'd like to enquire about:`,
    `• ${opts.name}`,
    opts.colour && `  Colour: ${opts.colour}`,
    opts.size && `  Option: ${opts.size}`,
    opts.quantity && `  Quantity: ${opts.quantity}`,
    opts.url && `  ${opts.url}`,
  ].filter(Boolean);
  return lines.join("\n");
}

import type { Metadata } from "next";
import { site } from "@/data/site";
import { PolicyPage, PendingNote } from "@/components/layout/PolicyPage";

export const metadata: Metadata = { title: "Shipping & Returns" };

export default function ShippingPage() {
  const { shippingPolicy, returnsPolicy } = site.facts;
  return (
    <PolicyPage kicker="Care & Policy" title="Shipping &" italic="returns">
      {!shippingPolicy && !returnsPolicy && (
        <PendingNote>
          The Latkan Store hasn&apos;t published its shipping and returns terms on this website yet. Please confirm delivery areas,
          timelines, charges and return conditions with the store when you enquire.
        </PendingNote>
      )}
      <h2>Shipping</h2>
      <p>{shippingPolicy ?? "To be confirmed by the store."}</p>
      <h2>Returns &amp; exchanges</h2>
      <p>{returnsPolicy ?? "To be confirmed by the store."}</p>
      <h2>Custom pieces</h2>
      <p>Terms for custom or made-to-order pieces will be agreed individually with the store before work begins.</p>
    </PolicyPage>
  );
}

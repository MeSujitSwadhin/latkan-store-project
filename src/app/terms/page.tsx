import type { Metadata } from "next";
import { PolicyPage, PendingNote } from "@/components/layout/PolicyPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <PolicyPage kicker="Policy" title="Terms of" italic="use" updated="30 October 2026">
      <PendingNote>Draft terms for review. Business-specific terms (legal entity, governing law, order terms) await confirmation.</PendingNote>
      <h2>About this website</h2>
      <p>
        This website presents pieces from The Latkan Store and lets you send enquiries. Product listings marked “Sample listing” are
        illustrations of the shopping experience and are not offers for sale.
      </p>
      <h2>Enquiries, not orders</h2>
      <p>
        Enquiries made through this website do not create an order or a contract. Availability, pricing, timelines and any custom work
        are confirmed directly by the store before anything is agreed.
      </p>
      <h2>Photography</h2>
      <p>
        Unless marked otherwise, photographs are licensed stock images used for illustration under the Unsplash License and are
        credited on the Image Credits page. They do not depict the store&apos;s own products.
      </p>
      <h2>Intellectual property</h2>
      <p>The brand name, copy and design of this website belong to The Latkan Store unless stated otherwise.</p>
    </PolicyPage>
  );
}

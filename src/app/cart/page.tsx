import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { BagView } from "./BagView";

export const metadata: Metadata = {
  title: site.commerceMode === "checkout" ? "Bag" : "Enquiry List",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        kicker={site.commerceMode === "checkout" ? "Your Bag" : "Your Enquiry List"}
        lines={[
          <>
            Your <em className="text-wine">selection.</em>
          </>,
        ]}
      />
      <section className="bg-ivory pb-[var(--section)]">
        <div className="shell">
          <BagView />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features, site } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { CustomStudio } from "@/components/forms/CustomStudio";
import { Photo } from "@/components/editorial/Photo";

export const metadata: Metadata = {
  title: "Custom Studio",
  description: "Begin a custom latkan enquiry, composed around your outfit.",
};

export default function CustomOrdersPage() {
  if (!features.customOrders) notFound();
  const unconfirmed = site.facts.offersCustomization !== true;

  return (
    <>
      <PageHeader
        tone="wine"
        kicker="The Customization Studio"
        lines={[
          "Composed around",
          <>
            <em className="text-rose">your</em> outfit.
          </>,
        ]}
        intro={
          <p>
            Five calm steps to describe the piece you imagine. Your enquiry opens in WhatsApp, where the store can discuss what&apos;s
            possible and you can share reference photos.
          </p>
        }
        aside={
          unconfirmed ? (
            <p className="mt-6 border-l-2 border-gold pl-4 text-xs text-ivory/70">
              Preview: The Latkan Store has not yet confirmed that it offers custom orders. This studio is shown for review.
            </p>
          ) : null
        }
      />
      <section className="bg-wine pb-[var(--section)] text-ivory">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CustomStudio />
          </div>
          <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <Photo id="col-custom" sizes="22vw" className="aspect-[3/4] w-full" />
              <p className="mt-4 text-xs text-ivory/55">Illustrative photography.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

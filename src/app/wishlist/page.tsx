import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { WishlistView } from "./WishlistView";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        kicker="Wishlist"
        lines={[
          <>
            Saved <em className="text-wine">for later.</em>
          </>,
        ]}
        intro={<p>Your wishlist is stored privately in this browser.</p>}
      />
      <section className="bg-ivory pb-[var(--section)]">
        <div className="shell">
          <WishlistView />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { gallery } from "@/data/gallery";
import { PageHeader } from "@/components/layout/PageHeader";
import { CampaignGallery } from "@/components/editorial/CampaignGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "An editorial campaign of details, textures and colour.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        kicker="The Campaign Gallery"
        lines={[
          <>
            A study in <em className="text-wine">small</em>
          </>,
          "magnificence.",
        ]}
        intro={
          <p>
            Details, textures and colour — tap any image to view it fullscreen. Use arrow keys or swipe to move through the series.
            Photography is licensed stock, used for illustration.
          </p>
        }
      />
      <section className="bg-ivory pb-[var(--section)]">
        <div className="shell">
          <CampaignGallery items={gallery} />
        </div>
      </section>
    </>
  );
}

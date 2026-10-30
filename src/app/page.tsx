import Link from "next/link";
import { Hero } from "@/components/editorial/Hero";
import { Manifesto } from "@/components/editorial/Manifesto";
import { CollectionIndex } from "@/components/collections/CollectionIndex";
import { EditedSelection } from "@/components/products/EditedSelection";
import { Showroom } from "@/components/editorial/Showroom";
import { CraftStory } from "@/components/editorial/CraftStory";
import { StudioTeaser } from "@/components/forms/StudioTeaser";
import { CampaignGallery } from "@/components/editorial/CampaignGallery";
import { InstagramEditorial } from "@/components/editorial/InstagramEditorial";
import { FinalCTA } from "@/components/editorial/FinalCTA";
import { Lines } from "@/components/animation/Lines";
import { gallery } from "@/data/gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <CollectionIndex />
      <EditedSelection />
      <Showroom />
      <CraftStory />
      <StudioTeaser />

      <section className="section-y bg-ivory" aria-labelledby="gallery-title">
        <div className="shell">
          <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="numeral text-gold">08</span>
                <span className="h-px w-12 bg-ink/25" />
                <p className="label text-ink-soft">The Campaign</p>
              </div>
              <Lines
                id="gallery-title"
                className="display mt-8 text-[length:var(--step-5)] text-ink"
                lines={[
                  <>
                    A gallery of <em className="text-wine">small</em>
                  </>,
                  "magnificence.",
                ]}
              />
            </div>
            <Link href="/gallery" className="label link-thread self-start text-wine lg:self-end">
              Enter the full gallery →
            </Link>
          </div>
          <CampaignGallery items={gallery.slice(0, 8)} />
        </div>
      </section>

      <InstagramEditorial />
      <FinalCTA />
    </>
  );
}

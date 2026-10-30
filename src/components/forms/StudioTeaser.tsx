import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { features, site } from "@/data/site";
import { Photo } from "@/components/editorial/Photo";
import { Lines } from "@/components/animation/Lines";

const STEPS = ["Choose the style", "Select a colour", "Add personalization", "Share your vision", "Send an enquiry"];

export function StudioTeaser() {
  if (!features.customOrders) return null;
  const unconfirmed = site.facts.offersCustomization !== true;

  return (
    <section className="relative bg-ink text-ivory" aria-labelledby="studio-title">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[60svh] lg:min-h-[100svh]">
          <Photo id="cr-spools" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0" />
          <div className="absolute inset-0 bg-ink/25" />
        </div>
        <div className="shell flex flex-col justify-center py-[var(--section)] lg:px-[6vw]">
          <div className="flex items-center gap-4">
            <span className="numeral text-gold">07</span>
            <span className="h-px w-12 bg-ivory/25" />
            <p className="label text-ivory/60">The Customization Studio</p>
          </div>
          <Lines
            id="studio-title"
            className="display mt-8 text-[length:var(--step-4)] leading-[0.92]"
            lines={[
              "Composed around",
              <>
                <em className="text-rose">your</em> outfit.
              </>,
            ]}
          />
          <ol className="mt-10 border-t border-ivory/15">
            {STEPS.map((s, i) => (
              <li key={s} data-reveal="" style={{ ["--d" as string]: `${i * 0.06}s` }} className="flex items-baseline gap-5 border-b border-ivory/15 py-4">
                <span className="numeral text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-2xl">{s}</span>
              </li>
            ))}
          </ol>
          {unconfirmed && (
            <p className="mt-6 text-xs text-ivory/55">Preview — custom orders are shown for review and are not yet confirmed by the store.</p>
          )}
          <Link href="/custom-orders" className="btn btn-ivory mt-8 self-start">
            Begin a custom enquiry <ArrowRight size={15} strokeWidth={1.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}

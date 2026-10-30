import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Photo } from "./Photo";
import { Lines } from "@/components/animation/Lines";
import { HangingLatkan } from "@/components/animation/HangingLatkan";
import { whatsappLink } from "@/lib/whatsapp";

export function FinalCTA() {
  const wa = whatsappLink("Hello The Latkan Store, I'm looking for a finishing touch for my outfit.");

  return (
    <section className="relative isolate overflow-hidden bg-wine text-ivory" aria-labelledby="cta-title">
      <div className="absolute inset-0 -z-10 opacity-25 mix-blend-luminosity">
        <Photo id="tx-red" sizes="100vw" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-wine via-wine/80 to-wine-deep" />

      <HangingLatkan tone="ivory" threadLength={180} className="absolute left-[8%] top-0 hidden h-[380px] md:block" />

      <div className="shell section-y relative grid min-h-[90svh] content-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <p data-reveal="" className="label text-center text-gold">
            The Finishing Touch
          </p>
          <Lines
            id="cta-title"
            className="display mt-8 text-center text-[length:var(--step-6)] leading-[0.84]"
            lines={[
              "Find Your",
              <>
                <em className="text-rose">Finishing</em>
              </>,
              "Touch.",
            ]}
          />
          <p data-reveal="" className="lede mx-auto mt-10 max-w-xl text-center text-ivory/80">
            Explore the details that make an outfit unmistakably yours.
          </p>
          <div data-reveal="" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/collections" className="btn btn-ivory">
              Explore the Collection <ArrowRight size={15} strokeWidth={1.4} />
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line text-ivory">
                <MessageCircle size={16} strokeWidth={1.4} /> Enquire on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

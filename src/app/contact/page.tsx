import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Photo } from "@/components/editorial/Photo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enquire with The Latkan Store.",
};

export default function ContactPage() {
  const wa = whatsappLink("Hello The Latkan Store, I have a question.");
  return (
    <>
      <PageHeader
        kicker="Contact"
        lines={[
          "Let's talk",
          <>
            <em className="text-wine">details.</em>
          </>,
        ]}
      />
      <section className="bg-ivory pb-[var(--section)]">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            <Photo id="tx-satin" sizes="30vw" className="aspect-[4/3] w-full" />
            <div>
              <p className="label text-[0.62rem] text-gold">Direct</p>
              <ul className="mt-4 space-y-3 text-sm">
                {wa && (
                  <li>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      <MessageCircle size={15} strokeWidth={1.4} /> <span className="link-thread">WhatsApp</span>
                    </a>
                  </li>
                )}
                <li>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <span className="link-thread">Instagram {site.instagram.handle}</span> <ArrowUpRight size={14} />
                  </a>
                </li>
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className="link-thread">
                      {site.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <p className="label text-[0.62rem] text-gold">Studio</p>
              <p className="mt-4 text-sm text-ink-soft">{site.location ?? "Location to be confirmed by the store."}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

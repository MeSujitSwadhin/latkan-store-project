import type { Metadata } from "next";
import { PolicyPage, PendingNote } from "@/components/layout/PolicyPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <PolicyPage kicker="Policy" title="Privacy" italic="notice" updated="30 October 2026">
      <PendingNote>
        This notice describes how this website currently works. The business&apos;s legal name and contact details will be added
        once confirmed; have it reviewed before public launch.
      </PendingNote>
      <h2>What this website stores</h2>
      <ul>
        <li>Your wishlist and enquiry list are saved only in your own browser (localStorage). They are not sent to us.</li>
        <li>A session flag remembers that you have seen the introduction animation and dismissed the preview notice.</li>
        <li>No advertising or analytics cookies are set by this website.</li>
      </ul>
      <h2>Enquiry forms</h2>
      <p>
        When you prepare an enquiry, the details you type are checked by our server and turned into a WhatsApp message. They are not
        saved in a database. The message is only sent if you choose to send it from WhatsApp on your own device — at that point
        WhatsApp&apos;s own privacy policy applies.
      </p>
      <h2>Third parties</h2>
      <p>
        Links to Instagram and WhatsApp take you to services operated by Meta Platforms, which have their own privacy policies.
        Fonts and images are served from this website.
      </p>
      <h2>Your choices</h2>
      <p>You can clear your wishlist and enquiry list at any time, or clear this site&apos;s data in your browser settings.</p>
    </PolicyPage>
  );
}

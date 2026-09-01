import type { Metadata } from "next";

import { ConsentControls } from "@/components/consent-controls";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy and cookies",
  alternates: { canonical: "/privacy" },
  description:
    "What voidsec.sh stores, what it does not, and how to change your analytics choice.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-head shell">
        <span className="section-kicker">Privacy and cookies</span>
        <h1>
          What this site
          <br />
          stores<span>.</span>
        </h1>
        <p className="page-lede">
          Short version: page views if you allow them, the contents of the
          contact form if you send one, and nothing else. No advertising
          networks, no profiling, nothing sold or shared.
        </p>
      </section>

      <section className="section shell prose">
        <article>
          <h2>Cookies</h2>
          <p>
            This site sets no cookies. Your analytics choice is kept in your
            browser&apos;s local storage rather than a cookie, so asking the
            question does not itself store anything on your device until you
            answer it.
          </p>
        </article>

        <article>
          <h2>Analytics</h2>
          <p>
            If you allow it, we use Vercel Analytics to count page views. It
            records the page visited, the referring site, and coarse details
            like country, browser and whether you are on a phone or a desktop.
            It does not use cookies, does not follow you to other sites, and
            does not build a profile of you.
          </p>
          <p>
            We look at it to see which pages people actually read. That is the
            whole purpose. Decline and none of it loads.
          </p>
        </article>

        <article>
          <h2>The contact form</h2>
          <p>
            What you type into the contact form is emailed to us and kept in
            that mailbox. We use it to answer you and, if it turns into an
            engagement, to scope the work. It is not added to a mailing list.
          </p>
          <p>
            The form is rate limited by IP address to stop automated abuse.
            Those counts are held in memory only and are not written anywhere.
          </p>
        </article>

        <article>
          <h2>Hosting</h2>
          <p>
            The site is hosted by Vercel, which keeps standard server logs
            including IP addresses for a limited period. Email for the domain is
            handled by Zoho.
          </p>
        </article>

        <article>
          <h2>Your choice</h2>
          <p>
            You can change your mind at any time, including after allowing
            analytics.
          </p>
          <ConsentControls />
        </article>

        <article>
          <h2>Asking us about your data</h2>
          <p>
            Write to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and ask what we
            hold, or ask us to delete it. Under Moroccan law 09-08 you can also
            raise a complaint with the CNDP.
          </p>
        </article>
      </section>
    </>
  );
}

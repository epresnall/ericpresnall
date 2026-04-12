import type { Metadata } from "next";
import { Section, H1 } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section className="pt-28 lg:pt-36">
      <H1 className="mb-8">Terms and Conditions</H1>
      <div className="max-w-3xl text-[var(--color-white-60)] leading-relaxed space-y-4">
        <p>
          By accessing and using this website, you accept and agree to be bound
          by the terms and provisions of this agreement.
        </p>
        <p>
          All content on this website, including text, images, and videos, is the
          property of Eric Presnall and is protected by copyright law.
        </p>
        <p>
          For questions about these terms, please contact{" "}
          <a
            href="mailto:eric@ericpresnall.com"
            className="text-[var(--color-purple)] hover:underline"
          >
            eric@ericpresnall.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { Section, H1 } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section className="pt-28 lg:pt-36">
      <H1 className="mb-8">Privacy Policy</H1>
      <div className="max-w-3xl text-[var(--color-white-60)] leading-relaxed space-y-4">
        <p>
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information.
        </p>
        <p>
          We collect information you provide directly, such as when you fill out
          a contact form. This information is used solely to respond to your
          inquiry.
        </p>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties.
        </p>
        <p>
          For questions about this policy, please contact{" "}
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

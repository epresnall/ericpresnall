import type { Metadata } from "next";
import { H2 } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Eric Presnall",
  description:
    "Reach out to Eric for speaking, collaboration, or creative partnerships in education, entertainment, or entrepreneurship.",
  alternates: { canonical: "/contact" },
};

const socialLinks = [
  {
    label: "Email",
    href: "mailto:eric@ericpresnall.com",
    text: "eric@ericpresnall.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ericpresnall/",
    text: "LinkedIn",
  },
  {
    label: "YouTube (Video Content for Business)",
    href: "https://www.youtube.com/@VideoContentForBusiness",
    text: "YouTube — Video Content",
  },
  {
    label: "YouTube (Travel Time Kids)",
    href: "https://www.youtube.com/@Travel_Time_Kids",
    text: "YouTube — Travel Time",
  },
  {
    label: "IMDb",
    href: "https://www.imdb.com/name/nm2558438/",
    text: "IMDb",
  },
];

export default function ContactPage() {
  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <H2>Have some questions?</H2>
            <p className="text-[var(--color-white-60)] mt-6 leading-relaxed">
              Leave a message by filling out the form below...
            </p>

            <div className="mt-10">
              <p className="text-sm text-[var(--color-white-60)] mb-4">
                ...or email me at the following email.
              </p>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="block text-[var(--color-white-60)] hover:text-[var(--color-purple)] transition-colors text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

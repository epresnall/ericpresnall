import type { Metadata } from "next";
import Image from "next/image";
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
              <a href="mailto:eric@ericpresnall.com" className="text-lg text-white hover:text-[var(--color-purple)] transition-colors font-semibold">
                eric@ericpresnall.com
              </a>
              <div className="flex items-center gap-4 mt-6">
                <a href="mailto:eric@ericpresnall.com" className="w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/envelope-regular_1.svg" alt="Email" width={28} height={28} />
                </a>
                <a href="https://www.linkedin.com/in/ericpresnall/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Linkedin-1_1Linkedin-1.png" alt="LinkedIn" width={28} height={28} />
                </a>
                <a href="https://www.youtube.com/@VideoContentForBusiness" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/download-copy_1.png" alt="YouTube" width={28} height={28} />
                </a>
                <a href="https://www.youtube.com/@Travel_Time_Kids" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/earth-asia-solid_1.svg" alt="Travel Time" width={28} height={28} />
                </a>
                <a href="https://www.imdb.com/name/nm2558438/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/1_1.png" alt="IMDb" width={28} height={28} />
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

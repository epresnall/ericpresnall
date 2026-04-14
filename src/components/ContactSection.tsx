import Image from "next/image";
import { H2, Eyebrow } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--color-dark)] text-[var(--color-white)]">
      <div className="mx-auto max-w-[1300px] px-5 py-[60px] md:px-10 md:py-20 lg:px-[100px] lg:py-[100px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Eyebrow>#contact</Eyebrow>
            <H2 className="mt-3">Have some questions?</H2>
            <p className="text-[var(--color-white-60)] mt-6 leading-relaxed">
              Leave a message by filling out the form below...
            </p>
            <div className="mt-6">
              <p className="text-sm text-[var(--color-white-60)] mb-3">...or email me at the following email.</p>
              <a
                href="mailto:eric@ericpresnall.com"
                className="text-lg text-white hover:text-[var(--color-purple)] transition-colors font-semibold"
              >
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

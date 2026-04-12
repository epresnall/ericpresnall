import { H2, Eyebrow } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--color-dark)] text-[var(--color-white)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Eyebrow>#contact</Eyebrow>
            <H2 className="mt-3">Let&apos;s get in touch</H2>
            <p className="text-[var(--color-white-60)] mt-6 leading-relaxed">
              Leave a message by filling out the form below...
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:eric@ericpresnall.com"
                className="flex items-center gap-3 text-[var(--color-white-60)] hover:text-[var(--color-purple)] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                eric@ericpresnall.com
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

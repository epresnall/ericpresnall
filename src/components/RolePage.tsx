import Image from "next/image";
import {
  Section,
  Eyebrow,
  H1,
  H2,
  Lead,
  StatCard,
  ValueCard,
} from "@/components/ui";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export interface RolePageProps {
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  stats: { value: string; label: string }[];
  aboutHeading: string;
  aboutText: string;
  values: { title: string; description: string }[];
  skills?: AccordionItem[];
  skillsHeading?: string;
  ventures?: { title: string; description: string }[];
  venturesHeading?: string;
  samples?: { title: string; description: string; image?: string }[];
  samplesHeading?: string;
}

export default function RolePage({
  title,
  tagline,
  description,
  heroImage,
  stats,
  aboutHeading,
  aboutText,
  values,
  skills,
  skillsHeading,
  ventures,
  venturesHeading,
  samples,
  samplesHeading,
}: RolePageProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src={heroImage}
                alt={`Eric Presnall — ${title}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <H1>{title}</H1>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-purple)] mt-4">
                {tagline}
              </p>
              <Lead className="mt-6">{description}</Lead>
              <div className="grid grid-cols-3 gap-4 mt-10">
                {stats.map((s) => (
                  <StatCard key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about-me" tone="darker">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>#about-me</Eyebrow>
            <H2 className="mt-3">{aboutHeading}</H2>
            <p className="text-[var(--color-white-60)] mt-6 leading-relaxed text-lg">
              {aboutText}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <ValueCard
                key={v.title}
                title={v.title}
                description={v.description}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Skills / Expertise */}
      {skills && (
        <Section id="skills">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Eyebrow>#skills</Eyebrow>
              <H2 className="mt-3">{skillsHeading || "Expertise"}</H2>
            </div>
            <Accordion sections={skills} />
          </div>
        </Section>
      )}

      {/* Business Ventures */}
      {ventures && (
        <Section id="businesses" tone="darker">
          <div className="text-center mb-12">
            <Eyebrow>#businesses</Eyebrow>
            <H2 className="mt-3">
              {venturesHeading || "Current Business Ventures"}
            </H2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventures.map((v) => (
              <div key={v.title} className="card-glow p-6 md:p-8">
                <h3 className="heading text-lg mb-3">{v.title}</h3>
                <p className="text-sm text-[var(--color-white-60)] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Portfolio / Samples */}
      {samples && (
        <Section id="samples">
          <div className="text-center mb-12">
            <Eyebrow>#samples</Eyebrow>
            <H2 className="mt-3">
              {samplesHeading || "Check out my latest projects"}
            </H2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((s) => (
              <div key={s.title} className="card-glow p-6">
                <h3 className="heading text-base mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--color-white-60)]">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Testimonials />
      <ContactSection />
    </>
  );
}

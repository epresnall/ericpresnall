import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow, H1, H2, Lead } from "@/components/ui";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "About Eric Presnall | Entrepreneur, Entertainer, Educator",
  description:
    "A dynamic educator combining performance arts, psychology, and international experience to create engaging learning experiences that inspire global understanding.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/image_2025_01_23T23_42_33_424Z.png"
                alt="Eric Presnall"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-purple)] mb-4">
                The Art of Human Connection
              </p>
              <H1>Eric Presnall</H1>
              <Lead className="mt-6">
                A dynamic educator combining performance arts, psychology, and
                international experience to create engaging learning experiences
                that inspire global understanding.
              </Lead>
            </div>
          </div>
        </div>
      </section>

      {/* Story intro */}
      <Section tone="darker">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <Eyebrow>#about-me</Eyebrow>
          </div>
          <H2>
            Stories From Sacramento to Sydney
          </H2>
          <div className="mt-10 space-y-6 text-[var(--color-white-60)] leading-relaxed text-lg">
            <p>
              There&apos;s a moment when a performer becomes the performance,
              when a story becomes real, when barriers between storyteller and
              audience disappear. I&apos;ve spent my life chasing and creating
              these moments of authentic connection — first on stage, then on
              screen, and now helping leaders and brands find their authentic
              voice in a digital world.
            </p>
            <p>
              From stage lights to studio setups, from Broadway tours to global
              brands, my journey has been anything but conventional. As someone
              who has always thrived at the intersection of creativity and
              communication, I&apos;ve spent my life exploring how stories can
              bridge cultures, inspire change, and create meaningful connections.
            </p>
          </div>

          <blockquote className="my-12 text-xl italic text-[var(--color-white-60)] border-l-4 border-[var(--color-purple)] pl-6">
            &ldquo;At that moment on stage, I got extremely emotional, because
            it was at that point where I realized that dreams do come true if you
            work hard enough... Before that, I felt like it was just being at the
            right place at the right time. But for this, I worked hard to get
            this.&rdquo;
            <footer className="mt-4 text-sm text-[var(--color-purple)] not-italic">
              — Reflecting on my first performance as Tunny in American Idiot
            </footer>
          </blockquote>

          {/* Image grid 1 */}
          <div className="grid grid-cols-3 gap-4 my-12">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/images/55.jpg" alt="Eric performing" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/images/56.jpg" alt="Eric on stage" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/images/57.jpg" alt="Eric traveling" fill className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* Main bio */}
      <Section>
        <div className="max-w-4xl mx-auto space-y-6 text-[var(--color-white-60)] leading-relaxed text-lg">
          <p>
            My story began in the rolling foothills of Northern California,
            where the Sierra Nevada mountains cradle the suburbs of Sacramento.
            It was here, in this gateway to the Gold Country, where a young
            boy&apos;s world changed forever watching &quot;Phantom of the
            Opera&quot; from the front row. That magical moment sparked a
            performing arts journey that would lead to Broadway national tours,
            international stages, and television hosting. But it was never just
            about performance — it was about connection, about finding ways to
            touch people&apos;s lives through authentic storytelling.
          </p>
          <p>
            During my years touring with shows like &quot;American Idiot&quot;
            and &quot;Mamma Mia,&quot; I discovered a passion for global
            exploration and cultural understanding. Each new city, each new
            audience, offered fresh perspectives on how people connect and
            communicate. This curiosity eventually led me to Australia, where I
            completed my Bachelor&apos;s degree in Psychology, deepening my
            understanding of human behavior and communication.
          </p>

          <blockquote className="my-8 text-xl italic border-l-4 border-[var(--color-purple)] pl-6">
            &ldquo;Travel is just such a beautiful way of getting a holistic
            view... It&apos;s a global perspective. And I truly believe that if
            we only explore our own backyard, then we can&apos;t see other
            people and situations from that different perspective.&rdquo;
          </blockquote>

          <p>
            As my passion for authentic communication grew, I founded The
            Spokesman, helping global brands communicate authentically through
            video content. This entrepreneurial venture found new heights during
            my two years in Japan, where working with Fortune 500 companies
            reinforced that whether you&apos;re performing on Broadway or
            presenting to camera, the key to connection remains the same —
            authenticity and understanding.
          </p>

          {/* Image grid 2 */}
          <div className="grid grid-cols-3 gap-4 my-12">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/images/52.jpg" alt="Eric on camera" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/images/53.jpg" alt="Eric presenting" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src="/images/54.jpg" alt="Eric on location" fill className="object-cover" />
            </div>
          </div>

          <p>
            Today, I&apos;m bringing these diverse experiences together in new
            ways. Through my video content business, I help leaders and
            organizations find their authentic voice. My latest passion project,
            &quot;Travel Time,&quot; combines my love for performance, education,
            and cultural exchange into a show that helps children see the world
            through new eyes.
          </p>

          <blockquote className="my-8 text-xl italic border-l-4 border-[var(--color-purple)] pl-6">
            &ldquo;I really love this idea of giving back to the arts in
            education in order to help children understand all the
            possibilities... the arts completely opened up my entire world and
            it&apos;s my hope that I can do the same for others.&rdquo;
          </blockquote>

          <p>
            What drives me is the belief that authentic communication can
            transform how we understand each other. Whether I&apos;m helping
            CEOs become more confident on camera, creating educational content
            that bridges cultural divides, or developing shows that inspire the
            next generation, my goal remains the same: to help people connect
            more meaningfully with their audience, their world, and each other.
          </p>
          <p>
            This unique combination of entertainment, education, and
            entrepreneurship isn&apos;t just my background — it&apos;s my
            toolkit for creating impact. In a world where authentic
            communication is more valuable than ever, I bring a performer&apos;s
            presence, an educator&apos;s insight, and an entrepreneur&apos;s
            strategic thinking.
          </p>
        </div>
      </Section>

      <Testimonials />
      <ContactSection />
    </>
  );
}

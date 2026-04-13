import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow, H1, H2, Lead, StatCard } from "@/components/ui";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Eric Presnall | Entrepreneur, Entertainer & Educator",
  description:
    "A multi-talented professional bridging entertainment and business through authentic video communication and storytelling.",
  alternates: { canonical: "/" },
};

const stats = [
  { value: "35+", label: "Countries visited" },
  { value: "500+", label: "Video projects" },
  { value: "1000+", label: "Performances" },
];

const skillSections: AccordionItem[] = [
  {
    title: "Performance",
    items: [
      {
        name: "On-Camera Presentation",
        description:
          "Expert in authentic business communication through video, teleprompter reading, and natural delivery, with proven experience across 500+ video projects.",
      },
      {
        name: "Musical Theater",
        description:
          "Professional experience in Broadway national tours and regional theater, specializing in lead roles and ensemble work with expertise in singing, dancing, and character development.",
      },
      {
        name: "Commercial Acting",
        description:
          "Extensive experience in brand representation and promotional content, including national commercials for companies like National Guard, KFC, and educational institutions.",
      },
      {
        name: "Voice Acting",
        description:
          "Skilled in commercial voiceovers, character work, and professional narration for educational and corporate content.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        name: "Video Production",
        description:
          "Advanced proficiency with Sony A7III camera systems, professional lighting setups, and audio equipment for high-quality content creation.",
      },
      {
        name: "Video Editing",
        description:
          "Expert in Adobe Premiere Pro and Final Cut Pro, creating compelling final products from raw footage with attention to pacing and engagement.",
      },
      {
        name: "Content Strategy",
        description:
          "Experienced in developing comprehensive video marketing strategies, from concept to distribution, aligned with business objectives.",
      },
      {
        name: "Script Writing",
        description:
          "Expert in crafting engaging scripts for various video formats, including commercials, educational content, and corporate communications.",
      },
    ],
  },
  {
    title: "Business Development",
    items: [
      {
        name: "Freelance Business",
        description:
          "Built successful six-figure video content business on Upwork, managing enterprise clients including Microsoft, Facebook, Ahrefs, and Sony.",
      },
      {
        name: "Sales Strategy",
        description:
          "Developed comprehensive sales processes for video production companies, consistently exceeding KPIs and driving business growth.",
      },
      {
        name: "Client Relations",
        description:
          "Expert in managing international client portfolios, with proven track record of long-term client retention and relationship building.",
      },
      {
        name: "Business Communication",
        description:
          "Specialized in helping CEOs and business leaders develop authentic video presence and communication strategies.",
      },
    ],
  },
  {
    title: "Psychology & Education",
    items: [
      {
        name: "Child Development",
        description:
          'Experience in early childhood education through "Mommy and Me" programs, combining music therapy and developmental psychology.',
      },
      {
        name: "Financial Education",
        description:
          "Led Commonwealth Bank's Start Smart Program, delivering engaging financial literacy education to youth across Australia.",
      },
      {
        name: "Consumer Behavior",
        description:
          "Bachelor of Science in Psychology from Macquarie University, with focus on consumer psychology and communication theory.",
      },
      {
        name: "Cultural Education",
        description:
          'Developing "Travel Time" educational show focused on cultural literacy and global perspectives for children.',
      },
    ],
  },
  {
    title: "Tools & Tech",
    items: [
      {
        name: "Camera Systems",
        description:
          "Expert with Sony A7III ecosystem, professional lighting setups including Aputure and Godox, and audio equipment including Rode and Sennheiser.",
      },
      {
        name: "Post-Production",
        description:
          "Proficient in Adobe Creative Suite (Premiere Pro, After Effects, Photoshop), Final Cut Pro, and DaVinci Resolve.",
      },
      {
        name: "Remote Workflows",
        description:
          "Established efficient remote production systems using Frame.io, Dropbox, and various project management tools.",
      },
      {
        name: "Studio Setup",
        description:
          "Designed and implemented professional home studio with broadcast-quality lighting, sound treatment, and recording capabilities.",
      },
    ],
  },
];

const timeline = [
  {
    year: "2004",
    title: "Professional Performance Debut",
    location: "USA",
    description:
      'Launched dual career in film and theater with leading role in "Mirror Man" short film. Cast in professional production of Camelot as Tom of Warwick at California Music Circus.',
  },
  {
    year: "2007",
    title: "Commercial Actor",
    location: "USA",
    description:
      'Booked national commercials for Caltrans "Slow for the Cone Zone" campaign. Featured in Cal Grant commercial that aired during American Idol. Secured roles with National Guard, KFC, and other major brands.',
  },
  {
    year: "2009",
    title: "Disney Performer",
    location: "France",
    description:
      "Performed as lead in High School Musical: La F\u00eate at Disneyland Paris. Developed international performance experience. Explored European cultures and enhanced language skills.",
  },
  {
    year: "2011",
    title: 'Animal Planet TV Show: Who Let the Dogs Out',
    location: "USA",
    description:
      "Host and brand ambassador for Natural Balance Pet Foods. Produced content at major venues including Times Square, Grand Ole Opry, and Dodgers Stadium.",
  },
  {
    year: "2013",
    title: "Broadway National Tour: American Idiot",
    location: "USA",
    description:
      "Performed as Swing/Tunny understudy across 30 states. Delivered debut performance as Tunny in Des Moines, Iowa.",
  },
  {
    year: "2014",
    title: "Broadway National Tour: Mamma Mia",
    location: "USA",
    description:
      "Performed as Sky in leading role across North America. Completed crossing into all 50 United States. Extended tour for 5 international venues throughout Canada & Colombia.",
  },
  {
    year: "2016",
    title: "Independent Filmmaker: Amusia",
    location: "USA",
    description:
      "Wrote, Directed, and Produced film exploring the intersection of music and deaf culture. Led successful $40,000 Kickstarter campaign. Premiered in Los Angeles and Sacramento, earning Best Short Film at the Sacramento Film & Music Festival.",
  },
  {
    year: "2017",
    title: "Start Smart Program",
    location: "Australia",
    description:
      "Led Commonwealth Bank's youth financial literacy initiative. Developed educational presentation techniques in Sydney, Australia.",
  },
  {
    year: "2020",
    title: "Business Development for Sydney's Largest Video Production House",
    location: "Australia",
    description:
      "Led video content sales and client relations for premier video production company. Developed comprehensive understanding of corporate video production.",
  },
  {
    year: "2021",
    title: "Founder, The Spokesman",
    location: "Global",
    description:
      "Built six-figure video content business serving global enterprise clients. Created content for Fortune 500 companies including Unilever, Microsoft, and Ahrefs.",
  },
  {
    year: "2024",
    title: "Creator & Host: Travel Time",
    location: "Global",
    description:
      "Launched educational travel show combining entertainment, education, and cultural literacy. Developing content to inspire children to explore and understand different perspectives worldwide.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/image_2025_01_23T23_42_25_273Z.png"
                alt="Eric Presnall"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-purple)] mb-4">
                Entrepreneur | Entertainer | Educator
              </p>
              <H1>Eric Presnall</H1>
              <Lead className="mt-6">
                A multi-talented professional bridging entertainment and business
                through authentic video communication and storytelling
              </Lead>
              <div className="grid grid-cols-3 gap-4 mt-10">
                {stats.map((s) => (
                  <StatCard key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
              {/* Social icons */}
              <div className="flex items-center gap-4 mt-8">
                <a href="mailto:eric@ericpresnall.com" className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/envelope-regular.svg" alt="Email" width={24} height={24} />
                </a>
                <a href="https://www.linkedin.com/in/ericpresnall/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/Frame-1_1Frame-1.png" alt="LinkedIn" width={24} height={24} />
                </a>
                <a href="https://www.youtube.com/@VideoContentForBusiness" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/download-copy.png" alt="YouTube" width={24} height={24} />
                </a>
                <a href="https://www.youtube.com/@Travel_Time_Kids" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/earth-asia-solid.svg" alt="Travel Time" width={24} height={24} />
                </a>
                <a href="https://www.imdb.com/name/nm2558438/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="/images/1_2.png" alt="IMDb" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about-me" tone="darker">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>#about-me</Eyebrow>
            <H2 className="mt-3">A creative video content specialist</H2>
            <blockquote className="text-lg md:text-xl leading-relaxed text-[var(--color-white-60)] italic border-l-4 border-[var(--color-purple)] pl-6 mt-8">
              &ldquo;I&apos;ve always been fascinated by the effectiveness of
              video content in overall communication. I&apos;ve seen how the power
              of well-crafted content can transform how businesses and leaders
              connect with their audiences.&rdquo;
            </blockquote>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/28.jpg"
              alt="Eric Presnall on camera"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Eyebrow>#skills</Eyebrow>
            <H2 className="mt-3">Skills &amp; Expertise</H2>
            <Lead className="mt-4">
              A unique combination of performance, technical, and business
              capabilities built over two decades.
            </Lead>
          </div>
          <Accordion sections={skillSections} />
        </div>
      </Section>

      {/* Timeline */}
      <Section id="my-experience" tone="darker">
        <div className="text-center mb-16">
          <Eyebrow>#my-experience</Eyebrow>
          <H2 className="mt-3">Explore my journey</H2>
        </div>
        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-purple)]/30" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--color-purple)] rounded-full -translate-x-1/2 mt-2 z-10" />

                <div
                  className={`md:w-1/2 pl-12 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <span className="heading text-sm text-[var(--color-purple)]">
                    {item.year}
                  </span>
                  <h3 className="heading text-xl mt-1">{item.title}</h3>
                  <p className="text-xs text-[var(--color-white-60)] uppercase tracking-wider mt-1">
                    {item.location}
                  </p>
                  <p className="text-sm text-[var(--color-white-60)] mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact */}
      <ContactSection />
    </>
  );
}

import type { Metadata } from "next";
import RolePage from "@/components/RolePage";

export const metadata: Metadata = {
  title: "Entertainer — Global Entertainer & On-Camera Presenter",
  description:
    "A multi-talented performer with extensive experience in theater, film, television, and commercial work, bringing stories to life through authentic performance and creative direction.",
  alternates: { canonical: "/entertainer" },
};

export default function EntertainerPage() {
  return (
    <RolePage
      title="Entertainer"
      tagline="Actor | Director | Writer | Producer"
      description="A multi-talented performer with extensive experience in theater, film, television, and commercial work, bringing stories to life through authentic performance and creative direction."
      heroImage="/images/image_2025_01_23T23_42_42_098Z.png"
      stats={[
        { value: "1000+", label: "Live Performances" },
        { value: "50+", label: "Commercial Projects" },
        { value: "2", label: "Broadway National Tours" },
      ]}
      aboutHeading="A passionate and dedicated performer"
      aboutText="I've always been driven by the power of storytelling through performance. From Broadway national tours to television hosting, each role is an opportunity to create meaningful connections with audiences. I believe in the transformative power of authentic performance to inspire, educate, and entertain."
      values={[
        {
          title: "Versatile",
          description:
            "Experienced in theater, film, TV, and commercial work",
        },
        {
          title: "Musical",
          description: "Professional singer, dancer, and stage performer",
        },
        {
          title: "Dynamic",
          description:
            "Bringing energy and authenticity to every performance",
        },
        {
          title: "Creative",
          description: "Writer, director, and producer of original content",
        },
      ]}
      skillsHeading="Performance Expertise I Proudly Possess"
      skills={[
        {
          title: "Theater & Live Performance",
          items: [
            {
              name: "Broadway National Tours",
              description:
                "Lead roles in American Idiot and Mamma Mia across North America.",
            },
            {
              name: "Professional Theater",
              description:
                "California Music Circus, Disneyland Paris, and regional theater.",
            },
            {
              name: "Singing & Dancing",
              description:
                "Expertise in character development, singing, dancing, and ensemble work.",
            },
          ],
        },
        {
          title: "Film & Television",
          items: [
            {
              name: "Television Host",
              description:
                'Animal Planet\'s "Who Let the Dogs Out" — host and brand ambassador.',
            },
            {
              name: "Lead Actor",
              description:
                "Independent films and short features including award-winning work.",
            },
            {
              name: "Writer/Director",
              description:
                '"Amusia" — a compelling story exploring music\'s impact on deaf culture.',
            },
          ],
        },
        {
          title: "Creative Direction",
          items: [
            {
              name: "Concept Development",
              description: "Scriptwriting, production management, and direction.",
            },
            {
              name: "Performance Coaching",
              description:
                "Creative team leadership and on-camera performance direction.",
            },
          ],
        },
      ]}
      samplesHeading="Check out my latest projects"
      samples={[
        {
          title: '"Amusia" (Short Film)',
          description:
            "Written and directed this compelling story exploring music's impact on deaf culture.",
        },
        {
          title: '"Who Let the Dogs Out" (Animal Planet)',
          description:
            "Hosted this reality TV series searching for America's most talented pets.",
        },
        {
          title: "Mamma Mia (National Tour)",
          description:
            "Lead role as Sky in this beloved ABBA musical across North America.",
        },
        {
          title: "American Idiot (National Tour)",
          description:
            "Featured as Tunny in Green Day's explosive rock opera.",
        },
        {
          title: "High School Musical (Disneyland Paris)",
          description: "Lead performer in Disney's international stage production.",
        },
        {
          title: "Deloitte Professional Services",
          description: "Corporate communication series for global consulting firm.",
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import RolePage from "@/components/RolePage";

export const metadata: Metadata = {
  title: "Educator — Educational Media Creator & Kids' Learning Advocate",
  description:
    "A dynamic educator combining performance arts, psychology, and international experience to create engaging learning experiences that inspire global understanding.",
  alternates: { canonical: "/educator" },
};

export default function EducatorPage() {
  return (
    <RolePage
      title="Educator"
      tagline="Travel Literacy | Arts In Education | Child Development"
      description="A dynamic educator combining performance arts, psychology, and international experience to create engaging learning experiences that inspire global understanding."
      heroImage="/images/image-18351.png"
      stats={[
        { value: "35+", label: "Countries Explored" },
        { value: "1000+", label: "Students Impacted" },
        { value: "10+", label: "Educational Programs" },
      ]}
      aboutHeading="A passionate and dedicated educator"
      aboutText="I've always believed in the power of education to transform perspectives and open minds. By combining my background in psychology, performance, and international experience, I create engaging learning experiences that inspire curiosity about the world. I believe in education's ability to build bridges between cultures and foster global understanding."
      galleryImages={[
        "/images/65-min.jpg",
        "/images/66.JPG",
      ]}
      galleryHeading="In the Classroom"
      values={[
        {
          title: "Engaging",
          description:
            "Creating dynamic, interactive learning experiences",
        },
        {
          title: "Global",
          description:
            "Bringing international perspective to education",
        },
        {
          title: "Innovative",
          description:
            "Combining arts and education for deeper impact",
        },
        {
          title: "Inclusive",
          description:
            "Making learning accessible and enjoyable for all",
        },
      ]}
      skillsHeading="Educational Expertise I Proudly Possess"
      skills={[
        {
          title: "Global Travel Education",
          items: [
            {
              name: "Travel Time Show",
              description:
                'Developing "Travel Time" show for cultural literacy.',
            },
            {
              name: "Cultural Exploration",
              description:
                "Experience across 35+ countries and diverse cultures.",
            },
            {
              name: "Travel-Based Learning",
              description:
                "Creating travel-based learning frameworks and teaching cultural appreciation.",
            },
          ],
        },
        {
          title: "Child Development & Psychology",
          items: [
            {
              name: "Academic Foundation",
              description:
                "Bachelor of Science in Psychology specializing in child development.",
            },
            {
              name: "Music & Movement",
              description:
                "Integration of music and movement in learning environments.",
            },
            {
              name: "Early Childhood",
              description:
                "Experience in early childhood education and understanding of how children process new experiences.",
            },
          ],
        },
        {
          title: "Cultural Communication",
          items: [
            {
              name: "Cross-Cultural Methods",
              description:
                "Cross-cultural education methodologies and multi-cultural storytelling techniques.",
            },
            {
              name: "Sensitivity & Training",
              description:
                "Language and cultural sensitivity training, building bridges between different perspectives.",
            },
          ],
        },
      ]}
    />
  );
}

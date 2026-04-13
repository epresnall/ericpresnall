import type { Metadata } from "next";
import RolePage from "@/components/RolePage";

export const metadata: Metadata = {
  title: "Entrepreneur — Creative Entrepreneur & Founder of VideoRep + Travel Time",
  description:
    "A dynamic business leader combining performance expertise with video marketing to help brands communicate authentically and effectively.",
  alternates: { canonical: "/entrepreneur" },
};

export default function EntrepreneurPage() {
  return (
    <RolePage
      title="Entrepreneur"
      tagline="Video Presenter | Marketer | Strategist"
      description="A dynamic business leader combining performance expertise with video marketing to help brands communicate authentically and effectively."
      heroImage="/images/image_2025_01_23T23_42_33_424Z.png"
      stats={[
        { value: "500+", label: "Video Projects Delivered" },
        { value: "50+", label: "Enterprise Clients" },
        { value: "35+", label: "Countries Worked In" },
      ]}
      aboutHeading="A strategic video content entrepreneur"
      aboutText="I've always been fascinated by the intersection of performance and business communication. The ability to help leaders and brands tell their stories authentically through video is what drives my passion. I believe in the power of well-crafted content to transform how businesses connect with their audiences."
      aboutImage="/images/43.jpg"
      values={[
        {
          title: "Authentic",
          description:
            "Natural, engaging delivery that builds trust with audiences",
        },
        {
          title: "Global",
          description:
            "International experience serving clients across cultures",
        },
        {
          title: "Strategic",
          description:
            "Content aligned with business goals and marketing objectives",
        },
        {
          title: "Innovative",
          description:
            "Combining entertainment expertise with business acumen",
        },
      ]}
      venturesHeading="Current Business Ventures"
      ventures={[
        {
          title: "The Spokesman",
          description:
            "Transform your brand communication with a professional video spokesperson who becomes your dedicated brand representative. Through authentic, engaging video content, I help enterprise companies elevate their message and connect with their audience at scale.",
          logo: "/images/The-Spokesman-Logo_FINAL-2-green.png",
          href: "https://www.thespokesman.co/",
        },
        {
          title: "Vloggle",
          description:
            "A done-for-you video production service helping busy business owners and thought leaders create authentic YouTube content without the hassle. We combine your expertise with our production capabilities to build your video presence and grow your channel.",
          logo: "/images/adasdasd.png",
          href: "http://vloggle.co/",
        },
        {
          title: "VideoRep",
          description:
            "A comprehensive training program helping business leaders develop authentic on-camera presence and create impactful video content. Through personalized coaching and technical guidance, we transform camera-shy executives into confident video communicators.",
          logo: "/images/VideoRep-Logo.png",
          href: "http://videorep.co/",
        },
        {
          title: "Video Base",
          description:
            "A specialized video production service helping SaaS companies build a comprehensive library of presenter-led support content that reduces tickets and delights users.",
          logo: "/images/VideoBase-Logo.png",
        },
        {
          title: "Travel Time",
          description:
            "An innovative children's show combining entertainment and education to inspire the next generation of global citizens. Through engaging storytelling and cultural exploration, we help children develop travel literacy and appreciate different perspectives.",
          logo: "/images/6744d6da62dcb163c509824b_funky-1-1-p-500.png",
          href: "http://www.traveltime.kids/",
        },
      ]}
    />
  );
}

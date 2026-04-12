"use client";

import { useState, useEffect } from "react";
import { H2, Eyebrow } from "@/components/ui";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    text: "Eric was a charm to work with. His on camera talent was spot on and he executed our project with flair. He is extremely detailed and thorough. Looking forward to working with him again soon and we've told all our clients looking for this type of project to call him. Excellent work!",
    name: "Pia Cohn Larson",
    role: "Owner",
  },
  {
    text: "Our experience with Vloggle has been nothing short of excellent. Eric's ability to deliver great content with such quick turnaround times has elevated our brand beyond our expectations. We're seeing more traffic, higher time on page, and our bounce rates are the lowest we've seen. Great communication, simple review process, and a pleasure to work with. 10/10 would recommend!",
    name: "Brandon Grimes",
    role: "Content Marketing Specialist",
  },
  {
    text: "Eric was absolutely incredible to work with! Right from the initial consult through to the delivery of the end-result, he went above and beyond to make sure his contributions to our project were of the highest possible quality. We could not be any happier to have worked with him and are very eager to work with him again in future.",
    name: "Dylan Watts",
    role: "Mortgage Loan Officer",
  },
  {
    text: "Video presenting done by Eric have transformed our company's online presence! The ability to convey the message through engaging videos has added a whole new dimension to our communication. The professional touch and seamless production made our videos look polished and captivating.",
    name: "Yuriy Kuzminov",
    role: "CEO & Co-founder",
  },
  {
    text: "Eric is a true professional that can provide an excellent service to small businesses who don't have a massive budget to hire an agency. My SaaS company tasked him with writing the script, filming, editing, adding graphics, and adding music to our explainer video and it turned out 10/10 and ahead of schedule.",
    name: "Brecker Bees",
    role: "Co-Founder",
  },
  {
    text: "Out of all the other brand representatives and video creatives that we were considering, the quality of the portfolio of The Spokesman was extremely impressive... it was exactly what we were looking for. Very professional, very easy to work with, and very quick on the turn around time.",
    name: "Harshita Pulla",
    role: "Global Manager",
  },
  {
    text: "Eric has been a great spokesman for all of our programs and records some of the highest converting videos that we advertise with!",
    name: "Zachary Miller",
    role: "CEO",
  },
  {
    text: "Eric delivered everything we asked for and more in a timely and professional manner. He's been a pleasure to work with and will be an ongoing part of our team.",
    name: "Ken Newcomb",
    role: "Sales & Operations Manager",
  },
];

export default function Testimonials({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const t = testimonials[current];

  return (
    <section
      id="referrals"
      className="bg-[var(--color-dark-lighter)] text-[var(--color-white)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="text-center mb-12">
          <Eyebrow>#referrals</Eyebrow>
          <H2 className="mt-3">
            What people I&apos;ve worked with think about me
          </H2>
        </div>

        <div className="max-w-3xl mx-auto text-center min-h-[200px] flex flex-col justify-center">
          <blockquote className="text-lg md:text-xl leading-relaxed text-[var(--color-white-60)] italic transition-opacity duration-500">
            &ldquo;{t.text}&rdquo;
          </blockquote>
          <div className="mt-8">
            <p className="font-semibold text-[var(--color-white)]">{t.name}</p>
            <p className="text-sm text-[var(--color-purple)]">{t.role}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? "bg-[var(--color-purple)]" : "bg-white/20"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

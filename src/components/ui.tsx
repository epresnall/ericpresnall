import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Section container — matches Webflow .container
 * Desktop: 100px top/bottom, 100px left/right, max-width 1300px
 * Tablet: 80px top, 40px sides
 * Mobile: 60px top, 20px sides
 */
export function Section({
  children,
  className = "",
  id,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "dark" | "darker" | "light" | "purple";
}) {
  const toneClass = {
    dark: "bg-[var(--color-dark)] text-[var(--color-white)]",
    darker: "bg-[var(--color-dark-lighter)] text-[var(--color-white)]",
    light: "bg-[var(--color-light)] text-[var(--color-dark)]",
    purple: "bg-[var(--color-purple-dark)] text-white",
  }[tone];
  return (
    <section id={id} className={`${toneClass} ${className}`}>
      <div className="mx-auto max-w-[1300px] px-5 py-[60px] md:px-10 md:py-20 lg:px-[100px] lg:py-[100px]">
        {children}
      </div>
    </section>
  );
}

/**
 * Eyebrow — matches Webflow .title
 * 18px, font-weight 500, accent color, Barlow
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-lg font-medium text-[var(--color-purple)]">
      {children}
    </span>
  );
}

/**
 * H1 — matches Webflow .heading-h1
 * Desktop: 60px / 600 weight / 120% line-height
 * Tablet: 50px
 * Mobile: 40px (v1 class)
 */
export function H1({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`heading text-[40px] md:text-[50px] lg:text-[60px] font-semibold leading-[120%] ${className}`}
    >
      {children}
    </h1>
  );
}

/**
 * H2 — matches Webflow .heading-h2
 * Desktop: 48px / 500 weight / 120% line-height
 * Tablet: 42px
 * Mobile: 32px
 */
export function H2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`heading text-[32px] md:text-[42px] lg:text-[48px] font-medium leading-[120%] ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * H3 — matches Webflow .heading-h3
 * Default: 20px / 500 weight / 150% line-height / Barlow
 * .bigger variant: Oswald 24px
 * .service-title variant: Oswald 30px
 */
export function H3({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`font-[family-name:var(--font-body)] text-[20px] font-medium leading-[150%] text-[var(--color-white)] ${className}`}
    >
      {children}
    </h3>
  );
}

/**
 * Lead paragraph — matches Webflow .paragraph (18px base)
 * On tablet: 16px
 */
export function Lead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-lg md:text-[18px] leading-[150%] text-[var(--color-white-60)] ${className}`}
    >
      {children}
    </p>
  );
}

export function CTA({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const cls = variant === "primary" ? "btn-primary" : "btn-outline";
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${cls} ${className}`}>
      {children}
    </Link>
  );
}

/**
 * StatCard — matches Webflow .jambo-text.bold
 * Number: Oswald, 34px, 500 weight, accent color
 * Mobile: 26px / 600 weight
 * Label: paragraph (18px)
 */
export function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="heading text-[26px] md:text-[34px] font-medium text-[var(--color-purple)]">
        {value}
      </div>
      <p className="text-base md:text-lg text-[var(--color-white-60)] mt-2">{label}</p>
    </div>
  );
}

export function ValueCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="card-glow p-6 md:p-8">
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-[var(--color-purple)]/10 flex items-center justify-center mb-4 text-[var(--color-purple)]">
          {icon}
        </div>
      )}
      <h3 className="heading text-lg mb-2">{title}</h3>
      <p className="text-base text-[var(--color-white-60)] leading-[150%]">
        {description}
      </p>
    </div>
  );
}

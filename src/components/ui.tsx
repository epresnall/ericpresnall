import Link from "next/link";
import type { ReactNode } from "react";

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
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-purple)]">
      {children}
    </span>
  );
}

export function H1({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`heading text-5xl md:text-6xl lg:text-7xl ${className}`}>
      {children}
    </h1>
  );
}

export function H2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`heading text-3xl md:text-4xl lg:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

export function H3({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`heading text-xl md:text-2xl ${className}`}>{children}</h3>
  );
}

export function Lead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-lg md:text-xl leading-relaxed text-[var(--color-white-60)] ${className}`}
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

export function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="card-glow p-6 text-center">
      <div className="heading text-3xl md:text-4xl text-[var(--color-purple)]">
        {value}
      </div>
      <div className="text-sm text-[var(--color-white-60)] mt-2">{label}</div>
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
      <p className="text-sm text-[var(--color-white-60)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

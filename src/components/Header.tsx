"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/entrepreneur", label: "Entrepreneur" },
  { href: "/entertainer", label: "Entertainer" },
  { href: "/educator", label: "Educator" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[900]">
      <nav className="mx-auto flex max-w-[1300px] items-center justify-between px-5 py-6 md:px-10 lg:px-[100px]">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/image_2025_03_10T09_52_13_965Z.png"
            alt="Eric Presnall"
            width={140}
            height={40}
            className="h-8 w-auto mix-blend-difference"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 px-2 text-[17px] font-medium transition-colors hover:text-[var(--color-purple)] ${
                pathname === link.href
                  ? "text-[var(--color-purple)]"
                  : "text-[var(--color-white)]"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 right-3 h-[2px] bg-[var(--color-purple)]" />
              )}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-base ml-2">
            Contact Eric
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--color-dark)] border-t border-white/5 px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-[17px] font-medium ${
                pathname === link.href
                  ? "text-[var(--color-purple)]"
                  : "text-[var(--color-white-60)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary text-base mt-3 w-full text-center"
          >
            Contact Eric
          </Link>
        </div>
      )}
    </header>
  );
}

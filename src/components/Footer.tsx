import Link from "next/link";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:eric@ericpresnall.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ericpresnall/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
      </svg>
    ),
  },
  {
    label: "YouTube — Video Content",
    href: "https://www.youtube.com/@VideoContentForBusiness",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </svg>
    ),
  },
  {
    label: "YouTube — Travel Time",
    href: "https://www.youtube.com/@Travel_Time_Kids",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </svg>
    ),
  },
  {
    label: "IMDb",
    href: "https://www.imdb.com/name/nm2558438/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
        <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zM21.3 229.2H21c.1-.1.2-.3.3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-28.7V192h42c3 14.4 5.4 34 7.5 42.2 1.2-8.6 3.8-27.9 7.9-42.2h44.4zm86.9-107.2c0 10.9-1.9 18.7-5.7 23.4-5.1 6.4-14 9.6-26.4 9.6h-9.4v74.2h-33V192h42.4c13.1 0 22.5 3 28.4 8.9 5.2 5.2 7.7 14.4 3.7 11.5zm89.7 70c0 9.9-1.6 17.7-5 23.4-5 8.4-13.7 12.6-26 12.6H345c-5 0-9.5-.5-13.1-1.6V192h46.1c12 0 20.5 3.5 25.4 10.5 3.7 5.3 5.6 13.2 5.6 23.8v56.3zm-42.8-71.5c-4.7 0-7.4 1.4-8.3 4.2-.6 1.8-.9 5.9-.9 12.2v54.4c0 7.2.3 11.7.9 13.3 1 2.6 3.6 3.9 8 3.9 4.5 0 7.3-1.4 8.3-4.2.6-1.8.9-5.9.9-12.2v-54.4c0-7.2-.3-11.7-.9-13.3-.9-2.7-3.5-3.9-8-3.9z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="heading text-lg tracking-wider">
              Eric Presnall
            </Link>
            <p className="text-sm text-[var(--color-white-60)] mt-1">
              Entrepreneur | Entertainer | Educator
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="text-[var(--color-white-60)] hover:text-[var(--color-purple)] transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-white-60)]">
          <p>Copyright &copy; {new Date().getFullYear()} Eric Presnall. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms and Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

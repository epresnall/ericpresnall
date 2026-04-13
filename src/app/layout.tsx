import type { Metadata } from "next";
import { Oswald, Barlow } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ericpresnall.com"),
  title: {
    default: "Eric Presnall | Entrepreneur, Entertainer & Educator",
    template: "%s | Eric Presnall",
  },
  description:
    "A multi-talented professional bridging entertainment and business through authentic video communication and storytelling.",
  openGraph: {
    type: "website",
    siteName: "Eric Presnall",
    locale: "en_US",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Eric Presnall — Entrepreneur, Entertainer & Educator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-dark)] text-[var(--color-white)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YXZ4E8R4S6"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YXZ4E8R4S6');
          `}
        </Script>
      </body>
    </html>
  );
}

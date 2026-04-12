import type { MetadataRoute } from "next";

const BASE = "https://www.ericpresnall.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/about",
    "/contact",
    "/entrepreneur",
    "/entertainer",
    "/educator",
  ];

  return pages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}

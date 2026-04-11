import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { servicePages } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/uslugi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...servicePages.map((page) => ({
      url: `${siteConfig.url}/uslugi/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

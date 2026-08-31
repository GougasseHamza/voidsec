import type { MetadataRoute } from "next";

import { nav, site } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...nav.map((item) => item.href)].map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

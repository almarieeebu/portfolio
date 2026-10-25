import type { MetadataRoute } from "next";
import { site, stories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const demoPaths = stories
    .flatMap((story) => [story.demo, ...(story.parts?.items.map((part) => part.demo) ?? [])])
    .flatMap((path) => (path ? [path.split("?")[0]] : []));
  const paths = [
    ["", 1],
    ...stories.map((story) => [`/work/${story.slug}`, 0.8] as const),
    ...[...new Set(demoPaths)].map((path) => [path, 0.5] as const),
  ] as const;

  return paths.map(([path, priority]) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}

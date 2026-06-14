const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "https://just-site.win";

const resolvedSiteUrl = siteUrl.startsWith("http")
  ? siteUrl
  : `https://${siteUrl}`;

export default function sitemap() {
  return [
    {
      url: resolvedSiteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

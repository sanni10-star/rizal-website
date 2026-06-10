/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://rizal.click",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  alternateRefs: [
    { href: "https://rizal.click", hreflang: "fr-MA" },
    { href: "https://rizal.click/ar", hreflang: "ar-MA" },
    { href: "https://rizal.click/en", hreflang: "en" },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [],
  },
};

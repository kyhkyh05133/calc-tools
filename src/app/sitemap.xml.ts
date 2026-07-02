import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://your-calculator-site.vercel.app/",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://your-calculator-site.vercel.app/exchange",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://your-calculator-site.vercel.app/loan",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://your-calculator-site.vercel.app/bmi",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://your-calculator-site.vercel.app/about",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://your-calculator-site.vercel.app/privacy",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://your-calculator-site.vercel.app/terms",
      lastModified: new Date().toISOString(),
    },
  ];
}

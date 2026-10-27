import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://menuvista-hawassa.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hotel`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/qr`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/settings`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
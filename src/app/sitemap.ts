import { MetadataRoute } from 'next'
import { siteConfig } from '@/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date().toISOString().split('T')[0];

  // Primary pages
  const routes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];
  return [...routes];
}
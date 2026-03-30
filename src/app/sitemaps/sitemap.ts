export const dynamic = 'force-dynamic';

import { MetadataRoute } from 'next'
import { siteConfig } from '@/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.endsWith('/') 
    ? siteConfig.url.slice(0, -1) 
    : siteConfig.url;
  const lastModified = new Date().toISOString().split('T')[0];

  // Primary pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
  
  return routes;
}
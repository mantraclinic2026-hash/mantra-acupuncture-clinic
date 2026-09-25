import { MetadataRoute } from 'next';
import { getPublishedServices, getPublishedConditions } from '@/lib/queries/site';
import { getBaseUrl } from '@/lib/seo/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/treatments`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/conditions`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/doctor`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const services = await getPublishedServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => {
    const rawDate = s.updated_at || s.created_at;
    const lastModified = rawDate ? new Date(rawDate) : undefined;
    const isValidDate = lastModified && !isNaN(lastModified.getTime());

    return {
      url: `${baseUrl}/treatments/${s.slug}`,
      ...(isValidDate ? { lastModified } : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const conditions = await getPublishedConditions();
  const conditionRoutes: MetadataRoute.Sitemap = conditions.map((c) => {
    const rawDate = c.updated_at || c.created_at;
    const lastModified = rawDate ? new Date(rawDate) : undefined;
    const isValidDate = lastModified && !isNaN(lastModified.getTime());

    return {
      url: `${baseUrl}/conditions/${c.slug}`,
      ...(isValidDate ? { lastModified } : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...conditionRoutes];
}

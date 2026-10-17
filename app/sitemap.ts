import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shomal.news';

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/news/important`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/news/latest`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/news/popular`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.5 },
  ];

  const [news, provinces, categories] = await Promise.all([
    prisma.news.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
    prisma.province.findMany({ select: { slug: true } }),
    prisma.category.findMany({ select: { slug: true } }),
  ]);

  const newsPages: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: n.updatedAt,
    priority: 0.7,
  }));

  const provincePages: MetadataRoute.Sitemap = provinces.map((p) => ({
    url: `${baseUrl}/provinces/${p.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages, ...provincePages, ...categoryPages];
}

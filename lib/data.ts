import { prisma } from './prisma';

export async function getProvinces() {
  return prisma.province.findMany({ orderBy: { name: 'asc' } });
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export async function getHeroNews(limit = 5) {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED', featured: true },
    include: { province: true, county: true, category: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function getImportantNews(limit = 10) {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED', featured: true },
    include: { province: true, county: true, category: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function getLatestNews(limit = 10) {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED' },
    include: { province: true, county: true, category: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function getPopularNews(limit = 10) {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED' },
    include: { province: true, county: true, category: true },
    orderBy: { views: 'desc' },
    take: limit,
  });
}

export async function getBreakingNews(limit = 8) {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED', breaking: true },
    include: { province: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function getProvinceNews(provinceSlug: string, limit = 6) {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED', province: { slug: provinceSlug } },
    include: { province: true, county: true, category: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function getAdByPlacement(placement: string) {
  const now = new Date();
  return prisma.ad.findFirst({
    where: {
      placement: placement as any,
      active: true,
      OR: [{ startDate: null }, { startDate: { lte: now } }],
      AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
    },
    orderBy: { priority: 'desc' },
  });
}

export async function getNewsBySlug(slug: string) {
  return prisma.news.findUnique({
    where: { slug },
    include: { province: true, county: true, category: true, author: true },
  });
}

export async function getRelatedNews(newsId: string, categoryId: string, limit = 4) {
  return prisma.news.findMany({
    where: { status: 'PUBLISHED', categoryId, id: { not: newsId } },
    include: { province: true, county: true, category: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function incrementViews(slug: string) {
  await prisma.news.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}

import { notFound } from 'next/navigation';
import NewsListPage from '@/components/NewsListPage';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return { title: 'دسته‌بندی یافت نشد' };
  return { title: `اخبار ${category.name} | اخبار شمال`, description: `آرشیو اخبار دسته‌بندی ${category.name}` };
}

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) notFound();

  const news = await prisma.news.findMany({
    where: { status: 'PUBLISHED', categoryId: category.id },
    include: { province: true, county: true, category: true },
    orderBy: { publishedAt: 'desc' },
    take: 24,
  });

  return <NewsListPage title={`اخبار ${category.name}`} description={`آرشیو اخبار دسته‌بندی ${category.name}`} news={news as any} />;
}

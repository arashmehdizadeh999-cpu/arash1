import { notFound } from 'next/navigation';
import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const province = await prisma.province.findUnique({ where: { slug: params.slug } });
  if (!province) return { title: 'استان یافت نشد' };
  return { title: `اخبار ${province.name} | اخبار شمال`, description: `آخرین اخبار استان ${province.name}` };
}

export const revalidate = 60;

export default async function ProvincePage({ params }: { params: { slug: string } }) {
  const province = await prisma.province.findUnique({
    where: { slug: params.slug },
    include: { counties: { orderBy: { name: 'asc' } } },
  });
  if (!province) notFound();

  const [news, counties] = await Promise.all([
    prisma.news.findMany({
      where: { status: 'PUBLISHED', provinceId: province.id },
      include: { province: true, county: true, category: true },
      orderBy: { publishedAt: 'desc' },
      take: 24,
    }),
    prisma.county.findMany({
      where: { provinceId: province.id },
      orderBy: { name: 'asc' },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start gap-3">
        <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">اخبار استان {province.name}</h1>
          <p className="mt-1 text-sm text-gray-400">آخرین رویدادهای استان {province.name}</p>
        </div>
      </div>

      {/* Counties filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {counties.map((c) => (
          <Link
            key={c.id}
            href={`/search?province=${province.slug}&county=${c.slug}`}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:border-neon/30 hover:text-neon transition-colors"
          >
            {c.name}
          </Link>
        ))}
      </div>

      {news.length === 0 ? (
        <p className="text-center text-gray-400 py-20">خبری برای این استان یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}

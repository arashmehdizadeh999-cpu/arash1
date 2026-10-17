import NewsCard from '@/components/NewsCard';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface SearchParams {
  q?: string;
  province?: string;
  county?: string;
  category?: string;
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const where: any = { status: 'PUBLISHED' };
  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: 'insensitive' } },
      { summary: { contains: searchParams.q, mode: 'insensitive' } },
    ];
  }
  if (searchParams.province) where.province = { slug: searchParams.province };
  if (searchParams.county) where.county = { slug: searchParams.county };
  if (searchParams.category) where.category = { slug: searchParams.category };

  const [results, provinces, categories] = await Promise.all([
    prisma.news.findMany({
      where,
      include: { province: true, county: true, category: true },
      orderBy: { publishedAt: 'desc' },
      take: 48,
    }),
    prisma.province.findMany(),
    prisma.category.findMany(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start gap-3">
        <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">جستجوی اخبار</h1>
          <p className="mt-1 text-sm text-gray-400">
            {searchParams.q ? `نتایج جستجو برای: «${searchParams.q}»` : 'فیلتر اخبار بر اساس استان، شهرستان و دسته‌بندی'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <form action="/search" method="GET" className="mb-6 glass-card rounded-xl p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            name="q"
            type="text"
            defaultValue={searchParams.q || ''}
            placeholder="عبارت جستجو..."
            className="rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-neon/50"
          />
          <select name="province" defaultValue={searchParams.province || ''} className="rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50">
            <option value="">همه استان‌ها</option>
            {provinces.map((p) => <option key={p.id} value={p.slug}>{p.name}</option>)}
          </select>
          <select name="category" defaultValue={searchParams.category || ''} className="rounded-lg border border-white/10 bg-navy-800 px-3 py-2 text-sm text-white outline-none focus:border-neon/50">
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-neon px-4 py-2 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors">جستجو</button>
        </div>
      </form>

      <p className="mb-4 text-sm text-gray-400">{results.length} نتیجه یافت شد</p>

      {results.length === 0 ? (
        <p className="text-center text-gray-400 py-20">نتیجه‌ای یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}

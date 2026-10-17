import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatNumber } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  const session = await getSession();
  if (!session) redirect('/admin');

  if (session.role === 'COUNTY_SUPERVISOR') redirect('/admin/dashboard');

  const provinces = await prisma.province.findMany({
    include: {
      counties: true,
      _count: { select: { news: { where: { status: 'PUBLISHED' } } } },
    },
  });

  const provinceStats = await Promise.all(
    provinces.map(async (p) => {
      const [newsCount, publishedCount, pendingCount, totalViews, userCount] = await Promise.all([
        prisma.news.count({ where: { provinceId: p.id } }),
        prisma.news.count({ where: { provinceId: p.id, status: 'PUBLISHED' } }),
        prisma.news.count({ where: { provinceId: p.id, status: 'PENDING' } }),
        prisma.news.aggregate({ where: { provinceId: p.id }, _sum: { views: true } }),
        prisma.user.count({ where: { provinceId: p.id } }),
      ]);
      return {
        ...p,
        newsCount, publishedCount, pendingCount,
        totalViews: totalViews._sum.views || 0,
        userCount,
      };
    })
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">گزارش‌ها</h1>

      <div className="space-y-6">
        {provinceStats.map((p) => (
          <div key={p.id} className="glass-card rounded-xl p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="neon-line h-8 w-1 rounded-full"></span>
              <h2 className="text-lg font-bold text-white">استان {p.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              <div className="rounded-lg bg-white/5 p-3 text-center">
                <div className="text-xl font-bold text-white">{formatNumber(p.newsCount)}</div>
                <div className="text-xs text-gray-400 mt-0.5">کل اخبار</div>
              </div>
              <div className="rounded-lg bg-neon/5 p-3 text-center">
                <div className="text-xl font-bold text-neon">{formatNumber(p.publishedCount)}</div>
                <div className="text-xs text-gray-400 mt-0.5">منتشر شده</div>
              </div>
              <div className="rounded-lg bg-yellow-500/5 p-3 text-center">
                <div className="text-xl font-bold text-yellow-400">{formatNumber(p.pendingCount)}</div>
                <div className="text-xs text-gray-400 mt-0.5">در انتظار</div>
              </div>
              <div className="rounded-lg bg-blue-500/5 p-3 text-center">
                <div className="text-xl font-bold text-blue-400">{formatNumber(p.totalViews)}</div>
                <div className="text-xs text-gray-400 mt-0.5">بازدید</div>
              </div>
              <div className="rounded-lg bg-purple-500/5 p-3 text-center">
                <div className="text-xl font-bold text-purple-400">{formatNumber(p.userCount)}</div>
                <div className="text-xs text-gray-400 mt-0.5">کاربران</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.counties.map((c) => (
                <span key={c.id} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-400">{c.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

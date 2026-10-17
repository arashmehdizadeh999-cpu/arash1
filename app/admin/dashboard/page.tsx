import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatNumber, formatDateTime } from '@/lib/utils';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/admin');

  // Build where clause based on role
  const where: any = {};
  if (session.role === 'COUNTY_SUPERVISOR') {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    where.countyId = user?.countyId;
  } else if (session.role === 'PROVINCIAL_ADMIN') {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    where.provinceId = user?.provinceId;
  }

  const [totalNews, publishedNews, pendingNews, draftNews, totalViews, totalAds, recentLogs] = await Promise.all([
    prisma.news.count({ where }),
    prisma.news.count({ where: { ...where, status: 'PUBLISHED' } }),
    prisma.news.count({ where: { ...where, status: 'PENDING' } }),
    prisma.news.count({ where: { ...where, status: 'DRAFT' } }),
    prisma.news.aggregate({ where, _sum: { views: true } }),
    prisma.ad.count(),
    prisma.activityLog.findMany({ take: 10, orderBy: { createdAt: 'desc' }, include: { user: true } }),
  ]);

  const stats = [
    { label: 'کل اخبار', value: formatNumber(totalNews), color: 'text-white', bg: 'bg-white/5' },
    { label: 'منتشر شده', value: formatNumber(publishedNews), color: 'text-neon', bg: 'bg-neon/5' },
    { label: 'در انتظار تأیید', value: formatNumber(pendingNews), color: 'text-yellow-400', bg: 'bg-yellow-500/5' },
    { label: 'پیش‌نویس', value: formatNumber(draftNews), color: 'text-gray-400', bg: 'bg-white/5' },
    { label: 'کل بازدید', value: formatNumber(totalViews._sum.views || 0), color: 'text-blue-400', bg: 'bg-blue-500/5' },
    { label: 'تبلیغات', value: formatNumber(totalAds), color: 'text-purple-400', bg: 'bg-purple-500/5' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">داشبورد</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className={`glass-card rounded-xl p-4 ${s.bg}`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="mt-1 text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
            <span className="h-4 w-1 rounded-full bg-neon"></span>
            فعالیت‌های اخیر
          </h2>
          {recentLogs.length === 0 ? (
            <p className="text-sm text-gray-500">فعالیتی ثبت نشده است.</p>
          ) : (
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neon/10">
                    <svg className="h-4 w-4 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-gray-300">{log.details}</div>
                    <div className="text-xs text-gray-500">{log.user.name} · {formatDateTime(log.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
            <span className="h-4 w-1 rounded-full bg-neon"></span>
            میانبرها
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <a href="/admin/news/new" className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 hover:border-neon/30 transition-colors">
              <svg className="h-6 w-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M12 4v16m8-8H4"/></svg>
              <span className="text-xs text-gray-300">خبر جدید</span>
            </a>
            <a href="/admin/news" className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 hover:border-neon/30 transition-colors">
              <svg className="h-6 w-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"/></svg>
              <span className="text-xs text-gray-300">مدیریت اخبار</span>
            </a>
            <a href="/admin/ads" className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 hover:border-neon/30 transition-colors">
              <svg className="h-6 w-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13l3-3m0 0l-3-3m3 3H7"/></svg>
              <span className="text-xs text-gray-300">تبلیغات</span>
            </a>
            <a href="/admin/reports" className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 hover:border-neon/30 transition-colors">
              <svg className="h-6 w-6 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z"/></svg>
              <span className="text-xs text-gray-300">گزارش‌ها</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

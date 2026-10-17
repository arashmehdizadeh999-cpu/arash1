import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatDateTime, formatNumber } from '@/lib/utils';
import NewsActions from '@/components/admin/NewsActions';

export const dynamic = 'force-dynamic';

export default async function NewsManagePage() {
  const session = await getSession();
  if (!session) redirect('/admin');

  const where: any = {};
  if (session.role === 'COUNTY_SUPERVISOR') {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    where.countyId = user?.countyId;
  } else if (session.role === 'PROVINCIAL_ADMIN') {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    where.provinceId = user?.provinceId;
  }

  const news = await prisma.news.findMany({
    where,
    include: { province: true, county: true, category: true, author: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const statusLabels: Record<string, { label: string; color: string }> = {
    PUBLISHED: { label: 'منتشر شده', color: 'bg-neon/10 text-neon border-neon/20' },
    PENDING: { label: 'در انتظار', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    DRAFT: { label: 'پیش‌نویس', color: 'bg-white/5 text-gray-400 border-white/10' },
    SCHEDULED: { label: 'زمان‌بندی', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">مدیریت اخبار</h1>
        <Link href="/admin/news/new" className="flex items-center gap-2 rounded-lg bg-neon px-4 py-2 text-sm font-bold text-navy-950 hover:bg-neon/90 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 4v16m8-8H4"/></svg>
          خبر جدید
        </Link>
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/5 bg-white/5">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-400">عنوان</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden sm:table-cell">استان</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden md:table-cell">دسته</th>
                <th className="px-4 py-3 font-medium text-gray-400">وضعیت</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">بازدید</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">تاریخ</th>
                <th className="px-4 py-3 font-medium text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0">
                        <Image fill src={item.image} alt={item.title} sizes="56px" className="rounded object-cover" />
                      </div>
                      <span className="text-white line-clamp-1 max-w-[200px]">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300 hidden sm:table-cell">{item.province.name}</td>
                  <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{item.category.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md border px-2 py-0.5 text-xs ${statusLabels[item.status]?.color || ''}`}>
                      {statusLabels[item.status]?.label || item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{formatNumber(item.views)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{formatDateTime(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <NewsActions id={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {news.length === 0 && <p className="py-12 text-center text-gray-500">خبری یافت نشد.</p>}
      </div>
    </div>
  );
}

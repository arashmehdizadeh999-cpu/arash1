import { redirect } from 'next/navigation';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatNumber, formatDateTime } from '@/lib/utils';
import AdForm from '@/components/admin/AdForm';
import AdActions from '@/components/admin/AdActions';

export const dynamic = 'force-dynamic';

export default async function AdsPage() {
  const session = await getSession();
  if (!session) redirect('/admin');

  if (session.role === 'COUNTY_SUPERVISOR') {
    redirect('/admin/dashboard');
  }

  const [ads, provinces] = await Promise.all([
    prisma.ad.findMany({ include: { province: true, county: true }, orderBy: { createdAt: 'desc' } }),
    prisma.province.findMany(),
  ]);

  const placementLabels: Record<string, string> = {
    HERO_BANNER: 'بنر اصلی',
    BETWEEN_SECTIONS: 'بین بخش‌ها',
    ARTICLE_SIDEBAR: 'کنار خبر',
    CATEGORY_PAGE: 'صفحه دسته‌بندی',
    MOBILE: 'موبایل',
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">مدیریت تبلیغات</h1>

      <div className="mb-8 glass-card rounded-2xl p-6">
        <h2 className="mb-4 text-sm font-bold text-white">تبلیغ جدید</h2>
        <AdForm provinces={JSON.parse(JSON.stringify(provinces))} />
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/5 bg-white/5">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-400">عنوان</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden md:table-cell">جایگاه</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">نمایش</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">کلیک</th>
                <th className="px-4 py-3 font-medium text-gray-400">وضعیت</th>
                <th className="px-4 py-3 font-medium text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 shrink-0">
                        <Image fill src={ad.image} alt={ad.title} sizes="64px" className="rounded object-cover" />
                      </div>
                      <div>
                        <div className="text-white">{ad.title}</div>
                        {ad.province && <div className="text-xs text-gray-500">{ad.province.name}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{placementLabels[ad.placement]}</td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{formatNumber(ad.impressions)}</td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{formatNumber(ad.clicks)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md border px-2 py-0.5 text-xs ${ad.active ? 'bg-neon/10 text-neon border-neon/20' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                      {ad.active ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="px-4 py-3"><AdActions id={ad.id} active={ad.active} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {ads.length === 0 && <p className="py-12 text-center text-gray-500">تبلیغی یافت نشد.</p>}
      </div>
    </div>
  );
}

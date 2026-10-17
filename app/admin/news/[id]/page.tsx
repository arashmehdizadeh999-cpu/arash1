import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import NewsForm from '@/components/admin/NewsForm';

export const dynamic = 'force-dynamic';

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect('/admin');

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  const news = await prisma.news.findUnique({
    where: { id: params.id },
    include: { province: true, county: true, category: true },
  });

  if (!news) redirect('/admin/news');

  // Permission check
  if (session.role === 'COUNTY_SUPERVISOR' && news.provinceId !== user?.provinceId) {
    redirect('/admin/news');
  }
  if (session.role === 'PROVINCIAL_ADMIN' && news.provinceId !== user?.provinceId) {
    redirect('/admin/news');
  }

  const [provinces, counties, categories] = await Promise.all([
    prisma.province.findMany(),
    prisma.county.findMany(),
    prisma.category.findMany(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">ویرایش خبر</h1>
      <div className="glass-card rounded-2xl p-6">
        <NewsForm
          provinces={provinces}
          counties={counties}
          categories={categories}
          news={JSON.parse(JSON.stringify(news))}
          userRole={session.role}
          userProvinceId={user?.provinceId || undefined}
          userCountyId={user?.countyId || undefined}
        />
      </div>
    </div>
  );
}

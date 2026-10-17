import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import NewsForm from '@/components/admin/NewsForm';

export const dynamic = 'force-dynamic';

export default async function NewNewsPage() {
  const session = await getSession();
  if (!session) redirect('/admin');

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  const [provinces, counties, categories] = await Promise.all([
    prisma.province.findMany(),
    prisma.county.findMany(),
    prisma.category.findMany(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">خبر جدید</h1>
      <div className="glass-card rounded-2xl p-6">
        <NewsForm
          provinces={provinces}
          counties={counties}
          categories={categories}
          userRole={session.role}
          userProvinceId={user?.provinceId || undefined}
          userCountyId={user?.countyId || undefined}
        />
      </div>
    </div>
  );
}

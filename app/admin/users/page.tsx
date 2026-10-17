import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatDateTime } from '@/lib/utils';
import UserForm from '@/components/admin/UserForm';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const session = await getSession();
  if (!session) redirect('/admin');

  if (session.role === 'COUNTY_SUPERVISOR') redirect('/admin/dashboard');

  const [users, provinces, counties] = await Promise.all([
    prisma.user.findMany({ include: { province: true, county: true }, orderBy: { createdAt: 'desc' } }),
    prisma.province.findMany(),
    prisma.county.findMany(),
  ]);

  const roleLabels: Record<string, string> = {
    SUPER_ADMIN: 'مدیر کل',
    PROVINCIAL_ADMIN: 'مدیر استانی',
    COUNTY_SUPERVISOR: 'سرپرست شهرستانی',
  };
  const roleColors: Record<string, string> = {
    SUPER_ADMIN: 'bg-neon/10 text-neon border-neon/20',
    PROVINCIAL_ADMIN: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    COUNTY_SUPERVISOR: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">مدیریت کاربران</h1>

      {session.role === 'SUPER_ADMIN' && (
        <div className="mb-8 glass-card rounded-2xl p-6">
          <h2 className="mb-4 text-sm font-bold text-white">کاربر جدید</h2>
          <UserForm provinces={JSON.parse(JSON.stringify(provinces))} counties={JSON.parse(JSON.stringify(counties))} />
        </div>
      )}

      <div className="glass-card overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/5 bg-white/5">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-400">نام</th>
                <th className="px-4 py-3 font-medium text-gray-400">ایمیل</th>
                <th className="px-4 py-3 font-medium text-gray-400">نقش</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden md:table-cell">استان</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">شهرستان</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{u.name}</td>
                  <td className="px-4 py-3 text-gray-400" dir="ltr">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md border px-2 py-0.5 text-xs ${roleColors[u.role]}`}>{roleLabels[u.role]}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{u.province?.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-300 hidden lg:table-cell">{u.county?.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{formatDateTime(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

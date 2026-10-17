import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    return <div className="min-h-screen bg-navy-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <AdminSidebar session={session} />
      <div className="lg:pr-64">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">{children}</div>
      </div>
    </div>
  );
}

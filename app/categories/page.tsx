import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { news: { where: { status: 'PUBLISHED' } } } } },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start gap-3">
        <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">آرشیو دسته‌بندی‌ها</h1>
          <p className="mt-1 text-sm text-gray-400">اخبار بر اساس دسته‌بندی موضوعی</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="glass-card group flex flex-col items-center justify-center gap-2 rounded-xl p-6 text-center hover:border-neon/30 transition-colors"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neon/10 border border-neon/20 group-hover:bg-neon/20 transition-colors">
              <span className="text-2xl font-bold text-neon">{cat._count.news}</span>
            </div>
            <span className="text-sm font-medium text-white group-hover:text-neon transition-colors">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

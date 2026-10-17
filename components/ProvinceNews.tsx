import Link from 'next/link';
import NewsCard from './NewsCard';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  views: number;
  publishedAt: Date | string | null;
  createdAt?: Date;
  province: { name: string };
  county: { name: string } | null;
  category: { name: string };
}

interface ProvinceNewsProps {
  provinceName: string;
  provinceSlug: string;
  news: NewsItem[];
}

export default function ProvinceNews({ provinceName, provinceSlug, news }: ProvinceNewsProps) {
  if (news.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">اخبار {provinceName}</h2>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">آخرین رویدادهای استان {provinceName}</p>
          </div>
        </div>
        <Link
          href={`/provinces/${provinceSlug}`}
          className="text-xs text-neon hover:text-neon/80 transition-colors shrink-0"
        >
          مشاهده همه ←
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.slice(0, 3).map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
}

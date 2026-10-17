import Link from 'next/link';
import { formatDate, formatNumber } from '@/lib/utils';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  views: number;
  publishedAt: Date | string | null;
  province: { name: string };
  category: { name: string };
}

export default function SuggestedContent({ news }: { news: NewsItem[] }) {
  if (news.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">مطالب پیشنهادی</h2>
          <p className="mt-1 text-xs text-gray-400 sm:text-sm">پیشنهاد مطالعه برای شما</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {news.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`} className="news-card group block overflow-hidden rounded-xl glass-card">
            <div className="relative aspect-square overflow-hidden">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-2.5">
              <h3 className="text-xs font-medium text-white line-clamp-2 group-hover:text-neon transition-colors">{item.title}</h3>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-500">
                <span className="text-neon/60">{item.province.name}</span>
                <span>{formatNumber(item.views)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

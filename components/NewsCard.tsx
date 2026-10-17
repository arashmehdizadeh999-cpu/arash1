import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatNumber } from '@/lib/utils';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  views: number;
  publishedAt: Date | string | null;
  province: { name: string };
  county: { name: string } | null;
  category: { name: string };
}

export default function NewsCard({ news, variant = 'default' }: { news: NewsItem; variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <Link href={`/news/${news.slug}`} className="news-card group flex gap-3 rounded-xl glass-card p-3 overflow-hidden">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
          <Image fill src={news.image} alt={news.title} sizes="112px" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="mb-1 text-[10px] text-neon/80">{news.category.name}</span>
          <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-neon transition-colors">{news.title}</h3>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-500">
            <span>{news.province.name}</span>
            <span>·</span>
            <span>{formatNumber(news.views)} بازدید</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${news.slug}`} className="news-card group block overflow-hidden rounded-xl glass-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image fill src={news.image} alt={news.title} sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
        <div className="absolute top-2 right-2">
          <span className="rounded-md bg-neon/90 px-2 py-0.5 text-[10px] font-bold text-navy-950 backdrop-blur-sm">
            {news.category.name}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="mb-2 text-sm font-bold text-white line-clamp-2 group-hover:text-neon transition-colors sm:text-base">
          {news.title}
        </h3>
        <p className="mb-3 text-xs text-gray-400 line-clamp-2 sm:text-sm">{news.summary}</p>
        <div className="flex items-center justify-between text-[10px] text-gray-500 sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-neon/70">{news.province.name}</span>
            {news.county && <span>· {news.county.name}</span>}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {formatNumber(news.views)}
            </span>
            <span>{formatDate(news.publishedAt || news.createdAt || new Date())}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

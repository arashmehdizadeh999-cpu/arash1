import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsBySlug, getRelatedNews, incrementViews, getAdByPlacement } from '@/lib/data';
import { formatDate, formatDateTime, formatNumber } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';
import NewsCard from '@/components/NewsCard';
import ShareButtons from '@/components/ShareButtons';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const news = await getNewsBySlug(params.slug);
  if (!news) return { title: 'خبر یافت نشد' };
  return {
    title: `${news.title} | اخبار شمال`,
    description: news.summary,
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await getNewsBySlug(params.slug);
  if (!news || news.status !== 'PUBLISHED') notFound();

  await incrementViews(news.slug);
  const [related, sidebarAd] = await Promise.all([
    getRelatedNews(news.id, news.categoryId, 4),
    getAdByPlacement('ARTICLE_SIDEBAR'),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.summary,
    image: news.image,
    datePublished: news.publishedAt,
    author: { '@type': 'Person', name: news.author.name },
    publisher: { '@type': 'Organization', name: 'اخبار شمال' },
  };

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-neon">صفحه اصلی</Link>
        <span>/</span>
        <Link href={`/provinces/${news.province.slug}`} className="hover:text-neon">{news.province.name}</Link>
        <span>/</span>
        <span className="text-gray-300">{news.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-neon px-2.5 py-1 text-xs font-bold text-navy-950">{news.category.name}</span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">{news.province.name}</span>
            {news.county && <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">{news.county.name}</span>}
          </div>

          <h1 className="mb-4 text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">{news.title}</h1>
          <p className="mb-5 text-base text-gray-400 sm:text-lg">{news.summary}</p>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/5 py-3">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {news.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {formatDateTime(news.publishedAt || news.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-neon/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {formatNumber(news.views + 1)} بازدید
              </span>
            </div>
            <ShareButtons title={news.title} slug={news.slug} />
          </div>

          <div className="mb-8 overflow-hidden rounded-2xl">
            <img src={news.image} alt={news.title} className="w-full object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            {news.content.split('\n').map((para, i) => (
              <p key={i} className="mb-4 text-sm leading-8 text-gray-300 sm:text-base">{para}</p>
            ))}
          </div>

          {/* Tags */}
          {news.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">برچسب‌ها:</span>
              {news.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 hover:border-neon/30 hover:text-neon transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Gallery */}
          {news.gallery.length > 1 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold text-white">گالری تصاویر</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {news.gallery.map((img, i) => (
                  <div key={i} className="overflow-hidden rounded-lg aspect-[4/3]">
                    <img src={img} alt={`${news.title} - تصویر ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {sidebarAd && <AdBanner ad={sidebarAd} ratio="aspect-[2/3]" />}

          <div className="glass-card rounded-xl p-4">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
              <span className="h-4 w-1 rounded-full bg-neon"></span>
              اخبار مرتبط
            </h3>
            <div className="space-y-3">
              {related.map((item) => (
                <NewsCard key={item.id} news={item} variant="compact" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

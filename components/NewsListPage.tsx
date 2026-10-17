import NewsCard from '@/components/NewsCard';

interface NewsListProps {
  title: string;
  description: string;
  news: any[];
}

export default function NewsListPage({ title, description, news }: NewsListProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start gap-3">
        <span className="neon-line h-12 w-1 rounded-full shrink-0"></span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>
      </div>
      {news.length === 0 ? (
        <p className="text-center text-gray-400 py-20">خبری در این بخش یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((item: any) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}

import NewsListPage from '@/components/NewsListPage';
import { getLatestNews } from '@/lib/data';

export const revalidate = 60;

export default async function Page() {
  const news = await getLatestNews(24);
  return <NewsListPage title="آخرین اخبار" description="به‌روزترین خبرهای منتشر شده" news={news as any} />;
}

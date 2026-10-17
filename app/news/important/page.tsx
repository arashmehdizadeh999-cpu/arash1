import NewsListPage from '@/components/NewsListPage';
import { getImportantNews } from '@/lib/data';

export const revalidate = 60;

export default async function Page() {
  const news = await getImportantNews(24);
  return <NewsListPage title="اخبار مهم و منتخب" description="مهم‌ترین رویدادهای سه استان شمالی کشور" news={news as any} />;
}

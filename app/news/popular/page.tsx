import NewsListPage from '@/components/NewsListPage';
import { getPopularNews } from '@/lib/data';

export const revalidate = 60;

export default async function Page() {
  const news = await getPopularNews(24);
  return <NewsListPage title="پربازدیدترین اخبار" description="پرطرفدارترین مطالب از نگاه مخاطبان" news={news as any} />;
}

import HeroSlider from '@/components/HeroSlider';
import BreakingNews from '@/components/BreakingNews';
import NewsSlider from '@/components/NewsSlider';
import AdBanner from '@/components/AdBanner';
import ProvinceNews from '@/components/ProvinceNews';
import SuggestedContent from '@/components/SuggestedContent';
import {
  getHeroNews,
  getImportantNews,
  getLatestNews,
  getPopularNews,
  getBreakingNews,
  getProvinceNews,
  getAdByPlacement,
} from '@/lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const [heroNews, importantNews, latestNews, popularNews, breakingNews, gilanNews, golestanNews, mazandaranNews, heroAd, betweenAd, suggested] = await Promise.all([
    getHeroNews(5),
    getImportantNews(10),
    getLatestNews(10),
    getPopularNews(10),
    getBreakingNews(8),
    getProvinceNews('gilan', 3),
    getProvinceNews('golestan', 3),
    getProvinceNews('mazandaran', 3),
    getAdByPlacement('HERO_BANNER'),
    getAdByPlacement('BETWEEN_SECTIONS'),
    getPopularNews(6),
  ]);

  return (
    <>
      <HeroSlider slides={heroNews as any} />
      <BreakingNews items={breakingNews as any} />

      {heroAd && <AdBanner ad={heroAd} className="py-6" ratio="aspect-[16/4]" />}

      <NewsSlider
        title="اخبار مهم و منتخب"
        description="مهم‌ترین رویدادهای سه استان شمالی کشور"
        news={importantNews as any}
      />

      <NewsSlider
        title="جدیدترین اخبار"
        description="به‌روزترین خبرهای منتشر شده"
        news={latestNews as any}
      />

      {betweenAd && <AdBanner ad={betweenAd} className="py-6" ratio="aspect-[16/3]" />}

      <NewsSlider
        title="پربازدیدترین اخبار"
        description="پرطرفدارترین مطالب از نگاه مخاطبان"
        news={popularNews as any}
      />

      <ProvinceNews provinceName="گیلان" provinceSlug="gilan" news={gilanNews as any} />
      <ProvinceNews provinceName="گلستان" provinceSlug="golestan" news={golestanNews as any} />
      <ProvinceNews provinceName="مازندران" provinceSlug="mazandaran" news={mazandaranNews as any} />

      <SuggestedContent news={suggested as any} />
    </>
  );
}

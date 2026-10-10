import Hero from '@/components/Hero';
import BenefitsStrip from '@/components/BenefitsStrip';
import CategorySection from '@/components/CategorySection';
import NewArrivals from '@/components/NewArrivals';
import FeaturedCollection from '@/components/FeaturedCollection';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsStrip />
      <CategorySection />
      <NewArrivals />
      <FeaturedCollection />
      <BrandStory />
      <Newsletter />
    </>
  );
}

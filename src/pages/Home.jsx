import Hero from '../sections/Hero'
import FeaturedCollections from '../sections/FeaturedCollections'
import SelectedProjects from '../sections/SelectedProjects'
import DesignPhilosophy from '../sections/DesignPhilosophy'
import MaterialsFinishes from '../sections/MaterialsFinishes'
import OurProcess from '../sections/OurProcess'
import WhyChooseUs from '../sections/WhyChooseUs'
import Testimonials from '../sections/Testimonials'
import ConsultationCTA from '../components/ConsultationCTA'
import JournalPreview from '../sections/JournalPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <SelectedProjects />
      <DesignPhilosophy />
      <MaterialsFinishes />
      <OurProcess />
      <WhyChooseUs />
      <Testimonials />
      <ConsultationCTA />
      <JournalPreview />
    </>
  )
}

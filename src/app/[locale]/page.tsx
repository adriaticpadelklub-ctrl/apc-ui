import { setRequestLocale } from 'next-intl/server';
import { Hero, About, Courts, Services, EquipmentRental, Coaches, Testimonials, FAQ, GallerySection, CTA } from '@/components/sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Courts />
      <Services />
      <EquipmentRental />
      <Coaches />
      <Testimonials />
      <GallerySection />
      <FAQ />
      <CTA />
    </>
  );
}

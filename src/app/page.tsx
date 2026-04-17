import { Hero, About, Courts, Services, Coaches, Testimonials, CTA, FAQ } from '@/components/sections';

export default function Home() {
  return (
    <>
      {/* Hero Section - Dark Theme */}
      <Hero />

      {/* About Preview Section - Light Theme */}
      <About />

      {/* Courts Showcase Section - Dark Theme */}
      <Courts />

      {/* Services/Features Section - Light Theme */}
      <Services />

      {/* Coaches Section - Dark Theme */}
      <Coaches />

      {/* Testimonials Section - Light Theme */}
      <Testimonials />

      {/* CTA/Membership Preview Section - Dark Theme with Lime Accent */}
      <CTA />

      {/* FAQ Accordion Section - Light Theme */}
      <FAQ />
    </>
  );
}

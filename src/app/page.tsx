import { Hero, About, Courts, Services, FAQ } from '@/components/sections';

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

      {/* FAQ Accordion Section - Light Theme */}
      <FAQ />
    </>
  );
}

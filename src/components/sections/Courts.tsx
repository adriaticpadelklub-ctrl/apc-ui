'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

export function Courts() {
  const t = useTranslations('courts');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const courts = [
    { id: 1, name: 'Teren 1', typeKey: 'premiumIndoor', features: ['Full panoramic'], image: '/images/club-images/teren-1.jpg' },
    { id: 2, name: 'Teren 2', typeKey: 'premiumIndoor', features: ['Full panoramic'], image: '/images/club-images/teren-2.jpg' },
    { id: 3, name: 'Teren 3', typeKey: 'premiumIndoor', features: ['Full panoramic'], image: '/images/club-images/teren-3.jpg' },
    { id: 4, name: 'Teren 4', typeKey: 'premiumIndoor', features: ['Full panoramic'], image: '/images/club-images/teren-4.jpg' },
    { id: 5, name: 'Teren 5', typeKey: 'premiumIndoor', features: ['Full panoramic'], image: '/images/club-images/teren-5.jpg' },
    { id: 6, name: 'Teren 6', typeKey: 'premium1v1', features: ['Full panoramic'], image: '/images/club-images/single-teren.jpg' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      titleKey: 'led',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      titleKey: 'indoor',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      titleKey: 'equipment',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll('.animate-header');
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-teal overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-header inline-block text-sm font-semibold uppercase tracking-widest text-lime mb-4">
            {t('label')}
          </span>
          <h2 className="animate-header font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t('title')}
          </h2>
          <p className="animate-header text-lg text-white/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-lime/20 flex items-center justify-center text-lime mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                {t(`features.${feature.titleKey}.title`)}
              </h3>
              <p className="text-white/60 text-sm">
                {t(`features.${feature.titleKey}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Courts List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courts.map((court) => (
            <div
              key={court.id}
              className="feature-card bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-lime/30 transition-all duration-300 group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={court.image}
                  alt={court.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-lime flex items-center justify-center font-heading text-lg font-bold text-teal flex-shrink-0">
                      {court.id}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {court.name}
                      </h3>
                      <p className="text-lime text-sm font-medium">
                        {t(`courtTypes.${court.typeKey}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button href={BOOKING_URL} external variant="lime" size="lg">
            {t('bookCourt')}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}

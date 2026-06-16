'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

export function CTA() {
  const t = useTranslations('cta');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-item');
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
              trigger: contentRef.current,
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
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-lime relative overflow-hidden"
    >
      <div className="container-main relative">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          <h2 className="animate-item font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-teal leading-tight mb-6">
            {t('title')}
          </h2>
          <p className="animate-item text-lg text-teal/70 leading-relaxed mb-10">
            {t('subtitle')}
          </p>
          <div className="animate-item">
            <Button href={BOOKING_URL} external variant="secondary" size="lg">
              {t('button')}
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
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

export function EquipmentRental() {
  const t = useTranslations('equipmentRental');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-item');
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-teal overflow-hidden">
      <div className="container-main">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src="/images/nox-racket.jpg"
                alt="NOX padel reket"
                fill
                className="object-cover object-[center_70%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div ref={contentRef} className="p-8 md:p-12">
              <span className="animate-item inline-block text-sm font-semibold uppercase tracking-widest text-teal/60 mb-3">
                {t('label')}
              </span>
              <h2 className="animate-item font-heading text-3xl md:text-4xl font-bold text-teal leading-tight mb-4">
                {t('title')}
              </h2>
              <p className="animate-item text-teal/70 leading-relaxed mb-6">
                {t('description')}
              </p>

              {/* Pricing */}
              <div className="animate-item flex flex-wrap gap-4 mb-8">
                <div className="bg-teal/5 rounded-xl px-5 py-3">
                  <span className="block text-sm text-teal/60">{t('basic')}</span>
                  <span className="font-heading text-2xl font-bold text-teal">3€</span>
                </div>
                <div className="bg-lime/20 rounded-xl px-5 py-3">
                  <span className="block text-sm text-teal/60">{t('premium')}</span>
                  <span className="font-heading text-2xl font-bold text-teal">5€</span>
                </div>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-item inline-flex items-center gap-2 text-teal font-semibold hover:text-lime transition-colors"
              >
                {t('cta')}
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

interface Coach {
  id: number;
  name: string;
  image: string;
}

const coaches: Coach[] = [
  {
    id: 1,
    name: 'Matija Selak',
    image: '/images/trainers/matija-selak.jpg',
  },
  {
    id: 2,
    name: 'Grgo Dujmović',
    image: '/images/trainers/grgo-dujmović.jpg',
  },
  {
    id: 3,
    name: 'Jerko Brkić',
    image: '/images/trainers/jerko-brkić.JPG',
  },
];

interface CoachCardProps {
  coach: Coach;
  index: number;
}

function CoachCard({ coach, index }: CoachCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        <Image
          src={coach.image}
          alt={coach.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal via-transparent to-transparent opacity-60" />

        {/* Lime Accent on Hover */}
        <div className="absolute inset-0 bg-lime/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Coach Name at Bottom */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="font-heading text-2xl font-bold text-white group-hover:text-lime transition-colors duration-300">
            {coach.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function Coaches() {
  const t = useTranslations('coaches');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {coaches.map((coach, index) => (
            <CoachCard key={coach.id} coach={coach} index={index} />
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-lg">
            {t('cta')}{' '}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:underline font-medium"
            >
              {t('ctaLink')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

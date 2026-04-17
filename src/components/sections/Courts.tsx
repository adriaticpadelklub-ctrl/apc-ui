'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const BOOKING_URL = 'https://playtomic.io';

interface Court {
  id: number;
  name: string;
  type: 'indoor' | 'outdoor';
  surface: string;
  image: string;
  features: string[];
}

const courts: Court[] = [
  {
    id: 1,
    name: 'Teren 1 - Premium',
    type: 'indoor',
    surface: 'Umjetna trava',
    image: '/images/vincenzo-morelli-Cj35lHL4atY-unsplash.jpg',
    features: ['LED rasvjeta', 'Klimatizacija', 'Panoramski pogled'],
  },
  {
    id: 2,
    name: 'Teren 2 - Premium',
    type: 'indoor',
    surface: 'Umjetna trava',
    image: '/images/vincenzo-morelli-WnxmzCNuDmU-unsplash.jpg',
    features: ['LED rasvjeta', 'Klimatizacija', 'Tribine'],
  },
  {
    id: 3,
    name: 'Teren 3 - Outdoor',
    type: 'outdoor',
    surface: 'Umjetna trava',
    image: '/images/vincenzo-morelli-aYTK2HNocNw-unsplash.jpg',
    features: ['Noćna rasvjeta', 'Pogled na more', 'Parking'],
  },
  {
    id: 4,
    name: 'Teren 4 - Outdoor',
    type: 'outdoor',
    surface: 'Umjetna trava',
    image: '/images/cal-gao-CA3laY8sok0-unsplash.jpg',
    features: ['Noćna rasvjeta', 'Za natjecanja', 'Tribine'],
  },
];

interface CourtCardProps {
  court: Court;
  index: number;
}

function CourtCard({ court, index }: CourtCardProps) {
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
            delay: index * 0.1,
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
      className="group relative rounded-3xl overflow-hidden bg-teal-light cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={court.image}
          alt={court.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Dark overlay that lightens on hover */}
        <div className="absolute inset-0 bg-black/40 transition-all duration-500 group-hover:bg-black/20" />

        {/* Lime accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Large Court Number */}
      <div className="absolute top-4 right-4 font-heading text-7xl font-black text-white/10 leading-none select-none">
        {String(court.id).padStart(2, '0')}
      </div>

      {/* Type Badge */}
      <div
        className={cn(
          'absolute top-5 left-5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest',
          court.type === 'indoor'
            ? 'bg-lime text-teal'
            : 'bg-white text-teal'
        )}
      >
        {court.type === 'indoor' ? 'Indoor' : 'Outdoor'}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-12 transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="font-heading text-2xl md:text-3xl font-black text-white mb-1 leading-tight">
          {court.name.split(' - ')[0]}
        </h3>
        <p className="text-lime font-semibold text-sm uppercase tracking-wide mb-4">
          {court.name.split(' - ')[1] || court.surface}
        </p>

        {/* CTA appears on hover */}
        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            href={BOOKING_URL}
            external
            variant="lime"
            size="sm"
            fullWidth
          >
            Rezerviraj odmah
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Courts() {
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
        <div ref={headerRef} className="max-w-3xl mb-16">
          <span className="animate-header inline-block text-sm font-semibold uppercase tracking-widest text-lime mb-4">
            Naši tereni
          </span>
          <h2 className="animate-header font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Vrhunski tereni za nezaboravnu igru
          </h2>
          <p className="animate-header text-lg text-white/70 leading-relaxed">
            Raspolažemo s 6 profesionalnih terena opremljenih najmodernijom tehnologijom.
            Bilo da preferirate indoor ili outdoor iskustvo, imamo savršen teren za vas.
          </p>
        </div>

        {/* Courts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courts.map((court, index) => (
            <CourtCard key={court.id} court={court} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Svi tereni dostupni za rezervaciju 7 dana unaprijed
          </p>
          <Button href={BOOKING_URL} external variant="lime" size="lg">
            Pogledaj dostupnost
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

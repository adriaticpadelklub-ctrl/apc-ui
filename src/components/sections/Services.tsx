'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const services: Service[] = [
  {
    title: 'Rezervacija Terena',
    description:
      'Rezervirajte teren online u samo nekoliko klikova. Dostupni termini 7 dana unaprijed.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    href: '/tereni',
    color: 'from-lime/20 to-lime/5',
  },
  {
    title: 'Padel Akademija',
    description:
      'Profesionalni programi za sve razine - od početnika do naprednih igrača.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    href: '/akademija',
    color: 'from-teal/20 to-teal/5',
  },
  {
    title: 'Privatni Treninzi',
    description:
      'Individualni pristup s našim certificiranim trenerima za brži napredak.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    href: '/akademija',
    color: 'from-lime/20 to-lime/5',
  },
  {
    title: 'Turniri i Lige',
    description:
      'Natjecajte se s igračima vaše razine u redovnim turnirima i amaterskim ligama.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    href: '/tereni',
    color: 'from-teal/20 to-teal/5',
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 40, opacity: 0 },
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
    <Link
      ref={cardRef}
      href={service.href}
      className={cn(
        'group relative p-8 rounded-2xl transition-all duration-500',
        'bg-white hover:shadow-xl hover:-translate-y-2',
        'border border-teal/5 hover:border-lime'
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          `bg-gradient-to-br ${service.color}`
        )}
      />

      {/* Content */}
      <div className="relative">
        {/* Icon */}
        <div className="w-16 h-16 rounded-xl bg-teal/5 flex items-center justify-center text-teal mb-6 transition-colors duration-500 group-hover:bg-lime group-hover:text-teal">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-teal mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-teal/70 leading-relaxed mb-6">{service.description}</p>

        {/* Arrow */}
        <div className="flex items-center gap-2 text-teal font-medium">
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            Saznaj više
          </span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
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
        </div>
      </div>
    </Link>
  );
}

export function Services() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-beige overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-header inline-block text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4">
            Usluge
          </span>
          <h2 className="animate-header font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-teal leading-tight mb-6">
            Sve što trebate za savršenu igru
          </h2>
          <p className="animate-header text-lg text-teal/70 leading-relaxed">
            Od rezervacije terena do profesionalnih treninga - imamo sve što vam treba
            za razvoj vaše padel igre.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

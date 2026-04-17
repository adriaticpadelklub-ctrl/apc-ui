'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useCounter } from '@/hooks/useGSAP';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatItem({ value, suffix = '', label }: StatProps) {
  const counterRef = useCounter(value, { suffix });

  return (
    <div className="text-center">
      <div className="font-heading text-4xl md:text-5xl font-bold text-lime mb-2">
        <span ref={counterRef}>0</span>
      </div>
      <p className="text-white/70 text-sm uppercase tracking-wider">{label}</p>
    </div>
  );
}

const stats = [
  { value: 6, suffix: '', label: 'Terena' },
  { value: 5, suffix: '+', label: 'Godina iskustva' },
  { value: 500, suffix: '+', label: 'Aktivnih članova' },
  { value: 20, suffix: '+', label: 'Turnira godišnje' },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content fade in
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
              start: 'top 75%',
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/vincenzo-morelli-aYTK2HNocNw-unsplash.jpg"
              alt="Igrači padela na terenu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal/40 to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-lime flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-teal">Premium Kvaliteta</p>
                  <p className="text-sm text-teal/70">Najbolji tereni na Jadranu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="animate-item inline-block text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4">
              O nama
            </span>
            <h2 className="animate-item font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
              Dobrodošli u Adriatic Padel Club
            </h2>
            <p className="animate-item text-lg text-teal/70 mb-6 leading-relaxed">
              Smješteni u srcu Kaštela, Adriatic Padel Club je premier destinacija za padel
              entuzijaste svih razina. Naš klub kombinira vrhunske terene, profesionalne
              trenere i prijateljsku atmosferu kako bi vam pružili nezaboravno padel iskustvo.
            </p>
            <p className="animate-item text-lg text-teal/70 mb-8 leading-relaxed">
              Bilo da ste početnik koji želi naučiti osnove ili iskusni igrač koji traži
              izazov, naš tim je tu da vam pomogne ostvariti vaše ciljeve.
            </p>

            <div className="animate-item flex flex-col sm:flex-row gap-4">
              <Button href="/o-nama" variant="secondary">
                Više o nama
              </Button>
              <Button href="/akademija" variant="outline">
                Naša akademija
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-16 border-t border-teal/10">
          <div className="bg-teal rounded-2xl py-12 px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

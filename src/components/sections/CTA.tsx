'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Povremeni',
    price: '25',
    period: '/sat',
    features: ['Pristup terenima', 'Online rezervacija', 'Osnovna oprema'],
  },
  {
    name: 'Mjesečno',
    price: '199',
    period: '/mj',
    features: [
      'Neograničen pristup',
      'Popusti na treninge',
      'Besplatna oprema',
      'Prioritetna rezervacija',
    ],
    highlighted: true,
  },
  {
    name: 'Godišnje',
    price: '1.799',
    period: '/god',
    features: [
      'Sve iz Mjesečnog',
      '2 mjeseca besplatno',
      'VIP događanja',
      'Besplatni turniri',
    ],
  },
];

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
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

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pricing-card');
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      className="py-24 md:py-32 bg-teal relative overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime/50 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-main relative">
        {/* Header */}
        <div ref={contentRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-item inline-block text-sm font-semibold uppercase tracking-widest text-lime mb-4">
            Članstvo
          </span>
          <h2 className="animate-item font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Postanite dio naše zajednice
          </h2>
          <p className="animate-item text-lg text-white/70 leading-relaxed">
            Odaberite plan koji odgovara vašim potrebama i počnite uživati u svim
            pogodnostima našeg kluba.
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card rounded-2xl p-8 transition-all duration-500 ${
                tier.highlighted
                  ? 'bg-lime text-teal scale-105 shadow-2xl shadow-lime/30'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              {/* Badge for highlighted */}
              {tier.highlighted && (
                <div className="bg-teal text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-4">
                  Najpopularnije
                </div>
              )}

              {/* Tier name */}
              <h3
                className={`font-heading text-xl font-bold mb-4 ${
                  tier.highlighted ? 'text-teal' : 'text-white'
                }`}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={`font-heading text-5xl font-bold ${
                    tier.highlighted ? 'text-teal' : 'text-white'
                  }`}
                >
                  {tier.price}€
                </span>
                <span
                  className={tier.highlighted ? 'text-teal/70' : 'text-white/60'}
                >
                  {tier.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${
                        tier.highlighted ? 'text-teal' : 'text-lime'
                      }`}
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
                    <span
                      className={
                        tier.highlighted ? 'text-teal/80' : 'text-white/80'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                href="/clanstvo"
                variant={tier.highlighted ? 'secondary' : 'outline'}
                fullWidth
                className={
                  !tier.highlighted
                    ? 'border-white/30 text-white hover:bg-white hover:text-teal'
                    : ''
                }
              >
                Odaberi plan
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-6">
            Trebate pomoć pri odabiru? Naš tim je tu za vas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={BOOKING_URL} external variant="lime" size="lg">
              Rezerviraj Teren
            </Button>
            <Button
              href="/kontakt"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-teal"
            >
              Kontaktirajte nas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

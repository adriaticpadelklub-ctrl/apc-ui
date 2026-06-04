'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showScrollIndicator?: boolean;
}

export function Hero({
  title = 'Premium padel iskustvo u Planu blizu Trogira',
  subtitle = 'Dva profesionalna terena, akademija za sve razine i nezaboravna atmosfera.',
  showScrollIndicator = true,
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate title words
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'expo.out',
          }
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }

      // Animate CTAs
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a, button');
        tl.fromTo(
          buttons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      // Parallax effect on scroll
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Fade out content on scroll - use a wrapper div approach
      // Create scroll triggers after initial animation completes
      tl.add(() => {
        // Fade out title
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -50,
              ease: 'none',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '50% top',
                scrub: true,
              },
            }
          );
        }

        // Fade out subtitle
        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -50,
              ease: 'none',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '50% top',
                scrub: true,
              },
            }
          );
        }

        // Fade out CTA
        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -50,
              ease: 'none',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '50% top',
                scrub: true,
              },
            }
          );
        }

        // Refresh ScrollTrigger to ensure proper calculations
        ScrollTrigger.refresh();
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Split title into words for animation
  const titleWords = title.split(' ').map((word, index) => (
    <span key={index} className="word inline-block overflow-hidden">
      <span className="inline-block">{word}</span>
      {index < title.split(' ').length - 1 && '\u00A0'}
    </span>
  ));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div ref={imageRef} className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-court.jpg"
          alt="Adriatic Padel Club indoor court"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal/80 via-teal/60 to-teal/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-main relative z-10 pt-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="mb-6 overflow-hidden">
            <span className="inline-block text-lime text-sm font-semibold uppercase tracking-widest animate-slide-up">
              Adriatic Padel Club
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6"
          >
            {titleWords}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <Button href={BOOKING_URL} external variant="lime" size="lg">
              Rezerviraj Teren
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
            <Button href="/o-nama" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-teal">
              Saznaj Više
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/60 text-sm uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-lime animate-scroll-bounce" />
          </div>
        </div>
      )}

    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
          }
        );
      }

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

      // Parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div ref={imageRef} className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal/80 via-teal/60 to-teal/90" />
      </div>

      {/* Content */}
      <div className="container-main relative z-10 pt-32 pb-20 text-center">
        <h1
          ref={titleRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none mb-6"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </p>
        )}
      </div>

    </section>
  );
}

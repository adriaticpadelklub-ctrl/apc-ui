'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Adriatic Padel Club je promijenio moj pogled na sport. Tereni su vrhunski, a atmosfera je nevjerojatna. Osjećam se kao dio obitelji od prvog dana.',
    author: 'Marina Šimić',
    role: 'Članica od 2022.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
  },
  {
    id: 2,
    quote:
      'Kao početnik, bio sam skeptičan, ali treneri su nevjerojatni. Za samo nekoliko mjeseci napredovao sam više nego što sam očekivao.',
    author: 'Tomislav Matić',
    role: 'Član od 2023.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    id: 3,
    quote:
      'Najbolji padel klub u regiji! Organizacija turnira je profesionalna, a druženje nakon utakmica je nezamjenjivo.',
    author: 'Ivana Petrović',
    role: 'Natjecateljica',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-beige overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-header inline-block text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4">
            Iskustva članova
          </span>
          <h2 className="animate-header font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-teal leading-tight">
            Što kažu naši članovi
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-lime/20">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative">
              <blockquote
                key={activeTestimonial.id}
                className={cn(
                  'text-xl md:text-2xl text-teal leading-relaxed mb-8 transition-opacity duration-500',
                  isAnimating ? 'opacity-0' : 'opacity-100'
                )}
              >
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div
                className={cn(
                  'flex items-center gap-4 transition-opacity duration-500',
                  isAnimating ? 'opacity-0' : 'opacity-100'
                )}
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-lime">
                  <Image
                    src={activeTestimonial.image}
                    alt={activeTestimonial.author}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-teal">
                    {activeTestimonial.author}
                  </p>
                  <p className="text-teal/60 text-sm">{activeTestimonial.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-teal/10">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all duration-300',
                      index === activeIndex
                        ? 'bg-lime w-8'
                        : 'bg-teal/20 hover:bg-teal/40'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  className="w-10 h-10 rounded-full border border-teal/20 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all duration-300"
                  aria-label="Previous testimonial"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full border border-teal/20 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all duration-300"
                  aria-label="Next testimonial"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

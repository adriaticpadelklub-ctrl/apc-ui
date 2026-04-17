'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface Coach {
  id: number;
  name: string;
  role: string;
  specialization: string;
  image: string;
  experience: string;
}

const coaches: Coach[] = [
  {
    id: 1,
    name: 'Marko Horvat',
    role: 'Glavni trener',
    specialization: 'Napredna tehnika',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    experience: '15+ godina iskustva',
  },
  {
    id: 2,
    name: 'Ana Kovačević',
    role: 'Trener akademije',
    specialization: 'Početnici i djeca',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    experience: '10+ godina iskustva',
  },
  {
    id: 3,
    name: 'Ivan Perić',
    role: 'Fitness trener',
    specialization: 'Kondicija i snaga',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    experience: '8+ godina iskustva',
  },
  {
    id: 4,
    name: 'Petra Babić',
    role: 'Trener natjecatelja',
    specialization: 'Taktika i strategija',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    experience: '12+ godina iskustva',
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
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
        <Image
          src={coach.image}
          alt={coach.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal via-transparent to-transparent opacity-60" />

        {/* Lime Accent on Hover */}
        <div className="absolute inset-0 bg-lime/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Experience Badge */}
        <div className="absolute top-4 right-4 bg-lime px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-teal">{coach.experience}</span>
        </div>

        {/* Specialization - Shows on hover */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm font-medium text-teal">{coach.specialization}</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-lime transition-colors duration-300">
          {coach.name}
        </h3>
        <p className="text-white/60">{coach.role}</p>
      </div>
    </div>
  );
}

export function Coaches() {
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
            Naš tim
          </span>
          <h2 className="animate-header font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Upoznajte naše trenere
          </h2>
          <p className="animate-header text-lg text-white/70 leading-relaxed">
            Naš tim certificiranih trenera posvećen je vašem napretku. S dugogodišnjim
            iskustvom i strašću za padel, pomoći će vam dostići vaše ciljeve.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <CoachCard key={coach.id} coach={coach} index={index} />
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-lg">
            Zainteresirani za individualne treninge?{' '}
            <a
              href="/kontakt"
              className="text-lime hover:underline font-medium"
            >
              Kontaktirajte nas
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

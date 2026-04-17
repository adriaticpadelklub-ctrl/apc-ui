'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Marko Horvat',
    role: 'Osnivač i Direktor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Bivši profesionalni tenisač s vizijom da padel postane najpopularniji sport na Jadranu.',
  },
  {
    name: 'Ana Kovačević',
    role: 'Direktorica Akademije',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Certificirana trenerica s 10+ godina iskustva u radu s igračima svih razina.',
  },
  {
    name: 'Ivan Perić',
    role: 'Voditelj Operacija',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Osigurava da sve funkcionira besprijekorno - od terena do korisničke podrške.',
  },
  {
    name: 'Petra Babić',
    role: 'Marketing Menadžerica',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Gradi našu zajednicu i povezuje ljubitelje padela diljem regije.',
  },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.team-card');
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
              trigger: gridRef.current,
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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container-main">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-header block text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4">
            Naš tim
          </span>
          <h2 className="animate-header font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
            Ljudi iza kluba
          </h2>
          <p className="animate-header text-lg text-teal/70">
            Upoznajte tim koji svakodnevno radi na tome da vaše padel iskustvo
            bude nezaboravno.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white text-sm">{member.bio}</p>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold text-teal mb-1">
                {member.name}
              </h3>
              <p className="text-teal/60">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

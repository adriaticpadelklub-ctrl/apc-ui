'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const galleryImages = [
  {
    src: '/images/club-images/drone-outside-2.jpg',
    alt: 'Pogled iz zraka na terene',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/images/club-images/reception.jpg',
    alt: 'Recepcija',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/club-images/shop.jpg',
    alt: 'Pro shop',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/club-images/shop-2.jpg',
    alt: 'Pro shop',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/club-images/entrance.jpg',
    alt: 'Ulaz u klub',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/club-images/outside-seating.jpg',
    alt: 'Vanjsko sjedenje',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/club-images/outside-seating-2.jpg',
    alt: 'Vanjsko sjedenje',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/club-images/tusevi.jpg',
    alt: 'Tuševi',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/club-images/svlaciona.jpg',
    alt: 'Svlačionica',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/images/club-images/parking.jpg',
    alt: 'Parking',
    span: 'col-span-2 row-span-1',
  },
];

export function GallerySection() {
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
        const images = gridRef.current.querySelectorAll('.gallery-image');
        gsap.fromTo(
          images,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
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
    <section ref={sectionRef} className="py-24 bg-teal">
      <div className="container-main">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-header block text-sm font-semibold uppercase tracking-widest text-lime mb-4">
            Galerija
          </span>
          <h2 className="animate-header font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
            Pogledajte naš klub
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-image relative rounded-xl overflow-hidden group ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-lime/0 group-hover:bg-lime/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

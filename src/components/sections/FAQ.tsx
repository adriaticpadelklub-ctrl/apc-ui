'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Što je padel i kako se igra?',
    answer:
      'Padel je brzorastući reket sport koji kombinira elemente tenisa i squasha. Igra se na zatvorenom terenu s zidovima od stakla, u parovima (2 protiv 2). Loptica može odskočiti od zidova, što čini igru dinamičnom i zabavnom za sve razine igrača.',
  },
  {
    question: 'Trebam li prethodno iskustvo za igranje?',
    answer:
      'Ne! Padel je poznat kao sport koji je lako naučiti. Naši treneri su specijalizirani za rad s početnicima i pomoći će vam savladati osnove u kratkom vremenu. Nudimo i besplatne uvodne sate za nove članove.',
  },
  {
    question: 'Kako mogu rezervirati teren?',
    answer:
      'Terene možete rezervirati putem naše online platforme Playtomic, telefonom ili osobno u klubu. Rezervacije su moguće do 7 dana unaprijed, a članovi imaju prioritet pri rezervaciji najpopularnijih termina.',
  },
  {
    question: 'Što je uključeno u članarinu?',
    answer:
      'Ovisno o paketu, članarina uključuje pristup terenima, korištenje opreme (reketi, loptice), popuste na treninge i turnire, te pristup ekskluzivnim događanjima kluba. Godišnji članovi dobivaju i dodatne pogodnosti poput besplatnih turnira.',
  },
  {
    question: 'Mogu li doći igrati bez opreme?',
    answer:
      'Da! U klubu možete besplatno posuditi rekete i loptice. Preporučujemo da ponesete sportsku obuću s neranjivim potplatom i udobnu sportsku odjeću. Imamo i svlačionice s tuševima.',
  },
  {
    question: 'Organizirate li turnire za amatere?',
    answer:
      'Apsolutno! Redovito organiziramo turnire za sve razine igrača, od potpunih početnika do naprednih. Turniri su izvrsna prilika za upoznavanje novih igrača i poboljšanje vaših vještina u natjecateljskom okruženju.',
  },
];

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItemComponent({ item, isOpen, onClick, index }: FAQItemProps) {
  const answerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current && contentRef.current) {
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: contentRef.current.offsetHeight,
          duration: 0.4,
          ease: 'power3.out',
        });
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.1,
          ease: 'power3.out',
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: 'power3.out',
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        'border-b border-teal/10 transition-colors duration-300',
        isOpen && 'border-lime/30'
      )}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'font-heading text-lg md:text-xl font-semibold transition-colors duration-300',
            isOpen ? 'text-lime' : 'text-teal group-hover:text-teal-light'
          )}
        >
          {item.question}
        </span>
        <span
          className={cn(
            'flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
            isOpen
              ? 'bg-lime text-teal rotate-180'
              : 'bg-teal/10 text-teal group-hover:bg-teal/20'
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden h-0">
        <div ref={contentRef} className="pb-6 opacity-0 -translate-y-2">
          <p className="text-teal/70 leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // FAQ items animation
      if (faqRef.current) {
        const items = faqRef.current.querySelectorAll('.faq-item');
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema markup
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-beige overflow-hidden">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Header */}
          <div ref={headerRef} className="lg:sticky lg:top-32 lg:self-start">
            <span className="animate-header inline-block text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4">
              Česta pitanja
            </span>
            <h2 className="animate-header font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
              Imate pitanja? Mi imamo odgovore.
            </h2>
            <p className="animate-header text-lg text-teal/70 leading-relaxed mb-8">
              Pronađite odgovore na najčešća pitanja o padelu i našem klubu. Ako ne
              pronađete odgovor, slobodno nas kontaktirajte.
            </p>
            <div className="animate-header">
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 text-teal font-medium hover:text-lime transition-colors duration-300"
              >
                <span>Kontaktirajte nas</span>
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
              </a>
            </div>
          </div>

          {/* FAQ Items */}
          <div ref={faqRef}>
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <FAQItemComponent
                  item={item}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

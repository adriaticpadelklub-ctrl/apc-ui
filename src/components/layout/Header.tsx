'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';
import { useScrollTo } from '@/hooks/useLenis';

const navigation = [
  { name: 'Početna', href: '/' },
  { name: 'O nama', href: '/o-nama' },
  { name: 'Tereni', href: '/tereni' },
  { name: 'Kontakt', href: '/kontakt' },
];

const BOOKING_URL = 'https://playtomic.io';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      gsap.fromTo(
        '.mobile-menu',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.mobile-nav-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        scrollTo(href, { offset: -100 });
        setIsMobileMenuOpen(false);
      }
    },
    [scrollTo]
  );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-main">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group"
            >
              <Image
                src="/adriatic-padel-club-logo.svg"
                alt="Adriatic Padel Club"
                width={180}
                height={50}
                className={cn(
                  'h-10 md:h-12 w-auto transition-all duration-300',
                  isScrolled || isMobileMenuOpen ? 'brightness-0' : ''
                )}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative text-sm font-medium transition-colors duration-300',
                    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-lime after:transition-all after:duration-300',
                    'hover:after:w-full',
                    pathname === item.href && 'after:w-full',
                    isScrolled
                      ? 'text-teal hover:text-teal-light'
                      : 'text-white/90 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                href={BOOKING_URL}
                external
                variant="primary"
                size="sm"
              >
                Rezerviraj Teren
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden relative z-10 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={cn(
                    'w-full h-0.5 rounded-full transition-all duration-300 origin-center',
                    isMobileMenuOpen
                      ? 'rotate-45 translate-y-2 bg-teal'
                      : isScrolled
                      ? 'bg-teal'
                      : 'bg-white'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 rounded-full transition-all duration-300',
                    isMobileMenuOpen
                      ? 'opacity-0'
                      : isScrolled
                      ? 'bg-teal'
                      : 'bg-white'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 rounded-full transition-all duration-300 origin-center',
                    isMobileMenuOpen
                      ? '-rotate-45 -translate-y-2 bg-teal'
                      : isScrolled
                      ? 'bg-teal'
                      : 'bg-white'
                  )}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-white" />
          <div className="relative h-full flex flex-col pt-24 pb-8 px-6">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'mobile-nav-item py-4 text-3xl font-heading font-bold text-teal transition-colors duration-300',
                    'hover:text-lime',
                    pathname === item.href && 'text-lime'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-teal/10">
              <Button
                href={BOOKING_URL}
                external
                variant="primary"
                size="lg"
                fullWidth
                className="mobile-nav-item"
              >
                Rezerviraj Teren
              </Button>

              <div className="mobile-nav-item mt-6 flex items-center gap-6 text-teal/60 text-sm">
                <a href="tel:+385912828803" className="hover:text-teal transition-colors">
                  +385 91 2828 803
                </a>
                <a href="mailto:info@adriaticpadelklub.hr" className="hover:text-teal transition-colors">
                  info@adriaticpadelklub.hr
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

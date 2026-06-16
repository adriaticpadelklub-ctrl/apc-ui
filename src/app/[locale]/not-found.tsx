'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-screen bg-teal flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Animated padel ball */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            {/* Ball shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 rounded-full blur-sm animate-pulse" />
            {/* Ball */}
            <div className="absolute inset-0 animate-bounce">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                <circle cx="50" cy="50" r="45" fill="#BFFF00" />
                <path
                  d="M50 5 C25 5, 5 25, 5 50 C5 60, 10 70, 18 78"
                  stroke="#9ACC00"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M50 95 C75 95, 95 75, 95 50 C95 40, 90 30, 82 22"
                  stroke="#9ACC00"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 404 text */}
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-white mb-4">
          404
        </h1>

        {/* Fun message */}
        <h2 className="font-heading text-2xl md:text-4xl font-bold text-lime mb-4">
          {t('title')}
        </h2>

        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-md mx-auto">
          {t('description')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 px-8 py-4 text-lg bg-lime text-teal-dark hover:bg-lime-light"
          >
            {t('backHome')}
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10"
          >
            {t('contact')}
          </Link>
        </div>

        {/* Decorative court lines */}
        <div className="mt-16 opacity-20">
          <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto">
            {/* Court outline */}
            <rect x="10" y="10" width="380" height="80" fill="none" stroke="white" strokeWidth="2" />
            {/* Center line */}
            <line x1="200" y1="10" x2="200" y2="90" stroke="white" strokeWidth="2" />
            {/* Service boxes */}
            <line x1="100" y1="10" x2="100" y2="90" stroke="white" strokeWidth="1" />
            <line x1="300" y1="10" x2="300" y2="90" stroke="white" strokeWidth="1" />
            <line x1="10" y1="50" x2="100" y2="50" stroke="white" strokeWidth="1" />
            <line x1="300" y1="50" x2="390" y2="50" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

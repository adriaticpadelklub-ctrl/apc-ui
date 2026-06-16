'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CookieSettings } from './CookieSettings';

export function CookieConsent() {
  const t = useTranslations('cookies');
  const { showBanner, showSettings, acceptAll, rejectAll, openSettings } = useCookieConsent();
  const bannerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!bannerRef.current || hasAnimated.current) return;

    if (showBanner) {
      // Set initial state
      gsap.set(bannerRef.current, {
        y: 100,
        opacity: 0,
      });

      // Animate in with delay
      gsap.to(bannerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 1.5,
        ease: 'power3.out',
      });

      hasAnimated.current = true;
    }
  }, [showBanner]);

  // Animate out when banner is dismissed
  useEffect(() => {
    if (!showBanner && hasAnimated.current && bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [showBanner]);

  if (!showBanner) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      className="
        fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:left-auto lg:right-6 lg:max-w-lg
        z-[60]
        bg-white rounded-2xl
        border border-teal/10
        shadow-2xl
        p-6
        opacity-0
      "
      role="dialog"
      aria-label={t('ariaLabel')}
      aria-modal="false"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h2 className="font-heading font-bold text-xl text-teal mb-2">
            {t('title')}
          </h2>
          <p className="text-sm text-teal/70 leading-relaxed">
            {t('description')}
          </p>
        </div>
      </div>

      {showSettings ? (
        <CookieSettings />
      ) : (
        <div className="flex flex-wrap gap-3 mt-5">
          <button
            onClick={openSettings}
            className="
              px-5 py-2.5 rounded-full text-sm font-medium
              text-teal hover:bg-teal/10
              transition-colors duration-200
            "
          >
            {t('settings')}
          </button>
          <button
            onClick={rejectAll}
            className="
              px-5 py-2.5 rounded-full text-sm font-medium
              border-2 border-teal text-teal
              hover:bg-teal hover:text-white
              transition-colors duration-200
            "
          >
            {t('rejectAll')}
          </button>
          <button
            onClick={acceptAll}
            className="
              px-5 py-2.5 rounded-full text-sm font-medium
              bg-lime text-teal hover:bg-lime-dark
              transition-colors duration-200
              shadow-lg shadow-lime/20
            "
          >
            {t('acceptAll')}
          </button>
        </div>
      )}
    </div>
  );
}

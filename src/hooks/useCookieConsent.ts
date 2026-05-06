'use client';

import { useContext } from 'react';
import { CookieConsentContext } from '@/components/cookies/CookieConsentProvider';
import type { CookieConsentContextValue } from '@/types/cookies';

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }

  return context;
}

'use client';

import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import type { CookieConsentContextValue, CookiePreferences, CookieConsentState } from '@/types/cookies';
import { getStoredPreferences, savePreferences, clearStoredPreferences, defaultPreferences } from '@/lib/cookies';

const initialState: CookieConsentState = {
  preferences: defaultPreferences,
  hasConsented: false,
  showBanner: false,
  showSettings: false,
};

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [state, setState] = useState<CookieConsentState>(initialState);

  // SSR-safe hydration from localStorage
  useEffect(() => {
    const stored = getStoredPreferences();

    if (stored) {
      setState({
        preferences: stored,
        hasConsented: true,
        showBanner: false,
        showSettings: false,
      });
    } else {
      setState((prev) => ({
        ...prev,
        showBanner: true,
      }));
    }
  }, []);

  const acceptAll = useCallback(() => {
    const preferences = savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });

    setState({
      preferences,
      hasConsented: true,
      showBanner: false,
      showSettings: false,
    });
  }, []);

  const rejectAll = useCallback(() => {
    const preferences = savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });

    setState({
      preferences,
      hasConsented: true,
      showBanner: false,
      showSettings: false,
    });
  }, []);

  const acceptSelected = useCallback((selectedPreferences: Partial<CookiePreferences>) => {
    const preferences = savePreferences({
      necessary: true,
      analytics: selectedPreferences.analytics ?? false,
      marketing: selectedPreferences.marketing ?? false,
    });

    setState({
      preferences,
      hasConsented: true,
      showBanner: false,
      showSettings: false,
    });
  }, []);

  const openSettings = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showSettings: true,
    }));
  }, []);

  const closeSettings = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showSettings: false,
    }));
  }, []);

  const resetConsent = useCallback(() => {
    clearStoredPreferences();
    setState({
      preferences: defaultPreferences,
      hasConsented: false,
      showBanner: true,
      showSettings: false,
    });
  }, []);

  const value: CookieConsentContextValue = {
    ...state,
    acceptAll,
    rejectAll,
    acceptSelected,
    openSettings,
    closeSettings,
    resetConsent,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

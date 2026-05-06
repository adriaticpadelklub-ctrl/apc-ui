export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

export interface CookieConsentState {
  preferences: CookiePreferences;
  hasConsented: boolean;
  showBanner: boolean;
  showSettings: boolean;
}

export interface CookieConsentActions {
  acceptAll: () => void;
  rejectAll: () => void;
  acceptSelected: (preferences: Partial<CookiePreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  resetConsent: () => void;
}

export type CookieConsentContextValue = CookieConsentState & CookieConsentActions;

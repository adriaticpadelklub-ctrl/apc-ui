import type { CookiePreferences } from '@/types/cookies';

export const STORAGE_KEY = 'apc_cookie_consent';
export const CONSENT_VERSION = '1.0';

export const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
  version: CONSENT_VERSION,
};

export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const preferences = JSON.parse(stored) as CookiePreferences;

    // Check if version matches, if not return null to show banner again
    if (preferences.version !== CONSENT_VERSION) {
      return null;
    }

    return preferences;
  } catch {
    return null;
  }
}

export function savePreferences(preferences: Partial<CookiePreferences>): CookiePreferences {
  const fullPreferences: CookiePreferences = {
    ...defaultPreferences,
    ...preferences,
    necessary: true, // Always required
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPreferences));
  }

  return fullPreferences;
}

export function clearStoredPreferences(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

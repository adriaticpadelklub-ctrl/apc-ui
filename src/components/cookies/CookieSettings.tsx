'use client';

import { useState } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

interface CookieToggleProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

function CookieToggle({ label, description, checked, disabled, onChange }: CookieToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-teal/10 last:border-b-0">
      <div className="flex-1">
        <h4 className="font-heading font-semibold text-teal text-base">{label}</h4>
        <p className="text-sm text-teal/70 mt-1">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2
          ${checked ? 'bg-lime' : 'bg-teal/20'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full
            bg-white shadow-lg ring-0 transition duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0.5'}
            mt-0.5
          `}
        />
      </button>
    </div>
  );
}

export function CookieSettings() {
  const { preferences, acceptSelected, closeSettings } = useCookieConsent();

  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [marketing, setMarketing] = useState(preferences.marketing);

  const handleSave = () => {
    acceptSelected({
      analytics,
      marketing,
    });
  };

  return (
    <div className="mt-6 pt-6 border-t border-teal/10">
      <h3 className="font-heading font-bold text-lg text-teal mb-4">
        Postavke kolačića
      </h3>

      <div className="space-y-0">
        <CookieToggle
          label="Neophodni kolačići"
          description="Ovi kolačići su neophodni za pravilno funkcioniranje stranice i ne mogu se isključiti."
          checked={true}
          disabled={true}
          onChange={() => {}}
        />

        <CookieToggle
          label="Analitički kolačići"
          description="Pomažu nam razumjeti kako posjetitelji koriste našu stranicu, što nam omogućuje poboljšanje korisničkog iskustva."
          checked={analytics}
          onChange={setAnalytics}
        />

        <CookieToggle
          label="Marketinški kolačići"
          description="Koriste se za praćenje posjetitelja na web stranicama kako bi se prikazali relevantni oglasi."
          checked={marketing}
          onChange={setMarketing}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={closeSettings}
          className="
            px-5 py-2.5 rounded-full text-sm font-medium
            text-teal hover:bg-teal/10
            transition-colors duration-200
          "
        >
          Odustani
        </button>
        <button
          onClick={handleSave}
          className="
            px-5 py-2.5 rounded-full text-sm font-medium
            bg-lime text-teal hover:bg-lime-dark
            transition-colors duration-200
            shadow-lg shadow-lime/20
          "
        >
          Spremi postavke
        </button>
      </div>
    </div>
  );
}

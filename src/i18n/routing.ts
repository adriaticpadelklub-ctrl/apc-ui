import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false, // Always show Croatian by default, don't detect browser language
  pathnames: {
    '/': '/',
    '/o-nama': {
      hr: '/o-nama',
      en: '/about',
    },
    '/tereni': {
      hr: '/tereni',
      en: '/courts',
    },
    '/turniri': {
      hr: '/turniri',
      en: '/tournaments',
    },
    '/turniri/[id]': {
      hr: '/turniri/[id]',
      en: '/tournaments/[id]',
    },
    '/kontakt': {
      hr: '/kontakt',
      en: '/contact',
    },
    '/akademija': {
      hr: '/akademija',
      en: '/academy',
    },
    '/otvorenje': {
      hr: '/otvorenje',
      en: '/opening',
    },
    '/politika-privatnosti': {
      hr: '/politika-privatnosti',
      en: '/privacy-policy',
    },
    '/politika-kolacica': {
      hr: '/politika-kolacica',
      en: '/cookie-policy',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Pathname = Pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

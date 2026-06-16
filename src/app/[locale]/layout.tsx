import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '../globals.css';
import { LenisProvider } from '@/hooks/useLenis';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LocalBusinessSchema } from '@/components/StructuredData';
import { CookieConsentProvider, CookieConsent } from '@/components/cookies';
import { GoogleAnalytics } from '@/components/analytics';
import { locales, type Locale } from '@/i18n/config';
import { routing } from '@/i18n/routing';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = 'https://www.adriaticpadelklub.hr';
  const ogLocale = locale === 'hr' ? 'hr_HR' : 'en_US';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: [
      'padel',
      'padel Trogir',
      'padel Plano',
      'padel klub',
      'padel teren',
      'padel akademija',
      'padel treniranje',
      'padel Hrvatska',
      'tenis',
      'sport Trogir',
    ],
    authors: [{ name: 'Adriatic Padel Club' }],
    creator: 'Adriatic Padel Club',
    publisher: 'Adriatic Padel Club',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: locale === 'hr' ? baseUrl : `${baseUrl}/en`,
      languages: {
        hr: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: locale === 'hr' ? baseUrl : `${baseUrl}/en`,
      siteName: 'Adriatic Padel Club',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Adriatic Padel Club - Premium Padel Trogir',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#383e42" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-teal">
        <NextIntlClientProvider messages={messages}>
          <LocalBusinessSchema />
          <CookieConsentProvider>
            <LenisProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </LenisProvider>
            <CookieConsent />
            <GoogleAnalytics />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

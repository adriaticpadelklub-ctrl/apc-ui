import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/hooks/useLenis';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LocalBusinessSchema } from '@/components/StructuredData';
import { CookieConsentProvider, CookieConsent } from '@/components/cookies';
import { GoogleAnalytics } from '@/components/analytics';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.adriaticpadelklub.hr'),
  title: {
    default: 'Adriatic Padel Club | Premium Padel u Trogiru',
    template: '%s | Adriatic Padel Club',
  },
  description:
    'Premium padel iskustvo na obali Jadrana. Adriatic Padel Club u Planu blizu Trogira nudi vrhunske indoor terene, profesionalne trenere i padel akademiju za sve razine igrača.',
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
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://www.adriaticpadelklub.hr',
    siteName: 'Adriatic Padel Club',
    title: 'Adriatic Padel Club | Premium Padel u Trogiru',
    description:
      'Premium padel iskustvo na obali Jadrana. Vrhunski indoor tereni, profesionalni treneri i padel akademija.',
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
    title: 'Adriatic Padel Club | Premium Padel u Trogiru',
    description: 'Premium padel iskustvo na obali Jadrana.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#383e42" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-teal">
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
      </body>
    </html>
  );
}

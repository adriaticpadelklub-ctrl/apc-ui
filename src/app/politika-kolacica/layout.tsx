import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politika kolačića',
  description:
    'Politika kolačića Adriatic Padel Cluba - saznajte koje kolačiće koristimo i kako njima upravljati.',
  openGraph: {
    title: 'Politika kolačića | Adriatic Padel Club',
    description: 'Saznajte koje kolačiće koristimo i kako njima upravljati.',
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

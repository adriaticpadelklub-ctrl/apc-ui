'use client';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
}

export function LocalBusinessSchema({
  name = 'Adriatic Padel Club',
  description = 'Premium padel klub u Planu blizu Trogira. Vrhunski indoor tereni, profesionalni treneri i padel akademija.',
  image = 'https://adriaticpadelclub.hr/og-image.jpg',
  telephone = '+385912828803',
  email = 'info@adriaticpadelklub.hr',
  address = {
    streetAddress: 'Put Stombrata 18',
    addressLocality: 'Trogir',
    postalCode: '21220',
    addressCountry: 'HR',
  },
  geo = {
    latitude: 43.5165,
    longitude: 16.2511,
  },
  openingHours = ['Mo-Su 08:00-24:00'],
  priceRange = '€€',
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': 'https://adriaticpadelclub.hr/#organization',
    name,
    description,
    image,
    telephone,
    email,
    url: 'https://adriaticpadelclub.hr',
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: openingHours.map((hours) => {
      const [days, time] = hours.split(' ');
      const [open, close] = time.split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens: open,
        closes: close,
      };
    }),
    priceRange,
    sameAs: [
      'https://facebook.com/adriaticpadelclub',
      'https://instagram.com/adriaticpadelclub',
      'https://youtube.com/@adriaticpadelclub',
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Padel Courts', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Changing Rooms', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pro Shop', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Cafe', value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

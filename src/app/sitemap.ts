import { MetadataRoute } from 'next';

const baseUrl = 'https://www.adriaticpadelklub.hr';

// Define all routes with their translations
const routes = [
  { hr: '/', en: '/en' },
  { hr: '/o-nama', en: '/en/about' },
  { hr: '/tereni', en: '/en/courts' },
  { hr: '/akademija', en: '/en/academy' },
  { hr: '/turniri', en: '/en/tournaments' },
  { hr: '/kontakt', en: '/en/contact' },
  { hr: '/otvorenje', en: '/en/opening' },
  { hr: '/politika-privatnosti', en: '/en/privacy-policy' },
  { hr: '/politika-kolacica', en: '/en/cookie-policy' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // Add Croatian version
    sitemapEntries.push({
      url: `${baseUrl}${route.hr}`,
      lastModified: new Date(),
      changeFrequency: route.hr === '/' ? 'weekly' : 'monthly',
      priority: route.hr === '/' ? 1 : (route.hr === '/tereni' || route.hr === '/akademija') ? 0.9 : 0.8,
      alternates: {
        languages: {
          hr: `${baseUrl}${route.hr}`,
          en: `${baseUrl}${route.en}`,
        },
      },
    });

    // Add English version
    sitemapEntries.push({
      url: `${baseUrl}${route.en}`,
      lastModified: new Date(),
      changeFrequency: route.hr === '/' ? 'weekly' : 'monthly',
      priority: route.hr === '/' ? 1 : (route.hr === '/tereni' || route.hr === '/akademija') ? 0.9 : 0.8,
      alternates: {
        languages: {
          hr: `${baseUrl}${route.hr}`,
          en: `${baseUrl}${route.en}`,
        },
      },
    });
  });

  return sitemapEntries;
}

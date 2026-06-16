'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/adriaticpadel/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@adriaticpadelklub',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const contactInfo = {
  address: 'Put Stombrata 18, 21220 Trogir, Croatia',
  phone: '+385912828803',
  email: 'info@adriaticpadelklub.hr',
  workingHours: {
    weekdays: '08:00 - 24:00',
    weekend: '08:00 - 24:00',
  },
};

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const currentYear = new Date().getFullYear();

  const navigationMain = [
    { name: tNav('home'), href: '/' as const },
    { name: tNav('about'), href: '/o-nama' as const },
    { name: tNav('courts'), href: '/tereni' as const },
    { name: tNav('contact'), href: '/kontakt' as const },
  ];

  const navigationServices = [
    { name: t('serviceLinks.courtBooking'), href: '/tereni' as const },
    { name: t('serviceLinks.academy'), href: '/akademija' as const },
    { name: t('serviceLinks.tournaments'), href: '/turniri' as const },
  ];

  const navigationLegal = [
    { name: t('legal.privacyPolicy'), href: '/politika-privatnosti' as const },
    { name: t('legal.cookiePolicy'), href: '/politika-kolacica' as const },
  ];

  return (
    <footer className="bg-teal text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-main py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                {t('newsletter.title')}
              </h3>
              <p className="text-white/70">
                {t('newsletter.subtitle')}
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className={cn(
                  'px-5 py-3 bg-white/10 border border-white/20 rounded-full',
                  'text-white placeholder:text-white/50',
                  'focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20',
                  'w-full sm:w-72 transition-all duration-300'
                )}
                required
              />
              <Button variant="lime" type="submit">
                {t('newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/adriatic-padel-club-logo.svg"
                alt="Adriatic Padel Club"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-lime hover:text-teal transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">{t('navigation')}</h4>
            <ul className="space-y-3">
              {navigationMain.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-lime transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">{t('services')}</h4>
            <ul className="space-y-3">
              {navigationServices.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-lime transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">{t('contact')}</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-lime flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-lime flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-lime transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-lime flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-lime transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-lime flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p>{t('workingHours.weekdays')}: {contactInfo.workingHours.weekdays}</p>
                  <p>{t('workingHours.weekend')}: {contactInfo.workingHours.weekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>&copy; {currentYear} {t('copyright')}</p>
            <div className="flex items-center gap-6">
              {navigationLegal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

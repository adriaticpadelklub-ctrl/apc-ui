'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'header';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    // Use type assertion since pathname can include dynamic segments
    router.replace(pathname as '/', { locale: newLocale });
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={cn(
            'px-2 py-1 text-sm font-medium rounded transition-colors duration-200',
            variant === 'header'
              ? locale === loc
                ? 'bg-lime text-teal'
                : 'text-current hover:bg-white/10'
              : locale === loc
              ? 'bg-lime text-teal'
              : 'bg-teal/10 text-teal hover:bg-teal/20'
          )}
          aria-label={`Switch to ${localeNames[loc]}`}
          aria-current={locale === loc ? 'true' : undefined}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

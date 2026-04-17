'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useFadeInUp } from '@/hooks/useGSAP';

type HeadingAlign = 'left' | 'center' | 'right';
type HeadingTheme = 'light' | 'dark';

interface SectionHeadingProps {
  tagline?: string;
  title: string;
  subtitle?: string;
  align?: HeadingAlign;
  theme?: HeadingTheme;
  className?: string;
  animated?: boolean;
}

const alignStyles: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      tagline,
      title,
      subtitle,
      align = 'center',
      theme = 'dark',
      className,
      animated = true,
    },
    ref
  ) => {
    const animatedRef = useFadeInUp<HTMLDivElement>();

    return (
      <div
        ref={animated ? animatedRef : ref}
        className={cn(
          'max-w-3xl mb-12 md:mb-16',
          alignStyles[align],
          className
        )}
      >
        {tagline && (
          <span
            className={cn(
              'inline-block text-sm font-semibold uppercase tracking-widest mb-4',
              theme === 'dark' ? 'text-lime' : 'text-teal'
            )}
          >
            {tagline}
          </span>
        )}
        <h2
          className={cn(
            'font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
            theme === 'dark' ? 'text-white' : 'text-teal'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mt-4 text-lg md:text-xl leading-relaxed',
              theme === 'dark' ? 'text-white/70' : 'text-teal/70'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  theme?: 'dark' | 'light' | 'white';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const themeStyles: Record<string, string> = {
  dark: 'bg-teal text-white',
  light: 'bg-beige text-teal',
  white: 'bg-white text-teal',
};

const paddingStyles: Record<string, string> = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-32',
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, theme = 'white', padding = 'md', className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(themeStyles[theme], paddingStyles[padding], className)}
        {...props}
      >
        <div className="container-main">{children}</div>
      </section>
    );
  }
);

Section.displayName = 'Section';

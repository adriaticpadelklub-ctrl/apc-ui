'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'lime';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-lime text-teal hover:bg-lime-dark focus:ring-lime/50 shadow-lg shadow-lime/20',
  secondary:
    'bg-teal text-white hover:bg-teal-light focus:ring-teal/50',
  outline:
    'border-2 border-teal text-teal hover:bg-teal hover:text-white focus:ring-teal/50',
  ghost:
    'text-teal hover:bg-teal/10 focus:ring-teal/50',
  lime:
    'bg-lime text-teal-dark hover:bg-lime-light focus:ring-lime/50 font-semibold',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      external,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'btn-hover-effect',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseStyles}
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={baseStyles}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

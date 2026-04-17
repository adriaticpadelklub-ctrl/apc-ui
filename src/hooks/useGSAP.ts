'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger, defaultEase, expoEase } from '@/lib/gsap';

// Hook for basic GSAP animation with ScrollTrigger
export function useGSAPScrollTrigger<T extends HTMLElement>(
  animationCallback: (element: T, gsapInstance: typeof gsap) => gsap.core.Tween | gsap.core.Timeline | void,
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      animationCallback(element, gsap);
    }, element);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}

// Hook for fade in up animation
export function useFadeInUp<T extends HTMLElement>(
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    start?: string;
  } = {}
) {
  const { delay = 0, duration = 1, y = 60, start = 'top 80%' } = options;

  return useGSAPScrollTrigger<T>((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: defaultEase,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

// Hook for staggered children animation
export function useStaggerChildren<T extends HTMLElement>(
  childSelector: string,
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    y?: number;
    start?: string;
  } = {}
) {
  const { stagger = 0.1, delay = 0, duration = 0.8, y = 40, start = 'top 80%' } = options;

  return useGSAPScrollTrigger<T>((element) => {
    const children = element.querySelectorAll(childSelector);
    if (children.length === 0) return;

    gsap.fromTo(
      children,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: defaultEase,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

// Hook for parallax effect
export function useParallax<T extends HTMLElement>(speed = 0.3) {
  return useGSAPScrollTrigger<T>((element) => {
    gsap.to(element, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

// Hook for image reveal animation
export function useImageReveal<T extends HTMLElement>(
  options: {
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    start?: string;
  } = {}
) {
  const { delay = 0, duration = 1.2, direction = 'up', start = 'top 75%' } = options;

  const clipPaths = {
    up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
    left: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
  };

  return useGSAPScrollTrigger<T>((element) => {
    gsap.fromTo(
      element,
      { clipPath: clipPaths[direction].from },
      {
        clipPath: clipPaths[direction].to,
        duration,
        delay,
        ease: expoEase,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// Hook for text split animation
export function useTextReveal<T extends HTMLElement>(
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const { delay = 0, duration = 1, stagger = 0.02, start = 'top 80%' } = options;
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const text = element.textContent || '';
    const words = text.split(' ');

    element.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(' ');

    const innerSpans = element.querySelectorAll('span > span');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerSpans,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: expoEase,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => {
      ctx.revert();
      element.textContent = text;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return elementRef;
}

// Hook for counter animation
export function useCounter(
  endValue: number,
  options: {
    duration?: number;
    start?: string;
    suffix?: string;
    prefix?: string;
  } = {}
) {
  const { duration = 2, start = 'top 80%', suffix = '', prefix = '' } = options;
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const obj = { value: 0 };

      ScrollTrigger.create({
        trigger: element,
        start,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          gsap.to(obj, {
            value: endValue,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
            },
          });
        },
      });
    }, element);

    return () => ctx.revert();
  }, [endValue, duration, start, suffix, prefix]);

  return elementRef;
}

// Hook for scroll progress
export function useScrollProgress(callback: (progress: number) => void) {
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      callback(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [callback]);
}

// Hook for magnetic effect on hover
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const elementRef = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return elementRef;
}

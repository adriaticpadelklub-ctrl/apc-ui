'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis(callback?: (lenis: Lenis) => void) {
  useEffect(() => {
    if (callback && lenisInstance) {
      callback(lenisInstance);
    }
  }, [callback]);

  return lenisInstance;
}

export function useLenisScroll(callback: (e: { scroll: number; progress: number }) => void) {
  useEffect(() => {
    if (!lenisInstance) return;

    const handleScroll = (e: Lenis) => {
      callback({
        scroll: e.scroll,
        progress: e.progress,
      });
    };

    lenisInstance.on('scroll', handleScroll);

    return () => {
      lenisInstance?.off('scroll', handleScroll);
    };
  }, [callback]);
}

export function useScrollTo() {
  return useCallback((target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (!lenisInstance) return;

    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
    });
  }, []);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for smoother integration
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing for Lenis
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial load to ensure proper positioning
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisInstance = null;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return React.createElement(React.Fragment, null, children);
}

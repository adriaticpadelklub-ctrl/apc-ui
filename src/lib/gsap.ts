'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Set global defaults to prevent invisible elements
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });

  // Configure ScrollTrigger defaults
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

// Default ease for animations
export const defaultEase = 'power3.out';
export const smoothEase = 'power2.inOut';
export const expoEase = 'expo.out';

// Animation presets
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, duration: 1, ease: defaultEase },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, duration: 0.8, ease: defaultEase },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, duration: 0.8, ease: defaultEase },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0, duration: 1, ease: defaultEase },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, duration: 1, ease: defaultEase },
};

// ScrollTrigger defaults
export const defaultScrollTrigger = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
};

// Create a stagger animation for multiple elements
export function createStaggerAnimation(
  elements: Element[] | NodeListOf<Element>,
  stagger = 0.1,
  scrollTrigger?: gsap.DOMTarget
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: defaultEase,
      scrollTrigger: scrollTrigger
        ? {
            trigger: scrollTrigger,
            ...defaultScrollTrigger,
          }
        : undefined,
    }
  );
}

// Create a text reveal animation
export function createTextReveal(
  element: gsap.DOMTarget,
  scrollTrigger?: gsap.DOMTarget
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: expoEase,
      scrollTrigger: scrollTrigger
        ? {
            trigger: scrollTrigger,
            ...defaultScrollTrigger,
          }
        : undefined,
    }
  );
}

// Create a parallax effect
export function createParallax(
  element: gsap.DOMTarget,
  speed = 0.5,
  scrollTrigger?: gsap.DOMTarget
) {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: scrollTrigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// Create image reveal animation
export function createImageReveal(
  element: gsap.DOMTarget,
  scrollTrigger?: gsap.DOMTarget
) {
  return gsap.fromTo(
    element,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: expoEase,
      scrollTrigger: scrollTrigger
        ? {
            trigger: scrollTrigger,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        : undefined,
    }
  );
}

// Create counter animation
export function createCounterAnimation(
  element: HTMLElement,
  endValue: number,
  duration = 2,
  scrollTrigger?: gsap.DOMTarget
) {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
    scrollTrigger: scrollTrigger
      ? {
          trigger: scrollTrigger,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      : undefined,
  });
}

// Kill all ScrollTriggers (useful for cleanup)
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// Refresh ScrollTrigger (useful after DOM changes)
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [threshold, rootMargin, once]);

  return { elementRef, isVisible };
}

// Animation utility classes
export const fadeInUp = "transition-all duration-700 ease-out transform";
export const fadeInUpVisible = "opacity-100 translate-y-0";
export const fadeInUpHidden = "opacity-0 translate-y-8";

export const fadeInLeft = "transition-all duration-700 ease-out transform";
export const fadeInLeftVisible = "opacity-100 translate-x-0";
export const fadeInLeftHidden = "opacity-0 -translate-x-8";

export const fadeInRight = "transition-all duration-700 ease-out transform";
export const fadeInRightVisible = "opacity-100 translate-x-0";
export const fadeInRightHidden = "opacity-0 translate-x-8";

export const scaleIn = "transition-all duration-500 ease-out transform";
export const scaleInVisible = "opacity-100 scale-100";
export const scaleInHidden = "opacity-0 scale-95";

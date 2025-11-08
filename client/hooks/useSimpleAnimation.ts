import { useEffect, useRef, useState } from "react";

interface UseSimpleAnimationOptions {
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export function useSimpleAnimation(options: UseSimpleAnimationOptions = {}) {
  const { threshold = 0.1, delay = 0, once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [threshold, delay, once]);

  return { elementRef, isVisible };
}

// Simple animation classes that work reliably
export const animationClasses = {
  fadeInUp: (isVisible: boolean) => `
    transition-all duration-700 ease-out transform
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
  `,

  fadeIn: (isVisible: boolean) => `
    transition-all duration-600 ease-out
    ${isVisible ? "opacity-100" : "opacity-0"}
  `,

  scaleIn: (isVisible: boolean) => `
    transition-all duration-500 ease-out transform
    ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
  `,

  slideInLeft: (isVisible: boolean) => `
    transition-all duration-600 ease-out transform
    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
  `,

  slideInRight: (isVisible: boolean) => `
    transition-all duration-600 ease-out transform
    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
  `,
};

// Hover animation hook
export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  return {
    isHovered,
    hoverProps: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
    hoverClasses: `
      transition-all duration-300 ease-out transform
      ${isHovered ? "scale-105 -translate-y-2 shadow-lg" : "scale-100 translate-y-0"}
    `,
  };
}

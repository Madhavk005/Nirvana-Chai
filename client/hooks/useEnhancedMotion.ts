import { useEffect, useRef, useState } from "react";

interface UseEnhancedMotionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
}

export function useEnhancedMotion(options: UseEnhancedMotionOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    once = true,
    delay = 0,
    duration = 600,
    ease = "ease-out",
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasTriggered || !once)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
          }, delay);

          if (once) {
            observer.unobserve(element);
          }
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [threshold, rootMargin, once, delay, hasTriggered]);

  const getMotionStyles = (type: MotionType = "fadeInUp") => {
    const baseStyles = {
      transition: `all ${duration}ms ${ease}`,
      willChange: "transform, opacity",
    };

    const motionStyles = getMotionConfig(type);

    return {
      ...baseStyles,
      ...(!isVisible ? motionStyles.hidden : motionStyles.visible),
    };
  };

  return { elementRef, isVisible, getMotionStyles };
}

export type MotionType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "slideInUp"
  | "slideInLeft"
  | "slideInRight"
  | "rotateIn"
  | "bounceIn";

function getMotionConfig(type: MotionType) {
  const configs = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, transform: "translateY(30px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    fadeInDown: {
      hidden: { opacity: 0, transform: "translateY(-30px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    fadeInLeft: {
      hidden: { opacity: 0, transform: "translateX(-30px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    fadeInRight: {
      hidden: { opacity: 0, transform: "translateX(30px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    scaleIn: {
      hidden: { opacity: 0, transform: "scale(0.9)" },
      visible: { opacity: 1, transform: "scale(1)" },
    },
    slideInUp: {
      hidden: { transform: "translateY(100%)" },
      visible: { transform: "translateY(0)" },
    },
    slideInLeft: {
      hidden: { transform: "translateX(-100%)" },
      visible: { transform: "translateX(0)" },
    },
    slideInRight: {
      hidden: { transform: "translateX(100%)" },
      visible: { transform: "translateX(0)" },
    },
    rotateIn: {
      hidden: { opacity: 0, transform: "rotate(-10deg) scale(0.9)" },
      visible: { opacity: 1, transform: "rotate(0deg) scale(1)" },
    },
    bounceIn: {
      hidden: { opacity: 0, transform: "scale(0.3)" },
      visible: { opacity: 1, transform: "scale(1)" },
    },
  };

  return configs[type] || configs.fadeInUp;
}

// Predefined motion components
export function useStaggeredMotion(
  items: any[],
  baseDelay = 0,
  staggerDelay = 100,
) {
  return items.map((_, index) =>
    useEnhancedMotion({
      delay: baseDelay + index * staggerDelay,
      duration: 600,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    }),
  );
}

// Hover motion utilities
export function useHoverMotion() {
  const [isHovered, setIsHovered] = useState(false);

  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  const getHoverStyles = (config = {}) => {
    const defaultConfig = {
      scale: 1.05,
      translateY: -5,
      duration: 300,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    };

    const finalConfig = { ...defaultConfig, ...config };

    return {
      transform: isHovered
        ? `scale(${finalConfig.scale}) translateY(${finalConfig.translateY}px)`
        : "scale(1) translateY(0px)",
      transition: `transform ${finalConfig.duration}ms ${finalConfig.ease}`,
      willChange: "transform",
    };
  };

  return { isHovered, hoverProps, getHoverStyles };
}

// Smooth scroll utility
export function useSmoothScroll() {
  const scrollTo = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return { scrollTo, scrollToTop };
}

// Performance monitoring for animations
export function useAnimationPerformance() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { isReducedMotion };
}

import { useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  placeholder?: React.ReactNode;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  fallback,
  placeholder,
  aspectRatio = "landscape",
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    wide: "aspect-[16/9]",
  };

  const defaultPlaceholder = (
    <div
      className={`bg-gradient-to-br from-sage-100 to-clay-100 flex items-center justify-center ${aspectRatioClasses[aspectRatio]}`}
    >
      <div className="text-sage-400 text-center">
        <div className="text-4xl mb-2">🫖</div>
        <div className="text-sm">Loading...</div>
      </div>
    </div>
  );

  const errorFallback = fallback || (
    <div
      className={`bg-gradient-to-br from-sage-100 to-clay-100 flex items-center justify-center ${aspectRatioClasses[aspectRatio]}`}
    >
      <div className="text-sage-400 text-center">
        <div className="text-4xl mb-2">🍃</div>
        <div className="text-sm">Tea Image</div>
      </div>
    </div>
  );

  if (hasError) {
    return <div className={className}>{errorFallback}</div>;
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10">
          {placeholder || defaultPlaceholder}
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}

// Tea-themed placeholder images using Unsplash with better quality images
export const teaImages = {
  hero: "/img/pexels-minan1398-981091.jpg",
  teaCup: "/img/green-tea-n-the-brown-mat.jpg",
  teaPlantation:
    "https://images.unsplash.com/photo-1596803882750-87ec2085b26a?w=800&h=600&fit=crop&crop=center&q=80",
  teaLeaves:
    "https://images.unsplash.com/photo-1597318022111-e0d46906e3af?w=600&h=600&fit=crop&crop=center&q=80",
  teaCeremony:
    "https://images.unsplash.com/photo-1571934811086-9c9e8bdd5318?w=800&h=600&fit=crop&crop=center&q=80",
  vintage:
    "https://images.unsplash.com/photo-1613490900233-141c5560d75d?w=600&h=800&fit=crop&crop=center&q=80",
  meditation:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center&q=80",
  heritage:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center&q=80",
  brewing:
    "https://images.unsplash.com/photo-1594736797933-d0980ba07e31?w=600&h=800&fit=crop&crop=center&q=80",
  teaGarden:
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=1000&h=600&fit=crop&crop=center&q=80",
  darjeeling:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center&q=80",
  assam:
    "https://images.unsplash.com/photo-1596803882750-87ec2085b26a?w=600&h=400&fit=crop&crop=center&q=80",
  ceylon:
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=600&h=400&fit=crop&crop=center&q=80",
  china:
    "https://images.unsplash.com/photo-1571934811086-9c9e8bdd5318?w=600&h=400&fit=crop&crop=center&q=80",
  kenya:
    "https://images.unsplash.com/photo-1594736797933-d0980ba07e31?w=600&h=400&fit=crop&crop=center&q=80",
  vietnam:
    "https://images.unsplash.com/photo-1597318022111-e0d46906e3af?w=600&h=400&fit=crop&crop=center&q=80",
};

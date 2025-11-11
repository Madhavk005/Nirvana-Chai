import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular" | "product-card" | "hero";
  lines?: number;
  width?: string | number;
  height?: string | number;
}

export function SkeletonLoader({
  className = "",
  variant = "rectangular",
  lines = 1,
  width,
  height,
}: SkeletonLoaderProps) {
  const baseClasses = "bg-gradient-to-r from-sage-100 via-sage-50 to-sage-100 animate-pulse";

  if (variant === "product-card") {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Image skeleton */}
        <div className={`${baseClasses} aspect-square rounded-xl`} />

        {/* Content skeleton */}
        <div className="space-y-3">
          <div className={`${baseClasses} h-4 rounded w-3/4`} />
          <div className={`${baseClasses} h-4 rounded w-1/2`} />
          <div className={`${baseClasses} h-6 rounded w-1/4`} />
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className={`${baseClasses} h-12 rounded w-2/3`} />
        <div className={`${baseClasses} h-6 rounded w-full`} />
        <div className={`${baseClasses} h-6 rounded w-4/5`} />
        <div className={`${baseClasses} h-10 rounded w-40`} />
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} h-4 rounded`}
            style={{
              width: width || (index === lines - 1 ? "60%" : "100%"),
            }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "circular") {
    return (
      <div
        className={`${baseClasses} rounded-full ${className}`}
        style={{
          width: width || "40px",
          height: height || "40px",
        }}
      />
    );
  }

  // Default rectangular
  return (
    <div
      className={`${baseClasses} rounded ${className}`}
      style={{
        width: width || "100%",
        height: height || "20px",
      }}
    />
  );
}

// Specialized skeleton components
export function ProductCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white border border-sage-200 rounded-xl overflow-hidden ${className}`}>
      <SkeletonLoader variant="product-card" />
    </div>
  );
}

export function HeroSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-sage-50 to-emerald-50 py-12 sm:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 text-center">
        <SkeletonLoader variant="hero" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

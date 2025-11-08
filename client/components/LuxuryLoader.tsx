import { useEffect, useState } from "react";

interface LuxuryLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function LuxuryLoader({ isLoading, onComplete }: LuxuryLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    let progressInterval: NodeJS.Timeout;
    let currentProgress = 0;

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete?.();
          }, 300);
        }
      }, 20);
    };

    setTimeout(updateProgress, 200);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Simple Tea Cup Icon */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <div className="text-4xl animate-pulse">🫖</div>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-heading font-bold text-sage-700 mb-4">
          NIRVANACHAI
        </h1>

        {/* Simple Progress Bar */}
        <div className="w-48 max-w-full mx-auto">
          <div className="h-1 bg-sage-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sage-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Text */}
        <div className="mt-4 text-sage-600 text-sm">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

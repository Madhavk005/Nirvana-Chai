import { useEffect, useState } from "react";

interface TeaLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function TeaLoader({ isLoading, onComplete }: TeaLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onComplete?.(), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-sage-50 via-off-white to-forest-50 flex items-center justify-center">
      <div className="text-center">
        {/* Tea Pouring Animation */}
        <div className="relative mb-8">
          {/* Kettle */}
          <div className="relative inline-block">
            <svg
              width="120"
              height="80"
              viewBox="0 0 120 80"
              className="drop-shadow-lg"
            >
              {/* Kettle Body */}
              <ellipse
                cx="60"
                cy="50"
                rx="35"
                ry="25"
                fill="#22402F"
                className="animate-pulse"
              />
              {/* Kettle Handle */}
              <path
                d="M25 45 Q15 35 25 25"
                stroke="#1B3326"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              {/* Kettle Spout */}
              <path
                d="M95 45 Q110 40 115 35"
                stroke="#8B7355"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              {/* Steam */}
              <g className="animate-bounce" style={{ animationDelay: "0.5s" }}>
                <circle cx="65" cy="20" r="2" fill="#E5E7EB" opacity="0.7" />
                <circle cx="55" cy="15" r="1.5" fill="#E5E7EB" opacity="0.5" />
                <circle cx="70" cy="12" r="1" fill="#E5E7EB" opacity="0.6" />
              </g>
            </svg>

            {/* Tea Stream */}
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2"
              style={{ left: "85%" }}
            >
              <div
                className="w-1 bg-gradient-to-b from-emerald-600 to-emerald-800 origin-top transition-all duration-1000 ease-out"
                style={{
                  height: `${Math.min(progress * 0.8, 60)}px`,
                  opacity: progress > 10 ? 1 : 0,
                }}
              />
            </div>
          </div>

          {/* Tea Cup */}
          <div className="relative mt-4">
            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              className="drop-shadow-md"
            >
              {/* Cup Body */}
              <path
                d="M15 20 L65 20 L60 50 L20 50 Z"
                fill="#F3F4F6"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              {/* Cup Handle */}
              <path
                d="M65 30 Q75 30 75 40 Q75 45 65 45"
                stroke="#D1D5DB"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Tea Level */}
              <path
                d={`M20 ${50 - progress * 0.25} L60 ${50 - progress * 0.25} L60 50 L20 50 Z`}
                fill="#22402F"
                opacity="0.8"
                className="transition-all duration-300 ease-out"
              />
              {/* Tea Surface Ripple */}
              {progress > 50 && (
                <ellipse
                  cx="40"
                  cy={50 - progress * 0.25}
                  rx="15"
                  ry="2"
                  fill="#4F875F"
                  opacity="0.3"
                  className="animate-pulse"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-heading font-bold text-sage-800">
            Brewing Your Experience
          </h2>
          <p className="text-sage-600">
            Preparing the perfect cup of tea takes time...
          </p>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-sage-200 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sage-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <p className="text-sm text-sage-500 font-medium">{progress}%</p>
        </div>

        {/* Floating Tea Leaves */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute text-sage-300 animate-bounce opacity-60"
            style={{
              top: "20%",
              left: "20%",
              animationDelay: "0s",
              animationDuration: "3s",
            }}
          >
            🍃
          </div>
          <div
            className="absolute text-sage-300 animate-bounce opacity-40"
            style={{
              top: "30%",
              right: "25%",
              animationDelay: "1s",
              animationDuration: "4s",
            }}
          >
            🍃
          </div>
          <div
            className="absolute text-sage-300 animate-bounce opacity-50"
            style={{
              bottom: "25%",
              left: "30%",
              animationDelay: "2s",
              animationDuration: "5s",
            }}
          >
            🍃
          </div>
          <div
            className="absolute text-sage-300 animate-bounce opacity-30"
            style={{
              bottom: "20%",
              right: "20%",
              animationDelay: "1.5s",
              animationDuration: "3.5s",
            }}
          >
            🍃
          </div>
        </div>
      </div>
    </div>
  );
}

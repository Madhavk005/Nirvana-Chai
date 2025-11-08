import { useEffect, useState } from "react";

interface RefinedLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function RefinedLoader({ isLoading, onComplete }: RefinedLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    { text: "Sourcing premium tea leaves...", duration: 800 },
    { text: "Selecting finest origins...", duration: 600 },
    { text: "Brewing your experience...", duration: 700 },
    { text: "Almost ready...", duration: 500 },
  ];

  useEffect(() => {
    if (!isLoading) return;

    let progressInterval: NodeJS.Timeout;
    let stageTimeout: NodeJS.Timeout;
    let currentProgress = 0;
    let currentStage = 0;

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);

        // Update stage based on progress
        const newStage = Math.floor((currentProgress / 100) * stages.length);
        if (newStage !== currentStage && newStage < stages.length) {
          currentStage = newStage;
          setStage(currentStage);
        }

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete?.();
          }, 500);
        }
      }, 25);
    };

    // Start after a brief delay
    setTimeout(updateProgress, 300);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stageTimeout);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-sage-50 via-off-white to-forest-50 flex items-center justify-center transition-opacity duration-500">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Modern Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-sage-200 rounded-full animate-spin-slow"></div>

            {/* Progress ring */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 10}`}
                strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* Center tea icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
                <span className="text-white text-lg">🍃</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-heading font-bold text-sage-800 mb-4 tracking-wide">
          Nirvana Chai
        </h1>

        {/* Dynamic Message */}
        <div className="h-6 mb-6 flex items-center justify-center">
          <p key={stage} className="text-sage-600 text-base animate-fade-in-up">
            {stages[stage]?.text || "Loading..."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="h-1 bg-sage-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sage-500 via-emerald-500 to-forest-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-3 text-xs text-sage-500">
            <span>Loading</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Subtle tagline */}
        <p className="text-sage-500 text-sm mt-6 opacity-70">
          Crafting your perfect tea experience
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }
        
        .animate-pulse-soft {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

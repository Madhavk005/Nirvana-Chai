import { useEffect, useState } from "react";

interface ElegantLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function ElegantLoader({ isLoading, onComplete }: ElegantLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  const stages = [
    { text: "Awakening the senses...", duration: 800 },
    { text: "Selecting finest tea gardens...", duration: 600 },
    { text: "Crafting your experience...", duration: 700 },
    { text: "Welcome to Nirvana...", duration: 500 },
  ];

  useEffect(() => {
    if (!isLoading) return;

    // Generate floating particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);

    let progressInterval: NodeJS.Timeout;
    let currentProgress = 0;
    let currentStage = 0;

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += 0.8;
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
          }, 800);
        }
      }, 20);
    };

    // Start after a brief delay
    setTimeout(updateProgress, 300);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-sage-50 via-off-white to-forest-50/30 flex items-center justify-center transition-all duration-1000">
      {/* Floating Tea Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-sage-300/30 text-2xl animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${6 + particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="text-center max-w-lg mx-auto px-8 relative z-10">
        {/* Main Logo Animation */}
        <div className="relative mb-12">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer rotating rings */}
            <div className="absolute inset-0 border border-sage-200/60 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 border border-forest-200/40 rounded-full animate-spin-reverse"></div>

            {/* Center tea symbol with breathing effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Pulsing background */}
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-sage-400/20 to-forest-400/20 rounded-full animate-pulse-gentle blur-md"></div>

                {/* Main tea cup icon */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-sage-500 to-forest-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="relative">
                    {/* Steam animation */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 space-y-1">
                      <div className="w-1 h-3 bg-gradient-to-t from-sage-400/60 to-transparent rounded-full animate-steam-1"></div>
                      <div className="w-1 h-2 bg-gradient-to-t from-sage-400/40 to-transparent rounded-full animate-steam-2 ml-1"></div>
                      <div className="w-1 h-3 bg-gradient-to-t from-sage-400/50 to-transparent rounded-full animate-steam-3 -ml-1"></div>
                    </div>

                    {/* Tea cup */}
                    <span className="text-white text-2xl"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress ring */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 32 32"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 14}`}
                strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                className="transition-all duration-500 ease-out"
              />
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#9CA68C" />
                  <stop offset="50%" stopColor="#22402F" />
                  <stop offset="100%" stopColor="#9CA68C" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Brand Name with Typography Animation */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-sage-800 mb-2 tracking-wider">
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.1s" }}
            >
              N
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.2s" }}
            >
              i
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.3s" }}
            >
              r
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.4s" }}
            >
              v
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.5s" }}
            >
              a
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.6s" }}
            >
              n
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.7s" }}
            >
              a
            </span>
            <span className="inline-block mx-3"></span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.8s" }}
            >
              C
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "0.9s" }}
            >
              h
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "1.0s" }}
            >
              a
            </span>
            <span
              className="inline-block animate-fade-in-letter"
              style={{ animationDelay: "1.1s" }}
            >
              i
            </span>
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-sage-400 to-transparent animate-expand"></div>
        </div>

        {/* Dynamic Message with Smooth Transitions */}
        <div className="h-8 mb-8 flex items-center justify-center overflow-hidden">
          <p
            key={stage}
            className="text-sage-600 text-lg font-medium animate-slide-up"
          >
            {stages[stage]?.text || "Preparing your journey..."}
          </p>
        </div>

        {/* Elegant Progress Indicator */}
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="w-80 max-w-full mx-auto">
            <div className="h-0.5 bg-sage-200/60 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-sage-500 via-forest-500 to-sage-600 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 w-4 h-full bg-white/30 rounded-full animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className="flex justify-center items-center space-x-4 text-sm">
            <span className="text-sage-500 font-medium">Loading</span>
            <div className="flex space-x-1">
              <div
                className="w-1 h-1 bg-sage-400 rounded-full animate-dot-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-1 h-1 bg-sage-400 rounded-full animate-dot-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-1 bg-sage-400 rounded-full animate-dot-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <span className="text-sage-600 font-bold min-w-[3rem] text-right">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sage-500 text-sm mt-8 opacity-80 animate-fade-in-slow tracking-wide">
          Where every sip is a moment of mindfulness
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes fade-in-letter {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes expand {
          from { 
            width: 0; 
            opacity: 0; 
          }
          to { 
            width: 8rem; 
            opacity: 1; 
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.8; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.6; 
          }
        }
        
        @keyframes steam-1 {
          0%, 100% { 
            opacity: 0.6; 
            transform: translateY(0) translateX(0); 
          }
          50% { 
            opacity: 0.3; 
            transform: translateY(-10px) translateX(2px); 
          }
        }
        
        @keyframes steam-2 {
          0%, 100% { 
            opacity: 0.4; 
            transform: translateY(0) translateX(0); 
          }
          50% { 
            opacity: 0.2; 
            transform: translateY(-8px) translateX(-1px); 
          }
        }
        
        @keyframes steam-3 {
          0%, 100% { 
            opacity: 0.5; 
            transform: translateY(0) translateX(0); 
          }
          50% { 
            opacity: 0.2; 
            transform: translateY(-12px) translateX(1px); 
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.1; 
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes dot-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
        
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 0.8; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
        
        .animate-fade-in-letter {
          animation: fade-in-letter 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-expand {
          animation: expand 1.5s ease-out 1.2s forwards;
          width: 0;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-steam-1 {
          animation: steam-1 2s ease-in-out infinite;
        }
        
        .animate-steam-2 {
          animation: steam-2 2.5s ease-in-out infinite;
        }
        
        .animate-steam-3 {
          animation: steam-3 2.2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-dot-bounce {
          animation: dot-bounce 1.4s ease-in-out infinite;
        }
        
        .animate-fade-in-slow {
          animation: fade-in-slow 2s ease-out 1.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

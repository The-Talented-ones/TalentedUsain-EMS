import { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth random increment step simulation to mimic real asset loading
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 min-h-[400px] flex items-center justify-center flex-col gap-4 p-8 animate-fade-in">
      {/* Progress Circle Container */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-16 h-16 -rotate-90">
          {/* Base Background Track Circle - Adjusted opacity for dark mode layouts */}
          <circle
            className="text-slate-700/30"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
          />
          {/* Active Animated Metric Fill */}
          <circle
            className="text-indigo-500 transition-all duration-200 ease-out"
            strokeWidth="4"
            strokeDasharray={175.93}
            strokeDashoffset={175.93 - (progress / 100) * 175.93}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
          />
        </svg>
        
        {/* Absolute Centered Text Wrapper */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-indigo-400 tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
      
      {/* Dynamic State Text Description */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-slate-300">Synchronizing Data</p>
        <p className="text-[11px] text-slate-500 font-normal">Please hold on...</p>
      </div>
    </div>
  );
};

export default Loading;

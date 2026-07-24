import React from 'react';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameWrapperProps {
  children: React.ReactNode;
  enabled: boolean;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({ children, enabled }) => {
  if (!enabled) {
    return <>{children}</>;
  }

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="py-6 px-2 min-h-screen bg-slate-900 flex flex-col items-center justify-center animate-fadeIn">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-3 py-1 rounded-full font-semibold">
          <Smartphone className="w-4 h-4 text-blue-400" />
          <span>Android App Preview Mode</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Simulating Android Flutter Smart School App View
        </p>
      </div>

      {/* Android Smartphone Device Outer Shell */}
      <div className="relative w-full max-w-[420px] h-[850px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 shadow-blue-500/10 flex flex-col overflow-hidden">
        {/* Top Camera Punch Hole */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-950 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 bg-slate-800 rounded-full border border-slate-700"></div>
        </div>

        {/* Status Bar */}
        <div className="pt-2 px-6 pb-1 flex items-center justify-between text-[11px] text-slate-300 font-semibold select-none z-40 bg-slate-900 border-b border-slate-800">
          <span>{currentTime}</span>
          <div className="flex items-center gap-2">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Device Content Screen */}
        <div className="flex-1 bg-slate-50 overflow-y-auto relative no-scrollbar rounded-b-[36px]">
          {children}
        </div>

        {/* Bottom Android Navigation Bar */}
        <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0">
          <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

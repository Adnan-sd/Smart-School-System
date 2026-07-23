import React from 'react';
import { User } from '../types';
import {
  GraduationCap,
  Bell,
  Smartphone,
  Monitor,
  UserCheck,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  onOpenRoleSelector: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  activeModule: string;
  onNavigateToAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenRoleSelector,
  isMobileFrame,
  onToggleMobileFrame,
  unreadNotificationsCount,
  onOpenNotifications,
  onNavigateToAi,
}) => {
  const roleColors: Record<string, string> = {
    Admin: 'bg-purple-100 text-purple-700 border-purple-200',
    Teacher: 'bg-blue-100 text-blue-700 border-blue-200',
    Student: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Parent: 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="px-4 py-2.5 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: App Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-800 text-base md:text-lg leading-tight tracking-tight">
                SmartSchool
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
                v2.5
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              AI-Powered School Management Cloud
            </p>
          </div>
        </div>

        {/* Center: AI Assistant Quick Action */}
        <button
          onClick={onNavigateToAi}
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200/80 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          <span>Ask AI Assistant</span>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
            Gemini
          </span>
        </button>

        {/* Right: Controls & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Smartphone Frame View Toggle */}
          <button
            onClick={onToggleMobileFrame}
            title={isMobileFrame ? 'Switch to Full Web View' : 'Switch to Android App Preview'}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              isMobileFrame
                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Web View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Android Preview</span>
              </>
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Role & Profile Button */}
          <button
            onClick={onOpenRoleSelector}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition-all cursor-pointer group"
          >
            <img
              src={currentUser.photo}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300 group-hover:scale-105 transition-transform"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {currentUser.name}
              </div>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                  roleColors[currentUser.role] || 'bg-slate-100 text-slate-700'
                }`}
              >
                {currentUser.role}
              </span>
            </div>
            <div className="flex items-center text-slate-400 group-hover:text-slate-600 pl-1">
              <UserCheck className="w-4 h-4 sm:hidden text-blue-600" />
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

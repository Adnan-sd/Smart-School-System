import React from 'react';
import { UserRole } from '../types';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck2,
  Receipt,
  CalendarDays,
  FileSpreadsheet,
  FileText,
  Megaphone,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onSelectModule: (module: string) => void;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  userRole,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'students', label: 'Students', icon: Users, roles: ['Admin', 'Teacher'] },
    { id: 'teachers', label: 'Teachers', icon: UserCheck, roles: ['Admin'] },
    { id: 'classes', label: 'Classes', icon: BookOpen, roles: ['Admin'] },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck2, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'fees', label: 'Fees & Accounts', icon: Receipt, roles: ['Admin', 'Student', 'Parent'] },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'exams', label: 'Exams & Results', icon: FileSpreadsheet, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'assignments', label: 'Assignments', icon: FileText, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'announcements', label: 'Notices', icon: Megaphone, roles: ['Admin', 'Teacher', 'Student', 'Parent'] },
    { id: 'ai-assistant', label: 'AI Study Assistant', icon: Sparkles, roles: ['Admin', 'Teacher', 'Student', 'Parent'], highlighted: true },
  ];

  const filteredItems = menuItems.filter((item) => item.roles.includes(userRole));

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible no-scrollbar">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 hidden md:block">
        Main Navigation
      </div>

      <nav className="flex md:flex-col gap-1 w-full min-w-max md:min-w-0">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          if (item.highlighted) {
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                <span className="truncate">{item.label}</span>
                {!isActive && (
                  <span className="ml-auto bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                    AI
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

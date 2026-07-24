import React from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/initialData';
import { ShieldCheck, UserCheck, GraduationCap, Users, X, CheckCircle2 } from 'lucide-react';

interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSelectUser: (user: User) => void;
}

export const RoleSelectorModal: React.FC<RoleSelectorModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  if (!isOpen) return null;

  const roleIcons: Record<UserRole, React.ReactNode> = {
    Admin: <ShieldCheck className="w-5 h-5 text-purple-600" />,
    Teacher: <UserCheck className="w-5 h-5 text-blue-600" />,
    Student: <GraduationCap className="w-5 h-5 text-emerald-600" />,
    Parent: <Users className="w-5 h-5 text-amber-600" />,
  };

  const roleBadgeStyle: Record<UserRole, string> = {
    Admin: 'bg-purple-100 text-purple-800 border-purple-200',
    Teacher: 'bg-blue-100 text-blue-800 border-blue-200',
    Student: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Parent: 'bg-amber-100 text-amber-800 border-amber-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              Switch User Role / Login
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Select a persona to experience role-specific dashboards & permissions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Personas List */}
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {INITIAL_USERS.map((user) => {
            const isSelected = currentUser.uid === user.uid;

            return (
              <div
                key={user.uid}
                onClick={() => {
                  onSelectUser(user);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-2xs shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm truncate">
                      {user.name}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${roleBadgeStyle[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Phone: {user.phone}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {roleIcons[user.role]}
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            Current active session: <span className="font-bold text-slate-800">{currentUser.name} ({currentUser.role})</span>
          </p>
        </div>
      </div>
    </div>
  );
};

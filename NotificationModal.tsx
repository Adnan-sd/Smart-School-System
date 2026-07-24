import React from 'react';
import { Announcement } from '../types';
import { Bell, X, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
  onSelectAnnouncement: (id: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  announcements,
  onSelectAnnouncement,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base">School Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs">No pending notifications</p>
            </div>
          ) : (
            announcements.map((ann) => {
              const isUrgent = ann.priority === 'Urgent';
              const isHigh = ann.priority === 'High';

              return (
                <div
                  key={ann.id}
                  onClick={() => {
                    onSelectAnnouncement(ann.id);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isUrgent
                      ? 'border-red-200 bg-red-50/50 hover:bg-red-50'
                      : isHigh
                      ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-800 text-xs">
                      {ann.title}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        isUrgent
                          ? 'bg-red-600 text-white'
                          : isHigh
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {ann.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {ann.content}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>From: {ann.author}</span>
                    <span>{ann.date}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">
            Firebase Cloud Messaging (FCM) live push alerts
          </p>
        </div>
      </div>
    </div>
  );
};

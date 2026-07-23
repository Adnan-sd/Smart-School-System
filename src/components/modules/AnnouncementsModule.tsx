import React, { useState } from 'react';
import { Announcement, User } from '../../types';
import { Megaphone, Plus, Bell, Calendar, UserCheck, X } from 'lucide-react';

interface AnnouncementsModuleProps {
  announcements: Announcement[];
  currentUser: User;
  onSaveAnnouncements: (updated: Announcement[]) => void;
}

export const AnnouncementsModule: React.FC<AnnouncementsModuleProps> = ({
  announcements,
  currentUser,
  onSaveAnnouncements,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    targetRole: 'All',
    priority: 'Normal',
  });

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;

    const created: Announcement = {
      id: `ANC-${Date.now()}`,
      title: newNotice.title,
      content: newNotice.content,
      targetRole: newNotice.targetRole || 'All',
      date: '2026-07-23',
      author: currentUser.name,
      priority: newNotice.priority || 'Normal',
    };
    onSaveAnnouncements([created, ...announcements]);
    setIsModalOpen(false);
  };

  const isTeacherOrAdmin = currentUser.role === 'Admin' || currentUser.role === 'Teacher';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-amber-600" />
            School Noticeboard & Broadcast Announcements
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Broadcast official notices, holiday alerts & fee reminders via Firebase Messaging.
          </p>
        </div>

        {isTeacherOrAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Announcement</span>
          </button>
        )}
      </div>

      {/* Notices Grid */}
      <div className="space-y-4">
        {announcements.map((ann) => {
          const priorityStyles = {
            Normal: 'border-slate-200 bg-white',
            High: 'border-amber-200 bg-amber-50/30',
            Urgent: 'border-red-200 bg-red-50/30',
          };

          const priorityBadges = {
            Normal: 'bg-slate-100 text-slate-700',
            High: 'bg-amber-600 text-white',
            Urgent: 'bg-red-600 text-white',
          };

          return (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl border shadow-2xs ${priorityStyles[ann.priority]} transition-all`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${priorityBadges[ann.priority]}`}>
                    {ann.priority} Notice
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Audience: {ann.targetRole}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {ann.date}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base mt-2">{ann.title}</h3>
              <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{ann.content}</p>

              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                  Issued By: <strong className="text-slate-800">{ann.author}</strong>
                </span>
                <span className="text-[10px] text-slate-400">Broadcast ID: #{ann.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">Broadcast School Announcement</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostNotice} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="e.g. Science Fair & Inter-House Tournament"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={newNotice.targetRole}
                    onChange={(e) => setNewNotice({ ...newNotice, targetRole: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="All">All Roles</option>
                    <option value="Teacher">Teachers Only</option>
                    <option value="Student">Students Only</option>
                    <option value="Parent">Parents Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority Level</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="Type official notice details..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-2xs cursor-pointer"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

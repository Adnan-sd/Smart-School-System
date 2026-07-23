import React, { useState } from 'react';
import { Assignment, User } from '../../types';
import { FileText, Download, Plus, Calendar, UserCheck, X } from 'lucide-react';

interface AssignmentsModuleProps {
  assignments: Assignment[];
  currentUser: User;
  onSaveAssignments: (updated: Assignment[]) => void;
}

export const AssignmentsModule: React.FC<AssignmentsModuleProps> = ({
  assignments,
  currentUser,
  onSaveAssignments,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    class: 'Class 9',
    subject: 'Biology',
    dueDate: '2026-07-30',
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Assignment = {
      assignmentID: `ASN-${Date.now()}`,
      title: newAssignment.title,
      description: newAssignment.description,
      class: newAssignment.class,
      subject: newAssignment.subject,
      teacherID: currentUser.uid,
      teacherName: currentUser.name,
      dueDate: newAssignment.dueDate,
      createdAt: '2026-07-23',
    };
    onSaveAssignments([created, ...assignments]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Homework & Homework Assignments Portal
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload subject assignments, guidelines, homework files & submission deadlines.
          </p>
        </div>

        {(currentUser.role === 'Teacher' || currentUser.role === 'Admin') && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Homework Assignment</span>
          </button>
        )}
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((a) => (
          <div
            key={a.assignmentID}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-md">
                  {a.subject} • {a.class}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Due: {a.dueDate}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base mt-3">{a.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{a.description}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold text-slate-700">{a.teacherName}</span>
              </div>

              <button
                onClick={() => alert(`Downloading homework file for: ${a.title}`)}
                className="bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Homework</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">Upload Homework Assignment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  placeholder="e.g. Photosynthesis Diagram & Mechanism Report"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={newAssignment.class}
                    onChange={(e) => setNewAssignment({ ...newAssignment, class: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                    placeholder="Biology"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Instructions</label>
                <textarea
                  rows={3}
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  placeholder="Detail instructions for students..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Submission Due Date</label>
                <input
                  type="date"
                  required
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
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
                  className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs cursor-pointer"
                >
                  Upload Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

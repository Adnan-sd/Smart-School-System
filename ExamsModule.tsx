import React, { useState } from 'react';
import { ExamRecord, Student, User } from '../../types';
import { FileSpreadsheet, Plus, Award, CheckCircle2, X } from 'lucide-react';

interface ExamsModuleProps {
  exams: ExamRecord[];
  students: Student[];
  currentUser: User;
  onSaveExams: (updated: ExamRecord[]) => void;
}

export const ExamsModule: React.FC<ExamsModuleProps> = ({ exams, students, currentUser, onSaveExams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    title: 'Mid-Term Exam',
    class: 'Class 9',
    subject: 'Biology',
    studentID: students[0]?.studentID || 'STU-1001',
    marksObtained: 85,
    totalMarks: 100,
    grade: 'A',
    examDate: '2026-07-20',
  });

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ExamRecord = {
      examID: `EXM-${Date.now()}`,
      title: newExam.title,
      class: newExam.class,
      subject: newExam.subject,
      studentID: newExam.studentID,
      marksObtained: Number(newExam.marksObtained),
      totalMarks: Number(newExam.totalMarks),
      grade: newExam.grade,
      examDate: newExam.examDate,
    };
    onSaveExams([...exams, created]);
    setIsModalOpen(false);
  };

  let displayExams = exams;
  if (currentUser.role === 'Student' || currentUser.role === 'Parent') {
    const studentID = currentUser.studentId || 'STU-1001';
    displayExams = exams.filter((e) => e.studentID === studentID);
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-purple-600" />
            Exams, Grades & Marksheet Portal
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View term marks, percentage breakdowns, subject grades & report cards.
          </p>
        </div>

        {(currentUser.role === 'Teacher' || currentUser.role === 'Admin') && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Student Marks</span>
          </button>
        )}
      </div>

      {/* Exam Result Cards / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Academic Marksheets</h3>
          <span className="text-xs text-slate-500 font-medium">Total Exam Entries: {displayExams.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                <th className="py-3 px-4">Exam Title</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4 text-center">Marks Obtained</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4">Exam Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {displayExams.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No examination records found.
                  </td>
                </tr>
              ) : (
                displayExams.map((e) => {
                  const student = students.find((s) => s.studentID === e.studentID);
                  const percentage = Math.round((e.marksObtained / e.totalMarks) * 100);

                  return (
                    <tr key={e.examID} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{e.title}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {student ? student.name : e.studentID}
                      </td>
                      <td className="py-3 px-4 text-purple-700 font-extrabold">{e.subject}</td>
                      <td className="py-3 px-4 text-slate-600">{e.class}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-extrabold text-slate-900">
                          {e.marksObtained} / {e.totalMarks}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1">({percentage}%)</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-purple-100 text-purple-800 font-black px-2.5 py-1 rounded-md text-[11px] border border-purple-200">
                          {e.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{e.examDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Marks Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">Upload Student Marks</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExam} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exam Title</label>
                <input
                  type="text"
                  required
                  value={newExam.title}
                  onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                  placeholder="e.g. Mid-Term Exam 2026"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  value={newExam.studentID}
                  onChange={(e) => setNewExam({ ...newExam, studentID: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                >
                  {students.map((s) => (
                    <option key={s.studentID} value={s.studentID}>
                      {s.name} ({s.class}-{s.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newExam.subject}
                    onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grade</label>
                  <input
                    type="text"
                    required
                    value={newExam.grade}
                    onChange={(e) => setNewExam({ ...newExam, grade: e.target.value })}
                    placeholder="e.g. A+"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Marks Obtained</label>
                  <input
                    type="number"
                    required
                    value={newExam.marksObtained}
                    onChange={(e) => setNewExam({ ...newExam, marksObtained: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Marks</label>
                  <input
                    type="number"
                    required
                    value={newExam.totalMarks}
                    onChange={(e) => setNewExam({ ...newExam, totalMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
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
                  className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-2xs cursor-pointer"
                >
                  Save Exam Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

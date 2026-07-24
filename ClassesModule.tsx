import React, { useState } from 'react';
import { ClassRoom, Teacher } from '../../types';
import { BookOpen, Users, Plus, X, UserCheck } from 'lucide-react';

interface ClassesModuleProps {
  classes: ClassRoom[];
  teachers: Teacher[];
  onSaveClasses: (updated: ClassRoom[]) => void;
}

export const ClassesModule: React.FC<ClassesModuleProps> = ({ classes, teachers, onSaveClasses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClass, setNewClass] = useState<Partial<ClassRoom>>({
    name: 'Class 9',
    section: 'C',
    classTeacher: teachers[0]?.name || 'Prof. Muhammad Tariq',
    subjects: ['Biology', 'Mathematics', 'Physics', 'English', 'Urdu'],
    totalStudents: 30,
  });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ClassRoom = {
      classID: `CLS-${newClass.name?.replace(' ', '')}${newClass.section}`,
      name: newClass.name || 'Class 9',
      section: newClass.section || 'C',
      classTeacher: newClass.classTeacher || 'Prof. Muhammad Tariq',
      subjects: newClass.subjects || ['Mathematics', 'Science', 'English'],
      totalStudents: Number(newClass.totalStudents) || 30,
    };
    onSaveClasses([...classes, created]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Classroom & Subject Allocations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage class sections, assigned class teachers, subjects & student strength.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Class Section</span>
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((c) => (
          <div
            key={c.classID}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {c.classID}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-1">
                    {c.name} - Section {c.section}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> Class Teacher:
                  </span>
                  <span className="font-bold text-slate-800 truncate max-w-[150px]">{c.classTeacher}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Enrolled Students:
                  </span>
                  <span className="font-extrabold text-slate-900">{c.totalStudents} Students</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block mb-1">Subjects Curriculum:</span>
                  <div className="flex flex-wrap gap-1">
                    {c.subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 font-medium text-[10px] px-2 py-0.5 rounded border border-slate-200"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="text-emerald-600 font-bold text-[11px]">● Active Academic Year</span>
              <span className="font-semibold text-slate-600">Smart Cloud</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">Create New Class Section</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClass} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class Name</label>
                  <input
                    type="text"
                    required
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                    placeholder="e.g. Class 9"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    required
                    value={newClass.section}
                    onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                    placeholder="e.g. C"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Class Teacher</label>
                <select
                  value={newClass.classTeacher}
                  onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                >
                  {teachers.map((t) => (
                    <option key={t.teacherID} value={t.name}>
                      {t.name} ({t.subject})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Student Capacity</label>
                <input
                  type="number"
                  value={newClass.totalStudents}
                  onChange={(e) => setNewClass({ ...newClass, totalStudents: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
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
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-2xs cursor-pointer"
                >
                  Save Class Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

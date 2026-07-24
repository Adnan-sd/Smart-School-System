import React, { useState } from 'react';
import { Teacher } from '../../types';
import { UserCheck, Search, Plus, Phone, Mail, BookOpen, X, Edit3, Trash2 } from 'lucide-react';

interface TeachersModuleProps {
  teachers: Teacher[];
  onSaveTeachers: (updated: Teacher[]) => void;
}

export const TeachersModule: React.FC<TeachersModuleProps> = ({ teachers, onSaveTeachers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    subject: 'Biology',
    assignedClasses: ['Class 9-A'],
    phone: '',
    qualification: '',
    email: '',
  });

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teacherID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      teacherID: `TCH-${200 + teachers.length + 1}`,
      name: '',
      subject: 'Biology',
      assignedClasses: ['Class 9-A', 'Class 10-A'],
      phone: '+92 312 0000000',
      qualification: 'M.Sc Education',
      email: 'faculty@smartschool.edu',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({ ...teacher });
    setIsModalOpen(true);
  };

  const handleDelete = (teacherID: string) => {
    if (confirm('Are you sure you want to remove this faculty record?')) {
      onSaveTeachers(teachers.filter((t) => t.teacherID !== teacherID));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) return;

    if (editingTeacher) {
      onSaveTeachers(
        teachers.map((t) => (t.teacherID === editingTeacher.teacherID ? ({ ...t, ...formData } as Teacher) : t))
      );
    } else {
      const newTeacher: Teacher = {
        teacherID: formData.teacherID || `TCH-${200 + teachers.length + 1}`,
        name: formData.name,
        subject: formData.subject || 'Biology',
        assignedClasses: formData.assignedClasses || ['Class 9-A'],
        phone: formData.phone || '+92 312 0000000',
        qualification: formData.qualification || 'M.Sc Faculty',
        email: formData.email || 'faculty@smartschool.edu',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      };
      onSaveTeachers([...teachers, newTeacher]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" />
            Faculty & Teachers Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage teaching staff, academic subject allocations & qualifications.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search teacher name, subject, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((t) => (
          <div
            key={t.teacherID}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
                    <p className="text-[11px] font-semibold text-purple-600">ID: {t.teacherID}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 text-slate-400 hover:text-purple-600 rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.teacherID)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Primary Subject:</span>
                  <span className="font-extrabold text-slate-800 bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">
                    {t.subject}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Qualification:</span>
                  <p className="font-semibold text-slate-700 truncate mt-0.5">{t.qualification}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Assigned Classes:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {t.assignedClasses.map((cls, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
              <div className="flex items-center gap-2 truncate">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{t.phone}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{t.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Teacher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingTeacher ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teacher Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Prof. Muhammad Tariq"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Specialization *</label>
                <input
                  type="text"
                  required
                  value={formData.subject || ''}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Biology, Mathematics, Physics"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qualification</label>
                <input
                  type="text"
                  value={formData.qualification || ''}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. M.Sc Biology (Punjab University)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 312 0000000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@smartschool.edu"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-purple-500"
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
                  {editingTeacher ? 'Update Faculty' : 'Save Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

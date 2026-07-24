import React, { useState } from 'react';
import { AttendanceRecord, Student, User } from '../../types';
import { CalendarCheck2, CheckCircle2, XCircle, Clock, Calendar, Check } from 'lucide-react';

interface AttendanceModuleProps {
  attendance: AttendanceRecord[];
  students: Student[];
  currentUser: User;
  onSaveAttendance: (updated: AttendanceRecord[]) => void;
}

export const AttendanceModule: React.FC<AttendanceModuleProps> = ({
  attendance,
  students,
  currentUser,
  onSaveAttendance,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-23');
  const [selectedClass, setSelectedClass] = useState<string>('Class 9');
  const [selectedSection, setSelectedSection] = useState<string>('A');

  // Filter students for the selected class & section
  const targetStudents = students.filter(
    (s) => s.class === selectedClass && (selectedSection === 'All' || s.section === selectedSection)
  );

  // Toggle or create attendance status for a student on selected date
  const handleToggleStatus = (studentID: string, newStatus: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    const existingIndex = attendance.findIndex(
      (a) => a.studentID === studentID && a.date === selectedDate
    );

    if (existingIndex >= 0) {
      const updated = [...attendance];
      updated[existingIndex] = { ...updated[existingIndex], status: newStatus };
      onSaveAttendance(updated);
    } else {
      const newRecord: AttendanceRecord = {
        attendanceID: `ATT-${Date.now()}-${studentID}`,
        studentID,
        date: selectedDate,
        status: newStatus,
        class: selectedClass,
        section: selectedSection === 'All' ? 'A' : selectedSection,
      };
      onSaveAttendance([...attendance, newRecord]);
    }
  };

  // Helper to get status for student
  const getStatus = (studentID: string): 'Present' | 'Absent' | 'Late' | 'Leave' => {
    const rec = attendance.find((a) => a.studentID === studentID && a.date === selectedDate);
    return rec ? rec.status : 'Present';
  };

  // Calculate statistics for selected date & class
  const classRecords = targetStudents.map((s) => getStatus(s.studentID));
  const presentCount = classRecords.filter((st) => st === 'Present').length;
  const absentCount = classRecords.filter((st) => st === 'Absent').length;
  const lateCount = classRecords.filter((st) => st === 'Late').length;
  const leaveCount = classRecords.filter((st) => st === 'Leave').length;

  const isTeacherOrAdmin = currentUser.role === 'Teacher' || currentUser.role === 'Admin';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck2 className="w-6 h-6 text-emerald-600" />
            Attendance Tracking & Registry
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time daily attendance management, status logs & historical records.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
          <Calendar className="w-4 h-4 text-slate-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      {/* Class Selector & Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase text-slate-400">Class & Section</span>
          <div className="flex items-center gap-2 mt-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-lg p-2 w-full"
            >
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
            </select>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-lg p-2 w-full"
            >
              <option value="A">Sec A</option>
              <option value="B">Sec B</option>
            </select>
          </div>
        </div>

        {/* Present Count */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Present</span>
            <h3 className="text-xl font-extrabold text-emerald-600">{presentCount}</h3>
          </div>
        </div>

        {/* Absent Count */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Absent</span>
            <h3 className="text-xl font-extrabold text-red-600">{absentCount}</h3>
          </div>
        </div>

        {/* Late / Leave Count */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Late / Leave</span>
            <h3 className="text-xl font-extrabold text-amber-600">{lateCount + leaveCount}</h3>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">
            Attendance Log for {selectedClass} ({selectedSection}) • {selectedDate}
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Total Students: {targetStudents.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Father Name</th>
                <th className="py-3 px-4 text-center">Current Status</th>
                {isTeacherOrAdmin && <th className="py-3 px-4 text-center">Mark Status</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {targetStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No students registered in this class/section.
                  </td>
                </tr>
              ) : (
                targetStudents.map((s) => {
                  const status = getStatus(s.studentID);

                  const statusBadges = {
                    Present: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    Absent: 'bg-red-100 text-red-800 border-red-200',
                    Late: 'bg-amber-100 text-amber-800 border-amber-200',
                    Leave: 'bg-blue-100 text-blue-800 border-blue-200',
                  };

                  return (
                    <tr key={s.studentID} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">Roll #{s.rollNo}</td>
                      <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                        <img
                          src={s.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                          alt={s.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                        <span>{s.name}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{s.fatherName}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${statusBadges[status]}`}>
                          {status}
                        </span>
                      </td>

                      {isTeacherOrAdmin && (
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <button
                              onClick={() => handleToggleStatus(s.studentID, 'Present')}
                              className={`px-2 py-1 rounded font-bold text-[10px] transition-colors cursor-pointer ${
                                status === 'Present'
                                  ? 'bg-emerald-600 text-white shadow-2xs'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => handleToggleStatus(s.studentID, 'Absent')}
                              className={`px-2 py-1 rounded font-bold text-[10px] transition-colors cursor-pointer ${
                                status === 'Absent'
                                  ? 'bg-red-600 text-white shadow-2xs'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Absent
                            </button>
                            <button
                              onClick={() => handleToggleStatus(s.studentID, 'Late')}
                              className={`px-2 py-1 rounded font-bold text-[10px] transition-colors cursor-pointer ${
                                status === 'Late'
                                  ? 'bg-amber-600 text-white shadow-2xs'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Late
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

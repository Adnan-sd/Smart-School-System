import React from 'react';
import { User, Student, Teacher, AttendanceRecord, FeeRecord, Announcement, Assignment } from '../../types';
import {
  Users,
  UserCheck,
  CalendarCheck2,
  Receipt,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
  Award,
  CheckCircle,
} from 'lucide-react';

interface DashboardModuleProps {
  currentUser: User;
  students: Student[];
  teachers: Teacher[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  announcements: Announcement[];
  assignments: Assignment[];
  onNavigate: (module: string) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  currentUser,
  students,
  teachers,
  attendance,
  fees,
  announcements,
  assignments,
  onNavigate,
}) => {
  // Calculations
  const todayDate = '2026-07-23';
  const todayAttendance = attendance.filter((a) => a.date === todayDate);
  const presentCount = todayAttendance.filter((a) => a.status === 'Present').length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 94;

  const pendingFees = fees.filter((f) => f.status === 'Pending' || f.status === 'Overdue');
  const totalPendingAmount = pendingFees.reduce((acc, f) => acc + f.amount, 0);

  // Student specific stats
  const studentRecord = students.find((s) => s.studentID === currentUser.studentId) || students[0];
  const myAttendance = attendance.filter((a) => a.studentID === studentRecord?.studentID);
  const myPresent = myAttendance.filter((a) => a.status === 'Present').length;
  const myAttendancePct = myAttendance.length > 0 ? Math.round((myPresent / myAttendance.length) * 100) : 100;
  const myFees = fees.filter((f) => f.studentID === studentRecord?.studentID);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-6 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Smart Cloud Dashboard • {currentUser.role} Portal</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}!
            </h2>
            <p className="text-xs text-blue-100 max-w-xl mt-1">
              {currentUser.role === 'Admin' && 'Oversee school administration, manage staff & students, and track financial records.'}
              {currentUser.role === 'Teacher' && 'Track timetables, mark attendance, assign homework, and post class marks.'}
              {currentUser.role === 'Student' && 'Check your attendance, download homework assignments, review exam results & ask AI.'}
              {currentUser.role === 'Parent' && 'Monitor your child academic progress, track fee status, and receive school notices.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="self-start md:self-auto bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Launch AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Role-adaptive Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {currentUser.role === 'Admin' && (
          <>
            <div
              onClick={() => onNavigate('students')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Students</span>
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">{students.length * 28}</span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +5.2%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Across Class 1 to 10</p>
            </div>

            <div
              onClick={() => onNavigate('teachers')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-purple-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Faculty Teachers</span>
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">{teachers.length + 18}</span>
                <span className="text-[11px] text-slate-500">Active Faculty</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Science & Arts Dept</p>
            </div>

            <div
              onClick={() => onNavigate('attendance')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Today Attendance</span>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CalendarCheck2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">{attendanceRate}%</span>
                <span className="text-[11px] font-bold text-emerald-600">Optimal</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Logged for {todayDate}</p>
            </div>

            <div
              onClick={() => onNavigate('fees')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Fee Collections</span>
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Receipt className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-slate-900">PKR {totalPendingAmount.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">
                {pendingFees.length} Pending Vouchers
              </p>
            </div>
          </>
        )}

        {(currentUser.role === 'Student' || currentUser.role === 'Parent') && (
          <>
            <div
              onClick={() => onNavigate('attendance')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Attendance Rate</span>
                <CalendarCheck2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-emerald-600">{myAttendancePct}%</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Good</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">For {studentRecord.name}</p>
            </div>

            <div
              onClick={() => onNavigate('assignments')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Active Homework</span>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">{assignments.length}</span>
                <span className="text-[11px] font-semibold text-blue-600">Pending</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Class 9 Biology & Math</p>
            </div>

            <div
              onClick={() => onNavigate('exams')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-purple-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Academic Grade</span>
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-purple-700">A+</span>
                <span className="text-[11px] text-slate-500">Avg 88%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Mid-Term Results</p>
            </div>

            <div
              onClick={() => onNavigate('fees')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Fee Voucher</span>
                <Receipt className="w-5 h-5 text-amber-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-base font-extrabold text-slate-900">
                  {myFees.some((f) => f.status === 'Paid') ? 'July Paid' : 'Due Soon'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">August Voucher Pending</p>
            </div>
          </>
        )}

        {currentUser.role === 'Teacher' && (
          <>
            <div
              onClick={() => onNavigate('attendance')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Class 9-A Attendance</span>
                <CalendarCheck2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">31/32</span>
                <span className="text-[11px] font-bold text-emerald-600">Marked</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Today {todayDate}</p>
            </div>

            <div
              onClick={() => onNavigate('assignments')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-purple-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Assignments Uploaded</span>
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">12</span>
                <span className="text-[11px] text-slate-500">This Month</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Biology & Science</p>
            </div>

            <div
              onClick={() => onNavigate('timetable')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-amber-300 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Periods Today</span>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">3 Lectures</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Next: 08:45 AM (Biology 9-A)</p>
            </div>

            <div
              onClick={() => onNavigate('ai-assistant')}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase">AI Quiz Generator</span>
                <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-sm font-bold text-slate-800">Generate Biology Quiz</span>
              </div>
              <p className="text-[11px] text-blue-600 font-medium mt-1">Instant 5-MCQ creation</p>
            </div>
          </>
        )}
      </div>

      {/* Main Grid: Announcements & Quick AI Assistant Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: School Announcements & Notices */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Notice Board & Broadcasts</h3>
              <p className="text-xs text-slate-400">Latest school notices from Principal & Administration</p>
            </div>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-slate-50 transition-colors flex items-start gap-3"
              >
                <div
                  className={`w-2 shrink-0 self-stretch rounded-full ${
                    ann.priority === 'Urgent'
                      ? 'bg-red-500'
                      : ann.priority === 'High'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-800 text-xs truncate">{ann.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{ann.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{ann.content}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                      Author: {ann.author}
                    </span>
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                      Target: {ann.targetRole}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: AI Assistant Feature Showcase */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Study & Teaching Assistant</span>
            </div>
            <h3 className="text-lg font-bold">Ask Gemini Educational AI</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Need help explaining complex subjects, creating quizzes, or translating lessons? Ask Gemini AI in any language!
            </p>

            {/* Prompt Chips */}
            <div className="mt-4 space-y-2">
              <div
                onClick={() => onNavigate('ai-assistant')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span>"Explain Photosynthesis in Urdu"</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div
                onClick={() => onNavigate('ai-assistant')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span>"Generate Class 9 Biology Quiz"</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div
                onClick={() => onNavigate('ai-assistant')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span>"Summarize Chapter 3 Cell Function"</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Powered by Gemini 3.6 Flash</span>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Try Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

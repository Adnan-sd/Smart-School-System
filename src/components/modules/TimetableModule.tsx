import React, { useState } from 'react';
import { TimetableSlot } from '../../types';
import { CalendarDays, Clock, BookOpen, User } from 'lucide-react';

interface TimetableModuleProps {
  timetable: TimetableSlot[];
}

export const TimetableModule: React.FC<TimetableModuleProps> = ({ timetable }) => {
  const [selectedClass, setSelectedClass] = useState<string>('Class 9');
  const [selectedSection, setSelectedSection] = useState<string>('A');

  const days: TimetableSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [1, 2, 3, 4, 5, 6];

  const times = [
    '08:00 - 08:45 AM',
    '08:45 - 09:30 AM',
    '09:30 - 10:15 AM',
    '10:15 - 11:00 AM (Break)',
    '11:00 - 11:45 AM',
    '11:45 - 12:30 PM',
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-blue-600" />
            Class Schedule & Timetable Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Weekly class periods schedule, subject allocations & faculty lectures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl p-2.5"
          >
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl p-2.5"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
        </div>
      </div>

      {/* Timetable Table Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">
            Weekly Matrix for {selectedClass} ({selectedSection})
          </h3>
          <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            6 Periods / Day
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-100 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                <th className="py-3 px-4 w-36">Period & Time</th>
                {days.map((day) => (
                  <th key={day} className="py-3 px-4 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {periods.map((pNum, idx) => (
                <tr key={pNum} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800 bg-slate-50/50">
                    <div className="text-blue-700 font-extrabold">Period {pNum}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{times[idx]}</div>
                  </td>

                  {days.map((day) => {
                    const slot = timetable.find(
                      (t) =>
                        t.day === day &&
                        t.period === pNum &&
                        t.class === selectedClass &&
                        t.section === selectedSection
                    );

                    if (pNum === 4) {
                      return (
                        <td key={day} className="py-3 px-2 text-center bg-amber-50/30 text-amber-700 font-bold text-[10px]">
                          Recess / Break
                        </td>
                      );
                    }

                    return (
                      <td key={day} className="py-2.5 px-2 text-center">
                        {slot ? (
                          <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-100 flex flex-col items-center justify-center">
                            <span className="font-extrabold text-blue-900 text-xs">{slot.subject}</span>
                            <span className="text-[10px] text-blue-700 mt-0.5 truncate max-w-[110px]">
                              {slot.teacherName}
                            </span>
                          </div>
                        ) : (
                          <div className="p-2 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-[10px]">
                            Free Period
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

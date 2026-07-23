import React, { useState, useEffect } from 'react';
import { User, Student, Teacher, ClassRoom, AttendanceRecord, FeeRecord, ExamRecord, Assignment, TimetableSlot, Announcement } from './types';
import { storageService } from './services/storageService';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RoleSelectorModal } from './components/RoleSelectorModal';
import { NotificationModal } from './components/NotificationModal';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';

import { DashboardModule } from './components/modules/DashboardModule';
import { StudentsModule } from './components/modules/StudentsModule';
import { TeachersModule } from './components/modules/TeachersModule';
import { ClassesModule } from './components/modules/ClassesModule';
import { AttendanceModule } from './components/modules/AttendanceModule';
import { FeesModule } from './components/modules/FeesModule';
import { TimetableModule } from './components/modules/TimetableModule';
import { ExamsModule } from './components/modules/ExamsModule';
import { AssignmentsModule } from './components/modules/AssignmentsModule';
import { AnnouncementsModule } from './components/modules/AnnouncementsModule';
import { AiAssistantModule } from './components/modules/AiAssistantModule';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => storageService.getCurrentUser());
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  const [students, setStudents] = useState<Student[]>(() => storageService.getStudents());
  const [teachers, setTeachers] = useState<Teacher[]>(() => storageService.getTeachers());
  const [classes, setClasses] = useState<ClassRoom[]>(() => storageService.getClasses());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => storageService.getAttendance());
  const [fees, setFees] = useState<FeeRecord[]>(() => storageService.getFees());
  const [exams, setExams] = useState<ExamRecord[]>(() => storageService.getExams());
  const [assignments, setAssignments] = useState<Assignment[]>(() => storageService.getAssignments());
  const [timetable, setTimetable] = useState<TimetableSlot[]>(() => storageService.getTimetable());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => storageService.getAnnouncements());

  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Sync handlers
  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    storageService.setCurrentUser(user);
    // Reset module if active module isn't permitted for the new role
    if (user.role === 'Student' || user.role === 'Parent') {
      if (activeModule === 'teachers' || activeModule === 'classes') {
        setActiveModule('dashboard');
      }
    }
  };

  const handleSaveStudents = (updated: Student[]) => {
    setStudents(updated);
    storageService.saveStudents(updated);
  };

  const handleSaveTeachers = (updated: Teacher[]) => {
    setTeachers(updated);
    storageService.saveTeachers(updated);
  };

  const handleSaveClasses = (updated: ClassRoom[]) => {
    setClasses(updated);
    storageService.saveClasses(updated);
  };

  const handleSaveAttendance = (updated: AttendanceRecord[]) => {
    setAttendance(updated);
    storageService.saveAttendance(updated);
  };

  const handleSaveFees = (updated: FeeRecord[]) => {
    setFees(updated);
    storageService.saveFees(updated);
  };

  const handleSaveExams = (updated: ExamRecord[]) => {
    setExams(updated);
    storageService.saveExams(updated);
  };

  const handleSaveAssignments = (updated: Assignment[]) => {
    setAssignments(updated);
    storageService.saveAssignments(updated);
  };

  const handleSaveAnnouncements = (updated: Announcement[]) => {
    setAnnouncements(updated);
    storageService.saveAnnouncements(updated);
  };

  return (
    <MobileFrameWrapper enabled={isMobileFrame}>
      <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
        {/* Top Navbar */}
        <Navbar
          currentUser={currentUser}
          onOpenRoleSelector={() => setIsRoleModalOpen(true)}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
          unreadNotificationsCount={announcements.length}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          activeModule={activeModule}
          onNavigateToAi={() => setActiveModule('ai-assistant')}
        />

        {/* Main Body */}
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
          {/* Left Navigation Sidebar */}
          <Sidebar
            activeModule={activeModule}
            onSelectModule={setActiveModule}
            userRole={currentUser.role}
          />

          {/* Center Workspace Content Area */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {activeModule === 'dashboard' && (
              <DashboardModule
                currentUser={currentUser}
                students={students}
                teachers={teachers}
                attendance={attendance}
                fees={fees}
                announcements={announcements}
                assignments={assignments}
                onNavigate={setActiveModule}
              />
            )}

            {activeModule === 'students' && (
              <StudentsModule students={students} onSaveStudents={handleSaveStudents} />
            )}

            {activeModule === 'teachers' && (
              <TeachersModule teachers={teachers} onSaveTeachers={handleSaveTeachers} />
            )}

            {activeModule === 'classes' && (
              <ClassesModule classes={classes} teachers={teachers} onSaveClasses={handleSaveClasses} />
            )}

            {activeModule === 'attendance' && (
              <AttendanceModule
                attendance={attendance}
                students={students}
                currentUser={currentUser}
                onSaveAttendance={handleSaveAttendance}
              />
            )}

            {activeModule === 'fees' && (
              <FeesModule
                fees={fees}
                students={students}
                currentUser={currentUser}
                onSaveFees={handleSaveFees}
              />
            )}

            {activeModule === 'timetable' && <TimetableModule timetable={timetable} />}

            {activeModule === 'exams' && (
              <ExamsModule
                exams={exams}
                students={students}
                currentUser={currentUser}
                onSaveExams={handleSaveExams}
              />
            )}

            {activeModule === 'assignments' && (
              <AssignmentsModule
                assignments={assignments}
                currentUser={currentUser}
                onSaveAssignments={handleSaveAssignments}
              />
            )}

            {activeModule === 'announcements' && (
              <AnnouncementsModule
                announcements={announcements}
                currentUser={currentUser}
                onSaveAnnouncements={handleSaveAnnouncements}
              />
            )}

            {activeModule === 'ai-assistant' && <AiAssistantModule currentUser={currentUser} />}
          </main>
        </div>

        {/* Role Switcher Modal */}
        <RoleSelectorModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          currentUser={currentUser}
          onSelectUser={handleSelectUser}
        />

        {/* Notification Drawer Modal */}
        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          announcements={announcements}
          onSelectAnnouncement={() => setActiveModule('announcements')}
        />
      </div>
    </MobileFrameWrapper>
  );
}

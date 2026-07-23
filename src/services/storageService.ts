import {
  Student,
  Teacher,
  ClassRoom,
  AttendanceRecord,
  FeeRecord,
  ExamRecord,
  Assignment,
  TimetableSlot,
  Announcement,
  User,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_CLASSES,
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  INITIAL_EXAMS,
  INITIAL_ASSIGNMENTS,
  INITIAL_TIMETABLE,
  INITIAL_ANNOUNCEMENTS,
} from '../data/initialData';

const KEYS = {
  USERS: 'ssms_users',
  STUDENTS: 'ssms_students',
  TEACHERS: 'ssms_teachers',
  CLASSES: 'ssms_classes',
  ATTENDANCE: 'ssms_attendance',
  FEES: 'ssms_fees',
  EXAMS: 'ssms_exams',
  ASSIGNMENTS: 'ssms_assignments',
  TIMETABLE: 'ssms_timetable',
  ANNOUNCEMENTS: 'ssms_announcements',
  CURRENT_USER: 'ssms_current_user',
};

function getLocal<T>(key: string, defaultData: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return defaultData;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage`, e);
  }
}

export const storageService = {
  getUsers: (): User[] => getLocal(KEYS.USERS, INITIAL_USERS),
  saveUsers: (users: User[]) => setLocal(KEYS.USERS, users),

  getCurrentUser: (): User => getLocal(KEYS.CURRENT_USER, INITIAL_USERS[0]),
  setCurrentUser: (user: User) => setLocal(KEYS.CURRENT_USER, user),

  getStudents: (): Student[] => getLocal(KEYS.STUDENTS, INITIAL_STUDENTS),
  saveStudents: (students: Student[]) => setLocal(KEYS.STUDENTS, students),

  getTeachers: (): Teacher[] => getLocal(KEYS.TEACHERS, INITIAL_TEACHERS),
  saveTeachers: (teachers: Teacher[]) => setLocal(KEYS.TEACHERS, teachers),

  getClasses: (): ClassRoom[] => getLocal(KEYS.CLASSES, INITIAL_CLASSES),
  saveClasses: (classes: ClassRoom[]) => setLocal(KEYS.CLASSES, classes),

  getAttendance: (): AttendanceRecord[] => getLocal(KEYS.ATTENDANCE, INITIAL_ATTENDANCE),
  saveAttendance: (att: AttendanceRecord[]) => setLocal(KEYS.ATTENDANCE, att),

  getFees: (): FeeRecord[] => getLocal(KEYS.FEES, INITIAL_FEES),
  saveFees: (fees: FeeRecord[]) => setLocal(KEYS.FEES, fees),

  getExams: (): ExamRecord[] => getLocal(KEYS.EXAMS, INITIAL_EXAMS),
  saveExams: (exams: ExamRecord[]) => setLocal(KEYS.EXAMS, exams),

  getAssignments: (): Assignment[] => getLocal(KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS),
  saveAssignments: (assignments: Assignment[]) => setLocal(KEYS.ASSIGNMENTS, assignments),

  getTimetable: (): TimetableSlot[] => getLocal(KEYS.TIMETABLE, INITIAL_TIMETABLE),
  saveTimetable: (tt: TimetableSlot[]) => setLocal(KEYS.TIMETABLE, tt),

  getAnnouncements: (): Announcement[] => getLocal(KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS),
  saveAnnouncements: (announcements: Announcement[]) => setLocal(KEYS.ANNOUNCEMENTS, announcements),

  resetAllData: () => {
    localStorage.removeItem(KEYS.USERS);
    localStorage.removeItem(KEYS.STUDENTS);
    localStorage.removeItem(KEYS.TEACHERS);
    localStorage.removeItem(KEYS.CLASSES);
    localStorage.removeItem(KEYS.ATTENDANCE);
    localStorage.removeItem(KEYS.FEES);
    localStorage.removeItem(KEYS.EXAMS);
    localStorage.removeItem(KEYS.ASSIGNMENTS);
    localStorage.removeItem(KEYS.TIMETABLE);
    localStorage.removeItem(KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(KEYS.CURRENT_USER);
  },
};

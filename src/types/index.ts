export type UserRole = 'Admin' | 'Teacher' | 'Student' | 'Parent';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  photo: string;
  studentId?: string; // Links parent or student to specific record
}

export interface Student {
  studentID: string;
  name: string;
  class: string;
  section: string;
  fatherName: string;
  rollNo: string;
  phone: string;
  address: string;
  avatar?: string;
  parentPhone?: string;
}

export interface Teacher {
  teacherID: string;
  name: string;
  subject: string;
  assignedClasses: string[];
  phone: string;
  qualification: string;
  email: string;
  avatar?: string;
}

export interface ClassRoom {
  classID: string;
  name: string;
  section: string;
  classTeacher: string;
  subjects: string[];
  totalStudents: number;
}

export interface AttendanceRecord {
  attendanceID: string;
  studentID: string;
  date: string; // YYYY-MM-DD
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  class: string;
  section: string;
}

export interface FeeRecord {
  feeID: string;
  studentID: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
}

export interface ExamRecord {
  examID: string;
  title: string;
  class: string;
  subject: string;
  studentID: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  examDate: string;
}

export interface Assignment {
  assignmentID: string;
  title: string;
  description: string;
  class: string;
  subject: string;
  fileUrl?: string;
  teacherID: string;
  teacherName: string;
  dueDate: string;
  createdAt: string;
}

export interface TimetableSlot {
  id: string;
  class: string;
  section: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number; // 1 - 6
  time: string;
  subject: string;
  teacherName: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: 'All' | 'Teacher' | 'Student' | 'Parent';
  date: string;
  author: string;
  priority: 'Normal' | 'High' | 'Urgent';
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  taskType?: 'explain' | 'quiz' | 'summary' | 'mcq' | 'general';
}

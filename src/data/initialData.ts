import { Student, Teacher, ClassRoom, AttendanceRecord, FeeRecord, ExamRecord, Assignment, TimetableSlot, Announcement, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    uid: 'u_admin',
    name: 'Dr. Sarah Ahmed',
    email: 'admin@smartschool.edu',
    role: 'Admin',
    phone: '+92 300 1234567',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    uid: 'u_teacher1',
    name: 'Prof. Muhammad Tariq',
    email: 'tariq@smartschool.edu',
    role: 'Teacher',
    phone: '+92 312 9876543',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  {
    uid: 'u_student1',
    name: 'Ali Raza',
    email: 'ali.raza@student.edu',
    role: 'Student',
    phone: '+92 333 4567890',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    studentId: 'STU-1001',
  },
  {
    uid: 'u_parent1',
    name: 'Sajjad Hussain',
    email: 'sajjad.parent@gmail.com',
    role: 'Parent',
    phone: '+92 300 9988776',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    studentId: 'STU-1001',
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    studentID: 'STU-1001',
    name: 'Ali Raza',
    class: 'Class 9',
    section: 'A',
    fatherName: 'Sajjad Hussain',
    rollNo: '09',
    phone: '+92 333 4567890',
    address: 'House #45, Block B, Model Town, Lahore',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    parentPhone: '+92 300 9988776'
  },
  {
    studentID: 'STU-1002',
    name: 'Ayesha Fatima',
    class: 'Class 9',
    section: 'A',
    fatherName: 'Kamran Malik',
    rollNo: '12',
    phone: '+92 321 1122334',
    address: 'Street #12, Gulberg III, Lahore',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    parentPhone: '+92 321 8899000'
  },
  {
    studentID: 'STU-1003',
    name: 'Usman Ghani',
    class: 'Class 10',
    section: 'B',
    fatherName: 'Ghani Ur Rehman',
    rollNo: '18',
    phone: '+92 345 6677889',
    address: 'Sector F-8, Islamabad',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    parentPhone: '+92 345 1122334'
  },
  {
    studentID: 'STU-1004',
    name: 'Zainab Bibi',
    class: 'Class 10',
    section: 'A',
    fatherName: 'Riaz Ahmed',
    rollNo: '21',
    phone: '+92 301 3344556',
    address: 'Johar Town, Block G, Lahore',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    parentPhone: '+92 301 9900112'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    teacherID: 'TCH-201',
    name: 'Prof. Muhammad Tariq',
    subject: 'Biology',
    assignedClasses: ['Class 9-A', 'Class 10-A'],
    phone: '+92 312 9876543',
    qualification: 'M.Sc Biology (Punjab University)',
    email: 'tariq@smartschool.edu',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    teacherID: 'TCH-202',
    name: 'Maam Sadia Khan',
    subject: 'Mathematics',
    assignedClasses: ['Class 9-A', 'Class 9-B', 'Class 10-B'],
    phone: '+92 322 4433221',
    qualification: 'M.Phil Mathematics (NUST)',
    email: 'sadia@smartschool.edu',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    teacherID: 'TCH-203',
    name: 'Dr. Bilal Qureshi',
    subject: 'Physics',
    assignedClasses: ['Class 10-A', 'Class 10-B'],
    phone: '+92 331 5566778',
    qualification: 'Ph.D Physics (FAST)',
    email: 'bilal@smartschool.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CLASSES: ClassRoom[] = [
  {
    classID: 'CLS-9A',
    name: 'Class 9',
    section: 'A',
    classTeacher: 'Prof. Muhammad Tariq',
    subjects: ['Biology', 'Mathematics', 'Physics', 'English', 'Urdu', 'Computer Science'],
    totalStudents: 32
  },
  {
    classID: 'CLS-9B',
    name: 'Class 9',
    section: 'B',
    classTeacher: 'Maam Sadia Khan',
    subjects: ['Mathematics', 'Chemistry', 'English', 'Urdu', 'Islamiyat'],
    totalStudents: 28
  },
  {
    classID: 'CLS-10A',
    name: 'Class 10',
    section: 'A',
    classTeacher: 'Dr. Bilal Qureshi',
    subjects: ['Physics', 'Biology', 'Mathematics', 'Chemistry', 'English'],
    totalStudents: 35
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { attendanceID: 'ATT-1', studentID: 'STU-1001', date: '2026-07-20', status: 'Present', class: 'Class 9', section: 'A' },
  { attendanceID: 'ATT-2', studentID: 'STU-1001', date: '2026-07-21', status: 'Present', class: 'Class 9', section: 'A' },
  { attendanceID: 'ATT-3', studentID: 'STU-1001', date: '2026-07-22', status: 'Present', class: 'Class 9', section: 'A' },
  { attendanceID: 'ATT-4', studentID: 'STU-1001', date: '2026-07-23', status: 'Late', class: 'Class 9', section: 'A' },
  { attendanceID: 'ATT-5', studentID: 'STU-1002', date: '2026-07-23', status: 'Present', class: 'Class 9', section: 'A' },
  { attendanceID: 'ATT-6', studentID: 'STU-1003', date: '2026-07-23', status: 'Absent', class: 'Class 10', section: 'B' },
  { attendanceID: 'ATT-7', studentID: 'STU-1004', date: '2026-07-23', status: 'Present', class: 'Class 10', section: 'A' },
];

export const INITIAL_FEES: FeeRecord[] = [
  { feeID: 'FEE-901', studentID: 'STU-1001', month: 'July 2026', amount: 8500, dueDate: '2026-07-10', status: 'Paid', paidDate: '2026-07-08' },
  { feeID: 'FEE-902', studentID: 'STU-1001', month: 'August 2026', amount: 8500, dueDate: '2026-08-10', status: 'Pending' },
  { feeID: 'FEE-903', studentID: 'STU-1002', month: 'July 2026', amount: 8500, dueDate: '2026-07-10', status: 'Paid', paidDate: '2026-07-05' },
  { feeID: 'FEE-904', studentID: 'STU-1003', month: 'July 2026', amount: 9200, dueDate: '2026-07-10', status: 'Overdue' },
  { feeID: 'FEE-905', studentID: 'STU-1004', month: 'July 2026', amount: 9200, dueDate: '2026-07-10', status: 'Paid', paidDate: '2026-07-09' },
];

export const INITIAL_EXAMS: ExamRecord[] = [
  { examID: 'EXM-1', title: 'Mid-Term Exam', class: 'Class 9', subject: 'Biology', studentID: 'STU-1001', marksObtained: 88, totalMarks: 100, grade: 'A+', examDate: '2026-06-15' },
  { examID: 'EXM-2', title: 'Mid-Term Exam', class: 'Class 9', subject: 'Mathematics', studentID: 'STU-1001', marksObtained: 92, totalMarks: 100, grade: 'A+', examDate: '2026-06-17' },
  { examID: 'EXM-3', title: 'Mid-Term Exam', class: 'Class 9', subject: 'Physics', studentID: 'STU-1001', marksObtained: 84, totalMarks: 100, grade: 'A', examDate: '2026-06-19' },
  { examID: 'EXM-4', title: 'Mid-Term Exam', class: 'Class 9', subject: 'Biology', studentID: 'STU-1002', marksObtained: 95, totalMarks: 100, grade: 'A+', examDate: '2026-06-15' },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    assignmentID: 'ASN-501',
    title: 'Photosynthesis Diagram & Mechanism Report',
    description: 'Draw and label the chloroplast structure, then explain light and dark reactions step-by-step.',
    class: 'Class 9',
    subject: 'Biology',
    teacherID: 'TCH-201',
    teacherName: 'Prof. Muhammad Tariq',
    dueDate: '2026-07-28',
    createdAt: '2026-07-20',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    assignmentID: 'ASN-502',
    title: 'Quadratic Equations Practice Sheet 4',
    description: 'Solve problems 1 to 20 from Chapter 4 using factorization and the quadratic formula.',
    class: 'Class 9',
    subject: 'Mathematics',
    teacherID: 'TCH-202',
    teacherName: 'Maam Sadia Khan',
    dueDate: '2026-07-30',
    createdAt: '2026-07-22'
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 'TT-1', class: 'Class 9', section: 'A', day: 'Monday', period: 1, time: '08:00 - 08:45 AM', subject: 'Biology', teacherName: 'Prof. Muhammad Tariq' },
  { id: 'TT-2', class: 'Class 9', section: 'A', day: 'Monday', period: 2, time: '08:45 - 09:30 AM', subject: 'Mathematics', teacherName: 'Maam Sadia Khan' },
  { id: 'TT-3', class: 'Class 9', section: 'A', day: 'Monday', period: 3, time: '09:30 - 10:15 AM', subject: 'Physics', teacherName: 'Dr. Bilal Qureshi' },
  { id: 'TT-4', class: 'Class 9', section: 'A', day: 'Tuesday', period: 1, time: '08:00 - 08:45 AM', subject: 'English', teacherName: 'Sir Hamza' },
  { id: 'TT-5', class: 'Class 9', section: 'A', day: 'Tuesday', period: 2, time: '08:45 - 09:30 AM', subject: 'Biology', teacherName: 'Prof. Muhammad Tariq' },
  { id: 'TT-6', class: 'Class 9', section: 'A', day: 'Wednesday', period: 1, time: '08:00 - 08:45 AM', subject: 'Computer Science', teacherName: 'Engr. Hassan' },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANC-101',
    title: 'Summer Vacation Sports Festival & Robotics Workshop',
    content: 'The Annual Inter-House Science & Sports competition will be held on August 5th. All students can register with class teachers.',
    targetRole: 'All',
    date: '2026-07-22',
    author: 'Principal Office',
    priority: 'High'
  },
  {
    id: 'ANC-102',
    title: 'August Fee Voucher Issuance',
    content: 'Tuition fee vouchers for August 2026 have been generated. Parents are requested to deposit fees before August 10th.',
    targetRole: 'Parent',
    date: '2026-07-21',
    author: 'Accounts Department',
    priority: 'Normal'
  },
  {
    id: 'ANC-103',
    title: 'Biology Class 9 Quiz Alert',
    content: 'Class 9-A students are notified of an online AI-generated revision quiz on Chapter 3 tomorrow.',
    targetRole: 'Student',
    date: '2026-07-23',
    author: 'Prof. Muhammad Tariq',
    priority: 'Urgent'
  }
];

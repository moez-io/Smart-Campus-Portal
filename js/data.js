// Application data (arrays of objects) shared by all pages.
const COURSES = [
  { code: 'CS-301', name: 'Web Technology', instructor: 'Dr. Ayesha Khan', credits: 3, semester: 5, status: 'Ongoing', attendance: 92 },
  { code: 'CS-302', name: 'Database Systems', instructor: 'Prof. Imran Malik', credits: 3, semester: 5, status: 'Ongoing', attendance: 88 },
  { code: 'CS-303', name: 'Operating Systems', instructor: 'Dr. Saad Rauf', credits: 4, semester: 5, status: 'Ongoing', attendance: 85 },
  { code: 'CS-304', name: 'Computer Networks', instructor: 'Ms. Hina Tariq', credits: 3, semester: 5, status: 'Ongoing', attendance: 90 },
  { code: 'CS-202', name: 'Computer Architecture & Assembly', instructor: 'Dr. Bilal Ahmed', credits: 4, semester: 4, status: 'Completed', attendance: 94 },
  { code: 'CS-201', name: 'Data Structures', instructor: 'Prof. Nadia Hussain', credits: 4, semester: 3, status: 'Completed', attendance: 91 },
  { code: 'MT-205', name: 'Linear Algebra', instructor: 'Dr. Kamran Iqbal', credits: 3, semester: 4, status: 'Completed', attendance: 89 },
  { code: 'CS-401', name: 'Software Engineering', instructor: 'Dr. Ayesha Khan', credits: 3, semester: 6, status: 'Upcoming', attendance: 0 }
];

const ANNOUNCEMENTS = [
  { title: 'Mid-Term Examination Schedule Released', description: 'Mid-term exams begin on 2 November. Download your datesheet from the examination office.', date: '2026-10-09', category: 'Examination' },
  { title: 'Course Registration for Spring Semester', description: 'Online registration opens next month. Clear any pending dues before registering.', date: '2026-10-08', category: 'Academic' },
  { title: 'Annual Tech Fest 2026', description: 'Hackathon, project showcase and career fair open to all departments.', date: '2026-10-07', category: 'Event' },
  { title: 'Library Timings Extended', description: 'The central library stays open until 10 PM during the exam period.', date: '2026-10-05', category: 'General' },
  { title: 'Assignment Submission Policy Update', description: 'Late submissions lose 10% per day. Plan your deadlines early.', date: '2026-10-03', category: 'Academic' },
  { title: 'Quiz Week Guidelines', description: 'Quizzes run in regular lab and lecture slots. Bring your student ID.', date: '2026-10-01', category: 'Examination' }
];

const EVENTS = [
  { title: 'Web Development Workshop', date: '2026-10-17', place: 'Lab 3, CS Block' },
  { title: 'Career Counselling Session', date: '2026-10-21', place: 'Main Auditorium' },
  { title: 'Annual Tech Fest', date: '2026-10-28', place: 'University Ground' },
  { title: 'Inter-Department Sports Day', date: '2026-11-05', place: 'Sports Complex' }
];

const SCHEDULE = [
  { course: 'Web Technology', instructor: 'Dr. Ayesha Khan', day: 'Monday', start: '09:00', end: '10:30', room: 'Lab 3' },
  { course: 'Database Systems', instructor: 'Prof. Imran Malik', day: 'Monday', start: '11:00', end: '12:30', room: 'Room 204' },
  { course: 'Operating Systems', instructor: 'Dr. Saad Rauf', day: 'Tuesday', start: '09:00', end: '10:30', room: 'Room 110' },
  { course: 'Computer Networks', instructor: 'Ms. Hina Tariq', day: 'Tuesday', start: '12:00', end: '13:30', room: 'Lab 1' },
  { course: 'Web Technology', instructor: 'Dr. Ayesha Khan', day: 'Wednesday', start: '10:00', end: '11:30', room: 'Room 204' },
  { course: 'Database Systems', instructor: 'Prof. Imran Malik', day: 'Thursday', start: '09:00', end: '10:30', room: 'Lab 2' },
  { course: 'Operating Systems', instructor: 'Dr. Saad Rauf', day: 'Thursday', start: '11:00', end: '12:30', room: 'Room 110' },
  { course: 'Computer Networks', instructor: 'Ms. Hina Tariq', day: 'Friday', start: '09:00', end: '10:30', room: 'Room 305' }
];

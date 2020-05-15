export interface IPerson {
  profileURL: string;
  img: string;
  name: string;
  bio: string;
  schoolID: string;
  // personType - Instructor, Student, etc.
  personType: string;
  enrolledCourses: string[];
  taughtCourses: string[];
  email: string;
  password: string;
}

export interface ICourse {
  _id?: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  image: string;
  name: string;
  description: string;
  introText: string;
  instructors: string[];
  instructorIDs: string[];
  courseCode: string;
  tags: string[];
  schoolID: string;
  syllabus: string;
  active: boolean;
}

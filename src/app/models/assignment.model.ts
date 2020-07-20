export interface IAssignment {
  _id?: string;
  name: string;
  openDate: Date;
  dueDate: Date;
  closeDate: Date;
  description: string;
  type: string; // What kind of assignment? A Quiz? Upload?
  allowedFileExtensions: string[];
  points: number;
  studentScore: number;
  courseID: string;
  graded: boolean;
  layoutID: string;
}

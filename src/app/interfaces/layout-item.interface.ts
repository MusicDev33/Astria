import { IQuizAnswer } from '@interfaces/quiz-answer.interface';

export interface ILayoutItem {
  question: string;
  type: string;
  answers?: IQuizAnswer[];
  assignmentID: string;
}

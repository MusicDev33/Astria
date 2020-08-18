export interface IQuizQuestion {
  number: number;
  text: string;
  answers: any;
  answered: boolean;
  selectedAnswers: string[];
  points: number;
}

export interface IQuizAnswer {
  answerID: string; // a, b, c, d, etc.
  text: string;
  isCorrect: boolean;
  quizID: string;
  quizQuestionNumber: number;
}

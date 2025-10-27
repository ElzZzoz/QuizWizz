export interface QuestionFormValues {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
  difficulty: "easy" | "medium" | "hard";
  type: string;
  quizId?: string;
  questionId?: string;
  answerId?: string;
  qustion?: Question;
}
interface Question {
  _id: string;
  title: string;
  description: string;
  options: { A: string; B: string; C: string; D: string };
  answer: string;
  difficulty: string;
  type: string;
}

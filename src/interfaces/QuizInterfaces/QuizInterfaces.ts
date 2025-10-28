export interface CreateQuizPayload {
  title: string;
  description?: string;
  group?: string; // ✅ make optional
  questions_number: number;
  difficulty: "easy" | "medium" | "hard" | string; // Use 'string' as a fallback
  type: string;
  schadule: string; // ISO Date string
  duration: number; // ✅ change to number
  score_per_question: string; // e.g., "5"
}

export interface Quiz extends CreateQuizPayload {
  _id: string; // MongoDB ID
  createdAt?: string;
  updatedAt?: string;
  quiz?: string;
  quizzes?: string;
  code?: string;
}

export type UpdateQuizPayload = Partial<CreateQuizPayload>;

// For submitting quiz answers
export interface Answer {
  questionId: string;
  selectedOption: string; // Or number, depending on your API
}
export interface SubmitQuizPayload {
  answers: Answer[];
}

// For getting questions as a participant
export interface QuizQuestion {
  _id: string;
  title: string;
  options: string[];
  // No 'correctAnswer' field
}
export interface QuizForParticipant {
  _id: string;
  title: string;
  description?: string;
  duration: string;
  questions: QuizQuestion[];
}

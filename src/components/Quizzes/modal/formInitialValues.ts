import type { QuestionFormValues } from "./types";

export const initialData: QuestionFormValues = {
  title: "sec question",
  description: "ay",
  options: {
    A: "first option",
    B: "sec option",
    C: "third option",
    D: "forth option",
  },
  answer: "B",
  difficulty: "hard",
  type: "BE",
};

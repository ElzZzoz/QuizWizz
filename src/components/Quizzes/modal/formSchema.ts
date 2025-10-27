import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  options: Yup.object({
    A: Yup.string().required("Option A is required"),
    B: Yup.string().required("Option B is required"),
    C: Yup.string().required("Option C is required"),
    D: Yup.string().required("Option D is required"),
  }),
  answer: Yup.string()
    .oneOf(["A", "B", "C", "D"], "Invalid answer")
    .required("Answer is required"),
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Invalid difficulty")
    .required("Difficulty is required"),
  type: Yup.string().required("Type is required"),
});

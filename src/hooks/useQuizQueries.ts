import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api/AxiosInstance";
import type {
  CreateQuizPayload,
  Quiz,
  QuizForParticipant,
  SubmitQuizPayload,
  UpdateQuizPayload,
} from "@/interfaces/QuizInterfaces/QuizInterfaces";

// ---
// 2. API FETCHING FUNCTIONS
// ---

const fetchQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get("/quiz");
  return response.data; // Adjust if your data is nested (e.g., response.data.data)
};

const fetchQuizById = async (id: string): Promise<Quiz> => {
  const response = await api.get(`/quiz/${id}`);
  return response.data;
};

const fetchQuizWithoutAnswers = async (
  id: string
): Promise<QuizForParticipant> => {
  const response = await api.get(`/quiz/without-answers/${id}`);
  return response.data;
};

// ---
// 3. REACT QUERY HOOKS
// ---

// GET /api/quiz (Get all)
export const useQuizzesQuery = () => {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// GET /api/quiz/:id (Get one)
export const useQuizQuery = (id: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuizById(id),
    enabled: !!id, // Only run if id is provided
  });
};

// GET /api/quiz/without-answers/:id (Get questions for participant)
export const useQuizQuestionsQuery = (id: string) => {
  return useQuery({
    queryKey: ["quizQuestions", id],
    queryFn: () => fetchQuizWithoutAnswers(id),
    enabled: !!id,
  });
};

// POST /api/quiz (Create)
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateQuizPayload) => api.post("/quiz", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

// PUT /api/quiz/:id (Update)
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateQuizPayload }) =>
      api.put(`/quiz/${id}`, payload),
    onSuccess: (_, { id }) => {
      // Invalidate both the list and the specific quiz
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["quiz", id] });
    },
  });
};

// DELETE /api/quiz/:id (Delete)
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/quiz/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["quiz", id] });
    },
  });
};

// POST /api/quiz/join (Join)
// Assumes payload is { code: "QUIZ_CODE" } or similar.
// Adjust payload type as needed.
export const useJoinQuiz = () => {
  return useMutation({
    mutationFn: (payload: { code: string }) => api.post("/quiz/join", payload),
    // No query invalidation needed, as this is a specific action
    // that likely returns a token or redirects.
  });
};

// POST /api/quiz/submit/:id (Submit)
export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SubmitQuizPayload }) =>
      api.post(`/quiz/submit/${id}`, payload),
    // This likely returns a result/score, so no query invalidation
    // is necessary on the quiz data itself.
  });
};

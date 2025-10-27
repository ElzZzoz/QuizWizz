// hooks/useQuestionApi.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "@/services/Questions/questionService";

import axiosInstance from "@/utils/api/AxiosInstance";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: any }) =>
      updateQuestion(questionId, data),
    onSuccess: (_, { questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: string) => deleteQuestion(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

// ✅ Nested Answer Hooks
export const useCreateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ questionId, data }: any) => createAnswer(questionId, data),
    onSuccess: (_, { questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
  });
};

export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      questionId,
      answerId,
      data,
    }: {
      questionId: string;
      answerId: string;
      data: any;
    }) => updateAnswer(questionId, answerId, data),
    onSuccess: (_, { questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
  });
};

export const useDeleteAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ questionId, answerId }: any) =>
      deleteAnswer(questionId, answerId),
    onSuccess: (_, { questionId }) => {
      queryClient.invalidateQueries({ queryKey: ["question", questionId] });
    },
  });
};

// ✅ GET single question by ID
// ✅ GET single question by ID
export const useQuestionById = (questionId: string, options?: any) => {
  console.log("Fetching question ID:", questionId);
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/question/${questionId}`);
      return res.data;
    },
    ...options,
  });
};

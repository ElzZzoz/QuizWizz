// services/questionService.ts

import axiosInstance from "@/utils/api/AxiosInstance";

export const createQuestion = async (data: any) => {
  const response = await axiosInstance.post("/api/question", data);
  return response.data;
};

export const updateQuestion = async (questionId: string, data: any) => {
  const response = await axiosInstance.put(`/api/question/${questionId}`, data);
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosInstance.delete(`/api/question/${questionId}`);
  return response.data;
};

// ✅ Nested endpoint → Answer inside a Question
export const createAnswer = async (questionId: string, data: any) => {
  const response = await axiosInstance.post(
    `/api/question/${questionId}/answer`,
    data
  );
  return response.data;
};

export const updateAnswer = async (
  questionId: string,
  answerId: string,
  data: any
) => {
  const response = await axiosInstance.put(
    `/api/question/${questionId}/answer/${answerId}`,
    data
  );
  return response.data;
};

export const deleteAnswer = async (questionId: string, answerId: string) => {
  const response = await axiosInstance.delete(
    `/api/question/${questionId}/answer/${answerId}`
  );
  return response.data;
};

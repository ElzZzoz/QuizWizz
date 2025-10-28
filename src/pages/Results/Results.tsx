// src/pages/Results.tsx

import { difficultyConfig, formatDate } from "@/utils/QuizUtils/quizUtils";
import type { Quiz } from "@/interfaces/QuizInterfaces/QuizInterfaces";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api/AxiosInstance";
import { useState } from "react";
import Pagination from "@/components/shared/Pagination/Pagination";

interface QuizResult {
  quiz: Quiz;
  participants: any[];
}

const fetchQuizResults = async (): Promise<Quiz[]> => {
  try {
    const response = await api.get<QuizResult[]>("/quiz/result");
    return response.data.map((result) => result.quiz);
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
    throw new Error("Could not fetch quiz results.");
  }
};

const ITEMS_PER_PAGE = 5;

export default function Results() {
  const {
    data: quizzes,
    isLoading,
    isError,
  } = useQuery<Quiz[]>({
    queryKey: ["quizResults"],
    queryFn: fetchQuizResults,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = quizzes ? quizzes.length : 0;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentQuizzes = quizzes
    ? quizzes.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h1>
        <p>Loading results...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h1>
        <p className="text-red-600">
          There was an error loading the quiz results.
        </p>
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h1>
        <p>No quiz results found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold text-[#1f263e] mb-4">Quiz Results</h1>

      {/* --- Desktop / Tablet Table --- */}
      <div className="hidden sm:block overflow-x-auto w-full">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead className="bg-[#0D1321]">
                <tr>
                  <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-r border-white rounded-l-lg">
                    Question Title
                  </th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-r border-white">
                    Question Desc
                  </th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-r border-white">
                    Difficulty
                  </th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-white rounded-r-md">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentQuizzes.map((quiz) => (
                  <tr
                    key={quiz._id}
                    className="first:rounded-t-lg last:rounded-b-lg [&>td:first-child]:rounded-l-lg [&>td:last-child]:rounded-r-md"
                  >
                    <td className="p-5 bg-white align-middle whitespace-nowrap text-sm font-medium text-gray-900">
                      {quiz.title}
                    </td>
                    <td className="p-5 bg-white align-middle text-sm text-gray-500">
                      {quiz.description || "N/A"}
                    </td>
                    <td className="p-5 bg-white align-middle whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          difficultyConfig[quiz.difficulty] ||
                          "bg-gray-100 text-gray-800"
                        } capitalize`}
                      >
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="p-5 bg-white align-middle whitespace-nowrap text-sm text-gray-500">
                      {formatDate(quiz.schadule)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Mobile Card Layout --- */}
      <div className="sm:hidden space-y-4">
        {currentQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-base font-semibold text-gray-900">
              {quiz.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {quiz.description || "No description"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-700">
              <span className="font-semibold">Difficulty:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  difficultyConfig[quiz.difficulty] ||
                  "bg-gray-100 text-gray-800"
                } capitalize`}
              >
                {quiz.difficulty}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="font-semibold">Date:</span>{" "}
              {formatDate(quiz.schadule)}
            </p>
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={totalItems}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

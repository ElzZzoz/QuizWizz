import { useState, useContext } from "react";
import { MdTimer } from "react-icons/md";
import { PiLockersFill } from "react-icons/pi";
import { useQueries } from "@tanstack/react-query";
import api from "@/utils/api/AxiosInstance";
import UpcomingQuizCard, {
  type IQuiz,
} from "@/components/Quizzes/UpcomingQuizCard";
import { QuizTable } from "@/components/Quizzes/QuizTable"; // reuse for bank
import { ModalContext } from "@/components/Quizzes/modal/ModalContext";
import AddQuizForm from "@/components/Quizzes/modal/AddQuizForm";
import { useQuizTable } from "@/hooks/useQuizTable";

// Fetchers
const fetchUpcomingQuizzes = async (): Promise<IQuiz[]> => {
  const { data } = await api.get<IQuiz[]>("/quiz/incomming");
  return data.slice(0, 2);
};
const fetchCompletedQuizzes = async (): Promise<IQuiz[]> => {
  const { data } = await api.get<IQuiz[]>("/quiz/completed");
  return data.slice(0, 3);
};

export default function Quizzes() {
  const modal = useContext(ModalContext);
  const [showBank, setShowBank] = useState(false);

  const [upcomingQuery, completedQuery] = useQueries({
    queries: [
      { queryKey: ["upcomingQuizzes"], queryFn: fetchUpcomingQuizzes },
      { queryKey: ["completedQuizzes"], queryFn: fetchCompletedQuizzes },
    ],
  });

  const handleOpenAddQuiz = () => modal?.openModal(<AddQuizForm />);
  const handleShowBank = () => setShowBank(true);

  const quizBank = useQuizTable();
  const [pageGroup, setPageGroup] = useState(0); // For showing 3 pages at a time
  const maxGroup = Math.floor(
    (quizBank.paginationProps.totalItems - 1) /
      quizBank.paginationProps.itemsPerPage /
      3
  );

  const renderPagination = () => {
    const { totalItems, itemsPerPage, currentPage, paginate } =
      quizBank.paginationProps;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startPage = pageGroup * 3 + 1;
    const endPage = Math.min(startPage + 2, totalPages);

    return (
      <div className="flex justify-center mt-4 gap-2 items-center">
        <button
          onClick={() => setPageGroup(Math.max(pageGroup - 1, 0))}
          disabled={pageGroup === 0}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          &lt;
        </button>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setPageGroup(Math.min(pageGroup + 1, maxGroup))}
          disabled={pageGroup === maxGroup}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  };

  // === FULL PAGE QUESTION BANK ===
  if (showBank) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Question Bank</h2>
          <button
            onClick={() => setShowBank(false)}
            className="text-black hover:text-gray-700"
          >
            Close
          </button>
        </div>

        {quizBank.isLoading ? (
          <p>Loading quizzes...</p>
        ) : quizBank.isEmpty ? (
          <p>No quizzes available in the bank.</p>
        ) : (
          <>
            <QuizTable
              quizzes={quizBank.currentItems}
              onDelete={quizBank.handleDelete}
              isDeleting={quizBank.isDeleting}
            />
            {quizBank.showPagination && renderPagination()}
          </>
        )}
      </div>
    );
  }

  // === DEFAULT QUIZZES PAGE ===
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-6 gap-6 bg-gray-50">
      {/* LEFT SECTION */}
      <div className="flex flex-row gap-4 flex-shrink-0">
        <button
          type="button"
          onClick={handleOpenAddQuiz}
          className="border border-gray-300 rounded-lg shadow-sm flex flex-col items-center justify-center text-lg font-semibold bg-white hover:bg-gray-100 transition-colors"
          style={{ width: 200, height: 150 }}
        >
          <MdTimer size={40} className="mb-2" />
          Add Quiz
        </button>
        <button
          type="button"
          onClick={handleShowBank}
          className="border border-gray-300 rounded-lg shadow-sm flex flex-col items-center justify-center text-lg font-semibold bg-white hover:bg-gray-100 transition-colors"
          style={{ width: 200, height: 150 }}
        >
          <PiLockersFill size={40} className="mb-2" />
          Question Bank
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-grow flex flex-col gap-6">
        {/* Upcoming Quizzes */}
        <div className="p-6 bg-white rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-bold mb-4">Upcoming Quizzes</h2>
          {upcomingQuery.isLoading ? (
            <p>Loading...</p>
          ) : upcomingQuery.error ? (
            <p className="text-red-500">Could not load upcoming quizzes.</p>
          ) : (upcomingQuery.data ?? []).length > 0 ? (
            <div className="flex flex-col space-y-3">
              {(upcomingQuery.data ?? []).map((quiz) => (
                <UpcomingQuizCard key={quiz._id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <p>You have no upcoming quizzes.</p>
          )}
        </div>

        {/* Completed Quizzes */}
        <div className="p-6 bg-white rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-bold mb-4">Completed Quizzes</h2>
          {completedQuery.isLoading ? (
            <p>Loading...</p>
          ) : completedQuery.error ? (
            <p className="text-red-500">Could not load completed quizzes.</p>
          ) : (completedQuery.data ?? []).length > 0 ? (
            <QuizTable
              quizzes={(completedQuery.data ?? []).map((quiz) => ({
                ...quiz,
                group: quiz.group ?? "",
              }))}
              onDelete={(id) => console.log("Delete", id)}
              isDeleting={false}
            />
          ) : (
            <p>You have not completed any quizzes.</p>
          )}
        </div>
      </div>
    </div>
  );
}

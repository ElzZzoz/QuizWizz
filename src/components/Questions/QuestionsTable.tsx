import { Pagination } from "@/components";
import { isAxiosError } from "axios";
import { useQuizTable } from "@/hooks/useQuizTable";
import { QuizTable } from "@/components/Quizzes/QuizTable";

// UI States
const LoadingState = () => (
  <div className="text-center p-8 text-gray-500">Loading questions...</div>
);
const EmptyState = () => (
  <div className="text-center p-8 text-gray-500">No questions found.</div>
);

const ErrorState = ({ error }: { error: unknown }) => {
  let message = "An unknown error occurred.";
  if (isAxiosError(error))
    message = error.response?.data?.message || error.message;
  else if (error instanceof Error) message = error.message;
  return (
    <div className="text-center p-8 bg-red-50 border-2 border-dashed border-red-300 rounded-lg">
      <p className="font-semibold text-red-600">{message}</p>
    </div>
  );
};

export default function BankOfQuestionsTable() {
  const {
    currentItems,
    isLoading,
    error,
    isDeleting,
    handleDelete,
    paginationProps,
    showPagination,
    isEmpty,
  } = useQuizTable();

  // ✅ Modal State

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <>
      {/* ✅ Modal */}

      {/* ✅ Table */}
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <QuizTable
            quizzes={currentItems}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}

        {showPagination && <Pagination {...paginationProps} />}
      </div>
    </>
  );
}

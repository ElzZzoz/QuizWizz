import { useState } from "react";
import { useQuizzesQuery, useDeleteQuiz } from "@/hooks/useQuizQueries";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 6;

export function useQuizTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: quizzes = [], isLoading, error } = useQuizzesQuery();
  const { mutate: deleteQuiz, isPending: isDeleting } = useDeleteQuiz();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = quizzes.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = quizzes.length;
  const showPagination = totalItems > ITEMS_PER_PAGE;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = (id: string) => {
    const toastId = toast.loading("Deleting quiz...");
    deleteQuiz(id, {
      onSuccess: () => {
        toast.success("Quiz deleted successfully!", { id: toastId });

        // ✅ Refetch to avoid stale UI
        queryClient.invalidateQueries({ queryKey: ["quizzes"] });

        // ✅ Go back a page if you've deleted the last item on this one
        if (currentItems.length === 1 && currentPage > 1) {
          paginate(currentPage - 1);
        }
      },
      onError: (error) => {
        let errorMessage = "Failed to delete quiz.";
        if (isAxiosError(error)) {
          errorMessage = error.response?.data?.message || error.message;
        }
        toast.error(errorMessage, { id: toastId });
      },
    });
  };

  return {
    currentItems,
    isLoading,
    error,
    isDeleting,
    handleDelete,
    paginationProps: {
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems,
      paginate,
      currentPage,
    },
    showPagination,
    isEmpty: quizzes.length === 0,
  };
}

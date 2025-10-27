import { type JSX } from "react";
import type { PaginationProps } from "@/interfaces/GroupInterfaces/GroupInterfaces";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginationProps): JSX.Element {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPagesToShow = 3; // Show 3 page numbers at a time

  // --- 1. Calculate Page Window Logic ---
  let startPage, endPage;
  if (totalPages <= maxPagesToShow) {
    // Less than 3 total pages, so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than 3 total pages, calculate window
    if (currentPage <= 2) {
      // At the beginning (e.g., page 1 or 2)
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + 1 >= totalPages) {
      // At the end (e.g., last or 2nd to last page)
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      // In the middle
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }

  // --- 2. Create Page Numbers Array ---
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // --- 3. Arrow Click Handlers ---
  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  // Don't render pagination if there's only 1 page
  if (totalPages <= 1) {
    return <></>;
  }

  return (
    <nav className="mt-6 flex justify-center">
      <ul className="flex items-center list-none gap-2">
        {/* --- Previous Button --- */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaAngleLeft />
          </button>
        </li>

        {/* --- Page Number Buttons --- */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* --- Next Button --- */}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaAngleRight />
          </button>
        </li>
      </ul>
    </nav>
  );
}

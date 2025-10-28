// src/components/QuizTable.tsx
import type { Quiz } from "@/interfaces/QuizInterfaces/QuizInterfaces";
import { QuizTableRow } from "./QuizTableRow";

// --- NEW IMPORTS ---
// Import utils and icons needed for the mobile card view
import { difficultyConfig, formatDate } from "@/utils/QuizUtils/quizUtils";

// ---

export function QuizTable({
  quizzes,
  onDelete,
  isDeleting,
  onEdit, // <-- Make sure onEdit is passed
}: {
  quizzes: Quiz[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
  onEdit?: (quiz: Quiz) => void;
}) {
  return (
    <>
      {/* --- 1. Desktop / Tablet Table (Your original code) --- */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-[#0D1321]">
            <tr className="h-[30px]">
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-r border-white rounded-tl-[5px]"
              >
                Question Title
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-r border-white"
              >
                Question Desc
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-r border-white"
              >
                Question difficulty level
              </th>
              <th
                scope="col"
                className="px-6 py-1 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-r border-white"
              >
                Date
              </th>
              {/* NOTE: You may need to add an "Actions" <th> here 
                  if QuizTableRow adds an extra <td> */}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {quizzes.map((quiz) => (
              <QuizTableRow
                key={quiz._id}
                quiz={quiz}
                onDelete={onDelete}
                isDeleting={isDeleting}
                onEdit={onEdit} // <-- Pass onEdit to the row
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* --- 2. Mobile Card Layout (Copied from Results.tsx) --- */}
      <div className="sm:hidden space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            {/* Top section: Title and Description */}
            <h2 className="text-base font-semibold text-gray-900">
              {quiz.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {quiz.description || "No description"}
            </p>

            {/* Middle section: Difficulty and Date */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
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
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="font-semibold">Date:</span>{" "}
              {formatDate(quiz.schadule)}
            </p>

            {/* Bottom section: Action Buttons */}
          </div>
        ))}
      </div>
    </>
  );
}

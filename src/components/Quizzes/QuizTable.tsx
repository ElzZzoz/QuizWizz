// src/components/QuizTable.tsx
import type { Quiz } from "@/interfaces/QuizInterfaces/QuizInterfaces";
import { QuizTableRow } from "./QuizTableRow";

export function QuizTable({
  quizzes,
  onDelete,
  isDeleting,
}: {
  quizzes: Quiz[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
  onEdit?: (quiz: Quiz) => void;
}) {
  return (
    <div className="overflow-x-auto">
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

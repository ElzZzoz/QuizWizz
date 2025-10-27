import { difficultyConfig, formatDate } from "@/utils/QuizUtils/quizUtils";
import type { Quiz } from "@/interfaces/QuizInterfaces/QuizInterfaces";

export function QuizTableRow({
  quiz,
}: {
  quiz: Quiz;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  // ✅ View Quiz Modal

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{quiz.description || "N/A"}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            difficultyConfig[quiz.difficulty] || "bg-gray-100 text-gray-800"
          } capitalize`}
        >
          {quiz.difficulty}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formatDate(quiz.schadule)}</div>
      </td>
    </tr>
  );
}
